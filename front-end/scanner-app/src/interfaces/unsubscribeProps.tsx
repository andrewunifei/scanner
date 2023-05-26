import React from "react";

export default interface unsubscribePropsInterface {
    wsPackage: WebSocket[];
    buttonState: boolean;
    SetConnectionState: React.Dispatch<React.SetStateAction<boolean>>;
}