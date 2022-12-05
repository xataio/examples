import { XataClient } from './xata.codegen.server'

export const xata = new XataClient({
  apiKey: import.meta.env.XATA_API_KEY,
})
