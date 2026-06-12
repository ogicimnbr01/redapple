import type { GameState, Province, PeaceDeal } from '../types/game.types';
import { updateArmyMovement, checkAndInitiateBattles, updateBattles, updateSieges, applySupplyAttrition } from './combatEngine';
import { updateClaimFabrications, resolvePeaceDeal, increaseStability, updateSpyNetworks } from './diplomacyEngine';
import { runAiTurn } from '../ai/aiBehavior';
import { getProvinceDevelopment } from '../utils/helpers';
import { loadEngineModules } from '../store/gameStore';
import { Preferences } from '@capacitor/preferences';

// Days in month lookup helper
const getDaysInMonth = (month: number, year: number): number => {
  if (month === 2) {
    // Leap year check
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
  }
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
};

// Daily Tick Loop (triggers daily calculations)
export const advanceDayTick = (state: GameState) => {
  // 1. Advance the date
  state.date.day++;
  const daysInMonth = getDaysInMonth(state.date.month, state.date.year);
  let isNewMonth = false;

  if (state.date.day > daysInMonth) {
    state.date.day = 1;
    state.date.month++;
    isNewMonth = true;

    if (state.date.month > 12) {
      state.date.month = 1;
      state.date.year++;
    }
  }

  // 2. Daily calculations
  updateArmyMovement(state);
  checkAndInitiateBattles(state);
  updateBattles(state);

  // 3. Monthly Tick Calculations (run strictly on the 1st of the month)
  if (isNewMonth) {
    executeMonthlyTick(state);
  }
};

const executeMonthlyTick = (state: GameState) => {
  // A. Mana generation & Diplomatic slot upkeep deductions
  generateManaAndUpkeep(state);

  // B. Economic taxes, production yields, and AI bütçe maintenance
  applyEconomyAndUpkeep(state);

  // C. Attrition and siege calculations
  updateSieges(state);
  applySupplyAttrition(state);

  // D. Rebel progression & uprisings
  updateRebelsAndUnrest(state);

  // E. Claim fabrication progress monthly reduction
  updateClaimFabrications(state);
  updateSpyNetworks(state);

  // F. Decay relationship matrices and Aggressive Expansion (AE)
  decayRelationsAndAE(state);

  // G. Dynamic elector votes calculations
  recalculateElectorVotes(state);

  // H. Monarch and General death check calculations
  monarchDeathAndSuccessionCheck(state);

  // I. Victory points accumulator
  accumulateVictoryScores(state);

  // J. AI Decision Logic
  runAiTurn(state);

  // K. Save game rotational backup check (Jan 1st & July 1st)
  handleBiAnnualAutosave(state);

  // L. Random events check for player
  if (Math.random() < 0.15) {
    const playerCountry = state.countries[state.activePlayerTag];
    if (playerCountry && !state.activeEvent) {
      const rand = Math.random();
      if (rand < 0.25) {
        state.activeEvent = {
          id: 'comet_sighted',
          title: 'Comet Sighted',
          description: 'A glowing comet spans the night sky. The populace is gripped by fear and superstition!',
          countryTag: state.activePlayerTag,
          choices: [
            { id: 'comet_lose_stab', text: 'Oh Comet, devil of the sky...', effectText: '-1 Stability' },
            { id: 'comet_lose_adm', text: 'Hire scientists to explain it', effectText: '-50 ADM Mana' }
          ]
        };
      } else if (rand < 0.50) {
        state.activeEvent = {
          id: 'noble_demands',
          title: 'Nobles Demand Privileges',
          description: 'The nobility demands that their traditional rights be respected, threatening our central control.',
          countryTag: state.activePlayerTag,
          choices: [
            { id: 'noble_yield', text: 'Yield to their demands', effectText: '-5% Crown Land, +15 Nobility Loyalty' },
            { id: 'noble_fight', text: 'Assert our absolute authority', effectText: 'Triggers Rebel Uprising in capital' }
          ]
        };
      } else if (rand < 0.75) {
        state.activeEvent = {
          id: 'peasant_unrest',
          title: 'Peasant Grievances',
          description: 'Peasants are protesting against high taxes. Local clergy asks us to ease their burden.',
          countryTag: state.activePlayerTag,
          choices: [
            { id: 'peasant_yield', text: 'Lower taxes in capital', effectText: '+30% Capital Autonomy, +15 Clergy Loyalty' },
            { id: 'peasant_fight', text: 'Squeeze them harder', effectText: 'Increases rebel progress in capital' }
          ]
        };
      } else {
        state.activeEvent = {
          id: 'talented_heir',
          title: 'Talented Heir Sighted',
          description: 'A remarkably bright young child from our dynasty shows immense potential for leadership.',
          countryTag: state.activePlayerTag,
          choices: [
            { id: 'talented_heir', text: 'Proclaim them heir to the crown', effectText: 'New 5/5/5 Heir is born' }
          ]
        };
      }
    }
  }
};

