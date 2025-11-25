import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";

export default function Home() {
  return (
    <div className='container text-center py-5' style={{ marginTop: "100px" }}>
      <div className='mb-5'>
        <Carousel />
      </div>
      <h1 className='"text-center fw-bold display-5 text-primary "'>
        💻 WebChilePro
      </h1>
      <p className='lead text-center text-secondary'>
        Generador de presupuestos inteligentes para desarrollo web.
      </p>
      <Link to='/tipo' className='btn btn-success btn-lg px-4 py-2'>
        Ir al Generador de Presupuestos
      </Link>
    </div>
  );
}
