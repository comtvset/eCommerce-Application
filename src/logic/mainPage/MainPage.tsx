import React from 'react';
import { Layout } from 'components/layout/Layout.tsx';
import styles from 'src/logic/mainPage/MainPAge.module.scss';
import style from 'components/layout/Layout.module.scss';

export const Main: React.FC = () => {
  return (
    <Layout className={style.layout}>
      <section className={styles.main} />
    </Layout>
  );
};
