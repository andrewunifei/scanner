import React, { useState } from 'react';
import { PieChartTwoTone, SettingTwoTone } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { appColors } from '../colors';

const items: MenuProps['items'] = [
  {
    label: 'Dashboard',
    key: 'mail',
    icon: <PieChartTwoTone twoToneColor={appColors.dark}/>,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    disabled: true,
  },
  {
    label: 'Configuration',
    key: 'mail',
    icon: <SettingTwoTone twoToneColor={appColors.dark}/>,
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
];

const HorizontalMenu: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default HorizontalMenu;