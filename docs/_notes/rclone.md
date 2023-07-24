---
title: Rclone
layout: note
date: 2023-07-24
excerpt: Command line program to manage files on cloud storage.
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

12. `config_driveid>` (select drive you want to use, or press Enter to accept the default)

13. Drive OK? `y/n> y`

14. Keep this "onedrive" remote? `y/e/d> y`

15. All done, quit: `e/n/d/r/c/s/q> q`

16. Test connection by listing top-level directories
    ```shell
    $ rclone lsd onedrive:
    ```

{{site.callout_note}} The refresh token expires if rclone is not used for 90 days. To obtain a new token
```shell
$ rclone config reconnect onedrive:
```

## Mount point: OneDrive

The instructions here assume mounting from the root of cloud storage. For testing to ensure functionality,
you may want to mount a single OneDrive directory with a few files.

An empty directory must be provided for the mount point. For example,
```shell
$ mkdir -p ~/rclone/onedrive
```

## Automatic mounting using systemd

### Generic systemd service

This generic systemd service should work for all cloud services configured in rclone, provided the remote name and mount point directory name under `~/rclone` are the same.

1. Install GNU privacy guard smart card support.

    {{site.inline_note}} I skipped this step, as it does not appear to be needed.

    ```shell
    $ sudo apt install scdaemon
    ```

2. Create a systemd user service file for Rclone mounting:
    ```shell
    $ micro ~/.config/systemd/user/rclone@.service
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

### Managing the user service for the mount point

As indicated above, the following commands can be used with any remote, provided the remote name and mountpoint name are the same.
The commands below refer to a Microsoft OneDrive remote named `onedrive` (`rclone@onedrive`).
Similarly, you could use them with Google Drive mount point named `gdrive` (`rclone@gdrive`),
or a NextClound mount point named `nextcloud` (`rclone@nextcloud`), etc.

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

## Manual mounting/unmounting

The following commands assume a remote named `onedrive` and a mount point at `~/rclone/onderive`.

- Manual mount as foreground process
    ```shell
    $ rclone mount onedrive:/ /home/lee/rclone/onedrive --vfs-cache-mode full
    ```

    The mount is active until the process is terminated (e.g, Ctrl+C)

- Manual mount as background process
    ```shell
    $ rclone mount onedrive:/ /home/lee/rclone/onedrive --vfs-cache-mode full &
    ```

    The mount is active until the process is terminated. For example,

    ```shell
    $ jobs –l
    $ fg
    ```

    The job is now running in the foreground, and can be terminated by pressing `Ctrl+C`.

    {{site.inline_caution}} Using `kill –9 [jobnumber]` does not properly unmount the mount point. A manual unmount will be required.

- Manual unmount (useful should the mountpoint become disconnected)
    ```shell
    $ fusermount –u /home/lee/rclone/onedrive
    ```

## References
- https://rclone.org/onedrive/
- https://rclone.org/commands/rclone_mount/#rclone-as-unix-mount-helper
