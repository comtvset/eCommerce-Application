import { useState } from 'react';
import { RegistrationPage } from './logic/registrationPage/RegistrationPage.tsx';

export const App = () => {
  const [showRegistration, setShowRegistration] = useState<boolean>(false);

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
    </div>
  );
};
