/* =====================================================

   NIRMUKA CORE ENGINE

   HOME ROUTER


===================================================== */


(function(){


"use strict";





document.addEventListener(
"DOMContentLoaded",
()=>{


initNavigation();


});









function initNavigation(){



const links =
document.querySelectorAll(
".main-menu a[data-page]"
);






links.forEach(
link=>{


link.addEventListener(
"click",
function(e){



e.preventDefault();




const page =
this.dataset.page;



if(page){

loadPage(page);

}



});



});



}









function loadPage(page){



const container =
document.getElementById(
"content-container"
);



if(!container){

return;

}





if(page==="works"){



container.innerHTML = `

<section class="page-section">

<h1>
WORKS
</h1>

</section>

`;



}






if(page==="about"){



container.innerHTML = `

<section class="page-section">

<h1>
ABOUT
</h1>

</section>

`;



}




}



})();
