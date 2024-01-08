---
author: YOUZAI
title: Socket
date: 2023/04/25
categories:
 - 编程学习
tags:
 - Python
---

## Socket

Socket 又称"套接字"，应用程序通常通过"套接字"向网络发出请求或者应答网络请求，使主机间或者一台计算机上的进程间可以通讯。

## 函数

Python 中，我们用`socket()`函数来创建套接字，语法格式如下：

```python
socket.socket([family[, type[, proto]]])
```

参数：

* family: 套接字家族可以使 AF_UNIX 或者 AF_INET。
* type: 套接字类型可以根据是面向连接的还是非连接分为`SOCK_STREAM`或`SOCK_DGRAM`。
* protocol: 一般不填默认为 0。

## 方法

|函数|描述|
|-|-|
|<font color=red>服务端套接字</font>||
|s.bind()|绑定地址（host,port）到套接字， 在 AF_INET 下,以元组（host,port）的形式表示地址|
|s.listen()|开始 TCP 监听。backlog 指定在拒绝连接之前，操作系统可以挂起的最大连接数量。该值至少为 1，大部分应用程序设为 5 就可以了|
|s.accept()|被动接受 TCP 客户端连接,(阻塞式)等待连接的到来|
|<font color=blue>客户端套接字</font>||
|s.connect()|主动初始化 TCP 服务器连接，。一般 address 的格式为元组（hostname,port），如果连接出错，返回 socket.error 错误|
|s.connect_ex()|connect() 函数的扩展版本,出错时返回出错码,而不是抛出异常|
|<font color=orange>公共用途的套接字函数</font>||
|s.recv()|接收 TCP 数据，数据以字符串形式返回，bufsize指定要接收的最大数据量。flag 提供有关消息的其他信息，通常可以忽略|
|s.send()|	发送 TCP 数据，将 string 中的数据发送到连接的套接字。返回值是要发送的字节数量，该数量可能小于 string 的字节大小|
|s.sendall()|完整发送 TCP 数据，完整发送 TCP 数据。将 string 中的数据发送到连接的套接字，但在返回之前会尝试发送所有数据。成功返回 None，失败则抛出异常|
|s.recvfrom()|接收 UDP 数据，与 recv() 类似，但返回值是（data,address）。其中 data 是包含接收数据的字符串，address 是发送数据的套接字地址|
|s.sendto()|发送 UDP 数据，将数据发送到套接字，address 是形式为（ipaddr，port）的元组，指定远程地址。返回值是发送的字节数|
|s.close()|关闭套接字|
|s.getpeername()|返回连接套接字的远程地址。返回值通常是元组（ipaddr,port）|
|s.getsockname()|返回套接字自己的地址。通常是一个元组(ipaddr,port)|
|s.setsockopt(level,optname,value)|设置给定套接字选项的值|
|s.settimeout(timeout)|设置套接字操作的超时期，timeout 是一个浮点数，单位是秒。值为 None 表示没有超时期。一般，超时期应该在刚创建套接字时设置，因为它们可能用于连接的操作（如 connect()）|
|s.gettimeout()|返回当前超时期的值，单位是秒，如果没有设置超时期，则返回 None|
|s.fileno()|返回套接字的文件描述符|
|s.setblocking(flag)|如果 flag 为 0，则将套接字设为非阻塞模式，否则将套接字设为阻塞模式（默认值）。非阻塞模式下，如果调用 recv() 没有发现任何数据，或 send() 调用无法立即发送数据，那么将引起 socket.error 异常|
|s.makefile()|	创建一个与该套接字相关连的文件|

## 代码

服务端：

```python
#!/usr/bin/python3
# 文件名：server.py
# 导入 socket 模块
import socket
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # 创建socket对象
host = socket.gethostname()	# 获取本地主机名
port = 9999
serversocket.bind((host, port))	# 绑定端口
serversocket.listen(5)	# 设置最大连接数，超过后排队
while True:
	clientsocket,addr = serversocket.accept() # 建立客户端连接
	print("连接地址: %s" % str(addr))
	msg='欢迎访问W3Cschool教程！'+ "\r\n"
	clientsocket.send(msg.encode('utf-8'))
	clientsocket.close()
```

