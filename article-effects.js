(function(){


"use strict";



document.addEventListener(
"DOMContentLoaded",
()=>{


const page =
document.querySelector(
".writings-page"
);



if(page){

setTimeout(()=>{


page.classList.add(
"ready"
);


},200);


}




const boxes =
document.querySelectorAll(
".writing-category-menu button"
);



boxes.forEach(
(box,index)=>{


setTimeout(()=>{


box.classList.add(
"show"
);



},400+(index*250));



});



});



})();
