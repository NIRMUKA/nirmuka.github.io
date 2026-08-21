// ===============================
// NIRMUKA ARTWORK DATABASE
// ===============================


fetch("artworks.json")


.then(response => {


    if (!response.ok) {

        throw new Error("artworks.json tidak ditemukan");

    }


    return response.json();


})


.then(artworks => {


    console.log(
        "Database karya berhasil dimuat:",
        artworks
    );



    const gallery = document.querySelector(".works-gallery");



    if (!gallery) {

        console.error(
            "works-gallery tidak ditemukan"
        );

        return;

    }





    artworks.forEach(work => {



        const artworkCard =
        document.createElement("div");



        artworkCard.classList.add(
            "art-card"
        );





        artworkCard.innerHTML = `


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


        `;





        gallery.appendChild(
            artworkCard
        );



    });



})


.catch(error => {


    console.error(
        "Terjadi error:",
        error
    );


});
