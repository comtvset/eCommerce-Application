import React from 'react';
import { Layout } from 'src/components/layout/Layout.tsx';
import style from 'src/components/layout/Layout.module.scss';

export const Error: React.FC = () => {
  return (
    <Layout className={style.layout}>
      <p>ERROR</p>
    </Layout>
  );
};
