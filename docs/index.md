---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---

- [Debian 11 (Buster) on a Lenovo Thinkpad T470](notes/debian11.html)
- [Connecting Git to GitHub](notes/connecting-git-to-github.html)
- [Visual Studio Code](notes/vscode.html)

{% for notes in site.notes %}
    - {{note.title}}
{% endfor %}
