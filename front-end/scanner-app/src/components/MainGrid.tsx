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

// const dataInterface: stream24hDataPropsInterface;
// const ws = new WebSocket("wss://ws-api.binance.com:443/ws-api/v3");

function filterData(data: stream24hDataPropsInterface[]): stream24hDataPropsInterface[]{
  let filteredData: stream24hDataPropsInterface[];
  
  filteredData = data.filter((object: stream24hDataPropsInterface): boolean => object.s.includes('USDT'));

  return filteredData
}

const MainGrid: React.FC = () => {

  const [didMount, setDidMount] = useState(true);
  const [buttonState, setButtonState] = useState(true);
  const [connectionState, setConnectionState] = useState(true);
  const [BTCdata, setBTCData] = useState<stream24hDataPropsInterface>(dummyTickerObject);
  const [ETHdata, setETHData] = useState<stream24hDataPropsInterface>(dummyTickerObject);

  let flag = [0, 0];

  useEffect(() => {
    if(didMount){
      setDidMount(false)

      // Connection opened to get BTC data
      wsSubscribeTicker("btcusdt", wsBTC, 1);
      wsSubscribeTicker("ethusdt", wsETH, 2);

      // Listen for messages
      wsBTC.addEventListener("message", (e) => {
        console.log(JSON.parse(e.data));
        setBTCData(JSON.parse(e.data));
      });

      wsETH.addEventListener("message", (e) => {
        console.log(JSON.parse(e.data));
        setETHData(JSON.parse(e.data));
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

  function resendRequest(){
    wsBTC.send(
      JSON.stringify(
        {
          id: "2",
          method: "ticker.24hr",
          params: {
            symbol: "BTCUSDT"
          }
        }
      )
    );
  }

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
      <SectionCard BTCdata={BTCdata} ETHdata={ETHdata} />
      <Unsubscribe wsPackage={wsPackage} buttonState={buttonState} SetConnectionState={setConnectionState} />
      <Button type="primary" onClick={resendRequest}>Resend request</Button>
    </ConfigProvider>
    {/* <p style={{color: 'white'}}>{data.s}</p> */}
  </div>
)};

export default MainGrid;
