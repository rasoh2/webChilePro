import { Link } from "react-router-dom";
import logo from "../assets/img/unnamed.jpg";

export default function NavBar({ total }) {
  return (
    <nav className='navbar navbar-expand-lg bg-dark navbar-dark fixed-top'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          <img
            cl
            src={logo}
            alt='Logo'
            style={{ height: "60px", marginRight: "20px" }}
          />
        </Link>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link
                className='nav-link active text-white'
                aria-current='page'
                to='/'
              >
                Home
              </Link>
            </li>
            <li className='nav-item '>
              <Link className='nav-link text-white' to='/tipo'>
                Presupuesto
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link text-white' to='/contacto'>
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        <button
          className='navbar-toggler ms-auto'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
          style={{ marginLeft: "auto" }}
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='d-flex align-items-center d-none d-lg-block'>
          <span
            className='badge bg-primary ms-3 fs-4 px-4 py-2 me-5'
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              letterSpacing: "1px",
            }}
          >
            Total: ${Number(total).toLocaleString()}
          </span>
        </div>
      </div>
    </nav>
  );
}
