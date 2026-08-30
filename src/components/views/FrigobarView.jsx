import React, { useState } from 'react';
import {
  Wine,
  Package,
  Plus,
  AlertTriangle,
  Search,
  DollarSign,
  TrendingUp,
  Beer,
  Heart,
  Droplets,
  Zap,
  CupSoda,
  Sparkles,
  Check,
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { ModuleOnboardingBanner } from '../common/ModuleOnboardingBanner';
import { formatCurrency } from '../../utils/formatters';

export const FrigobarView = () => {
  const { products, updateProductStock, addNewProduct } = useHotel();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Bebidas');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdStock, setNewProdStock] = useState('');
  const [newProdIcon, setNewProdIcon] = useState('Wine');

  const categories = ['Todos', 'Bebidas', 'Vinos & Espumantes', 'Snacks', 'Amenities'];

  // Metrics
  const totalStockItems = products.reduce((acc, p) => acc + p.stock, 0);
  const totalInventoryValue = products.reduce((acc, p) => acc + p.stock * p.price, 0);
  const lowStockCount = products.filter((p) => p.stock <= 10).length;

  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    addNewProduct({
      name: newProdName,
      category: newProdCategory,
      price: Number(newProdPrice),
      stock: Number(newProdStock || 0),
      icon: newProdIcon,
    });

    setNewProdName('');
    setNewProdPrice('');
    setNewProdStock('');
    setShowAddModal(false);
  };

  const getProductIcon = (iconName) => {
    switch (iconName) {
      case 'Beer': return <Beer size={16} />;
      case 'Wine': return <Wine size={16} />;
      case 'Heart': return <Heart size={16} />;
      case 'Droplets': return <Droplets size={16} />;
      case 'Zap': return <Zap size={16} />;
      case 'CupSoda': return <CupSoda size={16} />;
      case 'Sparkles': return <Sparkles size={16} />;
      default: return <Package size={16} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Onboarding Banner */}
      <ModuleOnboardingBanner
        title="Gestión de Frigobar, Bebidas & Amenities"
        subtitle="Control de inventario por habitación, valorización de stock y alertas automáticas de reposición"
        steps={[
          'Revisá el valor total del inventario y las alertas de ítems con bajo stock.',
          'Ajustá cantidades rápidamente con los botones (+1, -1, +12 pack).',
          'Registrá nuevos productos al catálogo con precios de venta y categorías.',
        ]}
      />

      {/* Top Stat Cards */}
      <div className="metrics-summary-grid">
        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Unidades en Inventario</span>
            <div className="stat-icon-wrapper" style={{ background: 'var(--brand-yellow)', color: 'var(--brand-dark)' }}>
              <Package size={18} />
            </div>
          </div>
          <h3 className="stat-value">{totalStockItems}</h3>
          <p className="stat-subtext">
            <span>{products.length} productos dados de alta</span>
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Valorización de Stock</span>
            <div className="stat-icon-wrapper" style={{ background: 'var(--brand-cream)', color: 'var(--brand-dark)' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <h3 className="stat-value">{formatCurrency(totalInventoryValue)}</h3>
          <p className="stat-subtext">
            <span>Precio de venta al huésped</span>
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-title">Alertas de Stock Bajo</span>
            <div
              className="stat-icon-wrapper"
              style={{
                background: lowStockCount > 0 ? '#FEF3C7' : 'var(--brand-cream)',
                color: lowStockCount > 0 ? '#92400E' : 'var(--brand-dark)',
              }}
            >
              <AlertTriangle size={18} />
            </div>
          </div>
          <h3 className="stat-value" style={{ color: lowStockCount > 0 ? '#92400E' : 'inherit' }}>
            {lowStockCount} ítems
          </h3>
          <p className="stat-subtext">
            <span>{lowStockCount > 0 ? 'Requieren reposición en almacén' : 'Stock en niveles óptimos'}</span>
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="dashboard-header-bar">
        <div className="filter-tabs-group">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '11px', color: 'var(--brand-brown)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '30px', padding: '0.45rem 0.75rem 0.45rem 30px', fontSize: '0.82rem' }}
              placeholder="Buscar producto o bebida..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={15} />
            <span>Nuevo Producto</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio Venta</th>
              <th>Stock Actual</th>
              <th>Estado de Stock</th>
              <th style={{ textAlign: 'right' }}>Ajustar Stock Rápido</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => {
              const isLow = p.stock <= 10;
              const isOut = p.stock === 0;

              return (
                <tr key={p.id}>
                  <td style={{ fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <span style={{ color: 'var(--brand-brown)' }}>{getProductIcon(p.icon)}</span>
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '0.2rem 0.55rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.74rem',
                        background: 'var(--brand-cream)',
                        color: 'var(--brand-dark)',
                        fontWeight: 600,
                      }}
                    >
                      {p.category}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--brand-emerald-primary)' }}>
                    {formatCurrency(p.price)}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem' }}>
                    {p.stock} u.
                  </td>
                  <td>
                    {isOut ? (
                      <span className="status-badge overdue">Agotado (0)</span>
                    ) : isLow ? (
                      <span className="status-badge warning">Bajo ({p.stock})</span>
                    ) : (
                      <span className="status-badge available">Normal</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.3rem', alignItems: 'center' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.74rem' }}
                        onClick={() => updateProductStock(p.id, p.stock - 1)}
                        disabled={p.stock <= 0}
                      >
                        -1
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.74rem' }}
                        onClick={() => updateProductStock(p.id, p.stock + 1)}
                      >
                        +1
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ padding: '0.25rem 0.55rem', fontSize: '0.74rem' }}
                        onClick={() => updateProductStock(p.id, p.stock + 12)}
                        title="Sumar 12 unidades (pack)"
                      >
                        +12 pack
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal to add new product */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Registrar Nuevo Producto en Frigobar</h3>
            </div>
            <form onSubmit={handleCreateProduct}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Nombre del Producto:</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ej: Champagne Baron B 750ml"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div className="form-group">
                    <label className="form-label">Categoría:</label>
                    <select
                      className="form-select"
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value)}
                    >
                      <option value="Bebidas">Bebidas</option>
                      <option value="Vinos & Espumantes">Vinos & Espumantes</option>
                      <option value="Snacks">Snacks</option>
                      <option value="Amenities">Amenities & Bienestar</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Ícono:</label>
                    <select
                      className="form-select"
                      value={newProdIcon}
                      onChange={(e) => setNewProdIcon(e.target.value)}
                    >
                      <option value="Wine">Vino / Champagne</option>
                      <option value="Beer">Cerveza</option>
                      <option value="CupSoda">Gaseosa</option>
                      <option value="Droplets">Agua</option>
                      <option value="Zap">Energizante</option>
                      <option value="Heart">Amenities / Sensual</option>
                      <option value="Sparkles">Spa / Sales</option>
                      <option value="Package">Snacks</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div className="form-group">
                    <label className="form-label">Precio de Venta ($):</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Ej: 5500"
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Stock Inicial:</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Ej: 24"
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={15} />
                  <span>Guardar Producto</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
