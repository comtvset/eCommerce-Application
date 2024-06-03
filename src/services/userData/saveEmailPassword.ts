let savedEmail = '';
let savedPassword = 'null';

export const saveCredentials = (email: string, password: string) => {
  savedEmail = email;
  savedPassword = password;
};

export const updateEmail = (email: string) => {
  savedEmail = email;
};

export const getPassword = (): string => {
  return savedPassword;
};

export const getCredentials = () => {
  return {
    email: savedEmail,
    password: savedPassword,
  };
};
