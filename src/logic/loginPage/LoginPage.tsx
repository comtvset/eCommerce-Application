import { Form } from 'src/components/form/form.tsx';
import styles from 'src/logic/loginPage/loginPage.module.scss';
import { sdkTest } from 'src/services/api/ctpClient.ts';

const Login = () => {
  sdkTest();
  return (
    <div className={styles.container_login}>
      <div className={styles.login}>
        <Form />
      </div>
    </div>
  );
};

export { Login };
