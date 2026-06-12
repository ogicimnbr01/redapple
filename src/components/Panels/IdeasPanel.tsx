import React, { useState } from 'react';
import { useGameStore } from '../../game/store/gameStore';
import { useShallow } from 'zustand/react/shallow';

export const IdeasPanel: React.FC = () => {
  const {
    country,
    buyTechnology,
    selectIdeaGroup,
    buyIdea
  } = useGameStore(
    useShallow((state) => ({
      country: state.countries[state.activePlayerTag],
      buyTechnology: state.buyTechnology,
      selectIdeaGroup: state.selectIdeaGroup,
      buyIdea: state.buyIdea
    }))
  );

  const [groupSelectorIndex, setGroupSelectorIndex] = useState<number | null>(null);

  if (!country) return null;

  const admTech = country.techLevels.adm;
  const maxSlots = admTech >= 10 ? 3 : admTech >= 7 ? 2 : admTech >= 4 ? 1 : 0;
  const activeSlots = country.selectedIdeaGroups.length;

  const allGroups = [
    { id: 'adm_ideas', name: 'Administrative Ideas', type: 'adm' as const, bonus: '+10% Tax, -25% Coring Cost' },
    { id: 'dip_ideas', name: 'Diplomatic Ideas', type: 'dip' as const, bonus: '+2 Royal Marriages, +50 Elector relation limits' },
    { id: 'quantity_ideas', name: 'Quantity Ideas', type: 'mil' as const, bonus: '+50% Manpower Capacity, +20% Manpower Speed' },
    { id: 'quality_ideas', name: 'Quality Ideas', type: 'mil' as const, bonus: '+10% Discipline, +15% Army Morale' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: '#e4e4e7', fontSize: '0.9rem', height: '100%' }}>
      <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
        Technology & Ideas
      </h2>

      {/* Technology Upgrades */}
      <div className="glass-panel" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255,255,255,0.02)' }}>
        <span style={{ fontWeight: 'bold', color: '#fff' }}>Technology Levels</span>
        
        {/* ADM Tech */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Administrative: Level {country.techLevels.adm}</span>
          <button
            disabled={country.mana.adm < 600}
            onClick={() => buyTechnology('adm')}
            style={{ padding: '2px 8px', fontSize: '0.75rem' }}
          >
            Upgrade (600 ADM)
          </button>
        </div>

        {/* DIP Tech */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Diplomatic: Level {country.techLevels.dip}</span>
          <button
            disabled={country.mana.dip < 600}
            onClick={() => buyTechnology('dip')}
            style={{ padding: '2px 8px', fontSize: '0.75rem' }}
          >
            Upgrade (600 DIP)
          </button>
        </div>

        {/* MIL Tech */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Military: Level {country.techLevels.mil}</span>
          <button
            disabled={country.mana.mil < 600}
            onClick={() => buyTechnology('mil')}
            style={{ padding: '2px 8px', fontSize: '0.75rem' }}
          >
            Upgrade (600 MIL)
          </button>
        </div>
      </div>

      {/* Idea Group Slots */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'auto' }}>
        <span style={{ fontWeight: 'bold', color: '#fff' }}>Idea Groups ({activeSlots} / {maxSlots} Slots Unlocked)</span>

        {/* Render Slots */}
        {Array.from({ length: 3 }).map((_, index) => {
          const isSlotLocked = index >= maxSlots;
          const activeGroup = country.selectedIdeaGroups[index];

          if (isSlotLocked) {
            const unlockLevel = index === 0 ? 4 : index === 1 ? 7 : 10;
            return (
              <div key={index} className="glass-panel" style={{ padding: '12px', background: 'rgba(0,0,0,0.3)', opacity: 0.5, borderStyle: 'dashed', textAlign: 'center' }}>
                🔒 Locked (Requires Adm Tech {unlockLevel})
              </div>
            );
          }

          if (!activeGroup) {
            return (
              <div key={index}>
                {groupSelectorIndex === index ? (
                  // Selection mode
                  <div className="glass-panel" style={{ padding: '10px', background: 'rgba(10,10,15,0.95)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Choose Idea Group:</span>
                    {allGroups
                      .filter(g => !country.selectedIdeaGroups.some(ag => ag.id === g.id))
                      .map((g) => (
                        <button
                          key={g.id}
                          onClick={() => {
                            selectIdeaGroup({ id: g.id, name: g.name, type: g.type, ideasBought: 0 });
                            setGroupSelectorIndex(null);
                          }}
                          style={{ fontSize: '0.75rem', padding: '4px 8px', justifyContent: 'flex-start' }}
                        >
                          {g.name} ({g.type.toUpperCase()})
                        </button>
                      ))}
                    <button onClick={() => setGroupSelectorIndex(null)} style={{ fontSize: '0.7rem', padding: '4px' }}>Cancel</button>
                  </div>
                ) : (
                  // Open Slot
                  <div
                    onClick={() => setGroupSelectorIndex(index)}
                    className="glass-panel"
                    style={{ padding: '12px', background: 'rgba(39, 174, 96, 0.1)', borderColor: 'var(--color-mil)', cursor: 'pointer', textAlign: 'center', fontWeight: 'bold', color: '#55efc4' }}
                  >
                    + Unlock New Idea Group
                  </div>
                )}
              </div>
            );
          }

          // Active Group Details
          const totalMana = country.mana[activeGroup.type];
          return (
            <div key={index} className="glass-panel" style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#fff' }}>{activeGroup.name}</strong>
                <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>{activeGroup.ideasBought} / 7 Purchased</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>
                Bonus: {allGroups.find(g => g.id === activeGroup.id)?.bonus}
              </span>
              {activeGroup.ideasBought < 7 && (
                <button
                  disabled={totalMana < 400}
                  onClick={() => buyIdea(activeGroup.id)}
                  style={{ width: '100%', padding: '4px', fontSize: '0.75rem' }}
                >
                  Buy Next Idea (400 {activeGroup.type.toUpperCase()})
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
