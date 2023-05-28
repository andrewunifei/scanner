import stream24hDataPropsInterface from "../interfaces/stream24hData";

export function wsSubscribe(pair: string, ws: WebSocket, id: number): void{
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

export function wsUnsubscribe(ws: WebSocket, id: number){
    if (ws.readyState === 1) {
        ws.send(
            JSON.stringify(
                {
                    method: "UNSUBSCRIBE",
                    id
                }
            )
        );

        ws.close();
    }
};

export function wsConnectionMechanics(
        ws: WebSocket,
        pair: string,
        id: number,
        setData: React.Dispatch<React.SetStateAction<stream24hDataPropsInterface>>,
        setButtonState: React.Dispatch<React.SetStateAction<boolean>>
    ){

    wsSubscribe(pair, ws, id);

    ws.addEventListener("message", (e) => {
    if(!e.data.includes("id")){
        let parsed = JSON.parse(e.data)
        setData(parsed);
    }
    });
    
    ws.onopen = (e) => {
        setButtonState(false);
    }
};
