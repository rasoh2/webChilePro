import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Presupuesto from "./Presupuesto";

const mockServicios = [
  { id: 1, nombre: "Servicio 1", descripcion: "Desc 1", precio: 200000 },
  { id: 2, nombre: "Servicio 2", descripcion: "Desc 2", precio: 300000 },
  { id: 3, nombre: "Servicio 3", descripcion: "Desc 3", precio: 600000 },
];

vi.mock("../db/data.js", () => {
  return {
    servicios: [
      { id: 1, nombre: "Servicio 1", descripcion: "Desc 1", precio: 200000 },
      { id: 2, nombre: "Servicio 2", descripcion: "Desc 2", precio: 300000 },
      { id: 3, nombre: "Servicio 3", descripcion: "Desc 3", precio: 600000 },
    ],
  };
});

describe("Presupuesto", () => {
  let mockSetTotal;
  let mockSetMultiplicador;

  beforeEach(() => {
    mockSetTotal = vi.fn();
    mockSetMultiplicador = vi.fn();
    // Limpiar sessionStorage antes de cada prueba para que no interfiera
    sessionStorage.clear();
  });

  const renderComponent = (state, total = 0) => {
    return render(
      <MemoryRouter initialEntries={[{ pathname: "/presupuesto", state }]}>
        <Presupuesto
          total={total}
          setTotal={mockSetTotal}
          setMultiplicador={mockSetMultiplicador}
        />
      </MemoryRouter>
    );
  };

  it("muestra los servicios disponibles", () => {
    renderComponent({ tipo: "Tipo 1", base: 100000 });
    mockServicios.forEach((servicio) => {
      expect(screen.getByText(servicio.nombre)).toBeInTheDocument();
    });
  });

  it("calcula el total básico al seleccionar un servicio (sin descuento)", () => {
    renderComponent({ tipo: "Web Corporativa", base: 100000, multiplicador: 1 });

    const btnAgregar = screen.getAllByRole("button", { name: /Agregar/i })[0]; // Primer servicio: $200.000
    fireEvent.click(btnAgregar);

    // setTotal es llamado para actualizar el total global
    expect(mockSetTotal).toHaveBeenLastCalledWith(300000); // base (100k) + servicio 1 (200k)
  });

  it("aplica multiplicador al servicio seleccionado", () => {
    renderComponent({ tipo: "E-Commerce Grande", base: 200000, multiplicador: 1.5 });

    const btnAgregar = screen.getAllByRole("button", { name: /Agregar/i })[0]; // Servicio 1: $200.000 * 1.5 = $300.000
    fireEvent.click(btnAgregar);

    expect(mockSetTotal).toHaveBeenLastCalledWith(500000); // base (200k) + servicio 1 (300k)
  });

  it("aplica un 10% de descuento cuando el subtotal es mayor o igual a $500.000 pero menor a $1.000.000", () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={[{ pathname: "/presupuesto", state: { tipo: "Prueba", base: 0, multiplicador: 1 } }]}>
        <Presupuesto total={500000} setTotal={mockSetTotal} />
      </MemoryRouter>
    );

    // Hacemos click en agregar "Servicio 1" ($200.000) y "Servicio 2" ($300.000)
    // Para simular la interacción del usuario
    const botonesAgregar = screen.getAllByRole("button", { name: /Agregar/i });
    fireEvent.click(botonesAgregar[0]); // Agrega Servicio 1 ($200.000)
    fireEvent.click(botonesAgregar[1]); // Agrega Servicio 2 ($300.000) -> Subtotal = $500.000

    // Rerender con total actualizado para ver los cambios en el resumen de presupuesto renderizado
    rerender(
      <MemoryRouter initialEntries={[{ pathname: "/presupuesto", state: { tipo: "Prueba", base: 0, multiplicador: 1 } }]}>
        <Presupuesto total={500000} setTotal={mockSetTotal} />
      </MemoryRouter>
    );

    expect(screen.getByText(/¡Felicidades!/)).toBeInTheDocument();
    expect(screen.getByText("10%")).toBeInTheDocument();
    expect(screen.getByText("-$50.000")).toBeInTheDocument();
    expect(screen.getByText("$450.000")).toBeInTheDocument();
  });

  it("aplica un 20% de descuento cuando el subtotal es mayor o igual a $1.000.000", () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={[{ pathname: "/presupuesto", state: { tipo: "Prueba", base: 0, multiplicador: 1 } }]}>
        <Presupuesto total={1100000} setTotal={mockSetTotal} />
      </MemoryRouter>
    );

    const botonesAgregar = screen.getAllByRole("button", { name: /Agregar/i });
    fireEvent.click(botonesAgregar[0]); // Servicio 1 ($200k)
    fireEvent.click(botonesAgregar[1]); // Servicio 2 ($300k)
    fireEvent.click(botonesAgregar[2]); // Servicio 3 ($600k) -> Subtotal = $1.100.000

    rerender(
      <MemoryRouter initialEntries={[{ pathname: "/presupuesto", state: { tipo: "Prueba", base: 0, multiplicador: 1 } }]}>
        <Presupuesto total={1100000} setTotal={mockSetTotal} />
      </MemoryRouter>
    );

    expect(screen.getByText(/¡Felicidades!/)).toBeInTheDocument();
    expect(screen.getByText("20%")).toBeInTheDocument();
    expect(screen.getByText("-$220.000")).toBeInTheDocument();
    expect(screen.getByText("$880.000")).toBeInTheDocument();
  });
});
