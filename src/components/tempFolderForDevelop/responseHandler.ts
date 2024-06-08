export interface IResponse {
  status: string;
  message: string;
}

export const myRedirect = (res: IResponse) => {
  if (res.status === 'Success') {
    return 'Success';
  }
  if (res.status === 'Invalid') {
    return 'Invalid';
  }
  return '';
};
