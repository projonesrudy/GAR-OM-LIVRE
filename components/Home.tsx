
import React from 'react';
import { AppScreen } from '../types';
import Logo from './Logo';

interface HomeProps {
  onNavigate: (screen: AppScreen) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}
      >
        <div className="absolute inset-0 bg-black/85"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-8 flex flex-col items-center gap-8">
        
        {/* Upper Buttons - Exactly like the image */}
        <div className="w-full flex flex-col gap-6">
          <button 
            onClick={() => onNavigate('SIGNUP')}
            className="w-full py-6 text-2xl font-black rounded-[40px] border-[3px] border-white/30 bg-white/5 backdrop-blur-md text-goldLight tracking-widest hover:bg-gold hover:text-dark transition-all duration-300 transform active:scale-95 shadow-2xl"
          >
            SOU GARÇOM
          </button>

          <button 
            onClick={() => onNavigate('SIGNUP')}
            className="w-full py-4 text-2xl font-black rounded-[40px] border-[3px] border-white/30 bg-white/5 backdrop-blur-md text-goldLight tracking-widest leading-tight hover:bg-gold hover:text-dark transition-all duration-300 transform active:scale-95 shadow-2xl"
          >
            PROCURO<br/>GARÇOM
          </button>
        </div>

        {/* Shield Logo at the bottom like the image */}
        <div className="mt-8 transform scale-110">
          <Logo />
        </div>

        <div className="mt-4 flex flex-col items-center gap-2">
            <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em]">Premium Service Provider</p>
            <div className="flex gap-4">
               <button onClick={() => onNavigate('LOGIN')} className="text-gold/60 text-sm font-bold hover:text-gold transition-colors underline">Já tenho conta</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
