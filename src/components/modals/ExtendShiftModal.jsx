import React, { useState } from 'react';
import { X, Clock, Plus, Check, DollarSign } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { formatCurrency, formatTime } from '../../utils/formatters';

export const ExtendShiftModal = ({ room, onClose }) => {
  const { categories, extendShift } = useHotel();

  if (!room || !room.currentShift) return null;

  const category = categories.find((c) => c.id === room.category) || {
    name: 'Estándar',
    rates: { extra_hour: 8000 },
  };

  const extraHourlyRate = category.rates?.extra_hour || 8000;

  const [selectedMinutes, setSelectedMinutes] = useState(60);
  const [extraPrice, setExtraPrice] = useState(extraHourlyRate);

  const options = [
    { label: '+30 Minutos', minutes: 30, price: Math.round(extraHourlyRate * 0.5) },
    { label: '+1 Hora', minutes: 60, price: extraHourlyRate },
    { label: '+1.5 Horas', minutes: 90, price: Math.round(extraHourlyRate * 1.5) },
    { label: '+2 Horas', minutes: 120, price: extraHourlyRate * 2 },
  ];

  const handleSelectOption = (opt) => {
    setSelectedMinutes(opt.minutes);
    setExtraPrice(opt.price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    extendShift(room.id, selectedMinutes, extraPrice);
    onClose();
  };

  const currentEndTime = new Date(room.currentShift.endTime);
  const newEndTime = new Date(currentEndTime.getTime() + selectedMinutes * 60 * 1000);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3>Extender Duración de Turno</h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--grow-green-500)', fontWeight: 600 }}>
              Habitación {room.number} — Fin actual: {formatTime(currentEndTime)}
            </span>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Seleccionar Tiempo a Adicionar:</label>
              <div className="turn-selector-grid">
                {options.map((opt) => (
                  <div
                    key={opt.minutes}
                    className={`turn-chip ${selectedMinutes === opt.minutes ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(opt)}
                  >
                    <span className="turn-chip-name">{opt.label}</span>
                    <span className="turn-chip-price">{formatCurrency(opt.price)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Extra Price */}
            <div className="form-group">
              <label className="form-label">Recargo a Sumar al Turno ($):</label>
              <input
                type="number"
                className="form-input"
                value={extraPrice}
                onChange={(e) => setExtraPrice(Number(e.target.value))}
                required
              />
            </div>

            {/* Preview Banner */}
            <div
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Nuevo Horario de Salida:</span>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--grow-green-500)' }}>
                  {formatTime(newEndTime)}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Monto adicional:</span>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  +{formatCurrency(extraPrice)}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={16} />
              <span>Confirmar Extensión</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
