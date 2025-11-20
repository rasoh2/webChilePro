import imagen1 from "../assets/img/imagen1.png";
import imagen2 from "../assets/img/imagen2.png";
import imagen3 from "../assets/img/imagen3.png";
import "./carousel.css";

export default function Carousel() {
  return (
    <div
      id='carouselExampleAutoplaying'
      className='carousel slide'
      data-bs-ride='carousel'
    >
      <div className='carousel-inner'>
        <div className='carousel-item active'>
          <img
            src={imagen1}
            className='d-block w-100'
            alt='Imagen de pagina web prefabricada'
          />
        </div>
        <div className='carousel-item'>
          <img
            src={imagen2}
            className='d-block w-100'
            alt='Imagen de pagina web a medida con JavaScript'
          />
        </div>
        <div className='carousel-item'>
          <img
            src={imagen3}
            className='d-block w-100'
            alt='Imagen de pagina web a medida con python
          '
          />
        </div>
      </div>
      <button
        className='carousel-control-prev'
        type='button'
        data-bs-target='#carouselExampleAutoplaying'
        data-bs-slide='prev'
      >
        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
        <span className='visually-hidden'>Previous</span>
      </button>
      <button
        className='carousel-control-next'
        type='button'
        data-bs-target='#carouselExampleAutoplaying'
        data-bs-slide='next'
      >
        <span className='carousel-control-next-icon' aria-hidden='true'></span>
        <span className='visually-hidden'>Next</span>
      </button>
    </div>
  );
}
