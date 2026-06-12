import React from 'react';
import { useGameStore } from '../../game/store/gameStore';

interface ArmyPanelProps {
  armyId: string;
  onClose: () => void;
}

export const ArmyPanel: React.FC<ArmyPanelProps> = ({ armyId, onClose }) => {
  const army = useGameStore((state) => state.armies[armyId]);
  const provinces = useGameStore((state) => state.provinces);
  const armies = useGameStore((state) => state.armies);
  const splitArmy = useGameStore((state) => state.splitArmy);
  const mergeArmies = useGameStore((state) => state.mergeArmies);

  if (!army) return null;

  const otherArmiesInProvince = Object.values(armies).filter(
    (a) =>
      a.id !== armyId &&
      a.locationProvinceId === army.locationProvinceId &&
      a.owner === army.owner &&
      a.size > 0 &&
      !a.isRetreating
  );

  if (!army) return null;

  const province = provinces[army.locationProvinceId];
  if (!province) return null;

  return (
    <div
      className="glass-panel"
      style={{
        position: 'absolute',
        bottom: '20px',
        left: '84px',
        width: '420px',
        height: '115px',
        padding: '12px 16px',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0f131a',
        border: '1.5px solid var(--border-gold)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.85)'
      }}
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {/* General Portrait Placeholder */}
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2c3e50, #0f172a)',
            border: '1.5px solid var(--border-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--border-gold)',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.8)'
          }}
        >
          👤
        </div>

        {/* General Stats & Morale */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.85rem', fontFamily: 'var(--font-title)' }}>
              {army.general ? army.general.name : 'No General'}
            </span>
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-gold)' }}>
              {(army.size / 1000).toFixed(1)}k Troops
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#a1a1aa' }}>
            <span>
              {army.general ? `Fire: ${army.general.fire} | Shock: ${army.general.shock}` : 'Recruit General for pips'}
            </span>
            <span>
              Morale: <strong style={{ color: 'var(--color-mil)' }}>{army.morale.toFixed(1)} / 5.0</strong>
            </span>
          </div>

          {/* Morale bar */}
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden', marginTop: '2px' }}>
            <div style={{ width: `${(army.morale / 5.0) * 100}%`, height: '100%', background: 'var(--color-mil)' }} />
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', borderTop: '1px solid rgba(212,175,55,0.15)', paddingTop: '6px' }}>
        {army.size > 1000 && !army.isRetreating && (
          <button onClick={() => splitArmy(armyId)} style={{ padding: '4px 8px', fontSize: '0.7rem', flex: 1 }}>
            ✂ Split
          </button>
        )}
        
        {otherArmiesInProvince.length > 0 && !army.isRetreating && (
          <select
            onChange={(e) => {
              if (e.target.value) {
                mergeArmies(armyId, e.target.value);
                onClose();
              }
            }}
            defaultValue=""
            style={{
              background: '#161c24',
              border: '1px solid var(--border-gold-dark)',
              borderRadius: '3px',
              color: '#f3e5c8',
              fontSize: '0.7rem',
              padding: '3px 6px',
              fontFamily: 'var(--font-title)',
              fontWeight: '700',
              textTransform: 'uppercase',
              flex: 1.2
            }}
          >
            <option value="" disabled>Merge...</option>
            {otherArmiesInProvince.map((a) => (
              <option key={a.id} value={a.id}>
                {(a.size / 1000).toFixed(0)}k {a.general ? `(${a.general.name.slice(0, 8)})` : ''}
              </option>
            ))}
          </select>
        )}

        <button onClick={onClose} className="secondary" style={{ padding: '4px 8px', fontSize: '0.7rem' }}>
          Close
        </button>
      </div>
    </div>
  );
};
