import type { VercelApiHandler } from '@vercel/node'

export function withErrorHandler(handler: VercelApiHandler): VercelApiHandler {
  return async (req, res) => {
    try {
      handler(req, res)

      return
    } catch (err) {
      if ('status' in err) {
        res.status(err.status).json({ message: err.message })

        return
      } else {
        const message = err instanceof Error ? err.message : 'Unknown error'
        res.status(500).json({ message })
      }
    }
  }
}
