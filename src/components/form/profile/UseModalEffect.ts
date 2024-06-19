import { useEffect } from 'react';

export const useModalEffect = (
  modalData: { status: string; message: string },
  setModalData: React.Dispatch<React.SetStateAction<{ status: string; message: string }>>,
) => {
  useEffect(() => {
    if (modalData.status) {
      const timer = setTimeout(() => {
        setModalData({ status: '', message: '' });
      }, 4000);

      return () => {
        clearTimeout(timer);
      };
    }
    return () => {
      ('');
    };
  }, [modalData, setModalData]);
};

export default useModalEffect;
