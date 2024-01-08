---
author: YOUZAI
title: 文件操作
date: 2023/04/25
categories:
 - 编程学习
tags:
 - Python
---

## 文件读写

````python
with open("nihao.txt", "r", encoding='utf-8') as f:
	f.read() #读取文件
	
with open("nihao.txt", "w", encoding='utf-8') as f:
	content = text 
	f.write(content) # 写入文件
````

## IO操作类型

|类型|描述|
|:-:|:-:|
|r|以只读方式打开文件。文件的指针将会放在文件的开头。这是默认模式|
|w|打开一个文件只用于写入。如果该文件已存在则将其覆盖。如果该文件不存在，创建新文件|
|a|打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入|
|rb|以二进制格式打开一个文件用于只读。文件指针将会放在文件的开头。这是默认模式|
|wb|以二进制格式打开一个文件只用于写入。如果该文件已存在则将其覆盖。如果该文件不存在，创建新文件|
|ab|以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入|
|r+|打开一个文件用于读写。文件指针将会放在文件的开头|
|w+|打开一个文件用于读写。如果该文件已存在则将其覆盖。如果该文件不存在，创建新文件|
|a+|打开一个文件用于读写。如果该文件已存在，文件指针将会放在文件的结尾。文件打开时会是追加模式。如果该文件不存在，创建新文件用于读写|
|rb+|以二进制格式打开一个文件用于读写。文件指针将会放在文件的开头|
|w+|以二进制格式打开一个文件用于读写。如果该文件已存在则将其覆盖。如果该文件不存在，创建新文件|
|ab+|以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。如果该文件不存在，创建新文件用于读写|

## 读取大文件

```python
# 方法1
def read_chunk(chunk_size = 8):  # 限制每次读取的字节
    with open('./test.html', encoding = 'utf-8') as f:  
        while True:  
            chunk_data = f.read(chunk_size)  
            if not chunk_data:  
                break  
 			yield chunk_data

for data in read_chunk():
	print(data) # 读取到的每一部分数据

# 方法2
with open('./test.html') as f:
	for data in f:
		print(data) # 将文件对象当作迭代器
```

## OS操作

```python
import os

os.remove(file_name) # 删除文件
os.mkdir("new_dir") # 创建目录
os.chdir("/home/dir") # 改变当前目录
os.getcwd() # 显示当前工作目录
os.rename(old,new) # 修改文件名称
os.path.abspath(path) # 返回绝对路径
os.path.basename(path) # 返回文件名
os.path.splitext() # 将文件名和扩展名分开
os.listdir(path) # 返回路径中包含的文件夹名或文件名的列表
os.path.exists(path) # 判断路径是否存在
os.walk() # 遍历目录，输出文件名
os.path.join(path1, path2) # 拼接路径
os.path.abspath(os.path.dirname(os.getcwd())) # 获取上级目录
os.path.abspath(os.path.join(os.getcwd(), "../..")) # 获取上上级目录
```

## os.walk()

```python
def walkFile(file):
    for root, dirs, files in os.walk(file):

        # root 表示当前正在访问的文件夹路径
        # dirs 表示该文件夹下的子目录名list
        # files 表示该文件夹下的文件list

        # 遍历文件
        for f in files:
            print(os.path.join(root, f))

        # 遍历所有的文件夹
        for d in dirs:
            print(os.path.join(root, d))
			
walkile('floder_name') # 传入文件夹的名称
```

## SHUTIL 方法

```python
import shutil

shutil.copy("path_old","path_new") # 复制文件 path_old为原来的路径，path_new为新路径
shutil.copytree("floder_old","floder_new") #复制目录和目录下的文件
shutil.move("path_old","path_new") # 移动文件或文件夹
```

## ZIP 文件

压缩：

```python
import os,os.path
import zipfile

def zip_dir(dirname,zipfilename):
    filelist = []
    if os.path.isfile(dirname):
        filelist.append(dirname)
    else :
        for root, dirs, files in os.walk(dirname):
            for name in files:
                filelist.append(os.path.join(root, name))
    zf = zipfile.ZipFile(zipfilename, "w", zipfile.zlib.DEFLATED)
    for tar in filelist:
        arcname = tar[len(dirname):]
        zf.write(tar,arcname)
    zf.close()

zip_dir(dir_name,zip_name) # dir_name：目录名 zip_name：压缩后文件名
```

解压：

```python
import os
import glob
import zipfile

def unzip_file(dir_path):
    # 解压缩后文件的存放路径
    unzip_file_path = r"C:\Users\Desktop\新建文件夹"
    # 找到压缩文件夹
    dir_list = glob.glob(dir_path)
    if dir_list:
        # 循环zip文件夹
        for dir_zip in dir_list:
            # 以读的方式打开
            with zipfile.ZipFile(dir_zip, 'r') as f:
                for file in f.namelist():
                    f.extract(file, path=unzip_file_path)　　# 有密码时需要传入第三个参数pwd
            os.remove(dir_zip)
 
 
unzip_file(r"C:\Users\Desktop\新建文件夹\*.zip")

# 压缩目录下所有文件
def zip_files(dir_path, zip_path):
    """
    :param dir_path: 需要压缩的文件目录
    :param zip_path: 压缩后的目录
    :return:
    """
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as f:
        for root, _, file_names in os.walk(dir_path):
            for filename in file_names:
                f.write(os.path.join(root, filename), filename)
```

## 后缀名查找文件

```python
import os

def getFileName(path):  
    fileName = []  
    f_list = os.listdir(path)  
    for i in f_list:  
        if os.path.splitext(i)[1] == '.html':  
            fileName.append(i)  
    return fileName  
```