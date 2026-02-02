
import React, { useState } from 'react';
import { User, Job } from '../types';
import { LogOut, Calendar, Search, User as UserIcon, Sparkles, MapPin, Clock, DollarSign, CheckCircle, Bell, Star } from 'lucide-react';

interface ProDashboardProps {
  user: User;
  jobs: Job[];
  onLogout: () => void;
}

const ProfessionalDashboard: React.FC<ProDashboardProps> = ({ user, jobs, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'EXPLORAR' | 'AGENDADOS' | 'PERFIL'>('EXPLORAR');

  return (
    <div className="min-h-screen bg-dark flex flex-col md:flex-row">
      {/* Mobile Nav */}
      <div className="md:hidden flex items-center justify-between p-4 bg-darkElevated border-b border-gold/10 sticky top-0 z-40">
        <span className="font-black text-gold">GARÇOM LIVRE</span>
        <button className="p-2"><Bell className="w-6 h-6 text-gold/60" /></button>
      </div>

      {/* Sidebar */}
      <aside className="hidden md:flex w-72 bg-darkElevated border-r border-gold/10 flex-col p-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-dark">
            <Sparkles className="w-6 h-6 fill-current" />
          </div>
          <span className="text-xl font-black text-gold uppercase tracking-tighter">Livre</span>
        </div>

        <nav className="flex-1 space-y-4">
          <button onClick={() => setActiveTab('EXPLORAR')} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'EXPLORAR' ? 'bg-gold text-dark shadow-lg' : 'text-slate-400 hover:bg-white/5'}`}>
            <Search className="w-5 h-5" /> Vagas
          </button>
          <button onClick={() => setActiveTab('AGENDADOS')} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'AGENDADOS' ? 'bg-gold text-dark shadow-lg' : 'text-slate-400 hover:bg-white/5'}`}>
            <Calendar className="w-5 h-5" /> Agendados
          </button>
          <button onClick={() => setActiveTab('PERFIL')} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'PERFIL' ? 'bg-gold text-dark shadow-lg' : 'text-slate-400 hover:bg-white/5'}`}>
            <UserIcon className="w-5 h-5" /> Perfil
          </button>
        </nav>

        <button onClick={onLogout} className="mt-auto flex items-center gap-4 p-4 text-slate-500 font-bold hover:text-red-400 transition-colors">
          <LogOut className="w-5 h-5" /> Sair
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 bg-dark">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-goldLight">Olá, {user.name}</h1>
            <p className="text-slate-400 mt-1">Status Premium Ativo</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-darkElevated px-6 py-4 rounded-3xl border border-gold/20 text-center">
              <p className="text-xs font-bold text-gold/40 uppercase tracking-wider">Rating</p>
              <p className="text-xl font-black text-gold">★ {user.rating}</p>
            </div>
          </div>
        </header>

        {activeTab === 'EXPLORAR' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {jobs.map(job => (
              <div key={job.id} className="bg-darkElevated p-8 rounded-4xl border border-gold/10 shadow-xl hover:border-gold/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gold/10 text-gold px-6 py-2 rounded-bl-3xl font-black text-sm">
                  95% Match
                </div>
                
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-gold transition-colors">{job.title}</h3>
                <p className="text-gold font-bold mb-6 flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.establishmentName}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 text-slate-400 bg-white/5 p-3 rounded-2xl">
                    <Calendar className="w-5 h-5 text-gold/60" />
                    <span className="font-medium">{job.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 bg-white/5 p-3 rounded-2xl">
                    <Clock className="w-5 h-5 text-gold/60" />
                    <span className="font-medium">{job.startTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-3xl font-black text-goldLight">R$ {job.pay}</div>
                  <button className="px-8 py-4 bg-gold text-dark font-black rounded-2xl hover:scale-105 transition-all shadow-lg">
                    CANDIDATAR
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfessionalDashboard;
