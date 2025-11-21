import wpImg from "../assets/img/wpImg.jpg";
import jsImg from "../assets/img/jsImg.jpg";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

export default function Tipo() {
  const navigate = useNavigate();

  const handleSeleccion = (tipo, multi) => {
    navigate("/presupuesto", { state: { tipo, multiplicador: multi } });
  };

  return (
    <div className='container mt-4'>
      <h2 className='text-center mb-4 '>Elige el tipo de proyecto</h2>
      <div
        className='d-flex flex-wrap justify-content-evenly gap-4'
        style={{ minHeight: "300px" }}
      >
        <Card
          imagen={wpImg}
          titulo='Página WordPress'
          descripcion='Esta opción utiliza plataformas líderes con plantillas profesionales preexistentes. Es la solución ideal si buscas un desarrollo rápido, un presupuesto optimizado y la capacidad de gestionar tu propio contenido de manera intuitiva. Es perfecto para blogs, portfolios y tiendas online sencillas que necesitan lanzarse al mercado sin demoras. Permite una rápida puesta en marcha y facilita el mantenimiento sin requerir conocimientos avanzados de programación.'
          onSelect={() => handleSeleccion("Paginas echas con plantillas", 1.0)}
        />
        <Card
          imagen={jsImg}
          titulo='Página a medida (JS/Python)'
          descripcion='En esta opción creamos tu proyecto desde cero utilizando tecnologías robustas como JavaScript y Python. Este enfoque ofrece flexibilidad ilimitada para funcionalidades únicas, integraciones complejas y un rendimiento optimizado. Es la elección estratégica para aplicaciones web específicas, proyectos ambiciosos o empresas que requieren control total, escalabilidad a largo plazo y una base tecnológica completamente personalizada.'
          onSelect={() => handleSeleccion("Paginas echas a medida", 2.5)}
        />
      </div>
    </div>
  );
}
