import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Row, Col, Layout, Menu, Divider } from 'antd';
import { appColors } from '../colors';
import MainMenuPairsConfig from '../components/MainMenuPairsConfig';
import { useOutletContext } from 'react-router-dom';
import pairProperties from '../interfaces/data/pairProperties';

const { Header, Content, Footer, Sider } = Layout;


const Dashboard: React.FC = () => {

  return (
      <Layout style={{height: '95vh', border: '1px solid black'}}>
        <Content>
          <Row style={{
            height: '15vh',
            margin: '20px',
          }}>
            <Col span={4} 
              style={{
                background: '#fff',
                borderRadius: '10px', 
                boxShadow: '15px 15px 15px rgb(60, 60, 60, 0.1)',
            }}>
              <p>PnL: 50%</p>
            </Col>
            <Col span={19} offset={1}
              style={{
              background: '#fff',
              borderRadius: '10px', 
              boxShadow: '15px 15px 15px rgb(60, 60, 60, 0.1)',
            }}>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Divider plain>Fractal Hub • 2023</ Divider>
        </Footer>
    </Layout>
  );
};

export default Dashboard
