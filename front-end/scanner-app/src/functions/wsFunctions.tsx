import stream24hDataPropsInterface from "../interfaces/data/stream24hData";

export function wsUnsubscribe(
        ws: WebSocket, 
        id: number
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

    console.log('bbbb')

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

    ws.addEventListener("message", (e) => {
        console.log('help')
        if(!e.data.includes("id")){
            let parsed = JSON.parse(e.data);
            setData(parsed);
            setConnectionState(true);
        }
    });
};