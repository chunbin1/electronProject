import React, { useState, useEffect } from 'react';
import { useDocumentTitle } from '@/hooks';
import { ipcRenderer } from 'electron';
import { Spin } from 'antd';

export interface IAppProps {
  src?: string;
}

const TITLE = '详情';

export default function App(props: IAppProps) {
  const [stateSrc, setSrc] = useState(' ');
  useEffect(() => {
    ipcRenderer.on('url', (e, url) => {
      setSrc(url);
    });
  }, []);
  useDocumentTitle(TITLE);
  return (
    <>
      {stateSrc === ' ' ? (
        <Spin spinning={true} />
      ) : (
        <webview style={{ height: '100%' }} src={stateSrc} />
      )}
    </>
  );
}
