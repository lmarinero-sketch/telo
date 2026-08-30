// Datos iniciales 100% hardcodeados y autocontenidos para Demo y Deploy

export const ROOM_CATEGORIES = [
  {
    id: 'standard',
    name: 'Estándar Confort',
    description: 'Cama King Size, Smart TV 55", Ducha escocesa, Climatización digital',
    rates: {
      '1.5h': 18000,
      '2h': 22000,
      '3h': 28000,
      'pernocte': 48000,
      'extra_hour': 8000,
    },
    color: '#5E7B60',
  },
  {
    id: 'suite_jacuzzi',
    name: 'Suite Hidromasaje',
    description: 'Jacuzzi doble hidromasaje, Luces RGB ambientales, Bar privado, Smart TV 65"',
    rates: {
      '1.5h': 25000,
      '2h': 31000,
      '3h': 39000,
      'pernocte': 68000,
      'extra_hour': 12000,
    },
    color: '#2F5233',
  },
  {
    id: 'master_vip',
    name: 'Master VIP Loft',
    description: 'Doble nivel, Piscina climatizada privada, Caño pole dance, Jacuzzi XXL, Cochera privada',
    rates: {
      '1.5h': 35000,
      '2h': 44000,
      '3h': 56000,
      'pernocte': 95000,
      'extra_hour': 16000,
    },
    color: '#1E3A8A',
  },
  {
    id: 'tematica_sensual',
    name: 'Suite Temática Deluxe',
    description: 'Diseño sensorial Grow Labs, Espejos 360°, Sillón tántrico, Iluminación sincronizada',
    rates: {
      '1.5h': 30000,
      '2h': 38000,
      '3h': 48000,
      'pernocte': 82000,
      'extra_hour': 14000,
    },
    color: '#6B21A8',
  },
];

export const INITIAL_PRODUCTS = [
  // Bebidas con alcohol / Cervezas
  { id: 'p1', name: 'Cerveza Corona 330ml', category: 'Bebidas', price: 3800, stock: 45, icon: 'Beer' },
  { id: 'p2', name: 'Cerveza Heineken 330ml', category: 'Bebidas', price: 3500, stock: 38, icon: 'Beer' },
  { id: 'p3', name: 'Champagne Chandon Extra Brut 750ml', category: 'Vinos & Espumantes', price: 18500, stock: 16, icon: 'Wine' },
  { id: 'p4', name: 'Champagne Baron B Brut Nature 750ml', category: 'Vinos & Espumantes', price: 32000, stock: 8, icon: 'Wine' },
  { id: 'p5', name: 'Vino Rutini Malbec 750ml', category: 'Vinos & Espumantes', price: 21000, stock: 12, icon: 'Wine' },
  { id: 'p6', name: 'Fernet Branca 450ml + Coca 1.5L', category: 'Bebidas', price: 14500, stock: 20, icon: 'CupSoda' },
  
  // Bebidas sin alcohol / Energizantes
  { id: 'p7', name: 'Coca-Cola 500ml', category: 'Bebidas', price: 2200, stock: 60, icon: 'CupSoda' },
  { id: 'p8', name: 'Sprite 500ml', category: 'Bebidas', price: 2200, stock: 40, icon: 'CupSoda' },
  { id: 'p9', name: 'Agua Mineral Villavicencio 500ml', category: 'Bebidas', price: 1600, stock: 80, icon: 'Droplets' },
  { id: 'p10', name: 'Energizante Red Bull 250ml', category: 'Bebidas', price: 3900, stock: 50, icon: 'Zap' },
  { id: 'p11', name: 'Energizante Monster Energy 473ml', category: 'Bebidas', price: 4200, stock: 35, icon: 'Zap' },

  // Snacks & Chocolates
  { id: 'p12', name: 'Papas Pringles Original 137g', category: 'Snacks', price: 4900, stock: 30, icon: 'Package' },
  { id: 'p13', name: 'Chocolates Ferrero Rocher x3', category: 'Snacks', price: 4500, stock: 25, icon: 'Package' },
  { id: 'p14', name: 'Mani Salado Pehuamar 120g', category: 'Snacks', price: 2100, stock: 40, icon: 'Package' },
  { id: 'p15', name: 'Alfajor Havanna Mixto', category: 'Snacks', price: 2800, stock: 30, icon: 'Package' },

  // Amenities & Bienestar
  { id: 'p16', name: 'Preservativos Prime Skyn x3', category: 'Amenities', price: 4800, stock: 70, icon: 'Heart' },
  { id: 'p17', name: 'Gel Lubricante Prime Frutilla 50g', category: 'Amenities', price: 5400, stock: 35, icon: 'Heart' },
  { id: 'p18', name: 'Sales de Baño Efervescentes Jacuzzi', category: 'Amenities', price: 3900, stock: 45, icon: 'Sparkles' },
  { id: 'p19', name: 'Kit Sensual Grow Labs (Antifaz + Aceite + Pluma)', category: 'Amenities', price: 12500, stock: 15, icon: 'Heart' },
];

