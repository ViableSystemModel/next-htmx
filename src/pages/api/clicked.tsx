import { htmxHandler } from "~/htmx"

export default htmxHandler('POST', _req => <div>Clicked!</div>)
