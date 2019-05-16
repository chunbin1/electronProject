import React, { useState } from 'react';
import router from 'umi/router';
import Counter from '@/components/Counter';
import { Input, Button } from 'antd';
import { ipcRenderer } from 'electron';
import styles from './home.less';

function Home() {
  const [str, setStr] = useState('');
  const sendMsg = (str:string):void => {
    ipcRenderer.send('saveData', str);    
  }
  return (
    <>
      <div
        className={styles.home}
        onClick={() => {
          router.push('/');
        }}
      >
        hi home
      </div>
      <Counter name="counter" initValue={1} />
      <Input
        onChange={e => {
          const { value } = e.target;
          setStr(value);
        }}
        value={str}
      />
      <Button
        onClick={()=>sendMsg(str)}
      >
        把东西输入到文件中
      </Button>
    </>
  );
}

export default Home;
