import { Link } from "react-router-dom";

import logo from "../assets/img/logo.png";

export default function NavBar() {
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
              <a className='nav-link active' aria-current='page' href='/'>
                Home
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/tipo'>
                Presupuesto
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
