---
title: Rclone
layout: note
date: 2022-03-22
excerpt: Command line program to manage files on cloud storage
---

Rclone is a command line program to manage files on cloud storage. It is a feature rich alternative to cloud vendors' web storage interfaces. Over 40 cloud storage products support rclone including S3 object stores, business & consumer file storage services, as well as standard transfer protocols. (source: https://rclone.org/)

## Install

{{site.callout-note}} The Rclone installation script needs either unzip or 7zip.
Both are available in the Debian package library via `apt`.

More info at https://rclone.org/install/

1. Create a directory for the install script and change to the directory
    ```shell
    $ mkdir ~/Downloads/rclone
    $ cd ~/Downloads/rclone
    ```

2. Download the install script and prepare it for execution
    ```shell
    $ curl --output rclone-install.sh https://rclone.org/install.sh
    $ chmod u+x rclone-install.sh
    ```

3. Run the install script
    ```shell
    $ sudo ./rclone-install.sh
    ```

## Configuration: OneDrive

More info at https://rclone.org/onedrive/

1. Run the Rclone configuration utility
    ```shell
    $ rclone config
    ```

2. Create a new remote: `n/s/q> n`

3. Select the remote: `name> onedrive`

4. `Storage> onedrive` (the number or quoted name corresponding to Microsoft OneDrive)

5. `client_id>` (leave blank; N/A for OneDrive personal)

6. `client_secret>` (leave blank; N/A for OneDrive personal)

7. `region> global` (the number or quoted name corresponding to Microsoft Cloud Global)

8. Edit advanced config: `y/n> n`

9. Use auto config: `y/n> y`

10. Browser opens to provide OneDrive credentials (or do manually)

11. `config_type> onedrive` (the number or quoted name corresponding to OneDrive Personal or Buisness)

12. Use found root: `y/n> y`

13. Default config is OK: `y/e/d> y`

14. All done, quit: `e/n/d/r/c/s/q> q`

15. Test connection by listing top-level directories
    ```shell
    $ rclone lsd onedrive:
    ```

{{site.callout_note}} The refresh token expires if rclone is not used for 90 days. To obtain a new token
```shell
$ rclone config reconnect onedrive:
```

## Configuration: OneDrive mount point for OneDrive

The instructions here assume mounting from the root of cloud storage. For testing to ensure functionality,
you may want to mount a single OneDrive directory with a few files.

### Preparation

An empty directory must be provided for the mount point. For example,
```shell
$ mkdir ~/rclone/onedrive
```

### Manual mount as foreground process
```shell
$ rclone mount onedrive:/ /home/lee/rclone/onedrive --vfs-cache-mode full
```

The mount is active until the process is terminated (e.g, Ctrl+C)

### Manual mount as background process
```shell
$ rclone mount onedrive:/ /home/lee/rclone/onedrive --vfs-cache-mode full &
```

The mount is active until the process is terminated. For example,

1. ```shell
    $ jobs –l
    ```
2. ```shell
    $ fg
    ```

3. The job is now running in the foreground, and can be terminated by pressing `Ctrl+C`.

Using `kill –9 [jobnumber]` does not properly unmount the mount point. A manual unmount (see below) will be required.

### Manual unmount

If the mount point becomes disconnected, it may be necessary to manually unmount the mount point.

```shell
$ fusermount –u /home/lee/rclone/onedrive
```

### Automatic mounting using systemd

https://rclone.org/commands/rclone_mount/#rclone-as-unix-mount-helper


#### Configuration: generic systemd service

1. Install GNU privacy guard smart card support. *Reviewing my notes for posting here, I am not sure if or why this is needed.*
    ```shell
    $ sudo apt install scdaemon
    ```

2. Create a systemd user service file for Rclone mounting:
    ```shell
    $ nano ~/.config/systemd/user/rclone@.service
    ```
    ```ini
    # User service for Rclone mounting
    #
    # Place in ~/.config/systemd/user/
    # File must include the '@' (i.e., rclone@.service)
    #
    # As normal user, run
    #   systemctl --user daemon-reload
    #
    # You can now start/enable each remote by using rclone@<remote>
    #   systemctl --user enable rclone@onedrive
    #   systemctl --user start rclone@onedrive
    #
    # Adapted from:
    # https://gist.github.com/kabili207/2cd2d637e5c7617411a666d8d7e97101

    [Unit]
    Description=rclone: Remote FUSE filesystem for cloud storage config %i
    Documentation=https://rclone.org
    After=network-online.target
    Wants=network-online.target
    AssertPathIsDirectory=%h/rclone/%i

    [Service]
    Type=notify
    ExecStart=/usr/bin/rclone mount \
    --config=%h/.config/rclone/rclone.conf \
    --cache-dir=%h/.cache/rclone \
    --vfs-cache-mode full \
    --log-level INFO \
    --log-file /tmp/rclone-%i.log \
    --umask=027 \
    %i: %h/rclone/%i
    Restart=on-failure
    RestartSec=5
    ExecStop=/usr/bin/fusermount -u %/rclone/%i

    [Install]
    WantedBy=default.target
    ```

3. Refresh the list of user services systemd is aware of
    ```shell
    $ systemctl --user daemon-reload
    ```

#### Managing the user service for the mount point

In the commands below, `rclone@onedrive` can be used with any remote
you might have created a mount point for. For example, you could have a
Google Drive mount point named gdrive (`rclone@gdrive`), or a NextClound
mount point named nextcloud (`rclone@nextcloud`).

- Enable the service
    ```shell
    $ systemctl --user enable rclone@onedrive
    ```

- Start the service
    ```shell
    $ systemctl --user start rclone@onedrive
    ```

- Check the status of the service
    ```shell
    $ systemctl --user status rclone@onedrive
    ```

- Stop the service
    ```shell
    $ systemctl --user stop rclone@onedrive
    ```

- View service logs
    ```shell
    $ journalctl --user –ex
    ```

- View Rclone logs for a mount point
    ```shell
    $ cat /tmp/rclone-onedrive.log
    ```
