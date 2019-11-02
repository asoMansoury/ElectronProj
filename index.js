const {app,BrowserWindow}  = require('electron');
const path = require('path');
const windowStateKeeper = require('electron-window-state');
const url = require('url');
const Devtron = require('devtron');
const electronUiKit=require('electron-ui-kit');

require('electron-reload')(__dirname);

let win
function createWindow(){
    Devtron.install();

    let mainWindowState = windowStateKeeper({
      defaultHeight:600,
      defaultWidth : 1200
    })
    win = new BrowserWindow({
        width:mainWindowState.width,
        height:mainWindowState.height,
        x:mainWindowState.x,
        y:mainWindowState.y,
        backgroundColor:"#e74c3c",
        show:false
    });

    let childWin = new BrowserWindow({
      width:500,
      height:500,
      backgroundColor:'#1abc9c',
      frame:false
    })

    win.loadURL("https://www.roocket.ir")
  childWin.loadURL(url.format({
    pathname:path.join(__dirname,'./public/index.html'),
    protocol:'file',
}))

    win.on('ready-to-show',()=>{
      win.show();
      childWin.close();
    })

    mainWindowState.manage(win);
    win.on('closed',()=>{
        
        app.quit();
        win=null;
    })

    childWin.on('closed',()=>{
      childWin = null;
    })
    // win.resizable=false;

}

app.on('ready',createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })
