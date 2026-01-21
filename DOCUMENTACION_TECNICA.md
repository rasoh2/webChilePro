# 📚 Documentación Técnica - WebChilePro

## 🏗️ Arquitectura de la Aplicación

### Patrón de Diseño

WebChilePro utiliza el patrón **Component-Based Architecture** de React, donde cada parte de la UI es un componente independiente y reutilizable.

### Estructura de Componentes

```
App (Root)
├── NavBar
│   └── Badge (Total)
├── Router
│   ├── Home
│   │   └── Carousel
│   ├── Tipo
│   │   └── Card (x2)
│   ├── Presupuesto
│   │   ├── ServicioCard (múltiples)
│   │   └── ResultadoPresupuesto
│   └── Contacto
│       └── Form
└── Footer
```

---

## 📦 Componentes Principales

### 1. App.jsx

**Propósito**: Componente raíz que maneja el enrutamiento y el estado global.

**Estado Global**:

```javascript
const [total, setTotal] = useState(0); // Total del presupuesto
const [multiplicador, setMultiplicador] = useState(1); // Multiplicador según tipo
```

**Enrutamiento**:

- `/` - Home
- `/tipo` - Selección de tipo de proyecto
- `/presupuesto` - Selección de servicios
- `/contacto` - Formulario de contacto

---

### 2. NavBar.jsx

**Props**:

- `total`: number - Total del presupuesto actual

**Características**:

- Navegación responsive con menú hamburguesa
- Badge dinámico que muestra el total
- Indicador de ruta activa
- Accesibilidad completa (ARIA labels)

**Código clave**:

```javascript
const isActive = (path) => location.pathname === path;
```

---

### 3. Card.jsx

**Props**:

- `imagen`: string - URL de la imagen
- `titulo`: string - Título de la tarjeta
- `descripcion`: string/JSX - Descripción del servicio
- `precio`: number - Precio base
- `onSelect`: function - Callback al seleccionar

**Características**:

- Hover effects con transformaciones CSS
- Lazy loading de imágenes
- Responsive design
- Accesibilidad (article, aria-label)

---

### 4. ServicioCard.jsx

**Props**:

- `nombre`: string - Nombre del servicio
- `descripcion`: string - Descripción
- `precio`: number - Precio del servicio
- `seleccionado`: boolean - Estado de selección
- `onToggle`: function - Callback para toggle

**Estados visuales**:

- Normal: Fondo blanco, botón azul
- Seleccionado: Fondo verde claro, borde verde, botón rojo

**Características**:

- Indicador visual de selección (✅)
- Animación de escala al seleccionar
- Botón con estado aria-pressed

---

### 5. Carousel.jsx

**Propósito**: Muestra un carrusel de imágenes de ejemplo.

**Tecnología**: Bootstrap Carousel con atributos de accesibilidad.

**Características**:

- Auto-play automático
- Navegación con controles
- Transiciones suaves
- Responsive images

---

### 6. AnimateOnScroll.jsx

**Propósito**: Componente wrapper para animaciones al hacer scroll.

**Props**:

- `children`: ReactNode - Contenido a animar
- `animation`: string - Tipo de animación
- `delay`: number - Retraso en ms

**Animaciones disponibles**:

- `fadeIn` - Aparición gradual
- `slideUp` - Deslizamiento desde abajo
- `slideDown` - Deslizamiento desde arriba
- `slideLeft` - Deslizamiento desde la derecha
- `slideRight` - Deslizamiento desde la izquierda

