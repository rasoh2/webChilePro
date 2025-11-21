import React from "react";
import { useLocation } from "react-router-dom";

export default function Contacto() {
  const location = useLocation();
  const presupuesto = location.state?.presupuesto;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Aca se debería enviar el e-mail al correo ingresados");
  };

  return (
    <div className='container my-5'>
      <div className='row justify-content-center'>
        <div className='col-lg-8 col-xl-6'>
          <h2 className='text-center mb-4'>Contáctenos</h2>
          <div className='alert alert-info text-center mb-4'>
            {presupuesto > 0
              ? `Presupuesto estimado: $${Number(presupuesto).toLocaleString()}`
              : "Aún no has seleccionado servicios. Tu presupuesto estimado es cero."}
          </div>
          <form
            onSubmit={handleSubmit}
            className='p-4 border rounded shadow-sm'
          >
            <div className='form-floating mb-3'>
              <input
                type='text'
                className='form-control'
                id='inputNombre'
                placeholder='Tu Nombre'
                required
              />
              <label htmlFor='inputNombre'>Nombre Completo</label>
            </div>

            <div className='form-floating mb-3'>
              <input
                type='email'
                className='form-control'
                id='inputEmail'
                placeholder='tucorreo@ejemplo.com'
                required
              />
              <label htmlFor='inputEmail'>Correo Electrónico</label>
            </div>

            <div className='form-floating mb-3'>
              <textarea
                className='form-control'
                placeholder='Escribe tu mensaje aquí'
                id='textAreaMensaje'
                style={{ height: "150px" }}
                required
              ></textarea>
              <label htmlFor='textAreaMensaje'>Tu Mensaje</label>
            </div>

            <div className='d-grid'>
              <button type='submit' className='btn btn-primary btn-lg'>
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
