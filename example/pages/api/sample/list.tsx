import prisma from 'prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { Session } from 'util/session'

export const ListRoute = withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const results = await prisma.sample.findMany()
      res.status(200).send({ status: 'OK', results })
    } catch (error) {
      console.error(error)
      res.status(500).send({ status: 'ERROR', error })
    }
  },
  Session
)

export default ListRoute
