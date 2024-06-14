import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from 'src/logic/mainPage/MainPage.tsx';
import { Login } from 'src/logic/loginPage/LoginPage.tsx';
import { Error } from 'src/logic/errorPage/ErrorPage.tsx';
import { Product } from 'src/logic/productPage/Product.tsx';
import { Header } from 'src/components/header/Header.tsx';

export const Router: React.FC = () => {
  const RegistrationPage = React.lazy(
    () => import('src/logic/registrationPage/registrationPage.tsx'),
  );
  const AboutPage = React.lazy(() => import('src/logic/aboutPage/AboutPage.tsx'));
  const UserProfilePage = React.lazy(() => import('src/logic/userProfilePage/UserProfilePage.tsx'));
  const BasketPage = React.lazy(() => import('src/logic/basketPage/basketPage.tsx'));
  const Catalog = React.lazy(() => import('src/logic/catalogPage/CatalogPage.tsx'));

  return (
    <BrowserRouter>
      <Header />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about_us" element={<AboutPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};
