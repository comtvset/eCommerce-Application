import { Form } from 'src/components/form/form';
import styles from "src/logic/loginPage/loginPage.module.scss";

const Login = () => {
  return (
    <>
      <div className={styles.container_login}>
        <div className={styles.login}>
          <Form />
        </div>
      </div>
    </>
  );
};

export { Login };
