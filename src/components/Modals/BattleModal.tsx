import React from 'react';
import { useGameStore } from '../../game/store/gameStore';
import { useShallow } from 'zustand/react/shallow';

interface BattleModalProps {
  battleId: string;
}

export const BattleModal: React.FC<BattleModalProps> = ({ battleId }) => {
  const { battle, attacker, defender, province } = useGameStore(
    useShallow((state) => {
      const activeBattle = state.battles[battleId];
      return {
        battle: activeBattle,
        attacker: activeBattle ? state.armies[activeBattle.attackerArmyId] : null,
        defender: activeBattle ? state.armies[activeBattle.defenderArmyId] : null,
        province: activeBattle ? state.provinces[activeBattle.provinceId] : null
      };
    })
  );

  if (!battle || !attacker || !defender || !province) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '500px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          background: 'rgba(15, 15, 20, 0.98)',
          border: '1px solid rgba(255,255,255,0.15)'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.25rem', color: '#fff' }}>
            Battle of {province.name}
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-unrest)' }}>
            Phase: {battle.phase} (Day {battle.daysInPhase + 1}) | Round {battle.round}
          </span>
        </div>

        {/* Combat layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '20px' }}>
          {/* Attacker */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
            <h3 style={{ color: '#fff', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: useGameStore.getState().countries[battle.attackerTag]?.color }} />
              {battle.attackerTag}
            </h3>
            <div style={{ fontSize: '0.85rem' }}>
              <span>Size: <strong>{attacker.size.toLocaleString()}</strong></span>
            </div>
            {/* Morale bar */}
            <div style={{ width: '100%' }}>
              <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>Morale ({attacker.morale.toFixed(1)})</span>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', marginTop: '2px' }}>
                <div style={{ width: `${(attacker.morale / 5.0) * 100}%`, height: '100%', background: 'var(--color-mil)' }} />
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>
              Gen: {attacker.general ? attacker.general.name : 'No General'}
            </span>
          </div>

          {/* VS & Rolls */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#a1a1aa' }}>VS</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ padding: '6px 10px', background: 'var(--color-adm-glow)', border: '1px solid var(--color-adm)', borderRadius: '4px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                {battle.attackerRoll}
              </div>
              <div style={{ padding: '6px 10px', background: 'var(--color-dip-glow)', border: '1px solid var(--color-dip)', borderRadius: '4px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                {battle.defenderRoll}
              </div>
            </div>
            <span style={{ fontSize: '0.7rem', color: '#a1a1aa' }}>Dice Rolls</span>
          </div>

          {/* Defender */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'right' }}>
            <h3 style={{ color: '#fff', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
              {battle.defenderTag}
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: useGameStore.getState().countries[battle.defenderTag]?.color }} />
            </h3>
            <div style={{ fontSize: '0.85rem' }}>
              <span>Size: <strong>{defender.size.toLocaleString()}</strong></span>
            </div>
            {/* Morale bar */}
            <div style={{ width: '100%' }}>
              <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>Morale ({defender.morale.toFixed(1)})</span>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', marginTop: '2px' }}>
                <div style={{ width: `${(defender.morale / 5.0) * 100}%`, height: '100%', background: 'var(--color-mil)', marginLeft: 'auto' }} />
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>
              Gen: {defender.general ? defender.general.name : 'No General'}
            </span>
          </div>
        </div>

        {province.terrain !== 'Plains' && (
          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#ff7675', background: 'rgba(231, 76, 60, 0.05)', padding: '6px', borderRadius: '4px' }}>
            ⚠️ Terrain penalty applied for attacker: {province.terrain === 'Hills' ? '-1 Roll (Hills)' : '-2 Roll (Mountains)'}
          </div>
        )}
      </div>
    </div>
  );
};
