import React from 'react';
import { useGameStore } from '../game/store/gameStore';
import { useShallow } from 'zustand/react/shallow';

// ==========================================
// High-Quality Inline SVG Icons for EU4 Theme
// ==========================================

const GoldIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0px 1.5px 2px rgba(0,0,0,0.6))' }}>
    <circle cx="12" cy="12" r="10" fill="url(#goldGrad)" stroke="#d4af37" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="7" fill="none" stroke="#b7950b" strokeWidth="1" strokeDasharray="2 1" />
    <text x="12" y="16" fill="#784212" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">$</text>
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f7dc6f" />
        <stop offset="30%" stopColor="#f1c40f" />
        <stop offset="100%" stopColor="#b7950b" />
      </linearGradient>
    </defs>
  </svg>
);

const ManpowerIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0px 1.5px 2px rgba(0,0,0,0.6))' }}>
    <path d="M12 2C8 2 4 4 4 8v4c0 3.5 3 6.5 8 8 5-1.5 8-4.5 8-8V8c0-4-4-6-8-6z" fill="url(#ironGrad)" stroke="#7f8c8d" strokeWidth="1.5" />
    <path d="M12 2v18" stroke="#5d6d7e" strokeWidth="1" />
    <path d="M7 8h10" stroke="#5d6d7e" strokeWidth="1.5" />
    <defs>
      <linearGradient id="ironGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#bdc3c7" />
        <stop offset="100%" stopColor="#7f8c8d" />
      </linearGradient>
    </defs>
  </svg>
);

const StabilityIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0px 1.5px 2px rgba(0,0,0,0.6))' }}>
    <path d="M12 3v16M5 6h14M5 6l3 7h-6L5 6zM19 6l3 7h-6l3-7zM12 19h4m-8 0h4" stroke="#2ecc71" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PrestigeIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0px 1.5px 2px rgba(0,0,0,0.6))' }}>
    <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9 12 2" fill="url(#prestigeGrad)" stroke="#d35400" strokeWidth="1" />
    <defs>
      <linearGradient id="prestigeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f39c12" />
        <stop offset="100%" stopColor="#d35400" />
      </linearGradient>
    </defs>
  </svg>
);

const WarExhaustionIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0px 1.5px 2px rgba(0,0,0,0.6))' }}>
    <path d="M12 2C12 2 6 7 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 7 12 2 12 2Z" fill="url(#fireGrad)" stroke="#c0392b" strokeWidth="1.5" />
    <path d="M12 8C12 8 9.5 11 9.5 13.5C9.5 14.8807 10.6193 16 12 16C13.3807 16 14.5 14.8807 14.5 13.5C14.5 11 12 8 12 8Z" fill="#f1c40f" />
    <defs>
      <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#e74c3c" />
        <stop offset="100%" stopColor="#f39c12" />
      </linearGradient>
    </defs>
  </svg>
);

const OverextensionIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0px 1.5px 2px rgba(0,0,0,0.6))' }}>
    <path d="M12 2L2 20h20L12 2z" fill="url(#alertGrad)" stroke="#c0392b" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="12" y1="9" x2="12" y2="14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1.25" fill="#fff" />
    <defs>
      <linearGradient id="alertGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e74c3c" />
        <stop offset="100%" stopColor="#962d22" />
      </linearGradient>
    </defs>
  </svg>
);

const ScoreIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0px 1.5px 2px rgba(0,0,0,0.6))' }}>
    <polygon points="12 15 16 22 12 20 8 22" fill="#e74c3c" stroke="#c0392b" strokeWidth="1" />
    <polygon points="12 15 19 20 17 14" fill="#e74c3c" stroke="#c0392b" strokeWidth="1" />
    <circle cx="12" cy="9" r="7" fill="url(#medalGrad)" stroke="#d4af37" strokeWidth="1.5" />
    <circle cx="12" cy="9" r="4" fill="none" stroke="#b7950b" strokeWidth="1" />
    <defs>
      <linearGradient id="medalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f9e79f" />
        <stop offset="100%" stopColor="#d4af37" />
      </linearGradient>
    </defs>
  </svg>
);

const AdmIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0px 1.5px 2px rgba(0,0,0,0.6))' }}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="url(#admGrad)" stroke="#c0392b" strokeWidth="1.5" />
    <polyline points="14 2 14 8 20 8" fill="none" stroke="#c0392b" strokeWidth="1.5" />
    <line x1="16" y1="13" x2="8" y2="13" stroke="#fff" strokeWidth="1.5" opacity="0.8" />
    <line x1="16" y1="17" x2="8" y2="17" stroke="#fff" strokeWidth="1.5" opacity="0.8" />
    <line x1="10" y1="9" x2="8" y2="9" stroke="#fff" strokeWidth="1.5" opacity="0.8" />
    <defs>
      <linearGradient id="admGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec7063" />
        <stop offset="100%" stopColor="#c0392b" />
      </linearGradient>
    </defs>
  </svg>
);

const DipIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0px 1.5px 2px rgba(0,0,0,0.6))' }}>
    <rect x="3" y="5" width="18" height="14" rx="2" fill="url(#dipGrad)" stroke="#2980b9" strokeWidth="1.5" />
    <polyline points="3 7 12 13 21 7" stroke="#fff" strokeWidth="1.5" opacity="0.8" />
    <circle cx="12" cy="13" r="2" fill="#f1c40f" stroke="#d4af37" strokeWidth="1" />
    <defs>
      <linearGradient id="dipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5dade2" />
        <stop offset="100%" stopColor="#2e86c1" />
      </linearGradient>
    </defs>
  </svg>
);

const MilIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0px 1.5px 2px rgba(0,0,0,0.6))' }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#milGrad)" stroke="#27ae60" strokeWidth="1.5" />
    <path d="M9 11l2 2 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="milGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#58d68d" />
        <stop offset="100%" stopColor="#27ae60" />
      </linearGradient>
    </defs>
  </svg>
);

const Separator: React.FC = () => (
  <div style={{
    width: '2px',
    height: '26px',
    background: 'linear-gradient(to bottom, transparent, #8c6d39 20%, #e5c158 50%, #8c6d39 80%, transparent)',
    margin: '0 8px',
    opacity: 0.6
  }} />
);

interface StatusHeaderProps {
  onFlagClick?: () => void;
}

