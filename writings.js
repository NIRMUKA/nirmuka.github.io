/* =====================================================
   NIRMUKA WRITINGS ENGINE
   VERSION 1.0

   Handle:
   - Load writings database
   - Category archive
   - Writing list
   - Detail navigation

===================================================== */


(function(){

"use strict";


let writingsDatabase = [];



/* =====================================================
   OPEN WRITINGS ARCHIVE
===================================================== */


window.openWritingArchive = function(){


const content =
document.getElementById(
"content-container"
);


if(!content){
return;
}



content.innerHTML = `


<section class="page-section writings-page">


<div class="section-inner">


<a href="#"
class="back-home">

← BACK

</a>



<p class="work-number">

ARCHIVE / WRITINGS

</p>



<h2>

WRITINGS

</h2>



<div class="writing-category-menu">


<button data-category="FILSAFAT">

01

<br>

FILSAFAT

</button>



<button data-category="TEOLOGI">

02

<br>

TEOLOGI

</button>



<button data-category="UMUM">

03

<br>

UMUM

</button>


</div>




<div id="writing-list">

</div>



</div>

</section>


`;



loadWritings();


};





/* =====================================================
   LOAD JSON
===================================================== */


function loadWritings(){


fetch("/writings.json?v=1")


.then(response=>response.json())


.then(data=>{


writingsDatabase=data;


activateCategory();


})


.catch(error=>{


console.error(
"WRITINGS ERROR",
error
);


});


}






/* =====================================================
   CATEGORY BUTTON
===================================================== */


function activateCategory(){


const buttons =
document.querySelectorAll(
"[data-category]"
);



buttons.forEach(button=>{


button.addEventListener(
"click",
()=>{


showCategory(
button.dataset.category
);


});


});


}







/* =====================================================
   SHOW WRITING LIST
===================================================== */


function showCategory(category){



const list =
document.getElementById(
"writing-list"
);



if(!list){
return;
}



const writings =
writingsDatabase.filter(
item =>
item.category === category
);



if(writings.length===0){


list.innerHTML=`

<h3>
NO ARCHIVE FOUND
</h3>

`;


return;


}




list.innerHTML=`



<h3 class="writing-category-title">

${category}

</h3>




<div class="writing-items">


${
writings.map(
(item,index)=>`


<a

class="writing-item"

href="/writing-detail.html?id=${item.id}"

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
