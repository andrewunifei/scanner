import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import HorizontalMenu from './components/HorizontalMenu';
import MainGrid from './components/MainGrid';
import stream24hDataPropsInterface from './interfaces/stream24hData';
import dummyTickerObject from './misc/dummyTickerObject';
import { Col, Row } from 'antd';
import { style } from './css/div'

const leftPairWS = new WebSocket("wss://stream.binance.com:9443/ws");
const rightPairWS = new WebSocket("wss://stream.binance.com:9443/ws");

const leftPairStyle: React.CSSProperties = {
  color: '#F2A900', 
  fontWeight: 'bold'
}

const rightPairStyle: React.CSSProperties = {
  color: 'rgb(6, 103, 208)',
  fontWeight: 'bold'
}

const flexContainer: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

// Nós podemos abrir a possibilidade para outros tickers
// enviando dados de outro componente de entrada de dados para esse aqui
// e alterando os valores dos pares 
// possibilitando mais flexibilidade de costumização no front-end
const rightPair = 'linkusdt';
const leftPair = 'btcusdt';

function App() {
  const [data, setData] = useState<stream24hDataPropsInterface>(dummyTickerObject);

  return (
    <div className="App" style={style}>
      <Row>
        <Col span={18}>
         <HorizontalMenu data={data}/>
        </Col>
        <Col span={3} style={flexContainer}>
          <MainGrid pair={leftPair} id={2} ws={leftPairWS} tickerStyle={leftPairStyle}/>
        </Col>
        <Col span={3} style={flexContainer}>
          <MainGrid pair={rightPair} id={1} ws={rightPairWS} tickerStyle={rightPairStyle}/>
        </Col>
      </Row>
    </div>
  );
}

export default App;