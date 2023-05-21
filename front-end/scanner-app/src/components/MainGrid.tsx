import React from 'react';
import { Col, Divider, Row, ConfigProvider } from 'antd';
import SectionCard from './SectionCard';

const style: React.CSSProperties = { };
const style2: React.CSSProperties = { margin: '2em', padding: '2em', background: '#282c34'};

const MainGrid: React.FC = () => (
  <div style={style2}>
    <ConfigProvider
    theme={{
      components: {
        Divider: {
          lineWidth: 2,
          colorSplit: '#fff',
          colorTextHeading: '#fff',
        },
      },
    }}
  >
    <Divider orientation="left">Top movers</Divider>
    <SectionCard />
  </ConfigProvider>
  </div>
);

export default MainGrid;
