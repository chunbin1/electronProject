import * as React from 'react';
import { Row, Col } from 'antd';
import IconFont from '../IconFont';
import router from 'umi/router';

export interface FooterProps {
  /** 生成底部导航 */
  routerArr: Array<routerArr>;
}

export interface routerArr {
  icon?: string;
  route: string;
}

export default function TabsFooter(props: FooterProps) {
  const { routerArr } = props;
  const span: number = Math.floor(24 / routerArr.length);
  return (
    <Row>
      {routerArr.map(({ icon, route }) => {
        return (
          <Col span={span} key={route}>
            <IconFont
              type={icon}
              onClick={() => {
                router.push({
                  pathname: route,
                });
              }}
            />
          </Col>
        );
      })}
    </Row>
  );
}
