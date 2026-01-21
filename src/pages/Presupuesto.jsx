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
    setInteraccionUsuario(true);
    const yaSeleccionado = !!seleccionados[serv.id];
    setSeleccionados((prev) => ({
      ...prev,
      [serv.id]: !yaSeleccionado,
    }));
  };

  useEffect(() => {
    const sumaServicios = Object.entries(seleccionados)
      .filter(([, seleccionado]) => seleccionado)
      .reduce((acc, [id]) => {
        const serv = servicios.find((s) => s.id === Number(id));
        return serv ? acc + Number(serv.precio) * multiplicador : acc;
      }, 0);
    const nuevoTotal = baseValue + sumaServicios;
    setTotal(nuevoTotal);

    if (interaccionUsuario && nuevoTotal >= 500000) {
      let descuentoCalculado = 0;
      if (nuevoTotal >= 1000000) {
        descuentoCalculado = nuevoTotal * 0.2;
      } else {
        descuentoCalculado = nuevoTotal * 0.1;
      }
      setDescuento(descuentoCalculado);
      setTotalConDescuento(nuevoTotal - descuentoCalculado);
    } else {
      setDescuento(0);
      setTotalConDescuento(0);
    }
  }, [seleccionados, baseValue, multiplicador, setTotal, interaccionUsuario]);

  if (!tipo) {
    navigate("/tipo");
    return null;
  }

  return (
    <main className='container mt-5 pt-5 pb-5' style={{ minHeight: "85vh" }}>
      <div className='text-center mb-5'>
        <h2 className='display-5 fw-bold gradient-text mb-3'>
          🛠️ Servicios Disponibles
        </h2>
        <p className='lead mb-2'>
          Para: <span className='badge bg-success fs-5 px-4 py-2'>{tipo}</span>
        </p>
        <p className='text-muted'>
          Selecciona los servicios adicionales que necesitas
        </p>
      </div>

      <div className='row g-4 mb-5'>
        {servicios.map((serv) => (
          <div key={serv.id} className='col-lg-4 col-md-6'>
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

      <div className='row justify-content-center mt-5'>
        <div className='col-lg-6 col-md-8'>
          <div
            className='card border-0 shadow-lg p-4'
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "20px",
              color: "white",
            }}
          >
            <h3 className='text-center mb-4 fw-bold'>
              📊 Resumen del Presupuesto
            </h3>

            <div className='d-flex justify-content-between mb-3 pb-3 border-bottom border-light'>
              <span className='fs-5'>Subtotal:</span>
              <span className='fs-5 fw-bold'>${total.toLocaleString()}</span>
            </div>

            {descuento > 0 && (
              <>
                <div className='alert alert-success mb-3' role='alert'>
                  <strong>🎉 ¡Felicidades!</strong>
                  <p className='mb-0 mt-2'>
                    Has obtenido un descuento de{" "}
                    <strong>{total >= 1000000 ? "20%" : "10%"}</strong>
                  </p>
                </div>
                <div className='d-flex justify-content-between mb-3 pb-3 border-bottom border-light'>
                  <span className='fs-5'>Descuento:</span>
                  <span className='fs-5 fw-bold text-warning'>
                    -${descuento.toLocaleString()}
                  </span>
                </div>
                <div className='d-flex justify-content-between mb-4'>
                  <span className='fs-4 fw-bold'>Total Final:</span>
                  <span className='fs-3 fw-bold'>
                    ${totalConDescuento.toLocaleString()}
                  </span>
                </div>
              </>
            )}

            {descuento === 0 && (
              <div className='d-flex justify-content-between mb-4'>
                <span className='fs-4 fw-bold'>Total:</span>
                <span className='fs-3 fw-bold'>${total.toLocaleString()}</span>
              </div>
            )}

            {total < 500000 && total > 0 && (
              <div className='alert alert-info mb-3' role='alert'>
                <small>
                  💡 Agrega ${(500000 - total).toLocaleString()} más para
                  obtener 10% de descuento
                </small>
              </div>
            )}

            {total >= 500000 && total < 1000000 && (
              <div className='alert alert-info mb-3' role='alert'>
                <small>
                  💡 Agrega ${(1000000 - total).toLocaleString()} más para
                  obtener 20% de descuento
                </small>
              </div>
            )}

            <Link
              to='/contacto'
              state={{ presupuesto: descuento > 0 ? totalConDescuento : total }}
              className='btn btn-light btn-lg w-100 fw-bold'
              style={{ borderRadius: "12px" }}
              aria-label='Ir a página de contacto con presupuesto'
            >
              🚀 Solicitar Presupuesto
            </Link>
          </div>
        </div>
      </div>

      <div className='d-none'>
        <ResultadoPresupuesto
          total={descuento > 0 ? totalConDescuento : total}
        />
      </div>
    </main>
  );
}
