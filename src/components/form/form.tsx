import styles from 'src/logic/loginPage/loginPage.module.scss';

export const Form = () => {
  return (
    <form className={styles.form}>
      <input className="inputText" placeholder="Email" />
      <input className="inputText" placeholder="Password" />
    </form>
  );
};
