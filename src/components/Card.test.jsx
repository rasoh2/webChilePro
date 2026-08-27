import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Card from "./Card";

describe("Card", () => {
  it("muestra el título, descripción y precio", () => {
    render(
      <Card
        imagen='img.jpg'
        titulo='Test Card'
        descripcion='Descripción de prueba'
        precio={12345}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByText("Descripción de prueba")).toBeInTheDocument();
    expect(
      screen.getByText((content, node) => {
        const hasText = (node) =>
          node.textContent.includes("$") && node.textContent.includes("12.345");
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node.children || []).every(
          (child) => !hasText(child)
        );
        return nodeHasText && childrenDontHaveText;
      })
    ).toBeInTheDocument();
  });

  it("llama a onSelect al hacer click en el botón", () => {
    const onSelectMock = vi.fn();
    render(
      <Card
        imagen='img.jpg'
        titulo='Test Card'
        descripcion='Descripción de prueba'
        precio={12345}
        onSelect={onSelectMock}
      />
    );
    fireEvent.click(screen.getByText(/Seleccionar/));
    expect(onSelectMock).toHaveBeenCalled();
  });
});
