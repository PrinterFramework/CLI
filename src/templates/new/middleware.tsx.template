import { NextRequest, NextResponse } from 'next/server'
import { getSession } from 'util/session'

// See https://nextjs.org/docs/app/building-your-application/routing/middleware to manage client side routing with session states.
export async function middleware(req: NextRequest) {
  const res = new NextResponse()
  const session = await getSession(req, res)
}

export const config = {}