const generateManaAndUpkeep = (state: GameState) => {
  for (const tag in state.countries) {
    const country = state.countries[tag];
    const monarch = country.monarch;

    // Base 3 + Monarch skills + advisors/modifiers
    let baseAdm = 3 + monarch.adm;
    let baseDip = 3 + monarch.dip;
    let baseMil = 3 + monarch.mil;

    if (country.advisors?.adm) baseAdm += country.advisors.adm.level;
    if (country.advisors?.dip) baseDip += country.advisors.dip.level;
    if (country.advisors?.mil) baseMil += country.advisors.mil.level;

    country.manaIncome = { adm: baseAdm, dip: baseDip, mil: baseMil };

    // Relations limit upkeep cost deduction
    const relationExcess = Math.max(0, country.diplomaticRelationsUsed - country.diplomaticRelationsMax);
    country.manaIncome.dip = Math.max(0, country.manaIncome.dip - relationExcess);

    country.mana.adm += country.manaIncome.adm;
    country.mana.dip += country.manaIncome.dip;
    country.mana.mil += country.manaIncome.mil;
  }
};

const applyEconomyAndUpkeep = (state: GameState) => {
  // Clean count of province outputs
  const countryRevenue: Record<string, { tax: number; prod: number }> = {};

  for (const pId in state.provinces) {
    const province = state.provinces[pId];
    const dev = province.development;
    const owner = province.owner;

    if (!countryRevenue[owner]) {
      countryRevenue[owner] = { tax: 0, prod: 0 };
    }

    // Autonomy affects income: yield = baseValue * (1 - autonomy/100)
    const autonomyFactor = 1 - province.autonomy / 100;

    const baseTax = dev.adm * 0.2 * autonomyFactor;
    const baseProd = dev.dip * 0.2 * autonomyFactor;

    countryRevenue[owner].tax += baseTax;
    countryRevenue[owner].prod += baseProd;
  }

  for (const tag in state.countries) {
    const country = state.countries[tag];
    const revenue = countryRevenue[tag] || { tax: 0, prod: 0 };

    let totalIncome = revenue.tax + revenue.prod;

    // Vassal tribute income: overlord gains 10% of vassal income
    if (country.overlord) {
      const overlord = state.countries[country.overlord];
      if (overlord) {
        const tribute = totalIncome * 0.1;
        totalIncome -= tribute;
        overlord.gold += tribute;
      }
    }

    // Army upkeep cost calculations
    let armyCost = 0;
    let totalTroops = 0;
    for (const aId in state.armies) {
      const army = state.armies[aId];
      if (army.owner === tag) {
        armyCost += (army.size / 1000) * army.maintenanceCost;
        totalTroops += army.size;
      }
    }

    // Advisor upkeep costs
    let advisorCost = 0;
    if (country.advisors?.adm) {
      const lvl = country.advisors.adm.level;
      advisorCost += lvl === 1 ? 1 : lvl === 2 ? 4 : 9;
    }
    if (country.advisors?.dip) {
      const lvl = country.advisors.dip.level;
      advisorCost += lvl === 1 ? 1 : lvl === 2 ? 4 : 9;
    }
    if (country.advisors?.mil) {
      const lvl = country.advisors.mil.level;
      advisorCost += lvl === 1 ? 1 : lvl === 2 ? 4 : 9;
    }

    // AI Economy Maintenance Safety Checks
    if (tag !== state.activePlayerTag && country.gold < 0) {
      // AI reduces army upkeep slider if treasury is negative
      armyCost = armyCost * 0.5;
      for (const aId in state.armies) {
        const army = state.armies[aId];
        if (army.owner === tag) {
          army.morale = Math.min(2.0, army.morale); // moral penalty
        }
      }
    }

    country.gold = Math.floor(country.gold + totalIncome - armyCost - advisorCost);

    // Manpower recovery tick (base 100 + 5% max capacity)
    if (totalTroops < country.maxManpower) {
      const recovery = Math.floor(100 + country.maxManpower * 0.05);
      country.manpower = Math.min(country.maxManpower, country.manpower + recovery);
    }
  }
};

