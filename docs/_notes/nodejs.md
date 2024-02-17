---
title: Node.js
layout: note
date: 2023-10-29
tags: development
excerpt: Powerful and intuitive translation editor.
---


## Installation

### Install Fast Node Manager (fnm)

(General instructions are at https://github.com/Schniz/fnm#using-a-script-macoslinux.)

1. Install fnm.
    ```shell
    curl -fsSL https://fnm.vercel.app/install | bash
    ```

2. Your `.bashrc` has been updated. `source` it to add `fnm` to your search path without restarting.
    ```shell
    source ~/.bashrc
    ```

### Use fnm to install Node.js

1. Identify which version of Node.js you want/need. For example, 18.15.0.

2. Install Node.js
    ```shell
    fnm install 18.15.0
    ```

## References
- https://github.com/Schniz/fnm
