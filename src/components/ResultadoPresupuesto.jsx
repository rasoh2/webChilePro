/**
 * Componente ResultadoPresupuesto
 * 
 * Muestra el total estimado del presupuesto junto con una barra de progreso
 * gamificada que indica visualmente qué descuentos se han alcanzado
 * (10% a partir de $500.000 y 20% a partir de $1.000.000).
 * 
 * @param {Object} props
 * @param {number} props.total - Subtotal acumulado del presupuesto (antes o después del descuento)
 */
export default function ResultadoPresupuesto({ total, subtotal = total }) {
  const LEVEL_1 = 500000;
  const LEVEL_2 = 1000000;

  // Calcular el porcentaje de progreso en la barra con escala segmentada basado en el subtotal
  let progressPct = 0;
  if (subtotal > 0) {
    if (subtotal < LEVEL_1) {
      // De 0% a 50% de la barra representa el tramo hasta $500k
      progressPct = (subtotal / LEVEL_1) * 50;
    } else if (subtotal < LEVEL_2) {
      // De 50% a 100% de la barra representa el tramo de $500k a $1M
      progressPct = 50 + ((subtotal - LEVEL_1) / (LEVEL_2 - LEVEL_1)) * 50;
    } else {
      progressPct = 100;
    }
  }

  const isLevel1Achieved = subtotal >= LEVEL_1;
  const isLevel2Achieved = subtotal >= LEVEL_2;

  return (
    <div className='mt-4 p-4 rounded-4 bg-white shadow-sm border border-light-subtle w-100 text-start' style={{ maxWidth: '600px' }}>
      <h4 className='fw-bold mb-4 text-center' style={{ color: 'var(--dark-color)', fontSize: '1.2rem' }}>
        🎯 Progreso de Ahorro y Descuentos
      </h4>

      {/* Contenedor de la barra de progreso */}
      <div className='progress-ahorro-container'>
        <div className='progress-ahorro-bar-wrapper'>
          <div 
            className='progress-ahorro-bar-fill' 
            style={{ width: `${progressPct}%` }}
            role='progressbar'
            aria-valuenow={total}
            aria-valuemin='0'
            aria-valuemax={LEVEL_2}
            aria-label='Progreso de descuento'
          ></div>

          {/* Hito 0% (Inicio) */}
          <div className='progress-milestone active' style={{ left: '0%' }}>
            🚀
            <span className='progress-milestone-label'>Inicio</span>
          </div>

          {/* Hito 10% Descuento ($500.000) */}
          <div className={`progress-milestone ${isLevel1Achieved ? 'active' : ''}`} style={{ left: '50%' }}>
            🎉
            <span className='progress-milestone-label'>10% Off ($500k)</span>
          </div>

          {/* Hito 20% Descuento ($1.000.000) */}
          <div className={`progress-milestone ${isLevel2Achieved ? 'active' : ''}`} style={{ left: '100%' }}>
            👑
            <span className='progress-milestone-label'>20% Off ($1M)</span>
          </div>
        </div>
      </div>

      <div className='text-center mt-3 pt-3 border-top border-light-subtle'>
        {total > 0 ? (
          <p className='fs-3 text-success fw-bold mb-0' aria-live='polite'>
            Total estimado: ${total}
          </p>
        ) : (
          <p className='text-muted mb-0'>Aún no hay un cálculo.</p>
        )}
      </div>
    </div>
  );
}
