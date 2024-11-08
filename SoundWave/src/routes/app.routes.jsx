import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/constants";
import Layout from "../layout/layout";

import { Home } from "../views/home/home.jsx";
import { Login } from "../views/login/login.jsx";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path={ROUTES.HOME} element={<Home />} />
                    {/*<Route path={ROUTES.REGISTER} element={<Register />} />*/}
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default AppRoutes;