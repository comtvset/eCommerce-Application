import React from 'react';
import styles from 'src/components/header/Header.module.scss';
import { Link } from 'components/link/Link.tsx';

const links = [
  {
    to: '/login',
    title: 'LOG IN',
    className: styles.login,
  },
  {
    to: '/register',
    title: 'REGISTER',
    className: styles.register,
  },
];

export const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" title="Cozy House" className={styles.logo} />
        <nav className={styles.navigation}>
          {links.map((link) => (
            <Link key={link.to} to={link.to} title={link.title} className={link.className} />
          ))}
        </nav>
      </header>
      <section className={styles.main} />
    </div>
  );
};
