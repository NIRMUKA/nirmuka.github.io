/* =========================================================

   NIRMUKA WRITINGS EFFECT ENGINE

   CINEMATIC ARCHIVE SYSTEM


   Handles:

   - Page entrance
   - Archive reveal
   - Smooth camera movement
   - Category transition
   - Writing list reveal


========================================================= */


(function(){


"use strict";





/* =========================================================
   WAIT FOR WRITINGS
========================================================= */


function waitForWritings(){



const page =
document.querySelector(
".writings-page"
);



if(!page){

requestAnimationFrame(
waitForWritings
);


return;

}




initWritingAtmosphere();



}





/* =========================================================
   INITIAL ATMOSPHERE
========================================================= */


function initWritingAtmosphere(){



const page =
document.querySelector(
".writings-page"
);



if(!page){

return;

}





page.classList.add(
"writing-loaded"
);





revealIntro();



observeArchive();





}









/* =========================================================
   INTRO REVEAL
========================================================= */


function revealIntro(){



const intro =
document.querySelector(
".writing-intro"
);



if(!intro){

return;

}





intro.classList.add(
"intro-visible"
);



}









/* =========================================================
   ARCHIVE OBSERVER
========================================================= */


function observeArchive(){



const archive =
document.querySelector(
".writing-archive"
);



if(!archive){

return;

}






const observer =
new IntersectionObserver(
(entries)=>{



entries.forEach(
(entry)=>{


if(entry.isIntersecting){



revealArchiveBoxes();



observer.disconnect();



}



});


},
{


threshold:.35


});




observer.observe(
archive
);



}









/* =========================================================
   ARCHIVE BOX REVEAL
========================================================= */


function revealArchiveBoxes(){



const boxes =
document.querySelectorAll(
".writing-category-menu button"
);



boxes.forEach(
(box,index)=>{



setTimeout(()=>{


box.classList.add(
"archive-visible"
);



},


index * 250



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
"archive-leaving"
);



}







setTimeout(()=>{


const list =
document.querySelector(
".writing-list-section"
);



if(list){



list.classList.add(
"list-visible"
);



}



},500);



});









/* =========================================================
   WRITING ITEM REVEAL
========================================================= */


function observeWritingList(){



const list =
document.querySelector(
".writing-list-section"
);



if(!list){

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
"item-visible"
);



},index*150);



});





});




observer.observe(
list,
{


childList:true,


subtree:true


});



}





observeWritingList();










/* =========================================================
   CURSOR ATMOSPHERE
========================================================= */


function createAmbient(){



const layer =
document.createElement(
"div"
);



layer.className =
"writing-ambient";



document.body.appendChild(
layer
);



}




createAmbient();







/* START */


waitForWritings();





})();
