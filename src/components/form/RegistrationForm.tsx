import style from 'src/logic/loginPage/loginPage.module.scss';

export const RegistrationForm = () => {
  return (
    <form className={style.form}>
      <input className="inputText" placeholder="Email" />
      <input className="inputText" placeholder="Password" />
      <input className="inputText" placeholder="First name" />
      <input className="inputText" placeholder="Last name" />
      <input className="inputText" placeholder="Date of birth" />
      <input className="inputText" placeholder="Street" />
      <input className="inputText" placeholder="City" />
      <input className="inputText" placeholder="Postal code" />
      <input className="inputText" placeholder="Country" />
    </form>
  );
};
