---
title: Java/OpenJDK
layout: note
date: 2022-06-09
---

## Installation

1. Ensure the necessary packages are present:
    ```shell
    $ sudo apt install -y wget apt-transport-https
    ```

2. Download the Eclipse Adoptium GPG key:
    ```shell
    $ wget -O - https://packages.adoptium.net/artifactory/api/gpg/key/public | sudo tee /usr/share/keyrings/adoptium.asc
    ```

3. Configure the Eclipse Adoptium apt repository:
    ```shell
    $ echo "deb [signed-by=/usr/share/keyrings/adoptium.asc] https://packages.adoptium.net/artifactory/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | sudo tee /etc/apt/sources.list.d/adoptium.list
    ```

4. Install the Temurin version you require:
    ```shell
    $ sudo apt update # update if you haven't already
    $ sudo apt install temurin-17-jdk
    ```

    Currently Java 8, 11, and 17 are LTS (Long Term Service) versions. For a list of all available Debian-packaged Eclipse Temurin OpenJDK versions, including some which may not be LTS:
    ```shell
    $ sudo apt search temurin
    ```

    See https://adoptium.net/support/ for the release roadmap of currently supported versions.

## References

- https://adoptium.net/installation/linux
