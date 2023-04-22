import Image from 'next/image';
import NavbarItem from './NavbarItem';
import { BsBell, BsChevronDown, BsSearch } from 'react-icons/bs';
import MobileMenu from './MobileMenu';
import { useState } from 'react';
import AccountMenu from './AccountMenu';
import { useEffect } from 'react';
const TOP_OFFSET = 66;

export default function Navbar() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isAccountMenuOpened, setIsAccountMenuOpened] = useState(false);
  const [isBackgroundShown, setIsBackgroundShown] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };
  const toggleAccountMenu = () => {
    setIsAccountMenuOpened(!isAccountMenuOpened);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsBackgroundShown(window.scrollY >= TOP_OFFSET);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className='fixed z-40 w-full'>
      <div
        className={`transiiton flex items-center px-4 py-6 duration-500 md:px-16 ${
          isBackgroundShown ? 'bg-zinc-900 opacity-90' : ''
        }`}
      >
        <div className='relative h-6 w-[89px] lg:h-12 lg:w-[178px]'>
          <Image src='/images/logo.png' alt='Logo' fill />
        </div>
        <div className='ml-8 hidden gap-7 lg:flex'>
          <NavbarItem label='Home' />
          <NavbarItem label='Series' />
          <NavbarItem label='Films' />
          <NavbarItem label='New & Popular' />
          <NavbarItem label='My List' />
          <NavbarItem label='Browse by languages' />
        </div>
        <div
          className='relative ml-8 flex cursor-pointer items-center gap-2 lg:hidden'
          onClick={toggleMenu}
        >
          <p className='text-sm text-white'>Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              isMenuOpened ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <MobileMenu isOpened={isMenuOpened} />
        </div>
        <div className='ml-auto flex flex-row items-center gap-7'>
          <div className='cursor-pointer text-gray-200 transition hover:text-gray-300'>
            <BsSearch className='w-6' />
          </div>
          <div className='cursor-pointer text-gray-200 transition hover:text-gray-300'>
            <BsBell className='w-6' />
          </div>
          <div
            onClick={toggleAccountMenu}
            className='relative flex cursor-pointer flex-row items-center gap-2'
          >
            <div className='relative h-6 w-6 overflow-hidden rounded-md lg:h-10 lg:w-10'>
              <Image src='/images/default-blue.png' alt='Profile' fill />
            </div>
            <BsChevronDown
              className={`w-4 fill-white text-white transition ${
                isAccountMenuOpened ? 'rotate-180' : 'rotate-0'
              }`}
            />
            <AccountMenu isOpened={isAccountMenuOpened} />
          </div>
        </div>
      </div>
    </nav>
  );
}
