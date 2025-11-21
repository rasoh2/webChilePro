export default function Card({ imagen, titulo, descripcion, onSelect }) {
  return (
    <div className='card shadow ' style={{ width: "22rem" }}>
      <img src={imagen} className='card-img-top p-2 ' alt={titulo} />

      <div className='card-body'>
        <h5 className='card-title'>{titulo}</h5>
        <p className='card-text'>{descripcion}</p>

        <button className='btn btn-primary w-100' onClick={onSelect}>
          Seleccionar
        </button>
      </div>
    </div>
  );
}
