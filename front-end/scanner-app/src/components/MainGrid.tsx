import React, { useEffect, useState } from 'react'
import { Col, Divider, Row, ConfigProvider, Button } from 'antd';
import SectionCard from './SectionCard';
import stream24hDataPropsInterface from '../interfaces/stream24hData';
import { wsSubscribeTicker } from '../functions/wsFunctions';
import Unsubscribe from './Unsubscribe';
import dummyTickerObject from '../misc/dummyTickerObject';

const style: React.CSSProperties = { };
const style2: React.CSSProperties = { margin: '2em', padding: '2em', background: '#282c34'};
const wsBTC = new WebSocket("wss://stream.binance.com:9443/ws");
const wsETH = new WebSocket("wss://stream.binance.com:9443/ws");
const wsPackage: WebSocket[] = [wsBTC, wsETH];

const MainGrid: React.FC = () => {

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

      // Connection opened to get BTC data
      wsSubscribeTicker("btcusdt", wsBTC, 1);
      wsSubscribeTicker("ethusdt", wsETH, 2);

      // Listen for messages
      wsBTC.addEventListener("message", (e) => {
        if(!e.data.includes("id")){
          console.log(JSON.parse(e.data));
          setBTCData(JSON.parse(e.data));
        }
      });

      wsETH.addEventListener("message", (e) => {
        if(!e.data.includes("id")){
          console.log(JSON.parse(e.data));
          setETHData(JSON.parse(e.data));
        }
      });
      
      wsBTC.onopen = (e) => {
        flag[0] = 1
        if(flag[0] === 1 && flag[1] === 1){
          setButtonState(false);
        }
      }

      wsETH.onopen = (e) => {
        flag[1] = 1
        if(flag[0] === 1 && flag[1] === 1){
          setButtonState(false);
        }
      }
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
