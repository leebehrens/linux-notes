---
title: Brave Browser
layout: note
date: 2023-07-24
excerpt: Privacy-focused Chromium-based browser.
---

## Installation

1. Obtain the official public package signing keys.
    ```shell
    wget -O- https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.asc | sudo tee /etc/apt/keyrings/brave-browser-archive-keyring.asc
    ```
    <!-- ```shell
    sudo curl -fsSLo /usr/share/keyrings/brave-browser-archive-keyring.gpg https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.gpg
    ``` -->

2. Create the apt source .list file.
    ```shell
    echo "deb [signed-by=/etc/apt/keyrings/brave-browser-archive-keyring.asc] https://brave-browser-apt-release.s3.brave.com/ stable main" | sudo tee /etc/apt/sources.list.d/brave-browser-release.list
    ```
    <!-- ```shell
    echo "deb [signed-by=/usr/share/keyrings/brave-browser-archive-keyring.gpg] https://brave-browser-apt-release.s3.brave.com/ stable main" | sudo tee /etc/apt/sources.list.d/brave-browser-release.list
    ``` -->

3. Update the apt package database and install.
    ```shell
    sudo apt update
    sudo apt install brave-browser
    ```

## Configuration

I'm probably missing a few settings changes from the defaults. Some of these may already be the defaults.
(I am unsure and am noting what I think looks good after having adjusted settings some weeks ago as I write this.)

- [brave://settings/getStarted](brave://settings/getStarted)
    - On startup: *Open the New Tab page*

- [brave://settings/appearance](brave://settings/appearance)
    - Brave colors: *Dark*

- [brave://settings/socialBlocking](brave://settings/socialBlocking)
    - Turn off all

- [brave://settings/privacy](brave://settings/privacy)
    - Automatically send diagnostic reports: *off*
    - Improve search suggestions: *off*

- [brave://settings/search](brave://settings/search)
    - Web Discovery Project: *off*
    - Index other search engines: *off*

- [brave://settings/passwords](brave://settings/passwords)
    - Offer to save passwords: *off*

- [brave://settings/payments](brave://settings/payments)
    - Turn off all

- [brave://settings/downloads](brave://settings/downloads)
    - Location: *(/home/username/Downloads)*
    - Ask where to save each file before downloading: *on*

- [brave://settings/system](brave://settings/system)
    - Memory Saver: *on*

## References
- https://brave.com/linux/#release-channel-installation
