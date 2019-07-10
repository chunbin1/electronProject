import React, { useEffect, useCallback, useRef } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { ipcRenderer } from 'electron';
import _ from 'lodash';
import { Spin } from 'antd';

export interface ITopProps {
  dispatch: ({ type: string, payload: any }) => {};
  items: any[];
  page: number;
}

export interface ITopItemsProps {
  index: number;
  item?: any;
}

function Top(props: ITopProps) {
  const { dispatch, items } = props;
  const ref = useRef(null);
  const pageData = useRef(1);
  const { page } = props;
  pageData.current = page;
  useEffect(() => {
    dispatch({
      type: 'top/queryTopList',
      payload: {
        page: 1,
      },
    });
  }, []);

  function scrollHandler() {
    const { scrollHeight, offsetHeight, scrollTop } = ref.current;
    if (offsetHeight + scrollTop + 10 > scrollHeight) {
      dispatch({
        type: 'top/queryTopList',
        payload: {
          page: pageData.current + 1,
        },
      });
    }
  }
  useEffect(() => {
    ref.current.addEventListener('scroll', _.throttle(scrollHandler, 400));
    return ref.current.removeEventListener(
      'scroll',
      _.throttle(scrollHandler, 400)
    );
  }, [ref, pageData]);
  return (
    <div className={styles.top} ref={ref}>
      {items.map((item, index) => (
        <TopItems key={item.name} item={item} index={index + 1} />
      ))}
      <div style={{ textAlign: 'center' }}>
        <Spin spinning={true} />
      </div>
    </div>
  );
}

function TopItems(props: ITopItemsProps) {
  const { item } = props;
  const clickHandler = () => {
    const { html_url } = item;
    ipcRenderer.send('showDetail', html_url); // 发送给main进程
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
  page: top.page,
}))(Top);
