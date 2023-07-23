---
layout: default
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

console.log("--notes by tag, pinned--");
var mynotes = getNotesByTag(mytag, true);
console.log(mynotes.length);
mynotes.forEach(note => console.log(note.title, note.tags));

console.log("--notes by tag, not pinned--");
var mynotes = getNotesByTag(mytag, false);
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
    myTag = myTag == "" || myTag == null ? starTag : myTag;
    myAlltags = [starTag].concat(alltags);
    let delim = "";
    myAlltags.forEach(tag => {
      let aNode = document.createElement("a");
      console.log("tag=", tag, "  myTag=", myTag);
      if (tag == myTag ) {
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
      if (note.pinned == true) {
        let liNode = document.createElement("li");
        let aNode = document.createElement("a");
        aNode.setAttribute("href", note.url);
        aNode.append(note.title);
        liNode.append(aNode);
        liNode.append(document.createElement("br"));
        liNode.append(note.excerpt);
        noteslist.append(liNode);
      }
    }

    myNotes.forEach(note => {
      if (note.pinned != true) {
        let liNode = document.createElement("li");
        let aNode = document.createElement("a");
        aNode.setAttribute("href", note.url);
        aNode.append(note.title);
        liNode.append(aNode);
        liNode.append(document.createElement("br"));
        liNode.append(note.excerpt);
        noteslist.append(liNode);
      }
    }

    );

  }

  document.addEventListener("DOMContentLoaded", ready);
</script>
