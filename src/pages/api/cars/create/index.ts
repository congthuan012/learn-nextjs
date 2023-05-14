import { getToken } from "next-auth/jwt";
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
      const cookie = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET });

      await axios.get(`${process.env.NEXTAUTH_API}/cars/create`, {
            headers: {
                  Authorization: 'Bearer ' + cookie?.token
            }
      }).then(response => {
            return res.status(200).send({ message: 'success', config: response.data.config })
      }).catch(err => {
            console.log({ err });
            return res.status(500).send({ message: 'error', err });
      })
}

export default handler;