import { useModalContext } from '@/context/modal';

export default function Home() {
  const { setRegistrModalOpen } = useModalContext();

  return (
    <>
      <section className='container min-h-[500px] header pt-[47px]'>
        <div className='mt-[57px]'>
          <h1 className='font-bold text-white text-2xl max-w-[255px] mb-[34px]'>
            CoinsFill — современная, надежная платежная система!
          </h1>
          <button
            className='bg-primaryBg rounded-full text-white text-sm
            font-bold py-4 px-9 shadow-loginBtn'
            onClick={() => setRegistrModalOpen(true)}
          >
            Регистрация
          </button>
        </div>
      </section>
    </>
  );
}
