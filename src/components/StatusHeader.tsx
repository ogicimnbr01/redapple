import React from 'react';
import { useGameStore } from '../game/store/gameStore';
import { useShallow } from 'zustand/react/shallow';

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
      return <span style={{ color: '#f1c40f', fontSize: '0.75rem', fontWeight: 'bold' }}>👑 Emperor</span>;
    }
    return null;
  };

  return (
    <div
      style={{
        height: '8%',
        width: '100%',
        borderBottom: '1.5px solid var(--border-gold-dark)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 100,
        background: '#0c1017',
        boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
      }}
    >
      {/* Flag / Ruler & Active Country Information */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        {/* Country Flag emblem (EU4 Shield Style) */}
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
            border: '3.5px solid var(--border-gold)',
            borderBottomLeftRadius: '23px',
            borderBottomRightRadius: '23px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.2)',
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
          <span style={{ color: 'rgba(0,0,0,0.85)', fontWeight: '900', fontSize: '1.4rem', zIndex: 2, fontFamily: 'var(--font-title)', pointerEvents: 'none', textShadow: '0 1px 1px rgba(255,255,255,0.3)' }}>
            {country.name.charAt(0)}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#fff', fontFamily: 'var(--font-title)', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {country.name} {getHreBadge()}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>
            {country.monarch.isRegent ? 'Regency Council' : `${country.monarch.name}`} ({Math.floor(country.monarch.age)}y)
            <span style={{ marginLeft: '8px', fontWeight: 'bold', color: '#ff7675' }}>{country.monarch.adm}</span>/
            <span style={{ fontWeight: 'bold', color: '#74b9ff' }}>{country.monarch.dip}</span>/
            <span style={{ fontWeight: 'bold', color: '#55efc4' }}>{country.monarch.mil}</span>
          </span>
        </div>
      </div>

      {/* Global Pools & Resource Stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px', fontSize: '0.9rem' }}>
        {/* Gold */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.65rem', color: '#a1a1aa', fontWeight: 'bold', letterSpacing: '0.5px' }}>GOLD</span>
          <span style={{ fontWeight: 'bold', color: 'var(--color-gold)', fontFamily: 'monospace', fontSize: '0.95rem' }}>{country.gold}</span>
        </div>

        {/* Manpower */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.65rem', color: '#a1a1aa', fontWeight: 'bold', letterSpacing: '0.5px' }}>MANPOWER</span>
          <span style={{ fontWeight: 'bold', color: '#fff', fontFamily: 'monospace', fontSize: '0.95rem' }}>
            {Math.floor(country.manpower / 1000)}k / {Math.floor(country.maxManpower / 1000)}k
          </span>
        </div>

        {/* Stability */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => increaseStability(activePlayerTag)}>
          <span style={{ fontSize: '0.65rem', color: '#a1a1aa', fontWeight: 'bold', letterSpacing: '0.5px' }}>STABILITY</span>
          <span style={{ fontWeight: 'bold', color: 'var(--color-stability)', fontFamily: 'monospace', fontSize: '0.95rem' }}>
            {country.stability >= 0 ? `+${country.stability}` : country.stability}
          </span>
        </div>

        {/* Prestige */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.65rem', color: '#a1a1aa', fontWeight: 'bold', letterSpacing: '0.5px' }}>PRESTIGE</span>
          <span style={{ fontWeight: 'bold', color: 'var(--color-prestige)', fontFamily: 'monospace', fontSize: '0.95rem' }}>{country.prestige}</span>
        </div>

        {/* War Exhaustion */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => reduceWarExhaustion(activePlayerTag)}>
          <span style={{ fontSize: '0.65rem', color: '#a1a1aa', fontWeight: 'bold', letterSpacing: '0.5px' }}>WAR EXH</span>
          <span style={{ fontWeight: 'bold', color: 'var(--color-unrest)', fontFamily: 'monospace', fontSize: '0.95rem' }}>{country.warExhaustion.toFixed(1)}</span>
        </div>

        {/* Overextension */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.65rem', color: '#a1a1aa', fontWeight: 'bold', letterSpacing: '0.5px' }}>OVEREXT</span>
          <span style={{ fontWeight: 'bold', color: '#ff7675', fontFamily: 'monospace', fontSize: '0.95rem' }}>{country.overextension}%</span>
        </div>

        {/* Victory Score */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.65rem', color: '#a1a1aa', fontWeight: 'bold', letterSpacing: '0.5px' }}>SCORE</span>
          <span style={{ fontWeight: 'bold', color: '#fff', fontFamily: 'monospace', fontSize: '0.95rem' }}>{country.victoryScore}</span>
        </div>

        {/* Power Mana Points Capsules */}
        <div style={{ display: 'flex', gap: '8px', paddingLeft: '14px', borderLeft: '1.5px solid rgba(212,175,55,0.2)' }}>
          {/* ADM */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-adm)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
              color: '#fff',
              fontWeight: '800',
              fontSize: '0.75rem',
              position: 'relative'
            }}
            title={`ADM Mana: ${country.mana.adm} (+${country.manaIncome.adm}/m)`}
          >
            <span>{country.mana.adm}</span>
            <div style={{ position: 'absolute', bottom: '-12px', fontSize: '0.55rem', color: '#ff7675', fontWeight: 'bold' }}>
              +{country.manaIncome.adm}
            </div>
          </div>

          {/* DIP */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-dip)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
              color: '#fff',
              fontWeight: '800',
              fontSize: '0.75rem',
              position: 'relative'
            }}
            title={`DIP Mana: ${country.mana.dip} (+${country.manaIncome.dip}/m)`}
          >
            <span>{country.mana.dip}</span>
            <div style={{ position: 'absolute', bottom: '-12px', fontSize: '0.55rem', color: '#74b9ff', fontWeight: 'bold' }}>
              +{country.manaIncome.dip}
            </div>
          </div>

          {/* MIL */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-mil)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
              color: '#fff',
              fontWeight: '800',
              fontSize: '0.75rem',
              position: 'relative'
            }}
            title={`MIL Mana: ${country.mana.mil} (+${country.manaIncome.mil}/m)`}
          >
            <span>{country.mana.mil}</span>
            <div style={{ position: 'absolute', bottom: '-12px', fontSize: '0.55rem', color: '#55efc4', fontWeight: 'bold' }}>
              +{country.manaIncome.mil}
            </div>
          </div>
        </div>
      </div>

      {/* Date & Speed Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderLeft: '1.5px solid rgba(212,175,55,0.2)', paddingLeft: '14px' }}>
        <div style={{ fontSize: '1.05rem', fontWeight: 'bold', fontFamily: 'var(--font-title)', letterSpacing: '0.5px', color: '#fff' }}>
          {formatDate()}
        </div>
        <button
          onClick={togglePause}
          style={{
            padding: '4px 8px',
            background: isPaused ? 'rgba(231, 76, 60, 0.15)' : 'rgba(46, 204, 113, 0.15)',
            borderColor: isPaused ? '#e74c3c' : '#2ecc71',
            fontSize: '0.7rem'
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
                padding: '4px 7px',
                background: gameSpeed === speed ? 'rgba(212,175,55,0.15)' : 'transparent',
                borderColor: gameSpeed === speed ? 'var(--border-active)' : 'transparent',
                fontSize: '0.65rem'
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
