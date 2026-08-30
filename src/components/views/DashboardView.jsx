import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  UserCheck,
  AlertTriangle,
  Clock,
  Sparkles,
  DollarSign,
  TrendingUp,
  Key,
  Wine,
  BookOpen,
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { RoomCard } from '../RoomCard';
import { ModuleOnboardingBanner } from '../common/ModuleOnboardingBanner';
import { CheckInModal } from '../modals/CheckInModal';
import { CheckOutModal } from '../modals/CheckOutModal';
import { FrigobarModal } from '../modals/FrigobarModal';
import { ExtendShiftModal } from '../modals/ExtendShiftModal';
import { RoomDetailModal } from '../modals/RoomDetailModal';
import { formatCurrency } from '../../utils/formatters';

export const DashboardView = () => {
  const {
    rooms,
    categories,
    cashRegister,
    totalOccupied,
    totalAvailable,
    totalCleaning,
    openTutorialModal,
    setActiveTab,
  } = useHotel();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'available', 'occupied', 'warning', 'cleaning'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [modalState, setModalState] = useState({
    type: null,
    room: null,
  });

  const handleOpenCheckIn = (room) => setModalState({ type: 'checkin', room });
  const handleOpenCheckOut = (room) => setModalState({ type: 'checkout', room });
  const handleOpenFrigobar = (room) => setModalState({ type: 'frigobar', room });
  const handleOpenExtend = (room) => setModalState({ type: 'extend', room });
  const handleOpenDetail = (room) => setModalState({ type: 'detail', room });
  const handleCloseModal = () => setModalState({ type: null, room: null });

  // Shift cash collected today
  const totalSalesToday = cashRegister.movements
    .filter((m) => m.type === 'in')
    .reduce((sum, o) => sum + o.amount, 0);

  // Filter rooms
  const filteredRooms = rooms.filter((room) => {
    if (selectedCategory !== 'all' && room.category !== selectedCategory) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNumber = room.number.toLowerCase().includes(q);
      const matchPlate = room.currentShift?.vehiclePlate?.toLowerCase().includes(q);
      if (!matchNumber && !matchPlate) return false;
    }

    if (activeFilter === 'all') return true;
    if (activeFilter === 'available') return room.status === 'available';
    if (activeFilter === 'cleaning') return room.status === 'cleaning';
    if (activeFilter === 'occupied') return room.status === 'occupied';
    if (activeFilter === 'warning') {
      if (room.status !== 'occupied' || !room.currentShift) return false;
      const remainingMs = new Date(room.currentShift.endTime).getTime() - Date.now();
      return remainingMs <= 15 * 60 * 1000;
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Module Onboarding Banner */}
      <ModuleOnboardingBanner
        title="Tablero Operativo de Habitaciones & Turnos"
        subtitle="Control en tiempo real de estadías por hora (1.5h - 3h), consumos de frigobar y cerraduras IoT"
        steps={[
          'Iniciá un turno en cualquier habitación libre seleccionando la duración (1.5h, 2h, 3h o pernocte).',
          'Cargá bebidas, snacks o amenities desde "+ Frigobar" y controlá el tiempo restante en vivo.',
          'Al finalizar, hacé click en "Cobrar" para emitir el ticket final y enviar la habitación a limpieza.',
        ]}
      />

      {/* Top Banner & Greeting (with Demo / Tutorial triggers) */}
      <div
        style={{
          background: 'var(--brand-card)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--brand-secondary)',
          padding: '1.25rem 1.5rem',
          boxShadow: 'var(--shadow-soft)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-brown)' }}>
              Recepción Central
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '0.15rem 0.55rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--brand-yellow)',
                color: 'var(--brand-dark)',
                border: '1px solid var(--brand-secondary)',
              }}
            >
              Turno Activo
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--brand-dark)' }}>
            ¡Buenas tardes, Equipo Grow Telo! 🏨✨
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--brand-brown)', marginTop: '0.15rem' }}>
            Monitoreo en vivo de ocupación, cronómetros de turnos y telemetría de puertas.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button
            className="btn btn-accent-yellow btn-sm"
            onClick={openTutorialModal}
            style={{ fontWeight: 800 }}
          >
            <Sparkles size={14} />
            <span>Tutorial Interactivo</span>
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveTab('manuales')}
          >
            <BookOpen size={14} />
            <span>Manuales & Guías</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="metrics-summary-grid">
        {/* Card 1: Ventas en Turno */}
        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Facturación en Turno</span>
            <div
              className="stat-icon-wrapper"
              style={{ background: 'var(--brand-yellow)', color: 'var(--brand-dark)' }}
            >
              <DollarSign size={18} />
            </div>
          </div>
          <h3 className="stat-value">{formatCurrency(totalSalesToday)}</h3>
          <p className="stat-subtext">
            <TrendingUp size={13} color="var(--brand-emerald-primary)" />
            <span>Turnos cobrados y frigobar</span>
          </p>
        </div>

        {/* Card 2: Habitaciones Ocupadas */}
        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Habitaciones Ocupadas</span>
            <div
              className="stat-icon-wrapper"
              style={{ background: '#E0E7FF', color: '#1E3A8A' }}
            >
              <UserCheck size={18} />
            </div>
          </div>
          <h3 className="stat-value">
            {totalOccupied}{' '}
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--brand-brown)' }}>
              / {rooms.length}
            </span>
          </h3>
          <p className="stat-subtext">
            <span>{Math.round((totalOccupied / (rooms.length || 1)) * 100)}% de ocupación actual</span>
          </p>
        </div>

        {/* Card 3: Habitaciones Libres */}
        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Habitaciones Libres</span>
            <div
              className="stat-icon-wrapper"
              style={{ background: 'var(--brand-cream)', color: 'var(--brand-dark)' }}
            >
              <CheckCircle2 size={18} />
            </div>
          </div>
          <h3 className="stat-value">{totalAvailable}</h3>
          <p className="stat-subtext">
            <span>Listas para ingreso inmediato</span>
          </p>
        </div>

        {/* Card 4: En Limpieza */}
        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">En Limpieza</span>
            <div
              className="stat-icon-wrapper"
              style={{ background: '#F3E8FF', color: '#6B21A8' }}
            >
              <Sparkles size={18} />
            </div>
          </div>
          <h3 className="stat-value">{totalCleaning}</h3>
          <p className="stat-subtext">
            <span>Desinfección & reposición</span>
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="dashboard-header-bar">
        {/* Status Filters */}
        <div className="filter-tabs-group">
          <button
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            <span>Todas ({rooms.length})</span>
          </button>

          <button
            className={`filter-tab ${activeFilter === 'available' ? 'active' : ''}`}
            onClick={() => setActiveFilter('available')}
          >
            <CheckCircle2 size={13} />
            <span>Libres ({totalAvailable})</span>
          </button>

          <button
            className={`filter-tab ${activeFilter === 'occupied' ? 'active' : ''}`}
            onClick={() => setActiveFilter('occupied')}
          >
            <UserCheck size={13} />
            <span>Ocupadas ({totalOccupied})</span>
          </button>

          <button
            className={`filter-tab ${activeFilter === 'warning' ? 'active' : ''}`}
            onClick={() => setActiveFilter('warning')}
          >
            <AlertTriangle size={13} />
            <span>Por Vencer</span>
          </button>

          <button
            className={`filter-tab ${activeFilter === 'cleaning' ? 'active' : ''}`}
            onClick={() => setActiveFilter('cleaning')}
          >
            <Sparkles size={13} />
            <span>Limpieza ({totalCleaning})</span>
          </button>
        </div>

        {/* Search & Category dropdown */}
        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
          <select
            className="form-select"
            style={{ width: '180px', padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Todas las Categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '11px', color: 'var(--brand-brown)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '30px', padding: '0.45rem 0.75rem 0.45rem 30px', fontSize: '0.82rem' }}
              placeholder="Habitación o patente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="room-grid">
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onOpenCheckIn={handleOpenCheckIn}
            onOpenCheckOut={handleOpenCheckOut}
            onOpenFrigobar={handleOpenFrigobar}
            onOpenExtend={handleOpenExtend}
            onOpenDetail={handleOpenDetail}
          />
        ))}

        {filteredRooms.length === 0 && (
          <div
            style={{
              gridColumn: '1 / -1',
              padding: '3.5rem 2rem',
              textAlign: 'center',
              background: 'var(--brand-card)',
              borderRadius: 'var(--radius-xl)',
              border: '1px dashed var(--brand-secondary)',
              color: 'var(--brand-brown)',
            }}
          >
            <p style={{ fontSize: '1rem', fontWeight: 700 }}>No se encontraron habitaciones con el filtro actual.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {modalState.type === 'checkin' && (
        <CheckInModal room={modalState.room} onClose={handleCloseModal} />
      )}
      {modalState.type === 'checkout' && (
        <CheckOutModal room={modalState.room} onClose={handleCloseModal} />
      )}
      {modalState.type === 'frigobar' && (
        <FrigobarModal room={modalState.room} onClose={handleCloseModal} />
      )}
      {modalState.type === 'extend' && (
        <ExtendShiftModal room={modalState.room} onClose={handleCloseModal} />
      )}
      {modalState.type === 'detail' && (
        <RoomDetailModal room={modalState.room} onClose={handleCloseModal} />
      )}
    </div>
  );
};
