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
"/artworks.json?v=30"
)


.then(
response=>{


if(!response.ok){

throw new Error(
"ARTWORK JSON ERROR: " + response.status
);

}


return response.json();


}

)


.then(
data=>{


console.log(
"NIRMUKA ARTWORK DATABASE:",
data.length,
"works"
);



if(
!Array.isArray(data)
){

throw new Error(
"ARTWORK DATA FORMAT INVALID"
);

}



if(
data.length===0
){

throw new Error(
"ARTWORK DATABASE EMPTY"
);

}



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



const track =
document.querySelector(
".carousel-track"
);



if(track){

track.innerHTML =

`
<div style="
color:white;
text-align:center;
padding:60px;
font-family:Arial;
width:100%;
">
ARTWORK ARCHIVE ERROR
<br><br>
${error.message}
</div>
`;

}


}

);



}








/* =========================================================
   CAROUSEL SYSTEM
========================================================= */


function createCarousel(
artworks
){


if(
!Array.isArray(artworks)
||
artworks.length===0
){

console.error(
"Carousel initialization failed: no artworks"
);

return;

}



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