const updateRebelsAndUnrest = (state: GameState) => {
  for (const pId in state.provinces) {
    const province = state.provinces[pId];
    
    // Autonomy decay check
    if (province.autonomy > province.minimumAutonomy) {
      province.autonomy = Math.max(province.minimumAutonomy, province.autonomy - 0.5);
    }

    // If unrest is active, increment rebel progress
    if (province.unrest > 0) {
      province.rebelProgress += province.unrest;

      if (province.rebelProgress >= 100) {
        // Trigger Rebel Uprising Event
        province.rebelProgress = 0;
        province.controller = 'REB';

        const size = getProvinceDevelopment(province) * 1000;
        const rebelId = `rebel_${Date.now()}_${pId}`;
        
        state.armies[rebelId] = {
          id: rebelId,
          owner: 'REB',
          size,
          morale: 3.0,
          locationProvinceId: pId,
          targetProvinceId: null,
          path: [],
          travelProgress: 0,
          maintenanceCost: 0,
          isSieging: false,
          general: null,
          isRetreating: false
        };

        state.historyLog.unshift(
          `Rebel uprising triggered in ${province.name}! ${size} rebels have occupied the province.`
        );
        if (state.historyLog.length > 50) state.historyLog.pop();
      }
    }
  }
};

const decayRelationsAndAE = (state: GameState) => {
  for (const tag in state.countries) {
    const country = state.countries[tag];

    // Relations decay towards 0 by +1/-1 annually (approx 0.1 monthly)
    for (const rTag in country.relations) {
      const current = country.relations[rTag];
      if (current > 0) country.relations[rTag] = Math.max(0, current - 0.5);
      else if (current < 0) country.relations[rTag] = Math.min(0, current + 0.5);
    }

    // AE decays by -0.3 monthly
    for (const aeTag in country.aggressiveExpansion) {
      const current = country.aggressiveExpansion[aeTag];
      if (current > 0) {
        country.aggressiveExpansion[aeTag] = Math.max(0, current - 0.3);
      }
    }
  }
};

const recalculateElectorVotes = (state: GameState) => {
  // Electors evaluate eligible candidates: HAB, BOH, BRA, SAX, HUN
  const candidates = ['HAB', 'BOH', 'BRA', 'SAX', 'HUN'];
  
  for (const electorTag of state.hreElectors) {
    const elector = state.countries[electorTag];
    if (!elector) continue;

    let bestCandidate = state.emperorTag;
    let highestScore = -9999;

    for (const candTag of candidates) {
      const candidate = state.countries[candTag];
      if (!candidate) continue;

      // Elector scoring equation
      const relations = elector.relations[candTag] || 0;
      const prestige = candidate.prestige;
      const stability = candidate.stability;
      const allianceBonus = elector.allies.includes(candTag) ? 50 : 0;
      const currentEmperorBonus = candTag === state.emperorTag ? 25 : 0;

      const score = relations * 2 + stability * 10 + prestige + allianceBonus + currentEmperorBonus;

      if (score > highestScore) {
        highestScore = score;
        bestCandidate = candTag;
      }
    }

    elector.voteTarget = bestCandidate;
  }
};

