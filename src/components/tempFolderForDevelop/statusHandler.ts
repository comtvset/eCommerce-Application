export const myStatus = (status: boolean, message: string) => {
  const obj = {
    status: '',
    message: '',
  };

  if (status) {
    obj.status = 'Success';
    obj.message = message;
    // obj.message = 'Login successful!';
  } else {
    obj.status = 'Invalid';
    obj.message = message;
    // obj.message = 'Incorrect email or password!';
  }
  return obj;
};
