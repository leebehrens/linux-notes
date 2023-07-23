---
title: Firmware update
layout: note
date: 2022-05-13
tags: hardware thinkpad t470
excerpt: How to update firmware using `fwupd`.
---


How to update firmware using `fwupd`. The alternative is to check hardware
vendors' websites for the appropriate firmware and installers.

{{site.callout_caution}} I used this once on Debian 11 and found my Thinkpad T470 temporarily bricked. It might be better to use Lenovo's bootable updating utility.

## Installing

```shell
$ sudo apt install fwupd
```

## Using

1. Display supported devices
    ```shell
    $ fwupdmgr get-devices
    ```

2. Refresh `fwupd`'s metadata database from the
    [Linux Firmware Vendor Service](https://fwupd.org/)
    ```shell
    $ fwupdmgr refresh
    ```

3. Display available updates for your system
    ```shell
    $ fwupdmgr get-updates
    ```

4. Apply updates
    ```shell
    $ fwupdmgr update
    ```

    Some updates can be applied immediately, while others are applied during
    the next reboot. You will be told if a reboot is required to finish
    applying any updates.

5. Reboot to apply any updates requiring a reboot

6. Review application of updates
    ```shell
    $ fwupdmgr get-devices
    ```

    You will see status of all applied updates. If any failed, you will be given
    the opportunity to upload a failure report to the [Linux Firmware Vendor
    Service](https://fwupd.org/).

    I did have an update failure for my system firmware. After the failure
    report was uploaded, I was given a [website](https://github.com/fwupd/fwupd/wiki/LVFS-Triaged-Issue:-Failed-to-run-update-on-reboot) to visit for more
    information. I assume I would have been given the website had I declined to upload the failure report.

## References
- https://fwupd.org/
- https://linoxide.com/how-to-update-firmware-on-ubuntu-using-fwupd/
- https://github.com/fwupd/fwupd/wiki/LVFS-Triaged-Issue:-Failed-to-run-update-on-reboot
