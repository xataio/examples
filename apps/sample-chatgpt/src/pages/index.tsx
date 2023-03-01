import { fetchEventSource } from '@microsoft/fetch-event-source'
import { InferGetStaticPropsType } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useCallback, useState } from 'react'
import styles from '~/styles/Home.module.css'
import { ClientKey, databases, getXataClients } from '~/xata'

export async function getStaticProps() {
  const xata = getXataClients()
  const dbs = []

  for (const database of databases) {
    const { id, name, lookupTable } = database

    // @ts-ignore The table name is dynamic
    const { aggs } = await xata[id].db[lookupTable]?.aggregate({
      total: { count: '*' },
    })

    dbs.push({ id, name, recordCount: aggs.total })
  }

  return { props: { dbs } }
}

function prettyFormatNumber(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const useAskXataDocs = () => {
  const [data, setAnswer] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()

  const askQuestion = useCallback((database: string, question: string) => {
    if (!question) return

    setAnswer(undefined)
    setIsLoading(true)

    void fetchEventSource(`/api/ask`, {
      method: 'POST',
      body: JSON.stringify({ question, database }),
      headers: { 'Content-Type': 'application/json' },
      onmessage(ev) {
        try {
          const data = JSON.parse(ev.data)
          setAnswer((answer) => `${answer || ''}${data.answer}`)
        } catch (e) {}
      },
    })
      .catch(({ message }) => {
        setError(message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  // Clear answer function
  const clearAnswer = useCallback(() => {
    setAnswer(undefined)
    setIsLoading(false)
  }, [])

  return { isLoading, data, error, askQuestion, clearAnswer }
}

export default function Home({
  dbs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [question, setQuestion] = useState<string>('')
  const [selected, setSelected] = useState<ClientKey>(dbs[0].id)

  const { isLoading, data: response, askQuestion } = useAskXataDocs()

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
            {dbs.map(({ id, name, recordCount }) => (
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
              <button
                className={styles.button}
                onClick={() => askQuestion(selected, question)}
              >
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
