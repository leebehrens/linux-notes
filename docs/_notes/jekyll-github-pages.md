---
title: Jekyll for GitHub Pages
layout: note
date: 2023-07-23
excerpt: Locally testing a GitHub Pages site.
---

## Prerequisites

1. Install Ruby v2.5.0 or later. At the time of this writing, Debian's package repository contains Ruby 3.1.2.
    ```shell
    # check Ruby version
    ruby -v

    # install Ruby
    sudo apt install ruby-full build-essential
    ```

2. RubyGems, GCC, and Make should already be installed as part of the above Ruby install. You can check that by checking their versions.
    ```shell
    gem -v
    gcc -v
    g++ -v
    make -v
    ```

3. Gems (RubyGems packages) should be installed in a user directory. A convenient location is `~/.gems`.
    ```shell
    echo -e '\n# Install Ruby Gems to ~/.gems\nexport GEM_HOME="$HOME/.gems"\nexport PATH="$HOME/.gems/bin:$PATH"' >> ~/.bashrc
    source ~/.bashrc
    ```

4. Install the Jekyll and Bundler gems.
    ```shell
    gem install jekyll bundler
    ```

5. Testing your GitHub Pages site locally will require a GitHub API authentication token.
    1. In GitHub, click your profile image, then choose **Settings** from the menu.
    2. In the left navigation bar, click **Developer settings**.
    3. In the left navigation bar, expand **Personal access tokens** and click **Fine-grained tokens**.
    4. Click **Generate new token**. Confirm access if requested.
    5. Provide a name for the token: *(e.g., Local Jeykyll GitHub)*
    6. Epiration date: *(default is 30 days)*
    7. Repository access: *Public Repositories (read-only)*
    8. Permissions: *(all set to No Access)*
    9. Click **Generate token**.
    10. Copy the token, and add it as an export to `~/.bashrc`. (Remember to run `source ~/.bashrc` to make the token available.)
        ```shell
        # GitHub API access token for Jekyll
        export JEKYLL_GITHUB_TOKEN=github_pat_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwsyz0123456789ABCDEFGHIJ
        ```

## Testing your GitHub Pages site locally

1. Clone your GitHub Pages repo to a local directory, called `~/code/pagesrepo` in these instructions.

2. In a terminal window, navigate to the `docs` directory within your repo's local directory. This directory should contain a file called `Gemfile`.
    ```shell
    cd ~/code/pagesrepo/docs
    ls Gemfile
    ```

3. Install the bundle for your site.
    ```shell
    bundle install
    ```

    {{site.callout_note}} You may see an indication that your GitHub Pages repo was built using an older version of Bundler, Jekyll, GitHub Pages, etc. If so, try updating the GitHub Pages gem.
    ```shell
    bundle update github-pages
    ```

4. Run your site.
    ```shell
    bundle exec jekyll serve
    ```

    {{site.callout_note}} If this fails with a GitHub API authentication token error, repeat Prequesities step 5.

5. Preview your site in your browser. Navigate to the server address displayed, e.g., `http://127.0.0.1:4000`.

## References
- [Jekyll Installation](https://jekyllrb.com/docs/installation/)
- [Test site locally with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)
- [No GitHub API authentication token could be found](https://josephtingiris.github.io/jekyll/github/metadata/2017/10/15/no-github-api-authentication-could-be-found/)
- [Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
