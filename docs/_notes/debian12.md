---
title: Installing Debian 12 (Bookworm) on a Lenovo Thinkpad T470
layout: note
date: 2022-07-04
excerpt: I upgraded from Debian 11 (Bullseye) via full installation, to clean out a bunch of cruft I had accumulated.
---

2023-07-04 I upgraded from Debian 11 (Bullseye) via full installation, to clean out a bunch of cruft I had accumulated.

## What you'll need

- Computer (I'm using a Lenovo Thinkpad T470)
- USB drive, to boot the installer
- Ethernet cable (because of a possible Debian install quirk Debian on Thinkpad)
- USB drive or other means of backing up your data

## Backup your data

Back up everything in `~/`, except for any rclone directories mounted to a cloud drive. I backed up to a USB drive, so that I would have access to any files I might need before regaining ready access to my cloud storage.

Although I didn't, it probably doesn't hurt to backup some system config files, `/etc/apt/sources.list.d/`, etc. for possible reference.


## Obtain image and prepare installation media

1. In a browser open [https://www.debian.org/download](https://www.debian.org/download).

2. At the top of the page you will find links to download the following:
    - debian-12.0.0-amd64-netinst.iso (actual name will change as current version changes)
    - SHA512SUMS
    - Signature (actual name is SHA512SUMS.sign)

2. Recommended: validate the checksum file (https://www.debian.org/CD/verify)

3. Validate checksum of ISO image, and compare with SHA512SUMS.
    ```shell
    $ sha512sum debian-12.0.0-amd64-netinst.iso
    $ cat SHA512SUMS
    ```

4. Insert a USB drive. Disks shows /dev/sdxx name for unmounting USB drive.
    ```shell
    $ ls /dev
    ```

5. Unmount the USB drive.
    ```shell
    $ sudo umount /dev/sdb1
    ```

    {{site.callout_caution}} Make sure you choose the correct drive!

6. Format the USB drive.
    ```shell
    $ sudo mkfs.vfat /dev/sdb -I
    ```

7. Write the installer image to the USB drive.
    ```shell
    $ sudo cp debian-12.0.0-amd64-netinst.iso /dev/sdb
    ```

8. Synchronized cached writes to persistant storage.
    ```shell
    $ sync
    ```

## Installation

1. Boot from the USB drive to run the installer.

2. Select install type: *Install* (or *Graphical install*).

3. Select a language: *English* (default)

4. Select your location: *United States* (default)

5. Configure keyboard: *American English* (default)

    Hardware detection and loading steps will take a few momements.

6. Configure the network:

    1. Primary network interface: *(wired interface)*

        {{site.callout_caution}} Use a wired network interface even if you have a wireless interface. If you choose wireless, you will be asked to choose the wireless network SSID, encryption method, and password per expected usual. The install will complete smoothly. However, once the system boots you are likely to find that you can't access the internet with any kind of connection. Unable to get the network working, I had to resort to reinstalling using the wired interface. (This kink might be worked out with Debian 12, but I didn't try it to find out this time around.)

    2. Hostname: *(debian is the default)*

    3. Domain name: *(local)*

7. Set up users and passwords

    1. Root: *(leave password blank to disable root account)*

    2. Verify password: *(leave blank)*

    4. Full name for new user: *(your name)*

    5. Username for your account: *(default is first name all lowercase)*

    6. Choose a password for new user: *(password)*

    7. Verify password: *(password)*

8. Configure the clock: *(select local time zone)*

9. Partition disks

    **Without encryption**

    1. Partitioning method: *Guided – use entire disk*

        {{site.callout_note}} If you choose *Guided – use entire disk and set up encrypted LVM*, you will have to provide the encryption passphrase every time you start your system.

    2. Select disk to partition: *(disk)*

        {{site.callout_caution}} Be careful to choose the correct disk!

    3. Partitioning scheme: *All files in one partition (recommended for new users)* (default)

        {{site.callout_note}} I looked at the various paritioning schemes, and ultimatly decided there wasn't enough benefit to me to use one of the multi-partition schemes.

    4. This is an overview of your currently configured partitions and mount points: *Finish partitioning and write changes to disk*

    5. Write changes to disk? *Yes* (default)

        {{site.callout_caution}} This is your last chance before your drive is wiped!

    **With encryption**

    {{site.callout_note}} I did not try partioning with encryption with Debian 12, so there may be some differences from these instructions.

    1. Partitioning method: *Guided – use entire disk and set up encrypted LVM*

        {{site.callout_note}} You will have to provide the encryption passphrase every time you start your system.

    2. Select disk to partition: *(disk)*

        {{site.callout_caution}} Be careful to choose the correct one!

    3. Partitioning scheme: *All files in one partition (recommended for new users)* (default)

    4. Write changes to disks and configure LVM? *Yes*

        {{site.callout_caution}} This is your last chance before your drive is wiped!

    5. Your drive is filled with random data. This will take a while.

    6. Encryption passphrase: *(passphrase)*

    7. Amount of volume group to use for guided partitioning: *(max default)*

    8. This is an overview of your currently configured partitions and mount points: *Finish partitioning and write changes to disk*

    9. Write changes to disk? *Yes* (default)

10. The base system is installed. This will take a few moments.

11. Configure the package manager

    1. Debian archive mirror country: *United States* (default)

    2. Debian archive mirror: *deb.debian.org* (default)

    3. HTTP proxy information: *(blank)* (default)

12. Configuring popularity-contest

    1. Participate? *No* (default—modify later by running dpkg-reconfigure popularity-contest)

13. Software selection

    1. Unselect all but *standard system utilities*.

        {{site.callout_note}} Selecting a desktop environment now installs more software than if you install it later. Also, the desktop environment seems to be more tightly coupled to the base system, which may cause issues should you decide to install a different desktop environment.

    2. Finish installation: *(click Continue to reboot)*

        {{site.callout_note}} Keep the network cable connected.

14. Login using your username and password

15. Install any available package updates, whcih also tests your network.
    ```shell
    $ sudo apt update
    $ sudo apt upgrade
    ```

    This will likely show no updates, and if so you can skip `sudo apt upgrade`. If you get an error at this point you probably tried to install using wireless network. If this happens, you might as well go back to Installation Step 1, this time with a wired connection.

16. Install KDE. (You can install another desktop environment of your choice, but you'll have to lookup the appropriate Debian package name.)
    ```shell
    $ sudo apt install kde-plasma-desktop
    ```

17. Install laptop tools, including a power usage optimizer. (TLP used to be required for Thinkpads, but no longer.)
    ```shell
    $ sudo apt install laptop-mode-tools
    ```

18. You can now unplug the ethernet cable and reboot.
    ```shell
    $ sudo reboot
    ```

19. Login and enjoy!

## Notes

Now that Debian includes non-free firmware by default, the following packages are installed by default:
- firmware-misc-nonfree: i915 driver for Intel HD 520 integrated GPU
- intel-microcode: Intel CPU microcode updates not already installed as part of a BIOS/UEFI patch
- plasma-nm: KDE Plasma network monitoring
- smartmontools: SMART drive monitoring tools

## References
- [Installing Debian 11 (Bullseye) on a Lenovo Thinkpad T470](debian11)
- https://www.pragmaticlinux.com/2020/10/install-a-minimal-kde-on-debian-10-buster/
