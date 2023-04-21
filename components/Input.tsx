import { InputHTMLAttributes } from 'react';

interface Props {
  label: string;
}

export default function Input({
  id,
  label,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & Props) {
  return (
    <div className='relative'>
      <input
        id={id}
        className='text-md peer block w-full appearance-none rounded-md bg-neutral-700 px-6 pb-1 pt-6 text-white focus:outline-none focus:ring-0'
        placeholder=' '
        {...rest}
      />
      <label
        htmlFor={id}
        className='text-md absolute left-6 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-zinc-400 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75'
      >
        {label}
      </label>
    </div>
  );
}
