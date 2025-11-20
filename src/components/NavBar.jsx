import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

export default function NavBar({ total }) {
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          <img
            src={logo}
            alt='Logo'
            style={{ height: "40px", marginRight: "10px" }}
          />
          WCP
        </Link>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/tipo'>
                Presupuesto
              </Link>
            </li>
          </ul>
        </div>
        <div className='d-flex align-items-center'>
          <span className='badge bg-primary ms-3'>Total: ${total}</span>
        </div>
      </div>
    </nav>
  );
}
