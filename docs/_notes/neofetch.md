---
title: Neofetch
layout: note
date: 2022-03-22
excerpt: Shows Linux system information with distribution logo.
---

## Installation

```shell
$ sudo apt install neofetch
```

## Running

```shell
$ neofetch
```

## Configuration

```shell
$ nano ~/.config/neofetch/config.conf
```
{{site.callout_note}} If `config.conf` does not exist, run Neofetch.

The configuration file contains instructions on where to find more information about various configuration options.

As an example, the color block range is sometimes set to 8 of the available 16, and is easily changed by adjusting `block_range`.
```conf
# Color block range
# The range of colors to print.
#
# Default:  '0', '15'
# Values:   'num'
# Flag:     --block_range
#
# Example:
#
# Display colors 0-7 in the blocks.  (8 colors)
# neofetch --block_range 0 7
#
# Display colors 0-15 in the blocks. (16 colors)
# neofetch --block_range 0 15
block_range=(0 15)
```
