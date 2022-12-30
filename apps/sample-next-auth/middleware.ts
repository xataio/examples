/**
 * @Attention
 * This route is used for both /app and /pages implementation
 */

export { default } from 'next-auth/middleware'

export const config = { matcher: ['/in', '/pages/in'] }
