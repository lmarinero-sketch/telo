import React, { useState, useEffect } from 'react';
import { X, Clock, Car, Users, DollarSign, Check, Key } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { formatCurrency } from '../../utils/formatters';

export const CheckInModal = ({ room, onClose }) => {
  const { categories, checkInRoom } = useHotel();

  const category = categories.find((c) => c.id === room?.category) || {
    name: 'Estándar',
    rates: { '1.5h': 18000, '2h': 22000, '3h': 28000, pernocte: 48000 },
  };

  const [selectedShift, setSelectedShift] = useState('2h');
  const [rateAmount, setRateAmount] = useState(category.rates?.['2h'] || 22000);
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  const [notes, setNotes] = useState('');

  const shiftOptions = [
    { id: '1.5h', label: '1.5 Horas', duration: '90 min', price: category.rates?.['1.5h'] || 18000 },
    { id: '2h', label: '2 Horas', duration: '120 min', price: category.rates?.['2h'] || 22000 },
    { id: '3h', label: '3 Horas', duration: '180 min', price: category.rates?.['3h'] || 28000 },
    { id: 'pernocte', label: 'Pernocte / Noche', duration: 'Hasta 12h', price: category.rates?.['pernocte'] || 48000 },
  ];

  const handleSelectShift = (opt) => {
    setSelectedShift(opt.id);
    setRateAmount(opt.price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkInRoom(room.id, {
      shiftType: selectedShift,
      rateAmount: Number(rateAmount),
      vehiclePlate,
      guestsCount,
      notes,
    });
    onClose();
  };

  if (!room) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3>Check-In / Inicio de Turno</h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--grow-green-500)', fontWeight: 600 }}>
              Habitación {room.number} — {category.name}
            </span>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Shift selector */}
            <div className="form-group">
              <label className="form-label">Seleccionar Duración del Turno:</label>
              <div className="turn-selector-grid">
                {shiftOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className={`turn-chip ${selectedShift === opt.id ? 'selected' : ''}`}
                    onClick={() => handleSelectShift(opt)}
                  >
                    <span className="turn-chip-name">{opt.label}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{opt.duration}</span>
                    <span className="turn-chip-price">{formatCurrency(opt.price)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Rate confirmation */}
            <div className="form-group">
              <label className="form-label">Tarifa a Cobrar ($):</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  className="form-input"
                  value={rateAmount}
                  onChange={(e) => setRateAmount(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Vehicle plate & guests */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Car size={14} />
                  <span>Patente Vehículo (Opcional):</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ej: AF 123 CD"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Users size={14} />
                  <span>Personas:</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  className="form-input"
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(e.target.value)}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="form-group">
              <label className="form-label">Notas u Observaciones:</label>
              <textarea
                className="form-textarea"
                rows="2"
                placeholder="Pedidos especiales, discreción, hielo extra, etc..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            {/* IoT Automation Notice */}
            <div
              style={{
                background: 'rgba(0, 229, 153, 0.08)',
                border: '1px solid rgba(0, 229, 153, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
              }}
            >
              <Key size={20} color="var(--grow-green-500)" style={{ flexShrink: 0 }} />
              <span>
                <strong>Acción IoT Automática:</strong> Al confirmar el check-in, la cerradura se destrabará y se activará la alimentación eléctrica de la habitación.
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={16} />
              <span>Confirmar Ingreso ({formatCurrency(rateAmount)})</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
