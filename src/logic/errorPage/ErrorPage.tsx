import React from 'react';
import { Link } from 'src/components/link/Link.tsx';
import { Layout } from 'src/components/layout/Layout.tsx';
import { Text } from 'src/components/text/Text.tsx';
import style from 'src/logic/errorPage/ErrorPage.module.scss';

export const Error: React.FC = () => {
  return (
    <Layout className={style.error_layout}>
      <div className={style.error_container}>
        <Text className={style.error_title} title="404" />
        <Text className={style.error_text} title="Sorry, this page is not found." />
        <Link to="/" title="MAIN PAGE" className={style.error_link} />
      </div>
    </Layout>
  );
};
