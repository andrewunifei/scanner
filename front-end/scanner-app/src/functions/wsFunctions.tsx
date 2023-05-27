import stream24hDataPropsInterface from "../interfaces/stream24hData";

export function wsSubscribePair(pair: string, ws: WebSocket, id: number): void{
    ws.addEventListener("open", (e) => {
        ws.send(
            JSON.stringify(
                {
                    id,
                    method: "SUBSCRIBE",
                    params: [
                    `${pair}@ticker`
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

export function wsConnectionMechanics(
    ws: WebSocket,
    pair: string,
    id: number,
    setData: React.Dispatch<React.SetStateAction<stream24hDataPropsInterface>>,
    setButtonState: React.Dispatch<React.SetStateAction<boolean>>
    ){

    // Connection opened to get BTC data
    wsSubscribePair(pair, ws, id);

    // Listen for messages
    ws.addEventListener("message", (e) => {
    if(!e.data.includes("id")){
        let parsed = JSON.parse(e.data)
        // console.log(parsed);
        setData(parsed);
        setData(parsed);
    }
    });
    
    ws.onopen = (e) => {
        setButtonState(false);
    }
};
