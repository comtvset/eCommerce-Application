import { RegistrationPage } from 'src/logic/registrationPage/registrationPage.tsx';
import { Main } from 'src/logic/mainPage/MainPage.tsx';
import { Login } from 'src/logic/loginPage/LoginPage.tsx';
import { Error } from 'src/logic/errorPage/ErrorPage.tsx';
import { Catalog } from 'src/logic/catalogPage/CatalogPage.tsx';
import { UserProfilePage } from 'src/logic/userProfilePage/UserProfilePage.tsx';
import { Product } from 'src/logic/productPage/Product.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from 'src/components/header/Header.tsx';

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<Product />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};
