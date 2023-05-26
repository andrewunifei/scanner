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