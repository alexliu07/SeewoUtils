# 希沃应用启动器
***
PS:我们学校的希沃集控把希沃管家的管家助手关了，但又有需要，于是就模仿着做了一个，顺便加上了经常被卡退的PPT小工具，和老师会用的但被希沃淘汰的希沃授课助手
***
## 使用方法
***
***提示：本软件只能运行在64位的Windows 7/8/8.1/10/11系统上<br>且一定要将文件夹放在有权限访问的目录下，否则程序将无法读取配置文件***
***
将文件下载下来后解压，然后运行内部的seewoutils.exe运行<br>
本程序支持自动识别希沃软件
***
解锁拖动后，拖动 ***“希沃应用”标题*** 以进行拖动
***
## 离线更新说明
***
在<a href="https://github.com/alexliu07/SeewoUtils/releases/">Releases</a>中下载app-update.zip，然后放到程序目录/updater/offline目录下(没有就新建一个)
***
## 源码使用说明
***由于源码使用比较麻烦，建议直接下载release使用，里面也有源码***
***
本程序采用Electron + Python的实现方式，需要先进行编译Python文件才可使用源码运行<br>
***
otherfiles/util.py为程序使用所需的系统交互代码，必须编译才可使用源码运行程序
1. 安装Python
2. 安装Pyinstaller<br>`pip install pyinstaller`
3. 将otherfiles下的util.py使用pyinstaller编译
4. 在源码路径下新建utils文件夹
4. 将编译后的文件放入源码路径下utils文件夹
***
### updater.py使用
***
本程序为更新程序，需在打包好的程序中运行，放在这里仅作为源码查看
***
## 使用到的程序
主程序使用<a href="https://nodejs.org/">Nodejs</a>+<a href="https://www.electronjs.org/">Electron</a>构建<br>
辅助程序使用<a href="https://www.python.org/">Python</a>构建<br>
解压更新包程序：<a href="https://www.7-zip.org/">7-Zip</a><br>
Github加速IP：<a href="https://github.com/521xueweihan/GitHub520">Github520</a>