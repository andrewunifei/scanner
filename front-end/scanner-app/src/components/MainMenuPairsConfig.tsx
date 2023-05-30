import React, { useState } from 'react'
import { Col, Row, Input, Space, Button, Divider, ConfigProvider } from 'antd'
import { ToolOutlined } from '@ant-design/icons';
import { useOutletContext } from 'react-router-dom';
import pairProperties from '../interfaces/data/pairProperties';
import { wsReFetch } from '../functions/wsFunctions';
import pairStreamConfigInterface from '../interfaces/data/pairStreamConfig';
import { wsConnectionMechanics, wsUnsubscribe } from '../functions/wsFunctions';

const style: React.CSSProperties = {
    color: '#1e1e1e'
}

const style2: React.CSSProperties = {
    borderStyle: 'solid',
    borderWidth: '0px',
    borderColor: '#000',
    padding: '0'
}

const rightPairWS = new WebSocket("wss://stream.binance.com:9443/ws");

// interface configurationTools {
//     left: React.Dispatch<React.SetStateAction<pairProperties>>,
//     right: React.Dispatch<React.SetStateAction<pairProperties>>
// }

interface configurationTools {
    left: {
        leftPairConfigs: pairStreamConfigInterface,
        leftPairWS: WebSocket,
        id: number
    },
    right: {
        rightPairConfigs: pairStreamConfigInterface,
        rightPairWS: WebSocket,
        id: number
    }
}

function MainMenuPairsConfig() {
    const pairsPackage = useOutletContext<configurationTools>();
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
                    />
                    <Button style={{ width: 80 }} >
                    <ToolOutlined />
                    </Button>
                </Space>
            </Col>
            <Col span={8} style={style2}>
                <Space direction="horizontal">
                    <span>Right pair</span>
                    <Input
                        placeholder="ETHUSDT"
                        onChange={e => setRightTicker(e.target.value)}
                    />
                    <Button 
                        style={{ width: 80 }} 
                        onClick={e => {
                            // pairsPackage.right({
                            //     ticker: rightTicker,
                            //     color: '#fff',
                            //     backgroundColor: '#000'
                            // })
                            // wsConnectionMechanics(ws, pair, id, setData, setButtonState, setConnectionState);
                            wsUnsubscribe(pairsPackage.right.rightPairWS, pairsPackage.right.id);
                            wsConnectionMechanics(
                                pairsPackage.right.rightPairWS,
                                rightTicker,
                                pairsPackage.right.id,
                                pairsPackage.right.rightPairConfigs.setData,  
                                pairsPackage.right.rightPairConfigs.setButtonState,
                                pairsPackage.right.rightPairConfigs.setConnectionState
                            );

                            console.log(rightTicker)
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