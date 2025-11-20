export default function ServicioCard({
  nombre,
  descripcion,
  precio,
  seleccionado,
  onToggle,
}) {
  return (
    <div className='card shadow p-3' style={{ width: "20rem" }}>
      <div className='card-body'>
        <h5 className='card-title'>{nombre}</h5>
        <p className='card-text'>{descripcion}</p>

        <p className='fw-bold text-success mb-3'>${precio.toLocaleString()}</p>

        <button
          className={`btn w-100 ${seleccionado ? "btn-danger" : "btn-primary"}`}
          onClick={onToggle}
        >
          {seleccionado ? "Quitar del presupuesto" : "Agregar al presupuesto"}
        </button>
      </div>
    </div>
  );
}
