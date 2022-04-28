---
title: Date and time formatting
layout: note
date: 2022-04-28
---

Changing date and time format can be quirky.

I  prefer my system use the following formats:
- Date: YYYY-MM-DD preferred, with DMY order as a fallback
- Time: 24-hour format

{{site.callout_note}} Achieving this systemwide turns out to be less easy
than it should be, in part because KDE and Linux support their own sets
of locales with side effects between the two.

{{site.callout_note}} I have not found a way to set the date format to
YYYY-MM-DD everywhere, hence the DMY order as a fallback.

{{site.callout_note}} My web searches consistently turned up using the
en_DK locale for time formatting, but that results in times formatted as HH.MM
(dot separator). After hunting I found that en_IL yields HH:MM (colon separator).

## `ls` timestamp format

1. Edit `.bashrc`
    ```shell
    $ nano ~/.bashrc
    ```

2. Append the following lines and save
    ```text
    # Change ls -l time format
    export TIME_STYLE=long-iso
    ```

3. Optional: make the change take effect
    ```shell
    $ source ~/.bashrc
    ```

## Linux time formatting

{{site.callout_caution}} Skipping these steps will result in locale warning
messages when various commonly used commands are run (e.g., `man`, `apt install`,
etc.).

1. Update available locales
    ```shell
    $ sudo nano /etc/locale.gen
    ```

2. Uncomment (remove the leading #) from the line `en_IL UTF-8` and save.

3. Regenerate locales
    ```shell
    $ sudo locale-gen
    ```

## KDE time formatting

1. Press the `Super Key` and type `format` and select `Formats`

2. Check Detailed Settings

3. Change Time to Israel - English (en_IL)

4. Click Apply

## Activating the changes and trying them out

Reboot to make the settings take effect. (Logging out and back will probably
also work.)

1. KDE login screen: the date should be in DD Month YYYY form and the time in HH:MM form

2. KDE clock in System Tray: the date should be in DD/MM/YYYY form and the time in HH:MM form

3. Linux: the `date` command should show the date and time in DD MMM YYYY HH:MM:SS order
    ```
    $ date
    ```

4. `ls` command: file timestamps should be in YYYY-MM-DD HH:MM format
    ```
    $ ls -al
    ```
