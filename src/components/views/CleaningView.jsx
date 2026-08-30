import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  User,
  ShieldCheck,
  Plus,
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { ModuleOnboardingBanner } from '../common/ModuleOnboardingBanner';
import { formatDurationMs } from '../../utils/formatters';

export const CleaningView = () => {
  const { rooms, startCleaning, finishCleaning, nowTick } = useHotel();

  const [selectedStaff, setSelectedStaff] = useState('Claudia R.');
  const [manualRoomSelect, setManualRoomSelect] = useState('');

  const cleaningRooms = rooms.filter((r) => r.status === 'cleaning');
  const otherRooms = rooms.filter((r) => r.status !== 'cleaning');

  const staffList = ['Claudia R.', 'Marta G.', 'Lorena V.', 'Rosa P.'];

  const handleStartManualCleaning = () => {
    if (!manualRoomSelect) return;
    startCleaning(Number(manualRoomSelect), selectedStaff);
    setManualRoomSelect('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Onboarding Banner */}
      <ModuleOnboardingBanner
        title="Gestión de Mucamas, Higiene & Reposición"
        subtitle="Flujo post check-out: desinfección, control de sábanas/jacuzzi y reposición de frigobar"
        steps={[
          'Las habitaciones pasan automáticamente a limpieza al cobrar el check-out en recepción.',
          'El personal verifica la reposición de bebidas y snacks antes de habilitar.',
          'Al finalizar, hacé click en "Finalizar & Habilitar" para que vuelva a estar Disponible.',
        ]}
      />

      {/* Top Banner */}
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
              background: '#F3E8FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6B21A8',
            }}
          >
            <Sparkles size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Módulo de Higienización & Mucamas</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--brand-brown)' }}>
              {cleaningRooms.length} habitaciones en desinfección en este momento
            </span>
          </div>
        </div>

        {/* Manual assignment form */}
        <div style={{ display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
          <select
            className="form-select"
            style={{ width: '140px', fontSize: '0.82rem' }}
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
          >
            {staffList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            className="form-select"
            style={{ width: '160px', fontSize: '0.82rem' }}
            value={manualRoomSelect}
            onChange={(e) => setManualRoomSelect(e.target.value)}
          >
            <option value="">Enviar habitación...</option>
            {otherRooms.map((r) => (
              <option key={r.id} value={r.id}>
                Hab {r.number} ({r.status === 'available' ? 'Libre' : 'Ocupada'})
              </option>
            ))}
          </select>

          <button
            className="btn btn-secondary btn-sm"
            onClick={handleStartManualCleaning}
            disabled={!manualRoomSelect}
          >
            <Plus size={14} />
            <span>Iniciar</span>
          </button>
        </div>
      </div>

      {/* Grid of rooms in cleaning */}
      <div className="room-grid">
        {cleaningRooms.map((room) => {
          const startedMs = room.cleaning?.startedAt
            ? Date.now() - new Date(room.cleaning.startedAt).getTime()
            : 0;

          return (
            <div
              key={room.id}
              className="room-card"
              style={{ borderLeft: '5px solid #7C3AED' }}
            >
              <div className="room-card-header">
                <div className="room-identity">
                  <div className="room-number-badge">{room.number}</div>
                  <div className="room-meta-group">
                    <span className="room-category-name" style={{ color: '#6B21A8' }}>
                      En Limpieza
                    </span>
                    <span className="room-floor-tag">Piso {room.floor}</span>
                  </div>
                </div>

                <span className="status-badge cleaning">Limpieza</span>
              </div>

              {/* Stopwatch & Staff */}
              <div
                style={{
                  background: 'var(--brand-cream)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--brand-brown)', fontWeight: 600 }}>Responsable:</span>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--brand-dark)' }}>
                    {room.cleaning?.staff || 'Mucama'}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--brand-brown)', fontWeight: 600 }}>Tiempo Transcurrido:</span>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1rem', color: '#6B21A8' }}>
                    {formatDurationMs(startedMs)}
                  </div>
                </div>
              </div>

              {/* Quality Checklist */}
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--brand-secondary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.65rem 0.75rem',
                  fontSize: '0.76rem',
                  color: 'var(--brand-dark)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                }}
              >
                <span style={{ fontWeight: 800, color: 'var(--brand-dark)', marginBottom: '0.1rem' }}>
                  Lista de Control:
                </span>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--brand-brown)' }} />
                  <span>Sábanas cambiadas y toallas limpias</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--brand-brown)' }} />
                  <span>Frigobar revisado y repuesto al 100%</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--brand-brown)' }} />
                  <span>Baño / Jacuzzi sanitizado & amenities</span>
                </label>
              </div>

              {/* Complete button */}
              <button
                className="btn btn-success"
                style={{ marginTop: 'auto' }}
                onClick={() => finishCleaning(room.id)}
              >
                <CheckCircle2 size={15} />
                <span>Finalizar & Habilitar para Huésped</span>
              </button>
            </div>
          );
        })}

        {cleaningRooms.length === 0 && (
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
            <CheckCircle2 size={32} color="var(--brand-emerald-primary)" style={{ margin: '0 auto 0.5rem' }} />
            <p style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--brand-dark)' }}>
              No hay habitaciones en limpieza pendientes
            </p>
            <span style={{ fontSize: '0.82rem' }}>
              Todas las habitaciones están listas para nuevos ingresos o se encuentran ocupadas.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
