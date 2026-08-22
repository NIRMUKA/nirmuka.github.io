/* =========================================================

   NIRMUKA WRITINGS ENGINE

   STANDALONE PAGE VERSION


   writings.html
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



let writingsData = [];





/* =========================================================
   INITIALIZE
========================================================= */


document.addEventListener(
"DOMContentLoaded",
()=>{


loadWritings();


}

);







/* =========================================================
   LOAD DATABASE
========================================================= */


function loadWritings(){



fetch(
"/writings.json?v=20"
)



.then(
response=>{


if(!response.ok){

throw new Error(
"writings.json not found"
);

}


return response.json();


}

)



.then(
data=>{


writingsData = data;



console.log(
"NIRMUKA WRITINGS LOADED",
writingsData
);



activateCategories();



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


function activateCategories(){



const buttons =
document.querySelectorAll(
"[data-category]"
);





buttons.forEach(
button=>{



button.addEventListener(
"click",
()=>{


const category =
button.dataset.category;



showWritingList(
category
);



});


});



}









/* =========================================================
   SHOW WRITING LIST
========================================================= */


function showWritingList(
category
){



const container =
document.getElementById(
"writing-list"
);



if(!container){

return;

}







const articles =
writingsData.filter(
item=>
item.category === category
);







if(!articles.length){


container.innerHTML = `


<p>

NO ARCHIVE FOUND

</p>


`;

return;

}







container.innerHTML = `



<h2 class="writing-title">

${category}

</h2>





<div class="writing-items">



${
articles.map(
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

${item.type || ""}

·

${item.year || ""}

</span>



</div>



</a>




`
).join("")
}



</div>



`;







/* SMOOTH CAMERA */

setTimeout(
()=>{


const target =
document.getElementById(
"writing-list-section"
);



if(target){


target.scrollIntoView({

behavior:"smooth",

block:"start"


});


}


},
300
);



}





})();
