import React, { useEffect, useState } from 'react'
import { Col, Divider, Row, ConfigProvider, Button } from 'antd';
import SectionCard from './SectionCard';
import stream24hDataPropsInterface from '../interfaces/stream24hData';
import { wsSubscribeTicker } from '../functions/wsFunctions';
import Unsubscribe from './Unsubscribe';
import dummyTickerObject from '../misc/dummyTickerObject';
import { wsBTCETHConnectionMechanics } from '../functions/wsFunctions';

const style: React.CSSProperties = { };
const style2: React.CSSProperties = { margin: '2em', padding: '2em', background: '#282c34'};
const wsBTC = new WebSocket("wss://stream.binance.com:9443/ws");
const wsETH = new WebSocket("wss://stream.binance.com:9443/ws");
const wsPackage: WebSocket[] = [wsBTC, wsETH];

interface propsInterface{
  setData: React.Dispatch<React.SetStateAction<stream24hDataPropsInterface>>;
}

const MainGrid: React.FC<propsInterface> = ({ setData }: propsInterface) => {

  const [didMount, setDidMount] = useState(true);
  const [buttonState, setButtonState] = useState(true);
  const [connectionState, setConnectionState] = useState(true);
  const [BTCData, setBTCData] = useState<stream24hDataPropsInterface>(dummyTickerObject);
  const [ETHData, setETHData] = useState<stream24hDataPropsInterface>(dummyTickerObject);
  const dataPackage: stream24hDataPropsInterface[] = [BTCData, ETHData];

  let flag = [0, 0];

  useEffect(() => {
    if(didMount){
      setDidMount(false)

      wsBTCETHConnectionMechanics(wsBTC, wsETH, setBTCData, setETHData, setButtonState, setData);
    }
    else{
      setButtonState(true)
    }
  }, [connectionState]);

  return (
  <div style={style2}>
    <ConfigProvider
      theme={{
        components: {
          Divider: {
            lineWidth: 2,
            colorSplit: '#fff',
            colorTextHeading: '#fff',
          },
        },
      }}
    >
      <Divider orientation="left">Top movers</Divider>
      <SectionCard tickersData={dataPackage} numberOfGridCard={2} />
      <Unsubscribe wsPackage={wsPackage} buttonState={buttonState} SetConnectionState={setConnectionState} />
    </ConfigProvider>
  </div>
)};

export default MainGrid;
