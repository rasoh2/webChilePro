import { useLocation } from "react-router-dom";
import { servicios } from "../db/data.js";
import ServicioCard from "../components/ServicioCard";
import ResultadoPresupuesto from "../components/ResultadoPresupuesto";
import { useState } from "react";

export default function Presupuesto() {
  const location = useLocation();
  const { tipo, multiplicador } = location.state || {};
  const [total, setTotal] = useState(0);

  const agregarServicio = (precio) => {
    setTotal((prev) => prev + precio * multiplicador);
  };

  return (
    <div className='container mt-4'>
      <h2 className='text-center text-primary mb-4'>
        Servicios disponibles para:
        <span className='text-success'> {tipo}</span>
      </h2>

      <div className='row g-4'>
        {servicios.map((serv) => (
          <div className='col-md-4' key={serv.id}>
            <ServicioCard
              nombre={serv.nombre}
              descripcion={serv.descripcion}
              precio={serv.precio}
              onAdd={() => agregarServicio(serv.precio)}
            />
          </div>
        ))}
      </div>
      <ResultadoPresupuesto total={total} />
    </div>
  );
}
