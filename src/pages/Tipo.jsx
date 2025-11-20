import wpImg from "../assets/img/wpImg.jpg";
import jsImg from "../assets/img/wpImg.jpg";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

export default function Tipo() {
  const navigate = useNavigate();

  const handleSeleccion = (tipo, multiplicador) => {
    navigate("/presupuesto", { state: { tipo, multiplicador } });
  };
  return (
    <div className='container mt-4'>
      <h2 className='text-center mb-4'>Elige el tipo de proyecto</h2>
      <div className='d-flex justify-content-evenly'>
        {/* CARD WORDPRESS */}
        <Card
          className='w-45'
          imagen={wpImg}
          titulo='Página WordPress'
          descripcion='Esta opción utiliza plataformas líderes con plantillas profesionales preexistentes. 
          Es la solución ideal si buscas un desarrollo rápido, un presupuesto optimizado y la capacidad de
          gestionar tu propio contenido de manera intuitiva. Es perfecto para blogs, portfolios y tiendas
          online sencillas que necesitan lanzarse al mercado sin demoras.'
          onSelect={() => handleSeleccion("Paginas echas poor planillas", 1.0)}
        />

        {/* CARD A MEDIDA */}
        <Card
          className='w-45'
          imagen={jsImg}
          titulo='Página a medida (JS/Python)'
          descripcion='Creamos tu proyecto desde cero utilizando tecnologías robustas como JavaScript y Python.
          Este enfoque ofrece flexibilidad ilimitada para funcionalidades únicas, integraciones complejas y un
          rendimiento optimizado. Es la elección estratégica para aplicaciones web específicas, proyectos ambiciosos
          o empresas que requieren control total y escalabilidad.'
          onSelect={() => handleSeleccion("Paginas echas a medida", 2.5)}
        />
      </div>
    </div>
  );
}
