import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  Wine,
  Clock,
  Download,
  Calendar,
  Layers,
  Award,
  BarChart3,
  Percent,
  Sparkles,
  Activity,
  ArrowUpRight,
  Filter,
  PieChart,
  HelpCircle,
  Zap,
  UserCheck,
  CheckCircle2,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { ModuleOnboardingBanner } from '../common/ModuleOnboardingBanner';
import { formatCurrency } from '../../utils/formatters';

// Simulated Full Year 12-Month Operational Dataset
const ANNUAL_MONTHLY_DATA = [
  { month: 'Ene', fullName: 'Enero', turns: 740, shiftRev: 18500000, frigobarRev: 5200000, occupancy: 78, avgTicket: 32027, peakHour: '23:00 - 03:00' },
  { month: 'Feb', fullName: 'Febrero (San Valentín)', turns: 890, shiftRev: 22800000, frigobarRev: 7400000, occupancy: 92, avgTicket: 33932, peakHour: '21:00 - 04:00' },
  { month: 'Mar', fullName: 'Marzo', turns: 760, shiftRev: 19200000, frigobarRev: 5400000, occupancy: 80, avgTicket: 32368, peakHour: '22:00 - 02:00' },
  { month: 'Abr', fullName: 'Abril', turns: 720, shiftRev: 18100000, frigobarRev: 4900000, occupancy: 76, avgTicket: 31944, peakHour: '23:00 - 02:00' },
  { month: 'May', fullName: 'Mayo', turns: 750, shiftRev: 18900000, frigobarRev: 5100000, occupancy: 79, avgTicket: 32000, peakHour: '22:00 - 03:00' },
  { month: 'Jun', fullName: 'Junio', turns: 780, shiftRev: 19800000, frigobarRev: 5600000, occupancy: 82, avgTicket: 32564, peakHour: '21:00 - 03:00' },
  { month: 'Jul', fullName: 'Julio (Feriados Invierno)', turns: 840, shiftRev: 21600000, frigobarRev: 6300000, occupancy: 87, avgTicket: 33214, peakHour: '21:00 - 04:00' },
  { month: 'Ago', fullName: 'Agosto', turns: 760, shiftRev: 19400000, frigobarRev: 5300000, occupancy: 80, avgTicket: 32500, peakHour: '22:00 - 02:00' },
  { month: 'Sep', fullName: 'Septiembre (Primavera)', turns: 810, shiftRev: 20700000, frigobarRev: 5900000, occupancy: 84, avgTicket: 32839, peakHour: '22:00 - 03:00' },
  { month: 'Oct', fullName: 'Octubre', turns: 790, shiftRev: 20100000, frigobarRev: 5700000, occupancy: 83, avgTicket: 32658, peakHour: '22:00 - 03:00' },
  { month: 'Nov', fullName: 'Noviembre', turns: 830, shiftRev: 21300000, frigobarRev: 6100000, occupancy: 86, avgTicket: 33012, peakHour: '22:00 - 04:00' },
  { month: 'Dic', fullName: 'Diciembre (Fin de Año)', turns: 940, shiftRev: 24500000, frigobarRev: 7800000, occupancy: 95, avgTicket: 34361, peakHour: '20:00 - 05:00' },
];

// Hourly Demand Heatmap (24 hours)
const HOURLY_OCCUPANCY_HEATMAP = [
  { hour: '00:00', label: '00h', rate: 94, isPeak: true },
  { hour: '01:00', label: '01h', rate: 96, isPeak: true },
  { hour: '02:00', label: '02h', rate: 92, isPeak: true },
  { hour: '03:00', label: '03h', rate: 85, isPeak: true },
  { hour: '04:00', label: '04h', rate: 70, isPeak: false },
  { hour: '05:00', label: '05h', rate: 45, isPeak: false },
  { hour: '06:00', label: '06h', rate: 25, isPeak: false },
  { hour: '07:00', label: '07h', rate: 18, isPeak: false },
  { hour: '08:00', label: '08h', rate: 15, isPeak: false },
  { hour: '09:00', label: '09h', rate: 22, isPeak: false },
  { hour: '10:00', label: '10h', rate: 30, isPeak: false },
  { hour: '11:00', label: '11h', rate: 38, isPeak: false },
  { hour: '12:00', label: '12h', rate: 48, isPeak: false },
  { hour: '13:00', label: '13h', rate: 58, isPeak: false },
  { hour: '14:00', label: '14h', rate: 68, isPeak: false },
  { hour: '15:00', label: '15h', rate: 75, isPeak: false },
  { hour: '16:00', label: '16h', rate: 72, isPeak: false },
  { hour: '17:00', label: '17h', rate: 68, isPeak: false },
  { hour: '18:00', label: '18h', rate: 74, isPeak: false },
  { hour: '19:00', label: '19h', rate: 80, isPeak: false },
  { hour: '20:00', label: '20h', rate: 86, isPeak: true },
  { hour: '21:00', label: '21h', rate: 91, isPeak: true },
  { hour: '22:00', label: '22h', rate: 98, isPeak: true },
  { hour: '23:00', label: '23h', rate: 96, isPeak: true },
];

