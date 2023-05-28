import './App.css';
import React, { useState } from 'react';
import HorizontalMenu from './components/HorizontalMenu';
import PairStream from './components/PairStream';
import { Col, Row } from 'antd';
import { appColors } from './colors';
import Dashboard from './components/Dashboard';
import { pairStyle } from './css/MenuPairStreamStyle';

const leftPairWS = new WebSocket("wss://stream.binance.com:9443/ws");
const rightPairWS = new WebSocket("wss://stream.binance.com:9443/ws");

const flexContainer: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: appColors.dark
}

// Nós podemos abrir a possibilidade para outros tickers
// enviando dados de outro componente de entrada de dados para esse aqui
// e alterando os valores dos pares 
// possibilitando mais flexibilidade de costumização no front-end
const rightPair = 'ethusdt';
const leftPair = 'btcusdt';

function App() {
  const [tickerColor, setTickerColor] = useState({
    leftTickerColor:'#F2A900', 
    rightTickerColor:'#ecf0f1'
  });

  return (
    <div className="App">
      <Row>
        <Col span={18}>
         <HorizontalMenu />
        </Col>
        <Col span={3} style={flexContainer}>
          <PairStream pair={leftPair} id={2} ws={leftPairWS} tickerStyle={pairStyle(tickerColor.leftTickerColor)} />
        </Col>
        <Col span={3} style={flexContainer}>
          <PairStream pair={rightPair} id={1} ws={rightPairWS} tickerStyle={pairStyle(tickerColor.rightTickerColor)} />
        </Col>  
      </Row>
      <Row>
        <Col>
        <Dashboard />
        </Col>
      </Row>
    </div>
  );
}

export default App;