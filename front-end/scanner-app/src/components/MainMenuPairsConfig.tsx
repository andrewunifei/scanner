import React from 'react'
import { Col, Row, Input, Space, Button } from 'antd'
import { ToolOutlined } from '@ant-design/icons';

const style: React.CSSProperties = {
    color:  '#1E1E1E',
    fontWeight: 'normal'
}

const style2: React.CSSProperties = {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#F5F5F5'
}


function MainMenuPairsConfig() {
  return (
    <div>
        <Row>
            <Col span={8} style={style2}><h1 style={style}><span>Configuration:</span> main menu pairs</h1></Col>
            <Col span={8} ></Col>
            <Col span={8} ></Col>
            <Col span={8}>
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
            <Col span={8}>
                <Space direction="horizontal">
                    <span>Right pair</span>
                    <Input
                    placeholder="ETHUSDT"
                    />
                    <Button style={{ width: 80 }} >
                    <ToolOutlined />
                    </Button>
                </Space>
            </Col>
        </Row>
            
    </div>
  )
}

export default MainMenuPairsConfig