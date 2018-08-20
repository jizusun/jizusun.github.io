---
layout: post
title:  "改造路由器实现“无痛的科学上网”——其实没那么难"
categories: blogs
author: "孙继祖"
---

本文首先介绍了不同的路由器改造方案。然后结合自己折腾 HG556a 路由器的经历，尽可能通用地介绍了如何在路由器上刷入第三方系统 OpenWRT（LEDE），并安装和配置 ShadowsockR 插件。

## Table of Content
{:.no_toc}

- TOC
{:toc}

## 零、知识准备

### 什么是“无痛的科学上网”
* 科学上网：又称“翻墙” 或“使用代理服务器上网”，指采用科学的手段绕过 GFW 的封锁，访问那些“据说不存在”的网站。
* 无痛的科学上网：又称“透明代理”，指无需对上网终端设备（手机、电脑、电视盒子等）进行额外的设置，即可以实现科学上网。既可以设置为，仅访问国外网站的时候走代理，也可以设置为，仅访问 GFW 列表内的网站走代理。
* 为什么需要：“因为梯子（对所有终端透明）是既空气, 水和 WiFi 以后，程序狗的第四大需求啊....” （<https://www.zhihu.com/question/29475642/answer/44549382>）

### 效果实测

无图无真相——上方是浏览器直连改造后的路由器，下方是浏览器通过本机运行的代理客户端上网（使用 Chrome 的 SwitchyOmega 扩展进行切换）。

因为家里用的是房东提供的共享宽带，所以网速也没有那么快，大概 20Mbps 的样子。本着“只选对的，不选贵的”的原则，我目前正在使用的（也是本文即将介绍的）路由器 Huawei HG556a 是一个很古老的电子设备，大概是 2010 年左右的产品（Broadcom BCM6358 解决方案），实测看 YouTube 720p 依然基本保持流畅。

