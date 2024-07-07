import React from 'react';
import style from 'src/components/lazyLoad/Spinner.module.scss';

const Spinner: React.FC = () => {
  return (
    <div className={style.spinner_overlay}>
      <div className={style.spinner} />
    </div>
  );
};

export default Spinner;
