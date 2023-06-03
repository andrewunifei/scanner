import React, { useEffect, useState } from 'react';
import { PieChartTwoTone, SettingTwoTone } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { appColors } from '../colors';
import { Outlet, Link, useLocation, useOutletContext } from "react-router-dom";
import { Col, Row } from 'antd';
import PairStream from '../components/PairStream';
import { pairStyle } from '../css/MenuPairStreamStyle';

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
  leftPair: string;
  leftPairColor: string;
  leftPairBgColor: string;
  leftConnectionState: boolean;
  leftOPTION: string;
  
  rightPairWS: WebSocket;
  rightPair: string;
  rightPairColor: string;
  rightPairBgColor: string;
  rightConnectionState: boolean;
  rightOPTION: string
}

const Layout: React.FC = () => {

  // Stream pair initial configuration
  const initialLeftPairWS = new WebSocket("wss://stream.binance.com:9443/ws");
  const initialRightPairWS = new WebSocket("wss://stream.binance.com:9443/ws");

  const [leftPairWS, setLeftWS] = useState<WebSocket>(initialLeftPairWS);
  const [leftPair, setLeftPair] = useState<string>('btcusdt');
  const [leftPairColor, setLeftPairColor] = useState<string>('#F2A900');
  const [leftPairBgColor, setLeftBgColor] = useState<string>(appColors.dark);
  const [leftConnectionState, setLeftConnectionState] = useState<boolean>(false);

  const [rightPairWS, setRightWS] = useState<WebSocket>(initialRightPairWS);
  const [rightPair, setRightPair] = useState<string>('ethusdt');
  const [rightPairColor, setRightPairColor] = useState<string>('#ecf0f1');
  const [rightPairBgColor, setRightBgColor] = useState<string>(appColors.dark);
  const [rightConnectionState, setRightConnectionState] = useState<boolean>(false);

  const [OPCODE, setOPCODE] = useState<string>('');
  const [closeAccess, setCloseAccess] = useState<boolean>(false);

  let pairStreamHoldings: pairStreamInterface = {
    leftPairWS,
    leftPair,
    leftPairColor,
    leftPairBgColor,
    leftConnectionState,
    leftOPTION: 'INITIALRENDER',

    rightPairWS,
    rightPair,
    rightPairColor,
    rightPairBgColor,
    rightConnectionState,
    rightOPTION: 'INITIALRENDER'
  };

  useEffect(() => {
    switch(OPCODE){
      // Left pair
      case 'SETLEFTPAIR':
        pairStreamHoldings.leftPairWS = leftPairWS;
        pairStreamHoldings.leftPair = leftPair;
        break;
        
      case 'SETLEFTPAIRCOLOR':
        pairStreamHoldings.leftPairColor = leftPairColor;
        break;
      
      case 'SETLEFTPAIRBGCOLOR':
        pairStreamHoldings.leftPairBgColor = leftPairBgColor;
        break;

      // Right pair
      case 'SETRIGHTPAIR':
        pairStreamHoldings.rightPairWS = rightPairWS;
        pairStreamHoldings.rightPair = rightPair;
        break;

      case 'SETRIGHTPAIRCOLOR':
        pairStreamHoldings.rightPairColor = rightPairColor;
        break;

      case 'SETRIGHTPAIRBGCOLOR':
        pairStreamHoldings.rightPairBgColor = rightPairBgColor;
        break;

      case 'CLOSEACCESS':
        if(closeAccess && 
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
          <PairStream 
            pair={pairStreamHoldings.leftPair} 
            id={1} ws={pairStreamHoldings.leftPairWS} 
            pairStyle={pairStyle(pairStreamHoldings.leftPairColor)}
            connectionState={leftConnectionState}
            setConnectionState={setLeftConnectionState} 
            setCloseAccess={setCloseAccess}
            setOPCODE={setOPCODE}
            OPTION={pairStreamHoldings.leftOPTION}
          />
        </Col>
        <Col span={3} style={flexContainer}>
          <PairStream 
            pair={pairStreamHoldings.rightPair} 
            id={2} ws={pairStreamHoldings.rightPairWS} 
            pairStyle={pairStyle(pairStreamHoldings.rightPairColor)}
            connectionState={rightConnectionState}
            setConnectionState={setRightConnectionState} 
            setCloseAccess={setCloseAccess}
            setOPCODE={setOPCODE}
            OPTION={pairStreamHoldings.rightOPTION}
          />
        </Col>  
      </Row>
      
      <Outlet context={{
          left: {
            leftPairWS,
            setLeftWS,
            setLeftPair,
            setLeftPairColor,
            setLeftBgColor,
            setLeftConnectionState
          },

          right: {
            rightPairWS,
            setRightWS,
            setRightPair,
            setRightPairColor,
            setRightBgColor,
            setRightConnectionState
          },

          setOPCODE
        }}
      />
    </div>
  )
};

export default Layout;
