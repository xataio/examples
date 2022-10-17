import {
  type InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from 'next'
import Head from 'next/head'
import { AddTodoForm } from '../components/add-todo-form'
import { authorize } from '../util/authorize'
import { getXataClient } from '../util/xata'

const Index = ({
  todos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/mvp.css" />
      </Head>
      <h1>My Todo List</h1>
      <AddTodoForm />
      <ul>
        {todos.map((t) => (
          <li
            key={t.id}
            style={{ display: 'flex', gap: 8, alignItems: 'center' }}
          >
            <>
              <label>
                <input
                  onChange={() => {
                    fetch('/api/do-todo', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        id: t.id,
                        is_done: !t.is_done,
                      }),
                    }).then(() => window.location.reload())
                  }}
                  checked={t.is_done}
                  type="checkbox"
                />
                {t.label}
              </label>
              <button
                onClick={() => {
                  fetch('/api/delete-todo', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      id: t.id,
                    }),
                  }).then(() => window.location.reload())
                }}
              >
                Delete
              </button>
            </>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Index

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const { isAuthenticated, username } = await authorize(req)

  if (isAuthenticated && username) {
    const xata = getXataClient()
    const todos = await xata.db.items
      // to-do items are now filtered to the current authenticated user
      .filter('user.username', username)
      .getMany()

    return {
      props: {
        todos,
      },
    }
  } else {
    res.writeHead(401, {
      'WWW-Authenticate': "Basic realm='This is a private to-do list'",
    })
    return { redirect: { destination: '/', permanent: false } }
  }
}
