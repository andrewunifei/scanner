import stream24hDataPropsInterface from "../interfaces/stream24hData";

export function wsSubscribeTicker(ticker: string, ws: WebSocket, id: number): void{
    ws.addEventListener("open", (e) => {
        ws.send(
            JSON.stringify(
                {
                    id,
                    method: "SUBSCRIBE",
                    params: [
                    `${ticker}@ticker`
                    ]
                }
            )
        );
    });
}

export function wsUnsubscribeTicker(wsBTC: WebSocket, wsETH: WebSocket){
    if (wsBTC.readyState === 1 && wsETH.readyState === 1) {
        let ws = [wsBTC, wsETH];

        for(let i = 0; i < 2; i++){
            ws[i].send(
                JSON.stringify(
                    {
                        method: "UNSUBSCRIBE",
                        id: i + 1
                    }
                )
            );

            ws[i].close();
        }
    }
  };

  export function wsBTCETHConnectionMechanics(
    wsBTC: WebSocket,
    wsETH: WebSocket,
    setBTCData: React.Dispatch<React.SetStateAction<stream24hDataPropsInterface>>,
    setETHData: React.Dispatch<React.SetStateAction<stream24hDataPropsInterface>>,
    setButtonState: React.Dispatch<React.SetStateAction<boolean>>,
    setData: React.Dispatch<React.SetStateAction<stream24hDataPropsInterface>>
  ){
    let flag = [0, 0];
    // Connection opened to get BTC data
    wsSubscribeTicker("btcusdt", wsBTC, 1);
    wsSubscribeTicker("ethusdt", wsETH, 2);

    // Listen for messages
    wsBTC.addEventListener("message", (e) => {
    if(!e.data.includes("id")){
        let parsed = JSON.parse(e.data)
        console.log(parsed);
        setBTCData(parsed);
        setData(parsed);
    }
    });

    wsETH.addEventListener("message", (e) => {
    if(!e.data.includes("id")){
        console.log(JSON.parse(e.data));
        setETHData(JSON.parse(e.data));
    }
    });
    
    wsBTC.onopen = (e) => {
    flag[0] = 1
    if(flag[0] === 1 && flag[1] === 1){
        setButtonState(false);
    }
    }

    wsETH.onopen = (e) => {
    flag[1] = 1
    if(flag[0] === 1 && flag[1] === 1){
        setButtonState(false);
    }
    }
  }