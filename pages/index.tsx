import Billboard from '@/components/Billboard';
import Modal from '@/components/Modal';
import MoviesGrid from '@/components/MoviesGrid';
import Navbar from '@/components/Navbar';
import useModal from '@/hooks/useModal';
import useUser from '@/hooks/useUser';
import fetcher from '@/libs/fetcher';
import axios from 'axios';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import useSWR from 'swr';

export default function Home() {
  const { isModalOpened, closeModal, movie } = useModal();

  const { data: user, mutate } = useUser();

  const { data: movies = [] } = useSWR<Movie[]>('/api/movies', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const favorites = movies.filter((m) =>
    (user?.favoriteIds || []).includes(m.id)
  );
  const favoritesIds = favorites.map((f) => f.id);

  const toggleFavorite = async (movieId: string, isFavorite: boolean) => {
    if (!user) return;

    let res;

    if (isFavorite) {
      res = await axios.delete(`/api/favorites/${movieId}`);
    } else {
      res = await axios.post(`/api/favorites/${movieId}`);
    }

    mutate({
      ...user,
      favoriteIds: res?.data?.favoriteIds,
    });
  };

  return (
    <>
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MoviesGrid
          title='Tranding Now'
          movies={movies}
          toggleFavorite={toggleFavorite}
          favoritesIds={favoritesIds}
        />
        <MoviesGrid
          title='Favorites'
          movies={favorites}
          toggleFavorite={toggleFavorite}
          favoritesIds={favoritesIds}
        />
      </div>
      <Modal
        movie={movie}
        isOpened={isModalOpened}
        close={closeModal}
        toggleFavorite={toggleFavorite}
        favoritesIds={favoritesIds}
      />
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
