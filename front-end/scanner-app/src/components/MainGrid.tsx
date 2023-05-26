import React, { useEffect, useState } from 'react'
import { Col, Divider, Row, ConfigProvider, Button } from 'antd';
import SectionCard from './SectionCard';
import { Tickers24hData, Ticker24hData } from '../interfaces/Ticker24hData';
import stream24hData from '../interfaces/stream24hData';

const style: React.CSSProperties = { };
const style2: React.CSSProperties = { margin: '2em', padding: '2em', background: '#282c34'};
const ws = new WebSocket("wss://stream.binance.com:9443/ws");
// const ws = new WebSocket("wss://ws-api.binance.com:443/ws-api/v3");

function filterData(data: stream24hData[]): stream24hData[]{
  let filteredData: stream24hData[];
  
  filteredData = data.filter((object: stream24hData): boolean => object.s.includes('USDT'));

  return filteredData
}

const MainGrid: React.FC = () => {
  // const initialState: Ticker24hData[] = [];
  const dataInterface: stream24hData[] = [];
  // const [data24h, setData24h] = useState(initialState);

  const [closed, setClosed] = useState(true);
  const [data, setData] = useState(dataInterface);

  useEffect(() => {
    // Connection opened
    console.log('hmm')
    ws.addEventListener("open", (event) => {
      ws.send(
        JSON.stringify(
          {
            method: "SET_PROPERTY",
            params: [
              "combined",
              true
            ],
            id: 1
          }
        )
      );
      ws.send(
        JSON.stringify(
          {
            id: 2,
            method: "SUBSCRIBE",
            params: [
              "btcusdt@ticker",
              "ethusdt@ticker"
            ]
          }
        )
      );
    });

    // Listen for messages
    ws.addEventListener("message", (e) => {
      console.log(JSON.parse(e.data));
      // let parsedData = JSON.parse(e.data).s
      // parsedData.s == "BTCUSDT" ? console.log(parsedData): console.log(typeof parsedData);
     // setData(JSON.parse(e.data));
    });
    
    ws.onopen = (e) => {
      setClosed(false);
    }
  }, []);

  function unsubscribe(){
    console.log(ws.readyState);
    if (ws.readyState === 1) {
      ws.send(
        JSON.stringify(
          {
            method: "UNSUBSCRIBE",
            id: 1
          }
        )
      );

      ws.close();

      ws.onclose = () => {
        console.log("Connection closed.");
        setClosed(true);
      };
    }
  };

  function resendRequest(){
    ws.send(
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
      {/* <SectionCard data={data} /> */}
      <Button type="primary" disabled={closed} onClick={unsubscribe}>Close connection</Button>
      <Button type="primary" onClick={resendRequest}>Resend request</Button>
    </ConfigProvider>
    {/* <p style={{color: 'white'}}>{data.s}</p> */}
  </div>
)};

export default MainGrid;
