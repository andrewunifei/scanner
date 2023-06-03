import React, { useState, useEffect } from 'react'
import { Col, Row, Input, Space, Button, Divider, ConfigProvider } from 'antd'
import { ToolOutlined } from '@ant-design/icons';
import { useOutletContext } from 'react-router-dom';
import { wsConnectionMechanics, wsUnsubscribe } from '../functions/wsFunctions';

// Visual settings 
const style: React.CSSProperties = {
    color: '#1e1e1e'
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

    const [leftTicker, setLeftTicker] = useState('')
    const [rightTicker, setRightTicker] = useState('')

    return (
    <div>
        <Row>
            <Col span={24} style={style2}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorSplit: '#F5F5F5'
                        },
                    }}
                    >
                    <Divider plain orientation='left'>
                        <span style={style}>Set pairs</span>
                    </Divider>
                </ConfigProvider>
            </Col>


            <Col span={8} style={style2}>
                <Space direction="horizontal">
                    <span>Left pair</span>
                    <Input
                        placeholder="BTCUSDT"
                        onChange={e => pairsPackage.left.setLeftPair(e.target.value.toLowerCase())}
                    />
                    <Button 
                        style={{ width: 80 }}
                        onClick={e => {
                            pairsPackage.left.setLeftConnectionState(false);
                            
                            wsUnsubscribe(pairsPackage.left.leftPairWS, 2);

                            pairsPackage.left.setLeftWSUpdateFlag(true);        
                    
                            pairsPackage.left.setLeftWS(
                                new WebSocket("wss://stream.binance.com:9443/ws")
                            );
                        }}
                    >
                    <ToolOutlined />
                    </Button>
                </Space>
            </Col>
            <Col span={8} style={style2}>
                <Space direction="horizontal">
                    <span>Right pair</span>
                    <Input
                        placeholder="ETHUSDT"
                        onChange={e => pairsPackage.right.setRightPair(e.target.value.toLowerCase())}
                    /> 
                    <Button 
                        style={{ width: 80 }} 
                        onClick={e => {
                            pairsPackage.right.setRightConnectionState(false);
                            wsUnsubscribe(pairsPackage.right.rightPairWS, 2);

                            pairsPackage.right.setRightWSUpdateFlag(true);        
                    
                            pairsPackage.right.setRightWS(
                                new WebSocket("wss://stream.binance.com:9443/ws")
                            );
                        }}
                    >
                    <ToolOutlined />
                    </Button>
                </Space>
            </Col>
            <Col span={8} style={style2}></Col>
        </Row>
            
    </div>
    )
}

export default MainMenuPairsConfig