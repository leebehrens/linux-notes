---
title: Signal
layout: note
date: 2023-07-24
excerpt: Full-featured, privacy-focused messager.
---

## Installation

{{site.callout_note}} These instructions only work for Intel/AMD 64-bit Debian, etc.

1. Obtain the official public package signing keys.
    ```shell
    wget -O- https://updates.signal.org/desktop/apt/keys.asc | sudo tee /etc/apt/keyrings/signal-desktop-keyring.asc
    ```

2. Create the apt source .list file.
    ```shell
    echo 'deb [arch=amd64 signed-by=/usr/share/keyrings/signal-desktop-keyring.asc] https://updates.signal.org/desktop/apt xenial main' | sudo tee /etc/apt/sources.list.d/signal-xenial.list
    ```

3. Update the apt package database and install.
    ```shell
    sudo apt update
    sudo apt install signal-desktop
    ```

## References
- https://www.signal.org/download/
