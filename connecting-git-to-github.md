---
title: Connecting Git to GitHub
---
## Configuring Git

1. `$ git config --global user.name "Your Name"`
2. `$ git config --global user.email "lsakfd"`
3. `$ git config --global pull.rebase false`

> hint: Pulling without specifying how to reconcile divergent branches is \
hint: discouraged. You can squelch this message by running one of the following \
hint: commands sometime before your next pull: \
hint:
hint:   git config pull.rebase false  # merge (the default strategy) \
hint:   git config pull.rebase true   # rebase \
hint:   git config pull.ff only       # fast-forward only \
hint: \
hint: You can replace "git config" with "git config --global" to set a default \
hint: preference for all repositories. You can also pass --rebase, --no-rebase, \
hint: or --ff-only on the command line to override the configured default per \
hint: invocation. \

## Creating your SSH keys

1. `$ ssh-keygen -t ed25519 -C "your_email@example.com"` The comment (the email) can be something else, or nothing at all.

2. Your private and public keys are generated, and you are asked for a filename. Optional, but consider using a name like github_id_ed25519 (no extension).

3. You are asked for a passphrase. Optional, but generally recommended. The passphrase can be be added, changed, or removed later.

    :::warning:::
    Your passphrase cannot be recovered if forgotten.
    :::

4. Your private and public keys are stored in `~/.ssh`.

## Configure SSH for GitHub

1. `$ nano ~./.ssh/config`

2. Add/update the configuration for GitHub:
    ```bash
    Host github.com
        # Redirect SSH through the HTTPS port, as some networks
        # block the SSH port
        Hostname ssh.github.com
        Port 443
        # Specify the username GitHub uses to access git
        User git
        # Specify the key file to use for authentication, and only
        # use the key in that file
        IdentityFile ~/.ssh/github_id_ed25519
        IdentitiesOnly yes
        # Automatically add the key to ssh-agent when first used
        AddKeysToAgent yes
        # Make the contents of known_host readable; hashing does
        # not provide any real added security for github.com
        HashKnownHosts no
        # Only validate the hostname, not individual IPs. GitHub is
        # hosted on thousands of servers. If left on, the user will
        # be warned that an IP is permanetly added to known_hosts
        # every time GitHub directs a connection to a new server.
        # Fun fact: the potential server pool is about 10,260 IPv4
        # over 7.13E+29 IPv6 IPs (https://api.github.com/meta,
        # 2022-03-16)
        CheckHostIP no
    ```

## Adding your public key to GitHub

1. In a browser, login to your GitHub account.

2. In the upper right corner, click your user icon and choose Settings from the dropdown menu.

3. In the left navigation bar, click SSH and PGP keys.

4. Click New SSH key

5. Provide a title. You may want to use your username and machine name of your computer, if you use use different key pairs across the different devices you use.

6. `$ cat ~/.ssh/github_id_ed25519.pub` -- make sure you specify the .pub file!

7. Copy the output to the key text box. Delete any trailing whitespace.

8. Click Add SSH key.

## Test the connection

`$ ssh -T git@github.com`

If your key has a passphrase, you will be asked to provide it. If you run the test again, you should not be asked for the passphrase.

## Changing your private key's passphrase

`$ ssh-keygen -p -f ~/.ssh/github_id_ed25519`

## More information

https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent

https://docs.github.com/en/authentication/troubleshooting-ssh/using-ssh-over-the-https-port

https://stackoverflow.com/questions/18711794/warning-permanently-added-the-rsa-host-key-for-ip-address

https://docs.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops

https://www.freecodecamp.org/news/the-ultimate-guide-to-ssh-setting-up-ssh-keys/ (best explanation for SSH config)
