export default function () {
  return (
    <div>
      <div>
        <span>
          
        </span>
      </div>
      <div>
        <button hx-post="/api/clicked" hx-swap="outerHTML">
          Click Me
        </button>
      </div>
    </div>
  )
}