import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Divider } from 'antd';
import { appColors } from '../colors';
import MainMenuPairsConfig from '../components/MainMenuPairsConfig';
import { useOutletContext } from 'react-router-dom';
import pairProperties from '../interfaces/data/pairProperties';

const { Header, Content, Footer, Sider } = Layout;

// Visual settings
const items2: MenuProps['items'] = [
  {
    label: 'Pairs',
    key: '1',
    children: [{
      key: 'mainMenuPair',
      label: 'Main menu pairs',
    }]
  }
];

const style: React.CSSProperties = {
  background: '#fff',
  borderStyle: 'solid',
  borderWidth: '1px',
}


const App: React.FC = () => {
  const [current, setCurrent]= useState<string>('mainMenuPair');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e.key);
    console.log('mainMenuPair')
    setCurrent(e.key);
  };

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
              <Sider style={{ background: '#fff', overflowY: 'scroll'}} width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['1']}
                  style={{ height: '100%' }}
                  items={items2}
                  onClick={onClick}
                />
              </Sider>
              <Content style={{ padding: '0 24px', overflowY: 'scroll'}}>
                <>
                  {
                    current === 'mainMenuPair' &&
                    <MainMenuPairsConfig />
                  }
                </>
              </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Divider plain>Fractal Hub • 2023</ Divider>
        </Footer>
    </Layout>
  );
};

export default App
