import React from "react";

export default interface unsubscribePropsInterface {
    ws: WebSocket;
    id: number;
    buttonState: boolean;
    SetConnectionState: React.Dispatch<React.SetStateAction<boolean>>;
}