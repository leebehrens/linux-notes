---
title: Thunderbird
layout: note
date: 2022-03-22
tags: email calendar contacts
---
Thunderbird

Mail/news client with RSS, chat and integrated spam filter support. Debian likely has the current version of Thunderbird available (91.6).

## Installation and IMAP setup

1. ```shell
    $ sudo apt install thunderbird
    ```

2. Start Thunderbird

3. The account setup page should appear
    1. Edit full name and enter email address

    2. Click Configure manually – my provider uses custom settings for that differ from the inferred defaults

    3. Click Re-test to test the connections

## Microsoft365/Outlook.com (email, calendar, contacts)

1. In a browser, login to your Microsoft account and create a new app password for Outlook (https://account.microsoft.com). (Optional but recommended.)

2. Adding an Outlook.com IMAP/SMTP email account is the same as above.

3. Install Thunderbird add-on TbSync (installing the Debian package webext-tbsync doesn’t appear to do anything, but might be a version compatibility issue with Thunderbird)

4. Install Thunderbird add-on Provider for Exchange ActiveSync

5. Click TBSync in lower right corner of Thunderbird

6. Click Account Actions > Add new account > Exchange ActiveSync

7. Choose Automatic configuration and enter Account name (for display), Username (email address), and Password (preferably a newly generated app password, above)

8. Click Autodiscover settings and add account

9. Click Enable and synchronize this account, then select the items you want to synchronize

10. Click Synchronize now

## Themes
{{site.callout_note}} Themes are somewhat broken for email. Reading mail always displays the body with a light background. However, in a reply window the body background matches the theme, but the text of the email being replied to may be unreadable. Use the Light theme. I have seen some success with the System Theme enabled, after toggling back and forth with the Light theme.

1. Add-ons and Themes > Enable the theme Light

2. Any already open reply windows may need to be closed and reopened/recreated
