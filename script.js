/* =========================================================
   NIRMUKA MAIN ENGINE

   CORE ONLY

   Handle:
   - Navigation
   - Curtain
   - Works
   - Artwork Data
   - About

========================================================= */



const content =
    document.getElementById(
        "content-container"
    );


const curtain =
    document.querySelector(
        ".curtain"
    );



/* =========================================================
   CURTAIN
========================================================= */


function curtainTransition(callback){


    if(!curtain){

        callback();

        return;

    }



    curtain.classList.add(
        "active"
    );



    setTimeout(()=>{


        callback();


        curtain.classList.remove(
            "active"
        );


    },600);



}







/* =========================================================
   NAVIGATION
========================================================= */


document
.querySelectorAll(
    ".main-menu a"
)
.forEach(
    link=>{


        link.addEventListener(
            "click",
            e=>{


                e.preventDefault();



                const page =
                    link.dataset.page;



                if(page==="works"){

                    loadWorks();

                }


                if(page==="about"){

                    loadAbout();

                }


                if(page==="writings"){


                    if(
                        window.openWritingArchive
                    ){

                        window.openWritingArchive();

                    }


                }



            }
        );


    }
);







/* =========================================================
   WORKS PAGE
========================================================= */


function loadWorks(){



curtainTransition(()=>{


content.innerHTML = `


<section class="page-section works-page">


<div class="section-inner">



<a
href="#"
class="back-home"
>
← BACK
</a>





<p class="work-number">

ARCHIVE / WORKS

</p>



<h2>

WORKS

</h2>





<div class="works-carousel">



<div class="carousel-track"></div>





<div class="carousel-navigation">


<button
class="carousel-prev"
>
←
</button>



<button
class="carousel-next"
>
→
</button>


</div>




<div class="carousel-caption">


<h3
class="carousel-title"
></h3>



<p
class="carousel-year"
></p>


</div>





</div>





</div>


</section>


`;



loadArtworks();


});



}









/* =========================================================
   LOAD ARTWORK JSON
========================================================= */


function loadArtworks(){



fetch(
"/artworks.json?v=10"
)


.then(
response=>response.json()
)


.then(
data=>{


createCarousel(
data
);


}

)


.catch(
error=>{


console.error(
"Artwork error:",
error
);


}

);



}








/* =========================================================
   CAROUSEL SYSTEM
========================================================= */


function createCarousel(
artworks
){



const track =
document.querySelector(
".carousel-track"
);



const title =
document.querySelector(
".carousel-title"
);



const year =
document.querySelector(
".carousel-year"
);



const prev =
document.querySelector(
".carousel-prev"
);



const next =
document.querySelector(
".carousel-next"
);




let index=0;





artworks.forEach(
(work,i)=>{


const card =
document.createElement(
"a"
);



card.className =
"carousel-item";



card.href =
`/artwork.html?id=${work.id}`;



card.innerHTML = `


<div class="carousel-image-frame">

<img

src="${work.image}"

alt="${work.title}"

draggable="false"

/>

</div>


`;



track.appendChild(
card
);



}
);




const cards =
document.querySelectorAll(
".carousel-item"
);








function update(){



cards.forEach(
(card,i)=>{


card.classList.remove(
"active",
"left",
"right"
);



if(i===index){


card.classList.add(
"active"
);


}


else if(
i===
(index-1+cards.length)
%
cards.length
){


card.classList.add(
"left"
);


}


else if(
i===
(index+1)
%
cards.length
){


card.classList.add(
"right"
);


}


}
);





if(title){

title.textContent =
artworks[index].title || "";

}


if(year){

year.textContent =
artworks[index].year || "";

}



}








prev.onclick=()=>{


index--;


if(index<0){

index =
artworks.length-1;

}


update();


};






next.onclick=()=>{


index++;


if(index>=artworks.length){

index=0;

}


update();


};





cards.forEach(
(card,i)=>{


card.addEventListener(
"click",
e=>{


if(
i!==index
){


e.preventDefault();


index=i;


update();


}


});


}
);




update();



}








