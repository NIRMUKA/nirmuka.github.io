/* =========================================================

   NIRMUKA ARTICLE ENGINE

   MANUSCRIPT READER SYSTEM


   article.html?id=

        ↓

   writings.json

        ↓

   render article


========================================================= */


(function(){


"use strict";





/* =========================================================
   START
========================================================= */


document.addEventListener(
"DOMContentLoaded",
()=>{


loadArticle();


}

);









/* =========================================================
   GET ARTICLE ID
========================================================= */


function getArticleID(){



const params =
new URLSearchParams(
window.location.search
);



return params.get(
"id"
);



}









/* =========================================================
   LOAD ARTICLE DATA
========================================================= */


function loadArticle(){



const id =
getArticleID();





if(!id){


showError(
"ARTICLE NOT FOUND"
);


return;

}







fetch(
"/writings.json?v=20"
)



.then(
response=>response.json()
)



.then(
data=>{



const article =
data.find(
item=>
String(item.id) === String(id)
);



if(!article){


showError(
"ARTICLE NOT FOUND"
);


return;


}





renderArticle(
article
);



}

)



.catch(
error=>{


console.error(
"ARTICLE ERROR:",
error
);


showError(
"FAILED TO LOAD ARTICLE"
);


}

);



}









/* =========================================================
   RENDER
========================================================= */


function renderArticle(
article
){



const category =
document.getElementById(
"article-category"
);



const title =
document.getElementById(
"article-title"
);



const subtitle =
document.getElementById(
"article-subtitle"
);



const type =
document.getElementById(
"article-type"
);



const year =
document.getElementById(
"article-year"
);



const content =
document.getElementById(
"article-content"
);







if(category){

category.textContent =
article.category || "";

}




if(title){

title.textContent =
article.title || "";

}





if(subtitle){

subtitle.textContent =
article.subtitle || "";

}




if(type){

type.textContent =
article.type || "";

}





if(year){

year.textContent =
article.year || "";

}







/*
   CONTENT HANDLER

   Bisa menerima:

   1. article.content
   2. article.body

*/


let body = "";



if(article.content){


body =
article.content;


}
else if(article.body){


body =
article.body;


}
else{


body =
"";


}








if(content){


content.innerHTML =
formatContent(body);


}





}









/* =========================================================
   FORMAT MANUSCRIPT
========================================================= */


function formatContent(
text
){



if(!text){

return "";

}





return text

.split(
"\n"
)

.map(
paragraph=>{


if(
paragraph.trim()===""
){

return "";

}



return `

<p>

${paragraph}

</p>

`;

}

)

.join("");



}









/* =========================================================
   ERROR
========================================================= */


function showError(
message
){



const content =
document.getElementById(
"article-content"
);



if(content){


content.innerHTML = `

<p>

${message}

</p>

`;

}



}









})();
