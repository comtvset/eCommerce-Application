import React, { useEffect, useState } from 'react';
import styles from 'src/components/header/Header.module.scss';
import { Link } from 'components/link/Link.tsx';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation().pathname;
  const [activeLink, setActiveLink] = useState<string>(location);

  useEffect(() => {
    setActiveLink(location);
  }, [location]);

  const is404Page = location !== '/' && location !== '/login' && location !== '/register';
  const isHeaderInactive = location === '/';
  return (
    <div className={`${styles.header} ${is404Page ? styles.hidden : ''}`}>
      <header className={styles.container}>
        <Link
          to="/"
          title="Cozy House"
          className={`${styles.logo} ${isHeaderInactive ? styles.inactive : ''}`}
        />
        <nav className={styles.navigation}>
          {links.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              title={link.title}
              className={`${styles.link} ${activeLink === link.to ? styles.active : ''}`}
            />
          ))}
        </nav>
      </header>
      <section className={styles.main} />
    </div>
  );
};
