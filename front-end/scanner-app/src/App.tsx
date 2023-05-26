import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import HorizontalMenu from './components/HorizontalMenu';
import MainGrid from './components/MainGrid';
import stream24hDataPropsInterface from './interfaces/stream24hData';
import dummyTickerObject from './misc/dummyTickerObject';

function App() {
  const [data, setData] = useState<stream24hDataPropsInterface>(dummyTickerObject);

  return (
    <div className="App">
      <HorizontalMenu data={data}/>
      <MainGrid setData={setData} />
    </div>
  );
}

export default App;