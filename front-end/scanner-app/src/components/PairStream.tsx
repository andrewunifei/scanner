import React, { useEffect, useState } from 'react'
import Unsubscribe from './Unsubscribe';
import dummyTickerObject from '../misc/dummyTickerObject';
import { wsConnectionMechanics } from '../functions/wsFunctions';
import { Triangle } from  'react-loader-spinner'
import menuPairStreamPropsInterface from '../interfaces/menuPairStreamPropsInterface';
import stream24hDataPropsInterface from '../interfaces/stream24hData';

const PairStream: React.FC<menuPairStreamPropsInterface> = ({ pair, id, ws, tickerStyle }: menuPairStreamPropsInterface) => {

  const [didMount, setDidMount] = useState(true);
  const [buttonState, setButtonState] = useState(true);
  const [connectionState, setConnectionState] = useState(false);
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

      wsConnectionMechanics(ws, pair, id, setData, setButtonState, setConnectionState);
    }
    else{
      data.P.includes('-') ? setTextColor('#eb4034') : setTextColor('#90ee90');
      setButtonState(true)
    }
  }, [data]);

  return (
    <div>
      {
        !connectionState &&
        <Triangle
          height="30"
          width="30"
          color="#fff"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      }
      {
        connectionState &&
        <div>
          <span style={tickerStyle}>{data.s}</span>
          <span style={timeframeStyle}> 24h</span>
          <br></br>
          <span style={priceStyle}>{data.c.slice(0, -6) + ' | '}</span>
          <span style={priceStyle}>{data.P.slice(0, -1) + '%'}</span>
        </div>
      }
    </div>
  )
};

export default PairStream;