export const getFreshInitialRooms = () => {
  const now = Date.now();

  return [
    {
      id: 101,
      number: '101',
      name: 'Habitación 101',
      category: 'standard',
      floor: 1,
      status: 'occupied',
      iot: {
        doorLocked: true,
        doorSensorOpen: false,
        powerRelayOn: true,
        batteryLevel: 94,
        lastEvent: 'Cerradura bloqueada (Huésped en habitación)',
        lastEventTime: new Date(now - 45 * 60 * 1000).toISOString(),
      },
      currentShift: {
        id: 'shift-101-1',
        shiftType: '2h',
        startTime: new Date(now - 55 * 60 * 1000).toISOString(), // started 55m ago
        endTime: new Date(now + 65 * 60 * 1000).toISOString(),   // 65m remaining
        rateAmount: 22000,
        vehiclePlate: 'AF 342 LK',
        guestsCount: 2,
        consumptions: [
          { productId: 'p1', name: 'Cerveza Corona 330ml', price: 3800, quantity: 2, timestamp: new Date(now - 30 * 60 * 1000).toISOString() },
          { productId: 'p12', name: 'Papas Pringles Original 137g', price: 4900, quantity: 1, timestamp: new Date(now - 30 * 60 * 1000).toISOString() },
        ],
        notes: 'Solicitó hielo y copas',
      },
      stats: {
        totalTurnsCount: 14,
        totalShiftRevenue: 308000,
        totalFrigobarRevenue: 84000,
        averageDurationMinutes: 110,
      },
    },
    {
      id: 102,
      number: '102',
      name: 'Habitación 102',
      category: 'standard',
      floor: 1,
      status: 'occupied',
      iot: {
        doorLocked: true,
        doorSensorOpen: false,
        powerRelayOn: true,
        batteryLevel: 88,
        lastEvent: 'Telemetría: Alimentación eléctrica activa',
        lastEventTime: new Date(now - 80 * 60 * 1000).toISOString(),
      },
      currentShift: {
        id: 'shift-102-1',
        shiftType: '1.5h',
        startTime: new Date(now - 82 * 60 * 1000).toISOString(), // started 82m ago (8m remaining -> WARNING state)
        endTime: new Date(now + 8 * 60 * 1000).toISOString(),
        rateAmount: 18000,
        vehiclePlate: 'AD 981 OP',
        guestsCount: 2,
        consumptions: [
          { productId: 'p7', name: 'Coca-Cola 500ml', price: 2200, quantity: 2, timestamp: new Date(now - 50 * 60 * 1000).toISOString() },
          { productId: 'p16', name: 'Preservativos Prime Skyn x3', price: 4800, quantity: 1, timestamp: new Date(now - 50 * 60 * 1000).toISOString() },
        ],
        notes: '',
      },
      stats: {
        totalTurnsCount: 18,
        totalShiftRevenue: 378000,
        totalFrigobarRevenue: 92000,
        averageDurationMinutes: 95,
      },
    },
    {
      id: 103,
      number: '103',
      name: 'Habitación 103',
      category: 'standard',
      floor: 1,
      status: 'available',
      iot: {
        doorLocked: true,
        doorSensorOpen: false,
        powerRelayOn: false,
        batteryLevel: 98,
        lastEvent: 'Standby - Modo ahorro de energía activado',
        lastEventTime: new Date(now - 120 * 60 * 1000).toISOString(),
      },
      currentShift: null,
      stats: {
        totalTurnsCount: 16,
        totalShiftRevenue: 352000,
        totalFrigobarRevenue: 76000,
        averageDurationMinutes: 105,
      },
    },
    {
      id: 104,
      number: '104',
      name: 'Habitación 104',
      category: 'standard',
      floor: 1,
      status: 'cleaning',
      cleaning: {
        startedAt: new Date(now - 14 * 60 * 1000).toISOString(),
        staff: 'Claudia R.',
        notes: 'Cambio de sábanas y reposición de frigobar',
      },
      iot: {
        doorLocked: false,
        doorSensorOpen: true,
        powerRelayOn: true,
        batteryLevel: 91,
        lastEvent: 'Puerta abierta por personal de limpieza',
        lastEventTime: new Date(now - 14 * 60 * 1000).toISOString(),
      },
      currentShift: null,
      stats: {
        totalTurnsCount: 15,
        totalShiftRevenue: 330000,
        totalFrigobarRevenue: 81000,
        averageDurationMinutes: 100,
      },
    },
    {
      id: 201,
      number: '201',
      name: 'Suite Jacuzzi 201',
      category: 'suite_jacuzzi',
      floor: 2,
      status: 'occupied',
      iot: {
        doorLocked: true,
        doorSensorOpen: false,
        powerRelayOn: true,
        batteryLevel: 85,
        lastEvent: 'Hidromasaje y luces RGB ambientales activas',
        lastEventTime: new Date(now - 95 * 60 * 1000).toISOString(),
      },
      currentShift: {
        id: 'shift-201-1',
        shiftType: '1.5h',
        startTime: new Date(now - 96 * 60 * 1000).toISOString(), // started 96m ago -> VENCIDA (-6 min overdue)
        endTime: new Date(now - 6 * 60 * 1000).toISOString(),
        rateAmount: 25000,
        vehiclePlate: 'AE 554 TY',
        guestsCount: 2,
        consumptions: [
          { productId: 'p3', name: 'Champagne Chandon Extra Brut 750ml', price: 18500, quantity: 1, timestamp: new Date(now - 60 * 60 * 1000).toISOString() },
          { productId: 'p18', name: 'Sales de Baño Efervescentes Jacuzzi', price: 3900, quantity: 2, timestamp: new Date(now - 80 * 60 * 1000).toISOString() },
          { productId: 'p13', name: 'Chocolates Ferrero Rocher x3', price: 4500, quantity: 1, timestamp: new Date(now - 60 * 60 * 1000).toISOString() },
        ],
        notes: 'Consultar extensión por intercomunicador',
      },
      stats: {
        totalTurnsCount: 22,
        totalShiftRevenue: 682000,
        totalFrigobarRevenue: 245000,
        averageDurationMinutes: 135,
      },
    },
    {
      id: 202,
      number: '202',
      name: 'Suite Jacuzzi 202',
      category: 'suite_jacuzzi',
      floor: 2,
      status: 'available',
      iot: {
        doorLocked: true,
        doorSensorOpen: false,
        powerRelayOn: false,
        batteryLevel: 96,
        lastEvent: 'Standby - Lista para ingreso de huésped',
        lastEventTime: new Date(now - 40 * 60 * 1000).toISOString(),
      },
      currentShift: null,
      stats: {
        totalTurnsCount: 20,
        totalShiftRevenue: 620000,
        totalFrigobarRevenue: 198000,
        averageDurationMinutes: 130,
      },
    },
    {
      id: 203,
      number: '203',
      name: 'Suite Jacuzzi 203',
      category: 'suite_jacuzzi',
      floor: 2,
      status: 'occupied',
      iot: {
        doorLocked: true,
        doorSensorOpen: false,
        powerRelayOn: true,
        batteryLevel: 90,
        lastEvent: 'Ingreso de huésped confirmado',
        lastEventTime: new Date(now - 20 * 60 * 1000).toISOString(),
      },
      currentShift: {
        id: 'shift-203-1',
        shiftType: '3h',
        startTime: new Date(now - 20 * 60 * 1000).toISOString(),
        endTime: new Date(now + 160 * 60 * 1000).toISOString(), // 160 min remaining
        rateAmount: 39000,
        vehiclePlate: 'AB 112 WW',
        guestsCount: 2,
        consumptions: [
          { productId: 'p10', name: 'Energizante Red Bull 250ml', price: 3900, quantity: 2, timestamp: new Date(now - 10 * 60 * 1000).toISOString() },
        ],
        notes: '',
      },
      stats: {
        totalTurnsCount: 19,
        totalShiftRevenue: 598000,
        totalFrigobarRevenue: 182000,
        averageDurationMinutes: 140,
      },
    },
    {
      id: 301,
      number: '301',
      name: 'Master VIP Loft 301',
      category: 'master_vip',
      floor: 3,
      status: 'occupied',
      iot: {
        doorLocked: true,
        doorSensorOpen: false,
        powerRelayOn: true,
        batteryLevel: 99,
        lastEvent: 'Portón cochera privada cerrado',
        lastEventTime: new Date(now - 40 * 60 * 1000).toISOString(),
      },
      currentShift: {
        id: 'shift-301-1',
        shiftType: '3h',
        startTime: new Date(now - 40 * 60 * 1000).toISOString(),
        endTime: new Date(now + 140 * 60 * 1000).toISOString(),
        rateAmount: 56000,
        vehiclePlate: 'AG 889 ZZ',
        guestsCount: 2,
        consumptions: [
          { productId: 'p4', name: 'Champagne Baron B Brut Nature 750ml', price: 32000, quantity: 1, timestamp: new Date(now - 25 * 60 * 1000).toISOString() },
          { productId: 'p19', name: 'Kit Sensual Grow Labs', price: 12500, quantity: 1, timestamp: new Date(now - 25 * 60 * 1000).toISOString() },
          { productId: 'p9', name: 'Agua Mineral Villavicencio 500ml', price: 1600, quantity: 2, timestamp: new Date(now - 25 * 60 * 1000).toISOString() },
        ],
        notes: 'VIP - Discreción total requerida',
      },
      stats: {
        totalTurnsCount: 25,
        totalShiftRevenue: 1180000,
        totalFrigobarRevenue: 490000,
        averageDurationMinutes: 165,
      },
    },
    {
      id: 302,
      number: '302',
      name: 'Master VIP Loft 302',
      category: 'master_vip',
      floor: 3,
      status: 'available',
      iot: {
        doorLocked: true,
        doorSensorOpen: false,
        powerRelayOn: false,
        batteryLevel: 92,
        lastEvent: 'Standby - Climatización en espera',
        lastEventTime: new Date(now - 200 * 60 * 1000).toISOString(),
      },
      currentShift: null,
      stats: {
        totalTurnsCount: 21,
        totalShiftRevenue: 980000,
        totalFrigobarRevenue: 410000,
        averageDurationMinutes: 160,
      },
    },
    {
      id: 401,
      number: '401',
      name: 'Suite Temática Deluxe 401',
      category: 'tematica_sensual',
      floor: 4,
      status: 'available',
      iot: {
        doorLocked: true,
        doorSensorOpen: false,
        powerRelayOn: false,
        batteryLevel: 95,
        lastEvent: 'Standby - Sistema sensorial preparado',
        lastEventTime: new Date(now - 150 * 60 * 1000).toISOString(),
      },
      currentShift: null,
      stats: {
        totalTurnsCount: 24,
        totalShiftRevenue: 864000,
        totalFrigobarRevenue: 320000,
        averageDurationMinutes: 125,
      },
    },
  ];
};

