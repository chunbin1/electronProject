import * as React from 'react';
import { Layout } from 'antd';
import { TouchBarLabel } from 'electron';
import TabsFooter, { routerArr } from '@/components/TabsFooter';

const { Header, Footer, Sider, Content } = Layout;

const routerArr: Array<routerArr> = [
  {
    route: '/list',
    icon: 'icon-totop',
  },
  {
    route: '/search',
    icon: 'icon-search',
  },
  {
    route: '/north',
    icon: 'icon-north',
  },
];

export default function BasicLayout(props) {
  return (
    <Layout style={{ height: '100%' }}>
      {/* <Sider>Sider</Sider> */}
      <Layout>
        <Header>basiclayout</Header>
        <Content>{props.children}</Content>
        <Footer>
          <TabsFooter routerArr={routerArr} />
        </Footer>
      </Layout>
    </Layout>
  );
}
