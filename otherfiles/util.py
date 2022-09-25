import sys,os
from detectapp import getSeewoApps
#刷新缓存
if sys.argv[1] == 'refresh':
    apps = getSeewoApps()
    status = [0,0,0,0,0,0]
    file = open('apps.txt','w+',encoding='utf-8')
    for i in range(6):
        if apps[i][0]:
            status[i] = 1
    file.write(str(status))
    file.close()
    file = open('run.bat','w+',encoding='utf-8')
    file.write('@echo off\nif %1==0 (\ncd "'+str(apps[0][1])+'"\ncall "'+str(apps[0][0])+'" /runmode=launcher\n)\nif %1==1 (\ncd "'+str(apps[1][1])+'"\ncall "'+str(apps[1][0])+'"\n)\nif %1==2 (\ncd "'+str(apps[2][1])+'"\ncall "'+str(apps[2][0])+'"\n)\nif %1==3 (\ncd "'+str(apps[3][1])+'"\ncall "'+str(apps[3][0])+'"\n)\nif %1==4 (\ncd "'+str(apps[4][1])+'"\ncall "'+str(apps[4][0])+'"\n)\nif %1==5 (\ncd "'+str(apps[5][1])+'"\ncall "'+str(apps[5][0])+'"\n)')
    file.close()
    print(0,end='')
#检测程序
elif sys.argv[1] == 'check':
    file = open('apps.txt','r',encoding='utf-8')
    apps = eval(file.read())
    file.close()
    appnum = int(sys.argv[2])
    if apps[appnum]:
        print(0,end='')
    else:
        print(1,end='')
#启动程序
elif sys.argv[1] == 'launch':
    appnum = int(sys.argv[2])
    if appnum == 5:
        os.system('taskkill /t /f /im PPTService.exe')
    os.system('start /b run.bat '+str(appnum))
    print(0,end='')
#保存坐标
elif sys.argv[1] == 'savepos':
    posi = eval(sys.argv[2])
    file = open('window.ini','r',encoding='utf-8')
    oldlist = eval(file.read())
    file.close()
    oldlist[0] = str(posi[0])
    oldlist[1] = str(posi[1])
    filen = open('window.ini','w+',encoding='utf-8')
    filen.write(str(oldlist))
    filen.close()
    print(0,end='')
#获取状态
elif sys.argv[1] == 'getwin':
    if not os.path.exists('window.ini'):
        file = open('window.ini','w+',encoding='utf-8')
        file.write('["undefined","undefined","unlocked"]')
        file.close()
        print('undefined,undefined,unlocked',end='')
    else:
        file = open('window.ini','r',encoding='utf-8')
        posi = eval(file.read())
        file.close()
        tmp = ','.join(posi)
        print(tmp,end='')
#锁定窗口
elif sys.argv[1] == 'lock':
    file = open('window.ini','r',encoding='utf-8')
    oldlist = eval(file.read())
    file.close()
    oldlist[2] = 'locked'
    filen = open('window.ini','w+',encoding='utf-8')
    filen.write(str(oldlist))
    filen.close()
    print(0,end='')
#解锁窗口
elif sys.argv[1] == 'unlock':
    file = open('window.ini','r',encoding='utf-8')
    oldlist = eval(file.read())
    file.close()
    oldlist[2] = 'unlocked'
    filen = open('window.ini','w+',encoding='utf-8')
    filen.write(str(oldlist))
    filen.close()
    print(0,end='')
#检测更新
elif sys.argv[1] == 'update':
    os.system('start updater\\updater.exe')