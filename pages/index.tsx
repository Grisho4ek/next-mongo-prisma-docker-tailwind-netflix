import Billboard from '@/components/Billboard';
import MoviesGrid from '@/components/MoviesGrid';
import Navbar from '@/components/Navbar';
import useUser from '@/hooks/useUser';
import fetcher from '@/libs/fetcher';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import useSWR from 'swr';

export default function Home() {
  const { data: user } = useUser();
  const { data: movies = [] } = useSWR<Movie[]>('/api/movies', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <>
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MoviesGrid title='Tranding Now' data={movies} />
        <MoviesGrid
          title='Favorites'
          data={movies.filter((m) => (user?.favoriteIds || []).includes(m.id))}
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
