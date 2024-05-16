import { useState } from 'react';
import { RegistrationPage } from 'src/logic/registrationPage/registrationPage.tsx';
import { Login } from 'src/logic/loginPage/LoginPage.tsx';

export const App = () => {
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);

  return (
    <div className="application">
      {!showRegistration && (
        <button
          type="button"
          onClick={() => {
            setShowRegistration(true);
          }}
        >
          Registration
        </button>
      )}
      {showRegistration && <RegistrationPage />}

      <button
        type="button"
        onClick={() => {
          setShowLogin(true);
        }}
      >
        Login
      </button>
      {showLogin && <Login />}
    </div>
  );
};
