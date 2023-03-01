import { InferGetStaticPropsType } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useState } from 'react'
import styles from '~/styles/Home.module.css'
import { ClientKey, databases, getXataClients } from '~/xata'

export async function getStaticProps() {
  const xata = getXataClients()
  const dbs = []

  for (const database of databases) {
    const { id, name } = database
    const tables = Object.keys(xata[id].db)
    let recordCount = 0

    for (const table of tables) {
      // @ts-ignore We know this is a valid table
      const { aggs } = await xata[id].db[table]?.aggregate({
        total: { count: '*' },
      })

      recordCount += aggs.total
    }

    dbs.push({ id, name, tableCount: tables.length, recordCount })
  }

  return { props: { dbs } }
}

function prettyFormatNumber(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default function Home({
  dbs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [question, setQuestion] = useState<string>('')
  const [response, setResponse] = useState<string>('')
  const [selected, setSelected] = useState<ClientKey>(dbs[0].id)

  const ask = async (e: any) => {
    e.preventDefault()
    setResponse('')

    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, database: selected }),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = response.body
    if (!data) return

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      try {
        const { answer } = JSON.parse(decoder.decode(value))
        setResponse((prev) => `${prev || ''}${answer}`)
      } catch (e) {}
    }
  }

  return (
    <>
      <Head>
        <title>Xata Chat Demo</title>
        <meta name="description" content="Xata Chat Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Xata Ask Demo</h1>

          <div className={styles.grid}>
            {dbs.map(({ id, name, tableCount, recordCount }) => (
              <div
                key={`database-${id}`}
                className={styles.card}
                onClick={() => setSelected(id)}
                style={{
                  color: selected === id ? '#0070f3' : 'inherit',
                  borderColor: selected === id ? '#0070f3' : 'inherit',
                }}
              >
                <h3 style={{ marginBottom: 10 }}>{name}</h3>
                <p>
                  {tableCount} {tableCount === 1 ? 'table' : 'tables'}
                </p>
                <p>
                  {prettyFormatNumber(recordCount)}{' '}
                  {recordCount === 1 ? 'record' : 'records'}
                </p>
              </div>
            ))}
          </div>
          <div className={styles.inputGroup}>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className={styles.input}
              placeholder={'Write a question to ask the chatbot'}
            />
            <div className={styles.inputRightElement}>
              <button className={styles.button} onClick={ask}>
                Ask
              </button>
            </div>
          </div>
          {response ? <p className={styles.response}>{response}</p> : null}
        </div>
      </main>
    </>
  )
}
