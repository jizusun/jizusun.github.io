---
layout: post
title:  "Tweaks for Android"
categories: tweaks
---

## My Devices
* Kenzo (Redmi Note 3)
* MiPad

Android tips for Chinese Readers
--------------------------------

*   [https://sspai.com/tag/android](https://sspai.com/tag/android)
*   [http://www.appinn.com/category/android/](http://www.appinn.com/category/android/)
*   [http://www.zdfans.com/apk](http://www.zdfans.com/apk)

Google Suite in China
---------------------

*   GApps: [http://opengapps.org/](http://opengapps.org/)
*   Android Nougat: [https://sourceforge.net/projects/resurrectionremix/files/kenzo/](https://sourceforge.net/projects/resurrectionremix/files/kenzo/)
*   Xposed on Nougat: [https://forum.xda-developers.com/redmi-note-3/how-to/guide-installing-xposed-framework-nougat-t3639399](https://forum.xda-developers.com/redmi-note-3/how-to/guide-installing-xposed-framework-nougat-t3639399)
*   LocationReportEnabler: [http://www.appinn.com/location-report-enabler-for-google-location-records/](http://www.appinn.com/location-report-enabler-for-google-location-records/)
*   Google Camera (HDR+): [https://forum.xda-developers.com/redmi-note-3/themes/google-camera-hdr-t3656174](https://forum.xda-developers.com/redmi-note-3/themes/google-camera-hdr-t3656174)

Alternatives for Smartisan OS
-----------------------------

*   大爆炸（BigBang）:
    *   搜索 Lite: [http://www.appinn.com/orekie-search/](http://www.appinn.com/orekie-search/)
*   闪念胶囊”（idea pills）:
    *   方片记事: [https://sspai.com/post/35247](https://sspai.com/post/35247)
    *   Google Keep: [https://www.google.com/keep/](https://www.google.com/keep/)

Alternative for WeChat（微信）
--------------------------

*   Telegram + ehForwarderBot: [https://zhuanlan.zhihu.com/p/25962058](https://zhuanlan.zhihu.com/p/25962058)

## Applications
* Shadowsocks
  * Repo: https://github.com/shadowsocks/shadowsocks/tree/master
  * install: ``pip install shadowsocks``
  * start on boot: add ``sslocal -c your_config_file.json -d start --log-file /var/log/sslocal.log`` in ``/etc/rc.local``
* Aria2
    * [chinese tutorial](https://blog.icehoney.me/posts/2015-01-31-Aria2-download) to help you directly download large files from [pan.baidu.com](http://pan.baidu.com)
    * add the following snippet to `~/.aria/aria2.conf` to enable daemon mode and logging warning to disk, according to [this tutorial](https://blog.icehoney.me/posts/2015-01-31-Aria2-download)
    * start: just run ``aria2c``

```
#log file  
log=/var/log/aria2.log 
log-level=warn 
daemon=true
```
    
* VirtualBox
    * Install **WinXP Deepin Lite** is enough
    * Press ``Right Ctrl (Host Key)`` to stop keyboard capture (by Guest OS), so you can use Host OS hotkey
    * create ``winxp.desktop`` in ``~/.local/share/applications/``

```
[Desktop Entry]
Name=WinXP - VirtualBox
GenericName=PC virtualization solution
Comment=Run several virtual systems on a single host computer
Type=Application
Exec=VBoxManage startvm "WinXP"
TryExec=VirtualBox
MimeType=application/x-virtualbox-vbox;application/x-virtualbox-vbox-extpack;application/x-virtualbox-ovf;application/x-virtualbox-ova;
Icon=virtualbox
Categories=Emulator;Utility;
```
* Terminator
    * install: ``sudo apt install terminator``
    * [some key bindings](http://ubuntumanual.org/posts/285/make-your-work-easy-using-terminator):
        * ``Ctrl+Shift+e/E`` → Vertical tab division
        * ``Ctrl+shift+o/O`` → Horizontal tab division
        * ``Ctrl+Tab`` → Switch between the terminals
        * ``Ctrl+Shift+t/T`` → Tab Division
        * ``Ctrl+Shift+q/Q`` → Quits Terminator
* Shutter: a screentshot utility
* Synapse: Search everything you do, with ``Ctrl + Space``
* Thunderbird: an email client
* Shotwell: an image viewer
* Wiznote: for note-taking, with various desktop and mobile clients
* Insomnia: a beautiful RESTful API client
* WPS Office, Chrome, SublimeText, WebStorm, and more
* Disk usage visualisation tool: http://www.makeuseof.com/tag/linux-disk-space-how-to-visualize-your-usage/
## Configuration
* Keybinding of Openbox: 
    * http://openbox.org/wiki/Help:Bindings
    * https://wiki.archlinux.org/index.php/openbox
    * http://melp.nl/2011/01/10-must-have-key-and-mouse-binding-configs-in-openbox/
    * [Combined Menu to switch between applications](https://bbs.archlinux.org/viewtopic.php?id=124143)
    * ``~/.config/openbox/lubuntu-rc.xml``
* Autostart: 
    * ``~/.config/autostart`` 
    *  ``~/.config/lxsession/Lubuntu/autostart``

## Smoothly switch between VirtualBox virtual machine (vm) and Lubuntu
* First Install **VirtualBox Guest Additions** in your vm
* Send your vm window to your **desktop 2**, and enter **Fullscreen Mode** by hitting **Host + F**
* When focused in vm, first hit ``Host (Right Ctrl)`` to escape **keyboard capture**, then hit ``Ctrl + Alt + ←`` or ``Ctrl + Alt + →`` to switch between **desktop 1** and **desktop 2**
