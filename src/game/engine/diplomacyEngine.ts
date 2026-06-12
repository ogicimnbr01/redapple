import type { GameState, PeaceDeal } from '../types/game.types';
import { getProvinceDevelopment } from '../utils/helpers';

// Calculates monthly ticks on claim fabrications
export const updateClaimFabrications = (state: GameState) => {
  for (const tag in state.countries) {
    const country = state.countries[tag];
    const fabricating = country.fabricatingClaims;
    if (!fabricating) continue;

    for (const provinceId in fabricating) {
      fabricating[provinceId]--;

      if (fabricating[provinceId] <= 0) {
        // Fabrication completed!
        const province = state.provinces[provinceId];
        if (province && !province.claims.includes(tag)) {
          province.claims.push(tag);
          state.historyLog.unshift(
            `${country.name} fabricated a claim on ${province.name}.`
          );
          if (state.historyLog.length > 50) state.historyLog.pop();
        }
        delete fabricating[provinceId];
      }
    }
  }
};

// stability booster costs scale by current level & overextension
export const increaseStability = (state: GameState, tag: string) => {
  const country = state.countries[tag];
  if (!country || country.stability >= 3) return;

  const cost = Math.floor(
    100 * (1 + country.stability * 0.5) * (1 + country.overextension / 100)
  );

  if (country.mana.adm >= cost) {
    country.mana.adm -= cost;
    country.stability += 1;
    if (tag === state.activePlayerTag) {
      state.historyLog.unshift(`We boosted our stability to +${country.stability}.`);
      if (state.historyLog.length > 50) state.historyLog.pop();
    }
  }
};

// Fabrication initiation action
export const startClaimFabrication = (state: GameState, fromTag: string, provinceId: string) => {
  const country = state.countries[fromTag];
  const province = state.provinces[provinceId];
  if (!country || !province || province.owner === fromTag) return;

  if (country.mana.dip >= 50) {
    country.mana.dip -= 50;
    if (!country.fabricatingClaims) country.fabricatingClaims = {};
    country.fabricatingClaims[provinceId] = 6; // Takes 6 months
  }
};

// Calculates Aggressive Expansion (AE) propagation after peace deals
export const applyAggressiveExpansion = (
  state: GameState,
  aggressorTag: string,
  targetProvinceId: string,
  cbType: 'conquest' | 'reconquest' | 'imperial_liberation' | 'no_cb'
) => {
  const province = state.provinces[targetProvinceId];
  if (!province) return;

  const development = getProvinceDevelopment(province);
  let cbModifier = 1.0;
  if (cbType === 'reconquest') cbModifier = 0.25;
  if (cbType === 'imperial_liberation') cbModifier = 0.5;
  if (cbType === 'no_cb') cbModifier = 2.0;

  const baseAE = development * 3 * cbModifier;

  for (const tag in state.countries) {
    if (tag === aggressorTag || state.hreElectors.includes(tag) && tag.length === 3) continue; // Ghost tags skip

    const country = state.countries[tag];
    // Spread AE to neighbors (simplified to all countries of the region)
    // Same religion group takes 1.5x AE, different takes 0.5x
    const religionMultiplier = country.religion === province.religion ? 1.5 : 0.5;
    const finalAE = Math.floor(baseAE * religionMultiplier);

    if (finalAE > 0) {
      if (!country.aggressiveExpansion[aggressorTag]) {
        country.aggressiveExpansion[aggressorTag] = 0;
      }
      country.aggressiveExpansion[aggressorTag] += finalAE;
      
      // Reduce relations proportionally
      country.relations[aggressorTag] = Math.max(-200, (country.relations[aggressorTag] || 0) - finalAE);
    }
  }
};

// Declares peace terms and executes demands
export const resolvePeaceDeal = (state: GameState, deal: PeaceDeal) => {
  const war = state.wars[deal.warId];
  if (!war) return;

  const attacker = state.countries[deal.attackerTag];
  const defender = state.countries[deal.defenderTag];

  // 1. Demand Provinces
  for (const provinceId of deal.provincesDemanded) {
    const province = state.provinces[provinceId];
    if (province && province.owner === deal.defenderTag) {
      province.owner = deal.attackerTag;
      province.controller = deal.attackerTag;
      
      // Calculate Aggressive Expansion
      applyAggressiveExpansion(state, deal.attackerTag, provinceId, war.warGoalType);
    }
  }

  // 2. Vassalization
  if (deal.vassalization) {
    defender.overlord = deal.attackerTag;
    if (!attacker.vassals.includes(deal.defenderTag)) {
      attacker.vassals.push(deal.defenderTag);
    }
  }

  // 3. Gold Transfer
  if (deal.goldDemanded > 0) {
    const transfer = Math.min(defender.gold, deal.goldDemanded);
    defender.gold -= transfer;
    attacker.gold += transfer;
  }

  // 4. War Reparations (represented by a simple direct transfer or flag for monthly tick)
  if (deal.warReparations) {
    // For simplicity, transfer a lump sum equivalent to 10% defender income * 120 months (10 years)
    const repsCost = Math.floor(defender.gold * 0.2);
    defender.gold -= repsCost;
    attacker.gold += repsCost;
  }

  state.historyLog.unshift(
    `Peace signed between ${deal.attackerTag} and ${deal.defenderTag}.`
  );
  if (state.historyLog.length > 50) state.historyLog.pop();

  // Clear truces (15 years truce = 5475 days)
  attacker.truces[deal.defenderTag] = 5475;
  defender.truces[deal.attackerTag] = 5475;

  // Clean up war state
  delete state.wars[deal.warId];
};

// Updates spy network values monthly (tick)
export const updateSpyNetworks = (state: GameState) => {
  for (const tag in state.countries) {
    const country = state.countries[tag];
    if (!country) continue;
    
    if (!country.spyNetworks) country.spyNetworks = {};
    if (country.spyTarget === undefined) country.spyTarget = null;

    // 1. Build network in active target
    if (country.spyTarget) {
      const targetTag = country.spyTarget;
      if (!country.spyNetworks[targetTag]) {
        country.spyNetworks[targetTag] = 0;
      }
      country.spyNetworks[targetTag] = Math.min(100, country.spyNetworks[targetTag] + 3);
    }

    // 2. Decay all inactive target networks
    for (const otherTag in country.spyNetworks) {
      if (otherTag !== country.spyTarget) {
        country.spyNetworks[otherTag] = Math.max(0, country.spyNetworks[otherTag] - 1);
        // Clean up empty keys
        if (country.spyNetworks[otherTag] === 0) {
          delete country.spyNetworks[otherTag];
        }
      }
    }
  }
};
