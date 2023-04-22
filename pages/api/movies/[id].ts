import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const { id } = req.query;

    if (typeof id !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!id) {
      throw new Error('Missing Id');
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id,
      },
    });

    if (!movie) {
      return res.status(404).end();
    }

    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
