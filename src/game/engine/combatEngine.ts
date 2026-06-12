import type { GameState } from '../types/game.types';
import { getProvinceDevelopment } from '../utils/helpers';
import { ADJACENCY_GRAPH } from '../database/database';

const BASE_CASUALTY_MULTIPLIER = 0.015;

// Resolves daily travel progress for moving armies
export const updateArmyMovement = (state: GameState) => {
  for (const armyId in state.armies) {
    const army = state.armies[armyId];
    if (army.targetProvinceId && army.path.length > 0) {
      // Retracting armies move at 2x speed
      const speedModifier = army.isRetreating ? 20 : 10; // e.g., 10% progress per day normal
      army.travelProgress += speedModifier;

      if (army.travelProgress >= 100) {
        // Arrived at next segment of the path
        const nextProvinceId = army.path[0];
        army.locationProvinceId = nextProvinceId;
        army.path.shift();
        army.travelProgress = 0;

        // If path is empty, we reached the final target
        if (army.path.length === 0) {
          army.targetProvinceId = null;
          army.isRetreating = false;
        }

        // Add history log entry for player's army arriving
        if (army.owner === state.activePlayerTag && army.path.length === 0) {
          state.historyLog.unshift(
            `Our army arrived at ${state.provinces[nextProvinceId]?.name}.`
          );
          if (state.historyLog.length > 50) state.historyLog.pop();
        }
      }
    }
  }
};

// Initiates a battle in a province if hostile armies meet
export const checkAndInitiateBattles = (state: GameState) => {
  const armiesByProvince: Record<string, string[]> = {};

  // Group non-retreating armies by province
  for (const armyId in state.armies) {
    const army = state.armies[armyId];
    if (army.isRetreating || army.size <= 0) continue;

    if (!armiesByProvince[army.locationProvinceId]) {
      armiesByProvince[army.locationProvinceId] = [];
    }
    armiesByProvince[army.locationProvinceId].push(armyId);
  }

  for (const provinceId in armiesByProvince) {
    const armyIds = armiesByProvince[provinceId];
    if (armyIds.length < 2) continue;

    // Check if there is an active battle in this province
    const activeBattleId = Object.keys(state.battles).find(
      (bId) => state.battles[bId].provinceId === provinceId
    );
    if (activeBattleId) continue; // Already fighting

    // Find two hostile armies in active wars
    for (let i = 0; i < armyIds.length; i++) {
      for (let j = i + 1; j < armyIds.length; j++) {
        const armyA = state.armies[armyIds[i]];
        const armyB = state.armies[armyIds[j]];

        if (armyA.owner === armyB.owner) continue;

        // Check if they are at war
        const isAtWar = Object.values(state.wars).some(
          (war) =>
            (war.attacker === armyA.owner && war.defender === armyB.owner) ||
            (war.attacker === armyB.owner && war.defender === armyA.owner) ||
            (war.attackerAllies.includes(armyA.owner) && war.defenderAllies.includes(armyB.owner)) ||
            (war.attackerAllies.includes(armyB.owner) && war.defenderAllies.includes(armyA.owner)) ||
            // Rebels are hostile to everyone except rebels
            armyA.owner === 'REB' ||
            armyB.owner === 'REB'
        );

        if (isAtWar) {
          const battleId = `battle_${Date.now()}_${provinceId}`;
          state.battles[battleId] = {
            id: battleId,
            provinceId,
            attackerTag: armyA.owner,
            defenderTag: armyB.owner,
            attackerArmyId: armyA.id,
            defenderArmyId: armyB.id,
            attackerRoll: 0,
            defenderRoll: 0,
            round: 0,
            phase: 'Fire',
            daysInPhase: 0
          };

          // Reset status siege since they are in combat
          armyA.isSieging = false;
          armyB.isSieging = false;

          state.historyLog.unshift(
            `Battle started in ${state.provinces[provinceId]?.name} between ${armyA.owner} and ${armyB.owner}.`
          );
          if (state.historyLog.length > 50) state.historyLog.pop();
          return; // Trigger one battle start per tick
        }
      }
    }
  }
};

