import React, { useEffect, useState } from 'react';
import styles from 'src/components/header/Header.module.scss';
import { Link } from 'components/link/Link.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form } from 'src/components/form/form.tsx';

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
  const navigation = useNavigate();
  const [activeLink, setActiveLink] = useState<string>(location);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setActiveLink(location);
    const user = localStorage.getItem('userTokens');
    setIsLoggedIn(!!user);
  }, [location]);

  useEffect(() => {
    const user = localStorage.getItem('userTokens');
    if (user && window.location.pathname === '/login') {
      navigation('/');
    }
  }, [navigation]);

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const handelLogout = () => {
    clearLocalStorage();
    setIsLoggedIn(false);
    Form();
  };

  const is404Page = location !== '/' && location !== '/login' && location !== '/register';
  const isHeaderInactive = location === '/';
  const isToken = localStorage.getItem('userTokens');
  return (
    <div className={`${styles.header} ${is404Page ? styles.hidden : ''}`}>
      <header className={styles.container}>
        <Link
          to="/"
          title="Cozy House"
          className={`${styles.logo} ${isHeaderInactive ? styles.inactive : ''}`}
        />
        <nav className={styles.navigation}>
          {!isLoggedIn ? (
            <div className={`${styles.login_container} ${isToken ? styles.hidden : ''}`}>
              {links.map((link) => (
                <Link
                  key={link.id}
                  to={link.to}
                  title={link.title}
                  className={`${styles.link} ${activeLink === link.to ? styles.active : ''}`}
                />
              ))}
            </div>
          ) : (
            <Link onClick={handelLogout} to="/" title="LOGOUT" className={styles.logout} />
          )}
        </nav>
      </header>
      <section className={styles.main} />
    </div>
  );
};
