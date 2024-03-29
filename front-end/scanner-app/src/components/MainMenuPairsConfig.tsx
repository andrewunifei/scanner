import React, { useState } from 'react'
import { Col, Row, Space, Divider, ConfigProvider } from 'antd'
import { useOutletContext } from 'react-router-dom';
import { wsUnsubscribe } from '../functions/wsFunctions';
import InputConfig from './InputConfig';

// Visual settings 
const style: React.CSSProperties = {
    color: '#000'
}

const style2: React.CSSProperties = {
    borderStyle: 'solid',
    borderWidth: '0px',
    borderColor: '#000',
    padding: '0'
}

// Configuration settings
interface configurationTools {
    left: {
        leftPairWS: WebSocket;
        setLeftWS: React.Dispatch<React.SetStateAction<WebSocket>>;
        setLeftPair: React.Dispatch<React.SetStateAction<string>>;
        setLeftPairColor: React.Dispatch<React.SetStateAction<string>>,
        setLeftBgColor: React.Dispatch<React.SetStateAction<string>>;
        setLeftConnectionState: React.Dispatch<React.SetStateAction<boolean>>;
        setLeftWSUpdateFlag: React.Dispatch<React.SetStateAction<boolean>>;
    },

    right: {
        rightPairWS: WebSocket;
        setRightWS: React.Dispatch<React.SetStateAction<WebSocket>>;
        setRightPair: React.Dispatch<React.SetStateAction<string>>;
        setRightPairColor: React.Dispatch<React.SetStateAction<string>>;
        setRightBgColor: React.Dispatch<React.SetStateAction<string>>;
        setRightConnectionState: React.Dispatch<React.SetStateAction<boolean>>;
        setRightWSUpdateFlag: React.Dispatch<React.SetStateAction<boolean>>;
    }
}

const MainMenuPairsConfig: React.FC = () => {

    const pairsPackage = useOutletContext<configurationTools>();

    const [leftCustom, setLeftCustom] = useState('')
    const [rightCustom, setRightCustom] = useState('')

    return (
    <div>
        <Space direction='vertical' size="middle" style={{ display: 'flex' }}>
            <Row>
                <Col span={24} style={style2}>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorSplit: '#000'
                            },
                        }}
                        >
                        <Divider plain orientation='left'>
                            <span style={style}>Set pairs</span>
                        </Divider>
                    </ConfigProvider>
                </Col>
            </Row>

                {/* setRightPairColor: React.Dispatch<React.SetStateAction<string>>;
                setRightBgColor: React.Dispatch<React.SetStateAction<string>>; */}
            <Row justify="center">
                <Col span={8} style={style2}>
                    <Space direction='vertical' size="middle" style={{ display: 'flex' }}>
                        <InputConfig 
                            title="Set left pair"
                            setVariable={pairsPackage.left.setLeftPair}
                            eventCallBack={() => {
                                pairsPackage.left.setLeftConnectionState(false);
                                wsUnsubscribe(pairsPackage.left.leftPairWS, 1); 

                                pairsPackage.left.setLeftWS(
                                    new WebSocket("wss://stream.binance.com:9443/ws")
                                );
                            }}
                            inputPlaceholder={"BTCUSDT"}
                        />

                        <InputConfig 
                            title="Set left pair color"
                            setVariable={setLeftCustom}
                            eventCallBack={() => {
                                pairsPackage.left.setLeftPairColor(leftCustom);
                            }}
                            inputPlaceholder={"#F2A900"}
                        />

                        <InputConfig 
                            title="Set left background color"
                            setVariable={setLeftCustom}
                            eventCallBack={() => {
                                pairsPackage.left.setLeftBgColor(leftCustom);
                            }}
                            inputPlaceholder={"#282C34"}
                        />
                    </Space>
                </Col>

                <Col span={8} style={style2}>
                <Space direction='vertical' size="middle" style={{ display: 'flex' }}>
                        <InputConfig 
                            title="Set right pair"
                            setVariable={pairsPackage.right.setRightPair}
                            eventCallBack={() => {
                                pairsPackage.right.setRightConnectionState(false);
                                wsUnsubscribe(pairsPackage.right.rightPairWS, 1); 

                                pairsPackage.right.setRightWS(
                                    new WebSocket("wss://stream.binance.com:9443/ws")
                                );
                            }}
                            inputPlaceholder={"ETHUSDT"}
                        />

                        <InputConfig 
                            title="Set right pair color"
                            setVariable={setRightCustom}
                            eventCallBack={() => {
                                pairsPackage.right.setRightPairColor(rightCustom);
                            }}
                            inputPlaceholder={"#ecf0f1"}
                        />

                        <InputConfig 
                            title="Set right background color"
                            setVariable={setRightCustom}
                            eventCallBack={() => {
                                pairsPackage.right.setRightBgColor(rightCustom);
                            }}
                            inputPlaceholder={"#282C34"}
                        />
                    </Space>
                </Col>
            </Row>
        </Space> 
    </div>
    )
}

export default MainMenuPairsConfig