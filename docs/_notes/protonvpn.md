---
title: ProtonVPN
layout: note
date: 2024-02-17
excerpt: An open source, independently audited, no-logs, transparent VPN provider with malware, ad, and tracking blocking.
---

## Installation

1. Download and install the ProtonVPN Linux CLI.
    - [Standard v3 Linux CLI](https://protonvpn.com/support/linux-vpn-tool/#debian)
    - Early-access Proton VPN Linux CLI: Download the [beta Debian package](https://protonvpn.com/support/official-linux-vpn-debian/#beta), and then install using the instructions for the standard v3 Linux CLI.

2. Create the following `.service` files in `~/.config/systemd/user`.
   1. `~/.config/systemd/user/protonvpn-autostart.service`
        This service waits until the network is active before connecting to a ProtonVPN server
        located in the US. If using the killswitch, uncomment the appropriate lines as noted
        in the comments.
        ```text
        # https://github.com/ProtonVPN/proton-vpn-gtk-app/issues/26

        [Unit]
        Description=ProtonVPN autostart

        [Service]
        Type=oneshot
        RemainAfterExit=yes
        # Uncomment the following two lines if using the killswitch.
        # ExecStartPre=-protonvpn-cli killswitch --off
        # ExecStartPre=-protonvpn-cli killswitch --on
        # Wait until online; required because system targets cannot be used in user services.
        ExecStartPre=sh -c "until systemctl is-active network-online.target; do sleep 1; done"
        ExecStart=protonvpn-cli connect --cc US
        TimeoutStartSec=30
        ExecStop=protonvpn-cli disconnect
        Restart=on-failure

        [Install]
        WantedBy=default.target
        ```

   2. `~/.config/systemd/user/protonvpn-wakeup.service`
        This service auto-reconnects ProtonVPN when the system wakes up from sleep, suspend,
        hibernate, or suspend-then-hibernate.
        ```text
        # https://unix.stackexchange.com/a/759620

        [Unit]
        Description=ProtonVPN wakeup

        [Service]
        Type=oneshot
        # ExecStartPre=sh -c "until systemctl is-active network-online.target; do sleep 1; done"
        ExecStartPre=sleep 4
        # ExecStartPre=protonvpn-cli disconnect
        # ExecStart=protonvpn-cli connect --cc US
        ExecStart=protonvpn-cli reconnect
        ```

   3.  `~/.config/systemd/user/protonvpn-wakeup@.service`
        The ProtonVPN CLI service needs to run with user permissions. This system service allows
        starting the related user service. Because it is a system service the file is copied
        to the directory indicated in the comments.
        ```text
        # https://unix.stackexchange.com/a/759620
        # Copy this file to /etc/systemd/system/protonvpn-wakeup@.service
        # sudo systemctl enable protonvpn-wakeup@lee

        [Unit]
        Description=Run protonvpn-wakeup.service as user unit of %i after wakeup.
        After=suspend.target hibernate.target hybrid-sleep.target suspend-then-hibernate.target

        [Service]
        Type=oneshot
        ExecStart=/usr/bin/systemctl --user --machine=%i@ start --wait protonvpn-wakeup.service

        [Install]
        WantedBy=suspend.target hibernate.target hybrid-sleep.target suspend-then-hibernate.target
        ```

## References
- https://github.com/ProtonVPN/proton-vpn-gtk-app/issues/26
- https://unix.stackexchange.com/a/759620
