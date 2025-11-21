import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { servicios } from "../db/data.js";
import ServicioCard from "../components/ServicioCard";
import ResultadoPresupuesto from "../components/ResultadoPresupuesto";
import { Link } from "react-router-dom";

export default function Presupuesto({ total, setTotal, setMultiplicador }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { tipo, multiplicador } = location.state || {};
  const [seleccionados, setSeleccionados] = useState({});

  // Definir precios base según tipo
  const preciosBase = {
    Plantilla: 50000,
    Hecha: 200000,
  };

  // Inicializa total con precio base y seleccionados al montar
  useEffect(() => {
    const base = preciosBase[tipo] || 0;
    setTotal(base);
    setSeleccionados({});
  }, [setTotal, tipo]);

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
    navigate("/tipo"); // redirige si no hay tipo
    return null;
  }

  return (
    <div className='container mt-5 pb-4'>
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

      {/* Botón centrado fuera del row */}
      <div className='row mt-5'>
        <div className='col-md-4 '></div>
        <div className='col-md-4 d-flex -5'>
          <Link
            to='/contacto'
            state={{ presupuesto: total }}
            className='btn btn-success'
          >
            Ir a Contacto y enviar presupuesto
          </Link>
        </div>
        <div className='col-md-4'></div>
      </div>

      {/* ResultadoPresupuesto oculto */}
      <div className='d-none'>
        <ResultadoPresupuesto total={total} />
      </div>
    </div>
  );
}
