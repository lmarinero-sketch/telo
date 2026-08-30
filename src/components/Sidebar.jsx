import React from 'react';
import {
  LayoutDashboard,
  Wine,
  Cpu,
  BarChart3,
  Sparkles,
  Wallet,
  Volume2,
  VolumeX,
  BedDouble,
  BookOpen,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    totalOccupied,
    totalCleaning,
    soundEnabled,
    toggleSound,
    resetDemoData,
    isSidebarCollapsed,
    toggleSidebar,
  } = useHotel();

  const navSections = [
    {
      title: 'Habitaciones',
      items: [
        {
          id: 'dashboard',
          label: 'Tablero en Vivo',
          icon: <LayoutDashboard size={18} />,
          badge: totalOccupied > 0 ? `${totalOccupied}` : null,
        },
        {
          id: 'cleaning',
          label: 'Mucamas & Limpieza',
          icon: <Sparkles size={18} />,
          badge: totalCleaning > 0 ? `${totalCleaning}` : null,
        },
      ],
    },
    {
      title: 'Consumos',
      items: [
        {
          id: 'frigobar',
          label: 'Control Frigobar',
          icon: <Wine size={18} />,
          badge: null,
        },
      ],
    },
    {
      title: 'Hardware',
      items: [
        {
          id: 'iot',
          label: 'Acceso IoT & Puertas',
          icon: <Cpu size={18} />,
          badge: 'IoT',
        },
      ],
    },
    {
      title: 'Finanzas',
      items: [
        {
          id: 'metrics',
          label: 'Métricas por Habitación',
          icon: <BarChart3 size={18} />,
          badge: null,
        },
        {
          id: 'cash',
          label: 'Caja y Arqueo Turno',
          icon: <Wallet size={18} />,
          badge: null,
        },
      ],
    },
    {
      title: 'Demo & Guías',
      items: [
        {
          id: 'manuales',
          label: 'Manuales & Tutoriales',
          icon: <BookOpen size={18} />,
          badge: 'Guía',
        },
      ],
    },
  ];

  return (
    <aside
      className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}
      style={{
        width: isSidebarCollapsed ? '72px' : '260px',
        transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Brand Header */}
      <div
        className="sidebar-header"
        style={{
          justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
          padding: isSidebarCollapsed ? '1rem 0.5rem' : '1.15rem 1rem 1.15rem 1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div className="brand-logo-img" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')} title="Grow Motel">
            <BedDouble size={19} />
          </div>
          {!isSidebarCollapsed && (
            <div className="brand-info">
              <h1>Grow Motel</h1>
              <span className="brand-tag">Gestión & IoT</span>
            </div>
          )}
        </div>

        {/* Toggle Collapse Button */}
        <button
          className="icon-btn"
          style={{ width: '28px', height: '28px', border: 'none', background: 'transparent' }}
          onClick={toggleSidebar}
          title={isSidebarCollapsed ? 'Expandir menú lateral' : 'Colapsar menú lateral'}
        >
          {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation Sections */}
      <div
        className="sidebar-nav"
        style={{
          padding: isSidebarCollapsed ? '0.75rem 0.4rem' : '0.85rem',
          alignItems: isSidebarCollapsed ? 'center' : 'stretch',
        }}
      >
        {navSections.map((sec, idx) => (
          <div key={idx} style={{ marginBottom: '0.5rem', width: '100%' }}>
            {!isSidebarCollapsed && <span className="nav-section-title">{sec.title}</span>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.15rem' }}>
              {sec.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    style={{
                      justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                      padding: isSidebarCollapsed ? '0.65rem 0' : '0.6rem 0.85rem',
                      width: '100%',
                    }}
                    onClick={() => setActiveTab(item.id)}
                    title={item.label}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px' }}>
                      {item.icon}
                    </div>
                    {!isSidebarCollapsed && <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>}
                    {!isSidebarCollapsed && item.badge && (
                      <span className="nav-item-badge">{item.badge}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div
        className="sidebar-footer"
        style={{
          padding: isSidebarCollapsed ? '0.75rem 0.35rem' : '0.85rem 1rem',
          alignItems: isSidebarCollapsed ? 'center' : 'stretch',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
            flexDirection: isSidebarCollapsed ? 'column' : 'row',
            gap: '0.4rem',
          }}
        >
          {!isSidebarCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--brand-brown)', fontWeight: 600 }}>
              <span style={{ width: '7px', height: '7px', background: 'var(--brand-emerald-primary)', borderRadius: '50%' }}></span>
              <span>ESP32 IoT: ON</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.3rem', flexDirection: isSidebarCollapsed ? 'column' : 'row' }}>
            <button
              className="icon-btn"
              style={{ width: '28px', height: '28px' }}
              onClick={() => {
                if (window.confirm('¿Restablecer datos demo del hotel?')) {
                  resetDemoData();
                }
              }}
              title="Reiniciar datos de prueba de la demo"
            >
              <RotateCcw size={13} />
            </button>

            <button
              className="icon-btn"
              style={{ width: '28px', height: '28px' }}
              onClick={toggleSound}
              title={soundEnabled ? 'Silenciar alertas' : 'Activar alertas'}
            >
              {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>
          </div>
        </div>

        {!isSidebarCollapsed && (
          <div style={{ paddingTop: '0.45rem', borderTop: '1px solid var(--border-subtle)' }}>
            <a
              href="https://www.growlabs.lat"
              target="_blank"
              rel="noopener noreferrer"
              className="grow-signature"
            >
              <span>Diseñado por <strong>Grow Labs</strong> 🚀</span>
            </a>
          </div>
        )}
      </div>
    </aside>
  );
};
