import React, { useState } from 'react'
import { wsUnsubscribeTicker } from '../functions/wsFunctions';
import { Button } from 'antd';
import unsubscribePropsInterface from '../interfaces/unsubscribeProps'

function Unsubscribe({ wsPackage, buttonState }: unsubscribePropsInterface) {
    let handleClick = () => {
        wsUnsubscribeTicker(wsPackage[0], wsPackage[1]);
    }

    return(
        <Button disabled={buttonState} type="primary" onClick={handleClick}>Close connection</Button>
    )
} 

export default Unsubscribe;