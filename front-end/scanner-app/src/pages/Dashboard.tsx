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
    <p>Dashboard em construção</p>
  );
};

export default Dashboard