// Top Selling Categories in Frigobar (Annual)
const FRIGOBAR_MIX_DATA = [
  { name: 'Vinos & Champagnes', percent: 36, amount: 25452000, color: 'var(--brand-brown)', icon: '🍾' },
  { name: 'Cervezas & Aperitivos', percent: 24, amount: 16968000, color: 'var(--brand-emerald-primary)', icon: '🍺' },
  { name: 'Amenities & Kits Sensuales', percent: 20, amount: 14140000, color: 'var(--brand-dark)', icon: '✨' },
  { name: 'Bebidas Sin Alcohol & Red Bull', percent: 12, amount: 8484000, color: '#90A88D', icon: '⚡' },
  { name: 'Snacks & Chocolatería', percent: 8, amount: 5656000, color: 'var(--brand-secondary)', icon: '🍫' },
];

// Payment Methods Mix
const PAYMENT_MIX_DATA = [
  { name: 'Mercado Pago QR & Transferencias', percent: 42, color: '#009EE3', share: '$ 130.4M' },
  { name: 'Efectivo en Recepción', percent: 34, color: 'var(--brand-brown)', share: '$ 105.6M' },
  { name: 'Tarjetas Débito / Crédito (POS)', percent: 24, color: 'var(--brand-dark)', share: '$ 74.5M' },
];

