import { useState } from 'react';
import styleLogin from 'src/logic/loginPage/loginPage.module.scss';
import styleRegistration from 'src/logic/registrationPage/registration.module.scss';

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

  const validateInputs = () => {
    return false;
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
          setEmail(e.target.value);
        }}
      />
      <input
        className="inputText"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
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
      />
      <input
        className="inputText"
        placeholder="Date of birth"
        value={dateOfBirth}
        onChange={(e) => {
          setDateOfBirth(e.target.value);
        }}
      />
      <h2>Shipping address</h2>
      <input
        className="inputText"
        placeholder="Street"
        value={street}
        onChange={(e) => {
          setStreet(e.target.value);
        }}
      />
      <input
        className="inputText"
        placeholder="City"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <input
        className="inputText"
        placeholder="Postal code"
        value={postalCode}
        onChange={(e) => {
          setPostalCode(e.target.value);
        }}
      />
      <input
        className="inputText"
        placeholder="Country"
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />
      <h2>Billing address</h2>
      <input
        className="inputText"
        placeholder="Street"
        value={street}
        onChange={(e) => {
          setStreet(e.target.value);
        }}
      />
      <input
        className="inputText"
        placeholder="City"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <input
        className="inputText"
        placeholder="Postal code"
        value={postalCode}
        onChange={(e) => {
          setPostalCode(e.target.value);
        }}
      />
      <input
        className="inputText"
        placeholder="Country"
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />

      <button className={styleRegistration.submitButton} type="submit" disabled={isDisabled}>
        APPLY
      </button>
    </form>
  );
};
