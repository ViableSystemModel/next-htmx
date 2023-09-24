import type { NextApiRequest, NextApiResponse } from "next"
import { renderToStaticMarkup } from 'react-dom/server'


/** All the HTTP methods supported by both HTMX and Next.js */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'

/** The shape of the functions to be passed into htmxHandler */
type HtmxHandler = (req: NextApiRequest) => JSX.Element

/**
 * Factory function for creating htmx api endpoint handlers
 *
 * There are 3 main differences between accessing one of these
 * htmx endpoints and just retrieving an SSR'ed page via Next:
 *
 * 1. It will reject if the the method is incorrect
 * 2. The plaintext HTML that's returned is not a full document
 * 3. Special React attributes such as `data-reactid` aren't
 *        added to the HTMl while it's being rendered, so this
 *        HTML can't be hydrated to become reactive. This is an
 *        intentional design choice because mixing HTMX and
 *        React is messy as hell.
 */
export const htmxHandler = (
  method: HttpMethod,
  handler: HtmxHandler,
) => (
  req: NextApiRequest,
  res: NextApiResponse<string>
): void => {
  if (req.method !== method) {
    return void res.status(405)
      .send(`Only ${method} requests are allowed on this endpoint`)
  }

  const jsxElement = handler(req)
  const plaintextHtml = renderToStaticMarkup(jsxElement)
  res.status(200).send(plaintextHtml)
}