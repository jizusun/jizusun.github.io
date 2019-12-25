---
layout: post
title: "极客时间: 学习笔记"
categories: draft
---

- [Linux 内存性能优化（讲师：倪朋飞）](#linux-%e5%86%85%e5%ad%98%e6%80%a7%e8%83%bd%e4%bc%98%e5%8c%96%e8%ae%b2%e5%b8%88%e5%80%aa%e6%9c%8b%e9%a3%9e)
  - [课程介绍](#%e8%af%be%e7%a8%8b%e4%bb%8b%e7%bb%8d)
  - [课程目录](#%e8%af%be%e7%a8%8b%e7%9b%ae%e5%bd%95)
  - [01 基础篇 Linux 内存是怎么工作的](#01-%e5%9f%ba%e7%a1%80%e7%af%87-linux-%e5%86%85%e5%ad%98%e6%98%af%e6%80%8e%e4%b9%88%e5%b7%a5%e4%bd%9c%e7%9a%84)
  - [02 基础篇 怎么理解内存中的 Buffer 和 Cache ？](#02-%e5%9f%ba%e7%a1%80%e7%af%87-%e6%80%8e%e4%b9%88%e7%90%86%e8%a7%a3%e5%86%85%e5%ad%98%e4%b8%ad%e7%9a%84-buffer-%e5%92%8c-cache)
    - [free 数据的来源](#free-%e6%95%b0%e6%8d%ae%e7%9a%84%e6%9d%a5%e6%ba%90)
    - [场景 1：磁盘和文件写案例](#%e5%9c%ba%e6%99%af-1%e7%a3%81%e7%9b%98%e5%92%8c%e6%96%87%e4%bb%b6%e5%86%99%e6%a1%88%e4%be%8b)
      - [写文件](#%e5%86%99%e6%96%87%e4%bb%b6)
      - [写磁盘](#%e5%86%99%e7%a3%81%e7%9b%98)
    - [场景 2：磁盘和文件读案例](#%e5%9c%ba%e6%99%af-2%e7%a3%81%e7%9b%98%e5%92%8c%e6%96%87%e4%bb%b6%e8%af%bb%e6%a1%88%e4%be%8b)
      - [读文件](#%e8%af%bb%e6%96%87%e4%bb%b6)
  - [03 案例篇：如何利用系统缓存优化程序的运行效率？](#03-%e6%a1%88%e4%be%8b%e7%af%87%e5%a6%82%e4%bd%95%e5%88%a9%e7%94%a8%e7%b3%bb%e7%bb%9f%e7%bc%93%e5%ad%98%e4%bc%98%e5%8c%96%e7%a8%8b%e5%ba%8f%e7%9a%84%e8%bf%90%e8%a1%8c%e6%95%88%e7%8e%87)
    - [缓存命中率](#%e7%bc%93%e5%ad%98%e5%91%bd%e4%b8%ad%e7%8e%87)
    - [指定文件的缓存大小](#%e6%8c%87%e5%ae%9a%e6%96%87%e4%bb%b6%e7%9a%84%e7%bc%93%e5%ad%98%e5%a4%a7%e5%b0%8f)
    - [案例一 dd](#%e6%a1%88%e4%be%8b%e4%b8%80-dd)
    - [案例二 文件读写](#%e6%a1%88%e4%be%8b%e4%ba%8c-%e6%96%87%e4%bb%b6%e8%af%bb%e5%86%99)
  - [04 案例篇：内存泄漏了，我该如何定位和处理？](#04-%e6%a1%88%e4%be%8b%e7%af%87%e5%86%85%e5%ad%98%e6%b3%84%e6%bc%8f%e4%ba%86%e6%88%91%e8%af%a5%e5%a6%82%e4%bd%95%e5%ae%9a%e4%bd%8d%e5%92%8c%e5%a4%84%e7%90%86)
    - [内存的分配与回收](#%e5%86%85%e5%ad%98%e7%9a%84%e5%88%86%e9%85%8d%e4%b8%8e%e5%9b%9e%e6%94%b6)
    - [案例](#%e6%a1%88%e4%be%8b)


#  Linux 内存性能优化（讲师：倪朋飞）

https://time.geekbang.org/column/intro/251

## 课程介绍

我们都知道，内存管理机制用来管理系统和应用程序的指令、数据和缓存等，是操作系统核心的功能之一。内存管理可以让计算机对应用程序资源进行合理的分配与使用，以便保证系统的正常运行。

作为使用广泛的操作系统，Linux 管理内存的机制有其独特性，遇到的内存问题也常常会让我们感到困惑：

*   Buffer 和 Cache 的区别是什么？它们分别存储哪些数据？
*   内存泄漏时，如何定位？
*   Swap 变高的原因是什么？如何解决？

这个专栏带你从内存的原理入手，学习内存性能分析所需的基础知识和常见思路。在内容上划分为三个不同的篇章，让你一边学一边练：

*   基础篇，介绍内存的基本原理以及对应的性能指标和性能工具；
*   案例篇，通过上手实际案例，教你定位内存瓶颈，学会进一步分析并找出解决方案；
*   套路篇，概括内存性能问题通用的分析和优化套路。

倪朋飞，微软 Azure 资深工程师，主要负责开源容器编排系统 Kubernetes 在 Azure 的落地实践。他曾任职于盛大云和腾讯，一直从事云计算领域，特别专注于 IaaS 和容器技术。而近十年的云计算工作经验，也让他对 Linux 的系统原理、常见的性能问题以及优化方式了如指掌。

在专栏里，他将带你系统学习 Linux 内存性能优化，让你掌握常见的内存优化指标和工具，并通过实战总结出实用的内存优化方案，轻松解决 Linux 内存性能问题。

## 课程目录


- 01  基础篇：Linux内存是怎么工作的？
- 02  基础篇：怎么理解内存中的Buffer和Cache？
- 03  案例篇：如何利用系统缓存优化程序的运行效率？
- 04  案例篇：内存泄漏了，我该如何定位和处理？
- 05  案例篇：为什么系统的Swap变高了（上）
- 06  案例篇：为什么系统的Swap变高了？（下）
- 07  套路篇：如何“快准狠”找到系统内存的问题？

## 01 基础篇 Linux 内存是怎么工作的

## 02 基础篇 怎么理解内存中的 Buffer 和 Cache ？
https://time.geekbang.org/column/article/161667

### free 数据的来源

```
# 注意不同版本的 free 输出可能会有所不同
$ free
              total        used        free      shared  buff/cache   available
Mem:        8169348      263524     6875352         668     1030472     7611064
Swap:             0           0           0
```

缓存：内存中的临时存储，包含 Buffer 和 Cache

```
man free

buffers: Memory used by kernel buffers (Buffers in /proc/meminfo)
cache:  Memory used by the page cache and slabs (Cached and SReclaimable in /proc/meminfo)
buff/cache: Sum of buffers and cache
```

`/proc` 是Linux内核提供的一种特殊文件系统， 是用户跟内核交互的接口。


```

Buffers %lu
    Relatively temporary storage for raw disk blocks that shouldn't get tremendously large (20MB or so).

Cached %lu
   In-memory cache for files read from the disk (the page cache).  Doesn't include SwapCached.
...
SReclaimable %lu (since Linux 2.6.19)
    Part of Slab, that might be reclaimed, such as caches.
    
SUnreclaim %lu (since Linux 2.6.19)
    Part of Slab, that cannot be reclaimed on memory pressure.
```

机器配置
```
apt install sysstat
```

```
# 清理文件页、目录项、Inodes等各种缓存
$ echo 3 > /proc/sys/vm/drop_caches

# 每隔1秒输出1组数据
$ vmstat 1
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
0  0      0 7743608   1112  92168    0    0     0     0   52  152  0  1 100  0  0
0  0      0 7743608   1112  92168    0    0     0     0   36   92  0  0 100  0  0
```
- buff 和 cache 就是我们前面看到的 Buffers 和 Cache，单位是 KB。
- bi 和 bo 则分别表示块设备读取和写入的大小，单位为块 / 秒。因为 Linux 中块的大小是 1KB，所以这个单位也就等价于 KB/s。

### 场景 1：磁盘和文件写案例

#### 写文件

```
# 通过读取随机设备，生成一个 500MB 大小的文件
$ dd if=/dev/urandom of=/tmp/file bs=1M count=500
```

通过观察 vmstat 的输出，我们发现，在 dd 命令运行时， Cache 在不停地增长，而 Buffer 基本保持不变。

再进一步观察 I/O 的情况，你会看到，
- 在 Cache 刚开始增长时，块设备 I/O 很少，bi 只出现了一次 488 KB/s，bo 则只有一次 4KB。而过一段时间后，才会出现大量的块设备写，比如 bo 变成了 122880。
- 当 dd 命令结束后，Cache 不再增长，但块设备写还会持续一段时间，并且，多次 I/O 写的结果加起来，才是 dd 要写的 500M 的数据。

#### 写磁盘

```
# 下面的命令对环境要求很高，需要你的系统配置多块磁盘，并且磁盘分区 /dev/sdb1 还要处于未使用状态。如果你只有一块磁盘，千万不要尝试，否则将会对你的磁盘分区造成损坏。
# 首先清理缓存
$ echo 3 > /proc/sys/vm/drop_caches
# 然后运行dd命令向磁盘分区/dev/sdb1写入2G数据
$ dd if=/dev/urandom of=/dev/sdb1 bs=1M count=2048
```


### 场景 2：磁盘和文件读案例

#### 读文件
```
# 首先清理缓存
$ echo 3 > /proc/sys/vm/drop_caches
# 运行dd命令读取文件数据
$ dd if=/tmp/file of=/dev/null
```

观察 vmstat 的输出，你会发现读取文件时（也就是 bi 大于 0 时），Buffer 保持不变，而 Cache 则在不停增长。这跟我们查到的定义“Cache 是对文件读的页缓存”是一致的。

```
# 首先清理缓存
$ echo 3 > /proc/sys/vm/drop_caches
# 运行dd命令读取文件
$ dd if=/dev/sda1 of=/dev/null bs=1M count=1024
```

观察 vmstat 的输出，你会发现读磁盘时（也就是 bi 大于 0 时），Buffer 和 Cache 都在增长，但显然 Buffer 的增长快很多。这说明读磁盘时，数据缓存到了 Buffer 中。

**Buffer 是对磁盘数据的缓存，而 Cache 是文件数据的缓存，它们既会用在读请求中，也会用在写请求中**


我们已经知道，可以使用 ps、top 或者 proc 文件系统，来获取进程的内存使用情况。那么，如何统计出所有进程的物理内存使用量呢？

提示：要避免重复计算多个进程同时占用的内存，像是页缓存、共享内存这类。如果你把 ps、top 得到的数据直接相加，就会出现重复计算的问题。

这里，我推荐从 /proc/< pid >/smaps 入手。前面内容里，我并没有直接讲过 /proc/< pid >smaps 文件中各个指标含义，所以，需要你自己动手查 proc 文件系统的文档，解读并回答这个问题。


## 03 案例篇：如何利用系统缓存优化程序的运行效率？ 

### 缓存命中率

命中率越高，表示使用缓存带来的收益越高，应用程序的性能也就越好。

cachestat 和 cachetop ，它们正是查看系统缓存命中情况的工具。
- cachestat 提供了整个操作系统缓存的读写命中情况。
- cachetop 提供了每个进程的缓存命中情况。

安装 `bcc` 软件包 https://github.com/iovisor/bcc

```sh
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 4052245BD4284CDD
echo "deb https://repo.iovisor.org/apt/xenial xenial main" | sudo tee /etc/apt/sources.list.d/iovisor.list
sudo apt-get update
sudo apt-get install -y bcc-tools libbcc-examples linux-headers-$(uname -r)

$ export PATH=$PATH:/usr/share/bcc/tools
```


```sh
$ cachestat 1 3
   TOTAL   MISSES     HITS  DIRTIES   BUFFERS_MB  CACHED_MB
       2        0        2        1           17        279
       2        0        2        1           17        279
       2        0        2        1           17        279 
```
- TOTAL ，表示总的 I/O 次数；
- MISSES ，表示缓存未命中的次数；
- HITS ，表示缓存命中的次数；
- DIRTIES， 表示新增到缓存中的脏页数；
- BUFFERS_MB 表示 Buffers 的大小，以 MB 为单位；
- CACHED_MB 表示 Cache 的大小，以 MB 为单位。

```
$ cachetop
11:58:50 Buffers MB: 258 / Cached MB: 347 / Sort: HITS / Order: ascending
PID      UID      CMD              HITS     MISSES   DIRTIES  READ_HIT%  WRITE_HIT%
13029 root     python                  1        0        0     100.0%       0.0%
```

### 指定文件的缓存大小

指定文件在内存中的缓存大小。你可以使用 pcstat 这个工具，来查看文件在内存中的缓存大小以及缓存比例。

https://github.com/tobert/pcstat

```sh
$ export GOPATH=~/go
$ export PATH=~/go/bin:$PATH
$ go get golang.org/x/sys/unix
$ go get github.com/tobert/pcstat/pcstat
```

```sh
$ pcstat /bin/ls
+---------+----------------+------------+-----------+---------+
| Name    | Size (bytes)   | Pages      | Cached    | Percent |
|---------+----------------+------------+-----------+---------|
| /bin/ls | 133792         | 33         | 0         | 000.000 |
+---------+----------------+------------+-----------+---------+



$ ls
$ pcstat /bin/ls
+---------+----------------+------------+-----------+---------+
| Name    | Size (bytes)   | Pages      | Cached    | Percent |
|---------+----------------+------------+-----------+---------|
| /bin/ls | 133792         | 33         | 33        | 100.000 |
+---------+----------------+------------+-----------+---------+
```


### 案例一 dd

```

# 生成一个512MB的临时文件
$ dd if=/dev/sda1 of=file bs=1M count=512
# 清理缓存
$ echo 3 > /proc/sys/vm/drop_caches

# 确认刚刚生成的文件不在缓存中
$ pcstat file
+-------+----------------+------------+-----------+---------+
| Name  | Size (bytes)   | Pages      | Cached    | Percent |
|-------+----------------+------------+-----------+---------|
| file  | 536870912      | 131072     | 0         | 000.000 |
+-------+----------------+------------+-----------+---------+


# 每隔5秒刷新一次数据
$ cachetop 5


# 运行 dd 命令测试文件的读取速度
$ dd if=file of=/dev/null bs=1M
512+0 records in
512+0 records out
536870912 bytes (537 MB, 512 MiB) copied, 16.0509 s, 33.4 MB/s


# 查看 cachetop 界面的缓存命中情况
PID      UID      CMD              HITS     MISSES   DIRTIES  READ_HIT%  WRITE_HIT%
...
    3264 root     dd                  37077    37330        0      49.8%      50.2%

# 再次执行刚才的 dd 命令
$ dd if=file of=/dev/null bs=1M
512+0 records in
512+0 records out
536870912 bytes (537 MB, 512 MiB) copied, 0.118415 s, 4.5 GB/s

# 看看 cachetop 的情况
10:45:22 Buffers MB: 4 / Cached MB: 719 / Sort: HITS / Order: ascending
PID      UID      CMD              HITS     MISSES   DIRTIES  READ_HIT%  WRITE_HIT%
...
   32642 root     dd                 131637        0        0     100.0%       0.0%

# 再次执行 pcstat 查看文件 file 的缓存情况
$ pcstat file
+-------+----------------+------------+-----------+---------+
| Name  | Size (bytes)   | Pages      | Cached    | Percent |
|-------+----------------+------------+-----------+---------|
| file  | 536870912      | 131072     | 131072    | 100.000 |
+-------+----------------+------------+-----------+---------+
```


### 案例二 文件读写


接下来，我们再来看一个文件读写的案例。这个案例类似于前面学过的不可中断状态进程的例子。它的基本功能比较简单，也就是每秒从磁盘分区 /dev/sda1 中读取 32MB 的数据，并打印出读取数据花费的时间。

https://github.com/feiskyer/linux-perf-examples/tree/master/io-cached

```
# 每隔5秒刷新一次数据
$ cachetop 5 


$ docker run --privileged --name=app -itd feisky/app:io-direct


$ docker logs app
Reading data from disk /dev/sdb1 with buffer size 33554432
Time used: 0.929935 s to read 33554432 bytes
Time used: 0.949625 s to read 33554432 bytes

```


## 04 案例篇：内存泄漏了，我该如何定位和处理？

通过前几节对内存基础的学习，我相信你对 Linux 内存的工作原理，已经有了初步了解。

- 对普通进程来说，能看到的其实是内核提供的虚拟内存，这些虚拟内存还需要通过页表，由系统映射为物理内存。
- 当进程通过 malloc() 申请虚拟内存后，系统并不会立即为其分配物理内存，而是在首次访问时，才通过缺页异常陷入内核中分配内存。
- 为了协调 CPU 与磁盘间的性能差异，Linux 还会使用 Cache 和 Buffer ，分别把文件和磁盘读写的数据缓存到内存中。

### 内存的分配与回收

- 栈：举个例子，你在程序中定义了一个局部变量，比如一个整数数组`int data[64]`，就定义了一个可以存储 64 个整数的内存段。由于这是一个局部变量，它会从内存空间的栈中分配内存。栈内存由系统自动分配和管理。一旦程序运行超出了这个局部变量的作用域，栈内存就会被系统自动回收，所以不会产生内存泄漏的问题。
- 堆：再比如，很多时候，我们事先并不知道数据大小，所以你就要用到标准库函数`malloc()_`，_ 在程序中动态分配内存。这时候，系统就会从内存空间的堆中分配内存。堆内存由应用程序自己来分配和管理。除非程序退出，这些堆内存并不会被系统自动释放，而是需要应用程序明确调用库函数`free()`来释放它们。如果应用程序没有正确释放堆内存，就会造成内存泄漏。
- 只读段：包括程序的代码和常量，由于是只读的，不会再去分配新的内存，所以也不会产生内存泄漏。
- 数据段：包括全局变量和静态变量，这些变量在定义时就已经确定了大小，所以也不会产生内存泄漏。
- 最后一个内存映射段：包括动态链接库和共享内存，其中共享内存由程序动态分配和管理。所以，如果程序在分配后忘了回收，就会导致跟堆内存类似的泄漏问题。

**内存泄漏的危害非常大，这些忘记释放的内存，不仅应用程序自己不能访问，系统也不能把它们再次分配给其他应用。内存泄漏不断累积，甚至会耗尽系统内存。**

### 案例

接下来，我们就用一个计算斐波那契数列的案例，来看看内存泄漏问题的定位和处理方法。

环境准备

```sh
# install sysstat docker
sudo apt-get install -y sysstat docker.io

# Install bcc
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 4052245BD4284CDD
echo "deb https://repo.iovisor.org/apt/bionic bionic main" | sudo tee /etc/apt/sources.list.d/iovisor.list
sudo apt-get update
sudo apt-get install -y bcc-tools libbcc-examples linux-headers-$(uname -r)
```

运行

```sh
# 运行fabonacci程序
$ docker run --name=app -itd feisky/app:mem-leak
# 查看log
$ docker logs app
2th => 1
3th => 2
4th => 3
5th => 5
6th => 8
7th => 13
# 查看内存使用的趋势

# 每隔3秒输出一组数据
$ vmstat 3
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
0  0      0 6601824  97620 1098784    0    0     0     0   62  322  0  0 100  0  0
0  0      0 6601700  97620 1098788    0    0     0     0   57  251  0  0 100  0  0
0  0      0 6601320  97620 1098788    0    0     0     3   52  306  0  0 100  0  0
0  0      0 6601452  97628 1098788    0    0     0    27   63  326  0  0 100  0  0
2  0      0 6601328  97628 1098788    0    0     0    44   52  299  0  0 100  0  0
0  0      0 6601080  97628 1098792    0    0     0     0   56  285  0  0 100  0  0 
```

从输出中你可以看到，内存的 free 列在不停的变化，并且是下降趋势；而 buffer 和 cache 基本保持不变。

未使用内存在逐渐减小，而 buffer 和 cache 基本不变，**这说明，系统中使用的内存一直在升高。但这并不能说明有内存泄漏，因为应用程序运行中需要的内存也可能会增大。比如说，程序中如果用了一个动态增长的数组来缓存计算结果，占用内存自然会增长。**


这里，我介绍一个专门用来检测内存泄漏的工具，`memleak`。`memleak` 可以跟踪系统或指定进程的内存分配、释放请求，然后定期输出一个未释放内存和相应调用栈的汇总情况（默认 5 秒）。

```sh

# -a 表示显示每个内存分配请求的大小以及地址
# -p 指定案例应用的PID号
$ /usr/share/bcc/tools/memleak -a -p $(pidof app)
WARNING: Couldn't find .text section in /app
WARNING: BCC can't handle sym look ups for /app
    addr = 7f8f704732b0 size = 8192
    addr = 7f8f704772d0 size = 8192
    addr = 7f8f704712a0 size = 8192
    addr = 7f8f704752c0 size = 8192
    32768 bytes in 4 allocations from stack
        [unknown] [app]
        [unknown] [app]
        start_thread+0xdb [libpthread-2.27.so] 
```