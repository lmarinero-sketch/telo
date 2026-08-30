import React from 'react';
import {
  Lock,
  Unlock,
  Plus,
  Clock,
  Wine,
  CreditCard,
  Sparkles,
  Car,
  Zap,
  Info,
  AlertCircle,
  ShieldCheck,
  DoorOpen,
  DoorClosed,
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { formatCurrency, formatTime, calculateTimeRemaining, formatDurationMs } from '../utils/formatters';

export const RoomCard = ({
  room,
  onOpenCheckIn,
  onOpenCheckOut,
  onOpenFrigobar,
  onOpenExtend,
  onOpenDetail,
}) => {
  const { categories, toggleDoorLock, finishCleaning, nowTick } = useHotel();

  const category = categories.find((c) => c.id === room.category) || {
    name: 'Estándar',
    rates: { '1.5h': 18000, '2h': 22000 },
  };

  // Determine dynamic status
  let dynamicStatus = room.status; // 'available', 'occupied', 'cleaning', 'maintenance'
  let timeInfo = { remainingMs: 0, isOverdue: false, formatted: '00:00:00' };
  let progressPercent = 0;

  if (room.status === 'occupied' && room.currentShift) {
    timeInfo = calculateTimeRemaining(room.currentShift.endTime);

    const totalDuration =
      new Date(room.currentShift.endTime).getTime() -
      new Date(room.currentShift.startTime).getTime();
    const elapsed = Date.now() - new Date(room.currentShift.startTime).getTime();
    progressPercent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

    if (timeInfo.isOverdue) {
      dynamicStatus = 'overdue';
    } else if (timeInfo.remainingMs <= 15 * 60 * 1000) {
      dynamicStatus = 'warning';
    }
  }

  // Calculate current shift total running bill
  let runningBill = 0;
  let frigobarItemsCount = 0;
  if (room.currentShift) {
    const shiftCost = room.currentShift.rateAmount || 0;
    const frigobarCost = (room.currentShift.consumptions || []).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    frigobarItemsCount = (room.currentShift.consumptions || []).reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    runningBill = shiftCost + frigobarCost;
  }

  // Cleaning duration calculation
  let cleaningElapsedStr = '';
  if (room.status === 'cleaning' && room.cleaning?.startedAt) {
    const cleaningMs = Date.now() - new Date(room.cleaning.startedAt).getTime();
    cleaningElapsedStr = formatDurationMs(cleaningMs);
  }

  return (
    <div className={`room-card card-${dynamicStatus}`}>
      {/* Card Header */}
      <div className="room-card-header">
        <div className="room-identity">
          <div className="room-number-badge">{room.number}</div>
          <div className="room-meta-group">
            <span className="room-category-name">{category.name}</span>
            <span className="room-floor-tag">Piso {room.floor}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {dynamicStatus === 'available' && (
            <span className="status-badge available">Disponible</span>
          )}
          {dynamicStatus === 'occupied' && (
            <span className="status-badge occupied">Ocupada</span>
          )}
          {dynamicStatus === 'warning' && (
            <span className="status-badge warning">Por Vencer</span>
          )}
          {dynamicStatus === 'overdue' && (
            <span className="status-badge overdue">Vencida</span>
          )}
          {dynamicStatus === 'cleaning' && (
            <span className="status-badge cleaning">Limpieza</span>
          )}

          <button
            className="icon-btn"
            style={{ width: '28px', height: '28px' }}
            onClick={() => onOpenDetail(room)}
            title="Ver detalle histórico de la habitación"
          >
            <Info size={14} />
          </button>
        </div>
      </div>

      {/* Card Body by State */}
      {room.status === 'available' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '0.5rem 0' }}>
          <div
            style={{
              background: 'var(--bg-elevated)',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>Tarifa 1.5 Horas:</span>
            <strong style={{ color: 'var(--grow-green-500)', fontFamily: 'var(--font-mono)' }}>
              {formatCurrency(category.rates?.['1.5h'])}
            </strong>
          </div>
          <div
            style={{
              background: 'var(--bg-elevated)',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>Tarifa 2 Horas:</span>
            <strong style={{ color: 'var(--grow-green-500)', fontFamily: 'var(--font-mono)' }}>
              {formatCurrency(category.rates?.['2h'])}
            </strong>
          </div>
        </div>
      )}

      {room.status === 'occupied' && room.currentShift && (
        <>
          {/* Real-time Timer Box */}
          <div className="timer-container">
            <div className="timer-main-row">
              <span className="timer-label">
                {timeInfo.isOverdue ? 'Excedido por' : 'Tiempo Restante'}
              </span>
              <div
                className={`timer-digits ${
                  timeInfo.isOverdue ? 'overdue' : dynamicStatus === 'warning' ? 'warning' : 'active'
                }`}
              >
                {timeInfo.formatted}
              </div>
            </div>

            <div className="progress-bar-bg">
              <div
                className={`progress-bar-fill ${
                  timeInfo.isOverdue ? 'overdue' : dynamicStatus === 'warning' ? 'warning' : 'normal'
                }`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <span>Inicio: {formatTime(room.currentShift.startTime)}</span>
              <span>Fin Prog: {formatTime(room.currentShift.endTime)}</span>
            </div>
          </div>

          {/* Running Bill & Metadata */}
          <div className="room-summary-meta">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Wine size={14} />
              <span>Frigobar ({frigobarItemsCount})</span>
            </div>
            <div className="running-bill-amount" title="Total acumulado (Turno + Consumos)">
              Total: {formatCurrency(runningBill)}
            </div>
          </div>

          {room.currentShift.vehiclePlate && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <Car size={13} />
              <span>Patente: <strong>{room.currentShift.vehiclePlate}</strong></span>
            </div>
          )}
        </>
      )}

      {room.status === 'cleaning' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: '0.5rem 0' }}>
          <div
            style={{
              background: 'var(--status-cleaning-bg)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              padding: '0.85rem',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', color: '#c084fc', fontWeight: 600 }}>
                En Limpieza & Higienización
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: '#e9d5ff' }}>
                {cleaningElapsedStr}
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Responsable: {room.cleaning?.staff || 'Mucama asignada'}
            </span>
          </div>
        </div>
      )}

      {/* IoT Status Bar */}
      <div className="iot-pill-strip">
        <div
          className={`iot-status-item ${room.iot.doorLocked ? 'active' : 'alert'}`}
          title={room.iot.doorLocked ? 'Cerradura Bloqueada' : 'Cerradura Desbloqueada'}
        >
          {room.iot.doorLocked ? <Lock size={13} /> : <Unlock size={13} />}
          <span>{room.iot.doorLocked ? 'Cerrada' : 'Abierta'}</span>
        </div>

        <div style={{ margin: '0 0.2rem', opacity: 0.3 }}>|</div>

        <div
          className={`iot-status-item ${room.iot.doorSensorOpen ? 'alert' : ''}`}
          title={room.iot.doorSensorOpen ? 'Sensor: Puerta abierta' : 'Sensor: Puerta cerrada'}
        >
          {room.iot.doorSensorOpen ? <DoorOpen size={13} /> : <DoorClosed size={13} />}
          <span>{room.iot.doorSensorOpen ? 'Sensor Abierto' : 'Sensor OK'}</span>
        </div>

        <div style={{ margin: '0 0.2rem', opacity: 0.3 }}>|</div>

        <div
          className={`iot-status-item ${room.iot.powerRelayOn ? 'active' : ''}`}
          title={room.iot.powerRelayOn ? 'Energía y Luces ON' : 'Ahorro de energía OFF'}
        >
          <Zap size={13} />
          <span>{room.iot.powerRelayOn ? 'Luz ON' : 'Luz OFF'}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card-actions">
        {room.status === 'available' && (
          <>
            <button
              className="btn btn-primary"
              style={{ gridColumn: 'span 2' }}
              onClick={() => onOpenCheckIn(room)}
            >
              <Plus size={16} />
              <span>Ingreso / Iniciar Turno</span>
            </button>
          </>
        )}

        {room.status === 'occupied' && (
          <>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onOpenFrigobar(room)}
              title="Cargar consumos de frigobar o room service"
            >
              <Wine size={15} />
              <span>+ Frigobar</span>
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onOpenExtend(room)}
              title="Extender tiempo del turno"
            >
              <Clock size={15} />
              <span>+ Tiempo</span>
            </button>

            <button
              className="btn btn-outline-green btn-sm"
              onClick={() => toggleDoorLock(room.id)}
              title="Abrir o bloquear cerradura IoT"
            >
              {room.iot.doorLocked ? <Unlock size={15} /> : <Lock size={15} />}
              <span>{room.iot.doorLocked ? 'Destrabar' : 'Bloquear'}</span>
            </button>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => onOpenCheckOut(room)}
              title="Cobrar turno y consumos"
            >
              <CreditCard size={15} />
              <span>Cobrar</span>
            </button>
          </>
        )}

        {room.status === 'cleaning' && (
          <button
            className="btn btn-success"
            style={{ gridColumn: 'span 2' }}
            onClick={() => finishCleaning(room.id)}
          >
            <Sparkles size={16} />
            <span>Finalizar Limpieza & Habilitar</span>
          </button>
        )}
      </div>
    </div>
  );
};
