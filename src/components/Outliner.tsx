import React, { useState } from 'react';
import { useGameStore } from '../game/store/gameStore';
import { useShallow } from 'zustand/react/shallow';

interface OutlinerProps {
  selectedArmyId: string | null;
  onSelectArmy: (id: string | null) => void;
  onSelectProvince: (id: string | null) => void;
}

export const Outliner: React.FC<OutlinerProps> = ({
  selectedArmyId,
  onSelectArmy,
  onSelectProvince
}) => {
  const {
    activePlayerTag,
    country,
    armies,
    provinces,
    hireAdvisor,
    fireAdvisor
  } = useGameStore(
    useShallow((state) => ({
      activePlayerTag: state.activePlayerTag,
      country: state.countries[state.activePlayerTag],
      armies: state.armies,
      provinces: state.provinces,
      hireAdvisor: state.hireAdvisor,
      fireAdvisor: state.fireAdvisor
    }))
  );

  const [hiringSlot, setHiringSlot] = useState<'adm' | 'dip' | 'mil' | null>(null);

  if (!country) return null;

  // Filter player armies
  const playerArmies = Object.values(armies).filter((a) => a.owner === activePlayerTag && a.size > 0);

  // Calculate active diplomat tasks
  const activeClaims = country.fabricatingClaims ? Object.entries(country.fabricatingClaims) : [];
  const maxDiplomats = 2; // base diplomats
  const activeDiplomatsCount = activeClaims.length;
  const idleDiplomatsCount = Math.max(0, maxDiplomats - activeDiplomatsCount);

  // Generate available advisors for hiring list dynamically
  const getAvailableAdvisorsForSlot = (type: 'adm' | 'dip' | 'mil') => {
    const pool = {
      adm: [
        { name: 'Philosopher', level: 1, desc: '+1 Adm Mana/m' },
        { name: 'Treasurer', level: 2, desc: '+2 Adm Mana/m' },
        { name: 'Inquisitor', level: 3, desc: '+3 Adm Mana/m' }
      ],
      dip: [
        { name: 'Diplomat', level: 1, desc: '+1 Dip Mana/m' },
        { name: 'Statesman', level: 2, desc: '+2 Dip Mana/m' },
        { name: 'Spy Master', level: 3, desc: '+3 Dip Mana/m' }
      ],
      mil: [
        { name: 'Commandant', level: 1, desc: '+1 Mil Mana/m' },
        { name: 'Army Reformer', level: 2, desc: '+2 Mil Mana/m' },
        { name: 'Grand Captain', level: 3, desc: '+3 Mil Mana/m' }
      ]
    };

    return pool[type];
  };

  const handleHire = (type: 'adm' | 'dip' | 'mil', advisor: { name: string; level: number }) => {
    const cost = advisor.level === 1 ? 20 : advisor.level === 2 ? 80 : 200;
    if (country.gold >= cost) {
      hireAdvisor(type, advisor);
      setHiringSlot(null);
    }
  };

  const handleArmyClick = (armyId: string, locationId: string) => {
    onSelectArmy(armyId);
    onSelectProvince(locationId);
  };

  return (
    <div
      className="glass-panel"
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '260px',
        maxHeight: 'calc(100% - 110px)',
        background: 'rgba(12, 16, 23, 0.88)',
        border: '1.5px solid var(--border-gold-dark)',
        borderRadius: '4px',
        color: '#f5eedc',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 90,
        boxShadow: '0 8px 32px rgba(0,0,0,0.7)',
        overflowY: 'auto'
      }}
    >
      <div
        style={{
          padding: '10px 14px',
          borderBottom: '1px solid rgba(212,175,55,0.15)',
          background: 'rgba(7, 9, 14, 0.4)',
          fontWeight: 'bold',
          fontSize: '0.8rem',
          color: 'var(--border-gold)',
          fontFamily: 'var(--font-title)',
          letterSpacing: '1px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span>OUTLINER</span>
        <span style={{ fontSize: '0.7rem', color: '#a1a1aa' }}>HAB Faction</span>
      </div>

      <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Section: Advisors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3px', color: '#a1a1aa', letterSpacing: '0.5px' }}>
            ADVISORS (DANISMANLAR)
          </div>

          {(['adm', 'dip', 'mil'] as const).map((type) => {
            const advisor = country.advisors?.[type];
            const typeLabel = type.toUpperCase();

            return (
              <div key={type} style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '3px', background: 'rgba(255,255,255,0.01)', padding: '6px', borderRadius: '3px' }}>
                {advisor ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 'bold', color: '#fff' }}>
                        ⭐ Lvl {advisor.level} {advisor.name}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#a1a1aa' }}>
                        {typeLabel} • Upkeep: {advisor.level === 1 ? '1' : advisor.level === 2 ? '4' : '9'}g/m
                      </span>
                    </div>
                    <button
                      onClick={() => fireAdvisor(type)}
                      style={{
                        padding: '2px 6px',
                        background: 'transparent',
                        borderColor: 'transparent',
                        color: '#ff7675',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                      title="Dismiss Advisor"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div>
                    {hiringSlot === type ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: 'bold' }}>Hire {typeLabel} Advisor:</span>
                        {getAvailableAdvisorsForSlot(type).map((adv) => {
                          const cost = adv.level === 1 ? 20 : adv.level === 2 ? 80 : 200;
                          const upkeep = adv.level === 1 ? 1 : adv.level === 2 ? 4 : 9;
                          const canAfford = country.gold >= cost;

                          return (
                            <button
                              key={adv.name}
                              disabled={!canAfford}
                              onClick={() => handleHire(type, adv)}
                              style={{
                                padding: '4px 6px',
                                fontSize: '0.7rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                background: canAfford ? 'rgba(46, 204, 113, 0.08)' : 'rgba(0,0,0,0.2)'
                              }}
                            >
                              <span>Lvl {adv.level} {adv.name} ({upkeep}g/m)</span>
                              <span style={{ color: canAfford ? 'var(--color-gold)' : '#ff7675' }}>{cost}g</span>
                            </button>
                          );
                        })}
                        <button
                          onClick={() => setHiringSlot(null)}
                          style={{ padding: '2px', fontSize: '0.65rem', alignSelf: 'flex-end', marginTop: '2px' }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#a1a1aa', fontStyle: 'italic' }}>{typeLabel} Slot: Empty</span>
                        <button
                          onClick={() => setHiringSlot(type)}
                          style={{ padding: '2px 8px', fontSize: '0.7rem', borderColor: 'var(--border-gold-dark)' }}
                        >
                          + Hire
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Section: Diplomats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3px', color: '#a1a1aa', letterSpacing: '0.5px' }}>
            DIPLOMATS (DIPLOMATLAR)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem' }}>
            {activeClaims.map(([provId, months]) => {
              const provName = provinces[provId]?.name || provId;
              return (
                <div key={provId} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,118,117,0.05)', padding: '4px 6px', borderRadius: '3px' }}>
                  <span style={{ color: '#ff7675' }}>Fabricating Claim</span>
                  <span style={{ fontWeight: 'bold' }}>{provName} ({months}m)</span>
                </div>
              );
            })}

            {Array.from({ length: idleDiplomatsCount }).map((_, idx) => (
              <div key={`idle-${idx}`} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(46, 204, 113, 0.05)', padding: '4px 6px', borderRadius: '3px' }}>
                <span style={{ color: '#2ecc71' }}>Free Diplomat</span>
                <span style={{ opacity: 0.6 }}>Idle</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Armies */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3px', color: '#a1a1aa', letterSpacing: '0.5px' }}>
            ARMIES (ORDULARIMIZ)
          </div>

          {playerArmies.length === 0 ? (
            <span style={{ fontSize: '0.75rem', color: '#a1a1aa', fontStyle: 'italic' }}>No active divisions.</span>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem' }}>
              {playerArmies.map((a) => {
                const isSelected = selectedArmyId === a.id;
                const locName = provinces[a.locationProvinceId]?.name || a.locationProvinceId;

                return (
                  <div
                    key={a.id}
                    onClick={() => handleArmyClick(a.id, a.locationProvinceId)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: isSelected ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.02)',
                      border: isSelected ? '1px solid var(--border-gold)' : '1px solid transparent',
                      padding: '5px 8px',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                    }}
                  >
                    <span style={{ fontWeight: isSelected ? 'bold' : 'normal', color: isSelected ? 'var(--color-gold)' : '#fff' }}>
                      ⚔️ {(a.size / 1000).toFixed(1)}k Division
                    </span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                      {locName}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
