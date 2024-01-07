---
author: YOUZAI
title: 容器技术
date: 2023/05/11
categories:
 - 云原生安全
tags:
 - 容器技术
---

## 简介

容器是一种沙盒技术，是一种内核轻量级的操作系统层虚拟化技术，主要目的是为了将应用运行在其中，与外界隔离，及方便这个沙盒可以被转移到其它宿主机器。本质上，它是一个特殊的进程。通过名称空间（==Namespace==）、控制组（==Control groups==）、切根（==chroot==）技术把资源、文件、设备、状态和配置划分到一个独立的空间。

通俗点的理解就是一个装应用软件的箱子，箱子里面有软件运行所需的依赖库和配置。开发人员可以把这个箱子搬到任何机器上，且不影响里面软件的运行。

## Linux 容器

> Linux 容器主要由 **namespace** 和 **cgroups** 两大机制来保证实现。

* Docker 容器本质是宿主机的进程。
* 通过 Namespace 实现资源隔离。
* 通过 Cgroups 实现了资源限制。

### namespace

namespace 是对系统资源的一种封装，可以使得进程看起来拥有独立的资源一样，可以用 namespace 技术来实现容器。命名空间将全局资源抽象，命名空间内部的进程看起来拥有一个全局资源实际上是一个**隔离资源**，命名空间内的变动**同命名空间进程可感知，不同不可感知**。

|命名空间|作用|
|:-|:-|
|Mount|隔离文件系统挂载点|
|UTS|隔离主机名，实际隔离`nodename`和`domainname`|
|IPC|隔离进程间通信、信号量和消息队列等|
|PID|隔离进程ID空间|
|Network|隔离网络包括网络接口、驱动、路由表、防火墙等|
|User|隔离 UserID 和 GroupID 以及其对应的能力|

namespace 有==三个系统调用==可以使用。

* `clone()`：实现线程的系统调用，用来创建一个新的进程，并可以通过设计上述参数达到隔离。
* `unshare()`：使某个进程脱离某个 namespace。
* `setns(int fd, int nstype)`：把某个进程加入到某个 namespace。

#### 理解

实际上，即使用户没有手动创建 Linux Namespace，Linux 系统开机后也会创建一个默认的 Namespace，称为 **root namespace**，所有进程默认都运行在这个 Namespace 中，每个进程都认为自己拥有该 Namespace 中的所有系统全局资源。

![](/images/namespace.png)

查看某个进程运行在哪一个 namespace 中，即该进程享有的独立资源来自哪一个 namespace：

```shell
# ps -ef 查看进程状况
# ls -l /proc/<PID>/ns
ls -l /proc/$$/ns | awk '{print $1,$(NF-2),$(NF-1),$NF}'
sudo ls -l /proc/1/ns | awk '{print $1,$(NF-2),$(NF-1),$NF}'
```

![](/images/image-20220512160741828.png)

每一个文件都是一个软链接，所指向的文件是一串格式特殊的名称。冒号后面中括号内的数值表示该 Namespace 的`inode`，如果不同进程的 namespace inode 相同，说明这些进程属于同一个 namespace。pid=$$表示当前shell进程。上图中每个进程都运行在多个 namespace 中，进程之间的 inode 相同，证明运行在相同的 namespace 中。

### cgroups

cgroups 全称为`linux Control Group`，crgroups 为每种可以控制的资源定义了一个子系统，它的主要作用就是限制一个进程组能够使用cpu、内存、磁盘、带宽等资源的上限，提供以下功能：

* 限制资源使用，各种子系统的资源限制。
* 优先级控制，cpu 使用、内存、磁盘 io 吞吐等。
* 资源使用报告，可以用来计费。
* 控制，挂起、恢复进程。

cgroups 中的三个组件：

* cgroup

对进程分组管理的一种机制,一个 cgroup 包含一组进程,并可以在这个 cgroup 上增加 Linux subsystem 的各种参数配置,将一组进程和一组 subsystem 的系统参数关联起来，**可以理解为按照某种资源控制标准划分而成的任务组，包含一个或多个进程**。

* subsystem

一组资源控制的模块。

查看子系统：

```sh
mount -t cgroup
```

![](/images/image-20220512165740764.png)

|子系统名称|描述|
|:-|:-|
|systemd|维护的自己使用子系统|
|cpuset|如果为多核 cpu，可以为 cgroups 中的任务分配单独的 cpu 和内存|
|hugetlb|主要针对于 HugeTLB 系统进行限制，这是一个大页文件系统|
|freezer|挂起或者恢复 cgroups 中的进程|
|memory|设置每个 cgroup 的内存限制以及产生内存资源报告|
|perf_event| 可以监测属于某个特定的 group 的所有线程以及运行在特定 CPU 上的线程|
|pids|限制 cgroup 的进程数，里面有各种策略|
| net_cls,net_prio|标记 cgroups 中进程的网络数据包，可以使用 tc 模块（traffic control）对数据包进行控制|
|devices|控制进程能够访问某些设备|
|blkio|限制进程的块设备（磁盘、usb）的输入/输出存取限制|
|cpu|限制进程的 cpu 使用率|

每个 subsystem 会关联到定义了相应限制的 cgroup 上,并对这个 cgroup 中的进程做相应的限制和控制。

查看虚拟文件系统：

```sh
cd /sys/fs/cgroup
ls -l
```

![](/images/image-20220513114639726.png)

* hierarchy

hierarchy 的功能是把一组 cgroup 串成一个树状结构,一个这样的树便是一个 hierarchy 。通过这种树状结构,  groups 可以做到继承。

系统对一组进程使用`cgroup_1`进行 CPU 使用率的限制，而其中的进程2需要在基础上限制 I/O 速率，可以使用`cgroup_2`，它继承于 cgroup_1，即在限制 CPU 使用率的基础上限制进程2的 I/O 速率。

![](/images/image-20220513093855075.png)