const monarchDeathAndSuccessionCheck = (state: GameState) => {
  // 1. Monarch Succession checks
  for (const tag in state.countries) {
    const country = state.countries[tag];
    const monarch = country.monarch;

    // Check death probability based on age
    if (monarch.age > 50) {
      const deathProb = (monarch.age - 45) / 1000; // e.g. age 65 has 2% chance monthly
      if (Math.random() < deathProb) {
        // Monarch died!
        state.historyLog.unshift(`Ruler ${monarch.name} of ${country.name} has died!`);
        if (state.historyLog.length > 50) state.historyLog.pop();

        if (country.heir) {
          const heir = country.heir;
          if (heir.age >= 15) {
            // Crown the heir
            country.monarch = {
              name: heir.name,
              dynasty: heir.dynasty,
              age: heir.age,
              adm: heir.adm,
              dip: heir.dip,
              mil: heir.mil,
              isRegent: false
            };
            country.heir = null;
          } else {
            // Establish Regency Council
            country.monarch = {
              name: 'Regency Council',
              dynasty: 'None',
              age: 30,
              adm: 1,
              dip: 1,
              mil: 1,
              isRegent: true
            };
            // Keep heir in place, aging monthly
          }
        } else {
          // Select a random noble from dynasty
          country.monarch = {
            name: `Monarch ${Math.floor(Math.random() * 100)}`,
            dynasty: country.dynasty,
            age: 20 + Math.floor(Math.random() * 20),
            adm: Math.floor(Math.random() * 6),
            dip: Math.floor(Math.random() * 6),
            mil: Math.floor(Math.random() * 6),
            isRegent: false
          };
          country.stability = Math.max(-3, country.stability - 1);
        }

        // HRE Election triggered if deceased was Emperor
        if (state.emperorTag === tag) {
          triggerHreElection(state);
        }
      }
    }

    // Age monarch & heir monthly
    monarch.age += 1 / 12;
    if (country.heir) {
      country.heir.age += 1 / 12;
      // Check if heir regency ends
      if (monarch.isRegent && country.heir.age >= 15) {
        const newMon = country.heir;
        country.monarch = {
          name: newMon.name,
          dynasty: newMon.dynasty,
          age: newMon.age,
          adm: newMon.adm,
          dip: newMon.dip,
          mil: newMon.mil,
          isRegent: false
        };
        country.heir = null;
        state.historyLog.unshift(`Heir ${newMon.name} reached maturity and has been crowned in ${country.name}!`);
        if (state.historyLog.length > 50) state.historyLog.pop();
      }
    }
  }

  // 2. Generals monthly aging & death check
  for (const aId in state.armies) {
    const army = state.armies[aId];
    if (army.general) {
      army.general.age += 1 / 12;
      if (army.general.age > 60) {
        if (Math.random() < 0.05) {
          // General dies
          state.historyLog.unshift(
            `General ${army.general.name} of ${army.owner} has died of old age.`
          );
          if (state.historyLog.length > 50) state.historyLog.pop();
          army.general = null;
        }
      }
    }
  }
};

const triggerHreElection = (state: GameState) => {
  const votes: Record<string, number> = {};
  
  for (const tag of state.hreElectors) {
    const country = state.countries[tag];
    if (country && country.voteTarget) {
      votes[country.voteTarget] = (votes[country.voteTarget] || 0) + 1;
    }
  }

  let newEmperor = state.emperorTag;
  let maxVotes = 0;

  for (const tag in votes) {
    if (votes[tag] > maxVotes) {
      maxVotes = votes[tag];
      newEmperor = tag;
    } else if (votes[tag] === maxVotes) {
      // Break tie using highest Prestige rating
      const currEmp = state.countries[newEmperor];
      const challenger = state.countries[tag];
      if (challenger && currEmp && challenger.prestige > currEmp.prestige) {
        newEmperor = tag;
      }
    }
  }

  state.emperorTag = newEmperor;
  state.historyLog.unshift(
    `Succession Election: ${state.countries[newEmperor]?.name} is the new Holy Roman Emperor!`
  );
  if (state.historyLog.length > 50) state.historyLog.pop();
};

const accumulateVictoryScores = (state: GameState) => {
  for (const tag in state.countries) {
    const country = state.countries[tag];
    
    // Count owned province development
    let devSum = 0;
    for (const pId in state.provinces) {
      const p = state.provinces[pId];
      if (p.owner === tag) {
        devSum += getProvinceDevelopment(p);
      }
    }

    const currentEmperorBonus = tag === state.emperorTag ? 5 : 0;
    const monthlyScore = devSum * 1 + country.prestige * 2 + country.stability * 10 + currentEmperorBonus;
    country.victoryScore += Math.max(0, Math.floor(monthlyScore * 0.1));
  }
};

