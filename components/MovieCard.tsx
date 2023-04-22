import Image from 'next/image';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import useUser from '@/hooks/useUser';
import axios from 'axios';
import Link from 'next/link';

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  // const { openModal } = useInfoModalStore();

  // const redirectToWatch = () => router.push(`/watch/${movie.id}`);

  const { data: user, mutate } = useUser();
  const isFavorite = user?.favoriteIds.includes(movie.id);

  const toggleFavorites = async () => {
    if (!user) return;
    let res;

    if (isFavorite) {
      res = await axios.delete(`/api/favorites/${movie.id}`);
    } else {
      res = await axios.post(`/api/favorites/${movie.id}`);
    }

    mutate({
      ...user,
      favoriteIds: res?.data?.favoriteIds,
    });
  };

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div className='group relative h-[12vw] bg-zinc-900'>
      <Link
        className='relative block h-[12vw] w-full'
        href={`/watch/${movie.id}`}
      >
        <Image
          src={movie.thumbnailUrl}
          alt='Movie'
          draggable={false}
          className='duration cursor-pointer rounded-md object-cover shadow-xl transition delay-300 group-hover:opacity-90 sm:group-hover:opacity-0'
          fill
        />
      </Link>
      <div className='invisible absolute top-0 z-10 w-full scale-0 opacity-0 transition delay-300 duration-200 group-hover:-translate-y-[6vw] group-hover:scale-110 group-hover:opacity-100 sm:visible'>
        <Link
          className='relative block h-[12vw] w-full'
          href={`/watch/${movie.id}`}
        >
          <Image
            src={movie.thumbnailUrl}
            alt='Movie'
            draggable={false}
            className='duration cursor-pointer rounded-t-md object-cover shadow-xl transition'
            fill
          />
        </Link>
        <div className='absolute z-10 w-full rounded-b-md bg-zinc-800 p-2 shadow-md transition lg:p-4'>
          <div className='flex flex-row items-center gap-3'>
            <Link
              href={`/watch/${movie.id}`}
              className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white transition hover:bg-neutral-300 lg:h-10 lg:w-10'
            >
              <BsFillPlayFill className='w-4 text-black lg:w-6' />
            </Link>
            <button
              onClick={toggleFavorites}
              className='group/item flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-white transition hover:border-neutral-300 lg:h-10 lg:w-10'
            >
              <Icon className='w-4 text-white group-hover/item:text-neutral-300 lg:w-6' />
            </button>
            <button
              // onClick={() => openModal(data?.id)}
              className='group/item ml-auto flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-white transition hover:border-neutral-300 lg:h-10 lg:w-10'
            >
              {/* <ChevronDownIcon className='w-4 text-white group-hover/item:text-neutral-300 lg:w-6' /> */}
            </button>
          </div>
          <p className='mt-4 font-semibold text-green-400'>
            New <span className='text-white'>2023</span>
          </p>
          <p className='mt-4 text-[10px] text-white lg:text-sm'>
            {movie.duration}
          </p>
          <p className='mt-4 text-[8px] text-white lg:text-sm'>{movie.genre}</p>
        </div>
      </div>
    </div>
  );
}
