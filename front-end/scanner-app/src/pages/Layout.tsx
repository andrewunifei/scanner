import React, { useState } from 'react';
import { PieChartTwoTone, SettingTwoTone } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { appColors } from '../colors';
import { Outlet, Link, useLocation, useOutletContext } from "react-router-dom";
import { Col, Row } from 'antd';
import PairStream from '../components/PairStream';
import { pairStyle } from '../css/MenuPairStreamStyle';
import pairProperties from '../interfaces/data/pairProperties';

const items: MenuProps['items'] = [
  {
    label: <Link to='/'>Dashboard</Link>,
    key: '/',
  },
  {
    label: 'Navigation Two',
    key: 'app',
    disabled: true,
  },
  {
    label: <Link to='/configuration'>Configuration</Link>,
    key: '/configuration',
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
];

const flexContainer: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: appColors.dark
}

const assemblePair = (ticker: string, color: string, backgroundColor: string): pairProperties => {
  return ({
    ticker,
    color,
    backgroundColor
  })
}

const defaultLeftPair = assemblePair('btcusdt', '#F2A900', appColors.dark) 
const defaultRightPair = assemblePair('ethusdt', '#ecf0f1', appColors.dark) 

const leftPairWS = new WebSocket("wss://stream.binance.com:9443/ws");
const rightPairWS = new WebSocket("wss://stream.binance.com:9443/ws");

const Layout: React.FC = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const [tickerColor, setTickerColor] = useState({
    leftTickerColor:'#F2A900', 
    rightTickerColor:'#ecf0f1'
  });
  const [leftPairDidUpdate, setLeftPairDidUpdate] = useState(true);
  const [rightPairDidUpdate, setRightPairDidUpdate] = useState(true);

  const [leftPair, setLeftPair] = useState(defaultLeftPair.ticker);
  const [rightPair, setRightPair] = useState(defaultRightPair.ticker);

  // const [leftPairDetails, setLeftPairDetails] = useState(defaultLeftPair)
  // const [rightPairDetails, setRightPairDetails] = useState(defaultRightPair)

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };  

  return (
    <div>
      <Row style={{height: '5vh'}}>
        <Col span={18}>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </Col>
        <Col span={3} style={flexContainer}>
          <PairStream pair={leftPair} id={1} ws={leftPairWS} tickerStyle={pairStyle(tickerColor.leftTickerColor)} pairDidUpdate={leftPairDidUpdate} setPairDidUpdate={setLeftPairDidUpdate} />
        </Col>
        <Col span={3} style={flexContainer}>
          <PairStream pair={rightPair} id={2} ws={rightPairWS} tickerStyle={pairStyle(tickerColor.rightTickerColor)} pairDidUpdate={rightPairDidUpdate} setPairDidUpdate={setRightPairDidUpdate} />
        </Col>  
      </Row>
      
      <Outlet context={
        {
          left: [setLeftPairDidUpdate, setLeftPair],
          right: [setRightPairDidUpdate, setRightPair]
        }}
      />
    </div>
  )
};

export default Layout;
