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


    console.log("Database karya berhasil dimuat:", artworks);



    const gallery = document.querySelector(".works-gallery");



    // Jika elemen gallery tidak ada
    if (!gallery) {

        console.error("Class .works-gallery tidak ditemukan");

        return;

    }




    artworks.forEach(work => {



        const artworkCard = document.createElement("div");

        artworkCard.classList.add("art-card");



        artworkCard.innerHTML = `


        <img src="${work.image}" alt="${work.title}">


        <h3>
        ${work.title}
        </h3>


        <p>
        ${work.year}
        </p>


        `;



        gallery.appendChild(artworkCard);



    });



})



.catch(error => {


    console.error(
        "Terjadi error:",
        error
    );


});