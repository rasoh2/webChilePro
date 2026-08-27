import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Contacto() {
  const location = useLocation();
  const presupuesto = location.state?.presupuesto;
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [formEnviado, setFormEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simular envío de email
    const mensaje = `
      Nuevo contacto de WebChilePro:
      Nombre: ${formData.nombre}
      Email: ${formData.email}
      Presupuesto: $${Number(presupuesto || 0).toLocaleString()}
      Mensaje: ${formData.mensaje}
    `;

    console.log(mensaje);
    setFormEnviado(true);

    // Limpiar formulario
    setFormData({ nombre: "", email: "", mensaje: "" });

    // Ocultar alerta después de 4 segundos
    setTimeout(() => {
      setFormEnviado(false);
    }, 4000);
  };

  return (
    <main
      className='container-fluid mt-5 pb-5'
      style={{
        minHeight: "81vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <title>Solicita tu Presupuesto Web | WebChilePro</title>
      <meta name="description" content="Envíanos tu cotización estimada y nos pondremos en contacto contigo para iniciar el desarrollo de tu sitio web." />
      <div className='row justify-content-center mt-5 pt-5'>
        <div className='col-lg-8 col-xl-6'>
          <div className='text-center mb-4'>
            <h2 className='display-5 fw-bold gradient-text mb-3'>
              📧 Contáctenos
            </h2>
            <p className='lead text-muted'>
              Estamos aquí para ayudarte con tu proyecto web
            </p>
          </div>

          {formEnviado && (
            <div
              className='alert alert-success border-0 shadow-sm fade show mb-4 py-3'
              style={{
                borderRadius: "16px",
                background: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
                color: "#1e4620",
              }}
              role='status'
              aria-live='polite'
            >
              <div className='d-flex align-items-center'>
                <span className='fs-3 me-3'>✅</span>
                <div>
                  <strong>¡Envío Exitoso!</strong>
                  <span className='d-block mt-1' style={{ fontSize: "0.95rem" }}>
                    Tu mensaje ha sido enviado correctamente. Te responderemos pronto.
                  </span>
                </div>
              </div>
            </div>
          )}

          <div
            className='alert shadow-custom mb-4'
            style={{
              background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
              border: "none",
              borderRadius: "16px",
            }}
            role='status'
            aria-live='polite'
          >
            <div className='d-flex align-items-center'>
              <span className='fs-3 me-3'>💰</span>
              <div>
                <strong className='d-block'>Tu Presupuesto Estimado</strong>
                {presupuesto > 0 ? (
                  <span className='fs-4 fw-bold text-primary'>
                    ${Number(presupuesto).toLocaleString()}
                  </span>
                ) : (
                  <span className='text-secondary'>
                    Aún no has seleccionado servicios
                  </span>
                )}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className='p-4 border-0 rounded-4 shadow-lg bg-white'
            style={{ borderRadius: "16px" }}
          >
            <div className='form-floating mb-4'>
              <input
                type='text'
                className='form-control'
                id='inputNombre'
                name='nombre'
                placeholder='Tu Nombre'
                value={formData.nombre}
                onChange={handleChange}
                required
                aria-required='true'
                aria-label='Ingresa tu nombre completo'
              />
              <label htmlFor='inputNombre'>👤 Nombre Completo *</label>
            </div>

            <div className='form-floating mb-4'>
              <input
                type='email'
                className='form-control'
                id='inputEmail'
                name='email'
                placeholder='tucorreo@ejemplo.com'
                value={formData.email}
                onChange={handleChange}
                required
                aria-required='true'
                aria-label='Ingresa tu correo electrónico'
              />
              <label htmlFor='inputEmail'>📧 Correo Electrónico *</label>
            </div>

            <div className='form-floating mb-4'>
              <textarea
                className='form-control'
                placeholder='Escribe tu mensaje aquí'
                id='textAreaMensaje'
                name='mensaje'
                style={{ height: "180px" }}
                value={formData.mensaje}
                onChange={handleChange}
                required
                aria-required='true'
                aria-label='Escribe tu mensaje o consulta'
              ></textarea>
              <label htmlFor='textAreaMensaje'>💬 Tu Mensaje *</label>
            </div>

            <div className='d-grid gap-2'>
              <button
                type='submit'
                className='btn btn-primary btn-lg py-3'
                aria-label='Enviar formulario de contacto'
              >
                <strong>🚀 Enviar Mensaje</strong>
              </button>
            </div>

            <p className='text-center text-muted small mt-3 mb-0'>
              * Campos obligatorios
            </p>
          </form>

          <div className='text-center mt-4'>
            <p className='text-muted small'>
              🔒 Tu información está segura con nosotros
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
