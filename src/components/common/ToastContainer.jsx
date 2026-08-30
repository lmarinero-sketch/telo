import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useHotel();

  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {isSuccess && <CheckCircle2 size={20} color="var(--grow-green-500)" />}
            {isWarning && <AlertTriangle size={20} color="var(--status-warning)" />}
            {!isSuccess && !isWarning && <Info size={20} color="#38bdf8" />}

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <strong style={{ fontSize: '0.88rem' }}>{toast.title}</strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {toast.message}
              </span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
