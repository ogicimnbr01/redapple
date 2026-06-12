export interface Monarch {
  name: string;
  dynasty: string;
  age: number;
  adm: number; // 0 to 6
  dip: number; // 0 to 6
  mil: number; // 0 to 6
  isRegent: boolean;
}

export interface Heir {
  name: string;
  dynasty: string;
  age: number;
  adm: number;
  dip: number;
  mil: number;
  claim: number; // 0 to 100
}

export interface General {
  name: string;
  age: number;
  fire: number; // 0 to 6
  shock: number; // 0 to 6
}

export interface Army {
  id: string;
  owner: string; // Country tag (e.g., 'HAB', 'TUR')
  size: number; // Current troop count
  morale: number; // 0.0 to 5.0
  locationProvinceId: string;
  targetProvinceId: string | null;
  path: string[]; // List of province IDs to walk
  travelProgress: number; // 0 to 100% of current segment
  maintenanceCost: number; // Upkeep multiplier (per 1000 soldiers per month)
  isSieging: boolean;
  general: General | null;
  isRetreating: boolean;
}

export interface Battle {
  id: string;
  provinceId: string;
  attackerTag: string;
  defenderTag: string;
  attackerArmyId: string;
  defenderArmyId: string;
  attackerRoll: number;
  defenderRoll: number;
  round: number;
  phase: 'Fire' | 'Shock';
  daysInPhase: number;
}

export interface War {
  id: string;
  attacker: string; // Attacker main Tag
  defender: string; // Defender main Tag
  attackerAllies: string[];
  defenderAllies: string[];
  warScore: number; // -100 to +100
  startDate: { year: number; month: number; day: number };
  warGoalProvinceId: string;
  warGoalType: 'conquest' | 'reconquest' | 'imperial_liberation' | 'no_cb';
}

export interface EstateState {
  loyalty: number; // 0 to 100
  influence: number; // 0 to 100
  landShare: number; // %
  activePrivileges: string[];
}

export interface IdeaGroupInstance {
  id: string; // e.g., 'adm_ideas', 'dip_ideas'
  name: string;
  type: 'adm' | 'dip' | 'mil';
  ideasBought: number; // 0 to 7
}

export interface NationalModifier {
  id: string;
  source: string; // e.g., 'mission_restore_empire'
  armyMorale?: number; // e.g., 0.10 (+10%)
  combatDiscipline?: number; // e.g., 0.05 (+5%)
  taxModifier?: number;
  manpowerCapacity?: number;
  productionEfficiency?: number;
  cavalryCombatAbility?: number;
}

export interface Province {
  id: string;
  name: string;
  owner: string; // Country tag
  controller: string; // Country tag (changes during occupation)
  isHreProvince: boolean;
  isCapital: boolean;
  culture: string;
  religion: 'Catholic' | 'Orthodox' | 'Sunni';
  terrain: 'Plains' | 'Hills' | 'Mountains';
  adjacentProvinces: string[]; // List of adjacent province IDs
  
  // Development
  development: {
    adm: number; // Base Tax
    dip: number; // Base Production
    mil: number; // Base Manpower
  };
  
  // Core & Autonomy & Claims
  cores: string[]; // Country tags that have cores
  claims: string[]; // Country tags that have active claims
  coringProgress: number | null; // 0-100% or null if not coring
  autonomy: number; // 0 to 100
  minimumAutonomy: number; // determined by HRE reforms
  
  unrest: number;
  rebelProgress: number; // 0 to 100
  rebelType: 'Nobles' | 'Peasants' | 'Separatists' | 'None';
  
  buildings: {
    workshop: boolean;
    church: boolean;
    barracks: boolean;
    fort: boolean;
  };
}

export interface Country {
  tag: string;
  name: string;
  color: string;
  religion: 'Catholic' | 'Orthodox' | 'Sunni';
  techGroup: 'Western' | 'Eastern' | 'Anatolian' | 'Arabic' | 'Persian' | 'SteppeNomad';
  techLevels: { adm: number; dip: number; mil: number };
  gold: number;
  manpower: number;
  maxManpower: number;
  prestige: number; // -100 to 100
  stability: number; // -3 to 3
  crownLand: number; // 0 to 100%
  overextension: number; // calculated OE %
  victoryScore: number;
  capitalProvinceId: string;
  
  // Mana Pool & Income
  mana: { adm: number; dip: number; mil: number };
  manaIncome: { adm: number; dip: number; mil: number };
  
