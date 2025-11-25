import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { servicios } from "../db/data.js";
import ServicioCard from "../components/ServicioCard";
import ResultadoPresupuesto from "../components/ResultadoPresupuesto";
import { Link } from "react-router-dom";

export default function Presupuesto({ total, setTotal, setMultiplicador }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { tipo, multiplicador = 1, base = 0 } = location.state || {};
  const [seleccionados, setSeleccionados] = useState({});
  const [baseValue, setBaseValue] = useState(base);
  const [totalConDescuento, setTotalConDescuento] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [interaccionUsuario, setInteraccionUsuario] = useState(false);

  useEffect(() => {
    setBaseValue(base);
    setSeleccionados({});
  }, [base]);

  useEffect(() => {
    return () => {
      setMultiplicador(1);
      setTotal(0);
    };
  }, [setMultiplicador, setTotal]);

  const toggleServicio = (serv) => {
    setInteraccionUsuario(true); // Marcar que el usuario interactuó
    const yaSeleccionado = !!seleccionados[serv.id];
    setSeleccionados((prev) => ({
      ...prev,
      [serv.id]: !yaSeleccionado,
    }));
  };

  useEffect(() => {
    // Calcular el total cada vez que cambian seleccionados, baseValue o multiplicador
    const sumaServicios = Object.entries(seleccionados)
      .filter(([, seleccionado]) => seleccionado)
      .reduce((acc, [id]) => {
        const serv = servicios.find((s) => s.id === Number(id));
        return serv ? acc + Number(serv.precio) * multiplicador : acc;
      }, 0);
    const nuevoTotal = baseValue + sumaServicios;
    setTotal(nuevoTotal);

    // Aplicar descuentos solo si el usuario interactuó y el total es mayor o igual a 500,000
    if (interaccionUsuario && nuevoTotal >= 500000) {
      let descuentoCalculado = 0;
      if (nuevoTotal >= 1000000) {
        descuentoCalculado = nuevoTotal * 0.2; // 20% de descuento
      } else {
        descuentoCalculado = nuevoTotal * 0.1; // 10% de descuento
      }
      setDescuento(descuentoCalculado);
      setTotalConDescuento(nuevoTotal - descuentoCalculado);
    } else {
      setDescuento(0);
      setTotalConDescuento(0); // No mostrar total con descuento si no hay descuento
    }
  }, [seleccionados, baseValue, multiplicador, setTotal, interaccionUsuario]);

  if (!tipo) {
    navigate("/tipo");
    return null;
  }

  return (
    <div className='container h-100 mt-5 pt-5 pb-4'>
      <h2 className='text-center text-primary m-3'>
        Servicios disponibles para: <span className='text-success'>{tipo}</span>
      </h2>
      <div className='d-flex flex-wrap justify-content-center gap-4'>
        {servicios.map((serv) => (
          <div key={serv.id}>
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
      <div className='row mt-5'>
        <div className='col-md-4'></div>
        <div className='col-md-4 text-center'>
          <h4>Total: ${total.toLocaleString()}</h4>
          {descuento > 0 && (
            <>
              <h5 className='text-success'>
                Descuento aplicado: -${descuento.toLocaleString()}
              </h5>
              <h4>
                Total con descuento: ${totalConDescuento.toLocaleString()}
              </h4>
            </>
          )}
          <Link
            to='/contacto'
            state={{ presupuesto: descuento > 0 ? totalConDescuento : total }}
            className='btn btn-success mt-3'
          >
            Ir a Contacto y enviar presupuesto
          </Link>
        </div>
        <div className='col-md-4'></div>
      </div>
      <div className='d-none'>
        <ResultadoPresupuesto
          total={descuento > 0 ? totalConDescuento : total}
        />
      </div>
    </div>
  );
}
