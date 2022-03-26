---
title: Printers and scanners
layout: note
date: 2022-03-22
---

These instructions are specifically for HP AIO (all-in-one) models OfficeJet Pro 8600, OfficeJet 6953,
with the KDE desktop entironment

## Installation

1. Install CUPS. `$ sudo apt list cups` may indicate CUPS is installed, but not all required packages are
    ```shell
    $ sudo apt install cups
    ```

2. Install KDE Printer Settings
    ```shell
    $ sudo apt install system-config-printer
    ```

3. Install HP Linux Imaging and Printing
    ```shell
    $ sudo apt install hplip
    ```

4. Install the HP Linux Printing and Imaging printer driver
    ```shell
    $ sudo apt install printer-driver-hpijs
    ```

5. Install a basic scanning application
    ```shell
    $ sudo apt install skanlite
    ```

6. Install the Qt-based HP imaging and printing utility
    ```shell
    $ sudo apt install hplip-gui
    ```

7. Enable user access to configuring printers
    ```shell
    $ sudo adduser <username> lpadmin
    ```

## Add printers

1. Run HPLIP Toolbox

2. If window No Installed HP Devices Found, click Setup Device..., otherwise Device menu Setup Device...

3. Click Show Advanced Options

4. Select Manual Discovery

5. Enter IP Address or network name of printer

6. Click Next

7. Select printer, click Next

8. Select Send test page to printer, and click Add Printer

9. Enter username and password

10. Printer should be added, and test page should print

## Adjust print defaults

1. Select printer

2. Select Print Settings tab

3. Adjust settings

## References
- https://ccm.net/faq/39414-linux-debian-how-to-install-a-printer
