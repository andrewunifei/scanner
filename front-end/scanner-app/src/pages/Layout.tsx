import React, { useState } from 'react';
import { PieChartTwoTone, SettingTwoTone } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { appColors } from '../colors';
import { Outlet, Link, useLocation } from "react-router-dom";
import { Col, Row } from 'antd';
import PairStream from '../components/PairStream';
import { pairStyle } from '../css/MenuPairStreamStyle';

const items: MenuProps['items'] = [
  {
    label: <Link to='/'>Dashboard</Link>,
    key: '/',
    icon: <PieChartTwoTone twoToneColor={appColors.dark}/>,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    disabled: true,
  },
  {
    label: <Link to='/configuration'>Configuration</Link>,
    key: '/configuration',
    icon: <SettingTwoTone twoToneColor={appColors.dark}/>,
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

// Nós podemos abrir a possibilidade para outros tickers
// enviando dados de outro componente de entrada de dados para esse aqui
// e alterando os valores dos pares 
// possibilitando mais flexibilidade de costumização no front-end
const rightPair = 'ethusdt';
const leftPair = 'btcusdt';

const leftPairWS = new WebSocket("wss://stream.binance.com:9443/ws");
const rightPairWS = new WebSocket("wss://stream.binance.com:9443/ws");

const Layout: React.FC = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const [tickerColor, setTickerColor] = useState({
    leftTickerColor:'#F2A900', 
    rightTickerColor:'#ecf0f1'
  });

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div>
      <Row>
        <Col span={18}>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </Col>
        <Col span={3} style={flexContainer}>
          <PairStream pair={leftPair} id={2} ws={leftPairWS} tickerStyle={pairStyle(tickerColor.leftTickerColor)} />
        </Col>
        <Col span={3} style={flexContainer}>
          <PairStream pair={rightPair} id={1} ws={rightPairWS} tickerStyle={pairStyle(tickerColor.rightTickerColor)} />
        </Col>  
      </Row>

      <Outlet />
    </div>
  )
};

export default Layout;