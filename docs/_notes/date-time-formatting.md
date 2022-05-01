---
title: Date and time formatting
layout: note
date: 2022-04-28
---

Changing date and time format to can be quirky.

I  prefer my system use the following formats:
- Date: YYYY-MM-DD preferred, with DMY order as a fallback
- Time: 24-hour format

{{site.callout_note}} Achieving this systemwide turns out to be less easy than it should be, in part because KDE and Linux support their own sets of locales with side effects between the two.

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

1. Create the World (io_001) locale file
    ```shell
    $ cd /etc/share/i18n/locales
    $ sudo cp en_US io_001
    $ sudo nano io_001
    ```

2. Make the following changes to `io_001`, in the `LC_TIME` section. (`% !!` mark the original lines and may be omitted.)
    ```
    % Appropriate date and time representation (%c)
    % !!	d_t_fmt "%a %d %b %Y %r %Z"
    d_t_fmt	"%a %d %b %Y %T"
    %
    % Appropriate date representation (%x)
    % !!	d_fmt   "%m//%d//%Y"
    d_fmt	"%Y-%m-%d"
    %
    % Appropriate time representation (%X)
    % !!	t_fmt   "%r"
    t_fmt "%T"
    %
    % Appropriate AM/PM time representation (%r)
    % !!	t_fmt_ampm "%I:%M:%S %p"
    t_fmt_ampm	"%T"
    %
    % Appropriate date and time representation for date(1)
    % !!	date_fmt "%a %d %b %Y %r %Z"
    date_fmt	"%a %x %T"
    %
    % Strings for AM/PM
    % !!	am_pm	"AM";"PM"
    am_pm	"";""
    ```

    {{site.callout_note}} As indicated above, `date_fmt` is the default format for the `date` command. `%T` is equivalent to `%H:%M:%S` (two-digit hour, minute, second).

3. Update available locales
    ```shell
    $ sudo nano /etc/locale.gen
    ```

<!--
4. Uncomment (remove the leading #) from the line `en_IL UTF-8` and save.
-->
4. At the end of the file add this line
    ```
    io_001 UTF-8
    ```

5. Regenerate locales
    ```shell
    $ sudo locale-gen
    ```

## KDE time formatting

1. Press the `Super Key` and type `format` and select `Formats`

2. Check Detailed Settings

3. Change Time to World (io_001) <!-- Israel - English (en_IL) -->

4. Click Apply

## KDE lock screen date formatting

1. Edit the lockscreen theme file
    ```shell
    $ cd /usr/share/plasma/look-and-feel/org.kde.breeze.desktop/contents/components
    $ sudo nano Clock.qml
    ```

2. Find the line containing
    ```
    text: Qt.formatDate(timeSource.data["Local"]["DateTime"], "yyyy-MM-dd (ddd)")   // Qt.DefaultLocaleLongDate)
    ```
    and change it to
    ```
    text: Qt.formatDate(timeSource.data["Local"]["DateTime"], "yyyy-MM-dd (ddd)")   // Qt.DefaultLocaleLongDate)
    ```

## KDE login screen

{{site.callout_note}} I have not yet discovered how to change the date format on the KDE login screen.

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
