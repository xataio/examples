export default function DeleteButton(props: { id: string }) {
  const onClick = () => {
    fetch(`delete-record/${props.id}.json`, {
      method: "delete",
    }).then(() => window.location.reload())
  }

  return <button name="item" onClick={onClick}>
    <span role="img" aria-label="delete item">
      🗑
    </span>
  </button>
}