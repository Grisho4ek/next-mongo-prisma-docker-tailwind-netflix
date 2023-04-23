import { useRouter } from 'next/router';
import fetcher from '@/libs/fetcher';
import useSWR from 'swr';
import { BsArrowLeft } from 'react-icons/bs';
import Link from 'next/link';
import { Movie } from '@prisma/client';

export default function Watch() {
  const router = useRouter();
  const { id } = router.query;
  const { data: movie } = useSWR<Movie>(`/api/movies/${id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <div className='h-screen w-screen bg-black'>
      <nav className='fixed z-10 flex w-full flex-row items-center gap-2 bg-black bg-opacity-70 p-4'>
        <Link href='/'>
          <BsArrowLeft className='block h-4 w-4 cursor-pointer text-white transition hover:opacity-80 md:h-6 md:w-6' />
        </Link>
        <p className='text-1xl font-bold text-white md:text-3xl'>
          <span className='font-light'>Watching:</span> {movie?.title}
        </p>
      </nav>
      <video
        className='h-full w-full'
        autoPlay
        controls
        src={movie?.videoUrl}
      ></video>
    </div>
  );
}
