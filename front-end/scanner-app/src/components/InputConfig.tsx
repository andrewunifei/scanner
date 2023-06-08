import React from 'react'
import { Col, Row, Input, Button } from 'antd'
import { ToolOutlined } from '@ant-design/icons';

interface props {
    // setVariable: React.Dispatch<React.SetStateAction<string>>;
    setVariable: React.Dispatch<React.SetStateAction<string>>;
    eventCallBack: Function;
    inputPlaceholder: string;
    title: string;
}

function InputConfig({setVariable, eventCallBack, inputPlaceholder, title}: props) {
  return (
    <Row>
        <Col>
            <Row>
                <Col>
                    <span style={{color:'#8c8c82', fontSize: '13px'}}>{title}</span>
                </Col>
            </Row>
            <Row>
                <Col span={16}>
                    <Input
                        placeholder={inputPlaceholder}
                        onChange={e => setVariable(e.target.value.toLowerCase())}
                    />
                </Col>
                <Col span={8}>
                    <Button 
                            style={{ width: 80 }}
                            onClick={e => eventCallBack()}
                        >
                    <ToolOutlined />
                    </Button>
                </Col>
            </Row>
        </Col>
    </Row>
  )
}

export default InputConfig