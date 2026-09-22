import React from 'react';
import { SpaceCanvas } from './SpaceCanvas';
import { SpaceHUD } from './SpaceHUD';
import './styles.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <SpaceCanvas />
      <SpaceHUD />
    </div>
  );
};

export default App;
