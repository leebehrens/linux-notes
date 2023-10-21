---
title: Waydroid
layout: note
date: 2023-10-21
excerpt: Full Android in a container on Linux.
---

https://waydro.id/#install

## Installation

```bash
# Install pre-requisites.
sudo apt install curl ca-certificates -y

# Add the official repository.
# If the script fails to detect your distribution, you can provide a valid option by appending -s <DISTRO>.
# Currently supported values are: focal, jammy, kinetic, lunar, mantic, bookworm, bullseye, sid.
curl https://repo.waydro.id | sudo bash

# Install waydroid
sudo apt install waydroid -y

# Start the waydroid-container service.
sudo systemctl enable --now waydroid-container
```

## First run

Launch Waydroid from the applications menu and follow the first-launch wizard.
If prompted, provide the following links:

- System OTA: `https://ota.waydro.id/system`
- Vendor OTA: `https://ota.waydro.id/vendor`
