import React from 'react';
import { useHotel } from './context/HotelContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ToastContainer } from './components/common/ToastContainer';
import { InteractiveTutorialModal } from './components/common/InteractiveTutorialModal';
import { DashboardView } from './components/views/DashboardView';
import { FrigobarView } from './components/views/FrigobarView';
import { IoTControlView } from './components/views/IoTControlView';
import { MetricsView } from './components/views/MetricsView';
import { CleaningView } from './components/views/CleaningView';
import { CashRegisterView } from './components/views/CashRegisterView';
import { ManualsView } from './components/views/ManualsView';

function AppContent() {
  const { activeTab, isTutorialOpen, closeTutorialModal } = useHotel();

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Container */}
      <div className="main-content">
        <Navbar />

        <main className="page-body">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'frigobar' && <FrigobarView />}
          {activeTab === 'iot' && <IoTControlView />}
          {activeTab === 'metrics' && <MetricsView />}
          {activeTab === 'cleaning' && <CleaningView />}
          {activeTab === 'cash' && <CashRegisterView />}
          {activeTab === 'manuales' && <ManualsView />}
        </main>
      </div>

      {/* Global Interactive Step-by-Step Tutorial Modal */}
      <InteractiveTutorialModal
        isOpen={isTutorialOpen}
        onClose={closeTutorialModal}
      />

      {/* Global Toast Alerts */}
      <ToastContainer />
    </div>
  );
}

export function App() {
  return <AppContent />;
}

export default App;
