import NextAuth from "next-auth"
import GitHubProvider from 'next-auth/providers/github'
import { XataAdapter } from '@next-auth/xata-adapter'
import { XataClient } from '~/lib/xata.codegen'

const client = new XataClient()

export const authConfig = {
  adapter: XataAdapter(client),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
}

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }