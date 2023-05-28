export default interface menuPairStreamProps{
  pair: string;
  id: number;
  ws: WebSocket;
  tickerStyle: React.CSSProperties
}