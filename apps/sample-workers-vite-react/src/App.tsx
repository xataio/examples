import { useEffect, useState } from 'react'
import './App.css'
import { xataWorker } from './xata'

const getPosts = xataWorker('getPosts', async ({ xata }, page?: number) => {
  const size = 3
  const offset = page ? page * size : 0

  return await xata.db.Posts.sort('createdAt').getMany({
    pagination: { size, offset },
  })
})

type GetPostsResult = Awaited<ReturnType<typeof getPosts>>

function App() {
  const [posts, setPosts] = useState<GetPostsResult>([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    // We recommend using client side libraries like react-query or SWR to handle fetching of data.
    getPosts(page).then(setPosts)
  }, [page])

  return (
    <div className="App">
      <h1>Posts</h1>
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <h2>{post.title}</h2>
            <p>{post.text}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => {
            if (page === 0) return
            setPage((page) => page - 1)
          }}
          disabled={page === 0}
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (posts.length < 3) return
            setPage((page) => page + 1)
          }}
          disabled={posts.length < 3}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default App
