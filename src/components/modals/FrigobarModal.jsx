import React, { useState } from 'react';
import {
  X,
  Wine,
  Plus,
  Minus,
  Trash2,
  Beer,
  Sparkles,
  ShoppingBag,
  Heart,
  Droplets,
  Zap,
  CupSoda,
  Search,
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { formatCurrency } from '../../utils/formatters';

export const FrigobarModal = ({ room, onClose }) => {
  const { products, addFrigobarConsumption, removeFrigobarConsumption } = useHotel();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  if (!room || !room.currentShift) return null;

  const consumptions = room.currentShift.consumptions || [];
  const currentTotal = consumptions.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const categories = ['Todos', 'Bebidas', 'Vinos & Espumantes', 'Snacks', 'Amenities'];

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getProductIcon = (iconName) => {
    switch (iconName) {
      case 'Beer': return <Beer size={18} />;
      case 'Wine': return <Wine size={18} />;
      case 'Heart': return <Heart size={18} />;
      case 'Droplets': return <Droplets size={18} />;
      case 'Zap': return <Zap size={18} />;
      case 'CupSoda': return <CupSoda size={18} />;
      case 'Sparkles': return <Sparkles size={18} />;
      default: return <ShoppingBag size={18} />;
    }
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
              <Wine size={22} />
            </div>
            <div>
              <h3>Consumos de Frigobar & Room Service</h3>
              <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Cargar consumos a la <strong>Habitación {room.number}</strong>
              </span>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Layout */}
        <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem', padding: '1.5rem' }}>
          {/* Left: Product Catalog */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {/* Search & Categories */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={15} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '32px' }}
                  placeholder="Buscar producto o bebida..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '0.65rem',
                maxHeight: '380px',
                overflowY: 'auto',
                paddingRight: '0.3rem',
              }}
            >
              {filteredProducts.map((p) => {
                const isOutOfStock = p.stock <= 0;
                return (
                  <div
                    key={p.id}
                    style={{
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem',
                      opacity: isOutOfStock ? 0.5 : 1,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ color: 'var(--grow-green-500)' }}>
                        {getProductIcon(p.icon)}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: isOutOfStock ? 'var(--status-overdue)' : 'var(--text-muted)' }}>
                        Stock: {p.stock}
                      </span>
                    </div>

                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                      {p.name}
                    </strong>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.3rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.86rem', fontWeight: 700, color: 'var(--grow-green-500)' }}>
                        {formatCurrency(p.price)}
                      </span>

                      <button
                        className="btn btn-primary btn-sm"
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}
                        disabled={isOutOfStock}
                        onClick={() => addFrigobarConsumption(room.id, p.id, 1)}
                      >
                        <Plus size={13} />
                        <span>Agregar</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Current Room Basket */}
          <div
            style={{
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <h4 style={{ fontSize: '0.92rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Cuenta de Frigobar</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {consumptions.length} ítems
              </span>
            </h4>

            {/* List */}
            <div style={{ flex: 1, maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {consumptions.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.6rem 0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.3rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 600 }}>
                    <span>{item.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--grow-green-500)' }}>
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {formatCurrency(item.price)} c/u
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <button
                        type="button"
                        className="btn btn-secondary btn-icon-only"
                        style={{ width: '24px', height: '24px' }}
                        onClick={() => removeFrigobarConsumption(room.id, item.productId, 1)}
                      >
                        <Minus size={12} />
                      </button>

                      <strong style={{ fontSize: '0.85rem', width: '20px', textAlign: 'center' }}>
                        {item.quantity}
                      </strong>

                      <button
                        type="button"
                        className="btn btn-secondary btn-icon-only"
                        style={{ width: '24px', height: '24px' }}
                        onClick={() => addFrigobarConsumption(room.id, item.productId, 1)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {consumptions.length === 0 && (
                <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                  No hay consumos añadidos en este turno. Haz click en "Agregar" en el catálogo.
                </div>
              )}
            </div>

            {/* Total Footer */}
            <div
              style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Subtotal Frigobar:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--grow-green-500)' }}>
                {formatCurrency(currentTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Listo / Guardar Consumos
          </button>
        </div>
      </div>
    </div>
  );
};
