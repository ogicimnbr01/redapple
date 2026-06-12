import type { GameState, Province } from '../types/game.types';

export const runAiTurn = (state: GameState) => {
  for (const tag in state.countries) {
    if (tag === state.activePlayerTag) continue; // Skip active player
    // Skip ghost tags elector check (only participate in relations/votes)
    if (state.hreElectors.includes(tag) && tag.length === 3 && tag !== 'BOH' && tag !== 'BRA' && tag !== 'SAX') continue;

    const country = state.countries[tag];
    if (!country) continue;

    // Verify if country is defeated (0 provinces)
    const provincesOwned = Object.values(state.provinces).filter(p => p.owner === tag);
    if (provincesOwned.length === 0) continue;

    // 1. Spend excess mana on development
    spendAiMana(state, tag, provincesOwned);

    // 2. Tech upgrades
    upgradeAiTech(state, tag);

    // 3. Estate management
    manageAiEstates(state, tag);

    // 4. Fabricate claims & Declare wars
    evaluateAiWars(state, tag, provincesOwned);
  }
};

const spendAiMana = (state: GameState, tag: string, provincesOwned: Province[]) => {
  const country = state.countries[tag];
  if (!country) return;

  // If mana is near cap (999), develop a random owned province
  const limit = 850;
  if (country.mana.adm > limit && provincesOwned.length > 0) {
    const prov = provincesOwned[Math.floor(Math.random() * provincesOwned.length)];
    prov.development.adm++;
    country.mana.adm -= 50;
  }
  if (country.mana.dip > limit && provincesOwned.length > 0) {
    const prov = provincesOwned[Math.floor(Math.random() * provincesOwned.length)];
    prov.development.dip++;
    country.mana.dip -= 50;
  }
  if (country.mana.mil > limit && provincesOwned.length > 0) {
    const prov = provincesOwned[Math.floor(Math.random() * provincesOwned.length)];
    prov.development.mil++;
    country.mana.mil -= 50;
  }
};

const upgradeAiTech = (state: GameState, tag: string) => {
  const country = state.countries[tag];
  if (!country) return;

  const techCost = 600; // Simplified flat base cost for AI
  if (country.mana.adm >= techCost) {
    country.techLevels.adm++;
    country.mana.adm -= techCost;
  }
  if (country.mana.dip >= techCost) {
    country.techLevels.dip++;
    country.mana.dip -= techCost;
  }
  if (country.mana.mil >= techCost) {
    country.techLevels.mil++;
    country.mana.mil -= techCost;
  }
};

const manageAiEstates = (state: GameState, tag: string) => {
  const country = state.countries[tag];
  if (!country) return;

  // AI Summon Diet if estates loyalty is low
  const avgLoyalty = (country.estates.nobility.loyalty + country.estates.clergy.loyalty + country.estates.burghers.loyalty) / 3;
  if (avgLoyalty < 40) {
    // Summon diet (adds +10 to a random estate)
    const choice = Math.random();
    if (choice < 0.33) country.estates.nobility.loyalty = Math.min(100, country.estates.nobility.loyalty + 10);
    else if (choice < 0.66) country.estates.clergy.loyalty = Math.min(100, country.estates.clergy.loyalty + 10);
    else country.estates.burghers.loyalty = Math.min(100, country.estates.burghers.loyalty + 10);
  }
};

const evaluateAiWars = (state: GameState, tag: string, provincesOwned: Province[]) => {
  const country = state.countries[tag];
  if (!country || country.manpower < country.maxManpower * 0.4) return; // Too weak to declare war

  // 1. Try to fabricate a claim on a neighbor province
  for (const prov of provincesOwned) {
    for (const neighborId of prov.adjacentProvinces) {
      const neighbor = state.provinces[neighborId];
      if (neighbor && neighbor.owner !== tag && neighbor.owner !== 'REB') {
        const neighborCountry = state.countries[neighbor.owner];
        // If hostile relations and not already claim fabricating or claimed
        if (neighborCountry && (country.relations[neighbor.owner] || 0) < 0) {
          if (!neighbor.claims.includes(tag) && country.mana.dip >= 50) {
            if (!country.fabricatingClaims) country.fabricatingClaims = {};
            if (!country.fabricatingClaims[neighborId]) {
              country.fabricatingClaims[neighborId] = 6;
              country.mana.dip -= 50;
              return; // Fabricating is enough for this month
            }
          }
        }
      }
    }
  }

  // 2. Evaluate War Declarations using utility formula
  for (const enemyTag in state.countries) {
    if (enemyTag === tag || enemyTag === 'REB') continue;
    // Skip ghost tags
    if (state.hreElectors.includes(enemyTag) && enemyTag.length === 3 && enemyTag !== 'BOH' && enemyTag !== 'BRA' && enemyTag !== 'SAX') continue;

    const enemy = state.countries[enemyTag];
    if (!enemy) continue;

    const relations = country.relations[enemyTag] || 0;
    if (relations >= 0) continue; // Too friendly

    // Verify if AI has a claim or core on any of enemy provinces
    const hasCB = Object.values(state.provinces).some(
      (p) => p.owner === enemyTag && (p.claims.includes(tag) || p.cores.includes(tag))
    );
    if (!hasCB) continue;

    const myManpower = country.manpower;
    const enemyManpower = enemy.manpower;
    const ae = country.aggressiveExpansion[enemyTag] || 0;

    const utility = (myManpower / (enemyManpower + 1)) * (150 / (relations + 201)) - ae * 2;

    if (utility > 1.8) {
      // Declare war!
      const warId = `war_${Date.now()}_${tag}_${enemyTag}`;
      state.wars[warId] = {
        id: warId,
        attacker: tag,
        defender: enemyTag,
        attackerAllies: [],
        defenderAllies: [],
        warScore: 0,
        startDate: { ...state.date },
        warGoalProvinceId: Object.values(state.provinces).find(p => p.owner === enemyTag && p.claims.includes(tag))?.id || '',
        warGoalType: 'conquest'
      };

      state.historyLog.unshift(`${country.name} declared war on ${enemy.name}!`);
      if (state.historyLog.length > 50) state.historyLog.pop();
      break;
    }
  }
};
