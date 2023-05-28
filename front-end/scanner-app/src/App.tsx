import './App.css';
import HorizontalMenu from './components/HorizontalMenu';
import MenuPairStream from './components/MenuPairStream';
import { Col, Row } from 'antd';

const leftPairWS = new WebSocket("wss://stream.binance.com:9443/ws");
const rightPairWS = new WebSocket("wss://stream.binance.com:9443/ws");

const leftPairStyle: React.CSSProperties = {
  color: '#F2A900', 
  fontWeight: 'bold',
  whiteSpace: "nowrap"
}

const rightPairStyle: React.CSSProperties = {
  color: '#ecf0f1',
  fontWeight: 'bold',
  whiteSpace: "nowrap"
}

const flexContainer: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

// Nós podemos abrir a possibilidade para outros tickers
// enviando dados de outro componente de entrada de dados para esse aqui
// e alterando os valores dos pares 
// possibilitando mais flexibilidade de costumização no front-end
const rightPair = 'ethusdt';
const leftPair = 'btcusdt';

function App() {
  return (
    <div className="App">
      <Row>
        <Col span={18}>
         <HorizontalMenu />
        </Col>
        <Col span={3} style={flexContainer}>
          <MenuPairStream pair={leftPair} id={2} ws={leftPairWS} tickerStyle={leftPairStyle} />
        </Col>
        <Col span={3} style={flexContainer}>
          <MenuPairStream pair={rightPair} id={1} ws={rightPairWS} tickerStyle={rightPairStyle} />
        </Col>  
      </Row>
    </div>
  );
}

export default App;