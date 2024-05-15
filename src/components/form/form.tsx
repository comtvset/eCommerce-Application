import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { validationRuleForEmail, validationRuleForPassword } from 'src/components/form/validationRules';
import show from 'src/public/show.png';
import hide from 'src/public/hide.png';
import styles from 'src/logic/loginPage/loginPage.module.scss';

interface IFormInput {
  email: string;
  password: string;
}

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    mode: 'all',
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    alert(JSON.stringify(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label htmlFor="Email" className={styles.field}>
        EMAIL
        <input
          className={styles.input_login}
          type="text"
          {...register('email', {
            required: '⚠ This field is required',
            validate: validationRuleForEmail,
          })}
        />
      </label>
      <div className={styles.error_login}>{errors.email && <span>{errors.email.message || '⚠ Error!'}</span>}</div>

      <label htmlFor="Password" className={styles.field}>
        PASSWORD
        <input
          className={styles.input_login}
          type={showPassword ? 'text' : 'password'}
          {...register('password', {
            required: '⚠ This field is required',
            validate: validationRuleForPassword,
          })}
        />
      </label>
      <div className={styles.error_login}>{errors.password && <span>{errors.password.message}</span>}</div>
      <div className={styles.img_container}>
        <img
          className={styles.show_img}
          src={showPassword ? show : hide}
          alt={showPassword ? 'Show Password' : 'Hide Password'}
          style={{ cursor: 'pointer' }}
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>

      <div className={styles.button_container}>
        <input className={styles.button_login} type="submit" value="LOG IN" />
      </div>

      <div className={styles.registration_container}>
        <div className={styles.registration_title}>Don’t have an account?</div>
          <button style={{backgroundColor:'#94B21B'}} className={styles.button_login}>SING UP</button>
        </div>
    </form>

  );
}
