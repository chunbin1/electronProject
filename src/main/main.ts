import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
const fs = require('fs');

let mainWindow: Electron.BrowserWindow | null;
let detailWindow: Electron.BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 872,
    width: 375,
  });

  detailWindow = new BrowserWindow({
    parent: mainWindow,
    show: false,
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:8000/#/home');
    mainWindow.webContents.openDevTools();
    detailWindow.loadURL('http://localhost:8000/#/detail');
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, './dist/renderer/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  detailWindow.on('close', e => {
    e.preventDefault();
    detailWindow.webContents.send('url', ' ');
    detailWindow.hide();
  });
}

const saveDataHandler = (event, value: string) => {
  console.log(value);

  fs.writeFile('test.txt', value, function(err: boolean) {
    if (err) {
      console.log(err);
    }
    console.log('写入成功');
  });
};

const showDetail = (e, url: string) => {
  detailWindow.show();
  /** 给详情界面传送信息 */
  detailWindow.webContents.send('url', url);
};

ipcMain.on('saveData', saveDataHandler);
ipcMain.on('showDetail', showDetail);

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
