export default function ServicioCard({ nombre, descripcion, precio, onAdd }) {
  return (
    <div className='card shadow p-3' style={{ width: "20rem" }}>
      <div className='card-body'>
        <h5 className='card-title'>{nombre}</h5>
        <p className='card-text'>{descripcion}</p>

        <p className='fw-bold text-success mb-3'>${precio.toLocaleString()}</p>

        <button className='btn btn-primary w-100' onClick={onAdd}>
          Agregar presupuesto
        </button>
      </div>
    </div>
  );
}