const handleBiAnnualAutosave = (state: GameState) => {
  const isJan1 = state.date.month === 1 && state.date.day === 1;
  const isJul1 = state.date.month === 7 && state.date.day === 1;

  if (isJan1 || isJul1) {
    // Rotational autosave triggers (rotate slots 1, 2, 3)
    const yearMod = state.date.year % 3;
    const slotKey = `imperium-autosave-${yearMod + 1}`;
    
    // Log notification synchronously to avoid mutating state asynchronously after proxy revocation
    state.historyLog.unshift(`Game autosaved successfully [Slot ${yearMod + 1}].`);
    if (state.historyLog.length > 50) state.historyLog.pop();

    // Save to Capacitor preferences asynchronously
    const dataString = JSON.stringify({
      saveVersion: 1,
      state: {
        date: state.date,
        countries: state.countries,
        provinces: state.provinces,
        armies: state.armies,
        battles: state.battles,
        wars: state.wars,
        emperorTag: state.emperorTag,
        hreElectors: state.hreElectors,
        historyLog: state.historyLog
      }
    });

    Preferences.set({ key: slotKey, value: dataString });
  }
};

// Initializer actions: develop, core, change autonomy, grant/revoke estate privileges, marriage/war/peace
const developProv = (state: GameState, provinceId: string, type: 'adm' | 'dip' | 'mil') => {
  const province = state.provinces[provinceId];
  if (!province) return;

  const country = state.countries[province.owner];
  if (!country) return;

  const devCost = Math.floor(50 + getProvinceDevelopment(province) * 1.5);
  
  if (country.mana[type] >= devCost) {
    country.mana[type] -= devCost;
    province.development[type]++;
    
    if (province.owner === state.activePlayerTag) {
      state.historyLog.unshift(
        `Developed ${province.name}. New development is ${getProvinceDevelopment(province)}.`
      );
      if (state.historyLog.length > 50) state.historyLog.pop();
    }
  }
};

const coreProv = (state: GameState, provinceId: string) => {
  const province = state.provinces[provinceId];
  if (!province || province.cores.includes(province.owner)) return;

  const country = state.countries[province.owner];
  if (!country) return;

  const cost = getProvinceDevelopment(province) * 10;
  if (country.mana.adm >= cost && province.coringProgress === null) {
    country.mana.adm -= cost;
    province.coringProgress = 0; // Starts coring process (completes in 12 ticks)
  }
};

// Tick coring progress monthly
export const updateCoringTicks = (state: GameState) => {
  for (const pId in state.provinces) {
    const province = state.provinces[pId];
    if (province.coringProgress !== null) {
      province.coringProgress += 8.33; // ~12 months to hit 100%
      if (province.coringProgress >= 100) {
        province.cores.push(province.owner);
        province.coringProgress = null;
        
        if (province.owner === state.activePlayerTag) {
          state.historyLog.unshift(`Coring completed: ${province.name} is now our core territory.`);
          if (state.historyLog.length > 50) state.historyLog.pop();
        }
      }
    }
  }
};

const changeProvAutonomy = (state: GameState, provinceId: string, increase: boolean) => {
  const province = state.provinces[provinceId];
  if (!province || province.owner !== state.activePlayerTag) return;

  if (increase) {
    province.autonomy = Math.min(100, province.autonomy + 10);
    province.unrest = Math.max(0, province.unrest - 4);
  } else {
    province.autonomy = Math.max(province.minimumAutonomy, province.autonomy - 10);
    province.unrest += 5; // Decrease autonomy adds local unrest
  }
};

const grantPriv = (state: GameState, tag: string, estateId: string, privilegeId: string) => {
  const country = state.countries[tag];
  if (!country) return;
  const estate = country.estates[estateId as 'nobility' | 'clergy' | 'burghers'];
  
  if (estate && !estate.activePrivileges.includes(privilegeId)) {
    estate.activePrivileges.push(privilegeId);
    estate.influence = Math.min(100, estate.influence + 15);
    estate.loyalty = Math.min(100, estate.loyalty + 10);
    country.crownLand = Math.max(0, country.crownLand - 5);
  }
};

const revokePriv = (state: GameState, tag: string, estateId: string, privilegeId: string) => {
  const country = state.countries[tag];
  if (!country) return;
  const estate = country.estates[estateId as 'nobility' | 'clergy' | 'burghers'];

  if (estate && estate.activePrivileges.includes(privilegeId)) {
    estate.activePrivileges = estate.activePrivileges.filter((id: string) => id !== privilegeId);
    estate.influence = Math.max(0, estate.influence - 15);
    estate.loyalty = Math.max(0, estate.loyalty - 20);
  }
};

