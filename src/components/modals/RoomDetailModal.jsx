import React from 'react';
import {
  X,
  Building2,
  DollarSign,
  Wine,
  Clock,
  BatteryCharging,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { formatCurrency, formatTime, formatDate } from '../../utils/formatters';

export const RoomDetailModal = ({ room, onClose }) => {
  const { categories, historicalTurns } = useHotel();

  if (!room) return null;

  const category = categories.find((c) => c.id === room.category) || {
    name: 'Estándar',
    rates: {},
    description: '',
  };

  const roomHistory = historicalTurns.filter((h) => h.roomNumber === room.number);

  const stats = room.stats || {
    totalTurnsCount: 0,
    totalShiftRevenue: 0,
    totalFrigobarRevenue: 0,
    averageDurationMinutes: 120,
  };

  const totalGenerated = stats.totalShiftRevenue + stats.totalFrigobarRevenue;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div className="brand-logo-badge" style={{ width: '40px', height: '40px', fontSize: '1.1rem' }}>
              {room.number}
            </div>
            <div>
              <h3>Detalle y Rendimiento: {room.name}</h3>
              <span style={{ fontSize: '0.84rem', color: 'var(--grow-green-500)', fontWeight: 600 }}>
                {category.name} — Piso {room.floor}
              </span>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Top 3 Financial Stats */}
          <div className="metrics-summary-grid" style={{ marginBottom: '0.5rem' }}>
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <DollarSign size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-title">Facturación Total Histórica</span>
                <span className="stat-value">{formatCurrency(totalGenerated)}</span>
                <span className="stat-subtext">{stats.totalTurnsCount} turnos completados</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.12)' }}>
                <Clock size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-title">Ingresos por Turnos</span>
                <span className="stat-value">{formatCurrency(stats.totalShiftRevenue)}</span>
                <span className="stat-subtext">Promedio: {stats.averageDurationMinutes} min / turno</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ color: '#a855f7', background: 'rgba(168, 85, 247, 0.12)' }}>
                <Wine size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-title">Consumos de Frigobar</span>
                <span className="stat-value">{formatCurrency(stats.totalFrigobarRevenue)}</span>
                <span className="stat-subtext">
                  {Math.round((stats.totalFrigobarRevenue / (totalGenerated || 1)) * 100)}% del total
                </span>
              </div>
            </div>
          </div>

          {/* IoT Telemetry Panel */}
          <div
            style={{
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-lg)',
              padding: '1rem 1.25rem',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Cpu size={16} color="var(--grow-green-500)" />
              <span>Telemetría de Dispositivo IoT (ESP32-S3 Door Controller)</span>
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', fontSize: '0.82rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Cerradura Electrónica:</span>
                <div style={{ fontWeight: 700, color: room.iot.doorLocked ? 'var(--grow-green-500)' : 'var(--status-warning)' }}>
                  {room.iot.doorLocked ? 'Bloqueada (Cerrada)' : 'Desbloqueada (Abierta)'}
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)' }}>Sensor Magnético:</span>
                <div style={{ fontWeight: 700, color: room.iot.doorSensorOpen ? 'var(--status-overdue)' : 'var(--grow-green-500)' }}>
                  {room.iot.doorSensorOpen ? 'Puerta Abierta' : 'Puerta Cerrada (OK)'}
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)' }}>Relé de Energía:</span>
                <div style={{ fontWeight: 700, color: room.iot.powerRelayOn ? 'var(--grow-green-500)' : 'var(--text-muted)' }}>
                  {room.iot.powerRelayOn ? 'Activo (Luz ON)' : 'Inactivo (Modo Ahorro)'}
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)' }}>Batería de Respaldo:</span>
                <div style={{ fontWeight: 700, color: 'var(--grow-green-500)' }}>
                  {room.iot.batteryLevel}% (Cargada)
                </div>
              </div>
            </div>

            <div style={{ marginTop: '0.65rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Último Evento: <em>{room.iot.lastEvent}</em> ({formatTime(room.iot.lastEventTime)})
            </div>
          </div>

          {/* Historical Turns List */}
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={15} />
              <span>Historial de Turnos Recientes en esta Habitación</span>
            </h4>

            <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
              <table className="data-table" style={{ fontSize: '0.82rem' }}>
                <thead>
                  <tr>
                    <th>Fecha & Hora</th>
                    <th>Tipo</th>
                    <th>Vehículo</th>
                    <th>Turno</th>
                    <th>Frigobar</th>
                    <th>Total</th>
                    <th>Medio de Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {roomHistory.map((h) => (
                    <tr key={h.id}>
                      <td>{formatDate(h.startTime)} {formatTime(h.startTime)}</td>
                      <td>{h.shiftType}</td>
                      <td>{h.vehiclePlate || '—'}</td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(h.rateAmount)}</td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(h.frigobarAmount)}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--grow-green-500)' }}>
                        {formatCurrency(h.totalAmount)}
                      </td>
                      <td style={{ textTransform: 'capitalize' }}>{h.paymentMethod}</td>
                    </tr>
                  ))}

                  {roomHistory.length === 0 && (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1rem' }}>
                        Sin turnos históricos registrados en la sesión actual.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
