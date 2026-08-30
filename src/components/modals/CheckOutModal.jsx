import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Banknote,
  QrCode,
  ArrowRightLeft,
  Wine,
  Clock,
  Printer,
  Check,
  Percent,
  Sparkles,
  Receipt,
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { formatCurrency, formatTime, formatDurationMs } from '../../utils/formatters';

export const CheckOutModal = ({ room, onClose }) => {
  const { categories, checkOutRoom } = useHotel();

  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash', 'card', 'transfer', 'qr'
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState('');
  const [autoSendToCleaning, setAutoSendToCleaning] = useState(true);
  const [showReceiptPreview, setShowReceiptPreview] = useState(false);

  if (!room || !room.currentShift) return null;

  const category = categories.find((c) => c.id === room.category) || { name: 'Estándar' };
  const shift = room.currentShift;

  const shiftDurationMs = Date.now() - new Date(shift.startTime).getTime();
  const shiftCost = Number(shift.rateAmount) || 0;

  const consumptions = shift.consumptions || [];
  const frigobarTotal = consumptions.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const subtotal = shiftCost + frigobarTotal;
  const finalTotal = Math.max(0, subtotal - Number(discount || 0));

  const handleConfirmCheckOut = (e) => {
    e.preventDefault();
    checkOutRoom(room.id, {
      paymentMethod,
      discount: Number(discount || 0),
      notes,
      autoSendToCleaning,
    });
    onClose();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(0, 229, 153, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--grow-green-500)',
              }}
            >
              <Receipt size={22} />
            </div>
            <div>
              <h3>Cierre de Turno y Facturación</h3>
              <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Habitación {room.number} — {category.name}
              </span>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleConfirmCheckOut}>
          <div className="modal-body">
            {/* Shift Metrics Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                background: 'var(--bg-elevated)',
                padding: '0.9rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Tipo de Turno
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {shift.shiftType}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Ingreso / Egreso
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  {formatTime(shift.startTime)} → {formatTime(new Date())}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Tiempo Transcurrido
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--grow-green-500)', fontFamily: 'var(--font-mono)' }}>
                  {formatDurationMs(shiftDurationMs)}
                </div>
              </div>
            </div>

            {/* Itemized Breakdown Table */}
            <div>
              <h4 style={{ fontSize: '0.92rem', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>Detalle de Cargos</span>
              </h4>
              <div
                style={{
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  background: 'var(--bg-input)',
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '0.6rem 0.85rem', textAlign: 'left' }}>Concepto</th>
                      <th style={{ padding: '0.6rem 0.85rem', textAlign: 'center' }}>Cant.</th>
                      <th style={{ padding: '0.6rem 0.85rem', textAlign: 'right' }}>P. Unit.</th>
                      <th style={{ padding: '0.6rem 0.85rem', textAlign: 'right' }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Shift cost */}
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.65rem 0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        Turno de Habitación ({shift.shiftType})
                      </td>
                      <td style={{ padding: '0.65rem 0.85rem', textAlign: 'center' }}>1</td>
                      <td style={{ padding: '0.65rem 0.85rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                        {formatCurrency(shiftCost)}
                      </td>
                      <td style={{ padding: '0.65rem 0.85rem', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {formatCurrency(shiftCost)}
                      </td>
                    </tr>

                    {/* Frigobar Items */}
                    {consumptions.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '0.55rem 0.85rem', color: 'var(--text-secondary)' }}>
                          <span style={{ color: 'var(--grow-green-500)', marginRight: '0.4rem' }}>•</span>
                          {item.name}
                        </td>
                        <td style={{ padding: '0.55rem 0.85rem', textAlign: 'center' }}>{item.quantity}</td>
                        <td style={{ padding: '0.55rem 0.85rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                          {formatCurrency(item.price)}
                        </td>
                        <td style={{ padding: '0.55rem 0.85rem', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                          {formatCurrency(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}

                    {consumptions.length === 0 && (
                      <tr>
                        <td colSpan="4" style={{ padding: '0.6rem 0.85rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                          Sin consumos de frigobar registrados en este turno
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Financial Summary Calculation */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                background: 'var(--bg-elevated)',
                padding: '1rem',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <span>Subtotal (Turno + Frigobar):</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(subtotal)}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Percent size={14} /> Descuento / Cortesía ($):
                </span>
                <input
                  type="number"
                  min="0"
                  max={subtotal}
                  className="form-input"
                  style={{ width: '130px', padding: '0.35rem 0.6rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.6rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>TOTAL A COBRAR:</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: 'var(--grow-green-500)',
                  }}
                >
                  {formatCurrency(finalTotal)}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="form-group">
              <label className="form-label">Medio de Pago:</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem' }}>
                <button
                  type="button"
                  className={`turn-chip ${paymentMethod === 'cash' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  <Banknote size={20} color={paymentMethod === 'cash' ? 'var(--grow-green-500)' : 'var(--text-secondary)'} />
                  <span style={{ fontSize: '0.82rem', marginTop: '0.3rem', fontWeight: 600 }}>Efectivo</span>
                </button>

                <button
                  type="button"
                  className={`turn-chip ${paymentMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={20} color={paymentMethod === 'card' ? 'var(--grow-green-500)' : 'var(--text-secondary)'} />
                  <span style={{ fontSize: '0.82rem', marginTop: '0.3rem', fontWeight: 600 }}>Tarjeta</span>
                </button>

                <button
                  type="button"
                  className={`turn-chip ${paymentMethod === 'qr' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('qr')}
                >
                  <QrCode size={20} color={paymentMethod === 'qr' ? 'var(--grow-green-500)' : 'var(--text-secondary)'} />
                  <span style={{ fontSize: '0.82rem', marginTop: '0.3rem', fontWeight: 600 }}>MercadoPago</span>
                </button>

                <button
                  type="button"
                  className={`turn-chip ${paymentMethod === 'transfer' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('transfer')}
                >
                  <ArrowRightLeft size={20} color={paymentMethod === 'transfer' ? 'var(--grow-green-500)' : 'var(--text-secondary)'} />
                  <span style={{ fontSize: '0.82rem', marginTop: '0.3rem', fontWeight: 600 }}>Transferencia</span>
                </button>
              </div>
            </div>

            {/* Housekeeping Checkbox */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <input
                type="checkbox"
                id="autoCleaning"
                checked={autoSendToCleaning}
                onChange={(e) => setAutoSendToCleaning(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--grow-green-500)', cursor: 'pointer' }}
              />
              <label htmlFor="autoCleaning" style={{ fontSize: '0.86rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={15} color="#c084fc" />
                <span>Enviar automáticamente a <strong>Módulo de Limpieza</strong> tras el cobro</span>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handlePrint}>
              <Printer size={16} />
              <span>Imprimir Ticket</span>
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={16} />
              <span>Cobrar {formatCurrency(finalTotal)} & Check-Out</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
