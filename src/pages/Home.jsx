import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";

export default function Home() {
  return (
    <main className='container text-center py-5' style={{ marginTop: "93px" }}>
      <title>WebChilePro - Cotizador de Proyectos Web | INACAP</title>
      <meta name="description" content="Inicio de WebChilePro. Calcula el presupuesto de tu sitio web de manera inteligente, transparente e instantánea." />
      <div className='mb-5' id='carousel-section'>
        <Carousel />
      </div>
      <div>
        <h1 className='text-center fw-bold display-4 gradient-text mb-4'>
          💻 WebChilePro
        </h1>
        <p className='lead text-center text-secondary mb-4 px-3'>
          Generador de presupuestos inteligentes para desarrollo web
          profesional.
          <br />
          <small className='text-muted'>
            Proyecto Investigativo - INACAP 2026
          </small>
        </p>
        <div className='d-flex justify-content-center gap-3 flex-wrap'>
          <Link
            to='/tipo'
            className='btn btn-success btn-lg px-5 py-3 hover-scale'
            aria-label='Ir al generador de presupuestos'
          >
            🚀 Comenzar Ahora
          </Link>
          <Link
            to='/contacto'
            className='btn btn-outline-primary btn-lg px-5 py-3 hover-scale'
            aria-label='Contactar con nosotros'
          >
            📧 Contáctanos
          </Link>
        </div>
      </div>

      <div className='row mt-5 pt-5'>
        <div className='col-md-4 mb-4'>
          <div className='p-4'>
            <div className='fs-1 mb-3'>⚡</div>
            <h3 className='h5 fw-bold'>Rápido y Eficiente</h3>
            <p className='text-muted'>
              Obtén tu presupuesto en minutos con nuestro sistema inteligente
            </p>
          </div>
        </div>
        <div className='col-md-4 mb-4'>
          <div className='p-4'>
            <div className='fs-1 mb-3'>💎</div>
            <h3 className='h5 fw-bold'>Calidad Profesional</h3>
            <p className='text-muted'>
              Desarrollos web de alta calidad adaptados a tus necesidades
            </p>
          </div>
        </div>
        <div className='col-md-4 mb-4'>
          <div className='p-4'>
            <div className='fs-1 mb-3'>🎯</div>
            <h3 className='h5 fw-bold'>Precio Transparente</h3>
            <p className='text-muted'>
              Sin sorpresas, presupuestos claros y detallados
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
