import prisma from 'prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { Session } from 'util/session'

export const UpdateRoute = withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const id = req.body.id
      const data = req.body
      delete data.id

      const sample = await prisma.sample.update({
        where: { id },
        data,
      })
      res.status(200).send({ status: 'OK', sample })
    } catch (error) {
      console.error(error)
      res.status(500).send({ status: 'ERROR', error })
    }
  },
  Session
)

export default UpdateRoute
