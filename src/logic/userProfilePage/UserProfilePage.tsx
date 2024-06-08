import React from 'react';
import { UserProfileForm } from 'src/components/form/profile/UserProfileForm.tsx';

const UserProfilePage: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <UserProfileForm />
    </React.Suspense>
  );
};

export default UserProfilePage;
