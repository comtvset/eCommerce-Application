export const myStatus = (status: boolean) => {
  const obj = {
    status: '',
    message: '',
  };

  if (status) {
    obj.status = 'Success';
    obj.message = 'Login successful!';
  } else {
    obj.status = 'Invalid';
    obj.message = 'Incorrect email or password!';
  }
  return obj;
};
