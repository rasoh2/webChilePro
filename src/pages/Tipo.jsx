import wpImg from "../assets/img/wpImg.jpg";
import jsImg from "../assets/img/jsImg.jpg";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

export default function Tipo() {
  const navigate = useNavigate();

  const handleSeleccion = (tipo, multi, base) => {
    navigate("/presupuesto", { state: { tipo, multiplicador: multi, base } });
  };

  return (
    <main
      className='container mt-5 pt-5 pb-5'
      style={{ marginTop: "100px", minHeight: "80vh" }}
    >
      <div className='text-center mb-5'>
        <h2 className='display-5 fw-bold gradient-text mb-3'>
          🚀 Elige el Tipo de Proyecto
        </h2>
        <p className='lead text-muted px-3'>
          Selecciona la opción que mejor se adapte a tus necesidades y
          presupuesto
        </p>
      </div>

      <div
        className='row g-4 justify-content-center align-items-stretch'
        style={{ minHeight: "400px" }}
      >
        <div className='col-lg-5 col-md-6'>
          <Card
            imagen={wpImg}
            titulo='🌐 Página WordPress'
            descripcion={
              <>
                <strong>Desarrollo rápido y económico</strong>
                <p className='mt-2'>
                  Esta opción utiliza plataformas líderes con plantillas
                  profesionales preexistentes. Es la solución ideal si buscas un
                  desarrollo rápido, un presupuesto optimizado y la capacidad de
                  gestionar tu propio contenido de manera intuitiva.
                </p>
                <div className='text-start mt-3 small'>
                  <p className='mb-1'>✔️ Lanzamiento rápido (1-2 semanas)</p>
                  <p className='mb-1'>✔️ Gestión sencilla de contenido</p>
                  <p className='mb-1'>✔️ Ideal para blogs y portfolios</p>
                  <p className='mb-3'>✔️ Bajo costo de mantenimiento</p>
                </div>
                <strong>Ejemplo:</strong>{" "}
                <a
                  href='https://vitrinazocl.wixsite.com/constructora-cumo'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary'
                  aria-label='Ver ejemplo de sitio WordPress'
                >
                  www.cumo.cl 🔗
                </a>
              </>
            }
            precio={50000}
            onSelect={() =>
              handleSeleccion("Páginas hechas con plantillas", 1.0, 50000)
            }
          />
        </div>

        <div className='col-lg-5 col-md-6'>
          <Card
            imagen={jsImg}
            titulo='💻 Página a Medida (JS/Python)'
            descripcion={
              <>
                <strong>Desarrollo personalizado y escalable</strong>
                <p className='mt-2'>
                  Creamos tu proyecto desde cero utilizando tecnologías robustas
                  como JavaScript y Python. Este enfoque ofrece flexibilidad
                  ilimitada para funcionalidades únicas, integraciones complejas
                  y un rendimiento optimizado.
                </p>
                <div className='text-start mt-3 small'>
                  <p className='mb-1'>✔️ Diseño 100% personalizado</p>
                  <p className='mb-1'>✔️ Funcionalidades avanzadas</p>
                  <p className='mb-1'>✔️ Escalabilidad garantizada</p>
                  <p className='mb-3'>✔️ Rendimiento optimizado</p>
                </div>
                <strong className='text-info'>
                  Esta web fue creada con JavaScript ✨
                </strong>
              </>
            }
            precio={150000}
            onSelect={() =>
              handleSeleccion("Páginas hechas a medida", 2.5, 150000)
            }
          />
        </div>
      </div>

      <div className='text-center mt-5'>
        <div
          className='alert alert-info d-inline-block shadow-custom'
          role='alert'
        >
          <strong>💡 Consejo:</strong> Si no estás seguro, elige WordPress para
          comenzar. Siempre puedes migrar a una solución personalizada después.
        </div>
      </div>
    </main>
  );
}
