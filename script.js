/* =========================================================
   NIRMUKA DIGITAL ARCHIVE SYSTEM
   CENTER FOCUSED CAROUSEL EDITION
========================================================= */


/* =========================================================
   GLOBAL ELEMENTS
========================================================= */

const curtain =
    document.querySelector(".curtain");

const content =
    document.getElementById("content-container");

const menuLinks =
    document.querySelectorAll(".main-menu a");


/* =========================================================
   ACTIVE CAROUSEL CLEANUP
========================================================= */

let activeCarouselCleanup = null;


function destroyActiveCarousel() {

    if (
        typeof activeCarouselCleanup ===
        "function"
    ) {

        activeCarouselCleanup();

        activeCarouselCleanup =
            null;
    }
}


/* =========================================================
   CURTAIN TRANSITION
========================================================= */

function curtainTransition(callback) {

    if (!curtain) {

        callback();

        return;
    }


    curtain.classList.add(
        "active"
    );


    setTimeout(
        () => {

            callback();

            curtain.classList.remove(
                "active"
            );

        },
        900
    );
}


/* =========================================================
   BACK TO LANDING
========================================================= */

function backToLanding() {

    destroyActiveCarousel();


    curtainTransition(
        () => {

            if (content) {

                content.innerHTML =
                    "";
            }


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );
}


/* =========================================================
   LOAD WORKS
========================================================= */

function loadWorks() {

    if (!content) {
        return;
    }


    destroyActiveCarousel();


    curtainTransition(
        () => {

            content.innerHTML = `

                <section
                    class="page-section works-page"
                >

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


                        <div
                            class="works-carousel-shell"
                            tabindex="0"
                            aria-label="NIRMUKA artwork carousel"
                        >

                            <div
                                class="works-carousel-topline"
                            >

                                <p
                                    class="carousel-counter"
                                    aria-live="polite"
                                >
                                    01 / 00
                                </p>


                                <p
                                    class="carousel-status"
                                    aria-live="polite"
                                >
                                    LOADING ARCHIVE
                                </p>

                            </div>


                            <div
                                class="works-gallery"
                                aria-label="Artwork carousel"
                            >
                            </div>


                            <div
                                class="carousel-controls"
                            >

                                <button
                                    type="button"
                                    class="carousel-arrow carousel-prev"
                                    aria-label="Previous artwork"
                                >
                                    ←
                                </button>


                                <p class="carousel-hint">
                                    DRAG / SWIPE TO EXPLORE
                                </p>


                                <button
                                    type="button"
                                    class="carousel-arrow carousel-next"
                                    aria-label="Next artwork"
                                >
                                    →
                                </button>

                            </div>

                        </div>

                    </div>

                </section>

            `;


            fetch(
                "artworks.json?v=20260822-7"
            )

            .then(
                response => {

                    if (!response.ok) {

                        throw new Error(
                            "artworks.json gagal dimuat"
                        );
                    }


                    return response.json();
                }
            )

            .then(
                artworks => {

                    if (
                        !Array.isArray(artworks) ||
                        artworks.length === 0
                    ) {

                        throw new Error(
                            "Tidak ada artwork di artworks.json"
                        );
                    }


                    buildWorksCarousel(
                        artworks
                    );
                }
            )

            .catch(
                error => {

                    console.error(
                        "Error loading artworks:",
                        error
                    );


                    const gallery =
                        document.querySelector(
                            ".works-gallery"
                        );


                    const status =
                        document.querySelector(
                            ".carousel-status"
                        );


                    if (gallery) {

                        gallery.innerHTML = `

                            <div
                                style="
                                    position:absolute;
                                    inset:0;
                                    display:flex;
                                    align-items:center;
                                    justify-content:center;
                                    text-align:center;
                                    opacity:.6;
                                "
                            >
                                ARCHIVE COULD NOT BE LOADED
                            </div>

                        `;
                    }


                    if (status) {

                        status.textContent =
                            "ARCHIVE ERROR";
                    }
                }
            );

        }
    );
}


/* =========================================================
   BUILD WORKS CAROUSEL
========================================================= */

function buildWorksCarousel(
    artworks
) {

    const shell =
        document.querySelector(
            ".works-carousel-shell"
        );


    const gallery =
        document.querySelector(
            ".works-gallery"
        );


    const counter =
        document.querySelector(
            ".carousel-counter"
        );


    const status =
        document.querySelector(
            ".carousel-status"
        );


    const previousButton =
        document.querySelector(
            ".carousel-prev"
        );


    const nextButton =
        document.querySelector(
            ".carousel-next"
        );


    if (
        !shell ||
        !gallery ||
        !counter ||
        !previousButton ||
        !nextButton
    ) {

        return;
    }


    /* =====================================================
       CREATE ARTWORK CARDS
    ===================================================== */

    gallery.innerHTML =
        "";


    artworks.forEach(
        (work, index) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "art-card is-hidden";


            card.dataset.index =
                String(index);


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                `artwork.html?id=${encodeURIComponent(work.id)}`;


            link.setAttribute(
                "aria-label",
                `${work.title}, ${work.year}`
            );


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                work.image;


            image.alt =
                work.title;


            image.draggable =
                false;


            image.loading =
                index < 3
                    ? "eager"
                    : "lazy";


            image.decoding =
                "async";


            const title =
                document.createElement(
                    "h3"
                );


            title.textContent =
                work.title;


            const year =
                document.createElement(
                    "p"
                );


            year.textContent =
                work.year;


            link.appendChild(
                image
            );


            link.appendChild(
                title
            );


            link.appendChild(
                year
            );


            card.appendChild(
                link
            );


            gallery.appendChild(
                card
            );
        }
    );


    const cards =
        Array.from(
            gallery.querySelectorAll(
                ".art-card"
            )
        );


    const total =
        cards.length;


    let activeIndex =
        0;


    let suppressClickUntil =
        0;


    /* =====================================================
       FORMAT NUMBER
    ===================================================== */

    function formatNumber(
        value
    ) {

        return String(value)
            .padStart(
                2,
                "0"
            );
    }


    /* =====================================================
       NORMALIZE INDEX
       MAKES CAROUSEL INFINITE
    ===================================================== */

    function normalizeIndex(
        index
    ) {

        return (
            (
                index %
                total
            ) +
            total
        ) %
        total;
    }


    /* =====================================================
       CIRCULAR DISTANCE

       Example:
       ACTIVE = 0

       Last artwork becomes PREV
       First artwork becomes ACTIVE
       Second artwork becomes NEXT
    ===================================================== */

    function circularDistance(
        cardIndex
    ) {

        let distance =
            cardIndex -
            activeIndex;


        if (
            distance >
            total / 2
        ) {

            distance -=
                total;
        }


        if (
            distance <
            -total / 2
        ) {

            distance +=
                total;
        }


        return distance;
    }


    /* =====================================================
       UPDATE CAROUSEL
    ===================================================== */

    function updateCarousel() {

        cards.forEach(
            (card, index) => {

                card.classList.remove(
                    "is-active",
                    "is-prev",
                    "is-next",
                    "is-far-prev",
                    "is-far-next",
                    "is-hidden"
                );


                const distance =
                    circularDistance(
                        index
                    );


                const link =
                    card.querySelector(
                        "a"
                    );


                if (
                    distance === 0
                ) {

                    card.classList.add(
                        "is-active"
                    );


                    card.setAttribute(
                        "aria-current",
                        "true"
                    );


                    card.removeAttribute(
                        "aria-hidden"
                    );


                    if (link) {

                        link.tabIndex =
                            0;
                    }

                }


                else if (
                    distance === -1
                ) {

                    card.classList.add(
                        "is-prev"
                    );


                    card.removeAttribute(
                        "aria-current"
                    );


                    card.removeAttribute(
                        "aria-hidden"
                    );


                    if (link) {

                        link.tabIndex =
                            0;
                    }

                }


                else if (
                    distance === 1
                ) {

                    card.classList.add(
                        "is-next"
                    );


                    card.removeAttribute(
                        "aria-current"
                    );


                    card.removeAttribute(
                        "aria-hidden"
                    );


                    if (link) {

                        link.tabIndex =
                            0;
                    }

                }


                else if (
                    distance === -2
                ) {

                    card.classList.add(
                        "is-far-prev"
                    );


                    card.removeAttribute(
                        "aria-current"
                    );


                    card.setAttribute(
                        "aria-hidden",
                        "true"
                    );


                    if (link) {

                        link.tabIndex =
                            -1;
                    }

                }


                else if (
                    distance === 2
                ) {

                    card.classList.add(
                        "is-far-next"
                    );


                    card.removeAttribute(
                        "aria-current"
                    );


                    card.setAttribute(
                        "aria-hidden",
                        "true"
                    );


                    if (link) {

                        link.tabIndex =
                            -1;
                    }

                }


                else {

                    card.classList.add(
                        "is-hidden"
                    );


                    card.removeAttribute(
                        "aria-current"
                    );


                    card.setAttribute(
                        "aria-hidden",
                        "true"
                    );


                    if (link) {

                        link.tabIndex =
                            -1;
                    }

                }

            }
        );


        counter.textContent =
            `${formatNumber(activeIndex + 1)} / ${formatNumber(total)}`;


        if (status) {

            const artwork =
                artworks[
                    activeIndex
                ];


            status.textContent =
                artwork.title
                    ? `ACTIVE / ${artwork.title}`
                    : "ACTIVE ARTWORK";
        }
    }


    /* =====================================================
       GO TO ARTWORK
    ===================================================== */

    function goToArtwork(
        index
    ) {

        activeIndex =
            normalizeIndex(
                index
            );


        updateCarousel();
    }


    /* =====================================================
       NEXT
    ===================================================== */

    function nextArtwork() {

        goToArtwork(
            activeIndex + 1
        );
    }


    /* =====================================================
       PREVIOUS
    ===================================================== */

    function previousArtwork() {

        goToArtwork(
            activeIndex - 1
        );
    }


    /* =====================================================
       BUTTON EVENTS
    ===================================================== */

    function handlePreviousButton(
        event
    ) {

        event.preventDefault();

        previousArtwork();
    }


    function handleNextButton(
        event
    ) {

        event.preventDefault();

        nextArtwork();
    }


    previousButton.addEventListener(
        "click",
        handlePreviousButton
    );


    nextButton.addEventListener(
        "click",
        handleNextButton
    );


    /* =====================================================
       CARD CLICK

       SIDE ARTWORK:
       click → move to center

       CENTER ARTWORK:
       click → open artwork detail
    ===================================================== */

    const cardClickHandlers =
        [];


    cards.forEach(
        (card, index) => {

            const link =
                card.querySelector(
                    "a"
                );


            if (!link) {
                return;
            }


            const handler =
                event => {

                    /*
                       Prevent accidental opening
                       immediately after swipe.
                    */

                    if (
                        Date.now() <
                        suppressClickUntil
                    ) {

                        event.preventDefault();

                        return;
                    }


                    /*
                       Side artwork clicked:
                       make it dominant.
                    */

                    if (
                        index !==
                        activeIndex
                    ) {

                        event.preventDefault();


                        goToArtwork(
                            index
                        );


                        return;
                    }


                    /*
                       Active artwork clicked:
                       normal href navigation.
                    */
                };


            link.addEventListener(
                "click",
                handler
            );


            cardClickHandlers.push({
                link,
                handler
            });

        }
    );


    /* =====================================================
       POINTER / SWIPE SYSTEM
       WORKS ON:
       - MOUSE
       - TOUCH
       - PEN
    ===================================================== */

    let activePointerId =
        null;


    let pointerStartX =
        0;


    let pointerStartY =
        0;


    let pointerCurrentX =
        0;


    let pointerCurrentY =
        0;


    let pointerMoved =
        false;


    let horizontalGesture =
        false;


    function handlePointerDown(
        event
    ) {

        /*
           Ignore non-left mouse button.
        */

        if (
            event.pointerType === "mouse" &&
            event.button !== 0
        ) {

            return;
        }


        activePointerId =
            event.pointerId;


        pointerStartX =
            event.clientX;


        pointerStartY =
            event.clientY;


        pointerCurrentX =
            event.clientX;


        pointerCurrentY =
            event.clientY;


        pointerMoved =
            false;


        horizontalGesture =
            false;


        shell.classList.add(
            "is-dragging"
        );


        if (
            gallery.setPointerCapture
        ) {

            try {

                gallery.setPointerCapture(
                    event.pointerId
                );

            }
            catch (error) {

                /*
                   Some browsers may reject
                   pointer capture.
                */
            }
        }
    }


    function handlePointerMove(
        event
    ) {

        if (
            activePointerId === null ||
            event.pointerId !==
            activePointerId
        ) {

            return;
        }


        pointerCurrentX =
            event.clientX;


        pointerCurrentY =
            event.clientY;


        const deltaX =
            pointerCurrentX -
            pointerStartX;


        const deltaY =
            pointerCurrentY -
            pointerStartY;


        if (
            Math.abs(deltaX) >
            7
        ) {

            pointerMoved =
                true;
        }


        /*
           Decide whether gesture
           is horizontal carousel swipe
           or normal vertical page scroll.
        */

        if (
            !horizontalGesture &&
            Math.abs(deltaX) > 10 &&
            Math.abs(deltaX) >
            Math.abs(deltaY)
        ) {

            horizontalGesture =
                true;
        }


        if (
            horizontalGesture
        ) {

            event.preventDefault();
        }
    }


    function finishPointerGesture(
        event
    ) {

        if (
            activePointerId === null
        ) {

            return;
        }


        if (
            event.pointerId !==
            activePointerId
        ) {

            return;
        }


        const deltaX =
            pointerCurrentX -
            pointerStartX;


        const deltaY =
            pointerCurrentY -
            pointerStartY;


        const absoluteX =
            Math.abs(
                deltaX
            );


        const absoluteY =
            Math.abs(
                deltaY
            );


        const wasSwipe =
            horizontalGesture &&
            absoluteX > 45 &&
            absoluteX >
            absoluteY;


        shell.classList.remove(
            "is-dragging"
        );


        if (
            gallery.releasePointerCapture
        ) {

            try {

                gallery.releasePointerCapture(
                    activePointerId
                );

            }
            catch (error) {

                /*
                   Ignore release errors.
                */
            }
        }


        activePointerId =
            null;


        /*
           Swipe left:
           next artwork.
        */

        if (
            wasSwipe &&
            deltaX < 0
        ) {

            nextArtwork();


            suppressClickUntil =
                Date.now() +
                300;
        }


        /*
           Swipe right:
           previous artwork.
        */

        else if (
            wasSwipe &&
            deltaX > 0
        ) {

            previousArtwork();


            suppressClickUntil =
                Date.now() +
                300;
        }


        /*
           Small drag:
           block accidental navigation.
        */

        else if (
            pointerMoved
        ) {

            suppressClickUntil =
                Date.now() +
                180;
        }


        pointerMoved =
            false;


        horizontalGesture =
            false;
    }


    function cancelPointerGesture() {

        shell.classList.remove(
            "is-dragging"
        );


        activePointerId =
            null;


        pointerMoved =
            false;


        horizontalGesture =
            false;
    }


    gallery.addEventListener(
        "pointerdown",
        handlePointerDown
    );


    gallery.addEventListener(
        "pointermove",
        handlePointerMove,
        {
            passive: false
        }
    );


    gallery.addEventListener(
        "pointerup",
        finishPointerGesture
    );


    gallery.addEventListener(
        "pointercancel",
        cancelPointerGesture
    );


    /* =====================================================
       KEYBOARD
    ===================================================== */

    function handleKeyboard(
        event
    ) {

        /*
           Only operate while WORKS exists.
        */

        if (
            !document.body.contains(
                shell
            )
        ) {

            return;
        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            event.preventDefault();

            previousArtwork();
        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            event.preventDefault();

            nextArtwork();
        }
    }


    document.addEventListener(
        "keydown",
        handleKeyboard
    );


    /* =====================================================
       TRACKPAD HORIZONTAL SWIPE

       Horizontal trackpad movement
       can also navigate carousel.

       Normal vertical page scrolling
       is NOT blocked.
    ===================================================== */

    let wheelLocked =
        false;


    let wheelUnlockTimer =
        null;


    function handleWheel(
        event
    ) {

        const horizontalAmount =
            Math.abs(
                event.deltaX
            );


        const verticalAmount =
            Math.abs(
                event.deltaY
            );


        /*
           Ignore ordinary vertical wheel.
        */

        if (
            horizontalAmount <
            20 ||
            horizontalAmount <=
            verticalAmount
        ) {

            return;
        }


        event.preventDefault();


        if (
            wheelLocked
        ) {

            return;
        }


        wheelLocked =
            true;


        if (
            event.deltaX > 0
        ) {

            nextArtwork();

        }
        else {

            previousArtwork();
        }


        clearTimeout(
            wheelUnlockTimer
        );


        wheelUnlockTimer =
            setTimeout(
                () => {

                    wheelLocked =
                        false;

                },
                380
            );
    }


    gallery.addEventListener(
        "wheel",
        handleWheel,
        {
            passive: false
        }
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateCarousel();


    /*
       Give keyboard focus possibility
       without forcing user focus.
    */

    shell.setAttribute(
        "role",
        "region"
    );


    /* =====================================================
       CAROUSEL CLEANUP

       Important because WORKS is dynamically
       created / destroyed.
    ===================================================== */

    activeCarouselCleanup =
        function cleanupCarousel() {

            previousButton.removeEventListener(
                "click",
                handlePreviousButton
            );


            nextButton.removeEventListener(
                "click",
                handleNextButton
            );


            gallery.removeEventListener(
                "pointerdown",
                handlePointerDown
            );


            gallery.removeEventListener(
                "pointermove",
                handlePointerMove
            );


            gallery.removeEventListener(
                "pointerup",
                finishPointerGesture
            );


            gallery.removeEventListener(
                "pointercancel",
                cancelPointerGesture
            );


            gallery.removeEventListener(
                "wheel",
                handleWheel
            );


            document.removeEventListener(
                "keydown",
                handleKeyboard
            );


            cardClickHandlers.forEach(
                item => {

                    item.link.removeEventListener(
                        "click",
                        item.handler
                    );

                }
            );


            clearTimeout(
                wheelUnlockTimer
            );

        };
}


/* =========================================================
   LOAD WRITINGS
========================================================= */

function loadWritings() {

    if (!content) {
        return;
    }


    destroyActiveCarousel();


    curtainTransition(
        () => {

            content.innerHTML = `

                <section class="page-section">

                    <div class="section-inner">

                        <a
                            href="#"
                            class="back-home"
                        >
                            ← BACK
                        </a>


                        <p class="work-number">
                            ARCHIVE / WRITINGS
                        </p>


                        <h2>
                            WRITINGS
                        </h2>


                        <p class="section-description">
                            Tulisan-tulisan NIRMUKA akan disusun
                            dalam tiga arsip utama:
                            Filsafat, Teologi, dan Umum.
                        </p>

                    </div>

                </section>

            `;

        }
    );
}


/* =========================================================
   LOAD ABOUT
========================================================= */

function loadAbout() {

    if (!content) {
        return;
    }


    destroyActiveCarousel();


    curtainTransition(
        () => {

            content.innerHTML = `

                <section
                    class="page-section about-page"
                >

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
                                Jujur, saya tidak pernah benar-benar tahu bagaimana cara menjelaskan diri saya sendiri. Saya selalu merasa bahwa manusia terlalu kompleks untuk diringkas menjadi beberapa kalimat sederhana: nama, pekerjaan, pencapaian, atau daftar hal-hal yang pernah dilakukan. Ada terlalu banyak bagian dalam diri seseorang yang tidak terlihat oleh orang lain; ketakutan yang disimpan, pikiran yang tidak pernah diucapkan, ingatan yang terus kembali meskipun kita berusaha melupakannya. Mungkin karena itu saya memilih membuat karya. Bukan karena saya memiliki semua jawaban, tetapi karena saya sendiri sedang mencoba memahami sesuatu yang bahkan sering kali tidak bisa saya jelaskan.
                            </p>


                            <p>
                                Saya tidak melihat dunia sebagai tempat yang sepenuhnya indah. Saya sering merasa bahwa ada sesuatu yang salah dalam cara manusia menjalani hidup. Kita membangun begitu banyak hal, mengejar begitu banyak hal, menciptakan berbagai bentuk kemajuan, tetapi di balik semua itu tetap ada rasa kosong yang tidak pernah benar-benar hilang. Manusia mampu menciptakan keindahan yang luar biasa, tetapi manusia yang sama juga mampu menciptakan kehancuran yang mengerikan.
                            </p>


                            <p>
                                Karya-karya saya lahir dari kegelisahan terhadap kondisi manusia. Saya tertarik pada sisi yang sering dihindari: rasa kehilangan, kesepian, ketakutan, ingatan yang menyakitkan, dan pertanyaan tentang keberadaan kita. Saya tidak tertarik membuat karya yang hanya memberikan kenyamanan atau menjadi hiasan yang menyenangkan untuk dilihat. Saya ingin karya saya memiliki luka, memiliki gangguan, memiliki sesuatu yang membuat seseorang berhenti sejenak dan bertanya mengapa mereka merasa tidak nyaman ketika melihatnya.
                            </p>


                            <p>
                                Dalam proses berkarya, saya banyak menggunakan distorsi, bentuk yang tidak sempurna, warna yang bertabrakan, dan elemen yang terlihat kacau. Bukan karena saya tidak mampu membuat sesuatu yang rapi, tetapi karena dunia yang saya lihat memang tidak selalu rapi. Manusia sendiri adalah sesuatu yang penuh dengan keretakan. Kita membawa masa lalu, trauma, harapan, keinginan, dan ketakutan dalam satu tubuh yang sama.
                            </p>


                            <p>
                                Saya tidak percaya bahwa seni harus selalu memberikan solusi. Terkadang seni bukan tentang menemukan cahaya, tetapi tentang berani masuk ke dalam kegelapan dan melihat apa yang ada di sana. Ada hal-hal dalam kehidupan yang mungkin tidak memiliki jawaban. Ada kehilangan yang tidak bisa diperbaiki. Ada pertanyaan yang mungkin akan tetap menjadi pertanyaan sampai akhir hidup kita.
                            </p>


                            <p>
                                NIRMUKA adalah ruang untuk semua kegelisahan itu. Sebuah arsip dari pikiran, ingatan, ketakutan, dan perjalanan batin yang terus berubah. Setiap karya bukan hanya sebuah gambar, tetapi sebuah bagian dari proses memahami manusia dan keberadaannya.
                            </p>


                            <p>
                                Karena pada akhirnya, mungkin seni bukan tentang menjelaskan dunia. Mungkin seni adalah cara kita bertahan ketika dunia terlalu sulit untuk dijelaskan.
                            </p>


                            <p class="signature">
                                — NIRMUKA
                            </p>

                        </div>

                    </div>

                </section>

            `;

        }
    );
}


/* =========================================================
   MENU CONTROL
========================================================= */

menuLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const page =
                    link.dataset.page;


                if (
                    page ===
                    "works"
                ) {

                    loadWorks();

                    return;
                }


                if (
                    page ===
                    "writings"
                ) {

                    loadWritings();

                    return;
                }


                if (
                    page ===
                    "about"
                ) {

                    loadAbout();
                }

            }
        );

    }
);


