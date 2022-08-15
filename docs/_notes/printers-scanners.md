---
title: Printers and scanners
layout: note
date: 2022-08-14
---

These instructions assume you are using the KDE desktop environment.

Tip: Assign fixed IP addresses for all network printers on the router. This can simplify a variety of printer related administrative tasks across all operating systems.

## Installation: CUPS, Skanlite (all printers)

1. Install CUPS. `$ sudo apt list cups` may indicate CUPS is installed, but not all required packages are
    ```shell
    $ sudo apt install cups
    ```

2. Install KDE Printer Settings
    ```shell
    $ sudo apt install system-config-printer
    ```

3. Install a basic scanning application
    ```shell
    $ sudo apt install skanlite
    ```

4. Enable user access to configuring printers
    ```shell
    $ sudo adduser <username> lpadmin
    ```

## Installation: Espon all-in-one models

The instructions here were tested with an ET-3850.

### Install drivers, utilities

1. Install printer driver
    ```shell
    $ sudo apt install printer-driver-escpr
    ```

2. (Optional) Install command-line maintenence utility
    ```shell
    $ sudo apt install escputil
    ```

### Connect printer

1. Run Print Settings

2. Click Unlock, enter password for administrative access

3. Click Add, expand the navigation tree item Network Printer

4. Select either entry for Epson ET-3850

5. If given a choice in the connection list, select the item for IPP network printer

6. Click Forward

7. Adjust the name, description, location as desired and click Apply

### Adjust print defaults

1. Run Print Settings (if not already there)

2. Click Unlock, enter password for administrative access

3. Right-click on desired printer, choose Properties

4. Adjust properties as desired, and click OK


## Installation: HP all-in-one models

The instructions here were tested with an OfficeJet Pro 8600 and an OfficeJet 6953.

### Install drivers, utilities

1. Install HP Linux Imaging and Printing
    ```shell
    $ sudo apt install hplip
    ```

2. Install the HP Linux Printing and Imaging printer driver
    ```shell
    $ sudo apt install printer-driver-hpijs
    ```

3. Install the Qt-based HP imaging and printing utility
    ```shell
    $ sudo apt install hplip-gui
    ```

### Connect printer

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

### Adjust print defaults

1. Select printer

2. Select Print Settings tab

3. Adjust settings


## References
- https://ccm.net/faq/39414-linux-debian-how-to-install-a-printer
- https://epson.com/Support/wa00821