客户端：

```python
#!/usr/bin/python3
# 文件名：client.py
# 导入 socket 模块
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # 创建 socket 对象
host = socket.gethostname() # 获取本地主机名
port = 9999	# 设置端口好
s.connect((host, port))	# 连接服务，指定主机和端口
msg = s.recv(1024)	# 接收小于 1024 字节的数据
s.close()
print (msg.decode('utf-8'))
```

## 实现简单的聊天功能

```python
# 服务端（Server.py）
import socket
def server():
    serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # 创建socket对象
    host = socket.gethostname()  # 获取本地主机名
    port = 9999
    serversocket.bind((host, port))  # 绑定端口
    serversocket.listen(5)  # 设置最大连接数，超过后排队
    try:
        clientsocket, addr = serversocket.accept()  # 建立客户端连接
        while True:
            msg = input("小明说：")
            if msg == "结束对话":
                clientsocket.close()
                print("链接已断开")
                break
            else:
                clientsocket.send(msg.encode('utf-8'))
            msg_return = clientsocket.recv(1024)
            if msg_return:
                print("小光说：", msg_return.decode('utf-8'))
            else:
                clientsocket.close()
                print("链接已断开")
                break
    except:
        print("连接已断开")
if __name__ == '__main__':
    server()
	
# 客户端（Client.py）
import socket
def client():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # 创建 socket 对象
    host = socket.gethostname()  # 获取本地主机名
    port = 9999  # 设置端口好
    s.connect((host, port))  # 连接服务，指定主机和端口
    try:
        while True:
            msg = s.recv(1024)  # 接收小于 1024 字节的数据
            if msg:
                print("小光说：", msg.decode('utf-8'))
            else:
                s.close()
                print("链接已断开")
                break
            msg_return = input("小明说：")
            if msg_return == "结束对话":
                s.close()
                print("链接已断开")
                break
            else:
                s.send(msg_return.encode('utf-8'))
    except:
        print("链接已断开")
if __name__ == '__main__':
    client()
```

## Socket 中 TCP 和 UDP 区别

### TCP

服务器端一般步骤：

1. 创建一个socket，用函数socket()； 
2. 设置socket属性，用函数setsockopt(); * 可选 
3. 绑定IP地址、端口等信息到socket上，用函数bind(); 
4. 开启监听，用函数listen()； 
5. 接收客户端上来的连接，用函数accept()； 
6. 收发数据，用函数send()和recv()，或者read()和write(); 
7. 关闭网络连接； 
8. 关闭监听；

客户端一般步骤：

1. 创建一个socket，用函数socket()； 
2. 设置socket属性，用函数setsockopt();\* 可选 
3. 绑定IP地址、端口等信息到socket上，用函数bind();\* 可选 
4. 设置要连接的对方的IP地址和端口等属性； 
5. 连接服务器，用函数connect()； 
6. 收发数据，用函数send()和recv()，或者read()和write(); 
7. 关闭网络连接；

### UDP

UDP编程的服务器端一般步骤：

1. 创建一个socket，用函数socket()； 
2. 设置socket属性，用函数setsockopt();\* 可选 
3. 绑定IP地址、端口等信息到socket上，用函数bind(); 
4. 循环接收数据，用函数recvfrom(); 
5. 关闭网络连接；

UDP编程的客户端一般步骤：

1. 创建一个socket，用函数socket()； 
2. 设置socket属性，用函数setsockopt();\* 可选 
3. 绑定IP地址、端口等信息到socket上，用函数bind();\* 可选 
4. 设置对方的IP地址和端口等属性; 
5. 发送数据，用函数sendto(); 
6. 关闭网络连接；