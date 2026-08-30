import React, { useState } from 'react';
import {
  Cpu,
  Lock,
  Unlock,
  Zap,
  DoorOpen,
  DoorClosed,
  Wifi,
  Battery,
  ShieldAlert,
  Terminal,
  Activity,
  Power,
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { ModuleOnboardingBanner } from '../common/ModuleOnboardingBanner';
import { formatTime } from '../../utils/formatters';

export const IoTControlView = () => {
  const {
    rooms,
    iotLogs,
    toggleDoorLock,
    toggleDoorSensor,
    toggleRoomPower,
    triggerEmergencyUnlockAll,
  } = useHotel();

  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0]?.id || 101);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  const handleTurnOffVacantPower = () => {
    rooms.forEach((room) => {
      if (room.status === 'available' && room.iot.powerRelayOn) {
        toggleRoomPower(room.id);
      }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Onboarding Banner */}
      <ModuleOnboardingBanner
        title="Control de Acceso IoT, Puertas & Energía"
        subtitle="Automatización de cerraduras inteligentes por habitación, sensores magnéticos y corte de energía automático"
        steps={[
          'Monitoreá el estado físico de cada cerradura (Bloqueada/Abierta) y sensor magnético.',
          'Utilizá el banco de prueba de la derecha para simular aperturas y disparos de telemetría MQTT.',
          'Aplicá el "Modo Eco" para cortar la energía de todas las habitaciones libres.',
        ]}
      />

      {/* Top Banner */}
      <div
        style={{
          background: 'var(--brand-card)',
          border: '1px solid var(--brand-secondary)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--brand-cream)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-dark)',
            }}
          >
            <Cpu size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Gateway Central ESP32 & MQTT</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--brand-brown)' }}>
              {rooms.length} dispositivos enlazados con estado en vivo
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={handleTurnOffVacantPower}>
            <Power size={14} />
            <span>Modo Eco (Apagar Libres)</span>
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              if (window.confirm('¿Desbloquear TODAS las cerraduras del hotel?')) {
                triggerEmergencyUnlockAll();
              }
            }}
          >
            <ShieldAlert size={14} />
            <span>Apertura General</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Device Matrix, Right Terminal & Simulator */}
      <div className="iot-control-grid">
        {/* Left: Device Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: '0.85rem',
            }}
          >
            {rooms.map((room) => {
              const isSelected = room.id === selectedRoomId;

              return (
                <div
                  key={room.id}
                  style={{
                    background: 'var(--brand-card)',
                    border: isSelected ? '2px solid var(--brand-brown)' : '1px solid var(--brand-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    boxShadow: isSelected ? 'var(--shadow-soft-lg)' : 'var(--shadow-soft)',
                  }}
                  onClick={() => setSelectedRoomId(room.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <strong style={{ fontSize: '1.05rem', fontFamily: 'var(--font-display)' }}>
                        Hab {room.number}
                      </strong>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          padding: '0.15rem 0.45rem',
                          borderRadius: 'var(--radius-full)',
                          background: 'var(--brand-cream)',
                          color: 'var(--brand-brown)',
                          fontWeight: 700,
                        }}
                      >
                        Piso {room.floor}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: 'var(--brand-brown)', fontWeight: 600 }}>
                      <Wifi size={12} />
                      <Battery size={12} />
                      <span>{room.iot.batteryLevel}%</span>
                    </div>
                  </div>

                  {/* Status pills inside card */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', fontSize: '0.75rem' }}>
                    <div
                      style={{
                        padding: '0.35rem 0.5rem',
                        borderRadius: 'var(--radius-md)',
                        background: room.iot.doorLocked ? 'var(--brand-yellow)' : '#FEF3C7',
                        color: room.iot.doorLocked ? 'var(--brand-dark)' : '#92400E',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontWeight: 700,
                      }}
                    >
                      {room.iot.doorLocked ? <Lock size={13} /> : <Unlock size={13} />}
                      <span>{room.iot.doorLocked ? 'Bloqueada' : 'Abierta'}</span>
                    </div>

                    <div
                      style={{
                        padding: '0.35rem 0.5rem',
                        borderRadius: 'var(--radius-md)',
                        background: room.iot.doorSensorOpen ? '#FEE2E2' : 'var(--brand-cream)',
                        color: room.iot.doorSensorOpen ? '#991B1B' : 'var(--brand-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontWeight: 700,
                      }}
                    >
                      {room.iot.doorSensorOpen ? <DoorOpen size={13} /> : <DoorClosed size={13} />}
                      <span>{room.iot.doorSensorOpen ? 'Sensor Abierto' : 'Puerta OK'}</span>
                    </div>
                  </div>

                  {/* Action Quick Buttons */}
                  <div style={{ display: 'flex', gap: '0.35rem', marginTop: 'auto' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1, padding: '0.3rem 0.45rem', fontSize: '0.74rem' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDoorLock(room.id);
                      }}
                    >
                      {room.iot.doorLocked ? <Unlock size={12} /> : <Lock size={12} />}
                      <span>{room.iot.doorLocked ? 'Destrabar' : 'Trabar'}</span>
                    </button>

                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1, padding: '0.3rem 0.45rem', fontSize: '0.74rem' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRoomPower(room.id);
                      }}
                    >
                      <Zap size={12} color={room.iot.powerRelayOn ? 'var(--brand-brown)' : 'var(--text-muted)'} />
                      <span>{room.iot.powerRelayOn ? 'Luz ON' : 'Luz OFF'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Simulator Testbench & Live MQTT Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Interactive Hardware Simulator */}
          <div
            style={{
              background: 'var(--brand-card)',
              border: '1px solid var(--brand-secondary)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.15rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Activity size={16} color="var(--brand-brown)" />
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800 }}>Simulador Hardware (Hab {selectedRoom.number})</h4>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.55rem' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => toggleDoorSensor(selectedRoom.id)}
              >
                {selectedRoom.iot.doorSensorOpen ? <DoorClosed size={14} /> : <DoorOpen size={14} />}
                <span>Simular {selectedRoom.iot.doorSensorOpen ? 'Cierre' : 'Apertura'}</span>
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => toggleDoorLock(selectedRoom.id)}
              >
                {selectedRoom.iot.doorLocked ? <Unlock size={14} /> : <Lock size={14} />}
                <span>{selectedRoom.iot.doorLocked ? 'Destrabar' : 'Trabar'}</span>
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => toggleRoomPower(selectedRoom.id)}
                style={{ gridColumn: 'span 2' }}
              >
                <Zap size={14} />
                <span>Alternar Energía Eléctrica ({selectedRoom.iot.powerRelayOn ? 'Activo' : 'Corte'})</span>
              </button>
            </div>
          </div>

          {/* MQTT Live Terminal */}
          <div
            style={{
              background: 'var(--brand-card)',
              border: '1px solid var(--brand-secondary)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.15rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Terminal size={15} color="var(--brand-brown)" />
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800 }}>Consola Telemetría en Vivo (MQTT)</h4>
              </div>
              <span style={{ fontSize: '0.68rem', color: 'var(--brand-emerald-primary)', fontWeight: 800 }}>
                ● ONLINE
              </span>
            </div>

            <div className="iot-terminal">
              {iotLogs.map((log) => (
                <div key={log.id} className="log-entry">
                  <span className="log-time">[{formatTime(log.time)}]</span>
                  <span className="log-room">HAB-{log.room}</span>
                  <span style={{ color: log.level === 'warning' ? '#E5A9A4' : log.level === 'success' ? '#DCE6C6' : '#FFFFFF' }}>
                    {log.event}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
