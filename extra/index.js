//声明变量，导入库
const { ipcRenderer } = require("electron");
var isShowMenu = false;
var isLock = false;
//注册组件
//主窗口
var container = document.getElementById('container')
//拖动
var title = document.getElementById('title')
//菜单
var menulist = document.getElementById('menu');
var menubtn = document.getElementById('menubtn');
//菜单子项
var exitbtn = document.getElementById('exit');
var refresh = document.getElementById('refresh');
var lockbtn = document.getElementById('locks');
//App
var swservice = document.getElementById('swservice');
var easicare = document.getElementById('easicare');
var easinote = document.getElementById('easinote');
var swlink = document.getElementById('swlink');
var easicamera = document.getElementById('easicamera');
var ppttool = document.getElementById('ppttool')
//发送信息
function sendMessage(message){
    return ipcRenderer.sendSync("sync-message", message);
}
//锁定解锁
function lock(){
    isLock = true;
    title.style.webkitAppRegion = 'no-drag';
    lockbtn.innerHTML = '解锁拖动';
}
function unlock(){
    isLock = false;
    title.style.webkitAppRegion = 'drag';
    lockbtn.innerHTML = '锁定拖动';
}
//切换
function change(a,b){
    a.style.animation = 'out 0.2s 1';
    a.style.display = 'none';
    b.style.animation = 'in 0.6s 1';
    b.style.display = 'block';
}
//检测程序
function checkApp(app,message){
    if(sendMessage(message) == 1){
        app.style.display = 'none';
    }else{
        app.style.display = 'inline-block';
    }
}
//刷新程序列表
function refreshApp(){
    sendMessage('refresh');
    checkApp(swservice,'checksws');
    checkApp(easicare,'checkecar');
    checkApp(easinote,'checken');
    checkApp(swlink,'checkswl');
    checkApp(easicamera,'checkecam');
    checkApp(ppttool,'checkppt');
}
refresh.onclick = refreshApp;
//获取锁定
function getLock(){
    if(sendMessage('getlock') == 'unlocked'){
        unlock();
    }else{
        lock();
    }
}
refreshApp();
getLock();
sendMessage('setpos');
//加载完成后再显示窗口
container.style.display = 'block';
//显示菜单
menubtn.onclick = function(){
    if(isShowMenu){
        isShowMenu = false;
        change(menulist,ppttool);
        checkApp(ppttool,'checkppt');
    }else{
        isShowMenu = true;
        change(ppttool,menulist);
    }
}
//启动程序
swservice.onclick = function(){
    sendMessage('launchsws');
}
easicare.onclick = function(){
    sendMessage('launchecar');
}
easinote.onclick = function(){
    sendMessage('launchen');
}
swlink.onclick = function(){
    sendMessage('launchswl');
}
easicamera.onclick = function(){
    sendMessage('launchecam');
}
ppttool.onclick = function(){
    sendMessage('launchppt');
}
//退出程序
exitbtn.onclick = function(){
    sendMessage('exit');
}
//锁定拖动
lockbtn.onclick = function(){
    if(isLock){
        sendMessage('unlock');
        unlock();
    }else{
        sendMessage('lock');
        lock();
    }
}