# 🚀 WebChilePro - Generador de Presupuestos Web

## 📋 Información del Proyecto

**Proyecto Investigativo - Universidad INACAP 2026**

WebChilePro es una aplicación web desarrollada con React que permite a los usuarios calcular presupuestos para proyectos de desarrollo web de manera inteligente, transparente y profesional.

---

## 🎯 Características Principales

### ✨ Funcionalidades

- **Selección de Tipo de Proyecto**: Elige entre WordPress (plantillas) o desarrollo a medida (JavaScript/Python)
- **Servicios Personalizables**: Agrega servicios adicionales según tus necesidades
- **Sistema de Descuentos Inteligente**:
  - 10% de descuento para presupuestos ≥ $500,000
  - 20% de descuento para presupuestos ≥ $1,000,000
- **Calculadora en Tiempo Real**: Visualiza el total actualizado instantáneamente
- **Formulario de Contacto**: Envía tu presupuesto y solicitud directamente
- **Diseño Responsive**: Optimizado para todos los dispositivos

### 🎨 Mejoras de UX/UI

- **Animaciones Suaves**: Transiciones y efectos visuales modernos
- **Diseño Gradient**: Paleta de colores vibrante y profesional
- **Cards Interactivas**: Efectos hover y estados visuales claros
- **Accesibilidad**: Etiquetas ARIA, navegación por teclado, contraste adecuado
- **Feedback Visual**: Indicadores claros del estado de selección

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 19.2.0** - Biblioteca de JavaScript para interfaces de usuario
- **React Router DOM 7.9.5** - Navegación y enrutamiento
- **Bootstrap 5.3.8** - Framework CSS para diseño responsive
- **Vite 7.1.7** - Build tool y dev server ultrarrápido

### Testing

- **Jest 30.2.0** - Framework de testing
- **Testing Library** - Testing de componentes React
- **Babel** - Transpilador para compatibilidad

### Herramientas de Desarrollo

- **ESLint** - Linter para calidad de código
- **Vite** - Hot Module Replacement (HMR)

---

## 📁 Estructura del Proyecto

```
webchilepro/
├── public/                     # Archivos públicos estáticos
├── src/
│   ├── assets/                # Imágenes y recursos
│   │   └── img/              # Imágenes del proyecto
│   ├── components/           # Componentes reutilizables
│   │   ├── AnimateOnScroll.jsx   # Componente de animaciones
│   │   ├── Card.jsx              # Tarjeta de selección de tipo
│   │   ├── Card.test.jsx         # Tests del componente Card
│   │   ├── Carousel.jsx          # Carrusel de imágenes
│   │   ├── carousel.css          # Estilos del carrusel
│   │   ├── Footer.jsx            # Pie de página
│   │   ├── NavBar.jsx            # Barra de navegación
│   │   ├── ResultadoPresupuesto.jsx  # Resultado del presupuesto
│   │   ├── ResultadoPresupuesto.test.jsx  # Tests
│   │   └── ServicioCard.jsx      # Tarjeta de servicio
│   ├── db/
│   │   └── data.js           # Base de datos de servicios
│   ├── pages/                # Páginas de la aplicación
│   │   ├── Contacto.jsx      # Página de contacto
│   │   ├── Home.jsx          # Página principal
│   │   ├── Presupuesto.jsx   # Página de selección de servicios
│   │   ├── Presupuesto.test.jsx  # Tests
│   │   └── Tipo.jsx          # Página de selección de tipo
│   ├── App.jsx               # Componente principal
│   └── main.jsx              # Punto de entrada
├── app.css                   # Estilos globales mejorados
├── index.html                # HTML principal
├── package.json              # Dependencias del proyecto
├── vite.config.js            # Configuración de Vite
├── jest.config.js            # Configuración de Jest
├── babel.config.js           # Configuración de Babel
├── eslint.config.js          # Configuración de ESLint
└── README.md                 # Este archivo
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone [URL_DEL_REPOSITORIO]
cd webchilepro
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Iniciar el servidor de desarrollo**

```bash
npm run dev
```

4. **Abrir en el navegador**

```
http://localhost:5173
```

---

## 📝 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run preview  # Previsualiza la build de producción
npm run lint     # Ejecuta el linter
npm test         # Ejecuta los tests
```

---

## 🎨 Guía de Estilos CSS

### Variables CSS Personalizadas

El proyecto utiliza variables CSS para mantener consistencia en el diseño:

```css
:root {
  --primary-color: #0d6efd;
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.15);
  --border-radius: 12px;
  --transition-speed: 0.3s;
}
```

