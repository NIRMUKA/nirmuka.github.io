/* =========================================================
   NIRMUKA WRITINGS ENGINE

   FLOW:

   HERO
    |
    ↓
   WRITINGS INTRO
    |
    ↓ smooth scroll
   ARCHIVE BOX
    |
    ↓ click category
   WRITING LIST
    |
    ↓ click article
   article.html?id=

========================================================= */


(function(){


"use strict";





/* =========================================================
   OPEN WRITINGS
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





<section 
class="writing-intro"
>


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


<div
id="writing-list"
>


<p>
SELECT ARCHIVE
</p>


</div>



</section>






</div>


</section>


`;





/* LOAD DATABASE */


loadWriting();







/* MOVE CAMERA TO ARCHIVE */


setTimeout(()=>{


const archive =
document.getElementById(
"archive-section"
);



if(archive){


archive.scrollIntoView({

behavior:"smooth",

block:"center"

});


}


},1000);






};









/* =========================================================
   LOAD JSON
========================================================= */


function loadWriting(){



fetch(
"/writings.json?v=100"
)



.then(
response =>
response.json()
)



.then(
data=>{


window.nirmukaWritingData =
data;



activateCategory();



}

)



.catch(
error=>{


console.error(
"WRITING ERROR",
error
);


}

);



}









/* =========================================================
   CATEGORY BUTTON
========================================================= */


function activateCategory(){



document
.querySelectorAll(
"[data-category]"
)
.forEach(
button=>{



button.onclick = function(){


showWriting(
button.dataset.category
);



};



});


}









/* =========================================================
   SHOW WRITING LIST
========================================================= */


function showWriting(category){



const list =
document.getElementById(
"writing-list"
);



if(!list){

return;

}





const writings =
window.nirmukaWritingData.filter(
item =>
item.category === category
);







list.innerHTML = `



<div class="writing-title">

${category}

</div>





<div class="writing-items">


${

writings.map(
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









/* MOVE CAMERA TO LIST */


setTimeout(()=>{


const section =
document.getElementById(
"writing-list-section"
);



if(section){


section.scrollIntoView({

behavior:"smooth",

block:"start"

});


}


},300);



}








})();
