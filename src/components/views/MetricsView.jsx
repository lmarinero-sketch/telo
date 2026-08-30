import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Wine,
  Clock,
  Download,
  Calendar,
  Layers,
  Award,
  BarChart,
  Percent,
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { ModuleOnboardingBanner } from '../common/ModuleOnboardingBanner';
import { formatCurrency } from '../../utils/formatters';

export const MetricsView = () => {
  const { rooms, categories, historicalTurns } = useHotel();

  const [sortField, setSortField] = useState('total'); // 'total', 'turns', 'frigobar', 'shift'

  const roomMetrics = rooms.map((room) => {
    const category = categories.find((c) => c.id === room.category) || { name: 'Estándar' };

    const baseShiftRev = room.stats?.totalShiftRevenue || 0;
    const baseFrigobarRev = room.stats?.totalFrigobarRevenue || 0;
    const turnsCount = room.stats?.totalTurnsCount || 0;
    const avgDuration = room.stats?.averageDurationMinutes || 110;

    const total = baseShiftRev + baseFrigobarRev;

    return {
      id: room.id,
      number: room.number,
      categoryName: category.name,
      floor: room.floor,
      turnsCount,
      shiftRevenue: baseShiftRev,
      frigobarRevenue: baseFrigobarRev,
      totalRevenue: total,
      avgDuration,
      frigobarRatio: total > 0 ? (baseFrigobarRev / total) * 100 : 0,
    };
  });

  const totalHotelRevenue = roomMetrics.reduce((acc, r) => acc + r.totalRevenue, 0);
  const totalHotelShiftRevenue = roomMetrics.reduce((acc, r) => acc + r.shiftRevenue, 0);
  const totalHotelFrigobarRevenue = roomMetrics.reduce((acc, r) => acc + r.frigobarRevenue, 0);
  const totalHotelTurns = roomMetrics.reduce((acc, r) => acc + r.turnsCount, 0);
  const avgHotelRoomRevenue = totalHotelRevenue / (rooms.length || 1);

  const sortedMetrics = [...roomMetrics].sort((a, b) => {
    if (sortField === 'total') return b.totalRevenue - a.totalRevenue;
    if (sortField === 'turns') return b.turnsCount - a.turnsCount;
    if (sortField === 'frigobar') return b.frigobarRevenue - a.frigobarRevenue;
    if (sortField === 'shift') return b.shiftRevenue - a.shiftRevenue;
    return 0;
  });

  const maxRoomRevenue = Math.max(...roomMetrics.map((r) => r.totalRevenue), 1);

  const handleExportCSV = () => {
    const headers = ['Habitacion', 'Categoria', 'Piso', 'Cantidad de Turnos', 'Ingresos Turnos', 'Ingresos Frigobar', 'Ingresos Totales', 'Duracion Promedio (min)'];
    const rows = sortedMetrics.map((r) => [
      r.number,
      r.categoryName,
      r.floor,
      r.turnsCount,
      r.shiftRevenue,
      r.frigobarRevenue,
      r.totalRevenue,
      r.avgDuration,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `reporte_ingresos_habitaciones_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Onboarding Banner */}
      <ModuleOnboardingBanner
        title="Métricas de Facturación & Rendimiento por Habitación"
        subtitle="Auditoría financiera completa: cuánto genera cada habitación en total desglosado en turnos y frigobar"
        steps={[
          'Monitoreá la recaudación global desglosada por Turnos de estadía vs. Frigobar/Room service.',
          'Identificá el ranking de las habitaciones más rentables del hotel.',
          'Exportá informes consolidados a formato CSV para liquidación contable.',
        ]}
      />

      {/* Top 4 KPI Cards */}
      <div className="metrics-summary-grid">
        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Ingresos Totales Acumulados</span>
            <div className="stat-icon-wrapper" style={{ background: 'var(--brand-yellow)', color: 'var(--brand-dark)' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <h3 className="stat-value">{formatCurrency(totalHotelRevenue)}</h3>
          <p className="stat-subtext">
            <span>{totalHotelTurns} turnos registrados</span>
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Ingresos por Turnos</span>
            <div className="stat-icon-wrapper" style={{ background: '#E0E7FF', color: '#1E3A8A' }}>
              <Clock size={18} />
            </div>
          </div>
          <h3 className="stat-value">{formatCurrency(totalHotelShiftRevenue)}</h3>
          <p className="stat-subtext">
            <span>{Math.round((totalHotelShiftRevenue / (totalHotelRevenue || 1)) * 100)}% de la facturación</span>
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Ingresos por Frigobar</span>
            <div className="stat-icon-wrapper" style={{ background: '#F3E8FF', color: '#6B21A8' }}>
              <Wine size={18} />
            </div>
          </div>
          <h3 className="stat-value">{formatCurrency(totalHotelFrigobarRevenue)}</h3>
          <p className="stat-subtext">
            <span>{Math.round((totalHotelFrigobarRevenue / (totalHotelRevenue || 1)) * 100)}% de la facturación</span>
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Promedio por Habitación</span>
            <div className="stat-icon-wrapper" style={{ background: 'var(--brand-cream)', color: 'var(--brand-dark)' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <h3 className="stat-value">{formatCurrency(avgHotelRoomRevenue)}</h3>
          <p className="stat-subtext">
            <span>{rooms.length} habitaciones activas</span>
          </p>
        </div>
      </div>

      {/* Visual Revenue Comparison Bar Chart */}
      <div
        style={{
          background: 'var(--brand-card)',
          border: '1px solid var(--brand-secondary)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Rendimiento y Facturación por Habitación</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--brand-brown)' }}>Comparativa visual de facturación acumulada</p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.78rem', color: 'var(--brand-dark)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '10px', height: '10px', background: 'var(--brand-brown)', borderRadius: '3px' }}></span>
              Turnos
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '10px', height: '10px', background: '#90A88D', borderRadius: '3px' }}></span>
              Frigobar
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {sortedMetrics.map((r) => {
            const shiftPercent = (r.shiftRevenue / maxRoomRevenue) * 100;
            const frigobarPercent = (r.frigobarRevenue / maxRoomRevenue) * 100;

            return (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '90px', fontSize: '0.86rem', fontWeight: 800, flexShrink: 0 }}>
                  Hab {r.number}
                </div>

                <div
                  style={{
                    flex: 1,
                    height: '22px',
                    background: 'var(--brand-cream)',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    display: 'flex',
                  }}
                >
                  <div
                    style={{
                      width: `${shiftPercent}%`,
                      background: 'var(--brand-brown)',
                      transition: 'width 0.4s ease',
                    }}
                    title={`Turnos: ${formatCurrency(r.shiftRevenue)}`}
                  ></div>
                  <div
                    style={{
                      width: `${frigobarPercent}%`,
                      background: '#90A88D',
                      transition: 'width 0.4s ease',
                    }}
                    title={`Frigobar: ${formatCurrency(r.frigobarRevenue)}`}
                  ></div>
                </div>

                <div
                  style={{
                    width: '130px',
                    textAlign: 'right',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    color: 'var(--brand-dark)',
                    flexShrink: 0,
                  }}
                >
                  {formatCurrency(r.totalRevenue)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Table Toolbar */}
      <div className="dashboard-header-bar">
        <div className="filter-tabs-group">
          <button
            className={`filter-tab ${sortField === 'total' ? 'active' : ''}`}
            onClick={() => setSortField('total')}
          >
            <span>Ordenar por Total ($)</span>
          </button>
          <button
            className={`filter-tab ${sortField === 'turns' ? 'active' : ''}`}
            onClick={() => setSortField('turns')}
          >
            <span>Por Cantidad de Turnos</span>
          </button>
          <button
            className={`filter-tab ${sortField === 'frigobar' ? 'active' : ''}`}
            onClick={() => setSortField('frigobar')}
          >
            <span>Por Frigobar</span>
          </button>
        </div>

        <button className="btn btn-secondary" onClick={handleExportCSV}>
          <Download size={15} />
          <span>Exportar Informe CSV</span>
        </button>
      </div>

      {/* Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Habitación</th>
              <th>Categoría</th>
              <th style={{ textAlign: 'center' }}>Turnos Hechos</th>
              <th style={{ textAlign: 'right' }}>Ingresos Turnos</th>
              <th style={{ textAlign: 'right' }}>Ingresos Frigobar</th>
              <th style={{ textAlign: 'right' }}>Facturación Total</th>
              <th style={{ textAlign: 'center' }}>% Frigobar</th>
              <th style={{ textAlign: 'center' }}>Estadía Promedio</th>
            </tr>
          </thead>
          <tbody>
            {sortedMetrics.map((r, index) => (
              <tr key={r.id}>
                <td style={{ fontWeight: 800 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {index === 0 && <Award size={16} color="#D97706" />}
                    <span>Habitación {r.number}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--brand-brown)', fontWeight: 600 }}>{r.categoryName}</td>
                <td style={{ textAlign: 'center', fontWeight: 700 }}>{r.turnsCount} turnos</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(r.shiftRevenue)}
                </td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(r.frigobarRevenue)}
                </td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--brand-emerald-primary)', fontSize: '0.98rem' }}>
                  {formatCurrency(r.totalRevenue)}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span
                    style={{
                      padding: '0.15rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.72rem',
                      background: 'var(--brand-cream)',
                      color: 'var(--brand-dark)',
                      fontWeight: 700,
                    }}
                  >
                    {Math.round(r.frigobarRatio)}%
                  </span>
                </td>
                <td style={{ textAlign: 'center', color: 'var(--brand-brown)', fontWeight: 600 }}>
                  {r.avgDuration} min
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
