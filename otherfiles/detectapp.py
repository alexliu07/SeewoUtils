import winreg,os
def getSeewoApps():
    sub_key = [r'SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall', r'SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall']
    software = [[None,None],[None,None,''],[None,None],[None,None],[None,None],[None,None]]
    for i in sub_key:
        key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, i, 0, winreg.KEY_READ)
        for j in range(0, winreg.QueryInfoKey(key)[0]-1):
            try:
                key_name = winreg.EnumKey(key, j)
                key_path = i + '\\' + key_name
                each_key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, key_path, 0, winreg.KEY_READ)
                DisplayName = winreg.QueryValueEx(each_key, 'DisplayName')[0].encode('utf-8').decode()
                if DisplayName == '希沃管家':
                    software[0][0] = winreg.QueryValueEx(each_key, 'DisplayIcon')[0].encode('utf-8').decode()
                    software[0][1] = os.path.split(software[0][0])[0]
                elif DisplayName == '班级优化大师':
                    software[1][0] = winreg.QueryValueEx(each_key, 'DisplayIcon')[0].encode('utf-8').decode()
                    uninst = winreg.QueryValueEx(each_key, 'UninstallString')[0].encode('utf-8').decode()
                    software[1][1] = os.path.split(uninst)[0]
                elif DisplayName == '希沃白板 5' or DisplayName == '希沃白板5':
                    software[2][0] = winreg.QueryValueEx(each_key, 'DisplayIcon')[0].encode('utf-8') .decode()
                    uninst = winreg.QueryValueEx(each_key, 'UninstallString')[0].encode('utf-8').decode()
                    software[2][1] = os.path.split(uninst)[0]
                elif DisplayName == '希沃授课助手':
                    software[3][0] = winreg.QueryValueEx(each_key, 'DisplayIcon')[0].encode('utf-8').decode()
                    software[3][1] = os.path.split(software[3][0])[0]
                elif DisplayName == '希沃视频展台':
                    software[4][0] = winreg.QueryValueEx(each_key, 'DisplayIcon')[0].encode('utf-8').decode()
                    uninst = winreg.QueryValueEx(each_key, 'UninstallString')[0].encode('utf-8').decode()
                    software[4][1] = os.path.split(uninst)[0]
                elif DisplayName == 'PPT小工具':
                    software[5][0] = winreg.QueryValueEx(each_key, 'DisplayIcon')[0].encode('utf-8').decode()
                    uninst = winreg.QueryValueEx(each_key, 'UninstallString')[0].encode('utf-8').decode()
                    software[5][1] = os.path.split(uninst)[0]
            except WindowsError:
                pass
    return software