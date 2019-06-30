import React, { useState } from 'react';
import classnames from 'classnames';
import IconFont from '../IconFont';
import router from 'umi/router';
import styles from './index.less';

export interface IFooterProps {
  /** 生成底部导航 */
  routerArr: IRouterArr[];
  /** 所处路由 */
  pathname: string;
}

export interface IRouterArr {
  icon?: string;
  route: string;
  [name: string]: any;
}

export interface ITabsItem extends IRouterArr {
  icon?: string;
  route: string;
  isSelected: boolean;
}

export default function TabsFooter(props: IFooterProps) {
  const { routerArr, pathname } = props;
  // const [local,setLocal] = useState() // 标志现在所处位置
  return (
    <div className={styles.footer}>
      {routerArr.map(({ icon, route }) => {
        return (
          <TabsItem
            icon={icon}
            route={route}
            key={route}
            isSelected={pathname === route}
          />
        );
      })}
    </div>
  );
}

function TabsItem(props: ITabsItem) {
  const { icon, route, isSelected } = props;
  return (
    <div
      className={classnames(styles.iconfont, {
        [styles.selected]: isSelected,
      })}
      key={route}
      onClick={() => {
        router.push({
          pathname: route,
        });
      }}
    >
      <IconFont
        type={icon}
      />
    </div>
  );
}
