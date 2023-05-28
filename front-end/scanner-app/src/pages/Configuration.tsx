import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Col, Row } from 'antd';
import { appColors } from '../colors';

const { Header, Content, Footer, Sider } = Layout;

const items2: MenuProps['items'] = [
  {
    label: 'Pairs',
    key: '1',
    children: [{
      key: '1',
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
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
      <Layout style={{height: '95vh'}}>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '50px 0 20px 0' }}items={[{ title: 'Configuration' }]}  />
          <Layout style={{
            padding: '24px 0', 
            background: '#fff', 
            borderRadius: '10px', 
            boxShadow: '15px 15px 15px rgb(60, 60, 60, 0.1)'
            }}>
            <Sider style={{ background: '#fff' }} width={200}>
              <Menu
                mode="inline"
                defaultOpenKeys={['1']}
                style={{ height: '100%' }}
                items={items2}
              />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>Content</Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Fractal Hub 2023</Footer>
    </Layout>
  );
};

export default App;

// <Layout>
//       <Content >

//         <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
//           <Sider style={{ background: colorBgContainer }} width={200}>
//             <Menu
//               mode="inline"
//               defaultSelectedKeys={['1']}
//               defaultOpenKeys={['sub1']}
//               style={{ height: '100%' }}
//               items={items2}
//             />
//           </Sider>
//           <Content style={{ padding: '0 24px', minHeight: 280 }}>Content</Content>
//         </Layout>
//       </Content>
//       <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
// </Layout>


