import useModal from '@/hooks/useModal';
import fetcher from '@/libs/fetcher';
import Link from 'next/link';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import useSWR from 'swr';

export default function Billboard() {
  const { openModal } = useModal();

  const { data: movie } = useSWR<Movie>('/api/random', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <div className='relative h-[56.25vw]'>
      <video
        src={movie?.videoUrl}
        poster={movie?.thumbnailUrl}
        autoPlay
        muted
        loop
        className='h-[56.25vw] w-full object-cover brightness-[60%]'
      />
      <div className='absolute top-[30%] ml-4 md:top-[40%] md:ml-16'>
        <p className='text-1xl h-full font-bold text-white drop-shadow-xl md:text-5xl lg:text-6xl'>
          {movie?.title}
        </p>
        <p className='mt-3 w-[90%] text-[8px] text-white drop-shadow-xl md:mt-8 md:w-[80%] md:text-lg lg:w-1/2'>
          {movie?.description}
        </p>
        <div className='mt-3 flex items-start gap-3 md:mt-4'>
          <Link
            href={`/watch/${movie?.id}`}
            className='flex  w-auto  flex-row items-center  rounded-md bg-white px-2  py-1 text-xs  font-semibold transition hover:bg-neutral-300 md:px-4 md:py-2 lg:text-lg '
          >
            <BsFillPlayFill className='mr-1 w-4 text-black md:w-7' />
            Play
          </Link>
          <button
            onClick={() => {
              if (!movie) return;
              openModal(movie);
            }}
            className='flex items-center rounded-md bg-white bg-opacity-30 px-2 py-1 text-xs text-white transition hover:bg-opacity-20 md:px-4 md:py-2 lg:text-lg'
          >
            <AiOutlineInfoCircle className='mr-1' />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}
