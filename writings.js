/* =========================================================

   NIRMUKA WRITINGS ENGINE

   CORE SYSTEM ONLY


   FLOW:

   HERO
     ↓
   WRITINGS INTRO
     ↓
   ARCHIVE CATEGORY
     ↓
   WRITING LIST
     ↓
   ARTICLE


========================================================= */


(function(){


"use strict";



let writingData = [];






/* =========================================================
   OPEN WRITINGS ARCHIVE
========================================================= */


window.openWritingArchive = function(){



const content =
document.getElementById(
"content-container"
);



if(!content){

return;

}




content.innerHTML = `


<section class="writings-page">


<div class="writings-container">






<section class="writing-intro">


<a
href="#"
class="back-home"
>
← BACK
</a>



<p class="work-number">
ARCHIVE / WRITINGS
</p>



<h1>
WRITINGS
</h1>



<p>
A collection of philosophical,
theological, and reflective writings.
</p>



</section>









<section
class="writing-archive"
id="archive-section"
>


<div class="writing-category-menu">



<button data-category="FILSAFAT">

<span class="archive-number">
01
</span>


<span class="archive-name">
FILSAFAT
</span>


<span class="archive-label">
PHILOSOPHICAL ARCHIVE
</span>


</button>






<button data-category="TEOLOGI">

<span class="archive-number">
02
</span>


<span class="archive-name">
TEOLOGI
</span>


<span class="archive-label">
THEOLOGICAL ARCHIVE
</span>


</button>






<button data-category="UMUM">

<span class="archive-number">
03
</span>


<span class="archive-name">
UMUM
</span>


<span class="archive-label">
GENERAL ARCHIVE
</span>


</button>




</div>


</section>









<section
class="writing-list-section"
id="writing-list-section"
>


<div id="writing-list">

SELECT ARCHIVE

</div>


</section>







</div>


</section>


`;





loadWritingData();



};









/* =========================================================
   LOAD DATABASE
========================================================= */


function loadWritingData(){



fetch(
"/writings.json?v=100"
)



.then(
response=>{


if(!response.ok){

throw new Error(
"Cannot load writings.json"
);

}


return response.json();


}

)



.then(
data=>{


writingData = data;


activateCategory();


}

)



.catch(
error=>{


console.error(
"WRITINGS ERROR:",
error
);


}

);



}









/* =========================================================
   CATEGORY BUTTON
========================================================= */


function activateCategory(){



const buttons =
document.querySelectorAll(
"[data-category]"
);



buttons.forEach(
button=>{


button.addEventListener(
"click",
function(){



renderWritingList(
button.dataset.category
);



});


});


}









/* =========================================================
   RENDER ARTICLE LIST
========================================================= */


function renderWritingList(
category
){



const list =
document.getElementById(
"writing-list"
);



if(!list){

return;

}







const filtered =
writingData.filter(
item=>
item.category === category
);



if(!filtered.length){


list.innerHTML = `

<p>
NO ARCHIVE FOUND
</p>

`;

return;

}







list.innerHTML = `



<h2 class="writing-title">

${category}

</h2>





<div class="writing-items">


${
filtered.map(
(item,index)=>`


<a

href="/article.html?id=${item.id}"

class="writing-item"

>


<div class="writing-number">

${

String(index+1)
.padStart(2,"0")

}

</div>




<div class="writing-data">


<h3>

${item.title}

</h3>



<p>

${item.subtitle || ""}

</p>




<span>

${item.type}

·

${item.year}

</span>



</div>



</a>


`
).join("")
}


</div>


`;



}








})();
