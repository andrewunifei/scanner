import React, { useEffect, useState } from 'react'
import { Col, Divider, Row, ConfigProvider, Button } from 'antd';
import SectionCard from './SectionCard';
import { Tickers24hData, Ticker24hData } from '../interfaces/Ticker24hData';

const style: React.CSSProperties = { };
const style2: React.CSSProperties = { margin: '2em', padding: '2em', background: '#282c34'};
const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker");

const MainGrid: React.FC = () => {
  const initialState: Ticker24hData[] = [];
  const [data24h, setData24h] = useState(initialState);

  const [opened, setOpened] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    // Connection opened
    ws.onopen = () => {
      ws.send(
        JSON.stringify(
          {
            method: "SUBSCRIBE",
            params:
            [
            "btcusdt@ticker"
            ],
            id: 1
          }
        )
      );
    };

    // Listen for messages
    ws.addEventListener("message", (e) => {
      setData(e.data);
    });
    
    ws.onopen = (e) => {
      setOpened(false);
    }
  }, []);

  function unsubscribe(){
    if (ws.readyState === 1) {
      ws.send(
        JSON.stringify(
          {
            method: "UNSUBSCRIBE",
            params:
            [
              "btcusdt@ticker"
            ],
            id: 1
          }
        )
      );

      ws.close();

      ws.onclose = () => {
        setData("Connection closed.");
      };
    }
  };

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
      {/* <SectionCard /> */}
      <Button disabled={opened} onClick={unsubscribe}>Close connection</Button>
    </ConfigProvider>
    <p style={{color: 'white'}}>{JSON.stringify(data)}</p>
  </div>
)};

export default MainGrid;
