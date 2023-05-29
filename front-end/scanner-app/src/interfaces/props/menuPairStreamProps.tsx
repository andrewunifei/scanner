export default interface menuPairStreamPropsInterface{
  pair: string;
  id: number;
  ws: WebSocket;
  tickerStyle: React.CSSProperties;
  pairDidUpdate: boolean;
  setPairDidUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}