// Daily tick battle round updater
export const updateBattles = (state: GameState) => {
  for (const battleId in state.battles) {
    const battle = state.battles[battleId];
    const attacker = state.armies[battle.attackerArmyId];
    const defender = state.armies[battle.defenderArmyId];

    if (!attacker || !defender || attacker.size <= 0 || defender.size <= 0) {
      // Clean up orphaned battle
      delete state.battles[battleId];
      continue;
    }

    // Cycle phases every 3 days
    battle.round++;
    battle.daysInPhase++;
    if (battle.daysInPhase >= 3) {
      battle.phase = battle.phase === 'Fire' ? 'Shock' : 'Fire';
      battle.daysInPhase = 0;
    }

    // 1. Roll dice (RNG 0-9) + general skills + terrain penalties
    const province = state.provinces[battle.provinceId];
    let terrainPenalty = 0;
    if (province.terrain === 'Hills') terrainPenalty = -1;
    if (province.terrain === 'Mountains') terrainPenalty = -2;

    const attGeneral = attacker.general;
    const defGeneral = defender.general;

    const attGeneralPip = attGeneral
      ? battle.phase === 'Fire'
        ? attGeneral.fire
        : attGeneral.shock
      : 0;
    const defGeneralPip = defGeneral
      ? battle.phase === 'Fire'
        ? defGeneral.fire
        : defGeneral.shock
      : 0;

    const generalDiff = Math.max(0, attGeneralPip - defGeneralPip);
    const defGeneralDiff = Math.max(0, defGeneralPip - attGeneralPip);

    battle.attackerRoll = Math.floor(Math.random() * 10) + generalDiff + terrainPenalty;
    battle.defenderRoll = Math.floor(Math.random() * 10) + defGeneralDiff;

    // 2. Fetch military tactics modifiers based on technology levels
    const attCountry = state.countries[attacker.owner];
    const defCountry = state.countries[defender.owner];

    const attTactics = 0.5 + (attCountry ? attCountry.techLevels.mil : 3) * 0.25;
    const defTactics = 0.5 + (defCountry ? defCountry.techLevels.mil : 3) * 0.25;

    // Calculate casualties per daily combat round
    const attDamageFactor = Math.max(1, battle.attackerRoll + 3 - defTactics);
    const defDamageFactor = Math.max(1, battle.defenderRoll + 3 - attTactics);

    const defenderLosses = Math.floor(BASE_CASUALTY_MULTIPLIER * attDamageFactor * attacker.size * 0.2);
    const attackerLosses = Math.floor(BASE_CASUALTY_MULTIPLIER * defDamageFactor * defender.size * 0.2);

    // Apply casualties
    attacker.size = Math.max(0, attacker.size - attackerLosses);
    defender.size = Math.max(0, defender.size - defenderLosses);

    // Track war exhaustion for losses (1 point per max manpower lost)
    if (attCountry) {
      const weAdd = (attackerLosses / (attCountry.maxManpower + 1)) * 2;
      attCountry.warExhaustion = Math.min(20, attCountry.warExhaustion + weAdd);
    }
    if (defCountry) {
      const weAdd = (defenderLosses / (defCountry.maxManpower + 1)) * 2;
      defCountry.warExhaustion = Math.min(20, defCountry.warExhaustion + weAdd);
    }

    // 3. Morale Damage calculation
    const attMoraleLoss = (defenderLosses / Math.max(100, attacker.size)) * 0.8 + 0.1;
    const defMoraleLoss = (attackerLosses / Math.max(100, defender.size)) * 0.8 + 0.1;

    attacker.morale = Math.max(0.0, attacker.morale - attMoraleLoss);
    defender.morale = Math.max(0.0, defender.morale - defMoraleLoss);

    // 4. Check battle termination conditions
    if (attacker.size <= 0 || attacker.morale <= 0.0 || defender.size <= 0 || defender.morale <= 0.0) {
      // Battle finished
      const attackerWon = attacker.size > 0 && attacker.morale > 0.0;
      const winner = attackerWon ? attacker : defender;
      const loser = attackerWon ? defender : attacker;
      const winnerTag = winner.owner;
      const loserTag = loser.owner;

      state.historyLog.unshift(
        `Battle in ${province.name} won by ${winnerTag}. ${loserTag} is in retreat.`
      );
      if (state.historyLog.length > 50) state.historyLog.pop();

      // Trigger Shattered Retreat for loser
      if (loser.size > 0) {
        loser.isRetreating = true;
        
        // Find nearest friendly/neutral province using BFS
        const retreatPath = findRetreatPath(state, loser.locationProvinceId, loserTag);
        if (retreatPath.length > 0) {
          loser.path = retreatPath;
          loser.targetProvinceId = retreatPath[retreatPath.length - 1];
        } else {
          // If completely trapped, stack-wipe the army
          loser.size = 0;
          state.historyLog.unshift(`The army of ${loserTag} was completely stack-wiped in ${province.name}!`);
          if (state.historyLog.length > 50) state.historyLog.pop();
        }
      }

      // Morale recovery for winner
      const winnerCountry = state.countries[winner.owner];
      const winnerMaxMorale = 3.0 + (winnerCountry ? winnerCountry.techLevels.mil * 0.2 : 0);
      winner.morale = Math.min(winnerMaxMorale, winner.morale + 1.0);

      // Clean up battle from active state
      delete state.battles[battleId];
    }
  }
};

