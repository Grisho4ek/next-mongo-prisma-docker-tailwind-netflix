import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { user } = await serverAuth(req, res);
    const id = req.query.id as string;

    if (typeof id !== 'string') {
      throw new Error('Invalid Id');
    }

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id,
      },
    });

    if (!existingMovie) {
      return res.status(404).end();
    }

    if (req.method === 'DELETE') {
      const favoriteIds = user.favoriteIds.filter((m) => m !== id);
      const result = await prismadb.user.update({
        where: {
          email: user.email || '',
        },
        data: {
          favoriteIds,
        },
      });

      return res.status(200).json(result);
    }

    const result = await prismadb.user.update({
      where: {
        email: user.email || '',
      },
      data: {
        favoriteIds: {
          push: id,
        },
      },
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
}
