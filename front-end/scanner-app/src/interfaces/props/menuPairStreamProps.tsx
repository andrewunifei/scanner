import pairStreamConfigInterface from "../data/pairStreamConfig";
import stream24hDataPropsInterface from "../data/stream24hData";

export default interface menuPairStreamPropsInterface{
  pair: string;
  id: number;
  ws: WebSocket;
  connectionState: boolean;
  setConnectionState: React.Dispatch<React.SetStateAction<boolean>>;
  pairStyle: React.CSSProperties;
}