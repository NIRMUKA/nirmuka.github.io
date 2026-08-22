/* =========================================================
   NIRMUKA WRITINGS ENGINE

   SYSTEM:

   WRITINGS
      |
      |
      ↓
   writings.json
      |
      |
      ↓
   article.html?id=

========================================================= */


(function(){


"use strict";





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


<button data-category="FILSAFAT">

FILSAFAT

</button>


<button data-category="TEOLOGI">

TEOLOGI

</button>


<button data-category="UMUM">

UMUM

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





loadWriting();



};









function loadWriting(){



fetch(
"/writings.json?v=10"
)



.then(
res=>res.json()
)



.then(
data=>{


window.nirmukaWritingData =
data;



initCategory();



}

)

.catch(
err=>{


console.error(
"WRITINGS ERROR",
err
);


}

);



}









function initCategory(){



document
.querySelectorAll(
"[data-category]"
)
.forEach(
button=>{


button.onclick=function(){



showWriting(
button.dataset.category
);



};


});


}









function showWriting(
category
){



const list =
document.getElementById(
"writing-list"
);



const data =
window.nirmukaWritingData
.filter(
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



`

).join("")

}



</div>


`;



}





})();
