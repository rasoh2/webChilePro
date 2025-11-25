import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Presupuesto from "./Presupuesto";

const mockServicios = [
  { id: 1, nombre: "Servicio 1", descripcion: "Desc 1", precio: 200000 },
  { id: 2, nombre: "Servicio 2", descripcion: "Desc 2", precio: 300000 },
  { id: 3, nombre: "Servicio 3", descripcion: "Desc 3", precio: 600000 },
];

jest.mock("../db/data.js", () => {
  return {
    servicios: [
      { id: 1, nombre: "Servicio 1", descripcion: "Desc 1", precio: 200000 },
      { id: 2, nombre: "Servicio 2", descripcion: "Desc 2", precio: 300000 },
      { id: 3, nombre: "Servicio 3", descripcion: "Desc 3", precio: 600000 },
    ],
  };
});

describe("Presupuesto", () => {
  const mockSetTotal = jest.fn();
  const mockSetMultiplicador = jest.fn();

  const renderComponent = (state) => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/presupuesto", state }]}>
        <Presupuesto
          total={0}
          setTotal={mockSetTotal}
          setMultiplicador={mockSetMultiplicador}
        />
      </MemoryRouter>
    );
  };

  it("muestra los servicios disponibles", () => {
    renderComponent({ tipo: "Tipo 1", base: 0 });
    mockServicios.forEach((servicio) => {
      expect(screen.getByText(servicio.nombre)).toBeInTheDocument();
    });
  });
});
