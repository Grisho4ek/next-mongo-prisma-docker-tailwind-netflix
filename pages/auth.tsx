import Input from '@/components/Input';
import Image from 'next/image';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
// import { FaGithub } from 'react-icons/fa';

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin(!isLogin);

  const login = async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const register = async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      });

      login();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='relative h-full w-full bg-[url("/images/hero.jpg")] bg-cover bg-fixed bg-center bg-no-repeat'>
      <div className='h-full w-full bg-black lg:bg-opacity-50'>
        <nav className='px-8 py-5 md:px-12'>
          <Image src='/images/logo.png' alt='Logo' height={48} width={178} />
        </nav>
        <div className='flex justify-center'>
          <div className='mt-2 w-full self-center rounded-md bg-black bg-opacity-70 px-8 py-8 md:px-16 md:py-16 lg:w-2/5'>
            <h2 className='mb-8 text-4xl font-semibold text-white'>
              {isLogin ? 'Sign in' : 'Create an account'}
            </h2>
            <div className='flex flex-col gap-4'>
              {!isLogin && (
                <Input
                  label='Username'
                  id='name'
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              )}
              <Input
                label='Email'
                id='email'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type='email'
              />
              <Input
                label='Password'
                id='password'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type='password'
              />
            </div>
            <button
              className='mt-10 w-full rounded-md bg-red-600 py-3 text-white transition hover:bg-red-700'
              onClick={isLogin ? login : register}
            >
              {isLogin ? 'Login' : 'Singup'}
            </button>
            <div className='mt-8 flex items-center justify-center gap-4'>
              <button
                className='flex h-10 cursor-pointer items-center justify-center rounded-full bg-white px-4 transition hover:opacity-80'
                onClick={() =>
                  signIn('google', {
                    callbackUrl: '/',
                  })
                }
              >
                <span className='me-3'>Continue with google</span>
                <FcGoogle size={30} />
              </button>
              {/* <button
                className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-80'
                onClick={() =>
                  signIn('github', {
                    callbackUrl: '/',
                  })
                }
              >
                <FaGithub size={30} />
              </button> */}
            </div>
            <p className='mt-12 text-neutral-500'>
              {isLogin
                ? 'First time using Netflix?'
                : 'Already have an account?'}
              <span
                className='ml-1 cursor-pointer text-white hover:underline'
                onClick={toggleLogin}
              >
                {isLogin ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
