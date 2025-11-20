import { TotalContext } from "../context/TotalContext";

export default function FormPresupuesto({ setTotal }) {
  //const [test, setTest] = useState(true);
  //setTest(!test); esto sirve para cambiar el estado si es true pasa a ser false y viceversa

  return (
    <div>
      <h3 className='text-primary mb-3'>Formulario de Presupuesto</h3>

      <p className='text-muted'>
        Aquí irá tu formulario para calcular el presupuesto.
      </p>

      <button
        className='btn btn-primary'
        onClick={() => setTotal(50000)} // valor temporal para pruebas
      >
        Calcular Presupuesto (Prueba)
      </button>
    </div>
  );
}
