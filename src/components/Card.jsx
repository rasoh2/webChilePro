export default function Card({
  imagen,
  titulo,
  descripcion,
  precio,
  onSelect,
}) {
  return (
    <div
      className='card shadow text-center d-flex flex-column align-items-center'
      style={{ width: "22rem" }}
    >
      <img src={imagen} className='card-img-top p-2' alt={titulo} />

      <div className='card-body d-flex flex-column align-items-center'>
        <h5 className='card-title'>{titulo}</h5>
        <p className='card-text text-center'>{descripcion}</p>
        {precio !== undefined && (
          <p className='fw-bold text-success mb-2'>
            ${precio.toLocaleString()}
          </p>
        )}
        <button className='btn btn-primary w-50' onClick={onSelect}>
          Seleccionar
        </button>
      </div>
    </div>
  );
}
