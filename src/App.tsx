import { useState, useEffect } from 'react';
import { useGameStore } from './game/store/gameStore';
import { useShallow } from 'zustand/react/shallow';
import { StatusHeader } from './components/StatusHeader';
import { Map } from './components/Map';
import { ArmyPanel } from './components/Panels/ArmyPanel';
import { BattleModal } from './components/Modals/BattleModal';
import { PeaceDealModal } from './components/Modals/PeaceDealModal';
import { EventModal } from './components/Modals/EventModal';
import { Outliner } from './components/Outliner';

function App() {
  const {
    isPaused,
    gameSpeed,
    advanceDay,
    countries,
    provinces,
    battles,
    historyLog,
    activePlayerTag
  } = useGameStore(
    useShallow((state) => ({
      isPaused: state.isPaused,
      gameSpeed: state.gameSpeed,
      advanceDay: state.advanceDay,
      countries: state.countries,
      provinces: state.provinces,
      battles: state.battles,
      historyLog: state.historyLog,
      activePlayerTag: state.activePlayerTag
    }))
  );

  // Selection states
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
  const [selectedArmyId, setSelectedArmyId] = useState<string | null>(null);
  const [negotiatingWarId, setNegotiatingWarId] = useState<string | null>(null);

  // Game Loop interval driven by speed
  useEffect(() => {
    if (isPaused) return;

    // Game speed mapping: 1 (800ms), 2 (400ms), 3 (150ms)
    const delay = gameSpeed === 1 ? 800 : gameSpeed === 2 ? 400 : 150;

    const interval = setInterval(() => {
      advanceDay();
    }, delay);

    return () => clearInterval(interval);
  }, [isPaused, gameSpeed, advanceDay]);



  const playerCountry = countries[activePlayerTag];

  // Game Defeat / Victory Conditions
  if (!playerCountry) {
    return (
      <div style={{ display: 'flex', width: '100vw', height: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: '#ff7675' }}>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-title)' }}>DEFEAT</h1>
        <p style={{ marginTop: '10px', fontSize: '1.2rem' }}>Your country was completely annexed and eliminated.</p>
        <button onClick={() => window.location.reload()} style={{ marginTop: '30px' }}>Try Again</button>
      </div>
    );
  }

  // Defeat if player owns 0 provinces
  const playerProvincesCount = Object.values(provinces).filter(p => p.owner === activePlayerTag).length;
  if (playerProvincesCount === 0) {
    return (
      <div style={{ display: 'flex', width: '100vw', height: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0000', color: '#ff7675' }}>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-title)', letterSpacing: '4px' }}>DEFEAT</h1>
        <p style={{ marginTop: '10px', fontSize: '1.2rem', color: '#a1a1aa' }}>Your nation owns no territory and has fallen into history.</p>
        <button onClick={() => {
          localStorage.clear();
          window.location.reload();
        }} style={{ marginTop: '30px', borderColor: '#ff7675' }}>Start New Game</button>
      </div>
    );
  }

  // End Date check Dec 31, 1821 (or year >= 1822)
  const isEndGame = useGameStore.getState().date.year >= 1822;
  if (isEndGame) {
    const score = playerCountry.victoryScore;
    let rank = 'Minor Power';
    if (score >= 5000) rank = 'World Power (Dünya İmparatorluğu)';
    else if (score >= 2500) rank = 'Great Power (Büyük Güç)';
    else if (score >= 1000) rank = 'Regional Power (Bölgesel Güç)';

    return (
      <div style={{ display: 'flex', width: '100vw', height: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0a0f', color: '#fff' }}>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)', color: 'var(--color-gold)' }}>VICTORY & END OF AN ERA</h1>
        <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>The year 1822 has arrived. Imperium: Chronicle of Nations has ended.</p>
        <div className="glass-panel" style={{ padding: '24px', width: '400px', textAlign: 'center', marginTop: '25px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>Final Score: <strong style={{ color: 'var(--color-stability)', fontSize: '1.2rem' }}>{score}</strong></div>
          <div>Rank: <strong style={{ color: 'var(--color-gold)', fontSize: '1.2rem' }}>{rank}</strong></div>
        </div>
        <button onClick={() => {
          localStorage.clear();
          window.location.reload();
        }} style={{ marginTop: '30px' }}>Play Again</button>
      </div>
    );
  }

  // Active battles involving the player
  const playerBattle = Object.values(battles).find(
    (b) => b.attackerTag === activePlayerTag || b.defenderTag === activePlayerTag
  );



  return (
    <div id="game-root">
      {/* Top HUD */}
      <StatusHeader onFlagClick={() => {}} />

      {/* Main Sandbox Area */}
      <div className="main-layout">
        {/* SVG Interactive Map (Full Width) */}
        <div className="map-container" style={{ width: '100%' }}>
          <Map
            selectedProvinceId={selectedProvinceId}
            onSelectProvince={setSelectedProvinceId}
            selectedArmyId={selectedArmyId}
            onSelectArmy={setSelectedArmyId}
          />

          {/* Right Floating Outliner (EU4 style) */}
          <Outliner
            selectedArmyId={selectedArmyId}
            onSelectArmy={setSelectedArmyId}
            onSelectProvince={setSelectedProvinceId}
          />

          {/* Floating Log Overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: '75px',
              left: '20px',
              width: '280px',
              maxHeight: '120px',
              background: 'rgba(7, 9, 14, 0.85)',
              border: '1.5px solid var(--border-gold-dark)',
              borderRadius: '4px',
              padding: '10px 14px',
              fontSize: '0.75rem',
              color: '#f3e5c8',
              overflowY: 'auto',
              pointerEvents: 'none',
              zIndex: 10,
              fontFamily: 'monospace',
              boxShadow: '0 4px 15px rgba(0,0,0,0.6)'
            }}
          >
            <div style={{ fontWeight: 'bold', color: 'var(--border-gold)', marginBottom: '6px', fontFamily: 'var(--font-title)', fontSize: '0.7rem', letterSpacing: '1px' }}>
              CHRONICLE
            </div>
            {historyLog.slice(0, 5).map((log, idx) => (
              <div key={idx} style={{ marginBottom: '4px', borderBottom: '1px solid rgba(212,175,55,0.05)', paddingBottom: '3px' }}>
                • {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Army panel (Bottom Drawer slider) */}
      {selectedArmyId && (
        <ArmyPanel armyId={selectedArmyId} onClose={() => setSelectedArmyId(null)} />
      )}

      {/* Overlays / Modals */}
      {playerBattle && (
        <BattleModal battleId={playerBattle.id} />
      )}

      {negotiatingWarId && (
        <PeaceDealModal warId={negotiatingWarId} onClose={() => setNegotiatingWarId(null)} />
      )}

      <EventModal />
    </div>
  );
}

export default App;
