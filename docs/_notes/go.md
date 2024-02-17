---
title: Go
layout: note
date: 2024-02-17
excerpt: An open-source, statically typed, compiled high-level programming language.
---

## Installation and upgrade

1. Obtain binary release and SHA-256 checksum at https://go.dev/dl/.

2. Remove previous release and install new release (v 1.22.0 in this example).
    ```shell
    sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz
    ```

3. Additional first time installation steps.

   1. Update `.profile` to add `/usr/local/go/gin` to the PATH environment variable.
        ```shell
        # set PATH to include Go
        if [ -d "/usr/local/go/bin" ] ; then
            PATH=$PATH:/usr/local/go/bin
        fi
        ```

    2. Update `.bashrc` to set the GOPATH and GOBIN environment variables. By default,
       Go uses a set of internal environment variables, but GOBIN is not set. This prevents
       command-line tools like `cobra-cli` from working after they are installed.
        ```shell
        # Install Go commands to GOBIN
        export GOPATH=$(go env GOPATH)
        export GOBIN=$(go env GOPATH)/bin
        export PATH="$PATH:$GOPATH:$GOBIN"
        ```

4. Test the installation.
   ```shell
   go version
   ```

## References
- https://go.dev/doc/install
