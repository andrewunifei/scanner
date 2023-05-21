import React from 'react';
import logo from './logo.svg';
import './App.css';
import HorizontalMenu from './components/HorizontalMenu';
import MainGrid from './components/MainGrid';

function App() {
  return (
    <div className="App">
      <HorizontalMenu />
      <MainGrid />
    </div>
  );
}

export default App;
