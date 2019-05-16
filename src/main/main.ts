import { app, BrowserWindow,ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
const fs = require('fs');

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:8000/#/');
    mainWindow.webContents.openDevTools();
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
}

const saveDataHandler = (event,value:string) => {
  console.log(value);

  fs.writeFile('test.txt',value,function(err:boolean){
    if(err){
      console.log(err)
    }
    console.log('写入成功');
  })
}


ipcMain.on('saveData', saveDataHandler);

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
