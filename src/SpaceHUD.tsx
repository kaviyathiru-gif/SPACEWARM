import React, { useState } from 'react';

export const SpaceHUD: React.FC = () => {
  const [code, setCode] = useState<string>(
`// NASA Space Particle Trajectory Elimination
function mitigateRadiation(pathogen) {
    const laserIntensity = calibrateLaser(pathogen.type);
    emitCounterPulse(pathogen.coords, laserIntensity);
    return calculateRadiationAbsorption();
}`
  );
  const [terminalOutput, setTerminalOutput] = useState<string>('ANALYSIS: IDLE');

  const executeCode = () => {
    setTerminalOutput('COMPILING... PARTICLE MITIGATION VECTOR LOCKED. SHIELD STABLE.');
  };

  return (
    <div className="hud-overlay">
      {/* Top Cockpit Header */}
      <header className="hud-header">
        <div className="status-badge">
          <span>HEALTH: <strong>92%</strong></span>
          <span>SHIELD: <strong>78%</strong></span>
        </div>
        <div className="hud-title">ASTRA HORIZONS // SPACEWARM</div>
        <div className="status-badge">
          <span>RESEARCH HUD: <strong>198,768</strong></span>
        </div>
      </header>

      {/* Main Floating Terminal Window */}
      <div className="floating-window">
        <div className="window-header">
          <span>RESEARCH [IDE] - RADIATION RISK SCRIPT</span>
          <div className="window-controls">
            <span>_</span>
            <span>□</span>
            <span>✕</span>
          </div>
        </div>
        <div className="window-body">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-editor"
            spellCheck={false}
          />
          <div className="terminal-actions">
            <button onClick={executeCode} className="btn-execute">RUN SCRIPT</button>
            <span className="terminal-log">{terminalOutput}</span>
          </div>
        </div>
      </div>

      {/* Floating Mineral & Particle Telemetry HUD */}
      <div className="floating-telemetry">
        <h3>PARTICLE SPECTRUM</h3>
        <ul>
          <li>Solar Protons: <span>38.2%</span></li>
          <li>Alpha Particles: <span>22.1%</span></li>
          <li>Cosmic Rays: <span>11.0%</span></li>
          <li>Heavy Ions: <span>5.4%</span></li>
        </ul>
        <div className="risk-level">BIOLOGICAL RISK: <strong>MODERATE</strong></div>
      </div>
    </div>
  );
};
