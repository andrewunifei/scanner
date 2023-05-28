import './App.css';
import React, { useState } from 'react';
import Layout from './components/Layout';
import PairStream from './components/PairStream';
import { Col, Row } from 'antd';
import { appColors } from './colors';
import Dashboard from './components/Dashboard';
import { pairStyle } from './css/MenuPairStreamStyle';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Configuration from './components/Configuration';
import { Outlet, Link } from "react-router-dom";

function App() {
  const [outlet, setOutlet] = useState<React.ReactElement | null>()

  return (
    <div className="App">

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
              <Route path='config' element={<Configuration />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;