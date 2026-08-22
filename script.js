/* =========================================================
   NIRMUKA CORE SYSTEM
   PART 1A

   Handle:
   - Curtain transition
   - Navigation
   - Works loader
   - Artwork database

   NOT INCLUDE:
   - Spray
   - Writings
   - Protection

========================================================= */


/* =========================================================
   GLOBAL ELEMENT
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
   CURTAIN TRANSITION
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


    },800);



}








/* =========================================================
   MAIN NAVIGATION
========================================================= */


const menuLinks =
    document.querySelectorAll(
        ".main-menu a"
    );




menuLinks.forEach(
    link => {


        link.addEventListener(
            "click",
            event => {


                event.preventDefault();



                const page =
                    link.dataset.page;





                switch(page){


                    case "works":

                        loadWorks();

                    break;




                    case "about":

                        loadAbout();

                    break;




                    case "writings":

                        loadWritings();

                    break;



                }



            }
        );


    }
);







/* =========================================================
   WRITINGS CONNECTOR

   Dipindahkan ke writings.js

========================================================= */


function loadWritings(){


    if(
        window.openWritingArchive
    ){


        window.openWritingArchive();



    }

    else{


        console.warn(
            "writings.js belum dimuat"
        );


    }


}







/* =========================================================
   WORKS PAGE
========================================================= */


function loadWorks(){



    if(!content){

        return;

    }




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





                <div class="works-header">


                    <p class="work-number">

                        ARCHIVE / WORKS

                    </p>



                    <h2>

                        WORKS

                    </h2>



                </div>







                <div
                    class="works-carousel"
                >


                    <div
                        class="carousel-stage"
                    >


                        <div
                            class="carousel-track"
                        >

                        </div>


                    </div>





                    <div
                        class="carousel-info"
                    >

                        <h3
                            class="carousel-title"
                        >

                        </h3>


                        <p
                            class="carousel-year"
                        >

                        </p>


                    </div>





                    <div
                        class="carousel-controls"
                    >

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



                </div>





            </div>


        </section>



        `;



        initializeWorks();



    });



}









/* =========================================================
   LOAD ARTWORK DATABASE
========================================================= */


function initializeWorks(){



    const track =
        document.querySelector(
            ".carousel-track"
        );



    if(!track){

        return;

    }






    fetch(
        "/artworks.json?v=20260822"
    )


    .then(
        response=>{


            if(!response.ok){

                throw new Error(
                    "Artwork database error"
                );

            }


            return response.json();


        }
    )



    .then(
        artworks=>{


            createArtworkCarousel(
                artworks
            );


        }
    )



    .catch(
        error=>{


            console.error(
                error
            );


        }
    );



}

/* =========================================================
   CREATE ARTWORK CAROUSEL
========================================================= */


function createArtworkCarousel(
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



    if(
        !track
    ){

        return;

    }





    let currentIndex = 0;



    artworks.forEach(
        (work,index)=>{


            const item =
                document.createElement(
                    "a"
                );



            item.className =
                "carousel-artwork";



            item.dataset.index =
                index;



            item.href =
                `/artwork.html?id=${work.id}`;



            item.innerHTML = `


                <img

                    src="${work.image}"

                    alt="${work.title || ""}"

                    draggable="false"

                >


            `;



            track.appendChild(
                item
            );


        }
    );




    const slides =
        document.querySelectorAll(
            ".carousel-artwork"
        );







    function updateCarousel(){



        slides.forEach(
            (slide,index)=>{


                slide.classList.remove(
                    "active",
                    "prev",
                    "next"
                );



                if(
                    index === currentIndex
                ){


                    slide.classList.add(
                        "active"
                    );


                }



                else if(
                    index ===
                    (
                        currentIndex - 1 +
                        artworks.length
                    )
                    %
                    artworks.length
                ){


                    slide.classList.add(
                        "prev"
                    );


                }




                else if(
                    index ===
                    (
                        currentIndex + 1
                    )
                    %
                    artworks.length
                ){


                    slide.classList.add(
                        "next"
                    );


                }



            }
        );




        const current =
            artworks[currentIndex];



        if(title){

            title.textContent =
                current.title ||
                "UNTITLED";

        }



        if(year){

            year.textContent =
                current.year ||
                "";

        }




    }








    function openArtwork(){



        const current =
            artworks[currentIndex];



        if(!current){

            return;

        }



        window.location.href =
            `/artwork.html?id=${current.id}`;


    }








    slides.forEach(
        (slide,index)=>{


            slide.addEventListener(
                "click",
                event=>{


                    event.preventDefault();



                    if(
                        index === currentIndex
                    ){

                        openArtwork();

                    }

                    else{


                        currentIndex =
                            index;


                        updateCarousel();


                    }


                }
            );


        }
    );







    if(prev){


        prev.addEventListener(
            "click",
            ()=>{


                currentIndex--;



                if(
                    currentIndex < 0
                ){

                    currentIndex =
                        artworks.length - 1;

                }



                updateCarousel();



            }
        );


    }






    if(next){


        next.addEventListener(
            "click",
            ()=>{


                currentIndex++;



                if(
                    currentIndex >= artworks.length
                ){

                    currentIndex = 0;

                }



                updateCarousel();



            }
        );


    }






    updateCarousel();



}









/* =========================================================
   ABOUT PAGE
========================================================= */


function loadAbout(){


    if(!content){

        return;

    }




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

                    Saya tidak pernah melihat diri saya sebagai seseorang yang selesai. Saya adalah kumpulan dari pertanyaan, ingatan, ketakutan, kehilangan, dan kegelisahan yang terus berubah. NIRMUKA lahir dari kebutuhan untuk memahami sesuatu yang sering kali tidak dapat dijelaskan dengan kata-kata.

                    </p>



                    <p>

                    Saya melihat dunia sebagai tempat yang penuh kontradiksi. Manusia menciptakan keindahan sekaligus kehancuran. Kita membangun peradaban, tetapi sering kehilangan hubungan dengan diri sendiri. Kita mencari makna, tetapi terus menciptakan alasan untuk melupakan bahwa hidup memiliki batas.

                    </p>



                    <p>

                    Seni bagi saya bukan tempat untuk memberikan jawaban. Seni adalah tempat untuk menghadapi kegelapan. Sebuah ruang untuk melihat luka, kehampaan, absurditas, dan pertanyaan yang mungkin tidak pernah memiliki penyelesaian.

                    </p>



                    <p>

                    NIRMUKA adalah arsip dari semua kegelisahan tersebut.

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
    event=>{


        const back =
            event.target.closest(
                ".back-home"
            );



        if(!back){

            return;

        }



        event.preventDefault();



        curtainTransition(()=>{


            content.innerHTML =
                "";



        });



    }
);
