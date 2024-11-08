import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./views/home/home";

import { Navbar } from "./layout/navbar/navbar";
import './App.css'

const routes = [
  {path: "/", name: "Inicio", component: <Home/>}
]


function App() {

  return (
    <>

    <Router>
      <Navbar />

      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.component}
          />
        ))}
      </Routes>
    </Router>

    </>
    
  );
}

export default App
