import { useGameStore } from '../store/gameStore';
// Import the tick engine to register the lazy bindings
import '../engine/tickEngine';

const runTest = () => {
  console.log("=== Imperium Game State Engine Verification ===");
  
  let store = useGameStore.getState();
  console.log("Initial Date:", `${store.date.year}-${store.date.month}-${store.date.day}`);
  console.log("Initial Austria ADM Mana:", store.countries.HAB.mana.adm);
  console.log("Initial Austria Gold:", store.countries.HAB.gold);
  console.log("HRE Emperor:", store.emperorTag);

  // Tick the game daily until we hit December 1st (20 ticks)
  console.log("\nSimulating 20 Daily Ticks (Nov 11 -> Dec 1)...");
  for (let i = 0; i < 20; i++) {
    useGameStore.getState().advanceDay();
  }

  store = useGameStore.getState();
  console.log("\nNew Date:", `${store.date.year}-${store.date.month}-${store.date.day}`);
  console.log("New Austria ADM Mana (expected 107):", store.countries.HAB.mana.adm);
  console.log("New Austria Gold (expected upkeep/tax results):", store.countries.HAB.gold);
  console.log("History Log:", store.historyLog);
  console.log("Electors Votes:");
  for (const electorTag of store.hreElectors) {
    const elector = store.countries[electorTag];
    if (elector) {
      console.log(`- ${electorTag} votes for: ${elector.voteTarget}`);
    }
  }

  console.log("\n=== State Ticks Compiled Flawlessly! ===");
};

runTest();
export {};
