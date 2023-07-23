---
---

{% assign notes = site.notes | sort: "title" %}

{%- capture newline %}
{% endcapture -%}

var notes = [
{%- for note in notes -%}
    {{- comma}}
    {%- assign title = note.title | strip | escape | replace: '"', "&quot;" -%}
    {%- assign excerpt = note.excerpt | strip | strip_html | escape | replace: '"', "&quot;" | replace: newline, " " -%}
    {
        "title": "{{title}}",
        "url": "{{site.baseurl}}{{note.url}}",
        "date": "{{note.date | date: "%Y-%m-%d"}}",
        "size": {{note.content.size}},
        "excerpt": "{{excerpt}}",
        "tags": [{%- if note.tags.size > 0 -%}"{{note.tags | join: '", "'}}"{%- endif -%}]
    }
    {%- assign comma = "," -%}
{%- endfor -%}
];

{% assign alltags = site.notes | map: "tags" | compact | sort | uniq %}
var alltags = ["{{alltags | join: '", "'}}"]

// https://stackoverflow.com/a/5158301
var getTagParameter = function() {
    var match = RegExp('[?&]tag=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

var getNotesByTag = function(tag) {
    return tag
        ? notes.filter(note => { return note.tags.indexOf(tag) >= 0 })
        : notes;
}

function isShowable(value, pinned) {
    return pinned
        ? value == true
        : value != true;
}

var getNotesByTag = function(tag, pinned) {
    return tag
        ? notes.filter(note => { return isShowable(note.pinned, pinned) & note.tags.indexOf(tag) >= 0 })
        : notes.filter(note => { return isShowable(note.pinned, pinned) });
}

var addNotes = function(pinned) {
    let myNotes = getNotesByTag(myTag == starTag ? "" : myTag, pinned);

    //var noteslist = $("#"+noteslistId);

    myNotes.forEach(note => {
      let isPinned = false;
      if ( typeof note.pinned !== 'undefined' ) {
        let isPinned = note.pinned == true;
      }
      let liNode = document.createElement("li");
      let aNode = document.createElement("a");
      aNode.setAttribute("href", note.url);
      aNode.append(note.title);
      liNode.append(aNode);
      liNode.append(document.createElement("br"));
      liNode.append(note.excerpt);
      liNode.append(isPinned);
      liNode.append(note.pinned);
      noteslist.append(liNode);
    });
}
