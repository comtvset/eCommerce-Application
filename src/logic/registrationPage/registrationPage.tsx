import React from 'react';
import { RegistrationForm } from 'src/components/form/registration/RegistrationForm.tsx';

const RegistrationPage: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <RegistrationForm />
    </React.Suspense>
  );
};

export default RegistrationPage;
