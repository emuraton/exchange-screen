import React from 'react';
import './App.css';

import Exchange from './scenes/Exchange/Exchange';

function App() {
  async function fetchRates(navigation) {
    const res = await fetch(
      `https://api.exchangeratesapi.io/latest?base=${navigation.activeSelectedPocket}`
    );
    return await res.json();
  }

  return (
    <div>
      <Exchange fetchRates={fetchRates} />
    </div>
  );
}

export default App;
