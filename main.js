{
    const {app, BrowserWindow,ipcMain,Menu} = require('electron');
    const path = require("path");
    const child_process = require("child_process");
    let win;
    //创建窗口
    function createWindow () {
        win = new BrowserWindow({
            width: 330, 
            height: 200,
            frame: false,
            transparent:true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
            },
            maximizable: false,
            resizable: false,
        });
        Menu.setApplicationMenu(null);
        win.loadFile('index.html');
        win.setSkipTaskbar(true);
        win.on('closed', () => {
            win = null
        });
    }
    app.on('ready', createWindow )
    app.on('window-all-closed', () => {
        app.quit()
    })
    app.on('activate', () => {
      if (win === null) {
        createWindow()
      }
    })
    const url = path.resolve(__dirname, 'utils/util.exe');
    //监听请求
    ipcMain.on("sync-message", (event, arg) => {
        //刷新缓存
        if(arg == 'refresh'){
            var spawnObt = child_process.spawn(url, ['refresh'], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                event.returnValue = 0;
            });
        }
        //检测程序
        else if(arg == 'checksws'){
            var spawnObt = child_process.spawn(url, ['check',0], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                event.returnValue = Number(chunk.toString());
            });
        }
        else if(arg == 'checkecar'){
            var spawnObt = child_process.spawn(url, ['check',1], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                event.returnValue = Number(chunk.toString());
            });
        }
        else if(arg == 'checken'){
            var spawnObt = child_process.spawn(url, ['check',2], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                event.returnValue = Number(chunk.toString());
            });
        }
        else if(arg == 'checkswl'){
            var spawnObt = child_process.spawn(url, ['check',3], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                event.returnValue = Number(chunk.toString());
            });
        }
        else if(arg == 'checkecam'){
            var spawnObt = child_process.spawn(url, ['check',4], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                event.returnValue = Number(chunk.toString());
            });
        }
        else if(arg == 'checkppt'){
            var spawnObt = child_process.spawn(url, ['check',5], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                event.returnValue = Number(chunk.toString());
            });
        }
        //启动程序
        else if(arg == 'launchsws'){
            var spawnObt = child_process.spawn(url, ['launch',0], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                event.returnValue = 0;
            });
        }
        else if(arg == 'launchecar'){
            var spawnObt = child_process.spawn(url, ['launch',1], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                event.returnValue = 0;
            });
        }
        else if(arg == 'launchen'){
            var spawnObt = child_process.spawn(url, ['launch',2], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                event.returnValue = 0;
            });
        }
        else if(arg == 'launchswl'){
            var spawnObt = child_process.spawn(url, ['launch',3], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                event.returnValue = 0;
            });
        }
        else if(arg == 'launchecam'){
            var spawnObt = child_process.spawn(url, ['launch',4], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                event.returnValue = 0;
            });
        }
        else if(arg == 'launchppt'){
            var spawnObt = child_process.spawn(url, ['launch',5], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                event.returnValue = 0;
            });
        }
        //锁定解锁
        else if(arg == 'getlock'){
            var spawnOb = child_process.spawn(url, ['getwin'], {encoding: 'utf-8'});
            spawnOb.stdout.on('data', function(chunk) {
                stdss = chunk.toString();
                var posi = stdss.split(',');
                event.returnValue = posi[2];
            });
        }
        else if(arg == 'lock'){
            var pos = win.getPosition();
            var tmp = "['"+pos.join("','")+"']";
            child_process.spawn(url, ['savepos',tmp], {encoding: 'utf-8'});
            var spawnObt = child_process.spawn(url, ['lock'], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                event.returnValue = 0;
            });
        }
        else if(arg == 'unlock'){
            var spawnObt = child_process.spawn(url, ['unlock'], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                event.returnValue = 0;
            });
        }
        //设置窗口位置
        else if(arg == 'setpos'){
            var spawnOb = child_process.spawn(url, ['getwin'], {encoding: 'utf-8'});
            spawnOb.stdout.on('data', function(chunk) {
                stdss = chunk.toString();
                var posi = stdss.split(',');
                if(posi[0] != 'undefined' && posi[1] != 'undefined'){
                    win.setPosition(Number(posi[0]), Number(posi[1]));
                }
            });
            event.returnValue = 0;
        }
        //退出
        else if(arg == 'exit'){
            var pos = win.getPosition();
            var tmp = "['"+pos.join("','")+"']";
            var spawnObt = child_process.spawn(url, ['savepos',tmp], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                win.close();
                event.returnValue = 0;
            });
        }
    });
}