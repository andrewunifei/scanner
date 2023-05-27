import React, { useEffect, useState } from 'react'
import stream24hDataPropsInterface from '../interfaces/stream24hData';
import Unsubscribe from './Unsubscribe';
import dummyTickerObject from '../misc/dummyTickerObject';
import { wsConnectionMechanics } from '../functions/wsFunctions';

interface propsInterface{
  pair: string;
  id: number;
  ws: WebSocket;
  tickerStyle: React.CSSProperties
}

const MainGrid: React.FC<propsInterface> = ({ pair, id, ws, tickerStyle }: propsInterface) => {

  const [didMount, setDidMount] = useState(true);
  const [buttonState, setButtonState] = useState(true);
  const [connectionState, setConnectionState] = useState(true);
  const [data, setData] = useState<stream24hDataPropsInterface>(dummyTickerObject);
  const [textColor, setTextColor] = useState<string>('');

  const priceStyle: React.CSSProperties = {
    fontSize: '12px',
    color: textColor,
    whiteSpace: "nowrap"
  }

  const timeframeStyle: React.CSSProperties = {
    color: '#fff',
    fontSize: '12px',
    whiteSpace: "nowrap"
  }

  useEffect(() => {
    if(didMount){
      setDidMount(false)

      wsConnectionMechanics(ws, pair, id, setData, setButtonState);
    }
    else{
      data.P.includes('-') ? setTextColor('#eb4034') : setTextColor('#90ee90');
      setButtonState(true)
    }
  }, [data]);

  return (
    <div>
      <span style={tickerStyle}>{data.s}</span>
      <span style={timeframeStyle}> 24h</span>
      <br></br>
      <span style={priceStyle}>{data.c.slice(0, -6) + ' | '}</span>
      <span style={priceStyle}>{data.P.slice(0, -1) + '%'}</span>
    </div>
  )
};

export default MainGrid;
