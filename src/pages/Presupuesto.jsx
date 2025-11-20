import { useLocation } from "react-router-dom";
import { servicios } from "../db/data.js";
import ServicioCard from "../components/ServicioCard";
import ResultadoPresupuesto from "../components/ResultadoPresupuesto";

export default function Presupuesto({ total, setTotal }) {
  const location = useLocation();
  const { tipo, multiplicador = 1 } = location.state || {}; // Valor predeterminado para multiplicador

  const agregarServicio = (precio) => {
    console.log("Precio:", precio, "Multiplicador:", multiplicador);
    if (multiplicador) {
      setTotal((prev) => prev + precio * multiplicador);
    } else {
      console.error("Multiplicador no definido o inválido");
    }
  };

  return (
    <div className='container mt-4'>
      <h2 className='text-center text-primary mb-4'>
        Servicios disponibles para:
        <span className='text-success'> {tipo || "Tipo no especificado"}</span>
      </h2>

      <div className='row g-4'>
        {servicios.map((serv) => (
          <div className='col-md-4' key={serv.id}>
            <ServicioCard
              nombre={serv.nombre}
              descripcion={serv.descripcion}
              precio={serv.precio}
              onAdd={() => agregarServicio(serv.precio)}
            />
          </div>
        ))}
      </div>
      <ResultadoPresupuesto total={total} />
    </div>
  );
}
