import pairStreamConfigInterface from "../data/pairStreamConfig";
import stream24hDataPropsInterface from "../data/stream24hData";

export default interface menuPairStreamPropsInterface{
  pair: string;
  id: number;
  ws: WebSocket;
  tickerStyle: React.CSSProperties;
  data: stream24hDataPropsInterface;
  setData: React.Dispatch<React.SetStateAction<stream24hDataPropsInterface>>;
  buttonState: boolean
  setButtonState: React.Dispatch<React.SetStateAction<boolean>>;
  connectionState: boolean;
  setConnectionState: React.Dispatch<React.SetStateAction<boolean>>;
}