// BFS implementation to locate the nearest safe/friendly province for retreat
const findRetreatPath = (state: GameState, startId: string, tag: string): string[] => {
  const queue: string[][] = [[startId]];
  const visited = new Set<string>([startId]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const node = path[path.length - 1];

    const province = state.provinces[node];
    // A province is safe if owned by us, our allies, or neutral (not enemy at war)
    const isEnemy = Object.values(state.wars).some(
      (war) =>
        (war.attacker === tag && war.defender === province.owner) ||
        (war.attacker === province.owner && war.defender === tag)
    );

    if (node !== startId && !isEnemy && province.owner !== 'REB') {
      return path.slice(1);
    }

    const neighbors = ADJACENCY_GRAPH[node] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
  }

  return [];
};

// Monthly Siege engine calculator running on province capitals
export const updateSieges = (state: GameState) => {
  // Map sieging armies to provinces
  const siegersByProvince: Record<string, string[]> = {};
  for (const armyId in state.armies) {
    const army = state.armies[armyId];
    if (army.isRetreating || army.size <= 0) continue;

    const province = state.provinces[army.locationProvinceId];
    if (!province) continue;

    // Only siege if we are at war and it's enemy controller
    const atWar = Object.values(state.wars).some(
      (war) =>
        (war.attacker === army.owner && war.defender === province.owner) ||
        (war.attacker === province.owner && war.defender === army.owner) ||
        (war.attackerAllies.includes(army.owner) && war.defenderAllies.includes(province.owner)) ||
        (war.attackerAllies.includes(province.owner) && war.defenderAllies.includes(army.owner)) ||
        // Rebels siege anything not rebel controlled
        army.owner === 'REB'
    );

    if (atWar && province.controller !== army.owner) {
      if (!siegersByProvince[province.id]) {
        siegersByProvince[province.id] = [];
      }
      siegersByProvince[province.id].push(armyId);
    } else {
      army.isSieging = false;
    }
  }

  // Check siege progress monthly
  for (const provinceId in siegersByProvince) {
    const province = state.provinces[provinceId];
    const armyIds = siegersByProvince[provinceId];
    
    // Set sieging flag
    for (const aId of armyIds) {
      state.armies[aId].isSieging = true;
    }

    // Roll siege phase: 30% base chance to capture monthly
    const roll = Math.floor(Math.random() * 10);
    const fortFactor = province.buildings.fort ? -2 : 0;
    
    if (roll + fortFactor >= 7) {
      // Siege succeeded!
      const capturingArmy = state.armies[armyIds[0]];
      province.controller = capturingArmy.owner;
      capturingArmy.isSieging = false;

      state.historyLog.unshift(
        `${province.name} has fallen to the forces of ${capturingArmy.owner}!`
      );
      if (state.historyLog.length > 50) state.historyLog.pop();
    }
  }
};

// Monthly Attrition engine running based on province supply limits
export const applySupplyAttrition = (state: GameState) => {
  const armyDistribution: Record<string, string[]> = {};

  for (const armyId in state.armies) {
    const army = state.armies[armyId];
    if (army.size <= 0) continue;
    if (!armyDistribution[army.locationProvinceId]) {
      armyDistribution[army.locationProvinceId] = [];
    }
    armyDistribution[army.locationProvinceId].push(armyId);
  }

  for (const provinceId in armyDistribution) {
    const province = state.provinces[provinceId];
    const armyIds = armyDistribution[provinceId];

    // calculate total size present
    let totalTroops = 0;
    for (const aId of armyIds) {
      totalTroops += state.armies[aId].size;
    }

    const supplyLimit = getProvinceDevelopment(province) * 1500;
    if (totalTroops > supplyLimit) {
      // Exceeds supply limit, apply 1% attrition monthly
      for (const aId of armyIds) {
        const army = state.armies[aId];
        const losses = Math.floor(army.size * 0.01);
        if (losses > 0) {
          army.size -= losses;
          const country = state.countries[army.owner];
          if (country) {
            const weAdd = (losses / (country.maxManpower + 1)) * 2;
            country.warExhaustion = Math.min(20, country.warExhaustion + weAdd);
          }
        }
      }
    }
  }
};
