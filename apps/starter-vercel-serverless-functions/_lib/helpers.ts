import type {
  VercelApiHandler,
  VercelRequest,
  VercelResponse,
} from '@vercel/node'

type AsyncApiHandler = (
  req: VercelRequest,
  res: VercelResponse
) => Promise<void>

export function withErrorHandler(handler: AsyncApiHandler): VercelApiHandler {
  return async (req, res) => {
    try {
      await handler(req, res)

      return
    } catch (err) {
      if ('status' in err) {
        res.status(err.status).json({ message: err.message })

        return
      } else {
        const message = err instanceof Error ? err.message : 'Unknown error'
        res.status(500).json({ message })

        return
      }
    }
  }
}
