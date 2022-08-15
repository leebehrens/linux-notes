---
title: ADTPro (Applie Disk Transfer ProDOS)
layout: note
date: 2022-06-09
---

Got an old Apple you want to talk to?

> Apple Disk Transfer ProDOS (ADTPro) transfers physical disks and disk images between Apple II-era computers and the modern world. It can even get your Apple running if you don't have any disks at all. The host (server) component runs on today's computers with Java, and the 8-bit Apple (client) component runs on any Apple II or Apple /// compatible computer with 64k of memory or more.
>
> Source: https://adtpro.com/

## Installation

1. Install Eclipse Temurin Java JDK 8 ({site.url}{page.dir}java.html).

2. Download ADTPro from https://adtpro.com/

3. Unpack the file (version 2.1.0 in the example shown here):
    ```shell
    $ mkdir ADTPro-2.1.0
    $ tar -xvzf ADTPro-2.1.0.tar.gz ADTPro-2.1.0
    ```

4. Start the ADTPro server:
    ```shell
    $ cd ADTPro-2.1.0
    $ ./adtpro.sh
    ```

## References

- https://adtpro.com/install.html
