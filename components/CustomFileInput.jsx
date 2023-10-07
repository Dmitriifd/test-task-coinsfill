import Download from '@/icons/Download';
import { baseApi } from '@/services/authServise';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

const CustomFileInput = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);
  const fileRef = useRef(null);
  const router = useRouter();

  const handlePick = () => {
    fileRef?.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Размер файла превышает 5 МБ.');
      return;
    }

    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError(
        'Недопустимый тип файла. Разрешены только изображения форматов JPG, PNG и GIF.'
      );
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveImage = async (event) => {
    event.preventDefault();

    if (error) {
      // Если есть ошибка, не отправляем форму
      return;
    }

    const formData = new FormData();
    formData.append('image', previewImage);

    try {
      const response = await baseApi.put(
        '/account/image',
        JSON.stringify({ image: previewImage }),
        {
          headers: {
            'Content-Type': 'application/json',
            'token-tt': localStorage.getItem('token'),
          },
        }
      );

      router.push('/profile');
    } catch (error) {
      console.error(error);
    }

    setPreviewImage(null);
  };

  const handleCancel = () => {
    setPreviewImage(null);
    setError(null);
  };

  return (
    <>
      <h2 className='mb-[37px] text-black text-2xl font-bold pt-[70px]'>
        Загрузка аватара
      </h2>

      <p className='mb-[43px] font-medium text-sm max-w-[252px]'>
        Загрузите файл размером до 5Мб По формату: JPG, PNG, GIF
      </p>

      <form onSubmit={handleSaveImage}>
        {!previewImage ? (
          <div className='upload-image pb-[115px]'>
            <button
              type='button'
              tabIndex={0}
              onClick={handlePick}
              className='flex items-center justify-center gap-2 bg-secondaryBg p-5 rounded-full w-full text-white mb-10 shadow-regBtn font-bold text-sm focus:outline-red-500
        focus:outline-2 focus:outline-offset-2'
            >
              <Download />
              Выбрать файл
            </button>
            {error && <div className='text-red-500 font-medium'>{error}</div>}
            <input
              tabIndex={-1}
              ref={fileRef}
              id='fileInput'
              type='file'
              name='image'
              accept='image/*,.jpg,.jpeg,.png,.gif'
              onChange={handleImageChange}
              className='visually-hidden'
            />
          </div>
        ) : (
          <div className='preview-image'>
            <h2 className='mb-[34px] text-black text-2xl font-bold '>
              Фото для аватарки
            </h2>

            <div className='flex items-center justify-center w-full min-h-[198px] bg-bgAvatar mb-[32px] rounded-[12px]'>
              <Image
                src={previewImage}
                width={170}
                height={170}
                alt=''
                className='w-[170px] h-[170px] rounded-full overflow-hidden object-cover'
              />
            </div>

            <button
              type='submit'
              className='flex items-center justify-center gap-2 bg-secondaryBg p-5 rounded-full w-full text-white mb-[10px] shadow-regBtn font-bold text-sm'
            >
              Сохранить
            </button>
            <button
              type='button'
              onClick={handleCancel}
              className='flex items-center justify-center gap-2 bg-lightBg p-5 rounded-full w-full text-black mb-10 shadow-regBtn font-bold text-sm'
            >
              Отменить
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default CustomFileInput;
