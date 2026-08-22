/* =========================================================

   NIRMUKA ARTICLE EFFECT ENGINE

   MANUSCRIPT EXPERIENCE


   Features:

   - Page entrance
   - Title reveal
   - Paragraph reveal
   - Reading progress


========================================================= */


(function(){


"use strict";





/* =========================================================
   INITIALIZE
========================================================= */


document.addEventListener(
"DOMContentLoaded",
()=>{


initArticleAtmosphere();


}
);









/* =========================================================
   PAGE OPENING
========================================================= */


function initArticleAtmosphere(){



const container =
document.querySelector(
".article-container"
);



if(!container){

return;

}





setTimeout(()=>{


container.classList.add(
"article-ready"
);



},200);





revealText();



createReadingProgress();



}









/* =========================================================
   PARAGRAPH REVEAL
========================================================= */


function revealText(){



const paragraphs =
document.querySelectorAll(
".article-content p"
);





const observer =
new IntersectionObserver(
(entries)=>{



entries.forEach(
(entry)=>{


if(entry.isIntersecting){



entry.target.classList.add(
"show"
);



observer.unobserve(
entry.target
);



}



});


},

{


threshold:.15


}

);







paragraphs.forEach(
paragraph=>{


observer.observe(
paragraph
);



});





}









/* =========================================================
   READING PROGRESS BAR
========================================================= */


function createReadingProgress(){



const bar =
document.createElement(
"div"
);



bar.className =
"reading-progress";



document.body.appendChild(
bar
);






window.addEventListener(
"scroll",
()=>{


const scrollTop =
window.scrollY;



const height =
document.documentElement.scrollHeight
-
window.innerHeight;





const progress =
(scrollTop / height)
*
100;





bar.style.width =
progress + "%";



});


}









})();
