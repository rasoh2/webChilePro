import { render, screen } from "@testing-library/react";
import ResultadoPresupuesto from "./ResultadoPresupuesto";

describe("ResultadoPresupuesto", () => {
  it("muestra el total correctamente", () => {
    render(<ResultadoPresupuesto total={123456} />);

    expect(
      screen.getByText((content, element) => {
        return (
          element.tagName.toLowerCase() === "p" &&
          content.includes("Total estimado: $") &&
          content.includes("123456")
        );
      })
    ).toBeInTheDocument();
  });

  it("muestra un mensaje cuando el total es 0", () => {
    render(<ResultadoPresupuesto total={0} />);

    // Verificar que se muestra un mensaje indicando que no hay presupuesto
    expect(screen.getByText(/Aún no hay un cálculo\./)).toBeInTheDocument();
  });
});
