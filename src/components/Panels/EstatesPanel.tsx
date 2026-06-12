import React from 'react';
import { useGameStore } from '../../game/store/gameStore';
import { useShallow } from 'zustand/react/shallow';

export const EstatesPanel: React.FC = () => {
  const {
    activePlayerTag,
    country,
    summonDiet,
    seizeLand,
    saleOfTitles
  } = useGameStore(
    useShallow((state) => ({
      activePlayerTag: state.activePlayerTag,
      country: state.countries[state.activePlayerTag],
      summonDiet: state.summonDiet,
      seizeLand: state.seizeLand,
      saleOfTitles: state.saleOfTitles
    }))
  );

  if (!country) return null;

  const renderEstateRow = (name: string, loyalty: number, influence: number, landShare: number) => {
    const getLoyaltyColor = (val: number) => (val >= 60 ? 'var(--color-mil)' : val < 30 ? 'var(--color-adm)' : '#fff');
    const getInfluenceColor = (val: number) => (val >= 70 ? 'var(--color-unrest)' : '#fff');

    return (
      <div className="glass-panel" style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <span style={{ color: '#fff' }}>{name}</span>
          <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Land: {landShare}%</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '0.85rem' }}>
          <div>
            <span style={{ color: '#a1a1aa', fontSize: '0.75rem', display: 'block' }}>LOYALTY</span>
            <strong style={{ color: getLoyaltyColor(loyalty) }}>{loyalty}%</strong>
          </div>
          <div>
            <span style={{ color: '#a1a1aa', fontSize: '0.75rem', display: 'block' }}>INFLUENCE</span>
            <strong style={{ color: getInfluenceColor(influence) }}>{influence}%</strong>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: '#e4e4e7', fontSize: '0.9rem', height: '100%' }}>
      <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
        Estates & Crown Land
      </h2>

      {/* Crown Land Status */}
      <div className="glass-panel" style={{ padding: '14px', background: 'rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: '#a1a1aa', display: 'block' }}>CROWN LAND SHARE</span>
          <strong style={{ fontSize: '1.2rem', color: 'var(--color-gold)' }}>{country.crownLand}%</strong>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#a1a1aa', maxWidth: '60%', textAlign: 'right' }}>
          Higher crown land increases tax and reduces autonomy, lower triggers penalties.
        </span>
      </div>

      {/* Estates List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', flex: 1 }}>
        {renderEstateRow('Nobility (Soylular)', country.estates.nobility.loyalty, country.estates.nobility.influence, country.estates.nobility.landShare)}
        {renderEstateRow('Clergy (Ruhban)', country.estates.clergy.loyalty, country.estates.clergy.influence, country.estates.clergy.landShare)}
        {renderEstateRow('Burghers (Tüccarlar)', country.estates.burghers.loyalty, country.estates.burghers.influence, country.estates.burghers.landShare)}
      </div>

      {/* Interactive Estate Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
        <button onClick={() => summonDiet(activePlayerTag)} style={{ width: '100%' }}>
          📢 Summon the Diet (+15% Loyalty target)
        </button>
        <button onClick={() => seizeLand(activePlayerTag)} style={{ width: '100%', borderColor: 'var(--color-unrest)' }}>
          ⚔ Seize Land (+5% Crown, -15% Loyalty)
        </button>
        <button disabled={country.crownLand < 10} onClick={() => saleOfTitles(activePlayerTag)} style={{ width: '100%', borderColor: 'var(--color-gold)' }}>
          💰 Sale of Titles (-10% Crown, +10% Loyalty)
        </button>
      </div>
    </div>
  );
};
