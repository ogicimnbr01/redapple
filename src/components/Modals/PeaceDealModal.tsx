import React, { useState } from 'react';
import { useGameStore } from '../../game/store/gameStore';
import { useShallow } from 'zustand/react/shallow';
import { getProvinceDevelopment } from '../../game/utils/helpers';

interface PeaceDealModalProps {
  warId: string;
  onClose: () => void;
}

export const PeaceDealModal: React.FC<PeaceDealModalProps> = ({ warId, onClose }) => {
  const {
    war,
    provinces,
    defenderCountry,
    sendPeaceDeal
  } = useGameStore(
    useShallow((state) => {
      const activeWar = state.wars[warId];
      return {
        war: activeWar,
        provinces: state.provinces,
        defenderCountry: activeWar ? state.countries[activeWar.defender] : null,
        sendPeaceDeal: state.sendPeaceDeal
      };
    })
  );

  const [demandedProvinces, setDemandedProvinces] = useState<string[]>([]);
  const [goldDemanded, setGoldDemanded] = useState(0);
  const [vassalization, setVassalization] = useState(false);
  const [warReparations, setWarReparations] = useState(false);

  if (!war || !defenderCountry) return null;

  // Find all defender provinces occupied/controlled by the attacker (or its allies)
  const occupiableProvinces = Object.values(provinces).filter(
    (p) => p.owner === war.defender && p.controller === war.attacker
  );

  // Compute war score costs
  const getProvinceCost = (pId: string) => {
    const p = provinces[pId];
    return p ? getProvinceDevelopment(p) * 4 : 10;
  };

  const totalCost =
    demandedProvinces.reduce((sum, pId) => sum + getProvinceCost(pId), 0) +
    (vassalization ? 60 : 0) +
    (warReparations ? 10 : 0) +
    Math.floor(goldDemanded / 10);

  // Calculate Aggressive Expansion (AE)
  const getProvinceAE = (pId: string) => {
    const p = provinces[pId];
    if (!p) return 0;
    const base = getProvinceDevelopment(p) * 3;
    const cbMod = war.warGoalType === 'reconquest' ? 0.25 : war.warGoalType === 'imperial_liberation' ? 0.5 : war.warGoalType === 'no_cb' ? 2.0 : 1.0;
    return base * cbMod;
  };

  const totalAE = demandedProvinces.reduce((sum, pId) => sum + getProvinceAE(pId), 0);

  const handleSend = () => {
    sendPeaceDeal({
      warId,
      attackerTag: war.attacker,
      defenderTag: war.defender,
      provincesDemanded: demandedProvinces,
      goldDemanded,
      vassalization,
      warReparations
    });
    onClose();
  };

  const toggleProvince = (pId: string) => {
    setDemandedProvinces((prev) =>
      prev.includes(pId) ? prev.filter((id) => id !== pId) : [...prev, pId]
    );
  };

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
          width: '520px',
          maxHeight: '85%',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: 'rgba(15, 15, 20, 0.98)',
          border: '1px solid rgba(255,255,255,0.15)',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', color: '#fff' }}>Peace Negotiation</h2>
          <span style={{ fontSize: '0.85rem' }}>
            War Score: <strong style={{ color: 'var(--color-stability)' }}>+{war.warScore}%</strong>
          </span>
        </div>

        {/* Occupied list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#fff' }}>Demanded Provinces:</span>
          {occupiableProvinces.length === 0 ? (
            <span style={{ fontStyle: 'italic', fontSize: '0.8rem', color: '#a1a1aa' }}>
              No provinces occupied. Control capital/forts to demand territory.
            </span>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '150px', overflowY: 'auto', paddingRight: '4px' }}>
              {occupiableProvinces.map((p) => (
                <label key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '4px', cursor: 'pointer' }}>
                  <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={demandedProvinces.includes(p.id)}
                      onChange={() => toggleProvince(p.id)}
                    />
                    {p.name} (Dev: {getProvinceDevelopment(p)})
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>WS Cost: {getProvinceCost(p.id)}%</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Gold selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span>Demand Gold:</span>
            <strong>{goldDemanded} / {defenderCountry.gold} Gold</strong>
          </div>
          <input
            type="range"
            min="0"
            max={Math.min(250, defenderCountry.gold)}
            step="25"
            value={goldDemanded}
            onChange={(e) => setGoldDemanded(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        {/* Treaties options checkboxes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer', fontSize: '0.85rem' }}>
            <input
              type="checkbox"
              checked={vassalization}
              onChange={(e) => setVassalization(e.target.checked)}
            />
            Force Vassalization (Cost: 60% WS)
          </label>
          <label style={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer', fontSize: '0.85rem' }}>
            <input
              type="checkbox"
              checked={warReparations}
              onChange={(e) => setWarReparations(e.target.checked)}
            />
            Demand War Reparations (Cost: 10% WS)
          </label>
        </div>

        {/* Totals Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', fontSize: '0.85rem' }}>
          <div>
            <span>Total War Score Cost:</span>
            <strong style={{ display: 'block', color: totalCost > war.warScore ? 'var(--color-adm)' : 'var(--color-stability)' }}>
              {totalCost}% / {war.warScore}%
            </strong>
          </div>
          <div>
            <span>Aggressive Expansion:</span>
            <strong style={{ display: 'block', color: 'var(--color-unrest)' }}>+{totalAE.toFixed(0)} AE</strong>
          </div>
        </div>

        {/* Footer buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button
            onClick={handleSend}
            disabled={totalCost > war.warScore || totalCost <= 0}
            style={{ flex: 1, borderColor: 'var(--color-stability)', color: 'var(--color-stability)', fontWeight: 'bold' }}
          >
            ✓ Send Peace Treaty
          </button>
          <button onClick={onClose} style={{ flex: 1 }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
