import pairStreamConfigInterface from "../data/pairStreamConfig";
import stream24hDataPropsInterface from "../data/stream24hData";

export default interface menuPairStreamPropsInterface{
  pair: string;
  id: number;
  ws: WebSocket;
  pairStyle: React.CSSProperties;
}