![image](https://user-images.githubusercontent.com/4011348/44300952-b6cead80-a341-11e8-824f-ac737cc2a485.png)

### 改造，其实只需要三步

改造路由器？乍一听起来可能会觉得挺复杂，但如果具备足够的知识，其实没那么难，或者淘宝买现成改造好的路由器，那就更简单了。

不过，笔者的经历是一个悲伤的“从（想）放弃到入门”的例子，折腾了许久之后，突然觉得自己走了一些弯路，所以才痛下决心写一篇博文，分享一下自己的心得。

目前使用的路由器 HG555a 大概购于5年前，买了之后立马刷上了 OpenWRT，但是刷了之后路由器不太稳定（怀疑当时刷了错误版本的固件），于是开始吃灰。2年前毕业，因为心怀一颗折腾的心，所以没舍得扔。一年前重新刷机，发现其实很稳定，但配置 Shadowsocks 插件没有成功，于是当作普通的路由器用。一个月前，改为配置 ShadowsocksR （下文简称 SSR） 插件，依然没有成功，还自己交叉编译了适合本机的 ipk 文件。一天前的晚上，心有不甘，继续折腾，竟然成功，遂大喜 🤣

本文所谓的“改造”，其实是软件改造，大概只需要三步：
1. 路由器刷入第三方固件，[本文主要介绍如何刷入OpenWRT](#flashing-firmware)
2. 路由器安装翻墙插件（客户端），[本文主要介绍如何安装 ipk 格式的软件](#installing-software)
3. 配置代理帐号（代理服务器信息），[本文主要介绍如何配置 SSR 代理](#setting-up-proxy)

### 灵活多样的改造方案

根据你现有的路由器型号、你的动手能力和你的资金充裕水平，你可以有如下不同的选择：

1. 改造现有的路由器：如果你的设备是 OpenWRT 或者其他第三方固件的支持设备，那么恭喜你 🎉
    1. 如果所需插件也是现成的：你所做的只是下载、安装并配置
    2. 在网上找不到针对你的机型而编译好的某些插件：可以勇敢地学习并尝试如何交叉编译 😉（后文会略微提到一点儿） 
2. 购买一个新的路由器：既可以替换现有的路由器，或者作为现有路由器的上一级路由接入
    1. 原厂自带：比如这个品牌据说还不错 GL-iNet [^gl-inet]
    2. 淘宝店自带刷机服务：**如果你在淘宝里用关键词“openwrt”进行搜索并按销量排序，你会惊讶地发现这样的二手路由器竟然最便宜只要几十块钱。你买回来你唯一做的事情，就是在路由器里配置好代理。**
    2. 自己动手丰衣足食
3. 硬件升级：主要是换更大的闪存和内存，加装天线，增强散热。可以找淘宝店改造，动手能力强的同学也可以自行搜索，
4. 其实还有很多其他的方案，请读者自行脑补……

## 一、刷入第三方固件（以 OpenWRT 为例）
{: #flashing-firmware}

鉴于我用的 Huawei Hg556a 是一个很古老的路由器，所以在本文中，我不会具体地介绍这个型号路由器的相关信息，最多也就是给几个链接出来。更重要的是，我会结合我的刷机经历，介绍如何更好地寻找刷机资源，遇到问题时如何理清头绪。

因为目前路由器解决方案的解决方案主要是 Qualcomm（高通），Broadcom（博通）和 MediaTek（联发科）几家 [^cfan-soc] [^smzdm-soc] 
，所以一手资料主要是英文的。国内的论坛比较热闹，有一些原创内容，但普遍介绍得不够详细，且水贴较多。而我们所说的“第三方固件”，目前流行的主要有 OpenWRT（新版叫 LEDE），Merlin（梅林），老毛子Padavan [^sspai-1] [^sspai-2]，DD-WRT，Tomato等 [^cfan-soc]。我们首先要了解我们的设备是否为某种第三方固件的支持设备（Supported devices）。

首先当然要知道你的路由器型号，这个很容易从路由器的背面上看到。比如我的路由器型号是 HG556a ，我就搜索 “hg556a 固件”，发现搜索结果，除了一些博客之外，主要来自于恩山论坛(<http://www.right.com.cn>) 的帖子，大概浏览一下，我就是知道，社区普遍给这个型号的路由器刷 OpenWRT。

而且有意思的是，在稍微靠下的位置，竟然还有 OpenWRT 官网的一个页面 [Huawei EchoLife HG556a [OpenWrt Wiki]](https://wiki.openwrt.org/toh/huawei/hg556a)，这就很棒了——
这里基本上有最全面和权威的信息！

![image](https://user-images.githubusercontent.com/4011348/44322792-b76e5d80-a481-11e8-9d04-1844c0b38668.png)

不过，到目前为止，我们还没来得及解释一下什么是 OpenWRT。我从官网摘录了几段话[^openwrt-about]（懒得翻译了😆）：

> OpenWrt ​is a highly extensible ​GNU/​Linux ​distribution for embedded devices ​(typically wireless routers). Unlike many other distributions for these routers, OpenWrt ​is built from the ground up to be a full-featured, easily modifiable operating system for your router. In practice, this means that you can have all the features you need with none of the bloat, powered by a Linux kernel ​that's more recent than most other distributions. 
>
> For users, this means the freedom of full customization, allowing the use of an embedded device in ways the vendor never envisioned.
>
> * Free and open-source. The project is entirely free and open-source, licensed under the GPL. The project is intended to always be hosted at an easily accessible site, with full source code readily available and easy to build.
> * Easy and free access. The project will always be open to new contributors and have a low barrier for participation. Anyone shall be able to contribute. We, the current developers, actively grant write access to anyone interested in having it. We believe people are responsible when given responsibility. Just ask and you will be able to acquire the access rights you need.
> * Community driven. This is not about 'us' offering 'you' something, it is about everyone coming together to work and collaborate towards a common goal.

概括地来说，OpenWRT 有如下特点：
* 是一个 GNU/Linux 发行版，所以如果想稍微深入的话，需要了解一些 Linux 知识
* 高度的可扩展性/可定制性：为了避免过于臃肿，OpenWRT 本身只是一个框架。为了实现你个性化需求，你还需要再安装其他软件包。除了使用 Linux 命令行管理之外。OpenWRT 它还提供了一套 Web 管理界面 [LuCi](https://wiki.openwrt.org/doc/howto/luci.essentials)。
* 免费且开源：如果你使用官方发布的固件，那么路由器固件里被埋藏“后门”的可能性极小，而且是免费的。


* OpenWRT 的包管理系统：https://wiki.openwrt.org/doc/techref/opkg
* OpenWRT 的 SSH 登录
* OpenWRT 的软件仓库：


* OpenWrt: <https://openwrt.org/>
* LEDE 17.01 "Reboot": <https://openwrt.org/releases/17.01/start>

### 稳定放心：来自官方网站

### 功能丰富：来自论坛博客

https://forum.openwrt.org/

## 二、安装插件（以 ipk 格式为例）
{: #installing-software}

Shadowsocks, ShadowsockR, V2Ray 等

### 首选：别人编译好的安装包

一般是在 GitHub 上开源的插件，在 Release 页下载。

### 其次：自己进行编译

如果你恰巧有一个和我同型号的路由器 Huawei HG556a ，那么可以用我编译好的 [ShadowsocksR 插件](https://github.com/ywb94/openwrt-ssr/issues/189) 

## 三、配置插件（以 ShadowsockR 代理为例）
{: #seting-up-proxy}

### 快捷：网上购买


### 稳定：自行搭建

## 扩展阅读

[^cfan-soc]: [路由器芯的秘密全在这里了！ - 电脑爱好者](http://www.cfan.com.cn/2017/1115/129723.shtml)

[^smzdm-soc]: [看“芯”识Router，讲解中高端WiFi Soc的无线路由器选购技巧 - 什么值得买](https://post.smzdm.com/p/433680/)

[^gl-inet]: [适合折腾OpenWRT/LEDE的随身迷你路由器GL-iNet GL-MT300A - Chiphell](https://www.chiphell.com/thread-1665582-1-1.html)

[^sspai-1]: [我怎么就又开始折腾了呢：连路由器都不放过 - 少数派](https://sspai.com/post/35959)

[^sspai-2]: [我怎么就又开始折腾了呢：路由器的别样履职姿势 - 少数派](https://sspai.com/post/36227)

[^openwrt-about]: [OpenWrt Project: About the OpenWrt/LEDE project](https://openwrt.org/about)