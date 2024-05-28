import React, { useContext } from 'react';
import { CurrentUserContext } from 'src/App.tsx';

export const UserProfileForm: React.FC = () => {
  const context = useContext(CurrentUserContext);

  // Ensure context is not null
  if (!context) {
    throw new Error('UserProfileForm must be used within a CurrentUserContext.Provider');
  }

  // const { currentUser } = context;
  return <>Profile</>;
};
