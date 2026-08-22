/* =====================================================
   NIRMUKA WRITING DETAIL ENGINE

   Handle:
   - Read URL ID
   - Load writing database
   - Load markdown content
   - Render article

===================================================== */


(function(){

"use strict";





/* =====================================================
   GET ID
===================================================== */


const params =
new URLSearchParams(
window.location.search
);


const id =
params.get("id");



if(!id){

console.error(
"Writing ID missing"
);

return;

}





/* =====================================================
   LOAD DATABASE
===================================================== */


fetch("/writings.json?v=1")


.then(response=>response.json())


.then(data=>{


const writing =
data.find(
item =>
item.id === id
);



if(!writing){


console.error(
"Writing not found"
);


return;


}



renderMetadata(writing);


loadMarkdown(
writing.content
);



})

.catch(error=>{


console.error(
"WRITING ERROR",
error
);


});









/* =====================================================
   METADATA
===================================================== */


function renderMetadata(data){



document.title =
data.title +
" | NIRMUKA";





setText(
"writing-category",
data.category
);



setText(
"writing-title",
data.title
);



setText(
"writing-subtitle",
data.subtitle
);



setText(
"writing-year",
data.year
);



setText(
"writing-type",
data.type
);



setText(
"writing-abstract",
data.abstract
);



const ref =
document.getElementById(
"writing-references"
);



if(ref && data.references){


ref.innerHTML =
data.references
.map(
item =>
`
<li>
${item}
</li>
`
)
.join("");

}



}







/* =====================================================
   LOAD MARKDOWN
===================================================== */


function loadMarkdown(path){



fetch(path)


.then(response=>response.text())


.then(markdown=>{


const html =
markdownToHTML(
markdown
);



document.getElementById(
"writing-content"
)
.innerHTML =
html;



})


.catch(error=>{


console.error(
"MARKDOWN ERROR",
error
);


});

}









/* =====================================================
   SIMPLE MARKDOWN PARSER

   Support:
   # Heading
   ## Subheading
   paragraph
   bold

===================================================== */


function markdownToHTML(md){



let html =
md;



/* heading */


html =
html.replace(
/^### (.*$)/gim,
"<h3>$1</h3>"
);



html =
html.replace(
/^## (.*$)/gim,
"<h2>$1</h2>"
);



html =
html.replace(
/^# (.*$)/gim,
"<h1>$1</h1>"
);





/* bold */


html =
html.replace(
/\*\*(.*?)\*\*/g,
"<strong>$1</strong>"
);






/* paragraph */


html =
html
.split("\n\n")
.map(
block=>{

if(
block.startsWith("<h")
){

return block;

}


return `<p>${block}</p>`;

}

)
.join("");



return html;


}









/* =====================================================
   SET TEXT HELPER
===================================================== */


function setText(
id,
value
){


const element =
document.getElementById(id);



if(element){


element.textContent =
value || "";


}



}





})();
