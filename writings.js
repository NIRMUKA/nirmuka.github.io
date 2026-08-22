/* =========================================================

   NIRMUKA WRITINGS ENGINE

   STANDALONE ARCHIVE SYSTEM


========================================================= */


(function(){


"use strict";



let database = [];





document.addEventListener(
"DOMContentLoaded",
()=>{


loadArchive();


});








function loadArchive(){



fetch("/writings.json?v=50")

.then(response=>{


if(!response.ok){

throw new Error(
"JSON NOT FOUND"
);

}


return response.json();


})

.then(data=>{


database=data;


console.log(
"WRITINGS DATABASE",
database
);



activateCategory();



})

.catch(error=>{


console.error(
error
);


});



}









function activateCategory(){



document
.querySelectorAll(
"[data-category]"
)

.forEach(button=>{



button.addEventListener(
"click",
()=>{


renderList(
button.dataset.category
);



});


});


}









function renderList(category){



const container =
document.getElementById(
"writing-list"
);



if(!container){

return;

}







const articles =
database.filter(
item=>

item.category === category

);






if(!articles.length){



container.innerHTML = `

<p>
NO WRITING FOUND
</p>

`;

return;

}






container.innerHTML = `



<h2 class="archive-title">

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


<h3>

${item.title}

</h3>



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





setTimeout(()=>{


document
.getElementById(
"writing-list-section"
)
.scrollIntoView({

behavior:"smooth",

block:"start"

});


},200);



}



})();
