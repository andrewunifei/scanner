import stream24hDataPropsInterface from './stream24hData';

export default interface pairStreamConfigInterface {
    setData: React.Dispatch<React.SetStateAction<stream24hDataPropsInterface>>,
    setButtonState: React.Dispatch<React.SetStateAction<boolean>> ,
    setConnectionState: React.Dispatch<React.SetStateAction<boolean>>
}