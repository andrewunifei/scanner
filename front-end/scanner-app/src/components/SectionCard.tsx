import React from 'react';
import { Card, ConfigProvider } from 'antd';
import sectionCardPropsInterface from '../interfaces/sectionCardProps';

const style: React.CSSProperties = {
  background: '#32cd32',
}

function SectionCard ({ tickersData, numberOfGridCard }: sectionCardPropsInterface) {
  return (<ConfigProvider
    theme={{
      components: {
        Card: {
          colorBorderSecondary: '#fff',
        },
      },
    }}
  >
    <Card bordered={false} size="small">
      {[...Array(2).keys()].map(index => {
          return (
            <Card.Grid style={style}>
              {tickersData[index].s}
              <Card.Meta
                description={tickersData[index].c.slice(0, -6)}
              />
            </Card.Grid>
          )
        }
      )};
    </Card>
  </ConfigProvider>
)};

export default SectionCard;