/* =========================================================
   BACK BUTTON
========================================================= */

document.addEventListener(
    "click",
    event => {

        const backButton =
            event.target.closest(
                ".back-home"
            );


        if (!backButton) {

            return;
        }


        event.preventDefault();


        backToLanding();

    }
);


/* =========================================================
   NIRMUKA SPRAY PAINT SYSTEM
========================================================= */

(function initializeSprayPaint() {


    /* =====================================================
       REMOVE OLD SPRAY ELEMENTS
    ===================================================== */

    const oldCanvas =
        document.getElementById(
            "spray-canvas"
        );


    if (oldCanvas) {

        oldCanvas.remove();
    }


    const oldNozzle =
        document.querySelector(
            ".spray-cursor"
        );


    if (oldNozzle) {

        oldNozzle.remove();
    }


    /* =====================================================
       CREATE CANVAS
    ===================================================== */

    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.id =
        "spray-canvas";


    document.body.appendChild(
        canvas
    );


    const ctx =
        canvas.getContext(
            "2d"
        );


    if (!ctx) {

        return;
    }


    /* =====================================================
       CREATE SPRAY NOZZLE
    ===================================================== */

    const nozzle =
        document.createElement(
            "div"
        );


    nozzle.className =
        "spray-cursor";


    document.body.appendChild(
        nozzle
    );


    /* =====================================================
       CANVAS SIZE
    ===================================================== */

    let dpr =
        1;


    function resizeCanvas() {

        dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        canvas.width =
            Math.floor(
                window.innerWidth *
                dpr
            );


        canvas.height =
            Math.floor(
                window.innerHeight *
                dpr
            );


        canvas.style.width =
            window.innerWidth +
            "px";


        canvas.style.height =
            window.innerHeight +
            "px";


        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );
    }


    resizeCanvas();


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    /* =====================================================
       POINTER STATE
    ===================================================== */

    let mouseX =
        window.innerWidth / 2;


    let mouseY =
        window.innerHeight / 2;


    let previousX =
        mouseX;


    let previousY =
        mouseY;


    let mouseSpeed =
        0;


    let spraying =
        false;


    const particles =
        [];


    /* =====================================================
       MOUSE MOVE
    ===================================================== */

    document.addEventListener(
        "mousemove",
        event => {

            previousX =
                mouseX;


            previousY =
                mouseY;


            mouseX =
                event.clientX;


            mouseY =
                event.clientY;


            const dx =
                mouseX -
                previousX;


            const dy =
                mouseY -
                previousY;


            mouseSpeed =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            nozzle.style.display =
                "block";


            nozzle.style.opacity =
                "1";


            nozzle.style.left =
                mouseX +
                "px";


            nozzle.style.top =
                mouseY +
                "px";


            if (spraying) {

                createSpray(
                    mouseX,
                    mouseY,
                    mouseSpeed
                );
            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       LEFT MOUSE DOWN
    ===================================================== */

    document.addEventListener(
        "mousedown",
        event => {

            if (
                event.button !==
                0
            ) {

                return;
            }


            /*
               IMPORTANT:

               Do not spray while user is
               dragging / operating carousel.

               Otherwise every carousel swipe
               would also paint the screen.
            */

            if (
                event.target.closest(
                    ".works-carousel-shell"
                )
            ) {

                return;
            }


            spraying =
                true;


            nozzle.classList.add(
                "spraying"
            );


            createSpray(
                event.clientX,
                event.clientY,
                0
            );

        }
    );


    /* =====================================================
       MOUSE RELEASE
    ===================================================== */

    document.addEventListener(
        "mouseup",
        () => {

            spraying =
                false;


            nozzle.classList.remove(
                "spraying"
            );

        }
    );


    window.addEventListener(
        "blur",
        () => {

            spraying =
                false;


            nozzle.classList.remove(
                "spraying"
            );

        }
    );


    /* =====================================================
       CREATE SPRAY
    ===================================================== */

    function createSpray(
        x,
        y,
        speed = 0
    ) {

        const spread =
            34 +
            Math.min(
                speed * .7,
                28
            );


        const amount =
            Math.min(
                70,

                30 +
                Math.floor(
                    speed * .65
                )
            );


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const angle =
                Math.random() *
                Math.PI *
                2;


            const distance =
                Math.pow(
                    Math.random(),
                    1.8
                ) *
                spread;


            const random =
                Math.random();


            let size;


            if (
                random >
                .97
            ) {

                size =
                    2.8 +
                    Math.random() *
                    3.3;

            }


            else if (
                random >
                .72
            ) {

                size =
                    1.1 +
                    Math.random() *
                    1.7;

            }


            else {

                size =
                    .35 +
                    Math.random() *
                    .95;
            }


            const life =
                110 +
                Math.random() *
                120;


            particles.push({

                x:
                    x +
                    Math.cos(
                        angle
                    ) *
                    distance,

                y:
                    y +
                    Math.sin(
                        angle
                    ) *
                    distance,

                size:
                    size,

                life:
                    life,

                maxLife:
                    life,

                driftX:
                    (
                        Math.random() -
                        .5
                    ) *
                    .07,

                driftY:
                    (
                        Math.random() -
                        .5
                    ) *
                    .07

            });
        }


        /*
           DENSE CENTER
        */

        for (
            let i = 0;
            i < 9;
            i++
        ) {

            const life =
                120 +
                Math.random() *
                120;


            particles.push({

                x:
                    x +
                    (
                        Math.random() -
                        .5
                    ) *
                    10,

                y:
                    y +
                    (
                        Math.random() -
                        .5
                    ) *
                    10,

                size:
                    1.4 +
                    Math.random() *
                    2.4,

                life:
                    life,

                maxLife:
                    life,

                driftX:
                    0,

                driftY:
                    0

            });
        }
    }


    /* =====================================================
       CONTINUOUS SPRAY
    ===================================================== */

    let lastSpray =
        0;


    function continuousSpray(
        time
    ) {

        if (
            spraying &&
            time -
            lastSpray >
            25
        ) {

            createSpray(
                mouseX,
                mouseY,
                mouseSpeed *
                .25
            );


            lastSpray =
                time;
        }
    }


    /* =====================================================
       DRAW LOOP
    ===================================================== */

    function draw(
        time
    ) {

        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );


        continuousSpray(
            time
        );


        for (
            let i =
                particles.length - 1;

            i >= 0;

            i--
        ) {

            const particle =
                particles[i];


            particle.life -=
                .55;


            if (
                particle.life <=
                0
            ) {

                particles.splice(
                    i,
                    1
                );


                continue;
            }


            particle.x +=
                particle.driftX;


            particle.y +=
                particle.driftY;


            const ratio =
                particle.life /
                particle.maxLife;


            let alpha;


            if (
                ratio >
                .30
            ) {

                alpha =
                    .75;

            }


            else {

                alpha =
                    Math.max(
                        0,
                        ratio *
                        2.5
                    );
            }


            ctx.beginPath();


            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI *
                2
            );


            ctx.fillStyle =
                `rgba(245,245,240,${alpha})`;


            ctx.fill();
        }


        requestAnimationFrame(
            draw
        );
    }


    requestAnimationFrame(
        draw
    );


    /* =====================================================
       LEAVE WINDOW
    ===================================================== */

    document.addEventListener(
        "mouseleave",
        () => {

            nozzle.style.opacity =
                "0";


            spraying =
                false;


            nozzle.classList.remove(
                "spraying"
            );

        }
    );


    /* =====================================================
       RETURN TO WINDOW
    ===================================================== */

    document.addEventListener(
        "mouseenter",
        event => {

            mouseX =
                event.clientX;


            mouseY =
                event.clientY;


            nozzle.style.display =
                "block";


            nozzle.style.left =
                mouseX +
                "px";


            nozzle.style.top =
                mouseY +
                "px";


            nozzle.style.opacity =
                "1";

        }
    );


})();


