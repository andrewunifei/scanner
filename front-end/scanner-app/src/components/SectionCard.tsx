import React from 'react';
import { useEffect, useState } from 'react'
import { Card, ConfigProvider } from 'antd';
import sectionCardPropsInterface from '../interfaces/sectionCardProps';

const style: React.CSSProperties = {
  background: '#32cd32',
}

const SectionCard: React.FC<sectionCardPropsInterface> = (props: sectionCardPropsInterface) => {
  return (<ConfigProvider
    theme={{
      components: {
        Card: {
          colorBorderSecondary: '#fff',
        },
      },
    }}
  >
    <Card bordered={false}>
      {[...Array(2).keys()].map(index => {
          return (
            <Card.Grid style={style}>
              {props.ETHdata.s}
              <Card.Meta
                description={props.ETHdata.c}
              />
            </Card.Grid>
          )
        }
      )};
    </Card>
  </ConfigProvider>
)};

export default SectionCard;