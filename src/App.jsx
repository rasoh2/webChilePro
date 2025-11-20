import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Tipo from "./pages/Tipo.jsx";
import Presupuesto from "./pages/Presupuesto.jsx";

export default function App() {
  const [total, setTotal] = useState(0);

  return (
    <Router>
      <NavBar total={total} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tipo' element={<Tipo />} />
        <Route
          path='/presupuesto'
          element={<Presupuesto total={total} setTotal={setTotal} />}
        />
      </Routes>
    </Router>
  );
}
