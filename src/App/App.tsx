import React from 'react';
import FilterComponent from '../FilterComponent/FilterComponent';
import './App.scss';
import Chart from '../Chart/Chart';

const App: React.FC = () => {
  return (
    <div className="App">
      <FilterComponent></FilterComponent>
      <Chart></Chart>
    </div>
  );
}

export default App;
