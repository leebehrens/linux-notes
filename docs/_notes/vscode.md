---
title: Visual Studio Code
layout: note
date: 2022-03-19
excerpt: Full featured cross-platform development tool.
---

## Installing

Source: https://code.visualstudio.com/docs/setup/linux

A .deb package is available to automatically install the apt repository and signing key to enable auto-updating using the system's package manager. However, I favor the manual approach, so I understand better how things are installed.

1. Get the GPG keys for VSCode
    ```shell
    $ wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
    ```

2. Install the keys
    ```shell
    $ sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
    ```

3. Create the apt source file
    ```shell
    $ sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
    ```

4. Optional peek at the apt source file
    ```shell
    $ sudo cat /etc/apt/sources.list.d/vscode.list
    ```

5. No longer need this file
    ```shell
    $ rm -f packages.microsoft.gpg
    ```

6. This package is probably already installed
    ```shell
    $ sudo apt install apt-transport-https
    ```

7. Refresh the package index
    ```shell
    $ sudo apt update
    ```

8. Install the package
    - Standard version: `$ sudo apt install code`
    - The bleeding edge: `$ sudo apt install code-insiders`

## Preliminary customizations

### Theme

1. Install extension: Tomorrow and Tomorrow Night Theme Kit (Microsoft)

2. Set theme to Tomorrow Night

### Keyboard Shortcuts [Ctrl+K Ctrl+s]

1. Search for deleteline

2. Edit DeleteLine to [Ctrl + Shift + L] (OK that there are other commands using same keybinding)

### Settings

1. Navigate to User > Text Editor > Font

2. In Font Ligatures, click Edit in settings.json

    settings.json likely only has an entry for Tomorrow. Add the remaining settings:

```jsonc
{
    "editor.fontFamily": "Iosevka Curly, 'Droid Sans Mono', 'monospace', monospace",
    "editor.fontLigatures": true,
    "editor.fontSize": 18,
    "editor.fontWeight": "normal",
    "editor.guides.bracketPairs": "active",
    "editor.renderControlCharacters": true,
    "editor.rulers": [72, 79, 95, 131], // useful in per-language settings
    "editor.scrollBeyondLastLine": false,

    // "editor.smoothScrolling": true, // doesn't seem to affect KDE, so commented out (default=false)

    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true,
    "files.trimTrailingWhitespace": true,

    "telemetry.telemetryLevel": "off",

    "terminal.integrated.sendKeybindingsToShell": true,

    "workbench.colorCustomizations": {
        "sash.hoverBorder": "#b5bd68",
        "terminal.ansiBlack": "#0c0c0c",
        "terminal.ansiBlue": "#0037da",
        "terminal.ansiBrightBlack": "#767676",
        "terminal.ansiBrightBlue": "#3878fa",
        "terminal.ansiBrightCyan": "#61d6d6",
        "terminal.ansiBrightGreen": "#16c60c",
        "terminal.ansiBrightMagenta": "#b4009e",
        "terminal.ansiBrightRed": "#e74856",
        "terminal.ansiBrightWhite": "#f2f2f2",
        "terminal.ansiBrightYellow": "#f9f1a5",
        "terminal.ansiCyan": "#3a96dd",
        "terminal.ansiGreen": "#13a10e",
        "terminal.ansiMagenta": "#881799",
        "terminal.ansiRed": "#c50f1f",
        "terminal.ansiWhite": "#cccccc",
        "terminal.ansiYellow": "#c19c00"
    },
    "workbench.colorTheme": "Tomorrow Night",
    "workbench.editor.titleScrollbarSizing": "large"
}
```
