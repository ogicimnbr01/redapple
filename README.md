# Imperium: Chronicle of Nations

Imperium: Chronicle of Nations is a mobile-first grand strategy game for Android (built in React + TypeScript, wrapped via Capacitor) that delivers a deep, tactical experience. It combines 70% of Europa Universalis IV's mechanical depth (mana generation, estate management, Holy Roman Empire elections, claims, coring, overextension, and war exhaustion) with 30% of Age of History's streamlined layout simplicity (35-province map, dynamic node-link strategic pathing, and daily automated ticks).

---

## 🕹️ Core Game Mechanics

1. **Mana & Advisors**: Generate Administrative (ADM), Diplomatic (DIP), and Military (MIL) points based on monarch stats and active state slots.
2. **Diplomacy & CB (Casus Belli)**:
   - **Conquest CB**: Fabricate claims on adjacent provinces (takes 6 months, costs 50 DIP).
   - **Reconquest CB**: Reclaim unowned cores at 25% Aggressive Expansion (AE) and 50% War Score cost.
   - **Imperial Liberation CB**: Special CB for the HRE Emperor against non-member occupiers.
   - **No-CB War**: Declare war immediately but lose -2 stability and gain 200% AE.
3. **Estate Management**:
   - **Nobility, Clergy, Burghers**: Summon diets (raise loyalty), seize land (+5% crown land, -15% loyalty), or sell titles (+10% loyalty, gain gold based on development). Low nobility loyalty triggers noble revolts.
4. **Holy Roman Empire (HRE)**:
   - Austria begins as the Emperor. Elector tags (Bohemia, Brandenburg, Saxony, Cologne, Mainz, Trier, Palatinate) vote dynamically based on relations, alliances, and prestige.
   - **Reforms Tree**: Pass up to 5 HRE reforms using Imperial Authority (IA) and gold to decrease HRE province autonomy limits. Final reform (Renovatio Imperii) unites the HRE under a single tag.
5. **Coring, Overextension (OE) & Unrest**:
   - Occupied uncored provinces generate Overextension. High OE increases global unrest and stability costs. Coring costs ADM mana based on province development.
6. **Time Tick Engine**:
   - Daily loops increment army movement segment progresses, execute battles, ticking war scores, and sieges.
   - Monthly ticks process income tax, manpower recovery, advisor salaries, HRE vote updates, ruler aging/death, and random historical events.
7. **Shattered Retreat**: Defeated armies retreat to the closest friendly province at 2x travel speed. They cannot battle or siege during this state.

---

## 🚀 Project Status & Phase Checklist

All three development phases have been **100% completed, tested, and compiled**:

- `[x]` **Phase 1: Foundation**
  - Vite React TypeScript repository setup inside the workspace.
  - Setup Zustand store with Immer middleware and dynamic Capacitor Preferences adapter.
  - Initial database defined with 35 historical European provinces and 10 starting countries (Austrian Habsburgs, Ottomans, Byzantium, Hungary, etc.).
  - Implemented the Master daily/monthly tick engine, claim fab timers, and BFS pathfinders.
- `[x]` **Phase 2: UI Panels & Modals**
  - **StatusHeader HUD**: Displays Gold, Manpower, Prestige, Stability, OE, and date.
  - **Collapsible Drawer Tabs**: Tab selectors for Province administration, Elector matrix, Estates control, Tech/Ideas, Active Wars negotiator, and Chronicle History log.
  - **Combat / Battle Modal**: Shows real-time morale meters, dice rolls, terrain penalties, and generals.
  - **Peace Negotiation Modal**: Demand provinces, reparations, vassalization, or gold.
  - **Historical Event Modal**: Pop-ups with serializable decision choice trees (Comet Sighted, noble protest, etc.).
- `[x]` **Phase 3: Interactive Map & Build**
  - **SVG Map Viewport**: Zoom-pan dynamic map showing adjacency graphs, capital indicators, and occupation stripes.
  - **Armies & Battles Render**: Active armies render as overlay flags. Coordinates interpolate based on movement progress. Active battles display crossed swords overlay.
  - **AI Integration**: AI processes monthly turns declaring wars, spending mana, and requesting marriages.
  - **Defeat & End game conditions**: Triggers defeat if player owned provinces hit 0. Game halts in 1822 displaying ranking results (Minor, Regional, Great, or World Power).
  - **Build Verification**: Verified production build compiles flawlessly (`npm run build`).

---

## 🇹🇷 Türkçe Proje Özeti ve Durumu (Turkish Summary)

### Oyun Tamam mı?
Evet, oyun şu an **tamamen oynanabilir ve hazırdır**. Oyun motoru (ticking engine), yapay zeka (AI behaviors), grafiksel SVG harita (Map) ve barış anlaşmaları gibi tüm kullanıcı arayüzü (UI) bileşenleri entegre edilmiştir. LocalStorage/Preferences tabanlı kayıt (autosave) sistemi devrededir ve proje TypeScript/Vite ile sıfır hata ile üretime (`npm run build`) derlenmektedir.

### 🕹️ Çekirdek Mekanikler
1. **Mana & Hükümdar Puanları**: ADM, DIP ve MIL puanları hükümdarın yeteneğine göre birikir ve vilayet geliştirme, coring veya teknoloji satın almada kullanılır.
2. **Diplomasi & Savaş**: Claim (hak) üretip Conquest savaşı açabilir ya da No-CB (nedensiz) savaş açıp -2 istikrar (stability) ve ağır agresif genişleme (AE) cezası alabilirsiniz. Savaş sonrasında vilayet talep etme, vassal yapma veya savaş tazminatı içeren barış modülü çalışmaktadır.
3. **Kutsal Roma İmparatorluğu (HRE)**: İmparator (HAB) ve elektörlerin oylama mekaniği çalışır. İmparatorluk otoritesi biriktirilerek vilayetlerin otonomi sınırlarını düşüren 5 reform geçirilebilir. Son reform HRE'yi tek bir ülke altında birleştirir.
4. **Shattered Retreat**: Savaşı kaybeden ordu en yakın dost toprağa 2 kat hızla geri çekilir ve bu sırada savaşamaz/kuşatamaz.
5. **Rastgele Olaylar (Events)**: Kuyruklu Yıldız Görülmesi, Soylu Talepleri veya Yetenekli Varis gibi seçenekli olaylar aylık tick sırasında tetiklenir.

---

## 🛠️ Codebase Architecture

- `src/game/types/game.types.ts`: Typings for Monarch, Heir, General, Army, Battle, War, Province, Country, PeaceDeal, and GameState.
- `src/game/database/database.ts`: 35 Starting provinces coordinate graphs, cultural/religious stats, and historical country records.
- `src/game/store/gameStore.ts`: Zustand store for state mutations, action handles, and persistence wrappers.
- `src/game/engine/tickEngine.ts`: Ticks time, resolves monthly finances, decay, rebel uprising triggers, and HRE elections.
- `src/game/engine/combatEngine.ts`: Controls army movement coordinates interpolation, battle rounds (cycling Shock/Fire phases), sieges, and supply limit attrition.
- `src/game/engine/diplomacyEngine.ts`: Peace deals resolver, claim fabricator actions, and AE spread.
- `src/game/ai/aiBehavior.ts`: Utility evaluation loops determining AI actions.

---

## 🏃 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### Running Locally (Development Mode)
Launch the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Building for Production
Verify production builds and compile typescript definitions:
```bash
npm run build
```
The production assets will be placed in the `dist/` directory, ready to be wrapped in Android/iOS APKs via Capacitor.
