let savedEmail = '';
let savedPassword = 'null';

export const saveCredentials = (email: string, password: string) => {
  savedEmail = email;
  savedPassword = password;
};

export const getCredentials = () => {
  return {
    email: savedEmail,
    password: savedPassword,
  };
};
