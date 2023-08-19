---
title: Zoom
layout: note
date: 2023-08-07
excerpt: Privacy-focused Chromium-based browser.
---


https://zoom.us/download
Choose Debian, 64-bit, click Download
Save to ~/Downloads/zoom
(The signing key is not used on the .deb file, so no need to download.)
sudo apt install ./zoom_amd64.deb
Notice (OK): N: Download is performed unsandboxed as root as file '/home/lee/Downloads/zoom/zoom_amd64.deb' couldn't be accessed by user '_apt'. - pkgAcquire::Run (13: Permission denied)

sudo apt install pipewire
reboot

Edit KDE application icon for Zoom
right click, Edit Application...
Application tab
Environment Variables: QT_QPA_PLATFORM=xcb
OK


<!--
Might also have to
Start Zoom
Settings -> Share Screen
Click Advanced
Set Screen capture mode on Wayland to Pipewire Mode
-->
