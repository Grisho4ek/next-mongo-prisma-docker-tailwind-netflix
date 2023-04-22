import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/libs/serverAuth';
import prismadb from '@/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);
    const movies = await prismadb.movie.findMany();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).end();
  }
}
