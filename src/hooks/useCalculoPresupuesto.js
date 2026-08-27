import { useState, useEffect } from "react";
import { servicios } from "../db/data.js";

/**
 * Hook personalizado para manejar la lógica de cálculo de presupuestos,
 * selección de servicios adicionales y descuentos dinámicos.
 * 
 * @param {Object} params
 * @param {number} params.base - Costo base del tipo de proyecto
 * @param {number} params.multiplicador - Multiplicador según la complejidad del proyecto
 * @param {Function} params.setTotal - Callback para actualizar el total acumulado en el estado global
 * @returns {Object} Lógica y estados de cálculo de presupuesto
 */
export function useCalculoPresupuesto({ base, multiplicador, setTotal }) {
  const [seleccionados, setSeleccionados] = useState(() => {
    try {
      const saved = sessionStorage.getItem("webchilepro_seleccionados");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [baseValue, setBaseValue] = useState(base);
  const [totalConDescuento, setTotalConDescuento] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [interaccionUsuario, setInteraccionUsuario] = useState(() => {
    try {
      const saved = sessionStorage.getItem("webchilepro_interaccion");
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // Guardar estado en sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem("webchilepro_seleccionados", JSON.stringify(seleccionados));
      sessionStorage.setItem("webchilepro_interaccion", JSON.stringify(interaccionUsuario));
    } catch (e) {
      console.error(e);
    }
  }, [seleccionados, interaccionUsuario]);

  // Reiniciar la selección si cambia la base o tipo del proyecto (proviene de navegación explícita)
  useEffect(() => {
    setBaseValue(base);
    setSeleccionados({});
    setInteraccionUsuario(false);
  }, [base]);

  // Al desmontar, resetear el total global
  useEffect(() => {
    return () => {
      setTotal(0);
    };
  }, [setTotal]);

  // Alternar la selección de un servicio
  const toggleServicio = (serv) => {
    setInteraccionUsuario(true);
    setSeleccionados((prev) => ({
      ...prev,
      [serv.id]: !prev[serv.id],
    }));
  };

  // Recalcular subtotal y descuentos cuando cambie la selección o la base
  useEffect(() => {
    const sumaServicios = Object.entries(seleccionados)
      .filter(([, seleccionado]) => seleccionado)
      .reduce((acc, [id]) => {
        const serv = servicios.find((s) => s.id === Number(id));
        return serv ? acc + Number(serv.precio) * multiplicador : acc;
      }, 0);

    const nuevoTotal = baseValue + sumaServicios;
    setTotal(nuevoTotal);

    if (interaccionUsuario && nuevoTotal >= 500000) {
      let descuentoCalculado = 0;
      if (nuevoTotal >= 1000000) {
        descuentoCalculado = nuevoTotal * 0.2;
      } else {
        descuentoCalculado = nuevoTotal * 0.1;
      }
      setDescuento(descuentoCalculado);
      setTotalConDescuento(nuevoTotal - descuentoCalculado);
    } else {
      setDescuento(0);
      setTotalConDescuento(0);
    }
  }, [seleccionados, baseValue, multiplicador, setTotal, interaccionUsuario]);

  return {
    seleccionados,
    descuento,
    totalConDescuento,
    toggleServicio,
  };
}
