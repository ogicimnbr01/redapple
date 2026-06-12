import React from 'react';
import { useGameStore } from '../../game/store/gameStore';
import { useShallow } from 'zustand/react/shallow';

export const EventModal: React.FC = () => {
  const { activeEvent, resolveEvent } = useGameStore(
    useShallow((state) => ({
      activeEvent: state.activeEvent,
      resolveEvent: state.resolveEvent
    }))
  );

  if (!activeEvent) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.65)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '460px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          background: 'rgba(15, 15, 22, 0.98)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '2px', color: 'var(--color-prestige)', fontWeight: 'bold' }}>
            NATION EVENT
          </span>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', color: '#fff', marginTop: '4px' }}>
            {activeEvent.title}
          </h2>
        </div>

        {/* Body Text */}
        <p style={{ fontSize: '0.9rem', color: '#d1d1d6', lineHeight: '1.5', textAlign: 'center', fontStyle: 'italic' }}>
          "{activeEvent.description}"
        </p>

        {/* Choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          {activeEvent.choices.map((choice: any) => (
            <button
              key={choice.id}
              onClick={() => resolveEvent(choice.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
                width: '100%'
              }}
            >
              <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.85rem' }}>
                {choice.text}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-unrest)', marginTop: '2px' }}>
                {choice.effectText}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
