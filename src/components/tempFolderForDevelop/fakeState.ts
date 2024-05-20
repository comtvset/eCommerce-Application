export const myStatus = (status: boolean) => {
  const obj = {
    status: '',
    token: '',
  };

  if (status) {
    obj.status = 'ok';
    obj.token = 'test77733test6test';
  } else {
    obj.status = 'error';
    obj.token = 'error';
  }
  return obj;
};
