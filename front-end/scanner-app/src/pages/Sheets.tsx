import React from 'react'
import { Breadcrumb, Layout, Menu, Divider } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function Sheets() {
    return (
        <Layout style={{height: '95vh'}}>
            <Content style={{ padding: '0 50px' }}>
            <Breadcrumb 
                style={{ margin: '50px 0 20px 0' }}
                items={[{ title: (
                <>
                    <SettingOutlined /> 
                    <span>Configuration</span>
                </>
                )}]}
            />
            <Layout style={{
                padding: '24px 0', 
                background: '#fff', 
                borderRadius: '10px', 
                boxShadow: '15px 15px 15px rgb(60, 60, 60, 0.1)',
                height: '65vh',
                }}>
                <Content style={{ padding: '0 24px', overflowY: 'scroll'}}>

                </Content>
            </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
            <Divider plain>Fractal Hub • 2023</ Divider>
            </Footer>
        </Layout>
    );
};

export default Sheets