import React from 'react';
import { useGameStore } from '../../game/store/gameStore';
import { useShallow } from 'zustand/react/shallow';

export const HrePanel: React.FC = () => {
  const {
    activePlayerTag,
    emperorTag,
    hreElectors,
    countries,
    passHreReform
  } = useGameStore(
    useShallow((state) => ({
      activePlayerTag: state.activePlayerTag,
      emperorTag: state.emperorTag,
      hreElectors: state.hreElectors,
      countries: state.countries,
      passHreReform: state.passHreReform
    }))
  );

  const emperor = countries[emperorTag];
  if (!emperor) return null;

  const isPlayerEmperor = activePlayerTag === emperorTag;
  
  const reforms = [
    { name: 'Reichsreform', ia: 50, gold: 500, desc: 'Sets HRE min autonomy limit to 80%' },
    { name: 'Reichskammergericht', ia: 60, gold: 1000, desc: 'Sets HRE min autonomy limit to 60%' },
    { name: 'Gemeine Pfennig', ia: 70, gold: 1500, desc: 'Sets HRE min autonomy limit to 40%' },
    { name: 'Ewiger Landfriede', ia: 80, gold: 2000, desc: 'Sets HRE min autonomy limit to 20%' },
    { name: 'Renovatio Imperii', ia: 100, gold: 3000, desc: 'Integrates all member states' }
  ];

  const reformsPassed = emperor.hreReformsPassed ?? 0;
  const nextReform = reforms[reformsPassed];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: '#e4e4e7', fontSize: '0.9rem', height: '100%' }}>
      <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
        Holy Roman Empire
      </h2>

      {/* Emperor Info card */}
      <div className="glass-panel" style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Current Emperor:</span>
          <strong style={{ color: 'var(--color-gold)' }}>{emperor.name} ({emperorTag})</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Imperial Authority (IA):</span>
          <strong style={{ color: '#fff' }}>{(emperor.imperialAuthority ?? 0).toFixed(1)} / 100</strong>
        </div>
      </div>

      {/* Electors Votes */}
      <div className="glass-panel" style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{ fontWeight: 'bold', color: '#fff' }}>Elector Votes breakdown</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem' }}>
          {hreElectors.map((tag) => {
            const elector = countries[tag];
            const voteTarget = elector ? elector.voteTarget : 'None';
            const targetColor = voteTarget && countries[voteTarget] ? countries[voteTarget].color : '#fff';
            return (
              <div key={tag} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{tag} ({elector ? 'Ghost' : 'Map'}):</span>
                <strong style={{ color: targetColor }}>{voteTarget}</strong>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reforms Checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1 }}>
        <span style={{ fontWeight: 'bold', color: '#fff' }}>Reforms Tree</span>
        {reforms.map((ref, idx) => {
          const isPassed = idx < reformsPassed;
          const isNext = idx === reformsPassed;
          
          return (
            <div
              key={ref.name}
              className="glass-panel"
              style={{
                padding: '10px 14px',
                background: isPassed ? 'rgba(39, 174, 96, 0.05)' : isNext ? 'rgba(241, 196, 15, 0.05)' : 'rgba(0,0,0,0.2)',
                borderColor: isPassed ? 'var(--color-mil)' : isNext ? 'var(--color-gold)' : 'var(--border-light)',
                opacity: isPassed || isNext ? 1 : 0.6
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{idx + 1}. {ref.name}</span>
                <span style={{ color: isPassed ? 'var(--color-mil)' : isNext ? 'var(--color-gold)' : '#a1a1aa' }}>
                  {isPassed ? '✓ Passed' : isNext ? '▶ Next' : 'Locked'}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#a1a1aa', marginTop: '4px' }}>{ref.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Pass Reform Button */}
      {isPlayerEmperor && nextReform && (
        <button
          disabled={(emperor.imperialAuthority ?? 0) < nextReform.ia || emperor.gold < nextReform.gold}
          onClick={passHreReform}
          style={{ width: '100%', borderColor: 'var(--color-gold)', color: 'var(--color-gold)' }}
        >
          ⚙ Pass Reform ({nextReform.ia} IA & {nextReform.gold} Gold)
        </button>
      )}
    </div>
  );
};
