---
title: Installing Debian 11 (Bullseye) on a Lenovo Thinkpad T470
layout: note
date: 2022-03-19
---

2021-12-05 I upgraded from Debian 10 (Buster) via full installation.

## What you'll need

- Computer (I'm using a Lenovo Thinkpad T470)
- USB drive, to boot the installer
- Ethernet cable (because of Debian install quirk Debian on Thinkpad)
- USB drive or other means of backing up your data

## Backup your data

Back up everything in `~/`. I backed up to a USB drive, so that I would have access to any files I might need before regaining ready access to my cloud storage.

Although I didn't, it probably doesn't hurt to backup some system config files, `/etc/apt/sources.list.d/`, etc. for possible reference.


## Obtain image

1. In a browser open [http://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/current/amd64/iso-cd/](http://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/current/amd64/iso-cd/)

    {{site.callout_note}} At the time of this writing the current version is Debian 11.1. Versions previous to current can be found by going to [http://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/archive/](http://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/archive/) ➤ `<version>+nonfree/` ➤ `amd64/` ➤ `iso-cd/` |

2. Scroll to the bottom of the page and download
    - firmware-11.1.0-amd64-netinst.iso
    - SHA512UMS
    - SHA512UMS.sign

2. Recommended: validate the checksum file (https://www.debian.org/CD/verify)

3. Validate checksum of ISO image
    ```shell
    $ sha512sum firmware-11.1.0-amd64-netinst.iso
    ```

4. Insert a USB drive. Disks shows /dev/sdxx name for unmounting USB drive.

5. ```shell
    $ sudo umount /dev/sdb1
    ```

    {{site.callout_caution}} Make sure you choose the correct drive!

6. ```shell
    $ sudo mkfs.vfat /dev/sdb -I
    ```

7. ```shell
    $ sudo cp firmware-11.1.0-amd64-netinst.iso /dev/sdb
    ```

## Installation

1. Boot from the USB drive to run the installer

2. Select install type: *Graphical install* (or *Install*)

3. Select a language: *English* (default)

4. Select your location: *United States* (default)

5. Configure keyboard: *American English* (default)

    Hardware detection and loading steps will take a few momements.

6. Configure the network:

    1. Primary network interface: *(wired interface)*

        {{site.callout_caution}} Use a wired network interface even if you have a wireless interface. If you choose wireless, you will be asked to choose the wireless network SSID, encryption method, and password per expected usual. The install will complete smoothly. However, once the system boots you are likely to find that you can't access the internet with any kind of connection. Unable to get the network working, I had to resort to reinstalling using the wired interface.

    2. Hostname: *(debian is the default)*

    3. Domain name: *(local)*

7. Set up users and passwords

    1. Root: *(leave password blank to disables root account)*

    2. Full name for new user: *(your name)*

    3. Username for your account: *(default is first name all lowercase)*

    4. Choose a password for new user: *(password)*

    5. Verify password: *(password)*

8. Configure the clock: *(select local time zone)*

9. Partition disks

    **Without encryption**

    1. Partitioning method: *Guided – use entire disk*

        {{site.callout_note}} If you choose *Guided – use entire disk and set up encrypted LVM*, you will have to provide the encryption passphrase every time you start your system.

    2. Select disk to partition

        {{site.callout_caution}} Be careful to choose the correct disk!

    3. Partitioning scheme: All files in one partition (recommended for new users) (default)

        {{site.callout_note}} I looked at the various paritioning schemes, and ultimatly decided there wasn't enough benefit to me to use one of the multi-partition schemes.

    4. This is an overview of your currently configured partitions and mount points: *Finish partitioning and write changes to disk*

    5. Write changes to disk? *Yes* (default)

        {{site.callout_caution}} This is your last chance before your drive is wiped!

    **With encryption**

    1. Partitioning method: Guided – use entire disk and set up encrypted LVM

        {{site.callout_note}} You will have to provide the encryption passphrase every time you start your system.

    2. Select disk to partition (be careful to choose the correct one!)

    3. Partitioning scheme: *All files in one partition (recommended for new users)* (default)

    4. Write changes to disks and configure LVM? *Yes*

        {{site.callout_caution}} This is your last chance before your drive is wiped!

    5. Your drive is filled with random data. This will take a while.

    6. Encryption passphrase: (passphrase)

    7. Amount of volume group to use for guided partitioning: (max default)

    8. This is an overview of your currently configured partitions and mount points: Finish partitioning and write changes to disk

    9. Write changes to disk? Yes (default)

10. The base system is installed. This will take a few moments.

11. Configure the package manager

    1. Debian archive mirror country: United States (default)

    2. Debian archive mirror: deb.debian.org (default)

    3. HTTP proxy information: (blank) (default)

12. Configuring popularity-contest

    1. Participate? No (default—modify later by running dpkg-reconfigure popularity-contest)

13. Software selection

    1. Unselect all but standard system utilities

        {{site.callout_note}} Selecting a desktop environment now installs more software than if you install it later. Also, the desktop environment seems to be more tightly coupled to the base system, which may cause issues should you decide to install a different desktop environment.

    2. Finish installation (click Continue to reboot)

        {{site.callout_note}} Keep the network cable connected.

14. Login using your username and password

15. ```shell
    $ sudo apt update
    ```

    This will likely show no updates. If you get an error at this point you probably tried to install using wireless network. If that is what you did, you might as well go back to Step 1.

16. ```shell
    sudo apt install intel-microcode
    ```

    This installs any Intel CPU microcode updates not already installed as part of a BIOS/UEFI patch.

17. ```shell
    $ sudo apt install firmware-misc-nonfree
    ```

    This is the i915 driver for the Intel HD 520. When I installed Debian 10 it seemed that the driver was not fully installed or configured, so I did the same for Debian 11.

18. ```shell
    $ sudo apt install kde-plasma-desktop
    ```

19. ```shell
    $ sudo apt install plasma-nm
    ```

    This is the KDE network monitor.

20. ```shell
    $ sudo apt install laptop-mode-tools
    ```

    This includes a power usage optimizer. TLP used to be required for Thinkpads, but no more.

21. ```shell
    $ sudo apt install smartmontools
    ```

    This is drive monitoring tools. It is probably already installed, but it doesn't hurt to install it again.

22. ```shell
    $ sudo reboot
    ```

23. You can now unplug the ethernet cable.

## References
- https://www.pragmaticlinux.com/2020/10/install-a-minimal-kde-on-debian-10-buster/