export const getFreshInitialCashRegister = () => {
  const now = Date.now();
  return {
    initialCash: 150000,
    movements: [
      { id: 'm1', type: 'in', method: 'cash', amount: 35000, concept: 'Cobro Turno Hab 103 (Efectivo)', timestamp: new Date(now - 180 * 60 * 1000).toISOString() },
      { id: 'm2', type: 'in', method: 'transfer', amount: 56000, concept: 'Cobro Turno Hab 202 (Mercado Pago)', timestamp: new Date(now - 140 * 60 * 1000).toISOString() },
      { id: 'm3', type: 'in', method: 'card', amount: 48000, concept: 'Cobro Turno + Frigobar Hab 104 (Tarjeta)', timestamp: new Date(now - 70 * 60 * 1000).toISOString() },
      { id: 'm4', type: 'out', method: 'cash', amount: 15000, concept: 'Retiro caja chica - Insumos lavandería', timestamp: new Date(now - 100 * 60 * 1000).toISOString() },
    ],
  };
};

export const getFreshHistoricalTurns = () => {
  const now = Date.now();
  return [
    {
      id: 'hist-1',
      roomNumber: '101',
      category: 'standard',
      shiftType: '2h',
      startTime: new Date(now - 6 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(now - 4 * 60 * 60 * 1000).toISOString(),
      rateAmount: 22000,
      frigobarAmount: 9800,
      totalAmount: 31800,
      paymentMethod: 'cash',
      vehiclePlate: 'AD 771 BC',
    },
    {
      id: 'hist-2',
      roomNumber: '201',
      category: 'suite_jacuzzi',
      shiftType: '3h',
      startTime: new Date(now - 8 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(now - 5 * 60 * 60 * 1000).toISOString(),
      rateAmount: 39000,
      frigobarAmount: 26900,
      totalAmount: 65900,
      paymentMethod: 'transfer',
      vehiclePlate: 'AE 902 MN',
    },
    {
      id: 'hist-3',
      roomNumber: '301',
      category: 'master_vip',
      shiftType: 'pernocte',
      startTime: new Date(now - 18 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(now - 10 * 60 * 60 * 1000).toISOString(),
      rateAmount: 95000,
      frigobarAmount: 48500,
      totalAmount: 143500,
      paymentMethod: 'card',
      vehiclePlate: 'AF 120 LK',
    },
  ];
};

export const INITIAL_ROOMS = getFreshInitialRooms();
export const INITIAL_CASH_REGISTER = getFreshInitialCashRegister();
export const INITIAL_HISTORICAL_TURNS = getFreshHistoricalTurns();
