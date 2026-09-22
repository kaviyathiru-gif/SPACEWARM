import React, { useState, useEffect } from 'react';
import { fetchSpaceParticleData, ParticleTelemetry } from './nasaService';

export const SpaceHUD: React.FC = () => {
  const [telemetry, setTelemetry] = useState<ParticleTelemetry[]>([]);
  const [code, setCode] = useState<string>(
`// NASA Space Particle Trajectory Elimination
function mitigateRadiation(pathogen) {
    const laserIntensity = calibrateLaser(pathogen.type);
    emitCounterPulse(pathogen.coords, laserIntensity);
    return calculateRadiationAbsorption();
}`
  );
  const [terminalOutput, setTerminalOutput] = useState<string>('ANALYSIS: IDLE');

  useEffect(() => {
    fetchSpaceParticleData().then((data) => setTelemetry(data));
  }, []);

  const executeCode = () => {
    setTerminalOutput('COMPILING... PARTICLE MITIGATION VECTOR LOCKED. SHIELD STABLE.');
  };

  return (
    <div className="hud-overlay">
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

      {/* Floating Code Editor */}
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

      {/* Real-time Telemetry Powered by NASA API */}
      <div className="floating-telemetry">
        <h3>LIVE NASA PARTICLE STREAM</h3>
        <ul>
          {telemetry.length > 0 ? (
            telemetry.slice(0, 4).map((item, idx) => (
              <li key={idx}>
                {item.sourceType}: <span>{item.intensityScore}%</span>
              </li>
            ))
          ) : (
            <li>Connecting to NASA Feed...</li>
          )}
        </ul>
        <div className="risk-level">BIOLOGICAL RISK: <strong>MODERATE</strong></div>
      </div>
    </div>
  );
};
