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

const assemblePair = (ticker: string, color: string, backgroundColor: string): pairProperties => {
  return ({
    ticker,
    color,
    backgroundColor
  })
}

const defaultLeftPair = assemblePair('btcusdt', '#F2A900', appColors.dark) 
const defaultRightPair = assemblePair('linausdt', '#ecf0f1', appColors.dark) 

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

    // Stream pair configuration //
    const [buttonState, setButtonState] = useState(true);
    const [connectionState, setConnectionState] = useState(false);
    const [data, setData] = useState<stream24hDataPropsInterface>(dummyTickerObject);
  
    const configurationFunctions: pairStreamConfigInterface = {
      setData,
      setButtonState, 
      setConnectionState
    }

    const [buttonState2, setButtonState2] = useState(true);
    const [connectionState2, setConnectionState2] = useState(false);
    const [data2, setData2] = useState<stream24hDataPropsInterface>(dummyTickerObject);
  
    const configurationFunctions2: pairStreamConfigInterface = {
      setData: setData2,
      setButtonState: setButtonState2, 
      setConnectionState: setConnectionState2
    }
    ////

  const [leftPairConfigs, setLeftPairConfigs] = useState<pairStreamConfigInterface>({
    setData,
    setButtonState,
    setConnectionState
  });
  const [rightPairConfigs, setRightPairConfigs] = useState<pairStreamConfigInterface>({
    setData: setData2,
    setButtonState: setButtonState2, 
    setConnectionState: setConnectionState2
  });

  return (
    <div>
      <Row style={{height: '5vh'}}>
        <Col span={18}>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </Col>
        <Col span={3} style={flexContainer}>
          <PairStream pair={leftPair} id={1} ws={leftPairWS} tickerStyle={pairStyle(tickerColor.leftTickerColor)} data={data} setData={setData} buttonState={buttonState} setButtonState={setButtonState} connectionState={connectionState} setConnectionState={setConnectionState} />
        </Col>
        <Col span={3} style={flexContainer}>
          <PairStream pair={rightPair} id={2} ws={rightPairWS} tickerStyle={pairStyle(tickerColor.rightTickerColor)} data={data2} setData={setData2} buttonState={buttonState2} setButtonState={setButtonState2} connectionState={connectionState2} setConnectionState={setConnectionState2} />
        </Col>  
      </Row>
      
      <Outlet context={
        {
          left: {
            leftPairConfigs,
            leftPairWS,
            id: 1
          },
          right: {
            rightPairConfigs,
            rightPairWS,
            id: 2
          }
        }}
      />
    </div>
  )
};

export default Layout;
