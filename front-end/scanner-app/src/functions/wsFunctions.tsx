import stream24hDataPropsInterface from "../interfaces/data/stream24hData";

export function wsSubscribe(
        pair: string,
        ws: WebSocket, 
        id: number,
        setConnectionState: React.Dispatch<React.SetStateAction<boolean>>
    ): void{
        
    ws.addEventListener("open", (e) => {
        setConnectionState(true);

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

export function wsUnsubscribe(
        ws: WebSocket, 
        id: number, 
        setConnectionState: React.Dispatch<React.SetStateAction<boolean>>
    ){

    if (ws.readyState === 1) {
        ws.send(
            JSON.stringify(
                {
                    method: "UNSUBSCRIBE",
                    id
                }
            )
        );

        ws.addEventListener("close", (e) => {
            setConnectionState(false);
        });

        ws.close();
    }
};

export function wsConnectionMechanics(
        ws: WebSocket,
        pair: string,
        id: number,
        setData: React.Dispatch<React.SetStateAction<stream24hDataPropsInterface>>,
        setConnectionState: React.Dispatch<React.SetStateAction<boolean>>
    ){

    wsSubscribe(pair, ws, id, setConnectionState);

    ws.addEventListener("message", (e) => {
        if(!e.data.includes("id")){
            let parsed = JSON.parse(e.data);
            setData(parsed);
        }
    });
};

export function wsReFetch(
        ws: WebSocket,
        id: number,
        newPair: string
    ){

    if(ws.readyState == 1){
        ws.send(
            JSON.stringify(
                {
                    id,
                    method: "SUBSCRIBE",
                    params: [
                    `${newPair}@ticker`
                    ]
                }
            )
        );

        ws.addEventListener("message", (e) => {
            ws.send(
                JSON.stringify(
                    {
                        id,
                        method: "UNSUBSCRIBE",
                        params: [
                        `eth@ticker`
                        ]
                    }
                )
            )
        })
    }
}