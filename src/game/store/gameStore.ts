import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Preferences } from '@capacitor/preferences';
import type { GameState, Army, PeaceDeal } from '../types/game.types';
import { INITIAL_PROVINCES, INITIAL_COUNTRIES } from '../database/database';

// Capacitor-safe storage adapter with a memory fallback for headless Node test environments
const isNode = typeof window === 'undefined';
const memoryStore: Record<string, string> = {};

const capacitorStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (isNode) return memoryStore[name] || null;
    const { value } = await Preferences.get({ key: name });
    return value;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (isNode) {
      memoryStore[name] = value;
      return;
    }
    await Preferences.set({ key: name, value });
  },
  removeItem: async (name: string): Promise<void> => {
    if (isNode) {
      delete memoryStore[name];
      return;
    }
    await Preferences.remove({ key: name });
  }
};

const spawnStartingArmies = (): Record<string, Army> => ({
  army_hab: {
    id: 'army_hab',
    owner: 'HAB',
    size: 10000,
    morale: 3.5,
    locationProvinceId: 'vienna',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: { name: 'Friedrich III', age: 29, fire: 2, shock: 3 },
    isRetreating: false
  },
  army_tur: {
    id: 'army_tur',
    owner: 'TUR',
    size: 14000,
    morale: 3.8,
    locationProvinceId: 'macedonia',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: { name: 'Hadim Sehabeddin', age: 45, fire: 3, shock: 4 },
    isRetreating: false
  },
  army_byz: {
    id: 'army_byz',
    owner: 'BYZ',
    size: 6000,
    morale: 3.2,
    locationProvinceId: 'constantinople',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: { name: 'Demetrios Palaiologos', age: 37, fire: 1, shock: 2 },
    isRetreating: false
  },
  army_hun: {
    id: 'army_hun',
    owner: 'HUN',
    size: 12000,
    morale: 3.6,
    locationProvinceId: 'pest',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: { name: 'Janos Hunyadi', age: 37, fire: 4, shock: 5 },
    isRetreating: false
  },
  army_boh: {
    id: 'army_boh',
    owner: 'BOH',
    size: 8000,
    morale: 3.3,
    locationProvinceId: 'prague',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: null,
    isRetreating: false
  },
  army_ser: {
    id: 'army_ser',
    owner: 'SER',
    size: 4000,
    morale: 3.2,
    locationProvinceId: 'belgrade',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: null,
    isRetreating: false
  },
  army_wal: {
    id: 'army_wal',
    owner: 'WAL',
    size: 3500,
    morale: 3.3,
    locationProvinceId: 'targoviste',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: { name: 'Vlad II Dracul', age: 50, fire: 2, shock: 3 },
    isRetreating: false
  },
  army_bos: {
    id: 'army_bos',
    owner: 'BOS',
    size: 4000,
    morale: 3.2,
    locationProvinceId: 'bosna',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: null,
    isRetreating: false
  },
  army_can: {
    id: 'army_can',
    owner: 'CAN',
    size: 5000,
    morale: 3.3,
    locationProvinceId: 'kastamonu',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: null,
    isRetreating: false
  },
  army_krm: {
    id: 'army_krm',
    owner: 'KRM',
    size: 6000,
    morale: 3.4,
    locationProvinceId: 'karaman',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: null,
    isRetreating: false
  },
  army_dul: {
    id: 'army_dul',
    owner: 'DUL',
    size: 4000,
    morale: 3.2,
    locationProvinceId: 'kadirli',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: null,
    isRetreating: false
  },
  army_ram: {
    id: 'army_ram',
    owner: 'RAM',
    size: 3000,
    morale: 3.2,
    locationProvinceId: 'adana',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: null,
    isRetreating: false
  },
  army_alb: {
    id: 'army_alb',
    owner: 'ALB',
    size: 5000,
    morale: 3.8,
    locationProvinceId: 'albania',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: { name: 'Skanderbeg', age: 39, fire: 5, shock: 6 },
    isRetreating: false
  },
  army_ven: {
    id: 'army_ven',
    owner: 'VEN',
    size: 8000,
    morale: 3.5,
    locationProvinceId: 'venice',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: { name: 'Carmagnola', age: 40, fire: 3, shock: 4 },
    isRetreating: false
  },
  army_mln: {
    id: 'army_mln',
    owner: 'MLN',
    size: 7000,
    morale: 3.4,
    locationProvinceId: 'milan',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: { name: 'Francesco Sforza', age: 43, fire: 4, shock: 3 },
    isRetreating: false
  },
  army_mnt: {
    id: 'army_mnt',
    owner: 'MNT',
    size: 3000,
    morale: 3.2,
    locationProvinceId: 'mantua',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: null,
    isRetreating: false
  },
  army_fer: {
    id: 'army_fer',
    owner: 'FER',
    size: 4000,
    morale: 3.2,
    locationProvinceId: 'ferrara',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: null,
    isRetreating: false
  },
  army_flr: {
    id: 'army_flr',
    owner: 'FLR',
    size: 6000,
    morale: 3.4,
    locationProvinceId: 'florence',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: null,
    isRetreating: false
  },
  army_sie: {
    id: 'army_sie',
    owner: 'SIE',
    size: 3000,
    morale: 3.1,
    locationProvinceId: 'siena',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: null,
    isRetreating: false
  },
  army_gen: {
    id: 'army_gen',
    owner: 'GEN',
    size: 5000,
    morale: 3.3,
    locationProvinceId: 'genoa',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: null,
    isRetreating: false
  },
  army_pap: {
    id: 'army_pap',
    owner: 'PAP',
    size: 6000,
    morale: 3.3,
    locationProvinceId: 'rome',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: null,
    isRetreating: false
  },
  army_nap: {
    id: 'army_nap',
    owner: 'NAP',
    size: 9000,
    morale: 3.5,
    locationProvinceId: 'naples',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: null,
    isRetreating: false
  },
  army_sav: {
    id: 'army_sav',
    owner: 'SAV',
    size: 5000,
    morale: 3.3,
    locationProvinceId: 'savoy',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: null,
    isRetreating: false
  },
  army_swi: {
    id: 'army_swi',
    owner: 'SWI',
    size: 6000,
    morale: 3.6,
    locationProvinceId: 'switzerland',
    targetProvinceId: null,
    path: [],
    travelProgress: 0,
    maintenanceCost: 0.02,
    isSieging: false,
    general: { name: 'Arnold Winkelried', age: 40, fire: 3, shock: 5 },
    isRetreating: false
  }
});

