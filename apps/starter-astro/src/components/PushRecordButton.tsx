export function PushRecordButton() {
  const onClick = () => {
    fetch("push-records.json", {
      method: "POST"
    }).then(() => window.location.reload())
  }
  return <button onClick={onClick}>Push records to Xata</button>
}