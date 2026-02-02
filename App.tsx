
import React, { useState } from 'react';
import { AppScreen, User, Job } from './types';
import Home from './components/Home';
import Auth from './components/Auth';
import ProfessionalDashboard from './components/ProfessionalDashboard';
import EstablishmentDashboard from './components/EstablishmentDashboard';

const MOCK_JOBS: Job[] = [
  { id: '1', establishmentId: 'e1', establishmentName: 'Restaurante Verano', title: 'Garçom para Buffet', description: 'Atendimento ágil em buffet de casamento.', date: '2025-05-12', startTime: '18:00', duration: '6h', pay: 180, status: 'OPEN' },
  { id: '2', establishmentId: 'e2', establishmentName: 'Bar do Porto', title: 'Happy Hour Agitado', description: 'Serviço de chopp e petiscos.', date: '2025-05-15', startTime: '17:00', duration: '5h', pay: 120, status: 'OPEN' },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('HOME');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentScreen('DASHBOARD');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('HOME');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'HOME':
        return <Home onNavigate={setCurrentScreen} />;
      case 'LOGIN':
      case 'SIGNUP':
        return <Auth type={currentScreen} onAuthSuccess={handleLogin} onBack={() => setCurrentScreen('HOME')} />;
      case 'DASHBOARD':
        if (currentUser?.type === 'PROFESSIONAL') {
          return <ProfessionalDashboard user={currentUser} jobs={jobs} onLogout={handleLogout} />;
        } else if (currentUser?.type === 'ESTABLISHMENT') {
          return <EstablishmentDashboard 
            user={currentUser} 
            jobs={jobs.filter(j => j.establishmentId === currentUser.id)} 
            onPostJob={(job) => setJobs(prev => [job, ...prev])} 
            onLogout={handleLogout} 
          />;
        }
        return <Home onNavigate={setCurrentScreen} />;
      default:
        return <Home onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-primary/30">
      {renderScreen()}
    </div>
  );
}
