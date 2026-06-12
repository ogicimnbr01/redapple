import React from 'react';
import { useGameStore } from '../../game/store/gameStore';
import { useShallow } from 'zustand/react/shallow';
import { getProvinceDevelopment } from '../../game/utils/helpers';

interface ProvincePanelProps {
  provinceId: string;
}

export const ProvincePanel: React.FC<ProvincePanelProps> = ({ provinceId }) => {
  const {
    province,
    activePlayerTag,
    activeCountry,
    countries,
    developProvince,
    coreProvince,
    changeAutonomy,
    startClaimFabrication
  } = useGameStore(
    useShallow((state) => ({
      province: state.provinces[provinceId],
      activePlayerTag: state.activePlayerTag,
      activeCountry: state.countries[state.activePlayerTag],
      countries: state.countries,
      developProvince: state.developProvince,
      coreProvince: state.coreProvince,
      changeAutonomy: state.changeAutonomy,
      startClaimFabrication: state.startClaimFabrication
    }))
  );

  if (!province || !activeCountry) return null;

  const isOwner = province.owner === activePlayerTag;
  const isCored = province.cores.includes(activePlayerTag);
  const totalDev = getProvinceDevelopment(province);

  const getDevCost = () => {
    return Math.floor(50 + totalDev * 1.5);
  };

  const getCoringCost = () => {
    return totalDev * 10;
  };

  const isFabricating = activeCountry.fabricatingClaims && activeCountry.fabricatingClaims[provinceId] !== undefined;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        color: '#f5eedc',
        fontSize: '0.85rem'
      }}
    >
      {/* Province Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '6px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', color: '#fff', letterSpacing: '0.5px' }}>{province.name}</h2>
          <span style={{ fontSize: '0.75rem', color: '#a1a1aa', fontStyle: 'italic' }}>{province.terrain}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ fontSize: '0.7rem', color: '#a1a1aa', textTransform: 'uppercase' }}>Owner:</span>
          <strong style={{ color: countries[province.owner]?.color || '#fff' }}>{province.owner}</strong>
        </div>
      </div>

      {/* Control Info Row */}
      <div className="glass-panel" style={{ padding: '10px 14px', background: 'rgba(7, 9, 14, 0.4)', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
        <span>Controller: <strong style={{ color: countries[province.controller]?.color || '#fff' }}>{province.controller}</strong></span>
        <span>Autonomy: <strong style={{ color: 'var(--color-gold)' }}>{province.autonomy}%</strong></span>
      </div>

      {/* Development Grid Card */}
      <div className="glass-panel" style={{ padding: '14px', background: 'rgba(7, 9, 14, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
          <span>Total Development</span>
          <span style={{ color: 'var(--color-gold)', fontSize: '1.05rem', fontFamily: 'monospace' }}>{totalDev}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* ADM */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-adm)' }} />
              Tax (ADM): <strong style={{ color: '#fff' }}>{province.development.adm}</strong>
            </span>
            {isOwner && (
              <button
                disabled={activeCountry.mana.adm < getDevCost()}
                onClick={() => developProvince(provinceId, 'adm')}
                style={{ padding: '2px 8px', fontSize: '0.65rem' }}
              >
                +{getDevCost()} ADM
              </button>
            )}
          </div>
          {/* DIP */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-dip)' }} />
              Prod (DIP): <strong style={{ color: '#fff' }}>{province.development.dip}</strong>
            </span>
            {isOwner && (
              <button
                disabled={activeCountry.mana.dip < getDevCost()}
                onClick={() => developProvince(provinceId, 'dip')}
                style={{ padding: '2px 8px', fontSize: '0.65rem' }}
              >
                +{getDevCost()} DIP
              </button>
            )}
          </div>
          {/* MIL */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-mil)' }} />
              Manpower (MIL): <strong style={{ color: '#fff' }}>{province.development.mil}</strong>
            </span>
            {isOwner && (
              <button
                disabled={activeCountry.mana.mil < getDevCost()}
                onClick={() => developProvince(provinceId, 'mil')}
                style={{ padding: '2px 8px', fontSize: '0.65rem' }}
              >
                +{getDevCost()} MIL
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Autonomy & Unrest Controls */}
      {isOwner && (
        <div className="glass-panel" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(7, 9, 14, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>Unrest Level</span>
            <span style={{ color: province.unrest > 0 ? 'var(--color-unrest)' : '#fff', fontWeight: 'bold', fontSize: '1rem' }}>
              {province.unrest.toFixed(1)} {province.unrest > 0 ? '⚠️' : ''}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => changeAutonomy(provinceId, true)}
              style={{ flex: 1, padding: '4px', fontSize: '0.65rem' }}
              className="secondary"
            >
              Raise Autonomy (-4 Unrest)
            </button>
            <button
              onClick={() => changeAutonomy(provinceId, false)}
              style={{ flex: 1, padding: '4px', fontSize: '0.65rem' }}
              className="secondary"
            >
              Lower Autonomy (+5 Unrest)
            </button>
          </div>
        </div>
      )}

      {/* Core status or Claims status */}
      <div className="glass-panel" style={{ padding: '14px', background: 'rgba(7, 9, 14, 0.2)' }}>
        {isOwner ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>National Core:</span>
              <strong style={{ color: isCored ? 'var(--color-stability)' : 'var(--color-unrest)', textTransform: 'uppercase' }}>
                {isCored ? 'Cored' : 'Uncored (OE!)'}
              </strong>
            </div>
            {!isCored && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {province.coringProgress !== null && (
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${province.coringProgress}%`, height: '100%', background: 'var(--color-adm)' }} />
                  </div>
                )}
                <button
                  disabled={activeCountry.mana.adm < getCoringCost() || province.coringProgress !== null}
                  onClick={() => coreProvince(provinceId)}
                  style={{ width: '100%', padding: '6px' }}
                  className="primary"
                >
                  {province.coringProgress !== null
                    ? `Coring... (${Math.floor(province.coringProgress)}%)`
                    : `Core Province (${getCoringCost()} ADM)`}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>Diplomatic Claim:</span>
              <strong style={{ color: province.claims.includes(activePlayerTag) ? 'var(--color-stability)' : '#a1a1aa' }}>
                {province.claims.includes(activePlayerTag) ? 'Active Claim' : 'No Claim'}
              </strong>
            </div>
            {!province.claims.includes(activePlayerTag) && (
              <button
                disabled={activeCountry.mana.dip < 50 || isFabricating}
                onClick={() => startClaimFabrication(activePlayerTag, provinceId)}
                style={{ width: '100%', padding: '6px' }}
                className="primary"
              >
                {isFabricating ? 'Fabricating...' : 'Fabricate Claim (50 DIP)'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Buildings section */}
      {isOwner && (
        <div className="glass-panel" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(7, 9, 14, 0.2)' }}>
          <span style={{ fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>Infrastructure</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.75rem' }}>
            <div style={{ padding: '5px', background: province.buildings.workshop ? 'rgba(46,204,113,0.1)' : 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '3px', textAlign: 'center' }}>
              Workshop {province.buildings.workshop ? '✓' : ''}
            </div>
            <div style={{ padding: '5px', background: province.buildings.church ? 'rgba(46,204,113,0.1)' : 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '3px', textAlign: 'center' }}>
              Church {province.buildings.church ? '✓' : ''}
            </div>
            <div style={{ padding: '5px', background: province.buildings.barracks ? 'rgba(46,204,113,0.1)' : 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '3px', textAlign: 'center' }}>
              Barracks {province.buildings.barracks ? '✓' : ''}
            </div>
            <div style={{ padding: '5px', background: province.buildings.fort ? 'rgba(46,204,113,0.1)' : 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '3px', textAlign: 'center' }}>
              Fort {province.buildings.fort ? '✓' : ''}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
