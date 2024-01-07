---
author: YOUZAI
title: 主机探测
date: 2023/04/25
categories:
 - 编程学习
tags:
 - Python
---

## 主机存活探测

```python
from random import randint
from scapy.layers.inet import IP, ICMP
from scapy.sendrecv import sr, sr1
import argparse
import math
import threading
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-i",dest="IP",metavar="destip",default="127.0.0.1",help="choose your test ip")
    parser.add_argument("-t",dest="threads",metavar="threads",type=int,default=1,help="choose your numbers of threads")
    args = parser.parse_args()
    scanthreads(args.IP,args.threads)
def scanthreads(IP,threads):
    if '-' in IP:
        num = 0
        result_list = []
        threads_list = []
        temp_list = []
        threads = int(threads)
        ip_numbers = int(IP.split('-')[1]) - int(IP.split('-')[0].split('.')[3]) + 1
        one_thread_num = math.ceil(ip_numbers / threads)
        for i in range(int(IP.split('-')[0].split('.')[3]), int(IP.split('-')[1]) + 2):
            if len(temp_list) == one_thread_num:
                temp_list.append(i)
                result_list.append(temp_list)
                temp_list = []
            elif num == ip_numbers:
                result_list.append(temp_list)
            else:
                temp_list.append(i)
            num = num + 1
        for iptail in result_list:
            threads_list.append(threading.Thread(target=ipcheck, args=(IP, iptail,)))
        for t in threads_list:
            t.start()
    else:
        lookforip(IP)
def ipcheck(IP,ip):
    for i in ip:
        lookforip(IP.split('.')[0]+'.'+IP.split('.')[1]+'.'+IP.split('.')[2]+'.'+str(i))
def lookforip(ip):
    ip_id = randint(1, 65535)
    icmp_id = randint(1, 65535)
    icmp_seq = randint(1, 65535)
    packet = IP(dst=ip, ttl=64, id=ip_id) / ICMP(id=icmp_id, seq=icmp_seq) / b'rootkit'
    result = sr1(packet, timeout=1, verbose=False)
    if result:
        for rcv in result:
            scan_ip = rcv[IP].src
            print(scan_ip + '--->' 'Host is up')
    else:
        print(ip + '--->' 'host is down')
if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("interrupted by user, killing all threads...")
```