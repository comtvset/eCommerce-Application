import React, { useState } from 'react';
import styles from 'src/logic/loginPage/loginPage.module.scss';

export const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    setEmail('');
    setPassword('');
  };

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
      <input
        className="inputText"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit" onClick={handleClick}>
        LOG IN
      </button>
    </form>
  );
};
