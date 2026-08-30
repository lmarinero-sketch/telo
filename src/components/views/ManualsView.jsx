import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Clock,
  Wine,
  Cpu,
  BarChart3,
  Wallet,
  Printer,
  Search,
  CheckCircle2,
  AlertTriangle,
  Key,
  ShieldCheck,
  Zap,
  DollarSign,
  Layers,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { ModuleOnboardingBanner } from '../common/ModuleOnboardingBanner';

export const ManualsView = () => {
  const { openTutorialModal } = useHotel();
  const [activeManualTab, setActiveManualTab] = useState('reception');
  const [searchQuery, setSearchQuery] = useState('');

  const manualSections = [
    { id: 'reception', label: '1. Recepción & Turnos', icon: Clock },
    { id: 'frigobar', label: '2. Frigobar & Stock', icon: Wine },
    { id: 'iot', label: '3. Dispositivos IoT', icon: Cpu },
    { id: 'metrics', label: '4. Métricas de Ingresos', icon: BarChart3 },
    { id: 'cleaning', label: '5. Mucamas & Limpieza', icon: Sparkles },
    { id: 'cash', label: '6. Caja & Arqueo', icon: Wallet },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Onboarding Banner */}
      <ModuleOnboardingBanner
        title="Manuales de Operación, Tutoriales & Guías del Sistema"
        subtitle="Documentación técnica y operativa completa para la administración de habitaciones, frigobar, hardware IoT y finanzas"
        steps={[
          'Revisá los procedimientos estandarizados para cada área del hotel.',
          'Iniciá el "Tutorial Interactivo" para una demostración guiada paso a paso.',
          'Podés imprimir o exportar este manual para capacitación de recepcionistas y personal.',
        ]}
      />

      {/* Top Banner with Quick Actions */}
      <div
        style={{
          background: 'var(--brand-card)',
          border: '1px solid var(--brand-secondary)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--brand-yellow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-dark)',
            }}
          >
            <BookOpen size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Manual Operativo Grow Motel PMS</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--brand-brown)' }}>
              Versión Demo 1.0 — Diseñado por Grow Labs
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <button
            className="btn btn-accent-yellow btn-sm"
            onClick={openTutorialModal}
            style={{ fontWeight: 800 }}
          >
            <Sparkles size={14} />
            <span>Iniciar Tour Interactivo</span>
          </button>

          <button className="btn btn-secondary btn-sm" onClick={handlePrint}>
            <Printer size={14} />
            <span>Imprimir Manual</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs for Manuals */}
      <div className="dashboard-header-bar">
        <div className="filter-tabs-group" style={{ flexWrap: 'wrap' }}>
          {manualSections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeManualTab === sec.id;
            return (
              <button
                key={sec.id}
                className={`filter-tab ${isActive ? 'active' : ''}`}
                onClick={() => setActiveManualTab(sec.id)}
              >
                <Icon size={14} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Manual Content Body */}
      <div
        style={{
          background: 'var(--brand-card)',
          border: '1px solid var(--brand-secondary)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          boxShadow: 'var(--shadow-soft)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          fontSize: '0.88rem',
          color: 'var(--brand-dark)',
          lineHeight: 1.6,
        }}
      >
        {/* SECTION 1: RECEPCION & TURNOS */}
        {activeManualTab === 'reception' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ borderBottom: '1px solid var(--brand-secondary)', paddingBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-brown)' }}>
                Capítulo 1
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Guía de Recepción: Gestión de Turnos y Estadías</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--brand-emerald-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} /> 1.1 Proceso de Check-In e Ingreso de Huéspedes
              </h4>
              <p>
                Al arribar un vehículo o huésped a una cochera/habitación libre, el recepcionista debe presionar el botón <strong>"Ingreso / Iniciar Turno"</strong> en la tarjeta de la habitación correspondiente.
              </p>
              <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li><strong>Duración del Turno:</strong> Seleccionar entre <em>1.5 Horas (90 min)</em>, <em>2 Horas (120 min)</em>, <em>3 Horas (180 min)</em> o <em>Pernocte (Noche entera hasta 12 horas)</em>. El sistema auto-asigna la tarifa según la categoría (Estándar, Suite Hidromasaje, VIP Loft o Temática).</li>
                <li><strong>Patente del Vehículo (Opcional):</strong> Se recomienda ingresar la patente para control de cochera y discreción operativa.</li>
                <li><strong>Apertura de Puerta IoT:</strong> Al confirmar el check-in, la cerradura inteligente se destraba automáticamente y el relé activa la energía y luces de la habitación.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--brand-cream)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--brand-secondary)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--brand-dark)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertTriangle size={16} color="#D97706" /> 1.2 Estados del Cronómetro y Alertas de Vencimiento
              </h4>
              <p>
                El cronómetro calcula segundo a segundo el tiempo restante y cambia de color según el estado:
              </p>
              <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.82rem' }}>
                <li><strong>Verde/Azul (En Tiempo):</strong> Más de 15 minutos restantes. El huésped disfruta su turno normalmente.</li>
                <li><strong>Amarillo (Por Vencer &lt; 15 min):</strong> Faltan menos de 15 minutos. Suena un chime suave para que el recepcionista consulte si desean extender o preparan su salida.</li>
                <li><strong>Rojo (Vencida / Sobretiempo):</strong> El turno expiró. El cronómetro muestra el tiempo excedido con un signo <code>+</code> (ej. <code>+00:08:24</code>) para calcular recargos.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--brand-emerald-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={16} /> 1.3 Extensión de Turnos (+Tiempo)
              </h4>
              <p>
                Si el huésped solicita más tiempo, hacer click en <strong>"+ Tiempo"</strong>. Podés seleccionar +30 minutos, +1 hora o +2 horas. El sistema sumará el recargo tarifario automáticamente y extenderá la cuenta regresiva.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--brand-emerald-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <DollarSign size={16} /> 1.4 Check-Out y Facturación Final
              </h4>
              <p>
                Al retirarse el huésped, presionar <strong>"Cobrar"</strong>. El sistema abrirá la ventana de liquidación mostrando:
              </p>
              <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <li>Costo del turno de habitación.</li>
                <li>Lista detallada de productos consumidos del frigobar con cantidades y precios.</li>
                <li>Campo de descuento o cortesía.</li>
                <li>Selección de medio de cobro: <em>Efectivo, Tarjeta, Mercado Pago QR o Transferencia</em>.</li>
                <li>Opción de emitir / imprimir el ticket para el huésped.</li>
                <li>Pase automático de la habitación al módulo de <strong>Limpieza</strong>.</li>
              </ul>
            </div>
          </div>
        )}

        {/* SECTION 2: FRIGOBAR & STOCK */}
        {activeManualTab === 'frigobar' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ borderBottom: '1px solid var(--brand-secondary)', paddingBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-brown)' }}>
                Capítulo 2
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Protocolo de Frigobar, Room Service & Inventario</h2>
            </div>

            <p>
              El frigobar es una de las fuentes de mayor rentabilidad en el alojamiento temporal. Este módulo permite mantener la trazabilidad completa entre compras, stock en almacén y ventas a huéspedes.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'var(--brand-cream)', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--brand-secondary)' }}>
                <h4 style={{ fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.4rem', color: 'var(--brand-dark)' }}>
                  📦 Carga Rápida de Consumos
                </h4>
                <p style={{ fontSize: '0.82rem' }}>
                  Durante la estadía, el recepcionista puede hacer click en <strong>"+ Frigobar"</strong> en la tarjeta de la habitación para añadir cervezas, champagnes, gaseosas, chocolates o preservativos solicitados por intercomunicador.
                </p>
              </div>

              <div style={{ background: 'var(--brand-cream)', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--brand-secondary)' }}>
                <h4 style={{ fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.4rem', color: 'var(--brand-dark)' }}>
                  ⚠️ Control de Stock Mínimo
                </h4>
                <p style={{ fontSize: '0.82rem' }}>
                  El sistema emite una alerta automática cuando cualquier producto cuenta con 10 o menos unidades en inventario para coordinar la compra a distribuidores antes de que se agote.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 800 }}>Alta de Nuevos Productos y Ajustes</h4>
              <p>
                Desde la pestaña <strong>"Control de Frigobar"</strong> podés registrar nuevos artículos con su categoría, precio sugerido y stock inicial, o sumar packs de 12 unidades con un solo click.
              </p>
            </div>
          </div>
        )}

        {/* SECTION 3: IOT & PUERTAS */}
        {activeManualTab === 'iot' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ borderBottom: '1px solid var(--brand-secondary)', paddingBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-brown)' }}>
                Capítulo 3
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Manual de Dispositivos IoT, Cerraduras & MQTT</h2>
            </div>

            <p>
              El hotel cuenta con un ecosistema de hardware conectado por microcontroladores **ESP32-S3 / MQTT Gateway** para automatizar el acceso seguro y el ahorro energético.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ border: '1px solid var(--brand-secondary)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)' }}>
                <h4 style={{ fontWeight: 800, color: 'var(--brand-emerald-primary)', marginBottom: '0.3rem' }}>
                  🔒 Cerradura Electromagnética / Pestillo
                </h4>
                <p style={{ fontSize: '0.84rem' }}>
                  Se activa automáticamente en el check-in (destrabe) y se bloquea tras la finalización de la limpieza. Permite destrabe remoto desde recepción si un huésped necesita asistencia.
                </p>
              </div>

              <div style={{ border: '1px solid var(--brand-secondary)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)' }}>
                <h4 style={{ fontWeight: 800, color: 'var(--brand-emerald-primary)', marginBottom: '0.3rem' }}>
                  🚪 Sensor Magnético de Apertura
                </h4>
                <p style={{ fontSize: '0.84rem' }}>
                  Informa en tiempo real si la puerta física ha quedado entreabierta, disparando un aviso visual en recepción para evitar fugas de climatización o ingresos indebidos.
                </p>
              </div>

              <div style={{ border: '1px solid var(--brand-secondary)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)' }}>
                <h4 style={{ fontWeight: 800, color: 'var(--brand-emerald-primary)', marginBottom: '0.3rem' }}>
                  ⚡ Relé de Energía Inteligente (Modo Eco)
                </h4>
                <p style={{ fontSize: '0.84rem' }}>
                  Corta el suministro eléctrico de iluminación, Smart TV y aire acondicionado en habitaciones libres, reduciendo la factura de energía hasta un 40%.
                </p>
              </div>

              <div style={{ border: '1px solid #FECACA', background: '#FEE2E2', padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)' }}>
                <h4 style={{ fontWeight: 800, color: '#991B1B', marginBottom: '0.3rem' }}>
                  🚨 Protocolo de Emergencia General
                </h4>
                <p style={{ fontSize: '0.84rem', color: '#7F1D1D' }}>
                  En caso de incendio, corte de luz o evacuación, presionar el botón <strong>"Emergencia IoT"</strong> en la barra superior destraba simultáneamente todas las cerraduras del establecimiento.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: METRICAS */}
        {activeManualTab === 'metrics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ borderBottom: '1px solid var(--brand-secondary)', paddingBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-brown)' }}>
                Capítulo 4
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Guía de Métricas: Rentabilidad por Habitación</h2>
            </div>

            <p>
              Este módulo resuelve la necesidad estratégica de conocer <strong>cuánto dinero genera cada habitación en total</strong> y la distribución de los ingresos.
            </p>

            <div style={{ background: 'var(--brand-cream)', padding: '1.25rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--brand-secondary)' }}>
              <h4 style={{ fontWeight: 800, fontSize: '0.98rem', marginBottom: '0.5rem' }}>Indicadores Clave (KPIs):</h4>
              <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.84rem' }}>
                <li><strong>Facturación Total ($):</strong> Monto bruto recaudado por habitación sumando turnos y ventas de frigobar.</li>
                <li><strong>Ingresos por Turnos vs. Frigobar ($):</strong> Muestra qué porcentaje del dinero proviene del alquiler por hora y cuánto de productos.</li>
                <li><strong>Rotación & Estadía Promedio:</strong> Cantidad de turnos completados y duración media en minutos.</li>
                <li><strong>Ranking Comparativo:</strong> Gráfico de barras que permite identificar las suites con mayor retorno sobre la inversión (ROI).</li>
              </ul>
            </div>

            <p>
              Podés utilizar el botón <strong>"Exportar Informe CSV"</strong> para obtener una planilla Excel lista para liquidaciones quincenales y mensuales.
            </p>
          </div>
        )}

        {/* SECTION 5: MUCAMAS & LIMPIEZA */}
        {activeManualTab === 'cleaning' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ borderBottom: '1px solid var(--brand-secondary)', paddingBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-brown)' }}>
                Capítulo 5
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Protocolo de Higiene, Mucamas & Reposición</h2>
            </div>

            <p>
              La velocidad y rigurosidad en la higienización garantizan la máxima rotación y disponibilidad de las habitaciones.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <h4 style={{ fontWeight: 800, fontSize: '0.98rem' }}>Checklist Obligatorio de Habilitación:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', background: 'var(--brand-cream)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--brand-secondary)', fontSize: '0.84rem' }}>
                <div>✓ <strong>Cambio de Sábanas y Toallas:</strong> Reemplazo total con juegos desinfectados.</div>
                <div>✓ <strong>Desinfección de Baño & Jacuzzi:</strong> Limpieza con sanitizante de grado hospitalario y activación del ciclo de desinfección de hidromasaje.</div>
                <div>✓ <strong>Reposición de Frigobar al 100%:</strong> Reponer todas las bebidas y snacks consumidos antes de dar el alta.</div>
                <div>✓ <strong>Amenities & Climatización:</strong> Reposición de kits sensuales, jabones, sales de baño y ajuste de temperatura a 22°C.</div>
              </div>
            </div>

            <p style={{ fontSize: '0.84rem' }}>
              Al completar las tareas, la mucama o recepcionista presiona <strong>"Finalizar & Habilitar"</strong> para que la habitación vuelva a figurar como <em>Disponible</em> en el tablero.
            </p>
          </div>
        )}

        {/* SECTION 6: CAJA */}
        {activeManualTab === 'cash' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ borderBottom: '1px solid var(--brand-secondary)', paddingBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-brown)' }}>
                Capítulo 6
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Manual de Caja, Tesorería & Arqueo de Turno</h2>
            </div>

            <p>
              Permite auditar el flujo de fondos en cada cambio de guardia de recepcionista.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'var(--brand-cream)', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--brand-secondary)' }}>
                <h4 style={{ fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.3rem' }}>💵 Arqueo de Efectivo Físico</h4>
                <p style={{ fontSize: '0.82rem' }}>
                  Calcula el dinero real que debe haber en la gaveta: <code>Fondo Inicial + Cobros Efectivo - Retiros de Caja Chica</code>.
                </p>
              </div>

              <div style={{ background: 'var(--brand-cream)', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--brand-secondary)' }}>
                <h4 style={{ fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.3rem' }}>💳 Cobros Digitales (POS & QR)</h4>
                <p style={{ fontSize: '0.82rem' }}>
                  Discrimina los montos cobrados con tarjeta de débito/crédito y transferencias inmediatas por Mercado Pago QR.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h4 style={{ fontWeight: 800, fontSize: '0.95rem' }}>Registro de Egresos de Caja Chica</h4>
              <p style={{ fontSize: '0.84rem' }}>
                Podés asentar salidas de efectivo (ej. compra urgente de lavandina o hielo) con el botón <strong>"Registrar Movimiento Manual"</strong> para que no descuadre el balance final del turno.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
