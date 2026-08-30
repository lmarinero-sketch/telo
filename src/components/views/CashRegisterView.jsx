import React, { useState } from 'react';
import {
  Wallet,
  DollarSign,
  CreditCard,
  QrCode,
  TrendingUp,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Check,
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { ModuleOnboardingBanner } from '../common/ModuleOnboardingBanner';
import { formatCurrency, formatTime, formatDate } from '../../utils/formatters';

export const CashRegisterView = () => {
  const { cashRegister, addCashMovement } = useHotel();

  const [showAddModal, setShowAddModal] = useState(false);
  const [movType, setMovType] = useState('out'); // 'in' or 'out'
  const [movMethod, setMovMethod] = useState('cash');
  const [movAmount, setMovAmount] = useState('');
  const [movConcept, setMovConcept] = useState('');

  const initialCash = cashRegister.initialCash || 0;
  const movements = cashRegister.movements || [];

  // Totals
  const cashIn = movements
    .filter((m) => m.type === 'in' && m.method === 'cash')
    .reduce((acc, m) => acc + m.amount, 0);

  const cashOut = movements
    .filter((m) => m.type === 'out' && m.method === 'cash')
    .reduce((acc, m) => acc + m.amount, 0);

  const cardIn = movements
    .filter((m) => m.type === 'in' && m.method === 'card')
    .reduce((acc, m) => acc + m.amount, 0);

  const qrIn = movements
    .filter((m) => m.type === 'in' && (m.method === 'qr' || m.method === 'transfer'))
    .reduce((acc, m) => acc + m.amount, 0);

  const totalIn = movements
    .filter((m) => m.type === 'in')
    .reduce((acc, m) => acc + m.amount, 0);

  const physicalCashInDrawer = initialCash + cashIn - cashOut;

  const handleSaveMovement = (e) => {
    e.preventDefault();
    if (!movAmount || !movConcept) return;

    addCashMovement({
      type: movType,
      method: movMethod,
      amount: Number(movAmount),
      concept: movConcept,
    });

    setMovAmount('');
    setMovConcept('');
    setShowAddModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Onboarding Banner */}
      <ModuleOnboardingBanner
        title="Arqueo de Caja, Tesorería & Cierres de Turno"
        subtitle="Registro de dinero físico en gaveta, cobros con tarjeta/QR y egresos de caja chica"
        steps={[
          'Revisá el conteo de efectivo físico esperado en el cajón de recepción.',
          'Supervisá los cobros digitales procesados mediante POS o transferencias QR.',
          'Registrá salidas de dinero para compras operativas o gastos imprevistos.',
        ]}
      />

      {/* Top 4 KPI Cards */}
      <div className="metrics-summary-grid">
        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Efectivo Físico en Cajón</span>
            <div className="stat-icon-wrapper" style={{ background: 'var(--brand-yellow)', color: 'var(--brand-dark)' }}>
              <Wallet size={18} />
            </div>
          </div>
          <h3 className="stat-value">{formatCurrency(physicalCashInDrawer)}</h3>
          <p className="stat-subtext">
            <span>Fondo inicial ({formatCurrency(initialCash)}) + Cobros cash</span>
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Ingresos Totales en Turno</span>
            <div className="stat-icon-wrapper" style={{ background: 'var(--brand-cream)', color: 'var(--brand-dark)' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <h3 className="stat-value">{formatCurrency(totalIn)}</h3>
          <p className="stat-subtext">
            <span>Todos los métodos de pago combinados</span>
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Cobrado con Tarjeta</span>
            <div className="stat-icon-wrapper" style={{ background: '#E0E7FF', color: '#1E3A8A' }}>
              <CreditCard size={18} />
            </div>
          </div>
          <h3 className="stat-value">{formatCurrency(cardIn)}</h3>
          <p className="stat-subtext">
            <span>Terminal POS / Débito / Crédito</span>
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">MercadoPago / Transferencias</span>
            <div className="stat-icon-wrapper" style={{ background: '#F3E8FF', color: '#6B21A8' }}>
              <QrCode size={18} />
            </div>
          </div>
          <h3 className="stat-value">{formatCurrency(qrIn)}</h3>
          <p className="stat-subtext">
            <span>Acreditaciones digitales inmediatas</span>
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="dashboard-header-bar">
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Libro Diario de Movimientos de Caja</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--brand-brown)' }}>
            Auditoría de ingresos por turnos y salidas de fondos
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={15} />
          <span>Registrar Movimiento Manual</span>
        </button>
      </div>

      {/* Movements Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Tipo</th>
              <th>Concepto</th>
              <th>Medio de Pago</th>
              <th style={{ textAlign: 'right' }}>Monto</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((m) => {
              const isIncome = m.type === 'in';

              return (
                <tr key={m.id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 700 }}>{formatTime(m.timestamp)}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--brand-brown)' }}>{formatDate(m.timestamp)}</span>
                    </div>
                  </td>
                  <td>
                    {isIncome ? (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          padding: '0.15rem 0.55rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          background: 'var(--brand-yellow)',
                          color: 'var(--brand-dark)',
                        }}
                      >
                        <ArrowDownLeft size={12} /> Ingreso
                      </span>
                    ) : (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          padding: '0.15rem 0.55rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          background: '#FEE2E2',
                          color: '#991B1B',
                        }}
                      >
                        <ArrowUpRight size={12} /> Egreso
                      </span>
                    )}
                  </td>
                  <td style={{ fontWeight: 600 }}>{m.concept}</td>
                  <td>
                    <span
                      style={{
                        textTransform: 'capitalize',
                        padding: '0.15rem 0.45rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--brand-cream)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      {m.method === 'cash' ? 'Efectivo' : m.method === 'card' ? 'Tarjeta' : m.method === 'qr' ? 'MercadoPago QR' : 'Transferencia'}
                    </span>
                  </td>
                  <td
                    style={{
                      textAlign: 'right',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      color: isIncome ? 'var(--brand-emerald-primary)' : '#DC2626',
                    }}
                  >
                    {isIncome ? '+' : '-'} {formatCurrency(m.amount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal Add Movement */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Registrar Movimiento de Caja</h3>
            </div>
            <form onSubmit={handleSaveMovement}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Tipo de Movimiento:</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                    <button
                      type="button"
                      className={`turn-chip ${movType === 'in' ? 'selected' : ''}`}
                      onClick={() => setMovType('in')}
                    >
                      <ArrowDownLeft size={16} color="var(--brand-brown)" />
                      <span style={{ fontWeight: 700, marginTop: '0.2rem' }}>Ingreso Extra</span>
                    </button>
                    <button
                      type="button"
                      className={`turn-chip ${movType === 'out' ? 'selected' : ''}`}
                      onClick={() => setMovType('out')}
                    >
                      <ArrowUpRight size={16} color="#DC2626" />
                      <span style={{ fontWeight: 700, marginTop: '0.2rem' }}>Egreso / Gasto</span>
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Concepto:</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ej: Insumos de limpieza o lavandería"
                    value={movConcept}
                    onChange={(e) => setMovConcept(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div className="form-group">
                    <label className="form-label">Monto ($):</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Ej: 15000"
                      value={movAmount}
                      onChange={(e) => setMovAmount(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Método:</label>
                    <select
                      className="form-select"
                      value={movMethod}
                      onChange={(e) => setMovMethod(e.target.value)}
                    >
                      <option value="cash">Efectivo</option>
                      <option value="card">Tarjeta</option>
                      <option value="transfer">Transferencia / QR</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={15} />
                  <span>Guardar Movimiento</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
