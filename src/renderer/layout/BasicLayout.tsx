import * as React from 'react';
import { Layout } from 'antd';
import TabsFooter, { IRouterArr } from '@/components/TabsFooter';
import styles from './index.less';

const { Header, Footer, Content } = Layout;
const routerArr: IRouterArr[] = [
  {
    icon: 'icon-top',
    route: '/top',
  },
  {
    icon: 'icon-north',
    route: '/north',
  },
  {
    icon: 'icon-search',
    route: '/search',
  },
];

export default function BasicLayout(props: any) {
  const {
    location: { pathname },
  } = props;
  return (
    <Layout style={{ height: '100%' }} className={styles.basicLayout}>
      {/* <Sider>Sider</Sider> */}
      <Header>basiclayout</Header>
      <Content>{props.children}</Content>
      <Footer>
        <TabsFooter routerArr={routerArr} pathname={pathname} />
      </Footer>
    </Layout>
  );
}
