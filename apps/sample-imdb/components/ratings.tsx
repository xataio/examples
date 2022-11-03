export const Rating = ({ value }: { value: number }) => {
  const ratingValue = value / 2
  const decimalPoints = Number((ratingValue % 1).toFixed(1))
  const arr = Array(Math.floor(ratingValue)).fill(undefined)

  return (
    <ul
      aria-label={`Rating is ${value}`}
      className="flex justify-start cursor-default"
      title={String(value)}
    >
      <li className="text-sm self-baseline pr-2 inline-block">
        {arr.map((_, idx) => (
          <div key={value + idx} className="overflow-x-hidden inline-block">
            <span className="rating-star inline-block" role="image" aria-hidden>
              ⭐️
            </span>
          </div>
        ))}
        {decimalPoints < 0.4 ? null : (
          <div
            className="overflow-x-hidden inline-block"
            style={{
              width: decimalPoints + 'em',
            }}
          >
            <span
              key={decimalPoints + value}
              className="rating-star"
              role="image"
              aria-hidden
            >
              ⭐️
            </span>
          </div>
        )}
      </li>
    </ul>
  )
}
