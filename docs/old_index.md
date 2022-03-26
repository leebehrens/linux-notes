---
layout: default
published: false
---
<script type="text/javascript">

console.log("--notes--");
console.log(notes.length);
notes.forEach(note => console.log(note.title, note.tags));

console.log("--alltags--");
console.log(alltags.length);
alltags.forEach(tag => console.log(tag));

console.log("--tag--");
var mytag = getTagParameter();
console.log(mytag);

console.log("--notes by tag--");
var mynotes = getNotesByTag(mytag);
console.log(mynotes.length);
mynotes.forEach(note => console.log(note.title, note.tags));

</script>

<div id="tagslist">
</div>

<!--
<form action="" method="get">
<select id="tagslist2" name="tag" onChange="form.submit()">
  <option value="">*</option>
  <option>email</option>
</select>
</form>
-->

<ul id="noteslist">
</ul>

<script type="text/javascript">

  function ready() {
    let myUrl = window.location.origin + window.location.pathname;
    let myTag = getTagParameter();

    // alltags.forEach(tag => {
    //   let liNode = document.createElement("li");
    //   let aNode = document.createElement("a");

    //   aNode.append(tag);

    //   if (tag == myTag) {
    //     aNode.setAttribute("href", myUrl);
    //     let strongNode = document.createElement("strong");
    //     strongNode.append(aNode);
    //     liNode.append(strongNode);
    //   }
    //   else {
    //     aNode.setAttribute("href", myUrl + "?tag=" + tag);
    //     liNode.append(aNode);
    //   }
    //   tagslist.append(liNode);
    // });

    const starTag = "all";
    myAlltags = [starTag].concat(alltags);
    let delim = "";
    myAlltags.forEach(tag => {
      let aNode = document.createElement("a");
      if (tag == myTag || tag == "" || tag == null) {
        aNode.append("[" + tag + "]");
        aNode.setAttribute("href", myUrl);
      }
      else {
        aNode.append(tag);
        aNode.setAttribute("href", tag == starTag ? myUrl : myUrl + "?tag=" + tag);
      }
      tagslist.append(delim);
      tagslist.append(aNode);
      delim = " | ";
    });

    let myNotes = getNotesByTag(myTag == starTag ? "" : myTag);

    myNotes.forEach(note => {
      let liNode = document.createElement("li");
      let aNode = document.createElement("a");
      aNode.setAttribute("href", note.url);
      aNode.append(note.title);
      liNode.append(aNode);
      liNode.append(document.createElement("br"));
      liNode.append(note.excerpt);
      noteslist.append(liNode);
    });

  }

  document.addEventListener("DOMContentLoaded", ready);
</script>


<hr/>
<hr/>

{% assign alltags = site.notes | map: "tags" | compact | sort | uniq %}
{{alltags.size}}
{{alltags | join: ", "}}
<ul>
{% for tags in alltags %}

  <li>{{tags.size}} {{tags | join: ", "}}</li>
{% endfor %}
</ul>

<script type="text/javascript">
  var alltags = ["{{alltags | join: '", "'}}"]
</script>

<hr/>

{% assign notes = site.notes | sort: "title" %}
$ ls -l --preview<br/>
total {{notes.size}}<br/>

{%- capture newline %}
{% endcapture -%}
<script type="type/javascript">
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
    "except": "{{excerpt}}",
    "tags": [{%- if note.tags.size > 0 -%}"{{note.tags | join: '", "'}}"{%- endif -%}]
  }
  {%- assign comma = "," -%}
{%- endfor -%}
];



</script>


<hr/>


<ul>
{% for note in site.notes %}
  {% if note.hide %} {% continue %} {% endif %}
  {% assign excerpt = note.excerpt | strip | strip_html | escape | replace: '"', "&quot;" %}
  <li class="notes-list"><a href="{{site.baseurl}}{{note.url}}">{{ note.title | escape }}</a><br/>{{excerpt}}</li>
{% endfor %}
</ul>

<table class="notes-list">
{% for note in site.notes %}
  {% if note.hide %} {% continue %} {% endif %}
  {% assign excerpt = note.excerpt | strip | strip_html | escape | replace: '"', "&quot;" %}
  <tr>
  <!--<td class="notes-list">-rrr</td>-->
  <td class=".notes-list-rj"><span class="sizenum">{{note.content.size}}</span></td>
  <td class="notes-list">{{note.date | date: "%Y-%m-%d"}}</td>
  <td class="notes-list"><a href="{{site.baseurl}}{{note.url}}">{{ note.title }}</a><br/>{{excerpt}}</td>
  </tr>
{% endfor %}
</table>

{% for note in site.notes %}
  {% if note.hide %} {% continue %} {% endif %}
  {% assign excerpt = note.excerpt | strip | strip_html | escape | replace: '"', "&quot;" %}
  <p>
  <span class="pickme" class=".notes-list-rj">{{note.content.size}}</span> |
  {{note.date | date: "%Y-%m-%d"}} |
  <a href="{{site.baseurl}}{{note.url}}" title="{{excerpt}}">{{ note.title }}</a>
  </p>
{% endfor %}

<p>$ &#9647;</p>
<p>$ &#9646;</p>

<script type="text/javascript">
    const numfmt = Intl.NumberFormat();
    let x = document.querySelectorAll(".sizenum");
    document.write(x.length);
    for (let i = 0, len = x.length; i < len; i++) {
        let num = Number(x[i].innerHTML);
        if (num > 1024) {
            num = Math.round(num / 1024);
            //num = (Math.round(num * 2) / 2).toFixed(1);
            unit = "K";
        }
        else {
          unit = "B";
        }
        num = numfmt.format(num) + unit;
        x[i].innerHTML = num;
        document.write(num);
    }
    document.write("Done!");
</script>
