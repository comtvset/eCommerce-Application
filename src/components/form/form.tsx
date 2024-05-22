import React, { useEffect, useState, useCallback } from 'react';
import styles from 'src/logic/loginPage/loginPage.module.scss';
import myStyles from 'src/components/form/RegistrationForm.module.scss';
import { validationEmail, validationPassword } from 'src/components/validation/validationForm.ts';
import { myStatus } from 'src/components/tempFolderForDevelop/statusHandler.ts';
import { IResponse, myRedirect } from 'src/components/tempFolderForDevelop/responseHandler.ts';
import { ModalWindow } from 'src/components/modalWindow/modalWindow.tsx';
import { useNavigate } from 'react-router-dom';
import { Paragraph } from 'src/components/text/Text.tsx';
import { Link } from 'src/components/link/Link.tsx';
import { loginRequest } from 'src/services/api/loginRequest.ts';
import { saveCredentials } from 'src/services/userData/saveEmailPassword.ts';

export const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<IResponse | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
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
      try {
        saveCredentials(email, password);
        await loginRequest(email, password);

        const responseServer = myStatus(true);
        myRedirect(responseServer);

        setEmail('');
        setPassword('');
        navigation('/');
        setModalData(responseServer);
        setShowModal(true);
      } catch (error) {
        const responseServer = myStatus(false);
        myRedirect(responseServer);
        setModalData(responseServer);
        setShowModal(true);
      }
    }
  };

  useEffect(() => {
    handleValidation();
  }, [email, password, handleValidation]);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
    return () => {
      ('');
    };
  }, [showModal]);

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
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <span className={styles.error}>{errorPassword}</span>

        <label className={myStyles.myLabel}>
          Show Password
          <input
            className={myStyles.myInput}
            type="checkbox"
            checked={showPassword}
            onChange={(event) => {
              setShowPassword(event.target.checked);
            }}
          />
        </label>

        <button
          className={myStyles.myButton}
          type="submit"
          onClick={(event) => {
            handleClick(event).catch((error: unknown) => {
              return error;
            });
          }}
          disabled={false}
        >
          LOG IN
        </button>
        <div className={styles.link_register}>
          <Paragraph tag="p" className={styles.login_text} title="Don't have an account?" />
          <Link to="/register" title="REGISTER" className={styles.login_link} />
        </div>
      </form>
      {showModal && modalData && <ModalWindow data={modalData} />}
    </>
  );
};
