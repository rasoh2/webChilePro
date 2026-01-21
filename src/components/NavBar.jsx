import { Link, useLocation } from "react-router-dom";
import logo from "../assets/img/unnamed.jpg";

export default function NavBar({ total }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className='navbar navbar-expand-lg bg-dark navbar-dark fixed-top'
      role='navigation'
      aria-label='Menú principal'
    >
      <div className='container-fluid'>
        <Link
          className='navbar-brand d-flex align-items-center'
          to='/'
          aria-label='WebChilePro - Ir a inicio'
        >
          <img
            src={logo}
            alt='Logo WebChilePro'
            style={{ height: "60px", marginRight: "10px", borderRadius: "8px" }}
            loading='lazy'
          />
          <span className='d-none d-sm-inline fw-bold'>WebChilePro</span>
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Abrir menú de navegación'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <Link
                className={`nav-link text-white ${isActive("/") ? "active" : ""}`}
                aria-current={isActive("/") ? "page" : undefined}
                to='/'
              >
                🏠 Inicio
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link text-white ${isActive("/tipo") || isActive("/presupuesto") ? "active" : ""}`}
                to='/tipo'
              >
                📊 Presupuesto
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link text-white ${isActive("/contacto") ? "active" : ""}`}
                to='/contacto'
              >
                📧 Contacto
              </Link>
            </li>
          </ul>

          {total > 0 && (
            <div className='d-flex align-items-center ms-lg-3 mt-2 mt-lg-0'>
              <span
                className='badge bg-gradient fs-5 px-4 py-2'
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
                role='status'
                aria-live='polite'
                aria-label={`Total del presupuesto: $${Number(total).toLocaleString()}`}
              >
                💰 ${Number(total).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
