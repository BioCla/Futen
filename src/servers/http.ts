import { ServeOptions } from 'bun'
import { Middleware } from '../router/middleware.ts'

/**
 * Optional porting of the ServeOptions type from Bun
 */
export type ServerOptions = {
  [key in keyof ServeOptions]?: ServeOptions[key]
} & Middleware

function defaultHTTPHandler(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  _request: Request,
  _params: Record<string, string>
  /* eslint-enable @typescript-eslint/no-unused-vars */
) {
  return Response.json({ error: 'Method not implemented' }, { status: 405 })
}
/**
 * Standard HTTP methods which are automatically picked up by the router
 *
 * ---
 *
 * As described in the HTTP/1.1 specification (RFC 9110)
 * @link https://www.rfc-editor.org/rfc/rfc9110.html
 */
export const HTTPMethod = {
  get: defaultHTTPHandler,
  head: defaultHTTPHandler,
  post: defaultHTTPHandler,
  put: defaultHTTPHandler,
  delete: defaultHTTPHandler,
  connect: defaultHTTPHandler,
  options: defaultHTTPHandler,
  trace: defaultHTTPHandler,
  patch: defaultHTTPHandler
}

export type HTTPMethods = typeof HTTPMethod

type FutenHTTPMethodInterfaceType = {
  [key in keyof typeof HTTPMethod]?: HTTPMethods[key]
}
export interface FutenHTTPRoute extends FutenHTTPMethodInterfaceType { }
