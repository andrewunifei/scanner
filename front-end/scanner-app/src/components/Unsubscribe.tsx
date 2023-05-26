import React, { useState } from 'react'
import { wsUnsubscribeTicker } from '../functions/wsFunctions';
import { Button } from 'antd';
import unsubscribePropsInterface from '../interfaces/unsubscribeProps'

function Unsubscribe({ wsPackage, buttonState, SetConnectionState }: unsubscribePropsInterface) {
    let handleClick = () => {
        wsUnsubscribeTicker(wsPackage[0], wsPackage[1]);
        SetConnectionState(false);

        console.log('Connection closed.')
    }

    return(
        <Button disabled={buttonState} type="primary" onClick={handleClick}>Close connection</Button>
    )
} 

export default Unsubscribe;