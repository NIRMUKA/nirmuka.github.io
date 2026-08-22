/* =========================================================
   NIRMUKA WRITINGS ENGINE

   Handle:
   - Writing archive
   - Category navigation
   - Writing list
   - Article redirect

========================================================= */


(function(){


"use strict";





/* =========================================================
   CONNECT TO SCRIPT.JS

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






<a
href="#"
class="back-home"
>
← BACK
</a>








<div class="writing-header">


<p class="work-number">

ARCHIVE / WRITINGS

</p>




<h1>

WRITINGS

</h1>




<p>

A collection of thoughts,
questions, reflections,
and intellectual fragments.

</p>



</div>








<div class="writing-category-menu">


<button
data-category="FILSAFAT"
>

FILSAFAT

</button>



<button
data-category="TEOLOGI"
>

TEOLOGI

</button>




<button
data-category="UMUM"
>

UMUM

</button>


</div>








<div
id="writing-list"
>


<p>

SELECT ARCHIVE

</p>


</div>








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
"/writings.json?v=1"
)



.then(
response =>
response.json()
)



.then(
data=>{


window.nirmukaWriting =
data;



activateCategory();



}

)



.catch(
error=>{


console.error(
"WRITING ERROR:",
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
()=>{


const category =
button.dataset.category;



showWritingList(
category
);



}
);



}
);



}









/* =========================================================
   SHOW LIST

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




const writings =
window.nirmukaWriting.filter(
item =>
item.category === category
);





if(
writings.length === 0
){


container.innerHTML = `

<p>

NO WRITING FOUND

</p>

`;

return;


}






container.innerHTML = `



<div class="writing-title">

${category}

</div>




<div class="writing-items">


${
writings.map(
(item,index)=>{


return `


<a

class="writing-item"

href="${item.file}"

>


<div class="writing-number">

${String(index+1).padStart(2,"0")}

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



}






})();
