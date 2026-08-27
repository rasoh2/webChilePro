import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Contacto from "./Contacto";

describe("Contacto", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderComponent = (state = {}) => {
    return render(
      <MemoryRouter initialEntries={[{ pathname: "/contacto", state }]}>
        <Contacto />
      </MemoryRouter>
    );
  };

  it("renderiza todos los campos del formulario y el botón de envío", () => {
    renderComponent();

    expect(screen.getByLabelText(/Ingresa tu nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ingresa tu correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Escribe tu mensaje o consulta/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Enviar formulario de contacto/i })).toBeInTheDocument();
  });

  it("muestra el presupuesto estimado si es provisto en el estado de la ruta", () => {
    renderComponent({ presupuesto: 150000 });

    expect(screen.getByText("$150.000")).toBeInTheDocument();
    expect(screen.queryByText(/Aún no has seleccionado servicios/i)).not.toBeInTheDocument();
  });

  it("muestra un mensaje indicando que no hay presupuesto si no es provisto", () => {
    renderComponent();

    expect(screen.getByText(/Aún no has seleccionado servicios/i)).toBeInTheDocument();
  });

  it("actualiza el valor de los campos al escribir en ellos", () => {
    renderComponent();

    const inputNombre = screen.getByLabelText(/Ingresa tu nombre completo/i);
    const inputEmail = screen.getByLabelText(/Ingresa tu correo electrónico/i);
    const textAreaMensaje = screen.getByLabelText(/Escribe tu mensaje o consulta/i);

    fireEvent.change(inputNombre, { target: { value: "Juan Pérez" } });
    fireEvent.change(inputEmail, { target: { value: "juan@ejemplo.com" } });
    fireEvent.change(textAreaMensaje, { target: { value: "Hola, me interesa una cotización." } });

    expect(inputNombre.value).toBe("Juan Pérez");
    expect(inputEmail.value).toBe("juan@ejemplo.com");
    expect(textAreaMensaje.value).toBe("Hola, me interesa una cotización.");
  });

  it("envía el formulario con éxito, muestra un banner de éxito temporal y limpia los campos", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    renderComponent({ presupuesto: 500000 });

    const inputNombre = screen.getByLabelText(/Ingresa tu nombre completo/i);
    const inputEmail = screen.getByLabelText(/Ingresa tu correo electrónico/i);
    const textAreaMensaje = screen.getByLabelText(/Escribe tu mensaje o consulta/i);
    const submitBtn = screen.getByRole("button", { name: /Enviar formulario de contacto/i });

    fireEvent.change(inputNombre, { target: { value: "Sebastián" } });
    fireEvent.change(inputEmail, { target: { value: "seba@ejemplo.cl" } });
    fireEvent.change(textAreaMensaje, { target: { value: "Consulta de prueba" } });

    // Simular el envío
    fireEvent.click(submitBtn);

    // Verificar que el banner de éxito aparezca en el DOM
    expect(screen.getByText("¡Envío Exitoso!")).toBeInTheDocument();
    expect(screen.getByText(/Tu mensaje ha sido enviado correctamente/i)).toBeInTheDocument();

    // Verificar consola
    expect(logSpy).toHaveBeenCalled();

    // Verificar que los campos se hayan limpiado
    expect(inputNombre.value).toBe("");
    expect(inputEmail.value).toBe("");
    expect(textAreaMensaje.value).toBe("");

    // Avanzar el tiempo para verificar que desaparece la alerta
    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.queryByText("¡Envío Exitoso!")).not.toBeInTheDocument();
  });
});
