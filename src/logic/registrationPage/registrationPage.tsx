import stylesLogin from 'src/logic/loginPage/loginPage.module.scss';
import { RegistrationForm } from 'src/components/form/RegistrationForm.tsx';

export const RegistrationPage = () => {
  return (
    <div className={stylesLogin.container_login}>
      <div className={stylesLogin.login}>
        <RegistrationForm />
      </div>
    </div>
  );
};
