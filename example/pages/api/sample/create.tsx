import prisma from 'prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { Session } from 'util/session'

export const CreateRoute = withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const sample = await prisma.sample.create({
        data: {
          ...req.body
        }
      })
      res.status(200).send({ status: 'OK', sample })
    } catch (error) {
      console.error(error)
      res.status(500).send({ status: 'ERROR', error })
    }
  },
  Session
)

export default CreateRoute
