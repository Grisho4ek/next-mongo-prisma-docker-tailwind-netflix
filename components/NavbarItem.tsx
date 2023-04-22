import React from 'react';

interface NavbarItemProps {
  label: string;
  active?: boolean;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, active }) => {
  return (
    <div
      className={
        active
          ? 'cursor-default text-white'
          : 'cursor-pointer text-gray-200 transition hover:text-gray-300'
      }
    >
      {label}
    </div>
  );
};

export default NavbarItem;
