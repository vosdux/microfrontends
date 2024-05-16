import React, { useEffect, useState } from 'react';
import { UserOutlined, DashboardOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const menu = [
  {
    key: '/',
    icon: <UserOutlined />,
    label: <Link to="/">users</Link>,
  },
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: <Link to="/dashboard">dashboard</Link>
  }
]


const BaseLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();

  const [selected, setSelected] = useState('1')

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname])

  return (
    <Layout style={{ height: '100%' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[selected]} selectedKeys={[selected]} items={menu} />
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;