import React from 'react';
import { useEffect, useState } from 'react'
import { Card, ConfigProvider } from 'antd';
import  './SectionCard'
// import axios from "axios";

const style: React.CSSProperties = {
  background: '#32cd32',
}

const SectionCard: React.FC = () => {
  const [Ticker24hData, setTicker24hData] = useState([]);

  useEffect(() => {
      fetch("https://api.binance.com/api/v3/ticker/24hr?symbol=RNDRUSDT", {
        method: "GET" // default, so we can ignore
      })
      .then((response) => response.json())
      .then((data) => {
        setTicker24hData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
 }, []);

  return (<ConfigProvider
    theme={{
      components: {
        Card: {
          colorBorderSecondary: '#fff',
        },
      },
    }}
  >
    <Card
    bordered={false}>
      <Card.Grid style={style}>
        <>
        {Ticker24hData && <p>{Ticker24hData['symbol']}</p>}
        </>
        <Card.Meta 
          description={'+2.0%'}
          style={{color: 'black'}}></Card.Meta>
      </Card.Grid>
      <Card.Grid style={style}>Content</Card.Grid>
      <Card.Grid style={style}>Content</Card.Grid>
      <Card.Grid style={style}>Content</Card.Grid>
      <Card.Grid style={style}>Content</Card.Grid>
      <Card.Grid style={style}>Content</Card.Grid>
    </Card>
  </ConfigProvider>
)};

export default SectionCard;