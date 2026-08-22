/* =========================================================
   NIRMUKA WRITINGS ENGINE

   SYSTEM:

   WRITINGS
      |
      ↓
   writings.json
      |
      ↓
   archive category
      |
      ↓
   article.html?id=

========================================================= */


(function(){


"use strict";





/* =========================================================
   OPEN WRITINGS ARCHIVE
========================================================= */


window.openWritingArchive = function(){



const content =
document.getElementById(
"content-container"
);



if(!content){

console.error(
"Content container not found"
);

return;

}






content.innerHTML = `



<section class="writings-page">


<div class="writings-container">





<a
href="#"
class="back-home"
>
← BACK
</a>







<header class="writing-header">


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


</header>







<div class="writing-category-menu">





<button 
data-category="FILSAFAT"
>


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







<button 
data-category="TEOLOGI"
>


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







<button 
data-category="UMUM"
>


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








<div id="writing-list">


<p>
SELECT ARCHIVE
</p>


</div>







</div>


</section>


`;






/* LOAD DATABASE */


loadWriting();





};









/* =========================================================
   LOAD JSON
========================================================= */


function loadWriting(){



fetch(
"/writings.json?v=50"
)



.then(
response=>{


if(!response.ok){

throw new Error(
"writings.json error"
);

}


return response.json();


}
)



.then(
data=>{



window.nirmukaWritingData =
data;




initCategory();





/* AUTO SCROLL AFTER READY */


setTimeout(()=>{


const archive =
document.querySelector(
".writing-category-menu"
);



if(archive){


archive.scrollIntoView({

behavior:"smooth",

block:"center"


});


}



},1200);





/* REVEAL CATEGORY */


setTimeout(()=>{


document
.querySelectorAll(
".writing-category-menu button"
)
.forEach(
(btn,index)=>{


btn.style.animationDelay =
`${index * 0.2}s`;


btn.classList.add(
"archive-ready"
);


});


},400);





}

)



.catch(
error=>{


console.error(
"WRITINGS ERROR:",
error
);



const list =
document.getElementById(
"writing-list"
);



if(list){


list.innerHTML = `

<p>
FAILED TO LOAD ARCHIVE
</p>

`;

}



}

);



}









/* =========================================================
   CATEGORY BUTTON
========================================================= */


function initCategory(){



const buttons =
document.querySelectorAll(
"[data-category]"
);




buttons.forEach(
button=>{


button.addEventListener(
"click",
()=>{


showWriting(
button.dataset.category
);



});


});


}









/* =========================================================
   SHOW ARTICLE LIST
========================================================= */


function showWriting(
category
){



const list =
document.getElementById(
"writing-list"
);



if(!list){

return;

}






const data =
window.nirmukaWritingData.filter(
item=>
item.category === category
);







if(!data.length){


list.innerHTML = `

<p>
NO ARCHIVE FOUND
</p>

`;

return;


}








list.innerHTML = `



<div class="writing-title">

${category}

</div>





<div class="writing-items">



${
data.map(
(item,index)=>{


return `



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


<h2>

${item.title}

</h2>




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



`;


}

).join("")
}



</div>


`;






/* SCROLL TO ARTICLE LIST */


setTimeout(()=>{


list.scrollIntoView({

behavior:"smooth",

block:"start"


});


},300);





}









})();
