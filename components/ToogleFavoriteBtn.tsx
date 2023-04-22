import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';

interface Props {
  isFavorite: boolean;
  onClick: () => void;
}

export default function ToogleFavoriteBtn({ isFavorite, onClick }: Props) {
  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <button
      onClick={onClick}
      className='group/item flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-white transition hover:border-neutral-300 lg:h-10 lg:w-10'
    >
      <Icon className='w-4 text-white group-hover/item:text-neutral-300 lg:w-6' />
    </button>
  );
}
