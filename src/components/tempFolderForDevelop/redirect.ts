import { NavigateFunction } from 'react-router-dom';

export interface IResponse {
  status: string;
  token: string;
}

export const myRedirect = (res: IResponse, navigation: NavigateFunction) => {
  if (res.status === 'ok') {
    // console.log('Go to the Main page');  // commit for ESLint
    navigation('/');
  }
  if (res.status === 'error') {
    // console.log('Stay at the Login page');  // commit for ESLint
  }

  // console.log(`information: { status: ${res.status}, token: ${res.token} }`); //commit for ESLint
};
