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
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const countProducts = 0;
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
    if (!user && window.location.pathname === '/profile') {
      navigation('/login');
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

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
    document.body.classList.add('open');
    document.body.style.overflow = '';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('open');
  };

  const isProductPage = location.startsWith('/product/');
  const is404Page =
    !isProductPage &&
    location !== '/' &&
    location !== '/login' &&
    location !== '/register' &&
    location !== '/catalog' &&
    location !== '/profile' &&
    location !== '/about_us' &&
    location !== '/basket';
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
        <div
          className={styles.burger}
          onClick={toggleMenu}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') toggleMenu();
          }}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </div>
        <nav className={`${styles.navigation} ${isMenuOpen ? styles.open : ''}`}>
          <Link
            to="/catalog"
            title="CATALOG"
            className={`${styles.link} ${activeLink === '/catalog' ? styles.active : ''}`}
            onClick={closeMenu}
          />
          <Link
            to="/about_us"
            title="ABOUT US"
            className={`${styles.link} ${activeLink === '/about_us' ? styles.active : ''}`}
            onClick={closeMenu}
          />

          {!isLoggedIn ? (
            <div className={`${styles.login_container} ${isToken ? styles.hidden : ''}`}>
              {links.map((link) => (
                <Link
                  key={link.id}
                  to={link.to}
                  title={link.title}
                  className={`${styles.link} ${activeLink === link.to ? styles.active : ''}`}
                  onClick={closeMenu}
                />
              ))}
            </div>
          ) : (
            <div className={styles.logout_container}>
              <Link
                to="/profile"
                title="PROFILE"
                className={`${styles.logout} ${activeLink === '/profile' ? styles.active : ''}`}
                onClick={closeMenu}
              />
              <Link onClick={handelLogout} to="/" title="LOGOUT" className={styles.logout} />
            </div>
          )}
        </nav>
        <Link
          to="/basket"
          className={`${styles.link_basket} ${activeLink === '/basket' ? styles.active : ''}`}
        >
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <title />
            <g data-name="1" id="_1">
              <path d="M397.78,316H192.65A15,15,0,0,1,178,304.33L143.46,153.85a15,15,0,0,1,14.62-18.36H432.35A15,15,0,0,1,447,153.85L412.4,304.33A15,15,0,0,1,397.78,316ZM204.59,286H385.84l27.67-120.48H176.91Z" />
              <path d="M222,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,222,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,222,365.05Z" />
              <path d="M368.42,450a57.48,57.48,0,1,1,57.48-57.48A57.54,57.54,0,0,1,368.42,450Zm0-84.95a27.48,27.48,0,1,0,27.48,27.47A27.5,27.5,0,0,0,368.42,365.05Z" />
              <path d="M158.08,165.49a15,15,0,0,1-14.23-10.26L118.14,78H70.7a15,15,0,1,1,0-30H129a15,15,0,0,1,14.23,10.26l29.13,87.49a15,15,0,0,1-14.23,19.74Z" />
            </g>
          </svg>
          <sup className={`${styles.count} ${activeLink === '/basket' ? styles.active : ''}`}>
            {countProducts}
          </sup>
        </Link>
      </header>
      <section className={styles.main} />
    </div>
  );
};
