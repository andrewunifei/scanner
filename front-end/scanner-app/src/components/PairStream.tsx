import React, { useEffect, useState } from 'react'
import dummyPairObject from '../misc/dummyPairObject';
import { wsConnectionMechanics } from '../functions/wsFunctions';
import { Triangle } from  'react-loader-spinner'
import menuPairStreamPropsInterface from '../interfaces/props/menuPairStreamProps';
import stream24hDataPropsInterface from '../interfaces/data/stream24hData';

const PairStream: React.FC<menuPairStreamPropsInterface> = (
  { 
    pair, 
    id, 
    ws, 
    pairStyle,
    connectionState, 
    WSUpdateFlag,
    setConnectionState
  }: menuPairStreamPropsInterface) => {

  // Customization
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

  // Initialization
  const [data, setData] = useState<stream24hDataPropsInterface>(dummyPairObject);
  const [open, setOpen] = useState<boolean>(true)

  useEffect(() => {
    if(open){
      setOpen(false);
      wsConnectionMechanics(ws, pair, id, setData, setConnectionState);
    }
    else if(!WSUpdateFlag){
        data.P.includes('-') ? setTextColor('#eb4034') : setTextColor('#90ee90');
    }

    if(WSUpdateFlag){
      wsConnectionMechanics(ws, pair, id, setData, setConnectionState);
    }
  }, [data, ws]);

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
          <span style={pairStyle}>{data.s}</span>
          <span style={timeframeStyle}> 24h</span>
          <br></br>
          {/* <span style={priceStyle}>{data.c.slice(0, -6) + ' | '}</span>
          <span style={priceStyle}>{data.P.slice(0, -1) + '%'}</span> */}
          <span style={priceStyle}>{data.c + ' | '}</span>
          <span style={priceStyle}>{data.P + '%'}</span>
        </div>
      }
    </div>
  )
};

export default PairStream;