const proposeRM = (state: GameState, fromTag: string, toTag: string) => {
  const from = state.countries[fromTag];
  const to = state.countries[toTag];
  if (!from || !to || from.royalMarriages.includes(toTag)) return;

  from.royalMarriages.push(toTag);
  to.royalMarriages.push(fromTag);
  
  from.relations[toTag] = Math.min(200, (from.relations[toTag] || 0) + 25);
  to.relations[fromTag] = Math.min(200, (to.relations[fromTag] || 0) + 25);
};

const declareWarAction = (state: GameState, fromTag: string, toTag: string, cbType: string) => {
  const attacker = state.countries[fromTag];
  const defender = state.countries[toTag];
  if (!attacker || !defender) return;

  const warId = `war_${Date.now()}_${fromTag}_${toTag}`;
  state.wars[warId] = {
    id: warId,
    attacker: fromTag,
    defender: toTag,
    attackerAllies: [],
    defenderAllies: [],
    warScore: 0,
    startDate: { ...state.date },
    warGoalProvinceId: (Object.values(state.provinces) as Province[]).find(p => p.owner === toTag && p.claims.includes(fromTag))?.id || '',
    warGoalType: cbType as any
  };

  // Apply CB stability effects
  if (cbType === 'no_cb') {
    attacker.stability = Math.max(-3, attacker.stability - 2);
  }

  state.historyLog.unshift(`WAR! ${attacker.name} declared war on ${defender.name}.`);
  if (state.historyLog.length > 50) state.historyLog.pop();
};

const resolvePeaceDealAction = (state: GameState, deal: PeaceDeal) => {
  resolvePeaceDeal(state, deal);
};

const reduceWE = (state: GameState, tag: string) => {
  const country = state.countries[tag];
  if (country && country.mana.dip >= 75 && country.warExhaustion > 0) {
    country.mana.dip -= 75;
    country.warExhaustion = Math.max(0, country.warExhaustion - 2.0);
  }
};

const executeSummonDiet = (state: GameState, tag: string) => {
  const country = state.countries[tag];
  if (!country) return;
  
  // summon diet grants random loyalty to estates
  const choice = Math.random();
  if (choice < 0.33) country.estates.nobility.loyalty = Math.min(100, country.estates.nobility.loyalty + 15);
  else if (choice < 0.66) country.estates.clergy.loyalty = Math.min(100, country.estates.clergy.loyalty + 15);
  else country.estates.burghers.loyalty = Math.min(100, country.estates.burghers.loyalty + 15);
};

const executeSeizeLand = (state: GameState, tag: string) => {
  const country = state.countries[tag];
  if (!country) return;

  country.crownLand = Math.min(100, country.crownLand + 5);
  country.estates.nobility.loyalty = Math.max(0, country.estates.nobility.loyalty - 15);
  country.estates.clergy.loyalty = Math.max(0, country.estates.clergy.loyalty - 15);
  country.estates.burghers.loyalty = Math.max(0, country.estates.burghers.loyalty - 15);

  // Spawn rebels if any estate loyalty falls below 30%
  if (country.estates.nobility.loyalty < 30) {
    const capitalProv = state.provinces[country.capitalProvinceId];
    if (capitalProv) {
      capitalProv.rebelProgress = 100; // instant trigger rebel uprising
    }
  }
};

const executeSaleOfTitles = (state: GameState, tag: string) => {
  const country = state.countries[tag];
  if (!country || country.crownLand < 10) return;

  country.crownLand -= 10;
  // gain gold proportional to total development
  let totalDev = 0;
  for (const pId in state.provinces) {
    const p = state.provinces[pId];
    if (p.owner === tag) totalDev += getProvinceDevelopment(p);
  }

  country.gold += totalDev * 10;
  country.estates.nobility.loyalty = Math.min(100, country.estates.nobility.loyalty + 10);
  country.estates.clergy.loyalty = Math.min(100, country.estates.clergy.loyalty + 10);
  country.estates.burghers.loyalty = Math.min(100, country.estates.burghers.loyalty + 10);
};

// Automatically bind modules to the lazily loaded gameStore references upon loading this bundle
loadEngineModules({
  advanceDayTick,
  developProv,
  coreProv,
  changeProvAutonomy,
  grantPriv,
  revokePriv,
  proposeRM,
  declareWarAction,
  resolvePeaceDealAction,
  reduceWE,
  increaseStab: increaseStability,
  executeSummonDiet,
  executeSeizeLand,
  executeSaleOfTitles
});
