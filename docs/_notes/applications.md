---
title: Applications
layout: note
date: 2023-07-23
tags: flatpak
excerpt: An index of applications I use and how I install them.
---

Here are many of the applications I use. Since upgrading to Debian 12, I now install many as Flatpak packages as available in [Flathub](https://flathub.org).

| Application | Flathub/Flatpak status                                                                                                              |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Brave       | Not supported; see [installation instructions](brave.html)                                                                          |
| DBeaver CE  | Not supported; see [installation instructions](dbeaver.html)                                                                        |
| Gimp        | Official                                                                                                                            |
| Inkscape    | Official according to the [Inkscape FAQ](https://inkscape.org/learn/faq/)                                                           |
| KeePassXC   | Official                                                                                                                            |
| LibreOffice | Official                                                                                                                            |
| Obsidian    | Official beta not officially supported, maintained by the community                                                                 |
| Okular      | Official                                                                                                                            |
| Rclone      | Not supported; see [installation instructions](rclone.html)                                                                         |
| Signal      | Not supported; see [installation instructions](signal.html)                                                                         |
| SyncThing   | Not supported; see installation instructions                                                                                        |
| Thunderbird | Official, "still being worked on" according to [Mozilla Support](https://support.mozilla.org/en-US/kb/installing-thunderbird-linux) |
| TimeShift   | Not supported; see installation instructions                                                                                        |
| VSCode      | Not supported; see [installation instructions](vscode.html)                                                                         |

## Updating

- Flatpak: `flatpak update`
- Debian package: `sudo apt update && sudo apt upgrade`

## How to install Flatpak

1. Install the official Debian package.
    ```shell
    sudo apt install flatpak
    ```

2. Add the Flathub repository.
    ```shell
    flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
    ```

3. Reboot.

## References
- [Flathub Debian Quick Setup](https://flatpak.org/setup/Debian)
