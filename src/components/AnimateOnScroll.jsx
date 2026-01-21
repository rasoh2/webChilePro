import { useEffect, useRef } from "react";

/**
 * Componente que aplica animación de entrada cuando el elemento es visible en el viewport
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido a animar
 * @param {string} props.animation - Tipo de animación (fadeIn, slideUp, slideDown, slideLeft, slideRight)
 * @param {number} props.delay - Retraso en milisegundos antes de iniciar la animación
 * @returns {JSX.Element} Componente con animación
 */
export default function AnimateOnScroll({
  children,
  animation = "fadeIn",
  delay = 0,
}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  const animationStyles = {
    fadeIn: {
      opacity: 0,
      transition: "opacity 0.6s ease",
    },
    slideUp: {
      opacity: 0,
      transform: "translateY(30px)",
      transition: "all 0.6s ease",
    },
    slideDown: {
      opacity: 0,
      transform: "translateY(-30px)",
      transition: "all 0.6s ease",
    },
    slideLeft: {
      opacity: 0,
      transform: "translateX(30px)",
      transition: "all 0.6s ease",
    },
    slideRight: {
      opacity: 0,
      transform: "translateX(-30px)",
      transition: "all 0.6s ease",
    },
  };

  const visibleStyles = {
    fadeIn: {
      opacity: 1,
    },
    slideUp: {
      opacity: 1,
      transform: "translateY(0)",
    },
    slideDown: {
      opacity: 1,
      transform: "translateY(0)",
    },
    slideLeft: {
      opacity: 1,
      transform: "translateX(0)",
    },
    slideRight: {
      opacity: 1,
      transform: "translateX(0)",
    },
  };

  return (
    <div
      ref={elementRef}
      className='animate-element'
      style={animationStyles[animation]}
    >
      <style>{`
        .animate-element.visible {
          opacity: 1 !important;
          transform: translate(0, 0) !important;
        }
      `}</style>
      {children}
    </div>
  );
}
