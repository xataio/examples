import solid from 'solid-start/vite'
import { defineConfig } from 'vite'
import vercel from 'solid-start-vercel'

export default defineConfig(() => {
  return { plugins: [solid({ adapter: vercel() })] }
})
