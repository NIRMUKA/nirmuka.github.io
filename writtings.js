/* =========================================================
   NIRMUKA WRITINGS ARCHIVE SYSTEM

   Fungsi:
   - membuka halaman writings
   - membaca writings.json
   - filter kategori
   - menampilkan daftar tulisan
   - menuju halaman artikel

========================================================= */



/* =========================================================
   OPEN WRITINGS PAGE

   Dipanggil oleh script.js

========================================================= */

window.openWritingArchive = function () {


    const content =
        document.getElementById(
            "content-container"
        );


    if (!content) {

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

                    Sebuah ruang untuk menyimpan
                    gagasan, refleksi, kritik,
                    dan kegelisahan.

                </p>



            </header>






            <!-- CATEGORY -->

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





            <!-- LIST -->

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
   LOAD JSON DATABASE

========================================================= */


function loadWritingDatabase(){


    fetch(
        "/writings.json?v=20260822"
    )


    .then(response => {


        if(
            !response.ok
        ){

            throw new Error(
                "writings.json tidak ditemukan"
            );

        }


        return response.json();


    })


    .then(data => {


        window.nirmukaWritings =
            data;



        activateWritingCategory();


    })


    .catch(error => {


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

                    FAILED TO LOAD ARCHIVE

                </p>


            `;


        }


    });



}







/* =========================================================
   CATEGORY BUTTON

========================================================= */


function activateWritingCategory(){


    const buttons =
        document.querySelectorAll(
            ".writing-category"
        );



    buttons.forEach(
        button => {


            button.addEventListener(
                "click",
                function(){



                    const category =
                        this.dataset.category;



                    showWritingList(
                        category
                    );




                    buttons.forEach(
                        item => {


                            item.classList.remove(
                                "active"
                            );


                        }
                    );



                    this.classList.add(
                        "active"
                    );



                }
            );


        }
    );



}







/* =========================================================
   SHOW WRITING LIST

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



    const writings =
        window.nirmukaWritings
        .filter(
            item =>
            item.category === category
        );




    if(
        writings.length === 0
    ){


        container.innerHTML = `


            <p class="writing-placeholder">

                NO WRITING AVAILABLE

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
            writings.map(
                (item,index)=>`



                <a

                    href="${item.link}"

                    class="writing-card"


                >



                    <span class="writing-index">


                        ${String(index+1).padStart(2,"0")}


                    </span>





                    <div class="writing-information">



                        <h3>


                            ${item.title}


                        </h3>




                        <p>


                            ${item.subtitle || ""}


                        </p>





                        <div class="writing-meta">


                            ${item.type || ""}


                            ${
                                item.year
                                ?
                                " · " + item.year
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