/* =========================================================
   NIRMUKA ARTWORK PROTECTION

   ACTIVE ON:
   - WORKS CAROUSEL IMAGES
   - ARTWORK DETAIL IMAGE
========================================================= */

(function initializeArtworkProtection() {


    /* =====================================================
       REMOVE OLD WARNING
    ===================================================== */

    const oldWarning =
        document.querySelector(
            ".theft-warning"
        );


    if (oldWarning) {

        oldWarning.remove();
    }


    /* =====================================================
       CREATE WARNING
    ===================================================== */

    const warning =
        document.createElement(
            "div"
        );


    warning.className =
        "theft-warning";


    warning.innerHTML = `

        <div class="theft-warning-text">
            THOU SHALL NOT STEAL !!
        </div>

    `;


    document.body.appendChild(
        warning
    );


    let warningTimer =
        null;


    /* =====================================================
       SHOW WARNING
    ===================================================== */

    function showWarning() {

        clearTimeout(
            warningTimer
        );


        warning.classList.add(
            "show"
        );


        warningTimer =
            setTimeout(
                () => {

                    warning.classList.remove(
                        "show"
                    );

                },
                1500
            );
    }


    /* =====================================================
       RIGHT CLICK PROTECTION
    ===================================================== */

    document.addEventListener(
        "contextmenu",
        event => {

            const protectedArtwork =
                event.target.closest(
                    ".art-card img, #art-image, .artwork-image img"
                );


            /*
               Right click outside artwork:
               normal browser behaviour.
            */

            if (
                !protectedArtwork
            ) {

                return;
            }


            event.preventDefault();


            showWarning();

        }
    );


    /* =====================================================
       BLOCK IMAGE DRAG
    ===================================================== */

    document.addEventListener(
        "dragstart",
        event => {

            const protectedArtwork =
                event.target.closest(
                    ".art-card img, #art-image, .artwork-image img"
                );


            if (
                !protectedArtwork
            ) {

                return;
            }


            event.preventDefault();

        }
    );


    /* =====================================================
       BLOCK IMAGE SELECTION
    ===================================================== */

    document.addEventListener(
        "selectstart",
        event => {

            const protectedArtwork =
                event.target.closest(
                    ".art-card img, #art-image, .artwork-image img"
                );


            if (
                !protectedArtwork
            ) {

                return;
            }


            event.preventDefault();

        }
    );


})();
