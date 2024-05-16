import stylesLogin from 'src/logic/loginPage/loginPage.module.scss';
import stylesRegistration from 'src/logic/registrationPage/registration.module.scss';
import { RegistrationForm } from 'src/components/form/RegistrationForm.tsx';

export const RegistrationPage = () => {
  return (
    <div className={stylesLogin.container_login}>
      <div className={stylesRegistration.registration}>
        <h1>Create Account</h1>
        <RegistrationForm />
      </div>
    </div>
  );
};
