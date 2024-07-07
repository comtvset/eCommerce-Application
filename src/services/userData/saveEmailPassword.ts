export const state = {
  savedEmail: '',
  savedPassword: '',
};

export const saveCredentials = (email: string, password: string) => {
  state.savedEmail = email;
  state.savedPassword = password;
};

export const updateEmail = (email: string) => {
  state.savedEmail = email;
};

export const setPassword = (password: string) => {
  state.savedPassword = password;
};

export const getPassword = (): string => {
  return state.savedPassword;
};

export const getCredentials = () => {
  return {
    email: state.savedEmail,
    password: state.savedPassword,
  };
};
