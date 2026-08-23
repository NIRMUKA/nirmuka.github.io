/* =====================================================
   NIRMUKA WRITINGS ENGINE

   Function:
   - Load writings.json
   - Render writing archive
   - Category filter
   - Open detail page

===================================================== */


(function(){


"use strict";



let writings = [];

let currentCategory = "ALL";





/* =====================================================
   INIT
===================================================== */


window.openWritingArchive = function(){


const container =
document.getElementById(
"content-container"
);



if(!container){

console.error(
"Writing container missing"
);

return;

}



container.innerHTML = `


<section class="writing-archive">


<header class="writing-title">

<p>
WRITINGS
</p>


<h1>
Archive of Thoughts
</h1>


</header>



<nav class="writing-filter">


<button data-category="ALL">
ALL
</button>


<button data-category="FILSAFAT">
FILSAFAT
</button>


<button data-category="TEOLOGI">
TEOLOGI
</button>


<button data-category="UMUM">
UMUM
</button>


</nav>



<div 
id="writing-list"
class="writing-list"
>


</div>


</section>



`;



loadWritings();


};









/* =====================================================
   LOAD JSON
===================================================== */


function loadWritings(){


fetch(
"/writings.json?v=1"
)


.then(
response =>
response.json()
)


.then(
data=>{


writings = data;


renderWritings();


setupFilter();



}

)


.catch(
error=>{


console.error(
"WRITING LOAD ERROR",
error
);


});


}









/* =====================================================
   RENDER
===================================================== */


function renderWritings(){



const container =
document.getElementById(
"writing-list"
);



if(!container)
return;




let filtered =
writings.filter(
item=>{


if(currentCategory==="ALL")
return true;


return item.category === currentCategory;


}

);





container.innerHTML =
filtered
.map(
writing=>`


<article 
class="writing-card"
data-id="${writing.id}"
>


<p class="writing-category">

${writing.category}

</p>



<h2>

${writing.title}

</h2>



<p class="writing-subtitle">

${writing.subtitle}

</p>



<div class="writing-meta">


<span>
${writing.year}
</span>


<span>
${writing.type}
</span>


</div>



</article>



`

)
.join("");





addCardEvents();



}









/* =====================================================
   CARD CLICK
===================================================== */


function addCardEvents(){


document
.querySelectorAll(
".writing-card"
)
.forEach(
card=>{


card.addEventListener(
"click",
()=>{


const id =
card.dataset.id;



window.location.href =

"/writing-detail.html?id="
+
id;



}

);



}

);



}









/* =====================================================
   FILTER
===================================================== */


function setupFilter(){


document
.querySelectorAll(
".writing-filter button"
)
.forEach(
button=>{


button.addEventListener(
"click",
()=>{


currentCategory =
button.dataset.category;



document
.querySelectorAll(
".writing-filter button"
)
.forEach(
btn=>
btn.classList.remove(
"active"
)

);



button.classList.add(
"active"
);



renderWritings();



}

);



}

);



}






})();
