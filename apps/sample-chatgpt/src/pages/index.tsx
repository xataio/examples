import { fetchEventSource } from '@microsoft/fetch-event-source'
import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useCallback, useState } from 'react'
import styles from '~/styles/Home.module.css'
import { getDatabases } from '~/xata'

export async function getStaticProps() {
  const dbs = []

  for (const database of getDatabases()) {
    const { id, name, client: xata, lookupTable } = database
    const { aggs } = await xata.db[lookupTable]?.aggregate({
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
  const [answer, setAnswer] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [, setAbortController] = useState<AbortController>()

  const askQuestion = useCallback((database: string, question: string) => {
    if (!question) return

    setAnswer(undefined)
    setIsLoading(true)

    const controller = new AbortController()
    setAbortController((prev) => {
      prev?.abort()
      return controller
    })

    void fetchEventSource(`/api/ask`, {
      method: 'POST',
      body: JSON.stringify({ question, database }),
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      openWhenHidden: true,
      onmessage(ev) {
        try {
          const { text = '', done, error } = JSON.parse(ev.data)
          if (error) {
            console.error(error)
            return
          }

          setAnswer((prev = '') => `${prev}${text}`)
          setIsLoading(!done)
        } catch (e) {}
      },
      onclose() {
        setIsLoading(false)
      },
      onerror(error) {
        // Re-throw the error to stop the event source
        throw error
      },
    }).catch(() => {
      setIsLoading(false)
    })
  }, [])

  // Clear answer function
  const clearAnswer = useCallback(() => {
    setAnswer(undefined)
    setIsLoading(false)
  }, [])

  return { isLoading, answer, askQuestion, clearAnswer }
}

export default function Home({
  dbs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [question, setQuestion] = useState<string>('')
  const [selected, setSelected] = useState<string>(dbs[0].id)

  const { answer, isLoading, askQuestion } = useAskXataDocs()

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    askQuestion(selected, question)
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
          <form className={styles.inputGroup} onSubmit={handleFormSubmit}>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className={styles.input}
              placeholder={'Write a question to ask the chatbot'}
            />
            <div className={styles.inputRightElement}>
              <button className={styles.button} type="submit">
                Ask
              </button>
            </div>
          </form>
          {answer ? (
            <p className={styles.response}>{answer}</p>
          ) : isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <span className={styles.loader} />
            </div>
          ) : null}
        </div>
      </main>
    </>
  )
}
