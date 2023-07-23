---
title: KeePassXC
layout: note
date: 2022-03-22
excerpt: Secure password management.
published: false
---

{{site.callout_note}} I now install as a [flatpak](applications.html).

## Installation using AppImage

1. In a browser, visit [https://keepassxc.org/](https://keepassxc.org/)

2. Download the AppImage, GPG signature, and SHA-256 digest to `~/Downloads/keepassxc`

3. Check the integrity of the download
    ```shell
    $ shasum -a 256 -c KeePassXC-*.DIGEST
    ```

4. Verify the download signature

    1. Import the public key
        ```shell
        $ gpg --keyserver keys.openpgp.org --recv-keys CFB4C2166397D0D2
        ```

    2. Verify the signature
        ```shell
        $ gpg --verify KeePassXC-*.sig
        ```

    3. The output should contain a “Good signature from” line.
        The warning in the output is because the key has not been trusted.

5. Allow the AppImage to be executed
    ```shell
    $ chmod +x ./KeePassXC-*.AppImage
    ```

6. ```shell
    $ sudo install -d /opt/keepassxc d
    ```

7. ```shell
    $ sudo install -D ./*.AppImage /opt/keepassxc d
    ```
