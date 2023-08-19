---
title: Troubleshooting
layout: note
date: 2023-08-16
tags:
excerpt:
---

Sometimes things go wrong.

## Bluetooth

### Bluetooth headset unable to connect: org.bluez.Error.Failed br-connection-profile-unavailable

```shell
systemctl --user enable pulseaudio
systemctl --user start pulseaudio
```

### Unable to enable Bluetooth / no controller available

Shutdown the computer and turn it back on. Restarting the computer will not be effective.

## References
- Bluetooth headset unable to connect: https://unix.stackexchange.com/a/721697
