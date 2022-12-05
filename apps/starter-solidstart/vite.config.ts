import solid from 'solid-start/vite'
import { defineConfig } from 'vite'
import vercel from 'solid-start-vercel'
import dotenv from 'dotenv'

export default defineConfig(() => {
  dotenv.config() // https://github.com/solidjs/solid-start/issues/480
  return { plugins: [solid({ adapter: vercel() })] }
})
