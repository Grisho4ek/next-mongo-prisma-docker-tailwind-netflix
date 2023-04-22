import { useRef } from 'react';
import { Transition } from 'react-transition-group';
import { RxCross1 } from 'react-icons/rx';
import ToogleFavoriteBtn from './ToogleFavoriteBtn';
import Link from 'next/link';
import { BsFillPlayFill } from 'react-icons/bs';

interface Props {
  isOpened: boolean;
  close: () => void;
  movie: Movie | undefined;
  toggleFavorite: (id: string, f: boolean) => void;
  favoritesIds: string[];
}

const Modal = ({
  isOpened,
  close,
  movie,
  toggleFavorite,
  favoritesIds,
}: Props) => {
  const nodeRef = useRef(null);

  const isFavorite = favoritesIds.includes(movie?.id || '');

  return (
    <Transition
      nodeRef={nodeRef}
      in={isOpened}
      timeout={300}
      mountOnEnter
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-80 transition duration-300'
      >
        <div className='relative mx-auto w-auto max-w-3xl overflow-hidden rounded-md'>
          <div
            className={`${
              isOpened ? 'animate-zoomIn' : 'animate-zoomOut'
            } relative flex-auto transform bg-zinc-900 drop-shadow-md duration-300`}
          >
            <div className='relative h-96'>
              <video
                poster={movie?.thumbnailUrl}
                autoPlay
                muted
                loop
                src={movie?.videoUrl}
                className='h-full w-full object-cover brightness-[60%]'
              />
              <div
                onClick={close}
                className='absolute right-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-70'
              >
                <RxCross1 className='w-6 text-white' />
              </div>
              <div className='absolute bottom-0 left-10'>
                <p className='mb-4 h-full text-3xl font-bold text-white md:text-4xl lg:text-5xl'>
                  {movie?.title}
                </p>
                <div className='mb-4 flex flex-row items-center gap-4'>
                  <Link
                    href={`/watch/${movie?.id}`}
                    className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white transition hover:bg-neutral-300 lg:h-10 lg:w-10'
                  >
                    <BsFillPlayFill className='w-4 text-black lg:w-6' />
                  </Link>
                  <ToogleFavoriteBtn
                    isFavorite={isFavorite}
                    onClick={() => {
                      if (!movie) return;
                      toggleFavorite(movie.id, isFavorite);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className='px-12 py-8'>
              <div className='mb-8 flex flex-row items-center gap-2'>
                <p className='text-lg font-semibold text-green-400'>New</p>
                <p className='text-lg text-white'>{movie?.duration}</p>
                <p className='text-lg text-white'>{movie?.genre}</p>
              </div>
              <p className='text-lg text-white'>{movie?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Modal;
