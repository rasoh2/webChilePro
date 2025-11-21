import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Contacto from "./pages/Contacto.jsx";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Tipo from "./pages/Tipo.jsx";
import Presupuesto from "./pages/Presupuesto.jsx";

export default function App() {
  const [total, setTotal] = useState(0);
  const [multiplicador, setMultiplicador] = useState(1); // multiplicador global

  return (
    <BrowserRouter>
      <NavBar total={total} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/tipo'
          element={<Tipo setMultiplicador={setMultiplicador} />}
        />
        <Route
          path='/presupuesto'
          element={
            <Presupuesto
              total={total}
              setTotal={setTotal}
              multiplicador={multiplicador}
              setMultiplicador={setMultiplicador}
            />
          }
        />
        <Route path='/contacto' element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  );
}
