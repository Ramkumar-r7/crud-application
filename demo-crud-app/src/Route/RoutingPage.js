import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProductEdit from "../Edit/ProductEdit";
import HomePage from "../Home/HomePage";
import LoginPage from "../Login/LoginPage";
import PreviewProduct from "../Preview/PreviewProduct";
import ProtectedRoute from "./ProtectedRoute";
function RoutingPage() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<ProtectedRoute />} path="/">
            <Route element={<HomePage />} path="/" />
            <Route element={<ProductEdit />} path="/create" />
            <Route element={<ProductEdit />} path="/:id" />
            <Route element={<PreviewProduct/>} path="/preview/:id"/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutingPage;
