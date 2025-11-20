export default function ResultadoPresupuesto({ total }) {
  return (
    <div className='mt-4'>
      <h4>Resultado:</h4>

      {total > 0 ? (
        <p className='fs-4 text-success fw-bold'>Total estimado: ${total}</p>
      ) : (
        <p className='text-muted'>Aún no hay un cálculo.</p>
      )}
    </div>
  );
}
