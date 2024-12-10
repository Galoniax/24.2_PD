import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/constants";
import Layout from "../layout/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Home,
  Login,
  Register,
  Catalogo,
  Product,
  Profile
} from "../views/";

import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../hooks/useAuth.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ToastContainer />
          <Layout>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.REGISTER} element={<Register />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.CATALOGO} element={<Catalogo />} />
              <Route path={ROUTES.PRODUCTO} element={<Product />} />
              <Route path={ROUTES.PROFILE} element={<Profile />} />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
