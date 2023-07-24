---
title: Visual Studio Code
layout: note
date: 2023-07-24
excerpt: Full featured cross-platform development tool.
---

## Installing

A .deb package is available to automatically install the apt repository and signing key to enable auto-updating using the system's package manager. However, I favor the manual approach, so I understand better how and where things are installed.

1. Obtain the official public package signing keys.
    ```shell
    wget -O- https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/keyrings/packages.microsoft.asc
    ```

2. Create the apt source .list file.
    ```shell
    echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/packages.microsoft.asc] https://packages.microsoft.com/repos/code stable main" > sudo tee /etc/apt/sources.list.d/vscode.list'
    ```

3. Refresh the apt package database and install.
    ```shell
    sudo apt update

    # the standard version
    sudo apt install code

    # the bleeding edge
    sudo apt install code-insiders
    ```

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

## References
- https://code.visualstudio.com/docs/setup/linux
