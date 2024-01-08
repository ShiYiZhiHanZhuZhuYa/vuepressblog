---
author: YOUZAI
title: SSH
date: 2023/04/25
categories:
 - 编程学习
tags:
 - Python
---

## 创建 SSH 连接

```python
# -*- coding:utf-8 -*-  
import paramiko  # 先安装pycrypto，再安装paramiko  
import sys  
# 创建SSH对象  
ssh = paramiko.SSHClient()  
  
# 允许连接不在~/.ssh/known_hosts文件中的主机  
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())  
  
# 连接服务器  
ssh.connect(hostname="192.168.64.131", port=22, username="root", password="lhj1998")  
  
# 执行命令，不要执行top之类的在不停的刷新的命令(可以执行多条命令，以分号来分隔多条命令)  
# stdin, stdout, stderr = ssh.exec_command("cd %s;mkdir %s" % ("/www/wwwroot", "aa"))  
  
def getMessage(cmd):  
    stdin, stdout, stderr = ssh.exec_command(cmd)  
    stdin.flush()  
    # 获取命令结果  
 	res, err = stdout.read(), stderr.read()  
    result = res if res else err  
    res = result.decode(encoding="utf-8")  
    if len(res) != 0:  
        print(res)  
  
if __name__ == '__main__':  
    message = ["null", "null", "null"]  
    messageCmd = ["whoami", "hostname", "pwd"]  
    while True:  
        i = 0  
 		ch = "$"  
 		for cmd in messageCmd:  
            stdin1, stdout1, stderr1 = ssh.exec_command(cmd)  
            stdin1.flush()  
            res1, err1 = stdout1.read(), stderr1.read()  
            result1 = res1 if res1 else err1  
            res1 = result1.decode(encoding="utf-8")  
            message[i] = res1.strip()  
            i = i + 1  
 		if message[0] == "root":  
            ch = "#"  
 		else:  
            ch = "$"  
 		cmd = input("[%s@%s %s] %s " % (message[0], message[1], message[2], ch))  
        if cmd == "exit()":  
            # 关闭服务器连接  
 			ssh.close()  
            sys.exit()  
        elif "cd" in cmd:  
            messageCmd[2] = "cd " + message[2] + ";" + cmd + ";pwd"  
 		else:  
            getMegCmd = "cd " + message[2] + ";" + cmd  
            getMessage(getMegCmd)
```