import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ROOM_CATEGORIES,
  INITIAL_PRODUCTS,
  getFreshInitialRooms,
  getFreshInitialCashRegister,
  getFreshHistoricalTurns,
} from '../data/initialData';
import { soundFx } from '../utils/audioAlerts';

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  // Persistence with LocalStorage
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem('grow_motel_rooms');
    return saved ? JSON.parse(saved) : getFreshInitialRooms();
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('grow_motel_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cashRegister, setCashRegister] = useState(() => {
    const saved = localStorage.getItem('grow_motel_cash');
    return saved ? JSON.parse(saved) : getFreshInitialCashRegister();
  });

  const [historicalTurns, setHistoricalTurns] = useState(() => {
    const saved = localStorage.getItem('grow_motel_history');
    return saved ? JSON.parse(saved) : getFreshHistoricalTurns();
  });

  const [iotLogs, setIotLogs] = useState(() => {
    const saved = localStorage.getItem('grow_motel_iot_logs');
    if (saved) return JSON.parse(saved);
    const now = Date.now();
    return [
      { id: 'l1', time: new Date(now - 5 * 60 * 1000).toISOString(), room: '101', event: 'Sensor magnético: Puerta cerrada', level: 'info' },
      { id: 'l2', time: new Date(now - 12 * 60 * 1000).toISOString(), room: '104', event: 'Cerradura desbloqueada (Limpieza)', level: 'success' },
      { id: 'l3', time: new Date(now - 20 * 60 * 1000).toISOString(), room: '203', event: 'Relé de energía activado (Ingreso huésped)', level: 'info' },
      { id: 'l4', time: new Date(now - 45 * 60 * 1000).toISOString(), room: '301', event: 'Portón cochera VIP cerrado con éxito', level: 'info' },
    ];
  });

  const [toasts, setToasts] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'frigobar', 'iot', 'metrics', 'cleaning', 'cash', 'manuals'
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem('grow_motel_sidebar_collapsed') === 'true';
  });
  const [nowTick, setNowTick] = useState(Date.now());

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('grow_motel_sidebar_collapsed', String(next));
      return next;
    });
  };

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('grow_motel_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('grow_motel_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('grow_motel_cash', JSON.stringify(cashRegister));
  }, [cashRegister]);

  useEffect(() => {
    localStorage.setItem('grow_motel_history', JSON.stringify(historicalTurns));
  }, [historicalTurns]);

  useEffect(() => {
    localStorage.setItem('grow_motel_iot_logs', JSON.stringify(iotLogs));
  }, [iotLogs]);

  // Tick timer every 1 second to recalculate live states
  useEffect(() => {
    const timer = setInterval(() => {
      setNowTick(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Periodic simulated IoT telemetry event to make the demo feel alive
  useEffect(() => {
    const telemetryEvents = [
      { room: '101', event: 'Heartbeat ESP32: Señal WiFi -58dBm (Óptima)' },
      { room: '201', event: 'Telemetría: Climatización estabilizada en 22.5°C' },
      { room: '301', event: 'Sensor Jacuzzi: Nivel de agua y filtrado OK' },
      { room: '103', event: 'Modo Eco: Consumo eléctrico 0.02 kWh (Standby)' },
      { room: '203', event: 'Sensor magnético: Cerradura asegurada' },
      { room: '401', event: 'Gateway: Ping MQTT completado (14ms)' },
    ];

    const telemetryTimer = setInterval(() => {
      const randomEvent = telemetryEvents[Math.floor(Math.random() * telemetryEvents.length)];
      addIotLog(randomEvent.room, randomEvent.event, 'info');
    }, 35000);

    return () => clearInterval(telemetryTimer);
  }, []);

  // Show Toast notification helper
  const addToast = (title, message, type = 'info') => {
    const id = 'toast-' + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openTutorialModal = () => setIsTutorialOpen(true);
  const closeTutorialModal = () => setIsTutorialOpen(false);

  // Add IoT Log helper
  const addIotLog = (roomNumber, event, level = 'info') => {
    const newLog = {
      id: 'log-' + Math.random().toString(36).substr(2, 9),
      time: new Date().toISOString(),
      room: roomNumber,
      event,
      level,
    };
    setIotLogs((prev) => [newLog, ...prev.slice(0, 49)]); // Keep last 50 logs
  };

  // Reset demo sample data
  const resetDemoData = () => {
    const freshRooms = getFreshInitialRooms();
    const freshCash = getFreshInitialCashRegister();
    const freshHistory = getFreshHistoricalTurns();

    setRooms(freshRooms);
    setProducts(INITIAL_PRODUCTS);
    setCashRegister(freshCash);
    setHistoricalTurns(freshHistory);

    localStorage.setItem('grow_motel_rooms', JSON.stringify(freshRooms));
    localStorage.setItem('grow_motel_products', JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem('grow_motel_cash', JSON.stringify(freshCash));
    localStorage.setItem('grow_motel_history', JSON.stringify(freshHistory));
    localStorage.removeItem('grow_motel_iot_logs');

    addToast('Datos Demo Restaurados', 'El sistema ha cargado los datos iniciales de demostración', 'success');
  };

  // Check-In Action
  const checkInRoom = (roomId, shiftData) => {
    const startTime = new Date();
    let durationMinutes = 90; // default 1.5h
    if (shiftData.shiftType === '1.5h') durationMinutes = 90;
    else if (shiftData.shiftType === '2h') durationMinutes = 120;
    else if (shiftData.shiftType === '3h') durationMinutes = 180;
    else if (shiftData.shiftType === 'pernocte') durationMinutes = 720; // 12h
    else if (shiftData.customMinutes) durationMinutes = parseInt(shiftData.customMinutes, 10);

    const endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000);

    setRooms((prev) =>
      prev.map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            status: 'occupied',
            iot: {
              ...room.iot,
              doorLocked: false,
              powerRelayOn: true,
              lastEvent: 'Cerradura desbloqueada para ingreso de huésped',
              lastEventTime: startTime.toISOString(),
            },
            currentShift: {
              id: 'shift-' + roomId + '-' + Date.now(),
              shiftType: shiftData.shiftType,
              startTime: startTime.toISOString(),
              endTime: endTime.toISOString(),
              rateAmount: Number(shiftData.rateAmount),
              vehiclePlate: shiftData.vehiclePlate ? shiftData.vehiclePlate.toUpperCase() : '',
              guestsCount: shiftData.guestsCount || 2,
              consumptions: [],
              notes: shiftData.notes || '',
            },
          };
        }
        return room;
      })
    );

    const targetRoom = rooms.find((r) => r.id === roomId);
    addIotLog(targetRoom ? targetRoom.number : roomId, `Turno iniciado (${shiftData.shiftType}). Energía activada y puerta desbloqueada.`, 'success');
    addToast('Ingreso Registrado', `Habitación ${targetRoom?.number} ocupada con turno de ${shiftData.shiftType}`, 'success');
    soundFx.playSuccess();
  };

  // Check-Out Action & Bill settlement
  const checkOutRoom = (roomId, { paymentMethod, discount = 0, notes = '', autoSendToCleaning = true }) => {
    const room = rooms.find((r) => r.id === roomId);
    if (!room || !room.currentShift) return;

    const shift = room.currentShift;
    const frigobarTotal = shift.consumptions.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shiftTotal = shift.rateAmount;
    const finalAmount = Math.max(0, shiftTotal + frigobarTotal - Number(discount));

    // Save historical record
    const historyEntry = {
      id: 'hist-' + Date.now(),
      roomNumber: room.number,
      category: room.category,
      shiftType: shift.shiftType,
      startTime: shift.startTime,
      endTime: new Date().toISOString(),
      rateAmount: shiftTotal,
      frigobarAmount: frigobarTotal,
      discount: Number(discount),
      totalAmount: finalAmount,
      paymentMethod,
      vehiclePlate: shift.vehiclePlate,
      notes,
    };

    setHistoricalTurns((prev) => [historyEntry, ...prev]);

    // Update Room Stats
    const updatedStats = {
      totalTurnsCount: (room.stats?.totalTurnsCount || 0) + 1,
      totalShiftRevenue: (room.stats?.totalShiftRevenue || 0) + shiftTotal,
      totalFrigobarRevenue: (room.stats?.totalFrigobarRevenue || 0) + frigobarTotal,
      averageDurationMinutes: room.stats?.averageDurationMinutes || 120,
    };

    // Update Cash Register
    const newMovement = {
      id: 'm-' + Date.now(),
      type: 'in',
      method: paymentMethod,
      amount: finalAmount,
      concept: `Cobro Hab ${room.number} (Turno + Frigobar)`,
      timestamp: new Date().toISOString(),
    };
    setCashRegister((prev) => ({
      ...prev,
      movements: [newMovement, ...prev.movements],
    }));

    // Update Room Status: Go to Cleaning or Available
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          return {
            ...r,
            status: autoSendToCleaning ? 'cleaning' : 'available',
            currentShift: null,
            stats: updatedStats,
            cleaning: autoSendToCleaning
              ? {
                  startedAt: new Date().toISOString(),
                  staff: 'Personal de Turno',
                  notes: 'Limpieza y reposición de frigobar post check-out',
                }
              : null,
            iot: {
              ...r.iot,
              doorLocked: false,
              powerRelayOn: autoSendToCleaning ? true : false,
              lastEvent: autoSendToCleaning ? 'Pase a limpieza. Cerradura accesible.' : 'Cerradura bloqueada. Modo ahorro de energía.',
              lastEventTime: new Date().toISOString(),
            },
          };
        }
        return r;
      })
    );

    addIotLog(room.number, `Check-out finalizado. Cobro de $ ${finalAmount.toLocaleString()}. Pase a limpieza.`, 'info');
    addToast('Check-Out Finalizado', `Habitación ${room.number} cobrada ($ ${finalAmount.toLocaleString()})`, 'success');
    soundFx.playCheckout();
  };

  // Extend Shift
  const extendShift = (roomId, extraMinutes, extraPrice = 0) => {
    setRooms((prev) =>
      prev.map((room) => {
        if (room.id === roomId && room.currentShift) {
          const currentEnd = new Date(room.currentShift.endTime).getTime();
          const newEnd = new Date(currentEnd + extraMinutes * 60 * 1000);
          return {
            ...room,
            currentShift: {
              ...room.currentShift,
              endTime: newEnd.toISOString(),
              rateAmount: room.currentShift.rateAmount + Number(extraPrice),
            },
          };
        }
        return room;
      })
    );

    const room = rooms.find((r) => r.id === roomId);
    addToast('Turno Extendido', `Habitación ${room?.number}: +${extraMinutes} min agregados`, 'info');
    soundFx.playSuccess();
  };

  // Add Frigobar Consumption to Room
  const addFrigobarConsumption = (roomId, productId, quantity = 1) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (product.stock < quantity) {
      addToast('Stock Insuficiente', `Solo quedan ${product.stock} unidades de ${product.name}`, 'warning');
      return;
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: p.stock - quantity } : p))
    );

    setRooms((prev) =>
      prev.map((room) => {
        if (room.id === roomId && room.currentShift) {
          const existing = room.currentShift.consumptions.find((c) => c.productId === productId);
          let updatedConsumptions;
          if (existing) {
            updatedConsumptions = room.currentShift.consumptions.map((c) =>
              c.productId === productId ? { ...c, quantity: c.quantity + quantity } : c
            );
          } else {
            updatedConsumptions = [
              ...room.currentShift.consumptions,
              {
                productId,
                name: product.name,
                price: product.price,
                quantity,
                timestamp: new Date().toISOString(),
              },
            ];
          }

          return {
            ...room,
            currentShift: {
              ...room.currentShift,
              consumptions: updatedConsumptions,
            },
          };
        }
        return room;
      })
    );

    const room = rooms.find((r) => r.id === roomId);
    addToast('Consumo Agregado', `${quantity}x ${product.name} cargado a Hab ${room?.number}`, 'success');
    soundFx.playSuccess();
  };

  // Remove Consumption from Room
  const removeFrigobarConsumption = (roomId, productId, quantity = 1) => {
    const product = products.find((p) => p.id === productId);

    setRooms((prev) =>
      prev.map((room) => {
        if (room.id === roomId && room.currentShift) {
          const existing = room.currentShift.consumptions.find((c) => c.productId === productId);
          if (!existing) return room;

          let updatedConsumptions;
          if (existing.quantity <= quantity) {
            updatedConsumptions = room.currentShift.consumptions.filter((c) => c.productId !== productId);
          } else {
            updatedConsumptions = room.currentShift.consumptions.map((c) =>
              c.productId === productId ? { ...c, quantity: c.quantity - quantity } : c
            );
          }

          return {
            ...room,
            currentShift: {
              ...room.currentShift,
              consumptions: updatedConsumptions,
            },
          };
        }
        return room;
      })
    );

    if (product) {
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, stock: p.stock + quantity } : p))
      );
    }
  };

  // Cleaning Workflows
  const startCleaning = (roomId, staffName = 'Mucama de Guardia') => {
    setRooms((prev) =>
      prev.map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            status: 'cleaning',
            cleaning: {
              startedAt: new Date().toISOString(),
              staff: staffName,
              notes: 'Limpieza e higienización general',
            },
            iot: {
              ...room.iot,
              doorLocked: false,
              powerRelayOn: true,
              lastEvent: `Ingreso de limpieza por ${staffName}`,
              lastEventTime: new Date().toISOString(),
            },
          };
        }
        return room;
      })
    );
    const room = rooms.find((r) => r.id === roomId);
    addIotLog(room?.number || roomId, `Iniciada limpieza por ${staffName}`, 'info');
    addToast('Limpieza Iniciada', `Habitación ${room?.number} en proceso de desinfección`, 'info');
  };

  const finishCleaning = (roomId) => {
    setRooms((prev) =>
      prev.map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            status: 'available',
            cleaning: null,
            iot: {
              ...room.iot,
              doorLocked: true,
              powerRelayOn: false,
              lastEvent: 'Limpieza completada. Standby y ahorro de energía.',
              lastEventTime: new Date().toISOString(),
            },
          };
        }
        return room;
      })
    );
    const room = rooms.find((r) => r.id === roomId);
    addIotLog(room?.number || roomId, 'Limpieza finalizada. Habitación lista y bloqueada.', 'success');
    addToast('Habitación Lista', `Habitación ${room?.number} disponible para nuevo ingreso`, 'success');
    soundFx.playSuccess();
  };

  // IoT Hardware Controls
  const toggleDoorLock = (roomId) => {
    let newState = false;
    let roomNum = '';
    setRooms((prev) =>
      prev.map((room) => {
        if (room.id === roomId) {
          newState = !room.iot.doorLocked;
          roomNum = room.number;
          return {
            ...room,
            iot: {
              ...room.iot,
              doorLocked: newState,
              lastEvent: newState ? 'Cerradura bloqueada por operador' : 'Cerradura desbloqueada por operador',
              lastEventTime: new Date().toISOString(),
            },
          };
        }
        return room;
      })
    );
    soundFx.playDoorClick();
    addIotLog(roomNum, newState ? 'Cerradura Bloqueada (Remoto)' : 'Cerradura Desbloqueada (Remoto)', newState ? 'warning' : 'success');
    addToast('Cerradura IoT', `Habitación ${roomNum}: ${newState ? 'Cerrada' : 'Desbloqueada'}`, 'info');
  };

  const toggleDoorSensor = (roomId) => {
    let isOpen = false;
    let roomNum = '';
    setRooms((prev) =>
      prev.map((room) => {
        if (room.id === roomId) {
          isOpen = !room.iot.doorSensorOpen;
          roomNum = room.number;
          return {
            ...room,
            iot: {
              ...room.iot,
              doorSensorOpen: isOpen,
              lastEvent: isOpen ? 'Alerta: Sensor magnético detectó puerta ABIERTA' : 'Sensor magnético: Puerta cerrada',
              lastEventTime: new Date().toISOString(),
            },
          };
        }
        return room;
      })
    );
    addIotLog(roomNum, isOpen ? 'Sensor: Puerta Física Abierta' : 'Sensor: Puerta Física Cerrada', isOpen ? 'warning' : 'info');
  };

  const toggleRoomPower = (roomId) => {
    let powerState = false;
    let roomNum = '';
    setRooms((prev) =>
      prev.map((room) => {
        if (room.id === roomId) {
          powerState = !room.iot.powerRelayOn;
          roomNum = room.number;
          return {
            ...room,
            iot: {
              ...room.iot,
              powerRelayOn: powerState,
              lastEvent: powerState ? 'Relé de energía encendido' : 'Relé de energía apagado (Corte general)',
              lastEventTime: new Date().toISOString(),
            },
          };
        }
        return room;
      })
    );
    addIotLog(roomNum, powerState ? 'Energía Activada (Relé ON)' : 'Energía Cortada (Relé OFF)', powerState ? 'success' : 'warning');
    addToast('Control de Energía', `Habitación ${roomNum}: ${powerState ? 'Energía Activada' : 'Energía Apagada'}`, 'info');
  };

  const triggerEmergencyUnlockAll = () => {
    setRooms((prev) =>
      prev.map((room) => ({
        ...room,
        iot: {
          ...room.iot,
          doorLocked: false,
          powerRelayOn: true,
          lastEvent: 'APERTURA GENERAL DE EMERGENCIA ACTIVADA',
          lastEventTime: new Date().toISOString(),
        },
      }))
    );
    soundFx.playWarning();
    addIotLog('TODAS', 'PROTOCOLO DE EMERGENCIA: Todas las cerraduras abiertas y luces activadas', 'warning');
    addToast('EMERGENCIA IoT', 'Todas las cerraduras del hotel fueron desbloqueadas', 'warning');
  };

  // Product Stock Management
  const updateProductStock = (productId, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, parseInt(newStock, 10)) } : p))
    );
    addToast('Stock Actualizado', 'Inventario modificado correctamente', 'info');
  };

  const addNewProduct = (productData) => {
    const newProduct = {
      id: 'p-' + Date.now(),
      name: productData.name,
      category: productData.category,
      price: Number(productData.price),
      stock: Number(productData.stock),
      icon: productData.icon || 'Package',
    };
    setProducts((prev) => [...prev, newProduct]);
    addToast('Producto Creado', `${productData.name} añadido al catálogo`, 'success');
  };

  // Cash Management
  const addCashMovement = ({ type, method, amount, concept }) => {
    const newMov = {
      id: 'm-' + Date.now(),
      type,
      method,
      amount: Number(amount),
      concept,
      timestamp: new Date().toISOString(),
    };
    setCashRegister((prev) => ({
      ...prev,
      movements: [newMov, ...prev.movements],
    }));
    addToast('Movimiento Registrado', `${type === 'in' ? 'Ingreso' : 'Egreso'} de $ ${Number(amount).toLocaleString()}`, 'success');
  };

  const toggleSound = () => {
    const next = soundFx.toggleSound();
    setSoundEnabled(next);
    addToast('Sonido', next ? 'Sonidos activados' : 'Sonidos silenciados', 'info');
  };

  // Aggregated live stats
  const totalOccupied = rooms.filter((r) => r.status === 'occupied').length;
  const totalAvailable = rooms.filter((r) => r.status === 'available').length;
  const totalCleaning = rooms.filter((r) => r.status === 'cleaning').length;

  return (
    <HotelContext.Provider
      value={{
        rooms,
        categories: ROOM_CATEGORIES,
        products,
        cashRegister,
        historicalTurns,
        iotLogs,
        toasts,
        soundEnabled,
        activeTab,
        isTutorialOpen,
        isSidebarCollapsed,
        nowTick,
        setActiveTab,
        toggleSidebar,
        openTutorialModal,
        closeTutorialModal,
        resetDemoData,
        toggleSound,
        addToast,
        removeToast,
        checkInRoom,
        checkOutRoom,
        extendShift,
        addFrigobarConsumption,
        removeFrigobarConsumption,
        startCleaning,
        finishCleaning,
        toggleDoorLock,
        toggleDoorSensor,
        toggleRoomPower,
        triggerEmergencyUnlockAll,
        updateProductStock,
        addNewProduct,
        addCashMovement,
        totalOccupied,
        totalAvailable,
        totalCleaning,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
