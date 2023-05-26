import React from 'react';
import { useEffect, useState } from 'react'
import { Card, ConfigProvider } from 'antd';
import  './SectionCard'
// import { Tickers24hData, Ticker24hData } from '../interfaces/Ticker24hData';
import stream24hData from '../interfaces/stream24hData';

const style: React.CSSProperties = {
  background: '#32cd32',
}

type Props = {
  data: stream24hData
}

const SectionCard: React.FC<Props> = (props: Props) => {
  // const initialState: Ticker24hData[] = [];
  // const [data24h, setData24h] = useState(initialState);

//   useEffect(() => {
//     fetch("https://api.binance.com/api/v3/ticker/24hr", {
//       method: "GET"
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       let filtered_tickers: string[] = [];
//       let tickers: [] = data.map((object: Ticker24hData): string => {
//         return object.symbol
//       })

//       filtered_tickers = tickers.filter((ticker: string): boolean => ticker.includes('USDT'))

//       // Retorna apenas os pares USDT
//       // com a string propriamente formatada para requisição subsequente
//       return [filtered_tickers.map(pair => {
//         return "\"" + pair + "\""
//       })];      
//     })
//     .then(filteredTickers => {
//       fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=[${filteredTickers}]`, {
//         method: "GET"
//       })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data)
//         setData24h(data);
//       })
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
//  }, []);

  return (<ConfigProvider
    theme={{
      components: {
        Card: {
          colorBorderSecondary: '#fff',
        },
      },
    }}
  >
    <Card bordered={false}>
      {[...Array(2).keys()].map(index => {
          return (
            <Card.Grid style={style}>
              {props.data.s}
              <Card.Meta
                description={props.data.c}
              />
            </Card.Grid>
          )
        }
      )};
    </Card>
  </ConfigProvider>
)};

export default SectionCard;