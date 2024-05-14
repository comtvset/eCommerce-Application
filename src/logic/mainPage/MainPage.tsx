import React from 'react';
import { Layout } from 'components/layout/Layout.tsx';
import { Header } from 'src/components/header/Header.tsx';
import style from 'components/layout/Layout.module.scss';

export const Main: React.FC = () => {
  return (
    <Layout className={style.layout}>
      <Header />
    </Layout>
  );
};
