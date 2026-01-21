export default function Card({
  imagen,
  titulo,
  descripcion,
  precio,
  onSelect,
}) {
  return (
    <article
      className='card shadow-lg text-center d-flex flex-column h-100 hover-scale'
      style={{
        width: "100%",
        maxWidth: "28rem",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ overflow: "hidden", height: "200px" }}>
        <img
          src={imagen}
          className='card-img-top'
          alt={titulo}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          loading='lazy'
        />
      </div>

      <div className='card-body d-flex flex-column align-items-center justify-content-between p-4'>
        <div>
          <h3 className='card-title h4 mb-3'>{titulo}</h3>
          <div
            className='card-text text-start mb-3'
            style={{ fontSize: "0.95rem" }}
          >
            {descripcion}
          </div>
        </div>

        {precio !== undefined && (
          <div className='w-100 mb-3'>
            <div
              className='badge fs-5 px-4 py-2 w-100'
              style={{
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                color: "white",
                borderRadius: "12px",
              }}
            >
              💰 ${precio.toLocaleString()}
            </div>
          </div>
        )}

        <button
          className='btn btn-primary w-100 py-3 fw-bold'
          onClick={onSelect}
          aria-label={`Seleccionar ${titulo}`}
          style={{ borderRadius: "12px", textTransform: "uppercase" }}
        >
          ✨ Seleccionar
        </button>
      </div>
    </article>
  );
}
