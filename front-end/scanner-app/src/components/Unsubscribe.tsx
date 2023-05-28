import { wsUnsubscribe } from '../functions/wsFunctions';
import { Button } from 'antd';
import unsubscribePropsInterface from '../interfaces/props/unsubscribeProps'

function Unsubscribe({ws, id, buttonState, SetConnectionState }: unsubscribePropsInterface) {
    let handleClick = () => {
        wsUnsubscribe(ws, id);
        SetConnectionState(false);

        console.log('Connection closed.')
    }

    return(
        <Button disabled={buttonState} type="primary" onClick={handleClick}>Close connection</Button>
    )
} 

export default Unsubscribe;