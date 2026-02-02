
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-64" }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        {/* Laurel Wreath */}
        <svg viewBox="0 0 200 200" className="absolute -inset-12 w-[calc(100%+6rem)] h-[calc(100%+6rem)] opacity-80">
          <path d="M50,150 Q20,100 50,50 M150,150 Q180,100 150,50" fill="none" stroke="#D4AF37" strokeWidth="4" />
          <g fill="#D4AF37">
            {/* Left Leaves */}
            <ellipse cx="40" cy="140" rx="8" ry="4" transform="rotate(-30 40 140)" />
            <ellipse cx="32" cy="120" rx="8" ry="4" transform="rotate(-30 32 120)" />
            <ellipse cx="28" cy="100" rx="8" ry="4" transform="rotate(-30 28 100)" />
            <ellipse cx="32" cy="80" rx="8" ry="4" transform="rotate(-30 32 80)" />
            <ellipse cx="40" cy="60" rx="8" ry="4" transform="rotate(-30 40 60)" />
            {/* Right Leaves */}
            <ellipse cx="160" cy="140" rx="8" ry="4" transform="rotate(30 160 140)" />
            <ellipse cx="168" cy="120" rx="8" ry="4" transform="rotate(30 168 120)" />
            <ellipse cx="172" cy="100" rx="8" ry="4" transform="rotate(30 172 100)" />
            <ellipse cx="168" cy="80" rx="8" ry="4" transform="rotate(30 168 80)" />
            <ellipse cx="160" cy="60" rx="8" ry="4" transform="rotate(30 160 60)" />
          </g>
        </svg>

        {/* Shield */}
        <div className="relative z-10 w-48 h-56 bg-dark border-4 border-gold rounded-t-lg flex flex-col items-center justify-between p-4 overflow-hidden" style={{ borderRadius: '10% 10% 50% 50% / 10% 10% 20% 20%' }}>
          <div className="text-center">
             <div className="text-[14px] font-black tracking-widest text-gold leading-none">GARÇOM</div>
             <div className="text-[20px] font-black tracking-tighter text-gold leading-none">LIVRE</div>
          </div>
          
          {/* Waiter Icon */}
          <div className="my-2">
            <svg viewBox="0 0 100 100" className="w-24 h-24 fill-gold">
              <path d="M50 20c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zM30 40c-2.2 0-4 1.8-4 4v10h4v30h10v-20h4v20h10V54h4V44c0-2.2-1.8-4-4-4H30zM70 30h15v5H70z" />
              <path d="M65 35h25v2H65z" />
              <circle cx="77" cy="28" r="8" />
            </svg>
          </div>

          <div className="text-center">
            <div className="text-[7px] font-bold text-gold opacity-80 uppercase leading-tight px-2">
              CONTRATE UM FREELANCER
            </div>
          </div>
          
          {/* Golden Stripes */}
          <div className="absolute top-1/2 left-0 w-8 h-px bg-gold/30"></div>
          <div className="absolute top-[55%] left-0 w-6 h-px bg-gold/30"></div>
          <div className="absolute top-[60%] left-0 w-10 h-px bg-gold/30"></div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
