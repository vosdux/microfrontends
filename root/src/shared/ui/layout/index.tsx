import { Button, Layout, Menu, Spin, theme } from "antd";
import { useUnit } from "effector-react";
import { Suspense, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import $counter, { plus } from "../../stores/counter/counter";

const { Header, Content, Footer } = Layout;

const items = [
  { key: "1", label: <Link to="/app1">dashboard 1</Link> },
  { key: "2", label: <Link to="/app2">dashboard 2</Link> },
];

const BaseLayout: React.FC = () => {
  const [counter, plusEvent] = useUnit([$counter, plus]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();

  const [selected, setSelected] = useState('1')

  useEffect(() => {
    setSelected(getSelected());
  }, [location.pathname])

  console.log(location, 'loc')
  const getSelected = () => {
    console.log(location.pathname.indexOf('/app1'), '123')
    if (location.pathname.indexOf('/app1') > -1) {
      return '1'
    } else {
      return '2'
    }
  }

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[selected]}
          selectedKeys={[selected]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <div style={{ height: "100vh" }}>
        <Suspense fallback={<Spin />}>
          <Outlet />
        </Suspense>
      </div>
    </Layout>
  );
};

export default BaseLayout;
