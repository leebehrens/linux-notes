---
title: DBeaver (community edition)
layout: note
date: 2022-04-23
---
## Download and install

1. In a browser, visit [https://dbeaver.io/](https://dbeaver.io/)
2. Click Download
3. Click `Linux Debian package (installer)` and save the `.deb` file. The default filename is probably `dbeaver-ce_<version>_amd64.deb`
4. Click `Checksums (md5, sha1, sha256)`
5. Look for the `.sha256` file corresponding to the `.deb` file, probably `dbeaver-ce_<version>_amd64.deb.sha256`
6. Verify the SHA-256 checksum
    ```shell
    $ sha256sum dbeaver-ce_<version>_amd64.deb
    $ cat dbeaver_ce_<version>_amd65.deb.sha256
    ```
7. If the checksum is valid install the package
    ```shell
    $ sudo apt install ./dbeaver-ce_<version>_amd64.deb
    ```

## Run DBeaver

1. From the KDE start menu (aka, application launcher), select `dbeaver-ce`
