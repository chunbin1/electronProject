import * as React from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export default function BasicLayout(props) {
  return (
      <Layout  style={{height:'100%'}}>
        <Sider>Sider</Sider>
        <Layout>
          <Header>basiclayout</Header>
          <Content>{props.children}</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
  );
}
