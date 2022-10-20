import { useState } from 'react'

export const AddTodoForm = () => {
  const [label, setLabel] = useState('')

  const send = () => {
    fetch('/api/add-todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        label,
      }),
    }).then(() => window.location.reload())
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        send()
      }}
      style={{ display: 'flex', gap: 8 }}
    >
      <label>
        New Todo Label:
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          type="text"
          placeholder="Take out the trash"
        />
      </label>
      <button>Save</button>
    </form>
  )
}
