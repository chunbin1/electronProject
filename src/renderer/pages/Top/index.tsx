import React, { useEffect, useCallback } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';

export interface ITopProps {
  dispatch: ({ type: string, payload: any }) => {};
  items: any[];
}

export interface ITopItemsProps {
  index: number;
  item?: any;
}

function Top(props: ITopProps) {
  const { dispatch, items } = props;
  useEffect(() => {
    dispatch({
      type: 'top/queryTopList',
      payload: {
        page: 1,
      },
    });
  }, []);
  return (
    <div className={styles.top}>
      {items.map((item, index) => (
        <TopItems key={item.name} item={item} index={index + 1} />
      ))}
    </div>
  );
}

function TopItems(props: ITopItemsProps) {
  const { item } = props;
  const clickHandler = () => {
    const { html_url } = item;

    // router.push(html_url);
  };
  return (
    <div className={styles.topItems} onClick={clickHandler}>
      <div className={styles.order}>
        <span>{props.index}</span>
      </div>
      <div className={styles.info}>
        <div className={styles.detail}>
          <h2>{item.name} </h2>
          <div className={styles.desc}>{item.description}</div>
          <div className={styles.extra}>
            <span className={styles.star}>{item['star-count']}</span> star
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(({ top }) => ({
  items: top.items,
}))(Top);
