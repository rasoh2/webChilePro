import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className='bg-dark text-white text-center py-4 mt-auto'
      role='contentinfo'
    >
      <div className='container'>
        <div className='row'>
          <div className='col-md-4 mb-3 mb-md-0'>
            <h5 className='fw-bold mb-2'>📌 WebChilePro</h5>
            <p className='small mb-0'>Soluciones web profesionales</p>
            <p className='small text-muted'>Proyecto Investigativo INACAP</p>
          </div>
          <div className='col-md-4 mb-3 mb-md-0'>
            <h6 className='fw-bold mb-2'>Enlaces Rápidos</h6>
            <div className='d-flex flex-column small'>
              <Link
                to='/'
                className='text-white text-decoration-none mb-1 hover-scale'
              >
                Inicio
              </Link>
              <Link
                to='/tipo'
                className='text-white text-decoration-none mb-1 hover-scale'
              >
                Presupuesto
              </Link>
              <Link
                to='/contacto'
                className='text-white text-decoration-none mb-1 hover-scale'
              >
                Contacto
              </Link>
            </div>
          </div>
          <div className='col-md-4'>
            <h6 className='fw-bold mb-2'>Información</h6>
            <p className='small mb-2'>
              <a
                href='https://webchilepro.netlify.app/'
                className='text-white text-decoration-none hover-scale'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Visitar sitio web de WebChilePro'
              >
                🌐 webchilepro.com
              </a>
            </p>
            <p className='small mb-0'>📧 contacto@webchilepro.cl</p>
          </div>
        </div>
        <hr className='my-3 bg-light' />
        <p className='mb-0 small'>
          &copy; {new Date().getFullYear()} WebChilePro. Todos los derechos
          reservados.
          <br />
          <span className='text-muted'>Desarrollado para INACAP</span>
        </p>
      </div>
    </footer>
  );
}
