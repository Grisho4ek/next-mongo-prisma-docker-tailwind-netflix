import MovieCard from './MovieCard';

interface Props {
  movies: Movie[];
  title: string;
  toggleFavorite: (id: string, f: boolean) => void;
  favoritesIds: string[];
}

export default function MoviesGrid({
  movies,
  title,
  favoritesIds,
  toggleFavorite,
}: Props) {
  if (!movies.length) return null;

  return (
    <div className='mt-4 space-y-8 px-4 md:px-12'>
      <div>
        <p className='text-md mb-4 font-semibold text-white md:text-xl lg:text-2xl'>
          {title}
        </p>
        <div className='grid grid-cols-4 gap-2'>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              favoritesIds={favoritesIds}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
