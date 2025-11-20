import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { servicios } from "../db/data.js";
import ServicioCard from "../components/ServicioCard";
import ResultadoPresupuesto from "../components/ResultadoPresupuesto";

export default function Presupuesto({ total, setTotal, setMultiplicador }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { tipo, multiplicador } = location.state || {};
  const [seleccionados, setSeleccionados] = useState({});

  // Inicializa total y seleccionados al montar
  useEffect(() => {
    setTotal(0);
    setSeleccionados({});
  }, [setTotal]);

  // Reset multiplicador y total al salir de la página
  useEffect(() => {
    return () => {
      setMultiplicador(1);
      setTotal(0);
    };
  }, [setMultiplicador, setTotal]);

  const toggleServicio = (serv) => {
    const yaSeleccionado = !!seleccionados[serv.id];
    const precioFinal = Number(serv.precio) * multiplicador;

    setSeleccionados((prev) => ({
      ...prev,
      [serv.id]: !yaSeleccionado,
    }));

    setTotal((prev) =>
      yaSeleccionado ? prev - precioFinal : prev + precioFinal
    );
  };

  if (!tipo) {
    navigate("/tipo"); // si alguien entra sin elegir tipo, lo redirige
    return null;
  }

  return (
    <div className='container mt-4'>
      <h2 className='text-center text-primary mb-4'>
        Servicios disponibles para: <span className='text-success'>{tipo}</span>
      </h2>

      <div className='row g-4'>
        {servicios.map((serv) => (
          <div className='col-md-4' key={serv.id}>
            <ServicioCard
              nombre={serv.nombre}
              descripcion={serv.descripcion}
              precio={serv.precio}
              seleccionado={!!seleccionados[serv.id]}
              onToggle={() => toggleServicio(serv)}
            />
          </div>
        ))}
      </div>

      <ResultadoPresupuesto total={total} />
    </div>
  );
}
