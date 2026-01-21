export default function ServicioCard({
  nombre,
  descripcion,
  precio,
  seleccionado,
  onToggle,
}) {
  return (
    <article
      className={`card shadow h-100 hover-scale ${
        seleccionado ? "border-success border-3" : ""
      }`}
      style={{
        borderRadius: "16px",
        transition: "all 0.3s ease",
        transform: seleccionado ? "scale(1.02)" : "scale(1)",
        background: seleccionado
          ? "linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)"
          : "white",
      }}
    >
      <div className='card-body d-flex flex-column p-4'>
        <div className='text-center mb-3'>
          {seleccionado && <span className='fs-3 mb-2 d-block'>✅</span>}
          <h3 className='card-title h5 fw-bold mb-3'>{nombre}</h3>
        </div>

        <p
          className='card-text text-center flex-grow-1 mb-3'
          style={{ fontSize: "0.9rem" }}
        >
          {descripcion}
        </p>

        <div
          className='badge fs-5 px-3 py-2 mb-3 w-100'
          style={{
            background: seleccionado
              ? "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: "12px",
          }}
        >
          💰 ${precio.toLocaleString()}
        </div>

        <button
          className={`btn w-100 py-3 fw-bold ${
            seleccionado ? "btn-danger" : "btn-primary"
          }`}
          onClick={onToggle}
          aria-label={
            seleccionado
              ? `Quitar ${nombre} del presupuesto`
              : `Agregar ${nombre} al presupuesto`
          }
          aria-pressed={seleccionado}
          style={{
            borderRadius: "12px",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
          }}
        >
          {seleccionado ? "❌ Quitar" : "➕ Agregar"}
        </button>
      </div>
    </article>
  );
}