export const MetricsView = () => {
  const { rooms, categories } = useHotel();

  // Filters State
  const [periodFilter, setPeriodFilter] = useState('year'); // 'year', 's1', 's2', 'q4', 'weekends', 'weekdays'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [revenueTypeFilter, setRevenueTypeFilter] = useState('total'); // 'total', 'shift', 'frigobar'
  const [hoveredMonth, setHoveredMonth] = useState(null);
  const [hoveredHour, setHoveredHour] = useState(null);
  const [sortField, setSortField] = useState('total'); // 'total', 'turns', 'frigobar', 'shift'
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger entrance animation on mount and filter changes
  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, [periodFilter, categoryFilter, revenueTypeFilter]);

  // Multipliers based on period
  let periodMultiplier = 1.0;
  let periodLabel = 'Año Completo (12 Meses)';
  let filteredMonths = [...ANNUAL_MONTHLY_DATA];

  if (periodFilter === 's1') {
    periodMultiplier = 0.48;
    periodLabel = 'Primer Semestre (Ene - Jun)';
    filteredMonths = ANNUAL_MONTHLY_DATA.slice(0, 6);
  } else if (periodFilter === 's2') {
    periodMultiplier = 0.52;
    periodLabel = 'Segundo Semestre (Jul - Dic)';
    filteredMonths = ANNUAL_MONTHLY_DATA.slice(6, 12);
  } else if (periodFilter === 'q4') {
    periodMultiplier = 0.28;
    periodLabel = 'Último Trimestre Q4 (Oct - Dic)';
    filteredMonths = ANNUAL_MONTHLY_DATA.slice(9, 12);
  } else if (periodFilter === 'weekends') {
    periodMultiplier = 0.64;
    periodLabel = 'Fines de Semana (Viernes, Sábados y Domingos)';
  } else if (periodFilter === 'weekdays') {
    periodMultiplier = 0.36;
    periodLabel = 'Días de Semana (Lunes a Jueves)';
  }

  // Category Multiplier
  let catMultiplier = 1.0;
  if (categoryFilter === 'standard') catMultiplier = 0.28;
  else if (categoryFilter === 'suite_jacuzzi') catMultiplier = 0.34;
  else if (categoryFilter === 'master_vip') catMultiplier = 0.24;
  else if (categoryFilter === 'tematica_sensual') catMultiplier = 0.14;

  const totalAnnualShiftRev = Math.round(
    filteredMonths.reduce((acc, m) => acc + m.shiftRev, 0) * catMultiplier * (periodFilter === 'weekends' || periodFilter === 'weekdays' ? periodMultiplier : 1)
  );
  const totalAnnualFrigobarRev = Math.round(
    filteredMonths.reduce((acc, m) => acc + m.frigobarRev, 0) * catMultiplier * (periodFilter === 'weekends' || periodFilter === 'weekdays' ? periodMultiplier : 1)
  );
  const totalAnnualRevenue = totalAnnualShiftRev + totalAnnualFrigobarRev;
  const totalAnnualTurns = Math.round(
    filteredMonths.reduce((acc, m) => acc + m.turns, 0) * catMultiplier * (periodFilter === 'weekends' || periodFilter === 'weekdays' ? periodMultiplier : 1)
  );
  const avgAnnualOccupancy = Math.round(
    filteredMonths.reduce((acc, m) => acc + m.occupancy, 0) / filteredMonths.length
  );
  const avgTurnTicket = totalAnnualTurns > 0 ? Math.round(totalAnnualRevenue / totalAnnualTurns) : 0;

  // Maximum monthly revenue for bar scaling
  const maxMonthValue = Math.max(
    ...filteredMonths.map((m) => (m.shiftRev + m.frigobarRev) * catMultiplier),
    1
  );

  // Per-room annual metrics simulation
  const roomMetrics = rooms
    .filter((r) => categoryFilter === 'all' || r.category === categoryFilter)
    .map((room) => {
      const category = categories.find((c) => c.id === room.category) || { name: 'Estándar' };
      const weightFactor =
        room.category === 'master_vip'
          ? 1.45
          : room.category === 'suite_jacuzzi'
          ? 1.25
          : room.category === 'tematica_sensual'
          ? 1.15
          : 0.85;

      const baseShift = Math.round(
        (totalAnnualShiftRev / rooms.length) * weightFactor
      );
      const baseFrigobar = Math.round(
        (totalAnnualFrigobarRev / rooms.length) * weightFactor
      );
      const total = baseShift + baseFrigobar;
      const turns = Math.round((totalAnnualTurns / rooms.length) * weightFactor);
      const avgDur = room.stats?.averageDurationMinutes || 115;

      return {
        id: room.id,
        number: room.number,
        categoryName: category.name,
        floor: room.floor,
        turnsCount: turns,
        shiftRevenue: baseShift,
        frigobarRevenue: baseFrigobar,
        totalRevenue: total,
        avgDuration: avgDur,
        frigobarRatio: total > 0 ? (baseFrigobar / total) * 100 : 0,
      };
    });

  const sortedRoomMetrics = [...roomMetrics].sort((a, b) => {
    if (sortField === 'total') return b.totalRevenue - a.totalRevenue;
    if (sortField === 'turns') return b.turnsCount - a.turnsCount;
    if (sortField === 'frigobar') return b.frigobarRevenue - a.frigobarRevenue;
    if (sortField === 'shift') return b.shiftRevenue - a.shiftRevenue;
    return 0;
  });

  const maxRoomRevenue = Math.max(...roomMetrics.map((r) => r.totalRevenue), 1);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Habitacion',
      'Categoria',
      'Piso',
      'Turnos Anuales',
      'Facturacion Turnos',
      'Facturacion Frigobar',
      'Facturacion Total',
      'Aporte Frigobar (%)',
      'Duracion Media (min)',
    ];
    const rows = sortedRoomMetrics.map((r) => [
      r.number,
      r.categoryName,
      r.floor,
      r.turnsCount,
      r.shiftRevenue,
      r.frigobarRevenue,
      r.totalRevenue,
      Math.round(r.frigobarRatio) + '%',
      r.avgDuration,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `reporte_anual_hotel_grow_${periodFilter}_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
      {/* Onboarding Banner */}
      <ModuleOnboardingBanner
        title="Métricas Anuales, Analítica & Simulación de Ingresos 📊"
        subtitle="Monitoreo financiero integral: histórico anualizado de turnos, ingresos de frigobar, horas pico y rentabilidad por suite"
        steps={[
          'Filtrá por período (Año completo, semestres, trimestres o fines de semana) y categoría.',
          'Inspeccioná la evolución mensual interactiva con desglose de turnos y frigobar.',
          'Analizá los horarios pico de mayor demanda en el mapa de calor (24 horas) para optimizar turnos de personal.',
        ]}
      />

      {/* FILTER CONTROL BAR */}
      <div
        style={{
          background: 'var(--brand-card)',
          border: '1px solid var(--brand-secondary)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.15rem 1.5rem',
          boxShadow: 'var(--shadow-soft)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-brown)', fontSize: '0.8rem', fontWeight: 800 }}>
            <Filter size={15} />
            <span>PERÍODO:</span>
          </div>

          <div className="filter-tabs-group" style={{ flexWrap: 'wrap' }}>
            <button
              className={`filter-tab ${periodFilter === 'year' ? 'active' : ''}`}
              onClick={() => setPeriodFilter('year')}
            >
              <span>Año 2025/2026 (12 Meses)</span>
            </button>
            <button
              className={`filter-tab ${periodFilter === 's1' ? 'active' : ''}`}
              onClick={() => setPeriodFilter('s1')}
            >
              <span>1er Semestre</span>
            </button>
            <button
              className={`filter-tab ${periodFilter === 's2' ? 'active' : ''}`}
              onClick={() => setPeriodFilter('s2')}
            >
              <span>2do Semestre</span>
            </button>
            <button
              className={`filter-tab ${periodFilter === 'q4' ? 'active' : ''}`}
              onClick={() => setPeriodFilter('q4')}
            >
              <span>Trimestre Q4</span>
            </button>
            <button
              className={`filter-tab ${periodFilter === 'weekends' ? 'active' : ''}`}
              onClick={() => setPeriodFilter('weekends')}
              title="Viernes, Sábados y Domingos"
            >
              <Flame size={13} color="#D97706" />
              <span>Fines de Semana</span>
            </button>
            <button
              className={`filter-tab ${periodFilter === 'weekdays' ? 'active' : ''}`}
              onClick={() => setPeriodFilter('weekdays')}
            >
              <span>Días de Semana</span>
            </button>
          </div>
        </div>

        {/* Category & Revenue Type Filters */}
        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            className="form-select"
            style={{ width: '180px', padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">Todas las Categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <button className="btn btn-secondary btn-sm" onClick={handleExportCSV} style={{ fontSize: '0.78rem' }}>
            <Download size={14} />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* TOP 4 EXECUTIVE KPI CARDS */}
      <div className="metrics-summary-grid">
        {/* Card 1: Facturación Total Anual */}
        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Facturación Acumulada</span>
            <div className="stat-icon-wrapper" style={{ background: 'var(--brand-yellow)', color: 'var(--brand-dark)' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <h3 className="stat-value" style={{ transition: 'all 0.3s ease' }}>
            {formatCurrency(totalAnnualRevenue)}
          </h3>
          <p className="stat-subtext">
            <TrendingUp size={13} color="var(--brand-emerald-primary)" />
            <span style={{ color: 'var(--brand-emerald-primary)', fontWeight: 700 }}>+18.4%</span>
            <span>vs período anterior</span>
          </p>
        </div>

        {/* Card 2: Ingresos por Turnos */}
        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Ingresos por Turnos</span>
            <div className="stat-icon-wrapper" style={{ background: '#E0E7FF', color: '#1E3A8A' }}>
              <Clock size={18} />
            </div>
          </div>
          <h3 className="stat-value">{formatCurrency(totalAnnualShiftRev)}</h3>
          <p className="stat-subtext">
            <span>{totalAnnualTurns.toLocaleString()} turnos ({Math.round((totalAnnualShiftRev / (totalAnnualRevenue || 1)) * 100)}% del total)</span>
          </p>
        </div>

        {/* Card 3: Ingresos por Frigobar */}
        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Ventas Frigobar & Extras</span>
            <div className="stat-icon-wrapper" style={{ background: '#F3E8FF', color: '#6B21A8' }}>
              <Wine size={18} />
            </div>
          </div>
          <h3 className="stat-value">{formatCurrency(totalAnnualFrigobarRev)}</h3>
          <p className="stat-subtext">
            <span>{Math.round((totalAnnualFrigobarRev / (totalAnnualRevenue || 1)) * 100)}% de aporte marginal</span>
          </p>
        </div>

        {/* Card 4: Ticket Promedio por Turno */}
        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Ticket Promedio / Turno</span>
            <div className="stat-icon-wrapper" style={{ background: 'var(--brand-cream)', color: 'var(--brand-dark)' }}>
              <Activity size={18} />
            </div>
          </div>
          <h3 className="stat-value">{formatCurrency(avgTurnTicket)}</h3>
          <p className="stat-subtext">
            <span>Ocupación media anual: <strong>{avgAnnualOccupancy}%</strong></span>
          </p>
        </div>
      </div>

      {/* MAIN INTERACTIVE CHART: MONTHLY REVENUE BARS WITH TOOLTIPS */}
      <div
        style={{
          background: 'var(--brand-card)',
          border: '1px solid var(--brand-secondary)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                Evolución de Ingresos y Ocupación Mensual
              </h3>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '0.15rem 0.5rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--brand-yellow)',
                  color: 'var(--brand-dark)',
                }}
              >
                {periodLabel}
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--brand-brown)', marginTop: '2px' }}>
              Pasa el cursor sobre cada barra mensual para ver el desglose exacto de turnos y consumos.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: 'var(--brand-dark)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '12px', height: '12px', background: 'var(--brand-brown)', borderRadius: '3px' }}></span>
              Turnos de Habitación
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '12px', height: '12px', background: '#90A88D', borderRadius: '3px' }}></span>
              Consumos Frigobar
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '12px', height: '3px', background: '#D97706', borderRadius: '2px' }}></span>
              Tasa Ocupación %
            </span>
          </div>
        </div>

        {/* Interactive Chart Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '1rem',
            height: '240px',
            paddingTop: '20px',
            borderBottom: '2px solid var(--brand-secondary)',
            position: 'relative',
          }}
        >
          {filteredMonths.map((m, idx) => {
            const shiftVal = m.shiftRev * catMultiplier;
            const frigobarVal = m.frigobarRev * catMultiplier;
            const totalMonth = shiftVal + frigobarVal;
            const heightPercent = isLoaded ? (totalMonth / maxMonthValue) * 100 : 0;
            const shiftHeightPercent = (shiftVal / totalMonth) * 100;
            const isHovered = hoveredMonth?.month === m.month;

            return (
              <div
                key={m.month}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-end',
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredMonth(m)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                {/* Tooltip Card on Hover */}
                {isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: `${heightPercent + 12}%`,
                      background: 'var(--brand-dark)',
                      color: '#FFFFFF',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.74rem',
                      boxShadow: 'var(--shadow-lg)',
                      zIndex: 30,
                      width: '180px',
                      pointerEvents: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    <strong style={{ color: 'var(--brand-yellow)', fontSize: '0.82rem' }}>
                      {m.fullName}
                    </strong>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Fact. Total:</span>
                      <strong style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(totalMonth)}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD8C8' }}>
                      <span>Turnos:</span>
                      <span>{formatCurrency(shiftVal)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD8C8' }}>
                      <span>Frigobar:</span>
                      <span>{formatCurrency(frigobarVal)}</span>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '0.2rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Ocupación:</span>
                      <strong style={{ color: '#FCD34D' }}>{m.occupancy}% ({m.turns} turnos)</strong>
                    </div>
                  </div>
                )}

                {/* Stacked Bar */}
                <div
                  style={{
                    width: '70%',
                    height: `${heightPercent}%`,
                    borderRadius: '6px 6px 0 0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isHovered ? 'scaleX(1.08)' : 'scaleX(1)',
                    boxShadow: isHovered ? '0 0 12px rgba(94, 123, 96, 0.4)' : 'none',
                  }}
                >
                  {/* Shift portion */}
                  <div
                    style={{
                      height: `${shiftHeightPercent}%`,
                      background: isHovered ? '#4A634D' : 'var(--brand-brown)',
                      transition: 'background 0.2s ease',
                    }}
                  ></div>
                  {/* Frigobar portion */}
                  <div
                    style={{
                      height: `${100 - shiftHeightPercent}%`,
                      background: isHovered ? '#A4BCA1' : '#90A88D',
                      transition: 'background 0.2s ease',
                    }}
                  ></div>
                </div>

                {/* Month Label */}
                <span
                  style={{
                    marginTop: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: isHovered ? 800 : 600,
                    color: isHovered ? 'var(--brand-dark)' : 'var(--brand-brown)',
                  }}
                >
                  {m.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* TWO-COLUMN SECTION: HEATMAP 24H & PRODUCT / PAYMENT MIX */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '1.25rem' }}>
        {/* HEATMAP: DEMANDA POR FRANJA HORARIA (24 Horas) */}
        <div
          style={{
            background: 'var(--brand-card)',
            border: '1px solid var(--brand-secondary)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-soft)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                Mapa de Calor: Ocupación por Hora del Día (24h)
              </h4>
              <p style={{ fontSize: '0.76rem', color: 'var(--brand-brown)' }}>
                Identificación de horarios pico de mayor rotación y recaudación
              </p>
            </div>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '0.2rem 0.55rem',
                borderRadius: 'var(--radius-full)',
                background: '#FEF3C7',
                color: '#92400E',
              }}
            >
              Pico: 22h a 03h (96%)
            </span>
          </div>

          {/* 24-hour visual bar strip */}
          <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '110px', paddingTop: '10px' }}>
            {HOURLY_OCCUPANCY_HEATMAP.map((h, i) => {
              const barHeight = isLoaded ? (h.rate / 100) * 85 : 0;
              const isPeak = h.rate >= 85;
              const isHovered = hoveredHour?.hour === h.hour;

              return (
                <div
                  key={h.hour}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'flex-end',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                  onMouseEnter={() => setHoveredHour(h)}
                  onMouseLeave={() => setHoveredHour(null)}
                >
                  {isHovered && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: `${barHeight + 15}px`,
                        background: 'var(--brand-dark)',
                        color: '#FFFFFF',
                        padding: '0.35rem 0.55rem',
                        borderRadius: '4px',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        zIndex: 20,
                        pointerEvents: 'none',
                      }}
                    >
                      {h.hour}: {h.rate}% Ocupación
                    </div>
                  )}

                  <div
                    style={{
                      width: '100%',
                      height: `${barHeight}px`,
                      borderRadius: '3px 3px 0 0',
                      background: isPeak
                        ? 'var(--brand-emerald-primary)'
                        : h.rate >= 50
                        ? 'var(--brand-brown)'
                        : 'var(--brand-secondary)',
                      opacity: isHovered ? 1 : 0.85,
                      transition: 'all 0.5s ease',
                      transform: isHovered ? 'scaleY(1.08)' : 'scaleY(1)',
                    }}
                  ></div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--brand-brown)', fontWeight: 700 }}>
            <span>00:00 Madrugada</span>
            <span>06:00 Mañana</span>
            <span>12:00 Mediodía</span>
            <span>18:00 Tarde</span>
            <span>23:00 Noche</span>
          </div>

          <div style={{ background: 'var(--brand-cream)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--brand-secondary)', fontSize: '0.78rem', color: 'var(--brand-dark)' }}>
            💡 <strong>Insight Operativo:</strong> El 74% de los turnos de 2h y 3h se inician entre las 20:30 y las 02:45. Se recomienda reforzar el personal de mucamas y reposición de frigobar en esa ventana horaria.
          </div>
        </div>

        {/* FRIGOBAR & PAYMENT BREAKDOWN */}
        <div
          style={{
            background: 'var(--brand-card)',
            border: '1px solid var(--brand-secondary)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-soft)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.15rem',
          }}
        >
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>
              Mix de Ventas Frigobar & Medios de Cobro
            </h4>
            <p style={{ fontSize: '0.76rem', color: 'var(--brand-brown)' }}>
              Distribución de consumos por categoría y métodos de recaudación
            </p>
          </div>

          {/* Progress Bars of Frigobar Categories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {FRIGOBAR_MIX_DATA.map((item) => (
              <div key={item.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--brand-dark)' }}>
                    {item.icon} {item.name}
                  </span>
                  <span style={{ fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--brand-brown)' }}>
                    {item.percent}% ({formatCurrency(item.amount * (periodFilter === 's1' || periodFilter === 's2' ? 0.5 : 1))})
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    background: 'var(--brand-cream)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: isLoaded ? `${item.percent}%` : '0%',
                      height: '100%',
                      background: item.color,
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Methods Pill Distribution */}
          <div style={{ borderTop: '1px solid var(--brand-secondary)', paddingTop: '0.85rem' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-brown)' }}>
              Distribución de Medios de Pago Anuales:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', marginTop: '0.4rem' }}>
              {PAYMENT_MIX_DATA.map((p) => (
                <div
                  key={p.name}
                  style={{
                    background: 'var(--brand-cream)',
                    padding: '0.5rem 0.65rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--brand-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.15rem',
                  }}
                >
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--brand-dark)' }}>{p.name}</span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--brand-brown)', fontFamily: 'var(--font-mono)' }}>
                    {p.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED PER-ROOM ANNUAL PERFORMANCE TABLE */}
      <div
        style={{
          background: 'var(--brand-card)',
          border: '1px solid var(--brand-secondary)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-soft)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
              Rentabilidad Anual Desglosada por Habitación
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--brand-brown)' }}>
              Comparativa de ingresos por turnos, compras de frigobar y porcentaje de aporte
            </p>
          </div>

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
        </div>

        {/* Visual Revenue Comparison Bar per Room */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '0.5rem 0' }}>
          {sortedRoomMetrics.map((r) => {
            const shiftPercent = (r.shiftRevenue / maxRoomRevenue) * 100;
            const frigobarPercent = (r.frigobarRevenue / maxRoomRevenue) * 100;

            return (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '100px', fontSize: '0.86rem', fontWeight: 800, flexShrink: 0 }}>
                  Hab {r.number}
                </div>

                <div
                  style={{
                    flex: 1,
                    height: '24px',
                    background: 'var(--brand-cream)',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    display: 'flex',
                  }}
                >
                  <div
                    style={{
                      width: isLoaded ? `${shiftPercent}%` : '0%',
                      background: 'var(--brand-brown)',
                      transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    title={`Turnos: ${formatCurrency(r.shiftRevenue)}`}
                  ></div>
                  <div
                    style={{
                      width: isLoaded ? `${frigobarPercent}%` : '0%',
                      background: '#90A88D',
                      transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    title={`Frigobar: ${formatCurrency(r.frigobarRevenue)}`}
                  ></div>
                </div>

                <div
                  style={{
                    width: '140px',
                    textAlign: 'right',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    fontSize: '0.94rem',
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

        {/* Full Table */}
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Habitación</th>
                <th>Categoría</th>
                <th style={{ textAlign: 'center' }}>Turnos Anuales</th>
                <th style={{ textAlign: 'right' }}>Ingresos Turnos</th>
                <th style={{ textAlign: 'right' }}>Ingresos Frigobar</th>
                <th style={{ textAlign: 'right' }}>Facturación Total</th>
                <th style={{ textAlign: 'center' }}>% Aporte Frigobar</th>
                <th style={{ textAlign: 'center' }}>Estadía Media</th>
              </tr>
            </thead>
            <tbody>
              {sortedRoomMetrics.map((r, index) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 800 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {index === 0 && <Award size={16} color="#D97706" />}
                      <span>Habitación {r.number}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--brand-brown)', fontWeight: 600 }}>{r.categoryName}</td>
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>{r.turnsCount.toLocaleString()} turnos</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                    {formatCurrency(r.shiftRevenue)}
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                    {formatCurrency(r.frigobarRevenue)}
                  </td>
                  <td
                    style={{
                      textAlign: 'right',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      color: 'var(--brand-emerald-primary)',
                      fontSize: '1rem',
                    }}
                  >
                    {formatCurrency(r.totalRevenue)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span
                      style={{
                        padding: '0.2rem 0.55rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.72rem',
                        background: 'var(--brand-yellow)',
                        color: 'var(--brand-dark)',
                        fontWeight: 800,
                        border: '1px solid var(--brand-secondary)',
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
    </div>
  );
};