  // Rulers & Dynasty
  monarch: Monarch;
  heir: Heir | null;
  dynasty: string;
  royalMarriages: string[]; // List of country tags
  vassals: string[]; // List of country tags
  overlord: string | null; // Tag if this country is a vassal
  
  // Diplomatic Slots & War Exhaustion
  diplomaticRelationsUsed: number;
  diplomaticRelationsMax: number; // Base 4, +2 from Diplomatic Ideas
  warExhaustion: number; // 0 to 20
  
  // Permanent Modifiers (Mission Rewards)
  nationalModifiers: NationalModifier[];
  
  // Diplomacy Matrices
  relations: Record<string, number>; // Tag -> relations score (sparse matrix)
  allies: string[];
  truces: Record<string, number>; // Tag -> game days remaining
  aggressiveExpansion: Record<string, number>; // Tag -> AE score (sparse matrix)
  spyTarget?: string | null;
  spyNetworks?: Record<string, number>; // Target Country Tag -> Spy Network strength (0-100)
  
  // Estates
  estates: {
    nobility: EstateState;
    clergy: EstateState;
    burghers: EstateState;
  };
  
  selectedIdeaGroups: IdeaGroupInstance[];
  ideasCompletedCount: number;
  advisors: {
    adm: { name: string; level: number } | null;
    dip: { name: string; level: number } | null;
    mil: { name: string; level: number } | null;
  };
  
  // AI State
  aiTargetProvinceId?: string;
  voteTarget?: string;
  fabricatingClaims?: Record<string, number>;
  hreReformsPassed?: number;
  imperialAuthority?: number;
}

export interface PeaceDeal {
  warId: string;
  attackerTag: string;
  defenderTag: string;
  provincesDemanded: string[]; // list of province IDs
  goldDemanded: number;
  vassalization: boolean;
  warReparations: boolean;
}

export interface GameState {
  date: { year: number; month: number; day: number };
  isPaused: boolean;
  gameSpeed: number; // 1, 2, 3
  countries: Record<string, Country>;
  provinces: Record<string, Province>;
  armies: Record<string, Army>;
  battles: Record<string, Battle>;
  wars: Record<string, War>;
  historyLog: string[];
  activePlayerTag: string;
  emperorTag: string;
  hreElectors: string[];
  activeEvent: any;

  // Actions
  togglePause: () => void;
  setSpeed: (speed: number) => void;
  triggerEvent: (event: any) => void;
  resolveEvent: (choiceId: string) => void;
  advanceDay: () => void;
  developProvince: (provinceId: string, type: 'adm' | 'dip' | 'mil') => void;
  coreProvince: (provinceId: string) => void;
  changeAutonomy: (provinceId: string, increase: boolean) => void;
  grantPrivilege: (tag: string, estateId: string, privilegeId: string) => void;
  revokePrivilege: (tag: string, estateId: string, privilegeId: string) => void;
  proposeRoyalMarriage: (fromTag: string, toTag: string) => void;
  formAlliance: (fromTag: string, toTag: string) => void;
  breakAlliance: (fromTag: string, toTag: string) => void;
  setSpyTarget: (playerTag: string, targetTag: string | null) => void;
  declareWar: (fromTag: string, toTag: string, cbType: string) => void;
  sendPeaceDeal: (deal: PeaceDeal) => void;
  reduceWarExhaustion: (tag: string) => void;
  increaseStability: (tag: string) => void;
  summonDiet: (tag: string) => void;
  seizeLand: (tag: string) => void;
  saleOfTitles: (tag: string) => void;

  // Army control actions
  moveArmy: (armyId: string, path: string[], targetProvinceId: string) => void;
  hireGeneral: (armyId: string) => void;
  recruitArmy: (provinceId: string) => void;
  startClaimFabrication: (fromTag: string, provinceId: string) => void;
  splitArmy: (armyId: string) => void;
  mergeArmies: (armyId: string, targetArmyId: string) => void;
  passHreReform: () => void;
  buyTechnology: (type: 'adm' | 'dip' | 'mil') => void;
  selectIdeaGroup: (group: IdeaGroupInstance) => void;
  buyIdea: (groupId: string) => void;
  hireAdvisor: (type: 'adm' | 'dip' | 'mil', advisor: { name: string; level: number }) => void;
  fireAdvisor: (type: 'adm' | 'dip' | 'mil') => void;
}

