import React, { createContext, useState, useMemo } from 'react';
import { Router } from 'src/components/router/Router.tsx';
import { CustomerDraft } from '@commercetools/platform-sdk';

interface CurrentUserContextType {
  currentUser: CustomerDraft | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CustomerDraft | null>>;
}

export const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

export const App = () => {
  const [currentUser, setCurrentUser] = useState<CustomerDraft | null>(null);

  const contextValue = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
    }),
    [currentUser, setCurrentUser],
  );

  return (
    <CurrentUserContext.Provider value={contextValue}>
      <Router />
    </CurrentUserContext.Provider>
  );
};

export default App;
