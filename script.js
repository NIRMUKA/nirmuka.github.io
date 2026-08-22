/* =========================================================

   NIRMUKA CORE ENGINE

   ROUTING SYSTEM


   WORKS
      |
      ↓
   content-container


   ABOUT
      |
      ↓
   content-container


   WRITINGS
      |
      ↓
   writings.html


========================================================= */


(function(){


"use strict";





document.addEventListener(
"DOMContentLoaded",
()=>{


initNavigation();


});









/* =========================================================
   MENU SYSTEM
========================================================= */


function initNavigation(){



const menuLinks =
document.querySelectorAll(
".main-menu a"
);






menuLinks.forEach(
link=>{



link.addEventListener(
"click",
function(event){



const page =
this.dataset.page;





/*
   ONLY HANDLE
   WORKS & ABOUT


   WRITINGS HAS NO data-page

   SO IT WILL CONTINUE
   NATIVELY TO writings.html

*/



if(!page){

return;

}




event.preventDefault();




loadPage(page);



});


});



}









/* =========================================================
   PAGE LOADER
========================================================= */


function loadPage(page){



const container =
document.getElementById(
"content-container"
);





if(!container){

return;

}






switch(page){



case "works":



loadWorks(
container
);


break;





case "about":



loadAbout(
container
);


break;



}



}









/* =========================================================
   WORKS
========================================================= */


function loadWorks(container){



container.innerHTML = `


<section class="page-section works-section">


<h1>

WORKS

</h1>


</section>


`;



}









/* =========================================================
   ABOUT
========================================================= */


function loadAbout(container){



container.innerHTML = `


<section class="page-section about-section">


<h1>

ABOUT

</h1>


</section>


`;



}








})();