// Import state modify helpers lazily to prevent circular imports
let advanceDayTick: (state: any) => void;
let developProv: (state: any, provinceId: string, type: 'adm' | 'dip' | 'mil') => void;
let coreProv: (state: any, provinceId: string) => void;
let changeProvAutonomy: (state: any, provinceId: string, increase: boolean) => void;
let grantPriv: (state: any, tag: string, estateId: string, privilegeId: string) => void;
let revokePriv: (state: any, tag: string, estateId: string, privilegeId: string) => void;
let proposeRM: (state: any, fromTag: string, toTag: string) => void;
let declareWarAction: (state: any, fromTag: string, toTag: string, cbType: string) => void;
let resolvePeaceDealAction: (state: any, deal: PeaceDeal) => void;
let reduceWE: (state: any, tag: string) => void;
let increaseStab: (state: any, tag: string) => void;
let executeSummonDiet: (state: any, tag: string) => void;
let executeSeizeLand: (state: any, tag: string) => void;
let executeSaleOfTitles: (state: any, tag: string) => void;

export const loadEngineModules = (modules: {
  advanceDayTick: typeof advanceDayTick;
  developProv: typeof developProv;
  coreProv: typeof coreProv;
  changeProvAutonomy: typeof changeProvAutonomy;
  grantPriv: typeof grantPriv;
  revokePriv: typeof revokePriv;
  proposeRM: typeof proposeRM;
  declareWarAction: typeof declareWarAction;
  resolvePeaceDealAction: typeof resolvePeaceDealAction;
  reduceWE: typeof reduceWE;
  increaseStab: typeof increaseStab;
  executeSummonDiet: typeof executeSummonDiet;
  executeSeizeLand: typeof executeSeizeLand;
  executeSaleOfTitles: typeof executeSaleOfTitles;
}) => {
  advanceDayTick = modules.advanceDayTick;
  developProv = modules.developProv;
  coreProv = modules.coreProv;
  changeProvAutonomy = modules.changeProvAutonomy;
  grantPriv = modules.grantPriv;
  revokePriv = modules.revokePriv;
  proposeRM = modules.proposeRM;
  declareWarAction = modules.declareWarAction;
  resolvePeaceDealAction = modules.resolvePeaceDealAction;
  reduceWE = modules.reduceWE;
  increaseStab = modules.increaseStab;
  executeSummonDiet = modules.executeSummonDiet;
  executeSeizeLand = modules.executeSeizeLand;
  executeSaleOfTitles = modules.executeSaleOfTitles;
};

