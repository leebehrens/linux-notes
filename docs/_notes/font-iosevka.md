---
title: "Font: Iosevka"
layout: note
date: 2022-03-22
---

Iosevka is an open-source, sans-serif + slab-serif, monospace + quasi‑proportional typeface family, designed for writing code, using in terminals, and preparing technical documents.

## Installation

1. Create a directory to download files. These instructions assume `~/Downloads/iosevka`
    ```shell
    $ mkdir ~/Downloads/iosevka
    ```

2. In a browser visit [https://github.com/be5invis/Iosevka](https://github.com/be5invis/Iosevka)

3. Click the link for the current release

4. Download one or more of the following to `~/Downloads/iosevka`

    - super-ttc-iosevka-11.2.2.zip
    - super-ttc-iosevka-curly-11.2.2.zip (I usually use this one)
    - super-ttc-iosevka-curly-slab-11.2.2.zip
    - super-ttc-iosevka-slab-11.2.2.zip

5. Unzip each file
    ```shell
    $ cd ~/Downloads/iosevka
    $ for f in *.zip; do unzip $f; done
    ```

    {{site.callout_note}} If unzip is not already installed,
    ```shell
    $ sudo apt install unzip
    ```

6. Copy the font files for system-wide use
    ```shell
    $ sudo mkdir /usr/share/fonts/truetype/iosevka
    $ sudo cp *.ttc /usr/share/fonts/truetype/iosevka
    ```
    If only selected fonts from those downloaded and unzipped are desired,
    (e.g., Iosevka Curly)
    ```shell
    $ copy sudo cp iosevka-curly.ttc /usr/share/fonts/truetype/iosevka
    ```

7. Refresh the font cache
    ```shell
    $ sudo fc-cache
    ```

{{site.callout_note}} Any open applications will have to be closed and reopened for
them to recognize the newly installed fonts.
