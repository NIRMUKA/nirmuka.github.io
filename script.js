/* =====================================
   NIRMUKA DYNAMIC ARCHIVE SYSTEM
===================================== */



const curtain = document.querySelector(".curtain");

const content = document.getElementById(
    "content-container"
);

const menuLinks =
document.querySelectorAll(
    ".main-menu a"
);





/* ==========================
   CURTAIN FUNCTION
========================== */


function curtainOpen(callback){


    curtain.classList.add("active");



    setTimeout(()=>{


        callback();



        curtain.classList.remove("active");



    },800);



}







/* ==========================
   LOAD WORKS
========================== */


function loadWorks(){


curtainOpen(()=>{


content.innerHTML = `


<section class="page-section">


<div class="section-inner">



<a href="#" class="back-home">

← BACK

</a>



<h2>
WORKS
</h2>



<div class="works-gallery">


</div>



</div>


</section>


`;




fetch("artworks.json")


.then(response=>response.json())


.then(artworks=>{


const gallery =
document.querySelector(
".works-gallery"
);



artworks.forEach(work=>{


gallery.innerHTML += `



<div class="art-card">


<a href="artwork.html?id=${work.id}">



<img 
src="${work.image}"
alt="${work.title}"
>



<h3>
${work.title}
</h3>


<p>
${work.year}
</p>



</a>



</div>



`;



});




});



});



}









/* ==========================
   LOAD WRITINGS
========================== */


function loadWritings(){


curtainOpen(()=>{


content.innerHTML = `



<section class="page-section">


<div class="section-inner">


<a href="#" class="back-home">

← BACK

</a>



<h2>
WRITINGS
</h2>



<p class="section-description">

Essays, reflections,
philosophical notes,
and artistic writings.

</p>



</div>


</section>



`;



});



}








/* ==========================
   LOAD ABOUT
========================== */


function loadAbout(){


curtainOpen(()=>{


content.innerHTML = `



<section class="page-section">


<div class="section-inner">


<a href="#" class="back-home">

← BACK

</a>




<h2>
ABOUT
</h2>




<p class="section-description">


NIRMUKA is an artistic archive
exploring humanity, memory,
faith, suffering, and existence
through visual expression.



</p>



</div>


</section>



`;



});



}









/* ==========================
   MENU EVENT
========================== */


menuLinks.forEach(link=>{


link.addEventListener(
"click",
(e)=>{


e.preventDefault();



const page =
link.dataset.page;



if(page==="works"){

loadWorks();

}



if(page==="writings"){

loadWritings();

}



if(page==="about"){

loadAbout();

}



});


});








/* ==========================
   BACK BUTTON
========================== */


document.addEventListener(
"click",
function(e){



if(
e.target.classList.contains(
"back-home"
)

){


e.preventDefault();



curtainOpen(()=>{


content.innerHTML="";


});



}



});
