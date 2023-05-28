import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Col, Row } from 'antd';
import { appColors } from '../colors';

const { Header, Content, Footer, Sider } = Layout;

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key: string = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey: number = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

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
    <Row style={{ padding: '50px 50px', background: '#FAFAFA', height: '100%' }}>
        <Col span={4} >
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                items={items2}
                style={
                  {
                    borderStyle: 'solid',
                    borderWidth: '5px',
                    borderRadius: '10px',
                    borderColor: '#FAFAFA'
                  }
                }
            />
        </Col>
        <Col span={20} style={
            {
              background: '#fff',
              borderStyle: 'solid',
              borderWidth: '5px',
              borderColor: '#FAFAFA'
            }
          }>
        </Col>
    </Row>
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