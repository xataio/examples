import { type GetServerSidePropsContext } from 'next'
import { type FC } from 'react'
import { AddTodoForm } from '../components/add-todo-form'
import { authorize } from '../util/authorize'
import { getXataClient } from '../util/xata'

type Props = NonNullable<
  Awaited<ReturnType<typeof getServerSideProps>>['props']
>

const Index: FC<Props> = ({ todos }) => {
  return (
    <main>
      <h1>My Todo List</h1>
      <AddTodoForm />
      <ul>
        {todos.map(({ label, id, is_done, created_at }) => (
          <li
            key={id}
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
                        id: id,
                        is_done: !is_done,
                      }),
                    }).then(() => window.location.reload())
                  }}
                  checked={Boolean(is_done)}
                  type="checkbox"
                />
                {label} {created_at ? `(Created ${new Date(created_at).toLocaleString()})` : ''}
              </label>
              <button
                onClick={() => {
                  fetch('/api/delete-todo', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      id: id,
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
      .filter('user.username', username)
      .getMany()

    return {
      props: {
        todos: todos.toObject()
      },
    }
  } else {
    res.writeHead(401, {
      'WWW-Authenticate': "Basic realm='This is a private to-do list'",
    })

    res.end()
    return {}
  }
}
