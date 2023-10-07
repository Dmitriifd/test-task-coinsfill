import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useStyle } from '@/hooks/useStyle';
import Close from '@/icons/Close';

const Modal = ({ open = true, onClose, children }) => {
  const [, setOverflow] = useStyle('overflow');

  const onKeyDown = ({ key }) => {
    switch (key) {
      case 'Escape':
        return onClose();
      default:
        return;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  useEffect(() => (open ? setOverflow('hidden') : setOverflow('auto')), [open]);

  if (!open) return null;

  return createPortal(
    // overlay
    <div
      onClick={onClose}
      className={`
      fixed inset-0 flex justify-center items-start
      transition-colors
      ${open ? 'visible bg-overlayColor' : 'invisible'}
    `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
        bg-modal min-h-[594px] bg-no-repeat bg-center bg-modal-gradient w-[375px] flex flex-col items-center
        bg-blue-600 rounded-[35px] shadow p-7 transition-all mt-[50px]
        ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
      `}
      >
        <button
          onClick={onClose}
          className='absolute top-[-10px] right-[-10px] p-1 w-[38px] h-[38px] rounded-full bg-yellowColor flex items-center justify-center'
        >
          <Close />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