export const useGameStore = create<GameState>()(
  persist(
    immer((set) => ({
      // State Variables
      date: { year: 1444, month: 11, day: 11 },
      isPaused: true,
      gameSpeed: 1,
      countries: INITIAL_COUNTRIES,
      provinces: INITIAL_PROVINCES,
      armies: spawnStartingArmies(),
      battles: {},
      wars: {},
      historyLog: ['Chronicle of Nations initialized on Nov 11, 1444.'],
      activePlayerTag: 'HAB', // Default playable faction is Austria
      emperorTag: 'HAB',
      hreElectors: ['MAI', 'KOL', 'TRI', 'BOH', 'BRA', 'SAX', 'PAL'],
      activeEvent: null,

      // Core Control Actions
      togglePause: () =>
        set((state: any) => {
          state.isPaused = !state.isPaused;
        }),

      setSpeed: (speed: number) =>
        set((state: any) => {
          state.gameSpeed = speed;
        }),

      advanceDay: () =>
        set((state: any) => {
          if (advanceDayTick) advanceDayTick(state);
        }),

      // Gameplay Actions
      developProvince: (provinceId: string, type: 'adm' | 'dip' | 'mil') =>
        set((state: any) => {
          if (developProv) developProv(state, provinceId, type);
        }),

      coreProvince: (provinceId: string) =>
        set((state: any) => {
          if (coreProv) coreProv(state, provinceId);
        }),

      changeAutonomy: (provinceId: string, increase: boolean) =>
        set((state: any) => {
          if (changeProvAutonomy) changeProvAutonomy(state, provinceId, increase);
        }),

      grantPrivilege: (tag: string, estateId: string, privilegeId: string) =>
        set((state: any) => {
          if (grantPriv) grantPriv(state, tag, estateId, privilegeId);
        }),

      revokePrivilege: (tag: string, estateId: string, privilegeId: string) =>
        set((state: any) => {
          if (revokePriv) revokePriv(state, tag, estateId, privilegeId);
        }),

      proposeRoyalMarriage: (fromTag: string, toTag: string) =>
        set((state: any) => {
          if (proposeRM) proposeRM(state, fromTag, toTag);
        }),

      formAlliance: (fromTag: string, toTag: string) =>
        set((state: any) => {
          const from = state.countries[fromTag];
          const to = state.countries[toTag];
          if (from && to && !from.allies.includes(toTag)) {
            from.allies.push(toTag);
            to.allies.push(fromTag);
          }
        }),

      breakAlliance: (fromTag: string, toTag: string) =>
        set((state: any) => {
          const from = state.countries[fromTag];
          const to = state.countries[toTag];
          if (from && to) {
            from.allies = from.allies.filter((t: string) => t !== toTag);
            to.allies = to.allies.filter((t: string) => t !== fromTag);
          }
        }),

      setSpyTarget: (playerTag: string, targetTag: string | null) =>
        set((state: any) => {
          const country = state.countries[playerTag];
          if (country) {
            country.spyTarget = targetTag;
          }
        }),

      declareWar: (fromTag: string, toTag: string, cbType: string) =>
        set((state: any) => {
          if (declareWarAction) declareWarAction(state, fromTag, toTag, cbType);
        }),

      sendPeaceDeal: (deal: PeaceDeal) =>
        set((state: any) => {
          if (resolvePeaceDealAction) resolvePeaceDealAction(state, deal);
        }),

      reduceWarExhaustion: (tag: string) =>
        set((state: any) => {
          if (reduceWE) reduceWE(state, tag);
        }),

      increaseStability: (tag: string) =>
        set((state: any) => {
          if (increaseStab) increaseStab(state, tag);
        }),

      summonDiet: (tag: string) =>
        set((state: any) => {
          if (executeSummonDiet) executeSummonDiet(state, tag);
        }),

      seizeLand: (tag: string) =>
        set((state: any) => {
          if (executeSeizeLand) executeSeizeLand(state, tag);
        }),

      saleOfTitles: (tag: string) =>
        set((state: any) => {
          if (executeSaleOfTitles) executeSaleOfTitles(state, tag);
        }),

      moveArmy: (armyId: string, path: string[], targetProvinceId: string) =>
        set((state: any) => {
          const army = state.armies[armyId];
          if (army && !army.isRetreating) {
            const isAtWar = (tagA: string, tagB: string) => {
              return Object.values(state.wars).some((war: any) => {
                const sideA = [war.attacker, ...war.attackerAllies];
                const sideB = [war.defender, ...war.defenderAllies];
                return (sideA.includes(tagA) && sideB.includes(tagB)) || (sideA.includes(tagB) && sideB.includes(tagA));
              });
            };

            const isPathBlocked = path.some(pId => {
              const p = state.provinces[pId];
              if (!p) return true;
              return p.owner !== army.owner && p.controller !== army.owner && !isAtWar(army.owner, p.owner) && !isAtWar(army.owner, p.controller);
            });

            if (isPathBlocked) {
              state.historyLog.unshift(`Cannot move army to/through foreign territory without being at war.`);
              if (state.historyLog.length > 50) state.historyLog.pop();
              return;
            }

            army.path = path;
            army.targetProvinceId = targetProvinceId;
            army.travelProgress = 0;
          }
        }),

      hireGeneral: (armyId: string) =>
        set((state: any) => {
          const army = state.armies[armyId];
          if (army) {
            const country = state.countries[army.owner];
            if (country && country.mana.mil >= 50) {
              country.mana.mil -= 50;
              const names = ['Von Bulow', 'General John', 'Schwarzenberg', 'Radetzky', 'Kutusov', 'Suleiman Pasha', 'Napoleon', 'Wellington', 'Eugene of Savoy'];
              const name = names[Math.floor(Math.random() * names.length)];
              army.general = {
                name,
                age: 30 + Math.floor(Math.random() * 20),
                fire: Math.floor(Math.random() * 5),
                shock: Math.floor(Math.random() * 5)
              };
            }
          }
        }),

      recruitArmy: (provinceId: string) =>
        set((state: any) => {
          const province = state.provinces[provinceId];
          if (province) {
            const country = state.countries[province.owner];
            if (country && country.gold >= 50 && country.manpower >= 1000) {
              country.gold -= 50;
              country.manpower -= 1000;
              
              const newArmyId = `army_${province.owner}_${Date.now()}`;
              state.armies[newArmyId] = {
                id: newArmyId,
                owner: province.owner,
                size: 1000,
                morale: 3.0,
                locationProvinceId: provinceId,
                targetProvinceId: null,
                path: [],
                travelProgress: 0,
                maintenanceCost: 0.02,
                isSieging: false,
                general: null,
                isRetreating: false
              };
            }
          }
        }),

      triggerEvent: (event: any) =>
        set((state: any) => {
          state.activeEvent = event;
        }),

      resolveEvent: (choiceId: string) =>
        set((state: any) => {
          const event = state.activeEvent;
          if (!event) return;
          const country = state.countries[event.countryTag];
          
          if (choiceId === 'comet_lose_stab' && country) {
            country.stability = Math.max(-3, country.stability - 1);
          } else if (choiceId === 'comet_lose_adm' && country) {
            country.mana.adm = Math.max(0, country.mana.adm - 50);
          } else if (choiceId === 'noble_yield' && country) {
            country.crownLand = Math.max(0, country.crownLand - 5);
            country.estates.nobility.loyalty = Math.min(100, country.estates.nobility.loyalty + 15);
          } else if (choiceId === 'noble_fight' && country) {
            const capitalProv = state.provinces[country.capitalProvinceId];
            if (capitalProv) capitalProv.rebelProgress = 100; // triggers uprising on next check
          } else if (choiceId === 'peasant_yield' && country) {
            const capitalProv = state.provinces[country.capitalProvinceId];
            if (capitalProv) capitalProv.autonomy = Math.min(100, capitalProv.autonomy + 30);
            country.estates.clergy.loyalty = Math.min(100, country.estates.clergy.loyalty + 15);
          } else if (choiceId === 'peasant_fight' && country) {
            const capitalProv = state.provinces[country.capitalProvinceId];
            if (capitalProv) capitalProv.rebelProgress = 100;
          } else if (choiceId === 'talented_heir' && country) {
            country.heir = {
              name: 'Karl',
              dynasty: country.dynasty,
              age: 0,
              adm: 5,
              dip: 5,
              mil: 5,
              claim: 100
            };
          }
          
          state.activeEvent = null;
        }),

      startClaimFabrication: (fromTag: string, provinceId: string) =>
        set((state: any) => {
          const country = state.countries[fromTag];
          if (country && country.mana.dip >= 50) {
            country.mana.dip -= 50;
            if (!country.fabricatingClaims) country.fabricatingClaims = {};
            country.fabricatingClaims[provinceId] = 6;
          }
        }),

      splitArmy: (armyId: string) =>
        set((state: any) => {
          const a = state.armies[armyId];
          if (a && a.size > 1000) {
            const halfSize = Math.floor(a.size / 2);
            a.size -= halfSize;
            
            const newId = `army_${Date.now()}`;
            state.armies[newId] = {
              id: newId,
              owner: a.owner,
              size: halfSize,
              morale: a.morale,
              locationProvinceId: a.locationProvinceId,
              targetProvinceId: null,
              path: [],
              travelProgress: 0,
              maintenanceCost: a.maintenanceCost,
              isSieging: false,
              general: null, // split army starts with no general
              isRetreating: false
            };
          }
        }),

      mergeArmies: (armyId: string, targetArmyId: string) =>
        set((state: any) => {
          const a = state.armies[armyId];
          const t = state.armies[targetArmyId];
          if (a && t) {
            a.size += t.size;
            delete state.armies[targetArmyId];
          }
        }),

      passHreReform: () =>
        set((state: any) => {
          const emperor = state.countries[state.emperorTag];
          if (emperor) {
            const nextReformIndex = emperor.hreReformsPassed ?? 0;
            const costs = [
              { ia: 50, gold: 500 },
              { ia: 60, gold: 1000 },
              { ia: 70, gold: 1500 },
              { ia: 80, gold: 2000 },
              { ia: 100, gold: 3000 }
            ];
            const cost = costs[nextReformIndex];
            const impAuth = emperor.imperialAuthority ?? 0;
            if (cost && impAuth >= cost.ia && emperor.gold >= cost.gold) {
              emperor.imperialAuthority = impAuth - cost.ia;
              emperor.gold -= cost.gold;
              emperor.hreReformsPassed = nextReformIndex + 1;

              // Set HRE minimum autonomy values based on passed reform level
              const minAutonomies = [80, 60, 40, 20, 0];
              const nextMin = minAutonomies[nextReformIndex];
              for (const pId in state.provinces) {
                const p = state.provinces[pId];
                if (p.isHreProvince) {
                  p.minimumAutonomy = nextMin;
                }
              }

              // If final reform (Renovatio Imperii) passed, unify the HRE
              if (emperor.hreReformsPassed === 5) {
                state.historyLog.unshift(`Renovatio Imperii: All Holy Roman Empire provinces unified!`);
                if (state.historyLog.length > 50) state.historyLog.pop();
                for (const pId in state.provinces) {
                  const p = state.provinces[pId];
                  if (p.isHreProvince) {
                    p.owner = state.emperorTag;
                    p.controller = state.emperorTag;
                    p.autonomy = 0;
                    p.minimumAutonomy = 0;
                  }
                }
                // Absorb elector tags
                const electorsToAbsorb = ['BOH', 'BRA', 'SAX'];
                for (const elTag of electorsToAbsorb) {
                  const elCountry = state.countries[elTag];
                  if (elCountry) {
                    emperor.gold += elCountry.gold;
                    // clear armies of absorbed tags
                    for (const aId in state.armies) {
                      if (state.armies[aId].owner === elTag) delete state.armies[aId];
                    }
                  }
                }
              }
            }
          }
        }),

      buyTechnology: (type: 'adm' | 'dip' | 'mil') =>
        set((state: any) => {
          const country = state.countries[state.activePlayerTag];
          if (country && country.mana[type] >= 600) {
            country.mana[type] -= 600;
            country.techLevels[type]++;
          }
        }),

      selectIdeaGroup: (group: any) =>
        set((state: any) => {
          const country = state.countries[state.activePlayerTag];
          if (country) {
            country.selectedIdeaGroups.push(group);
          }
        }),

      buyIdea: (groupId: string) =>
        set((state: any) => {
          const country = state.countries[state.activePlayerTag];
          if (country) {
            const group = country.selectedIdeaGroups.find((g: any) => g.id === groupId);
            if (group && group.ideasBought < 7) {
              const cost = 400;
              if (country.mana[group.type] >= cost) {
                country.mana[group.type] -= cost;
                group.ideasBought++;
                country.ideasCompletedCount++;
              }
            }
          }
        }),

      hireAdvisor: (type: 'adm' | 'dip' | 'mil', advisor: { name: string; level: number }) =>
        set((state: any) => {
          const country = state.countries[state.activePlayerTag];
          if (country) {
            const cost = advisor.level === 1 ? 20 : advisor.level === 2 ? 80 : 200;
            if (country.gold >= cost) {
              country.gold -= cost;
              country.advisors[type] = advisor;
              
              state.historyLog.unshift(`Hired Level ${advisor.level} advisor ${advisor.name} (${type.toUpperCase()}).`);
              if (state.historyLog.length > 50) state.historyLog.pop();
            }
          }
        }),

      fireAdvisor: (type: 'adm' | 'dip' | 'mil') =>
        set((state: any) => {
          const country = state.countries[state.activePlayerTag];
          if (country && country.advisors[type]) {
            const advName = country.advisors[type].name;
            country.advisors[type] = null;
            state.historyLog.unshift(`Dismissed advisor ${advName}.`);
            if (state.historyLog.length > 50) state.historyLog.pop();
          }
        })
    })),
    {
      name: 'imperium-chronicles-save',
      storage: createJSONStorage(() => capacitorStorage),
      version: 12, // saveVersion tracking for migrations
      migrate: (persistedState: any, version: number) => {
        if (version < 12) {
          console.warn("Outdated save version, resetting state to initial values.");
          return {
            date: { year: 1444, month: 11, day: 11 },
            isPaused: true,
            gameSpeed: 1,
            countries: INITIAL_COUNTRIES,
            provinces: INITIAL_PROVINCES,
            armies: spawnStartingArmies(),
            battles: {},
            wars: {},
            historyLog: ['Chronicle of Nations initialized on Nov 11, 1444.'],
            activePlayerTag: 'HAB',
            emperorTag: 'HAB',
            hreElectors: ['MAI', 'KOL', 'TRI', 'BOH', 'BRA', 'SAX', 'PAL'],
            activeEvent: null,
          };
        }
        return persistedState;
      }
    }
  )
);
