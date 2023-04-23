import { Movie } from '@prisma/client';
import { create } from 'zustand';

export interface ModalStore {
  movie?: Movie;
  isModalOpened: boolean;
  openModal: (movie: Movie) => void;
  closeModal: () => void;
}

const useModal = create<ModalStore>((set) => ({
  movie: undefined,
  isModalOpened: false,
  openModal: (movie: Movie) => set({ isModalOpened: true, movie }),
  closeModal: () => set({ isModalOpened: false, movie: undefined }),
}));

export default useModal;
