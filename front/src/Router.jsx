import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import LoginPage from "./components/pages/LoginPage";
import ForbiddenPage from "./components/pages/ForbiddenPage";

const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/forbidden" element={<ForbiddenPage/>} />
        <Route path="/user/:userId" element={<MainPage/>} />
        <Route path="*" element={<Navigate to="/login"/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
