import Lock from '@/icons/Lock';
import Phone from '@/icons/Phone';
import Show from '@/icons/Show';
import { cn } from '@/utils/tail';
import React, { useEffect, useId, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useModalContext } from '@/context/modal';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/authContext';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Некорректный email')
    .required('Обязательное поле')
    .matches(
      /^[a-zA-Z0-9][a-zA-Z0-9_.+-]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/,
      'Некорректный email'
    ),
  password: yup
    .string()
    .min(6, 'Минимум 6 символов')
    .matches(/^(?=.*[0-9])/, 'В пароле должна быть хотя бы 1 цифра')
    .required('Обязательное поле'),
  checkbox: yup.boolean().oneOf([true], 'Необходимо принять условия'),
});

const LoginForm = () => {
  const id = useId();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { setLoginModalOpen } = useModalContext();
  const { login } = useAuthContext();
  const router = useRouter();
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { ref, ...rest } = register('email');

  const onSubmit = async ({ email, password }) => {
    const err = await login({ email, password });
    if (err) {
      setError(err);
      return;
    }

    setLoginModalOpen(false);
    router.push('/');
  };

  return (
    <>
      <h3 className='text-white font-bold text-2xl mb-[50px] pt-[20px]'>
        Логин
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-6 w-full font-montserrat'
      >
        <div className='relative flex flex-col gap-2 text-white font-bold text-sm'>
          <label htmlFor={id + '-email'}>Ваш email:</label>
          <Phone className='absolute top-[43px] left-5' />

          <input
            className='w-full text-black rounded-3xl min-h-[47px] py-[15px]
            px-[60px] placeholder:text-black placeholder:font-medium placeholder:text-sm outline-mainColor'
            type='email'
            placeholder='Введите ваш email'
            aria-describedby={id + '-email-error-message'}
            id={id + '-email'}
            {...rest}
            ref={(e) => {
              ref(e);
              emailInputRef.current = e;
            }}
          />
          {errors.email && (
            <p
              id={id + '-email-error-message'}
              aria-live='assertive'
              className='text-red-500 text-xs'
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div className='relative flex flex-col gap-2 text-white font-bold text-sm'>
          <Lock className='absolute top-[43px] left-5' />
          <label htmlFor={id + '-password'}>Пароль:</label>
          <input
            className='w-full text-black rounded-3xl min-h-[47px] py-[15px] px-[60px] placeholder:text-black placeholder:font-medium placeholder:text-sm outline-mainColor'
            type={showPassword ? 'text' : 'password'}
            placeholder='Ваш пароль'
            id={id + '-password'}
            {...register('password')}
          />
          <button
            type='button'
            className='absolute top-[45px] right-[15px] p-1'
            onClick={toggleShowPassword}
          >
            <Show />
          </button>
          {errors.password && (
            <p className='text-red-500 text-xs'>{errors.password.message}</p>
          )}
          {error && <p className='text-red-500 text-xs'>{error}</p>}
        </div>

        <a href='#' className='text-blue-400 text-[12px]'>
          Забыли пароль?
        </a>

        <div className='flex gap-[18px] items-start'>
          <input
            type='checkbox'
            id={id + '-check'}
            className='mt-1'
            checked
            {...register('checkbox')}
          />
          <label
            htmlFor={id + '-check'}
            className='text-white text-[12px] font-medium max-w-[237px] cursor-pointer'
          >
            Нажимая кнопку, вы подтверждаете, что ознакомились и соглашаетесь с{' '}
            <a href='#' className='underline'>
              Условиями Соглашения!
            </a>{' '}
            Правилами и политикой конфиденциальности компании
          </label>
        </div>
        {errors.checkbox && (
          <p className='text-red-500 text-xs font-bold'>
            {errors.checkbox.message}
          </p>
        )}

        <button
          type='submit'
          className={cn('bg-primaryBg text-white rounded-full p-4', {
            'opacity-50': isSubmitting,
          })}
          disabled={isSubmitting}
        >
          Войти
        </button>
      </form>
    </>
  );
};

export default LoginForm;
