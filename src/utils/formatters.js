// Formateadores de moneda, fecha y duraciones

export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '$ 0';
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount).replace('ARS', '$').trim();
};

export const formatTime = (dateInput) => {
  if (!dateInput) return '--:--';
  const date = new Date(dateInput);
  return date.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export const formatDate = (dateInput) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatFullDateTime = (dateInput) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  return `${formatDate(date)} ${formatTime(date)}`;
};

export const formatDurationMs = (ms) => {
  if (ms < 0) ms = 0;
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n) => String(n).padStart(2, '0');

  if (hours > 0) {
    return `${hours}h ${pad(minutes)}m ${pad(seconds)}s`;
  }
  return `${pad(minutes)}m ${pad(seconds)}s`;
};

export const calculateTimeRemaining = (endTime) => {
  if (!endTime) return { remainingMs: 0, isOverdue: false, formatted: '00:00' };
  const now = Date.now();
  const diff = new Date(endTime).getTime() - now;

  if (diff <= 0) {
    const overdueMs = Math.abs(diff);
    return {
      remainingMs: 0,
      overdueMs,
      isOverdue: true,
      formatted: `+${formatDurationMs(overdueMs)}`,
    };
  }

  return {
    remainingMs: diff,
    overdueMs: 0,
    isOverdue: false,
    formatted: formatDurationMs(diff),
  };
};