/* =========================================================
   ABOUT
========================================================= */


function loadAbout(){



curtainTransition(()=>{


content.innerHTML = `



<section class="page-section about-page">


<div class="section-inner">


<a
href="#"
class="back-home"
>
← BACK
</a>



<p class="work-number">

ABOUT NIRMUKA

</p>



<h2>

ABOUT

</h2>




<div class="about-content">


<p>
So you want to know about me?
</p>


<p>
Saya tidak pernah melihat diri saya sebagai sesuatu yang selesai. Saya adalah kumpulan dari pertanyaan, luka, ingatan, kegelisahan, dan pencarian yang tidak pernah benar-benar berakhir.
</p>


<p>
NIRMUKA lahir dari ketidakpuasan terhadap dunia yang terlalu cepat memberikan jawaban. Saya tertarik pada ruang gelap manusia: ketakutan, kehampaan, absurditas, kehilangan, dan pertanyaan tentang keberadaan.
</p>


<p>
Bagi saya seni bukan sekadar membuat sesuatu menjadi indah. Seni adalah cara untuk menghadapi sesuatu yang mungkin terlalu berat untuk diterima.
</p>


<p>
Saya tidak percaya dunia selalu menuju sesuatu yang lebih baik. Saya hanya percaya manusia terus mencoba menemukan makna di tengah kehancuran yang mereka ciptakan sendiri.
</p>



</div>


</div>


</section>


`;



});


}








/* =========================================================
   BACK BUTTON
========================================================= */


document.addEventListener(
"click",
e=>{


const back =
e.target.closest(
".back-home"
);



if(!back){

return;

}



e.preventDefault();



curtainTransition(()=>{


content.innerHTML="";


});



});
/* =====================================================
   NIRMUKA WORKS CAROUSEL SYSTEM
===================================================== */


.works-carousel {

    position:relative;

    width:100%;

    height:650px;

    overflow:hidden;

    margin-top:80px;

}





.carousel-track {


    position:relative;

    width:100%;

    height:100%;


}





.carousel-item {


    position:absolute;


    top:50%;

    left:50%;


    width:380px;

    height:500px;



    transform:

        translate(-50%,-50%)
        scale(.7);



    opacity:0;


    transition:

        transform .6s ease,
        opacity .6s ease;



    cursor:pointer;


    text-decoration:none;



}






.carousel-image-frame {


    width:100%;

    height:100%;


    overflow:hidden;



    background:#111;


}






.carousel-image-frame img {


    width:100%;

    height:100%;


    object-fit:cover;


    display:block;


}








/* CENTER IMAGE */

.carousel-item.active {


    transform:

        translate(-50%,-50%)
        scale(1);



    opacity:1;


    z-index:5;



}








/* LEFT IMAGE */

.carousel-item.left {


    transform:

        translate(
            -130%,
            -50%
        )
        scale(.75);



    opacity:.45;


    z-index:3;


}








/* RIGHT IMAGE */

.carousel-item.right {


    transform:

        translate(
            30%,
            -50%
        )
        scale(.75);



    opacity:.45;


    z-index:3;


}









/* BUTTON */

.carousel-navigation {


    position:absolute;


    bottom:30px;


    left:50%;


    transform:
        translateX(-50%);



    display:flex;


    gap:30px;



}




.carousel-navigation button {


    width:60px;


    height:60px;



    border:

        1px solid white;



    background:

        transparent;



    color:white;



    font-size:25px;



    cursor:pointer;



}





.carousel-navigation button:hover {


    background:white;


    color:black;


}








/* INFO */


.carousel-caption {


    position:absolute;


    bottom:40px;


    right:50px;


    text-align:right;


}



.carousel-caption h3 {


    font-size:35px;


    color:white;


}



.carousel-caption p {


    color:white;


    opacity:.5;


}
