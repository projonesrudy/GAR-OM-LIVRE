
import React, { useState } from 'react';
import { User, Job } from '../types';
import { LogOut, Plus, Search, Users, MapPin, DollarSign, Clock, Calendar, ChevronRight, Sparkles, Building, Briefcase } from 'lucide-react';
import { generateJobDescriptionSuggestion } from '../services/geminiService';

interface EstDashboardProps {
  user: User;
  jobs: Job[];
  onPostJob: (job: Job) => void;
  onLogout: () => void;
}

const EstablishmentDashboard: React.FC<EstDashboardProps> = ({ user, jobs, onPostJob, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'MINHAS_VAGAS' | 'BUSCAR_GARCONS'>('MINHAS_VAGAS');
  const [showModal, setShowModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', requirements: '', date: '', time: '', pay: '' });

  const handleAISuggest = async () => {
    if (!newJob.title) return alert("Digite um título primeiro!");
    setIsGenerating(true);
    const desc = await generateJobDescriptionSuggestion(newJob.title, newJob.requirements || "atendimento geral");
    if (desc) setNewJob({ ...newJob, requirements: desc });
    setIsGenerating(false);
  };

  const submitJob = () => {
    onPostJob({
      id: Math.random().toString(36).substr(2, 9),
      establishmentId: user.id,
      establishmentName: user.name,
      title: newJob.title,
      description: newJob.requirements,
      date: newJob.date,
      startTime: newJob.time,
      duration: '6h',
      pay: Number(newJob.pay),
      status: 'OPEN'
    });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="hidden md:flex w-72 bg-white border-r border-slate-100 flex-col p-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white">
            <Building className="w-6 h-6 fill-current" />
          </div>
          <span className="text-xl font-black text-dark uppercase tracking-tight">Livre <span className="text-secondary">Empresas</span></span>
        </div>

        <nav className="flex-1 space-y-4">
          <button onClick={() => setActiveTab('MINHAS_VAGAS')} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'MINHAS_VAGAS' ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'text-slate-400 hover:bg-slate-50'}`}>
            <Briefcase className="w-5 h-5" /> Minhas Vagas
          </button>
          <button onClick={() => setActiveTab('BUSCAR_GARCONS')} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'BUSCAR_GARCONS' ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'text-slate-400 hover:bg-slate-50'}`}>
            <Users className="w-5 h-5" /> Buscar Garçons
          </button>
        </nav>

        <button onClick={onLogout} className="mt-auto flex items-center gap-4 p-4 text-slate-400 font-bold hover:text-red-500 transition-colors">
          <LogOut className="w-5 h-5" /> Sair
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-dark">{user.name}</h1>
            <p className="text-slate-500 mt-1">Gerencie suas contratações e turnos.</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="px-10 py-5 bg-secondary text-white font-black rounded-3xl flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-secondary/30"
          >
            <Plus className="w-6 h-6" /> PUBLICAR VAGA
          </button>
        </header>

        {activeTab === 'MINHAS_VAGAS' && (
          <div className="space-y-6">
            {jobs.map(job => (
              <div key={job.id} className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-black text-dark">{job.title}</h3>
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-full tracking-wider border border-green-100">{job.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-6 text-slate-400 text-sm font-bold">
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {job.date}</span>
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {job.startTime}</span>
                    <span className="flex items-center gap-2 text-dark"><DollarSign className="w-4 h-4 text-secondary" /> R$ {job.pay}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                  <div className="text-right">
                    <p className="text-xs font-black text-slate-400 uppercase">Candidatos</p>
                    <p className="text-2xl font-black text-dark">05</p>
                  </div>
                  <button className="p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                    <ChevronRight className="w-6 h-6 text-slate-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Job Posting */}
        {showModal && (
          <div className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-2xl rounded-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
              <div className="p-8 bg-slate-50 border-b flex justify-between items-center">
                <h2 className="text-2xl font-black text-dark">Nova Oportunidade</h2>
                <button onClick={()=>setShowModal(false)} className="text-slate-400 hover:text-dark font-black text-2xl">×</button>
              </div>
              <div className="p-10 space-y-6">
                <div>
                  <label className="block text-sm font-black text-slate-400 uppercase mb-2">Título da Vaga</label>
                  <input placeholder="Ex: Garçom para Jantar Italiano" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-secondary" value={newJob.title} onChange={e=>setNewJob({...newJob, title: e.target.value})} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-black text-slate-400 uppercase">Descrição & Requisitos</label>
                    <button 
                      onClick={handleAISuggest} 
                      disabled={isGenerating}
                      className="flex items-center gap-2 text-xs font-black text-secondary bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      <Sparkles className="w-3 h-3" /> {isGenerating ? 'Gerando...' : 'IA: Sugerir Descrição'}
                    </button>
                  </div>
                  <textarea placeholder="Detalhes do serviço..." className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-secondary h-32 resize-none" value={newJob.requirements} onChange={e=>setNewJob({...newJob, requirements: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                   <input type="date" className="p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-secondary" value={newJob.date} onChange={e=>setNewJob({...newJob, date: e.target.value})} />
                   <input type="time" className="p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-secondary" value={newJob.time} onChange={e=>setNewJob({...newJob, time: e.target.value})} />
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input placeholder="Valor total (R$)" type="number" className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-secondary" value={newJob.pay} onChange={e=>setNewJob({...newJob, pay: e.target.value})} />
                </div>
                <button 
                  onClick={submitJob}
                  className="w-full py-5 bg-secondary text-white font-black text-xl rounded-2xl shadow-xl shadow-secondary/30 hover:bg-blue-400 transition-all"
                >
                  PUBLICAR AGORA
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EstablishmentDashboard;