**Tecnología**: Intersection Observer API

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);
```

---

## 📄 Páginas

### Home.jsx

**Ruta**: `/`

**Características**:

- Hero section con título y descripción
- Carrusel de imágenes
- CTAs (Call to Actions) prominentes
- Sección de características (3 columnas)

**Animaciones**:

- Fade-in en elementos principales
- Hover effects en botones

---

### Tipo.jsx

**Ruta**: `/tipo`

**Estado de navegación**:

```javascript
navigate("/presupuesto", {
  state: { tipo, multiplicador, base },
});
```

**Opciones**:

1. **WordPress**:
   - Base: $50,000
   - Multiplicador: 1.0
2. **A Medida (JS/Python)**:
   - Base: $150,000
   - Multiplicador: 2.5

**Características**:

- Cards comparativas
- Ejemplos de proyectos
- Lista de beneficios
- Alert informativo

---

### Presupuesto.jsx

**Ruta**: `/presupuesto`

**Estado Local**:

```javascript
const [seleccionados, setSeleccionados] = useState({});
const [baseValue, setBaseValue] = useState(base);
const [totalConDescuento, setTotalConDescuento] = useState(0);
const [descuento, setDescuento] = useState(0);
const [interaccionUsuario, setInteraccionUsuario] = useState(false);
```

**Lógica de Cálculo**:

```javascript
// Suma de servicios seleccionados
const sumaServicios = Object.entries(seleccionados)
  .filter(([, seleccionado]) => seleccionado)
  .reduce((acc, [id]) => {
    const serv = servicios.find((s) => s.id === Number(id));
    return serv ? acc + Number(serv.precio) * multiplicador : acc;
  }, 0);

// Total
const nuevoTotal = baseValue + sumaServicios;

// Descuentos
if (interaccionUsuario && nuevoTotal >= 500000) {
  if (nuevoTotal >= 1000000) {
    descuentoCalculado = nuevoTotal * 0.2; // 20%
  } else {
    descuentoCalculado = nuevoTotal * 0.1; // 10%
  }
}
```

**Características**:

- Selección múltiple de servicios
- Cálculo en tiempo real
- Sistema de descuentos progresivos
- Indicadores visuales de progreso
- Card de resumen con gradiente

---

### Contacto.jsx

**Ruta**: `/contacto`

**Estado Local**:

```javascript
const [formData, setFormData] = useState({
  nombre: "",
  email: "",
  mensaje: "",
});
```

**Validación**:

- Campos requeridos con HTML5 validation
- Type email para validación de email
- Limpieza de formulario post-submit

**Características**:

- Form floating labels (Bootstrap)
- Visualización del presupuesto calculado
- Feedback visual en submit
- Accesibilidad completa

---

## 🎨 Sistema de Estilos

### Metodología CSS

El proyecto utiliza una combinación de:

- **Bootstrap 5**: Framework base
- **CSS Custom Properties**: Variables reutilizables
- **CSS Modules**: Estilos específicos (carousel.css)
- **Inline Styles**: Para estilos dinámicos específicos

### Variables CSS

```css
:root {
  /* Colores */
  --primary-color: #0d6efd;
  --secondary-color: #6c757d;
  --success-color: #198754;
  --danger-color: #dc3545;

  /* Gradientes */
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-success: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);

  /* Sombras */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.15);
  --shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.18);

  /* Otros */
  --transition-speed: 0.3s;
  --border-radius: 12px;
  --border-radius-lg: 16px;
}
```

### Animaciones CSS

#### Pulse

```css
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
```

#### Slide Down

```css
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Fade In

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

---

## 🔄 Flujo de Datos

### 1. Inicialización

```
App.jsx monta
  ↓
Estado inicial: total=0, multiplicador=1
  ↓
NavBar recibe total=0
```

### 2. Selección de Tipo

```
Usuario hace click en Card (Tipo.jsx)
  ↓
handleSeleccion() se ejecuta
  ↓
navigate() con state: {tipo, multiplicador, base}
  ↓
Presupuesto.jsx recibe state
  ↓
setMultiplicador() actualiza App
```

### 3. Selección de Servicios

```
Usuario hace click en ServicioCard
  ↓
toggleServicio() actualiza seleccionados
  ↓
useEffect detecta cambio
  ↓
Calcula nuevo total
  ↓
setTotal() actualiza App
  ↓
NavBar muestra nuevo total
```

### 4. Navegación a Contacto

```
Usuario hace click en "Solicitar Presupuesto"
  ↓
navigate() con state: {presupuesto}
  ↓
Contacto.jsx muestra presupuesto final
```

---

## 🧪 Testing

### Configuración de Jest

```javascript
// jest.config.js
export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
```

### Tests Existentes

#### Card.test.jsx

- Renderiza correctamente
- Muestra título y precio
- Ejecuta callback onSelect

