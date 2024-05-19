import React, { useEffect, useState, useCallback } from 'react';
import styles from 'src/logic/loginPage/loginPage.module.scss';

import { validationEmail, validationPassword } from 'src/components/validation/validationForm.ts';
import { Paragraph } from 'src/components/text/Text.tsx';
import { Link } from 'src/components/link/Link.tsx';

export const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const handleValidation = useCallback(() => {
    if (email) {
      const emailError = validationEmail(email);
      setErrorEmail(emailError);
    } else {
      setErrorEmail('');
    }

    if (password) {
      const passwordError = validationPassword(password);
      setErrorPassword(passwordError);
    } else {
      setErrorPassword('');
    }
  }, [email, password]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!email) {
      setErrorEmail('⚠ This field is required!');
    }
    if (!password) {
      setErrorPassword('⚠ This field is required!');
    }
    if (email && password) {
      setEmail('');
      setPassword('');
    }
  };

  useEffect(() => {
    handleValidation();
  }, [email, password, handleValidation]);

  return (
    <form className={styles.form}>
      <input
        className="inputText"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <span className={styles.error}>{errorEmail}</span>

      <input
        className="inputText"
        placeholder="Password"
        value={password}
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <span className={styles.error}>{errorPassword}</span>

      <button type="submit" onClick={handleClick} disabled={false}>
        LOG IN
      </button>
      <div className={styles.link_register}>
        <Paragraph tag="p" className={styles.login_text} title="Don’t have an account?" />
        <Link to="/register" title="REGISTER" className={styles.login_link} />
      </div>
    </form>
  );
};
