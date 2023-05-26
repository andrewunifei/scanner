import React from 'react';

// const initialState: Ticker24hData[] = [];
// const [data24h, setData24h] = useState(initialState);

//   useEffect(() => {
//     fetch("https://api.binance.com/api/v3/ticker/24hr", {
//       method: "GET"
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       let filtered_tickers: string[] = [];
//       let tickers: [] = data.map((object: Ticker24hData): string => {
//         return object.symbol
//       })

//       filtered_tickers = tickers.filter((ticker: string): boolean => ticker.includes('USDT'))

//       // Retorna apenas os pares USDT
//       // com a string propriamente formatada para requisição subsequente
//       return [filtered_tickers.map(pair => {
//         return "\"" + pair + "\""
//       })];      
//     })
//     .then(filteredTickers => {
//       fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=[${filteredTickers}]`, {
//         method: "GET"
//       })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data)
//         setData24h(data);
//       })
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
//  }, []);