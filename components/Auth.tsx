
import React, { useState } from 'react';
import { User, UserType } from '../types';
import { ArrowLeft, User as UserIcon, Lock, Mail, Phone, ChevronRight, UserCheck, Store, MapPin, Briefcase } from 'lucide-react';

interface AuthProps {
  type: 'LOGIN' | 'SIGNUP';
  onAuthSuccess: (user: User) => void;
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ type, onAuthSuccess, onBack }) => {
  const [step, setStep] = useState<'TYPE' | 'FORM'>(type === 'SIGNUP' ? 'TYPE' : 'FORM');
  const [userType, setUserType] = useState<UserType>('PROFESSIONAL');
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '',
    cpf: '', experience: '1', location: '',
    cnpj: '', address: '', capacity: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'Usuário',
      email: formData.email,
      phone: formData.phone,
      type: userType,
      availability: true,
      rating: 5.0,
      skills: ['Atendimento', 'Bebidas'],
      location: formData.location,
      address: formData.address
    };
    onAuthSuccess(mockUser);
  };

  if (step === 'TYPE') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-dark p-6">
        <div className="max-w-xl w-full text-center">
          <h2 className="text-4xl font-black text-gold-gradient mb-12 uppercase tracking-tighter">Você é:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button 
              onClick={() => { setUserType('PROFESSIONAL'); setStep('FORM'); }}
              className="p-10 bg-darkElevated rounded-4xl border-4 border-transparent hover:border-gold transition-all shadow-xl text-center group"
            >
              <div className="w-20 h-20 bg-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <UserCheck className="w-10 h-10 text-gold" />
              </div>
              <h3 className="text-2xl font-black text-white">Garçom Profissional</h3>
              <p className="text-slate-400 mt-2">Busco turnos extras</p>
            </button>
            <button 
              onClick={() => { setUserType('ESTABLISHMENT'); setStep('FORM'); }}
              className="p-10 bg-darkElevated rounded-4xl border-4 border-transparent hover:border-gold transition-all shadow-xl text-center group"
            >
              <div className="w-20 h-20 bg-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Store className="w-10 h-10 text-gold" />
              </div>
              <h3 className="text-2xl font-black text-white">Estabelecimento</h3>
              <p className="text-slate-400 mt-2">Preciso contratar</p>
            </button>
          </div>
          <button onClick={onBack} className="mt-12 text-gold/60 font-bold hover:text-gold uppercase tracking-widest text-sm">Voltar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark p-6">
      <div className="max-w-lg w-full bg-darkElevated rounded-4xl shadow-2xl p-10 border border-gold/20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-goldLight uppercase tracking-tight">
            {type === 'LOGIN' ? 'Entrar' : 'Cadastro'}
          </h2>
          <p className="text-slate-400 mt-2">
            {type === 'LOGIN' ? 'Acesse sua conta premium' : `Cadastro para ${userType === 'PROFESSIONAL' ? 'Garçom' : 'Estabelecimento'}`}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {type === 'SIGNUP' && (
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40 w-5 h-5" />
                <input required placeholder="Nome Completo" className="w-full pl-12 pr-4 py-4 bg-dark border border-gold/10 rounded-2xl focus:ring-2 focus:ring-gold outline-none text-white placeholder-slate-600" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40 w-5 h-5" />
              <input required type="email" placeholder="E-mail" className="w-full pl-12 pr-4 py-4 bg-dark border border-gold/10 rounded-2xl focus:ring-2 focus:ring-gold outline-none text-white placeholder-slate-600" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40 w-5 h-5" />
              <input required type="password" placeholder="Senha" className="w-full pl-12 pr-4 py-4 bg-dark border border-gold/10 rounded-2xl focus:ring-2 focus:ring-gold outline-none text-white placeholder-slate-600" value={formData.password} onChange={e=>setFormData({...formData, password: e.target.value})} />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-gold text-dark font-black text-lg rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 hover:bg-goldLight"
          >
            {type === 'LOGIN' ? 'ENTRAR' : 'COMPLETAR CADASTRO'} <ChevronRight className="w-5 h-5" />
          </button>
        </form>

        <button onClick={() => setStep('TYPE')} className="w-full mt-6 text-slate-500 font-bold hover:text-gold">Voltar</button>
      </div>
    </div>
  );
};

export default Auth;
