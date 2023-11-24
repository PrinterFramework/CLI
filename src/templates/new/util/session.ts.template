import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

export const password =
  process.env.SESSION_SECRET ||
  'ad75fbbbddbf8005cb60e3089d6f156440f9c8ac1d13ad33a8e4758fdff73ff8'

export interface SessionI {
  counter?: number
}

export function getSession() {
  return getIronSession<SessionI>(cookies(), {
    password,
    cookieName: 'printer',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: process.env.COOKIE_AGE
        ? Number(process.env.COOKIE_AGE)
        : undefined
    }
  })
}
