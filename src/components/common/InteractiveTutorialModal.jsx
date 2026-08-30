import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Clock,
  Wine,
  Cpu,
  BarChart3,
  CreditCard,
  CheckCircle2,
  Lock,
  Zap,
  ArrowRight,
  Play,
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export const InteractiveTutorialModal = ({ isOpen, onClose }) => {
  const { setActiveTab } = useHotel();
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const tutorialSteps = [
    {
      title: 'Bienvenido a Grow Motel PMS',
      subtitle: 'Sistema integral para hoteles por hora, alojamiento temporal y automatización IoT',
      icon: Sparkles,
      iconBg: 'var(--brand-yellow)',
      iconColor: 'var(--brand-dark)',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.86rem', color: 'var(--brand-dark)' }}>
          <p>
            Este sistema fue diseñado específicamente para la operativa dinámica de hoteles de alojamiento temporal y por hora (turnos de <strong>1.5h, 2h, 3h o pernoctes</strong>).
          </p>
          <div
            style={{
              background: 'var(--brand-cream)',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--brand-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
            }}
          >
            <strong>En este tour interactivo aprenderás a:</strong>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li>Iniciar turnos con tarifas dinámicas y control de tiempo.</li>
              <li>Cargar consumos de frigobar y room service directamente a la habitación.</li>
              <li>Controlar cerraduras de puertas y energía eléctrica por IoT.</li>
              <li>Analizar cuánto dinero genera cada habitación en total (Turnos vs Frigobar).</li>
              <li>Gestionar el pase a limpieza de mucamas y el arqueo de caja.</li>
            </ul>
          </div>
        </div>
      ),
      targetTab: 'dashboard',
    },
    {
      title: '1. Tablero en Vivo & Cronómetros de Turnos',
      subtitle: 'Monitoreo segundo a segundo del estado de cada habitación',
      icon: Clock,
      iconBg: '#E0E7FF',
      iconColor: '#1E3A8A',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.86rem', color: 'var(--brand-dark)' }}>
          <p>
            El <strong>Tablero en Vivo</strong> te muestra cada habitación clasificada por color según su estado:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.78rem' }}>
            <div style={{ background: 'var(--brand-yellow)', padding: '0.5rem', borderRadius: 'var(--radius-md)', fontWeight: 700 }}>
              🟢 Disponible: Lista para nuevo ingreso.
            </div>
            <div style={{ background: '#E0E7FF', color: '#1E3A8A', padding: '0.5rem', borderRadius: 'var(--radius-md)', fontWeight: 700 }}>
              🔵 Ocupada: Con cronómetro en progreso.
            </div>
            <div style={{ background: '#FEF3C7', color: '#92400E', padding: '0.5rem', borderRadius: 'var(--radius-md)', fontWeight: 700 }}>
              🟡 Por Vencer: Alerta cuando faltan menos de 15 min.
            </div>
            <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '0.5rem', borderRadius: 'var(--radius-md)', fontWeight: 700 }}>
              🔴 Vencida: Sobretiempo con conteo de excedente (+).
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--brand-brown)' }}>
            💡 <em>Podés extender el turno en cualquier momento con el botón <strong>"+ Tiempo"</strong> (+30m, +1h) o agregar notas operativas.</em>
          </p>
        </div>
      ),
      targetTab: 'dashboard',
    },
    {
      title: '2. Check-In Express & Discreción',
      subtitle: 'Ingreso rápido con selección de duración y vehículo',
      icon: CheckCircle2,
      iconBg: 'var(--brand-yellow)',
      iconColor: 'var(--brand-dark)',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.86rem', color: 'var(--brand-dark)' }}>
          <p>
            Al hacer click en <strong>"Ingreso / Iniciar Turno"</strong> sobre una habitación libre:
          </p>
          <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <li><strong>Seleccionás la tarifa:</strong> 1.5h, 2h, 3h o Pernocte (con cálculo de precio automático según la categoría).</li>
            <li><strong>Registrás la patente</strong> del vehículo (opcional para cochera privada o identificación discreta).</li>
            <li><strong>Automatización IoT:</strong> Al confirmar, la cerradura de la puerta se destraba automáticamente y el relé activa la energía eléctrica de la habitación.</li>
          </ol>
        </div>
      ),
      targetTab: 'dashboard',
    },
    {
      title: '3. Control de Frigobar & Consumos en Vivo',
      subtitle: 'Registro de bebidas, snacks y amenities con impacto en la cuenta',
      icon: Wine,
      iconBg: '#F3E8FF',
      iconColor: '#6B21A8',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.86rem', color: 'var(--brand-dark)' }}>
          <p>
            Cada habitación cuenta con frigobar propio. Podés cargar productos de 2 formas:
          </p>
          <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <li>Desde el botón <strong>"+ Frigobar"</strong> de la tarjeta de la habitación: sumás cervezas, champagne, gaseosas o snacks al turno en curso.</li>
            <li>Desde la pestaña <strong>"Control Frigobar"</strong>: supervisás el stock general, valorización del inventario y alertas de productos que necesitan reposición en almacén.</li>
          </ul>
          <p style={{ fontSize: '0.8rem', color: 'var(--brand-brown)' }}>
            💰 <em>El total acumulado en la tarjeta de la habitación se actualiza en tiempo real sumando Turno + Frigobar.</em>
          </p>
        </div>
      ),
      targetTab: 'frigobar',
    },
    {
      title: '4. Check-Out, Cobro y Ticket Detallado',
      subtitle: 'Cierre de cuenta transparente con múltiples medios de pago',
      icon: CreditCard,
      iconBg: 'var(--brand-cream)',
      iconColor: 'var(--brand-dark)',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.86rem', color: 'var(--brand-dark)' }}>
          <p>
            Al pulsar <strong>"Cobrar"</strong> en una habitación que finaliza su estadía:
          </p>
          <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <li>Se genera el <strong>desglose ítem por ítem</strong> (Costo de turno + lista de consumos de frigobar con cantidades y precios unitarios).</li>
            <li>Permite aplicar <strong>descuentos o cortesías</strong> si corresponde.</li>
            <li>Selección de medio de pago: <strong>Efectivo, Tarjeta POS, Mercado Pago QR o Transferencia</strong>.</li>
            <li>Opción de <strong>imprimir el ticket</strong> para el cliente.</li>
            <li>Envío automático de la habitación al módulo de <strong>Limpieza</strong>.</li>
          </ul>
        </div>
      ),
      targetTab: 'dashboard',
    },
    {
      title: '5. Acceso IoT & Automatización de Puertas',
      subtitle: 'Control remoto de hardware, relé de energía y protocolo MQTT',
      icon: Cpu,
      iconBg: '#E0E7FF',
      iconColor: '#1E3A8A',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.86rem', color: 'var(--brand-dark)' }}>
          <p>
            El módulo <strong>"Acceso IoT & Puertas"</strong> centraliza la telemetría de los controladores ESP32:
          </p>
          <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <li><strong>Destrabar / Trabar cerradura</strong> a distancia desde recepción.</li>
            <li><strong>Sensor magnético:</strong> detecta si la puerta física quedó abierta.</li>
            <li><strong>Modo Eco:</strong> apaga la energía eléctrica de todas las habitaciones libres para ahorro de costos.</li>
            <li><strong>Apertura General de Emergencia:</strong> destraba todas las puertas del hotel simultáneamente en caso de siniestro.</li>
            <li><strong>Banco de Simulación:</strong> permite simular aperturas y observar la consola MQTT en tiempo real.</li>
          </ul>
        </div>
      ),
      targetTab: 'iot',
    },
    {
      title: '6. Métricas: Cuánto Genera Cada Habitación',
      subtitle: 'Auditoría financiera por habitación, rotación y exportación CSV',
      icon: BarChart3,
      iconBg: 'var(--brand-yellow)',
      iconColor: 'var(--brand-dark)',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.86rem', color: 'var(--brand-dark)' }}>
          <p>
            En la sección <strong>"Métricas de Ingresos"</strong> respondemos a la necesidad clave del negocio:
          </p>
          <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <li><strong>Facturación Total por Habitación:</strong> desglose exacto de cuánto dinero produjo por <em>Turnos</em> y cuánto por <em>Frigobar</em>.</li>
            <li><strong>Porcentaje de Aporte de Frigobar (%):</strong> qué habitaciones consumen más bebidas y extras.</li>
            <li><strong>Ranking de Rendimiento:</strong> gráfico de barras comparativo de las suites más rentables.</li>
            <li><strong>Exportación a CSV:</strong> descarga inmediata en planilla de cálculo para auditoría y contabilidad.</li>
          </ul>
        </div>
      ),
      targetTab: 'metrics',
    },
  ];

  const current = tutorialSteps[currentStep];
  const StepIcon = current.icon;

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (tutorialSteps[nextStep].targetTab) {
        setActiveTab(tutorialSteps[nextStep].targetTab);
      }
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      if (tutorialSteps[prevStep].targetTab) {
        setActiveTab(tutorialSteps[prevStep].targetTab);
      }
    }
  };

  const handleGoToSection = (tab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                background: current.iconBg,
                color: current.iconColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <StepIcon size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{current.title}</h3>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '0.15rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--brand-yellow)',
                    color: 'var(--brand-dark)',
                    border: '1px solid var(--brand-secondary)',
                  }}
                >
                  Paso {currentStep + 1} de {tutorialSteps.length}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--brand-brown)', marginTop: '1px' }}>
                {current.subtitle}
              </p>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {current.content}

          {/* Quick Action Button to target section */}
          {current.targetTab && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', paddingTop: '0.25rem' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleGoToSection(current.targetTab)}
                style={{ fontSize: '0.76rem', gap: '0.35rem' }}
              >
                <span>Ir directamente a esta sección</span>
                <ArrowRight size={13} />
              </button>
            </div>
          )}

          {/* Stepper Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
            {tutorialSteps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentStep(idx);
                  if (tutorialSteps[idx].targetTab) {
                    setActiveTab(tutorialSteps[idx].targetTab);
                  }
                }}
                style={{
                  width: idx === currentStep ? '24px' : '8px',
                  height: '8px',
                  borderRadius: 'var(--radius-full)',
                  background: idx === currentStep ? 'var(--brand-brown)' : 'var(--brand-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                title={`Paso ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onClose}
          >
            Saltar Tour
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              <ChevronLeft size={14} />
              <span>Anterior</span>
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleNext}
            >
              <span>{currentStep === tutorialSteps.length - 1 ? '¡Comenzar a Usar!' : 'Siguiente'}</span>
              {currentStep < tutorialSteps.length - 1 && <ChevronRight size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
