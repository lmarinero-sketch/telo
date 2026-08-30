import React, { useState, useEffect } from 'react';
import {
  Clock,
  ShieldAlert,
  CheckCircle2,
  DollarSign,
  UserCheck,
  Zap,
  Sparkles,
  BookOpen,
  Menu,
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { formatCurrency } from '../utils/formatters';

export const Navbar = () => {
  const {
    activeTab,
    cashRegister,
    totalOccupied,
    totalAvailable,
    totalCleaning,
    triggerEmergencyUnlockAll,
    openTutorialModal,
    isSidebarCollapsed,
    toggleSidebar,
  } = useHotel();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const totalCashCollected = cashRegister.movements
    .filter((m) => m.type === 'in')
    .reduce((acc, m) => acc + m.amount, 0);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Panel Operativo en Vivo';
      case 'frigobar':
        return 'Control de Frigobar & Stock';
      case 'iot':
        return 'Control de Acceso IoT & Puertas';
      case 'metrics':
        return 'Métricas Financieras por Habitación';
      case 'cleaning':
        return 'Control de Mucamas & Limpieza';
      case 'cash':
        return 'Arqueo de Caja & Turnos';
      case 'manuales':
        return 'Manuales Operativos & Guías';
      default:
        return 'Grow Motel PMS';
    }
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <button
          className="icon-btn"
          onClick={toggleSidebar}
          title={isSidebarCollapsed ? 'Expandir menú lateral' : 'Colapsar menú lateral'}
          style={{ marginRight: '0.25rem' }}
        >
          <Menu size={18} />
        </button>

        <h2 className="nav-page-title">{getPageTitle()}</h2>

        <div className="nav-stats-pills">
          <span className="stat-pill occupied">
            <UserCheck size={13} />
            <span>{totalOccupied} Ocupadas</span>
          </span>
          <span className="stat-pill available">
            <CheckCircle2 size={13} />
            <span>{totalAvailable} Libres</span>
          </span>
          {totalCleaning > 0 && (
            <span className="stat-pill cleaning">
              <Zap size={13} />
              <span>{totalCleaning} Limpieza</span>
            </span>
          )}
        </div>
      </div>

      <div className="nav-right">
        {/* Tutorial Interactivo Button */}
        <button
          className="btn btn-accent-yellow btn-sm"
          onClick={openTutorialModal}
          style={{ fontWeight: 800 }}
          title="Abrir guía interactiva paso a paso"
        >
          <Sparkles size={14} />
          <span>Tutorial Interactivo</span>
        </button>

        {/* Cash in shift */}
        <div className="stat-pill" title="Recaudación total del turno actual">
          <DollarSign size={14} color="var(--brand-emerald-primary)" />
          <span style={{ fontWeight: 800 }}>Caja: {formatCurrency(totalCashCollected)}</span>
        </div>

        {/* Real-time Clock */}
        <div className="clock-display">
          <Clock size={14} color="var(--brand-brown)" />
          <span>
            {currentTime.toLocaleTimeString('es-AR', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </span>
        </div>

        {/* Emergency Unlock */}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            if (window.confirm('¿Confirmar apertura de emergencia de TODAS las cerraduras del hotel?')) {
              triggerEmergencyUnlockAll();
            }
          }}
          title="Abrir todas las puertas en caso de evacuación"
        >
          <ShieldAlert size={14} />
          <span>Emergencia IoT</span>
        </button>
      </div>
    </header>
  );
};
