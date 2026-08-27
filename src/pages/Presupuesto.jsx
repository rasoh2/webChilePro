import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { servicios } from "../db/data.js";
import ServicioCard from "../components/ServicioCard";
import ResultadoPresupuesto from "../components/ResultadoPresupuesto";
import { Link } from "react-router-dom";
import { useCalculoPresupuesto } from "../hooks/useCalculoPresupuesto.js";

export default function Presupuesto({ total, setTotal }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Recuperar del sessionStorage si location.state es null (F5)
  const routeState = location.state || (() => {
    try {
      const saved = sessionStorage.getItem("webchilepro_route_state");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  })();

  const { tipo, multiplicador = 1, base = 0 } = routeState || {};

  // Guardar en sessionStorage si es válido (viene de navegación explícita)
  useEffect(() => {
    if (location.state) {
      try {
        sessionStorage.setItem("webchilepro_route_state", JSON.stringify(location.state));
      } catch (e) {
        console.error(e);
      }
    }
  }, [location.state]);

  const {
    seleccionados,
    descuento,
    totalConDescuento,
    toggleServicio,
  } = useCalculoPresupuesto({ base, multiplicador, setTotal });

  if (!tipo) {
    navigate("/tipo");
    return null;
  }

  return (
    <main className='container mt-5 pt-5 pb-5' style={{ minHeight: "85vh" }}>
      <title>Cotiza tus Servicios Adicionales | WebChilePro</title>
      <meta name="description" content="Selecciona los servicios adicionales (Dominio, Hosting, SEO, Chatbot IA, Webpay) para personalizar tu presupuesto web." />
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

      <div className='d-flex justify-content-center mt-4'>
        <ResultadoPresupuesto
          total={descuento > 0 ? totalConDescuento : total}
          subtotal={total}
        />
      </div>
    </main>
  );
}
