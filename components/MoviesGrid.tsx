import MovieCard from './MovieCard';

interface Props {
  data: Movie[];
  title: string;
}

export default function MoviesGrid({ data, title }: Props) {
  if (!data.length) return null;
  return (
    <div className='mt-4 space-y-8 px-4 md:px-12'>
      <div>
        <p className='text-md mb-4 font-semibold text-white md:text-xl lg:text-2xl'>
          {title}
        </p>
        <div className='grid grid-cols-4 gap-2'>
          {data.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
