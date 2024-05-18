import { useState } from 'react';
import styleLogin from 'src/logic/loginPage/loginPage.module.scss';
import styleRegistration from 'src/logic/registrationPage/registration.module.scss';
import { validateEmail } from 'src/components/validation/Validation.tsx';

export const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  interface ValidationRuleResult {
    validateEmail: boolean;
    validatePassword: boolean;
    validateFirstName: boolean;
  }

  const validationRuleResult: ValidationRuleResult = {
    validateEmail: false,
    validatePassword: false,
    validateFirstName: false,
  };

  const validateInputs = (): boolean => {
    return (
      validationRuleResult.validateEmail &&
      validationRuleResult.validatePassword &&
      validationRuleResult.validateFirstName &&
      validationRuleResult.validateFirstName
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInputs()) {
      setIsDisabled(false);
    }
  };

  return (
    <form className={styleLogin.form} onSubmit={handleSubmit} onChange={handleSubmit}>
      <input
        className="inputText"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          const { value } = e.target;
          setEmail(value);
          validationRuleResult.validateEmail = validateEmail(value);
        }}
        required
      />
      <input
        className="inputText"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required
      />
      <input
        className="inputText"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <input
        className="inputText"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        required
      />
      <input
        className="inputText"
        placeholder="Date of birth"
        value={dateOfBirth}
        onChange={(e) => {
          setDateOfBirth(e.target.value);
        }}
        required
      />
      <h2>Shipping address</h2>
      <input
        className="inputText"
        placeholder="Street"
        value={street}
        onChange={(e) => {
          setStreet(e.target.value);
        }}
        required
      />
      <input
        className="inputText"
        placeholder="City"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
        required
      />
      <input
        className="inputText"
        placeholder="Postal code"
        value={postalCode}
        onChange={(e) => {
          setPostalCode(e.target.value);
        }}
        required
      />
      <input
        className="inputText"
        placeholder="Country"
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
        }}
        required
      />
      <h2>Billing address</h2>
      <input
        className="inputText"
        placeholder="Street"
        value={street}
        onChange={(e) => {
          setStreet(e.target.value);
        }}
        required
      />
      <input
        className="inputText"
        placeholder="City"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
        required
      />
      <input
        className="inputText"
        placeholder="Postal code"
        value={postalCode}
        onChange={(e) => {
          setPostalCode(e.target.value);
        }}
        required
      />
      <input
        className="inputText"
        placeholder="Country"
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
        }}
        required
      />

      <button className={styleRegistration.submitButton} type="submit" disabled={isDisabled}>
        APPLY
      </button>
    </form>
  );
};
