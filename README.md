# Grow Motel PMS — Sistema de Gestión Temporal & IoT 🏨⚡

Plataforma integral y autocontenida para la gestión operativa y financiera de hoteles por hora, alojamiento temporal y automatización de hardware IoT (cerraduras electrónicas, relés de energía y sensores magnéticos).

> **Diseñado por [Grow Labs](https://www.growlabs.lat) 🚀**  
> *100% Autocontenido para Demo, Presentaciones y Deploy Estático (Vercel, Netlify o GitHub Pages).*

---

## 🌟 Características Principales

### 1. ⏱️ Gestión de Turnos y Estadías Dinámicas
- **Tarifación por Hora y Turnos:** Soporte nativo para turnos de **1.5 Horas (90 min)**, **2 Horas (120 min)**, **3 Horas (180 min)** y **Pernocte (12 Horas)**.
- **Cronómetros en Vivo con Alertas:**
  - 🟢 **Disponible:** Habitación lista para nuevo ingreso.
  - 🔵 **Ocupada:** Cuenta regresiva activa con barra de progreso.
  - 🟡 **Por Vencer (< 15 min):** Alerta sonora y visual para avisar al huésped o coordinar extensión.
  - 🔴 **Vencida / Sobretiempo:** Conteo de minutos excedidos (`+00:08:24`) para recargo tarifario.
- **Extensión de Turnos Express:** Botón `+ Tiempo` (+30m, +1h) con recálculo automático de cuenta y tiempo restante.
- **Check-In Discreto:** Registro opcional de patente vehicular para control de cocheras privadas.

### 2. 🍾 Control de Frigobar & Room Service
- **Carga Directa a la Habitación:** Botón `+ Frigobar` para sumar cervezas, vinos, espumantes, snacks y kits sensuales al turno activo.
- **Control de Inventario & Valorización:** Catálogo con precios, stock en tiempo real y alertas automáticas de reposición (≤ 10 unidades).
- **Desglose en Ticket:** El huésped recibe su liquidación detallando horas de estadía y productos consumidos.

### 3. 📊 Métricas Financieras por Habitación
- **Facturación Total por Habitación:** Desglose exacto de ingresos generados por **Turnos de Alojamiento** vs. **Consumos de Frigobar**.
- **Porcentaje de Aporte de Frigobar (%):** Análisis del mix de productos consumidos por categoría.
- **Ranking Visual:** Gráficos de barras interactivos con las habitaciones más rentables.
- **Exportación CSV:** Descarga directa de reportes tabulados para auditoría y contabilidad.

### 4. ⚡ Automatización IoT & Telemetría MQTT
- **Control Remoto de Cerraduras:** Destrabe y bloqueo de puertas electrónicas (ESP32).
- **Sensor Magnético:** Detección en vivo de puertas físicas abiertas o entreabiertas.
- **Relé de Energía Inteligente (Modo Eco):** Corte automático de energía eléctrica en habitaciones libres (ahorro hasta 40%).
- **Protocolo de Emergencia General:** Botón de apertura simultánea de todas las cerraduras del hotel en caso de siniestro.
- **Banco de Prueba / Simulador MQTT:** Generador interactivo de telemetría y eventos de hardware en tiempo real.

### 5. 🧹 Mucamas, Limpieza & Caja Diaria
- **Flujo Post Check-Out:** Pase automático a limpieza, cronómetro de desinfección y checklist de habilitación (sábanas, desinfección de jacuzzi y reposición 100% de frigobar).
- **Arqueo de Turno:** Conciliación de efectivo físico en gaveta frente a cobros digitales (POS, Mercado Pago QR y Transferencias).

### 6. 🎓 Sistema de Capacitación, Tour Interactivo & Manuales
- **Tutorial Interactivo (Modal):** Tour guiado de 6 pasos con explicaciones operativas y saltos directos a cada sección.
- **Manuales Operativos:** Documentación detallada por área (Recepción, Frigobar, Hardware IoT, Finanzas, Mucamas, Caja) con botón de impresión en PDF.
- **Reinicio Rápido de Demo:** Botón en el sidebar para restaurar datos demo limpios en cualquier momento.

---

## 🎨 Estética & Diseño
- Basado en los tokens orgánicos y limpios del ecosistema **Grow Labs**:
  - `Fondo`: `#F4F7F3` (Verde salvia suave)
  - `Tarjetas`: `#FFFFFF` con bordes `#CBD8C8` y sombras suaves `shadow-soft`
  - `Primario / Botones`: `#5E7B60` / `#2F5233`
  - `Acentos`: `#DCE6C6` (Manteca / Lima) y `#E8EFE6` (Crema)
  - `Sidebar`: Totalmente **colapsable** (260px ↔ 72px) para aprovechar el **100% del ancho de pantalla**.

---

## 🚀 Instalación y Despliegue

### Requisitos
- Node.js 18+
- npm o pnpm

### Ejecución Local
```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd telo

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```
La plataforma estará disponible en `http://localhost:3000/`.

### 📦 Build para Producción y Deploy
```bash
npm run build
```
El directorio `dist/` resultante contiene los archivos estáticos listos para ser desplegados en:
- **Vercel** (incluye `vercel.json` preconfigurado)
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**

---

## 🛠️ Tecnologías Utilizadas
- **React 18** + **Vite**
- **Lucide React** (Iconografía moderna)
- **Vanilla CSS Tokens** (Rendimiento máximo sin dependencias pesadas)
- **Web Audio API** (Efectos de sonido interactivos para chimes de alerta y aperturas IoT)
- **LocalStorage API** (Persistencia y simulación autónoma para demos)

---

Desarrollado con ❤️ por **[Grow Labs](https://www.growlabs.lat)**.
