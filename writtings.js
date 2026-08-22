/* =========================================================
   NIRMUKA WRITINGS SYSTEM

   Handle:
   - Writing archive
   - Category filter
   - Article list
   - Link to article page

========================================================= */


(function(){


"use strict";



/* =========================================================
   OPEN WRITINGS ARCHIVE

   Dipanggil dari script.js

========================================================= */


window.openWritingArchive = function(){



    const content =
        document.getElementById(
            "content-container"
        );



    if(!content){

        return;

    }






    content.innerHTML = `


    <section class="page-section writings-page">


        <div class="section-inner writings-inner">



            <a
                href="#"
                class="back-home"
            >

                ← BACK

            </a>





            <header class="writings-header">


                <p class="work-number">

                    ARCHIVE / WRITINGS

                </p>




                <h2>

                    WRITINGS

                </h2>




                <p class="section-description">

                    Sebuah arsip pemikiran,
                    refleksi, kegelisahan,
                    dan catatan perjalanan intelektual.

                </p>


            </header>






            <div class="writing-categories">



                <button
                    class="writing-category"
                    data-category="FILSAFAT"
                >

                    FILSAFAT

                    <small>
                        PHILOSOPHY
                    </small>


                </button>





                <button
                    class="writing-category"
                    data-category="TEOLOGI"
                >

                    TEOLOGI

                    <small>
                        THEOLOGY
                    </small>


                </button>





                <button
                    class="writing-category"
                    data-category="UMUM"
                >

                    UMUM

                    <small>
                        NOTES
                    </small>


                </button>



            </div>







            <div
                class="writing-list"
            >


                <p class="writing-placeholder">

                    SELECT CATEGORY

                </p>


            </div>






        </div>


    </section>


    `;





    loadWritingDatabase();



};









/* =========================================================
   LOAD DATABASE

========================================================= */


function loadWritingDatabase(){



    fetch(
        "/writings.json?v=1"
    )


    .then(
        response=>{


            if(!response.ok){


                throw new Error(
                    "writings.json tidak ditemukan"
                );


            }



            return response.json();



        }
    )


    .then(
        data=>{


            window.nirmukaWritingData =
                data;



            activateCategories();



        }
    )



    .catch(
        error=>{


            console.error(
                error
            );



            const list =
                document.querySelector(
                    ".writing-list"
                );



            if(list){


                list.innerHTML = `


                    <p class="writing-placeholder">

                        ARCHIVE ERROR

                    </p>


                `;


            }



        }
    );



}









/* =========================================================
   CATEGORY BUTTON

========================================================= */


function activateCategories(){



    const buttons =
        document.querySelectorAll(
            ".writing-category"
        );



    buttons.forEach(
        button=>{


            button.addEventListener(
                "click",
                ()=>{



                    const category =
                        button.dataset.category;




                    buttons.forEach(
                        item=>{


                            item.classList.remove(
                                "active"
                            );


                        }
                    );



                    button.classList.add(
                        "active"
                    );




                    showWritingList(
                        category
                    );




                }
            );


        }
    );



}








/* =========================================================
   SHOW ARTICLE LIST

========================================================= */


function showWritingList(
    category
){



    const container =
        document.querySelector(
            ".writing-list"
        );



    if(!container){

        return;

    }





    const articles =
        window.nirmukaWritingData.filter(
            article=>
                article.category === category
        );





    if(
        articles.length === 0
    ){


        container.innerHTML = `


            <p class="writing-placeholder">

                NO ARCHIVE FOUND

            </p>


        `;


        return;


    }







    container.innerHTML = `



        <div class="writing-category-title">

            ${category}

        </div>






        <div class="writing-items">


        ${
            articles.map(
                (article,index)=>`


                <a

                    href="${article.link}"

                    class="writing-card"

                >



                    <span class="writing-index">


                        ${String(index+1).padStart(2,"0")}


                    </span>





                    <div class="writing-information">



                        <h3>

                            ${article.title}

                        </h3>





                        <p>

                            ${article.subtitle || ""}

                        </p>





                        <div class="writing-meta">


                            ${article.type || "ESSAY"}


                            ${
                                article.year
                                ?
                                " · " + article.year
                                :
                                ""
                            }


                        </div>



                    </div>




                </a>


                `
            ).join("")
        }


        </div>



    `;



}






})();