#### ResultadoPresupuesto.test.jsx

- Muestra total formateado
- Muestra descuento cuando aplica

#### Presupuesto.test.jsx

- Calcula totales correctamente
- Aplica descuentos según reglas
- Maneja selección de servicios

### Ejecutar Tests

```bash
npm test                 # Ejecutar todos los tests
npm test -- --coverage   # Con cobertura
npm test -- --watch      # Modo watch
```

---

## 🔒 Seguridad

### Prevención de XSS

React previene XSS por defecto escapando todo el contenido.

### Validación de Formularios

```javascript
// HTML5 validation
<input type='email' required />;

// Custom validation (futuro)
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

---

## ⚡ Optimización de Rendimiento

### 1. Code Splitting

React Router automáticamente hace code splitting por ruta.

### 2. Lazy Loading de Imágenes

```jsx
<img loading='lazy' src={imagen} alt={titulo} />
```

### 3. Memoization (futuro)

```javascript
// Usar React.memo para componentes puros
const ServicioCard = React.memo(({ ... }) => {
  // ...
});

// Usar useMemo para cálculos costosos
const totalCalculado = useMemo(() => {
  return calcularTotal(servicios, seleccionados);
}, [servicios, seleccionados]);
```

### 4. Virtual Scrolling (futuro)

Para listas largas de servicios, implementar virtual scrolling.

---

## 🌐 Internacionalización (i18n) - Futuro

### Estructura propuesta

```
src/
├── locales/
│   ├── es.json
│   └── en.json
└── i18n.js
```

### Implementación con react-i18next

```javascript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: require("./locales/es.json") },
    en: { translation: require("./locales/en.json") },
  },
  lng: "es",
  fallbackLng: "es",
});
```

---

## 📊 Analytics (Futuro)

### Google Analytics 4

```javascript
// src/utils/analytics.js
export const trackEvent = (category, action, label) => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
};

// Uso
trackEvent("Presupuesto", "seleccion_tipo", "WordPress");
```

---

## 🚀 Despliegue

### Build para Producción

```bash
npm run build
```

Genera archivos optimizados en `dist/`

### Netlify

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

## 🔧 Variables de Entorno

### .env.local (ejemplo)

```
VITE_API_URL=https://api.webchilepro.cl
VITE_EMAIL_SERVICE=your_service_id
VITE_GA_ID=G-XXXXXXXXXX
```

### Uso

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 📝 Convenciones de Código

### Naming Conventions

- **Componentes**: PascalCase (`NavBar.jsx`)
- **Variables**: camelCase (`totalPresupuesto`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_SERVICES`)
- **Archivos CSS**: kebab-case (`carousel.css`)

### Estructura de Componentes

```javascript
// 1. Imports
import React from "react";
import "./styles.css";

// 2. Componente
export default function ComponentName({ prop1, prop2 }) {
  // 2.1 Hooks
  const [state, setState] = useState();

  // 2.2 Funciones
  const handleClick = () => {
    // ...
  };

  // 2.3 JSX
  return <div>{/* ... */}</div>;
}
```

### Comentarios

```javascript
/**
 * Calcula el total del presupuesto incluyendo descuentos
 * @param {Array} servicios - Array de servicios seleccionados
 * @param {number} base - Precio base del proyecto
 * @returns {Object} { total, descuento, totalFinal }
 */
function calcularPresupuesto(servicios, base) {
  // ...
}
```

---

## 🐛 Debugging

### React DevTools

Instalar extensión de navegador para inspeccionar componentes.

### Console Logs Útiles

```javascript
// Desarrollo
if (import.meta.env.DEV) {
  console.log("Estado actual:", { total, seleccionados });
}
```

### Error Boundaries (futuro)

```javascript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Algo salió mal.</h1>;
    }
    return this.props.children;
  }
}
```

---

## 📚 Recursos Adicionales

### Documentación Oficial

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Vite](https://vitejs.dev/)

### Tutoriales Recomendados

- React Hooks en profundidad
- CSS Grid y Flexbox
- Animaciones web modernas
- Accesibilidad web (WCAG)

---

**Última actualización**: Enero 2026
