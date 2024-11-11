import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/constants";
import Layout from "../layout/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Home } from "../views/home/home.jsx";
import { Login } from "../views/login/login.jsx";
import { Register } from "../views/register/register.jsx";
import { Catalogo } from "../views/catalogo/catalogo.jsx";
import { AuthProvider } from "../hooks/useAuth";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <Layout>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.CATALOGO} element={<Catalogo />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
