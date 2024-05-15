import React from 'react';
import styles from 'src/components/header/Header.module.scss';
import { Link } from 'components/link/Link.tsx';

const links = [
  {
    to: '/login',
    title: 'LOG IN',
    id: 1,
  },
  {
    to: '/register',
    title: 'REGISTER',
    id: 2,
  },
];

export const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" title="Cozy House" className={styles.logo} />
        <nav className={styles.navigation}>
          {links.map((link) => (
            <Link key={link.id} to={link.to} title={link.title} className={styles.link} />
          ))}
        </nav>
      </header>
      <section className={styles.main} />
    </div>
  );
};