export const StatusHeader: React.FC<StatusHeaderProps> = ({ onFlagClick }) => {
  const {
    date,
    isPaused,
    gameSpeed,
    activePlayerTag,
    emperorTag,
    country,
    togglePause,
    setSpeed,
    reduceWarExhaustion,
    increaseStability
  } = useGameStore(
    useShallow((state) => {
      const activeCountry = state.countries[state.activePlayerTag];
      return {
        date: state.date,
        isPaused: state.isPaused,
        gameSpeed: state.gameSpeed,
        activePlayerTag: state.activePlayerTag,
        emperorTag: state.emperorTag,
        country: activeCountry,
        togglePause: state.togglePause,
        setSpeed: state.setSpeed,
        reduceWarExhaustion: state.reduceWarExhaustion,
        increaseStability: state.increaseStability
      };
    })
  );

  if (!country) return null;

  const formatDate = () => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return `${date.day} ${months[date.month - 1]} ${date.year}`;
  };

  const getHreBadge = () => {
    if (emperorTag === activePlayerTag) {
      return <span style={{ color: '#ffe066', fontSize: '0.7rem', fontWeight: 'bold', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>👑 Emperor</span>;
    }
    return null;
  };

  return (
    <div
      style={{
        height: '8%',
        width: '100%',
        borderBottom: '3px solid #8c6d39',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 100,
        background: 'linear-gradient(180deg, #1b1611 0%, #110e0b 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.8)'
      }}
    >
      {/* Flag / Ruler & Active Country Information */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Country Flag emblem (Ornate EU4 Shield Style) */}
        <div
          onClick={onFlagClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.filter = 'brightness(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.filter = 'none';
          }}
          style={{
            width: '46px',
            height: '56px',
            backgroundColor: country.color,
            border: '3.5px solid #d4af37',
            borderBottomLeftRadius: '23px',
            borderBottomRightRadius: '23px',
            boxShadow: '0 6px 12px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.3)',
            cursor: 'pointer',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.15s ease, filter 0.15s ease',
            zIndex: 110,
            marginTop: '10px' // hangs down slightly
          }}
          title="Open Diplomacy Panel"
        >
          {/* Austrian Flag line (Middle white stripe placeholder if HAB) */}
          {country.tag === 'HAB' && (
            <div style={{ position: 'absolute', top: '33%', left: 0, width: '100%', height: '33%', backgroundColor: '#fff' }} />
          )}
          <span style={{ color: 'rgba(0,0,0,0.85)', fontWeight: '900', fontSize: '1.4rem', zIndex: 2, fontFamily: 'var(--font-title)', pointerEvents: 'none', textShadow: '0 1px 2px rgba(255,255,255,0.4)' }}>
            {country.name.charAt(0)}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#f3e5c8', fontFamily: 'var(--font-title)', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
            {country.name} {getHreBadge()}
          </span>
          <span style={{ fontSize: '0.72rem', color: '#b2bec3', fontFamily: 'var(--font-body)', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
            {country.monarch.isRegent ? 'Regency Council' : `${country.monarch.name}`} ({Math.floor(country.monarch.age)}y)
            <span style={{ marginLeft: '10px', display: 'inline-flex', gap: '3px', alignItems: 'center' }}>
              <span style={{ background: 'rgba(231, 76, 60, 0.15)', color: 'var(--color-adm)', padding: '1px 4px', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.62rem' }}>{country.monarch.adm}</span>
              <span style={{ background: 'rgba(52, 152, 219, 0.15)', color: 'var(--color-dip)', padding: '1px 4px', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.62rem' }}>{country.monarch.dip}</span>
              <span style={{ background: 'rgba(46, 204, 113, 0.15)', color: 'var(--color-mil)', padding: '1px 4px', borderRadius: '3px', fontWeight: 'bold', fontSize: '0.62rem' }}>{country.monarch.mil}</span>
            </span>
          </span>
        </div>
      </div>

      <Separator />

      {/* Global Pools & Resource Stats (EU4 style with nice SVG icons) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Gold */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title="Gold (Altın)">
          <GoldIcon />
          <span style={{ fontWeight: 'bold', color: 'var(--color-gold)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
            {country.gold}
          </span>
        </div>

        {/* Manpower */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title="Manpower (İnsan Gücü)">
          <ManpowerIcon />
          <span style={{ fontWeight: 'bold', color: '#f3e5c8', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
            {Math.floor(country.manpower / 1000)}k / {Math.floor(country.maxManpower / 1000)}k
          </span>
        </div>

        {/* Stability */}
        <div 
          onClick={() => increaseStability(activePlayerTag)} 
          style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'filter 0.1s ease' }} 
          onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.2)'}
          onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
          title="Stability (İstikrar) - Click to boost using ADM mana"
        >
          <StabilityIcon />
          <span style={{ fontWeight: 'bold', color: 'var(--color-stability)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
            {country.stability >= 0 ? `+${country.stability}` : country.stability}
          </span>
        </div>

        {/* Prestige */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title="Prestige (Prestij)">
          <PrestigeIcon />
          <span style={{ fontWeight: 'bold', color: '#f3e5c8', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
            {country.prestige}
          </span>
        </div>

        {/* War Exhaustion */}
        <div 
          onClick={() => reduceWarExhaustion(activePlayerTag)} 
          style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'filter 0.1s ease' }}
          onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.2)'}
          onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
          title="War Exhaustion (Savaş Yorgunluğu) - Click to reduce using DIP mana"
        >
          <WarExhaustionIcon />
          <span style={{ fontWeight: 'bold', color: 'var(--color-unrest)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
            {country.warExhaustion.toFixed(1)}
          </span>
        </div>

        {/* Overextension */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title="Overextension (Aşırı Yayılma)">
          <OverextensionIcon />
          <span style={{ fontWeight: 'bold', color: '#ff7675', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
            {country.overextension}%
          </span>
        </div>

        {/* Victory Score */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title="Score (Skor)">
          <ScoreIcon />
          <span style={{ fontWeight: 'bold', color: '#f3e5c8', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
            {country.victoryScore}
          </span>
        </div>
      </div>

      <Separator />

      {/* Power Mana Points (EU4 style with scroll/letter/shield inline SVGs) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
        {/* ADM */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} title={`ADM Mana: ${country.mana.adm} (+${country.manaIncome.adm}/m)`}>
          <AdmIcon />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1' }}>
            <span style={{ fontWeight: 'bold', color: '#f3e5c8', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>{country.mana.adm}</span>
            <span style={{ fontSize: '0.62rem', color: '#ff7675', fontWeight: 'bold', marginTop: '2px' }}>+{country.manaIncome.adm}</span>
          </div>
        </div>

        {/* DIP */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} title={`DIP Mana: ${country.mana.dip} (+${country.manaIncome.dip}/m)`}>
          <DipIcon />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1' }}>
            <span style={{ fontWeight: 'bold', color: '#f3e5c8', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>{country.mana.dip}</span>
            <span style={{ fontSize: '0.62rem', color: '#74b9ff', fontWeight: 'bold', marginTop: '2px' }}>+{country.manaIncome.dip}</span>
          </div>
        </div>

        {/* MIL */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} title={`MIL Mana: ${country.mana.mil} (+${country.manaIncome.mil}/m)`}>
          <MilIcon />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1' }}>
            <span style={{ fontWeight: 'bold', color: '#f3e5c8', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>{country.mana.mil}</span>
            <span style={{ fontSize: '0.62rem', color: '#55efc4', fontWeight: 'bold', marginTop: '2px' }}>+{country.manaIncome.mil}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Date & Speed Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          fontSize: '0.95rem',
          fontWeight: 'bold',
          fontFamily: 'var(--font-title)',
          letterSpacing: '0.5px',
          color: '#f3e5c8',
          background: 'rgba(0,0,0,0.4)',
          padding: '4px 12px',
          border: '1px solid #8c6d39',
          borderRadius: '4px',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.8)',
          textShadow: '0 1px 2px rgba(0,0,0,0.8)'
        }}>
          {formatDate()}
        </div>

        <button
          onClick={togglePause}
          style={{
            padding: '4px 10px',
            background: isPaused ? 'linear-gradient(to bottom, #d35400, #a04000)' : 'linear-gradient(to bottom, #27ae60, #1e8449)',
            border: '1.5px solid #8c6d39',
            color: '#fff',
            fontSize: '0.7rem',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.6)',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-title)',
            borderRadius: '4px',
            minWidth: '76px'
          }}
        >
          {isPaused ? '▶ Play' : '⏸ Pause'}
        </button>

        <div style={{ display: 'flex', gap: '3px' }}>
          {[1, 2, 3].map((speed) => (
            <button
              key={speed}
              onClick={() => setSpeed(speed)}
              style={{
                padding: '4px 8px',
                background: gameSpeed === speed ? 'linear-gradient(to bottom, #e5c158, #b8860b)' : 'linear-gradient(to bottom, #2c3e50, #1a252f)',
                border: '1px solid #8c6d39',
                color: gameSpeed === speed ? '#000' : '#f3e5c8',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                boxShadow: gameSpeed === speed ? '0 0 8px rgba(212,175,55,0.6)' : 'none',
                fontFamily: 'var(--font-title)',
                borderRadius: '3px'
              }}
            >
              {speed}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
