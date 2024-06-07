import React, { ReactNode } from 'react';
import style from 'src/components/modalWindow/modalImage.module.scss';
import closeIcon from 'src/public/icons8-close-64.png';

interface ModalProps {
  children: ReactNode;
  closeModalWindow: () => void;
}
export const Modal: React.FC<ModalProps> = ({ children, closeModalWindow }) => {
  return (
    <div className={style.modal}>
      <div className={style.modal_content}>
        {children}
        <div
          className={style.close_container}
          role="button"
          tabIndex={0}
          onClick={closeModalWindow}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              closeModalWindow();
            }
          }}
        >
          <img src={closeIcon} className={style.modal_close} alt="close_image" />
        </div>
      </div>
    </div>
  );
};
