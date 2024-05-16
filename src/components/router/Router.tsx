import { RegistrationPage } from 'src/logic/registrationPage/registrationPage.tsx';
import { Main } from 'src/logic/mainPage/MainPage.tsx';
import { Login } from 'src/logic/loginPage/LoginPage.tsx';
import { Error } from 'src/logic/errorPage/ErrorPage.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const Router = () => {
  const baseUrl = '/';
  return (
    <BrowserRouter basename={baseUrl}>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
};
