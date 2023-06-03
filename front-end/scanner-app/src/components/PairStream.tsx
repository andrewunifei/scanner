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
    setConnectionState,
    setCloseAccess,
    setOPCODE,
    OPTION
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

  useEffect(() => {
    switch(OPTION){
      case 'CONNECTION':
        setCloseAccess([true, id]);
        setOPCODE('CLOSEACCESS');

        wsConnectionMechanics(ws, pair, id, setData, setConnectionState);
        break;

      default:
        data.P.includes('-') ? setTextColor('#eb4034') : setTextColor('#90ee90');
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