### Clases Utilitarias

- `.gradient-text` - Texto con degradado
- `.hover-scale` - Efecto de escala al hover
- `.shadow-custom` - Sombra personalizada
- `.animate-on-scroll` - Animación al hacer scroll

---

## 🧪 Testing

### Ejecutar Tests

```bash
npm test
```

### Tests Incluidos

- Componente `Card`
- Componente `ResultadoPresupuesto`
- Página `Presupuesto`

### Cobertura de Tests

Los tests verifican:

- Renderizado de componentes
- Interacciones del usuario
- Cálculos de presupuesto
- Estados de la aplicación

---

## 📊 Flujo de la Aplicación

```
Home
  ↓
Tipo de Proyecto (WordPress / A Medida)
  ↓
Selección de Servicios
  ↓
Cálculo de Presupuesto con Descuentos
  ↓
Formulario de Contacto
```

---

## 💰 Sistema de Precios

### Precios Base

- **WordPress**: $50,000 (multiplicador 1.0)
- **A Medida (JS/Python)**: $150,000 (multiplicador 2.5)

### Servicios Adicionales

Los servicios se multiplican según el tipo de proyecto seleccionado.

### Descuentos Automáticos

- **10% de descuento**: Para presupuestos de $500,000 o más
- **20% de descuento**: Para presupuestos de $1,000,000 o más

---

## 🎯 Características de Accesibilidad

### Implementaciones

- ✅ Etiquetas ARIA descriptivas
- ✅ Navegación por teclado completa
- ✅ Contraste de colores accesible (WCAG AA)
- ✅ Textos alternativos en imágenes
- ✅ Estados de foco visibles
- ✅ Estructura semántica HTML5
- ✅ Skip links para navegación rápida

---

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Características Responsive

- Menú hamburguesa en móviles
- Grid adaptativo para cards
- Tipografía fluida con `clamp()`
- Imágenes optimizadas con `lazy loading`

---

## 🔄 Estado de la Aplicación

### Gestión de Estado

El proyecto utiliza React Hooks para la gestión de estado:

- `useState` - Estado local de componentes
- `useEffect` - Efectos secundarios
- `useNavigate` - Navegación programática
- `useLocation` - Acceso a la ubicación actual

### Estado Global

- `total` - Total del presupuesto
- `multiplicador` - Multiplicador según tipo de proyecto
- `seleccionados` - Servicios seleccionados
- `descuento` - Descuento aplicado

---

## 🎓 Contexto Académico

### Universidad INACAP 2026

Este proyecto fue desarrollado como parte de un trabajo investigativo para la universidad INACAP, específicamente para la asignatura de **Funciones y Matrices** del segundo semestre.

### Objetivos de Aprendizaje

- Aplicación de conceptos matemáticos en desarrollo web
- Implementación de funciones para cálculos automatizados
- Gestión de estados y flujos de datos
- Desarrollo de interfaces de usuario modernas
- Aplicación de buenas prácticas de programación

---

## 👥 Contribuciones

Este es un proyecto académico. Para sugerencias o mejoras:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es parte de un trabajo investigativo académico para INACAP.

---

## 📞 Contacto

**WebChilePro**

- Website: [https://webchilepro.netlify.app/](https://webchilepro.netlify.app/)
- Email: contacto@webchilepro.cl

---

## 🙏 Agradecimientos

- Universidad INACAP por el apoyo académico
- Profesores de Funciones y Matrices
- Comunidad de React y Bootstrap
- Todos los recursos de código abierto utilizados

---

## 📈 Futuras Mejoras

### Próximas Características

- [ ] Integración con API de pagos
- [ ] Sistema de usuarios y autenticación
- [ ] Historial de presupuestos
- [ ] Exportación a PDF
- [ ] Envío de emails real
- [ ] Panel de administración
- [ ] Múltiples idiomas (i18n)
- [ ] Dark mode
- [ ] PWA (Progressive Web App)

---

## 🐛 Reporte de Bugs

Si encuentras algún bug, por favor crea un issue en el repositorio con:

1. Descripción del bug
2. Pasos para reproducir
3. Comportamiento esperado
4. Screenshots (si aplica)
5. Navegador y versión

---

## ⚡ Optimizaciones Implementadas

- **Lazy Loading**: Imágenes cargadas bajo demanda
- **Code Splitting**: División de código con React Router
- **CSS Moderno**: Variables CSS y gradientes optimizados
- **Vite**: Build tool ultrarrápido
- **Minificación**: Código optimizado en producción

---

**Desarrollado con ❤️ para INACAP 2026**
