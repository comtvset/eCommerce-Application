import React, { useEffect, useState, useCallback } from 'react';
import styles from 'src/logic/loginPage/loginPage.module.scss';
import { validationEmail, validationPassword } from 'src/components/validation/validationForm.ts';
import { myStatus } from 'src/components/tempFolderForDevelop/fakeState.ts';
import { IResponse, myRedirect } from 'src/components/tempFolderForDevelop/redirect.ts';
import { ModalWindow } from 'src/components/modalWindow/modalWindow.tsx';
import { useNavigate } from 'react-router-dom';

export const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<IResponse | null>(null);

  const navigation = useNavigate();

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

    const emailError = validationEmail(email);
    const passwordError = validationPassword(password);

    if (!email) {
      setErrorEmail('⚠ This field is required!');
    }
    if (!password) {
      setErrorPassword('⚠ This field is required!');
    }

    if (emailError.length === 0 && passwordError.length === 0) {
      const responseServer = myStatus(true);
      myRedirect(responseServer, navigation);
      setEmail('');
      setPassword('');

      setModalData(responseServer);
      setShowModal(true);
    }
  };

  useEffect(() => {
    handleValidation();
  }, [email, password, handleValidation]);

  return (
    <>
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
      </form>
      {showModal && modalData && <ModalWindow data={modalData} />}
    </>
  );
};
