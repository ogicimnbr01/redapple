import React, { useState } from 'react';
import { useGameStore } from '../../game/store/gameStore';
import { useShallow } from 'zustand/react/shallow';

export const DiplomacyPanel: React.FC = () => {
  const {
    activePlayerTag,
    activeCountry,
    countries,
    provinces,
    proposeRoyalMarriage,
    declareWar,
    formAlliance,
    breakAlliance,
    setSpyTarget
  } = useGameStore(
    useShallow((state) => ({
      activePlayerTag: state.activePlayerTag,
      activeCountry: state.countries[state.activePlayerTag],
      countries: state.countries,
      provinces: state.provinces,
      proposeRoyalMarriage: state.proposeRoyalMarriage,
      declareWar: state.declareWar,
      formAlliance: state.formAlliance,
      breakAlliance: state.breakAlliance,
      setSpyTarget: state.setSpyTarget
    }))
  );

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showCbSelect, setShowCbSelect] = useState(false);

  if (!activeCountry) return null;

  const targetCountry = selectedTag ? countries[selectedTag] : null;

  const hasClaims = targetCountry
    ? Object.values(provinces).some(p => p.owner === selectedTag && p.claims.includes(activePlayerTag))
    : false;

  const hasCores = targetCountry
    ? Object.values(provinces).some(p => p.owner === selectedTag && p.cores.includes(activePlayerTag))
    : false;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: '#e4e4e7', fontSize: '0.9rem', height: '100%' }}>
      <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
        Diplomacy
      </h2>

      {!selectedTag ? (
        // Countries Selection List
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1 }}>
          {Object.keys(countries)
            .filter((tag) => tag !== activePlayerTag && tag !== 'REB')
            .map((tag) => {
              const country = countries[tag];
              const relations = activeCountry.relations[tag] || 0;
              const ae = activeCountry.aggressiveExpansion[tag] || 0;

              return (
                <div
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className="glass-panel"
                  style={{
                    padding: '10px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: country.color }} />
                    <span style={{ fontWeight: 'bold' }}>{country.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '15px', fontSize: '0.8rem' }}>
                    <span>Rel: <strong style={{ color: relations >= 0 ? 'var(--color-stability)' : '#ff7675' }}>{relations}</strong></span>
                    {ae > 0 && <span style={{ color: '#ff7675' }}>AE: {ae.toFixed(0)}</span>}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        // Selected Country Panel Detail
        targetCountry && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            <button
              onClick={() => {
                setSelectedTag(null);
                setShowCbSelect(false);
              }}
              style={{ width: 'fit-content', padding: '4px 8px', fontSize: '0.8rem' }}
            >
              ← Back to List
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: targetCountry.color }} />
              <div>
                <h3 style={{ color: '#fff', fontSize: '1.05rem' }}>{targetCountry.name}</h3>
                <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>Tech Group: {targetCountry.techGroup}</span>
              </div>
            </div>

            {/* Relations matrix */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span>Our relations: <strong style={{ color: (activeCountry.relations[selectedTag] || 0) >= 0 ? 'var(--color-stability)' : '#ff7675' }}>{activeCountry.relations[selectedTag] || 0}</strong></span>
              <span>Aggressive Expansion: <strong style={{ color: '#ff7675' }}>{(activeCountry.aggressiveExpansion[selectedTag] || 0).toFixed(0)}</strong></span>
            </div>

            {/* Spy Network status matrix */}
            {selectedTag && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Spy Network: <strong style={{ color: (activeCountry.spyNetworks?.[selectedTag] || 0) >= 60 ? 'var(--color-stability)' : '#a1a1aa' }}>{(activeCountry.spyNetworks?.[selectedTag] || 0).toFixed(0)}%</strong></span>
                  {activeCountry.spyTarget === selectedTag && <span style={{ fontSize: '0.75rem', color: 'var(--color-stability)' }}>🕵️ Building (+3/mo)</span>}
                  {activeCountry.spyTarget !== selectedTag && (activeCountry.spyNetworks?.[selectedTag] || 0) > 0 && <span style={{ fontSize: '0.75rem', color: '#ff7675' }}>📉 Decaying (-1/mo)</span>}
                </div>
                {(activeCountry.spyNetworks?.[selectedTag] || 0) >= 60 ? (
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-stability)' }}>✓ Vision obtained (Fog of War lifted)</span>
                ) : (
                  <span style={{ fontSize: '0.75rem', color: '#ff7675' }}>✗ Under Fog of War (Requires 60%)</span>
                )}
              </div>
            )}

            {/* Diplomatic Status Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              {/* Spy Network Action Toggle */}
              {selectedTag && (
                activeCountry.spyTarget === selectedTag ? (
                  <button
                    onClick={() => setSpyTarget(activePlayerTag, null)}
                    style={{ width: '100%', background: 'rgba(231, 76, 60, 0.1)', borderColor: '#e74c3c', color: '#ff7675' }}
                  >
                    Stop Building Spy Network
                  </button>
                ) : (
                  <button
                    onClick={() => setSpyTarget(activePlayerTag, selectedTag)}
                    style={{ width: '100%' }}
                  >
                    🕵️ Build Spy Network
                  </button>
                )
              )}
              {/* Royal Marriage (Only Christian tags BOH, BRA, SAX, HAB, HUN, VEN, BYZ, SER, WAL) */}
              {targetCountry.religion !== 'Sunni' && activeCountry.religion !== 'Sunni' && (
                <button
                  disabled={activeCountry.royalMarriages.includes(selectedTag)}
                  onClick={() => proposeRoyalMarriage(activePlayerTag, selectedTag)}
                  style={{ width: '100%' }}
                >
                  {activeCountry.royalMarriages.includes(selectedTag) ? '♥ Royal Marriage Active' : '♥ Propose Royal Marriage'}
                </button>
              )}

              {/* Alliance Toggle */}
              {activeCountry.allies.includes(selectedTag) ? (
                <button onClick={() => breakAlliance(activePlayerTag, selectedTag)} style={{ width: '100%', borderColor: '#e74c3c', color: '#ff7675' }}>
                  Break Alliance
                </button>
              ) : (
                <button
                  disabled={(activeCountry.relations[selectedTag] || 0) < 100}
                  onClick={() => formAlliance(activePlayerTag, selectedTag)}
                  style={{ width: '100%' }}
                >
                  Form Alliance (Requires +100 Relations)
                </button>
              )}

              {/* War triggers */}
              {!showCbSelect ? (
                <button
                  onClick={() => setShowCbSelect(true)}
                  style={{ width: '100%', background: 'rgba(192, 57, 43, 0.2)', borderColor: '#c0392b', color: '#ff7675', fontWeight: 'bold' }}
                >
                  ⚔ Declare War
                </button>
              ) : (
                <div className="glass-panel" style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#fff' }}>Select Casus Belli:</span>
                  
                  {/* Conquest CB */}
                  <button
                    disabled={!hasClaims}
                    onClick={() => {
                      declareWar(activePlayerTag, selectedTag, 'conquest');
                      setSelectedTag(null);
                    }}
                    style={{ width: '100%', fontSize: '0.8rem', padding: '6px' }}
                  >
                    Conquest CB (100% AE)
                  </button>

                  {/* Reconquest CB */}
                  <button
                    disabled={!hasCores}
                    onClick={() => {
                      declareWar(activePlayerTag, selectedTag, 'reconquest');
                      setSelectedTag(null);
                    }}
                    style={{ width: '100%', fontSize: '0.8rem', padding: '6px' }}
                  >
                    Reconquest CB (25% AE, 50% WarScore)
                  </button>

                  {/* No-CB War with heavy warning */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <button
                      onClick={() => {
                        declareWar(activePlayerTag, selectedTag, 'no_cb');
                        setSelectedTag(null);
                      }}
                      style={{ width: '100%', fontSize: '0.8rem', padding: '6px', background: 'rgba(231, 76, 60, 0.15)', borderColor: '#e74c3c' }}
                    >
                      Declare No-CB War
                    </button>
                    <span style={{ fontSize: '0.7rem', color: '#ff7675', fontStyle: 'italic', textAlign: 'center' }}>
                      ⚠️ Costs -2 stability, generates 200% AE!
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};
