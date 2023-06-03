import React, { useEffect, useState } from 'react';
import { PieChartTwoTone, SettingTwoTone } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { appColors } from '../colors';
import { Outlet, Link, useLocation, useOutletContext } from "react-router-dom";
import { Col, Row } from 'antd';
import PairStream from '../components/PairStream';
import { pairStyle } from '../css/MenuPairStreamStyle';
import pairProperties from '../interfaces/data/pairProperties';
import pairStreamConfigInterface from '../interfaces/data/pairStreamConfig';
import dummyTickerObject from '../misc/dummyTickerObject';
import stream24hDataPropsInterface from '../interfaces/data/stream24hData';

const items: MenuProps['items'] = [
  {
    label: <Link to='/'>Dashboard</Link>,
    key: '/',
  },
  {
    label: <Link to='/sheets'>Sheets</Link>,
    key: '/sheets',
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

interface pairStreamInterface {
  leftPairWS: WebSocket;
  leftTicker: string;
  leftTickerColor: string;
  leftBgColor: string;
  
  rightPairWS: WebSocket;
  rightTicker: string;
  rightTickerColor: string;
  rightBgColor: string;
}

const Layout: React.FC = () => {

  // Stream pair initial configuration
  const initialLeftPairWS = new WebSocket("wss://stream.binance.com:9443/ws");
  const initialRightPairWS = new WebSocket("wss://stream.binance.com:9443/ws");

  const [leftPairWS, setLeftWS] = useState<WebSocket>(initialLeftPairWS);
  const [leftTicker, setLeftTicker] = useState<string>('btcusdt');
  const [leftTickerColor, setLeftTickerColor] = useState<string>('#F2A900');
  const [leftBgColor, setLeftBgColor] = useState<string>(appColors.dark);

  const [rightPairWS, setRightWS] = useState<WebSocket>(initialRightPairWS);
  const [rightTicker, setRightTicker] = useState<string>('ethusdt');
  const [rightTickerColor, setRightTickerColor] = useState<string>('#ecf0f1');
  const [rightBgColor, setRightBgColor] = useState<string>(appColors.dark);

  const [OPCODE, setOPCODE] = useState<string>('');

  let pairStreamHoldings: pairStreamInterface = {
    leftPairWS,
    leftTicker,
    leftTickerColor,
    leftBgColor,

    rightPairWS,
    rightTicker,
    rightTickerColor,
    rightBgColor
  };

  useEffect(() => {
    switch(OPCODE){
      case 'SETLEFTPAIR':
        pairStreamHoldings.leftPairWS = leftPairWS;
        pairStreamHoldings.leftTicker = leftTicker;
        break;
      case 'SETRIGHTPAIR':
        pairStreamHoldings.rightPairWS = rightPairWS;
        pairStreamHoldings.rightTicker = rightTicker;
    }

  }, [OPCODE])

  // Layout configuration
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  // Display configuration
  return (
    <div>
      <Row style={{height: '5vh'}}>
        <Col span={18}>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </Col>
        <Col span={3} style={flexContainer}>
          <PairStream pair={pairStreamHoldings.leftTicker} id={1} ws={pairStreamHoldings.leftPairWS} tickerStyle={pairStyle(pairStreamHoldings.leftTickerColor)} />
        </Col>
        <Col span={3} style={flexContainer}>
          <PairStream pair={pairStreamHoldings.rightTicker} id={2} ws={pairStreamHoldings.rightPairWS} tickerStyle={pairStyle(pairStreamHoldings.rightTickerColor)} />
        </Col>  
      </Row>
      
      <Outlet context={
        {
          setWebSockets,
        }
      }
      />
    </div>
  )
};

export default Layout;
