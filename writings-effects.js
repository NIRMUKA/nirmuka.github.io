/* =========================================================

   NIRMUKA WRITINGS EFFECT ENGINE

   CINEMATIC ARCHIVE SYSTEM


========================================================= */


(function(){


"use strict";





/* =========================================================
   PAGE ENTRY
========================================================= */


function init(){



const page =
document.querySelector(
".writings-page"
);



if(!page){

return;

}



setTimeout(()=>{


page.classList.add(
"page-ready"
);



},200);





observeArchive();



observeWritingList();



}









/* =========================================================
   ARCHIVE REVEAL
========================================================= */


function observeArchive(){



const archive =
document.querySelector(
".writing-category-menu"
);



if(!archive){

return;

}






const boxes =
archive.querySelectorAll(
"button"
);





boxes.forEach(
(box,index)=>{



setTimeout(()=>{


box.classList.add(
"archive-show"
);



},

500 + (index * 250)



);



});



}









/* =========================================================
   CATEGORY TRANSITION
========================================================= */


document.addEventListener(
"click",
function(e){



const button =
e.target.closest(
".writing-category-menu button"
);





if(!button){

return;

}





const archive =
document.querySelector(
".writing-archive"
);




if(archive){


archive.classList.add(
"archive-hide"
);



}





});









/* =========================================================
   LIST OBSERVER
========================================================= */


function observeWritingList(){



const target =
document.getElementById(
"writing-list"
);



if(!target){

return;

}





const observer =
new MutationObserver(
()=>{



const items =
document.querySelectorAll(
".writing-item"
);






items.forEach(
(item,index)=>{


setTimeout(()=>{


item.classList.add(
"writing-show"
);



},


index * 150



);



});




}
);




observer.observe(
target,
{


childList:true,


subtree:true


}
);



}








document.addEventListener(
"DOMContentLoaded",
init
);



})();
