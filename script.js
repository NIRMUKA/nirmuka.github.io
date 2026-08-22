/* =========================================================
   NIRMUKA DIGITAL ARCHIVE SYSTEM
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
   CURTAIN TRANSITION
========================================================= */

function curtainTransition(callback) {

    if (!curtain) {

        callback();

        return;
    }


    curtain.classList.add("active");


    setTimeout(() => {

        callback();

        curtain.classList.remove("active");

    }, 900);

}



/* =========================================================
   BACK TO LANDING
========================================================= */

function backToLanding() {

    curtainTransition(() => {

        if (content) {

            content.innerHTML = "";

        }


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}



/* =========================================================
   LOAD WORKS
   CENTER-STAGE CAROUSEL
========================================================= */

function loadWorks() {

    if (!content) {
        return;
    }


    curtainTransition(() => {


        content.innerHTML = `

        <section class="page-section works-page">

            <div class="section-inner works-inner">


                <a
                    href="#"
                    class="back-home"
                >
                    ← BACK
                </a>


                <div class="works-heading">

                    <div>

                        <p class="work-number">
                            ARCHIVE / WORKS
                        </p>

                        <h2>
                            WORKS
                        </h2>

                    </div>


                    <div
                        class="carousel-counter"
                        aria-live="polite"
                    >
                        01 / 00
                    </div>

                </div>



                <div
                    class="works-carousel"
                    tabindex="0"
                    aria-label="NIRMUKA artwork carousel"
                >


                    <div class="carousel-stage">

                        <div
                            class="carousel-track"
                        ></div>

                    </div>



                    <div class="carousel-information">


                        <p class="carousel-work-number">
                            WORK 01
                        </p>


                        <h3 class="carousel-title">
                            Loading...
                        </h3>


                        <p class="carousel-year"></p>


                    </div>



                    <div class="carousel-controls">


                        <button
                            type="button"
                            class="carousel-button carousel-prev"
                            aria-label="Previous artwork"
                        >
                            ←
                        </button>


                        <p class="carousel-hint">
                            DRAG · SCROLL · USE ARROWS
                        </p>


                        <button
                            type="button"
                            class="carousel-button carousel-next"
                            aria-label="Next artwork"
                        >
                            →
                        </button>


                    </div>


                </div>


            </div>

        </section>

        `;



        fetch("/artworks.json?v=20260822-8")

        .then(response => {


            if (!response.ok) {

                throw new Error(
                    "artworks.json gagal dimuat"
                );

            }


            return response.json();

        })


        .then(artworks => {


            if (
                !Array.isArray(artworks) ||
                artworks.length === 0
            ) {

                throw new Error(
                    "Tidak ada karya di artworks.json"
                );

            }


            initializeWorksCarousel(
                artworks
            );

        })


        .catch(error => {


            console.error(
                "Error loading artworks:",
                error
            );


            const carousel =
                document.querySelector(
                    ".works-carousel"
                );


            if (carousel) {

                carousel.innerHTML = `

                    <p class="section-description">
                        WORKS COULD NOT BE LOADED.
                    </p>

                `;

            }

        });


    });

}



/* =========================================================
   INITIALIZE WORKS CAROUSEL
========================================================= */

function initializeWorksCarousel(
    artworks
) {


    const carousel =
        document.querySelector(
            ".works-carousel"
        );


    const stage =
        document.querySelector(
            ".carousel-stage"
        );


    const track =
        document.querySelector(
            ".carousel-track"
        );


    const previousButton =
        document.querySelector(
            ".carousel-prev"
        );


    const nextButton =
        document.querySelector(
            ".carousel-next"
        );


    const counter =
        document.querySelector(
            ".carousel-counter"
        );


    const title =
        document.querySelector(
            ".carousel-title"
        );


    const year =
        document.querySelector(
            ".carousel-year"
        );


    const workNumber =
        document.querySelector(
            ".carousel-work-number"
        );


    if (
        !carousel ||
        !stage ||
        !track
    ) {

        return;

    }



    /* =====================================================
       STATE
    ===================================================== */

    let activeIndex = 0;

    let pointerStartX = 0;

    let pointerCurrentX = 0;

    let dragging = false;

    let suppressClickUntil = 0;

    let lastWheelTime = 0;



    /* =====================================================
       CREATE ALL ARTWORKS
    ===================================================== */

    artworks.forEach(
        (work, index) => {


            const artwork =
                document.createElement(
                    "a"
                );


            artwork.className =
                "carousel-artwork";


            artwork.dataset.index =
                index;


            artwork.href =
                `/artwork.html?id=${work.id}`;


            artwork.setAttribute(
                "aria-label",
                work.title
            );


            artwork.innerHTML = `

                <div class="carousel-image-frame">

                    <img
                        src="${work.image}"
                        alt="${work.title}"
                        draggable="false"
                    >

                </div>


                <span class="carousel-side-number">

                    ${String(index + 1).padStart(2, "0")}

                </span>

            `;


            /* =================================================
               CLICK

               ACTIVE:
               open artwork detail

               SIDE:
               move it to center first
            ================================================= */

            artwork.addEventListener(
                "click",
                event => {


                    if (
                        performance.now() <
                        suppressClickUntil
                    ) {

                        event.preventDefault();

                        return;

                    }


                    if (
                        index !== activeIndex
                    ) {

                        event.preventDefault();

                        setActive(
                            index
                        );

                    }

                }
            );


            track.appendChild(
                artwork
            );

        }
    );



    const slides =
        Array.from(
            track.querySelectorAll(
                ".carousel-artwork"
            )
        );



    /* =====================================================
       NORMALIZE INDEX
    ===================================================== */

    function normalizeIndex(index) {

        const total =
            artworks.length;


        return (
            (index % total) +
            total
        ) % total;

    }



    /* =====================================================
       SET ACTIVE ARTWORK
    ===================================================== */

    function setActive(
        newIndex
    ) {


        activeIndex =
            normalizeIndex(
                newIndex
            );


        const previousIndex =
            normalizeIndex(
                activeIndex - 1
            );


        const nextIndex =
            normalizeIndex(
                activeIndex + 1
            );


        slides.forEach(
            (slide, index) => {


                slide.classList.remove(
                    "is-active",
                    "is-prev",
                    "is-next",
                    "is-hidden"
                );


                slide.removeAttribute(
                    "aria-current"
                );


                if (
                    index === activeIndex
                ) {

                    slide.classList.add(
                        "is-active"
                    );


                    slide.setAttribute(
                        "aria-current",
                        "true"
                    );


                    slide.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                }


                else if (
                    index === previousIndex
                ) {

                    slide.classList.add(
                        "is-prev"
                    );


                    slide.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                }


                else if (
                    index === nextIndex
                ) {

                    slide.classList.add(
                        "is-next"
                    );


                    slide.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                }


                else {

                    slide.classList.add(
                        "is-hidden"
                    );


                    slide.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }

            }
        );



        /* =================================================
           CURRENT ARTWORK INFORMATION
        ================================================= */

        const work =
            artworks[
                activeIndex
            ];


        if (counter) {

            counter.textContent =
                `${String(activeIndex + 1).padStart(2, "0")} / ${String(artworks.length).padStart(2, "0")}`;

        }


        if (workNumber) {

            workNumber.textContent =
                `WORK ${String(activeIndex + 1).padStart(2, "0")}`;

        }


        if (title) {

            title.textContent =
                work.title || "UNTITLED";

        }


        if (year) {

            year.textContent =
                work.year || "";

        }

    }



    /* =====================================================
       PREVIOUS
    ===================================================== */

    function previousArtwork() {

        setActive(
            activeIndex - 1
        );

    }



    /* =====================================================
       NEXT
    ===================================================== */

    function nextArtwork() {

        setActive(
            activeIndex + 1
        );

    }



    /* =====================================================
       BUTTONS
    ===================================================== */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            previousArtwork
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextArtwork
        );

    }



    /* =====================================================
       KEYBOARD
    ===================================================== */

    carousel.addEventListener(
        "keydown",
        event => {


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


            if (
                event.key ===
                "Enter"
            ) {


                const currentWork =
                    artworks[
                        activeIndex
                    ];


                window.location.href =
                    `/artwork.html?id=${currentWork.id}`;

            }

        }
    );



    /* =====================================================
       MOUSE WHEEL / TRACKPAD
    ===================================================== */

    carousel.addEventListener(
        "wheel",
        event => {


            const now =
                performance.now();


            if (
                now -
                lastWheelTime <
                420
            ) {

                return;

            }


            const movement =
                Math.abs(
                    event.deltaX
                ) >
                Math.abs(
                    event.deltaY
                )
                ?
                event.deltaX
                :
                event.deltaY;


            if (
                Math.abs(
                    movement
                ) <
                8
            ) {

                return;

            }


            event.preventDefault();


            lastWheelTime =
                now;


            if (
                movement > 0
            ) {

                nextArtwork();

            }

            else {

                previousArtwork();

            }

        },
        {
            passive: false
        }
    );



    /* =====================================================
       DRAG / SWIPE
    ===================================================== */

    stage.addEventListener(
        "pointerdown",
        event => {


            pointerStartX =
                event.clientX;


            pointerCurrentX =
                event.clientX;


            dragging =
                false;


            stage.classList.add(
                "is-dragging"
            );


            if (
                stage.setPointerCapture
            ) {

                try {

                    stage.setPointerCapture(
                        event.pointerId
                    );

                }

                catch (error) {

                    /* ignore */

                }

            }

        }
    );



    stage.addEventListener(
        "pointermove",
        event => {


            if (
                !stage.classList.contains(
                    "is-dragging"
                )
            ) {

                return;

            }


            pointerCurrentX =
                event.clientX;


            const distance =
                pointerCurrentX -
                pointerStartX;


            if (
                Math.abs(
                    distance
                ) >
                10
            ) {

                dragging =
                    true;

            }


            /* subtle physical movement */

            track.style.setProperty(
                "--drag-offset",
                `${distance * .16}px`
            );

        }
    );



    function finishDrag(
        event
    ) {


        if (
            !stage.classList.contains(
                "is-dragging"
            )
        ) {

            return;

        }


        const distance =
            pointerCurrentX -
            pointerStartX;


        stage.classList.remove(
            "is-dragging"
        );


        track.style.setProperty(
            "--drag-offset",
            "0px"
        );


        if (
            dragging
        ) {

            suppressClickUntil =
                performance.now() +
                350;


            if (
                distance < -60
            ) {

                nextArtwork();

            }


            else if (
                distance > 60
            ) {

                previousArtwork();

            }

        }


        dragging =
            false;


        if (
            event &&
            stage.releasePointerCapture
        ) {

            try {

                stage.releasePointerCapture(
                    event.pointerId
                );

            }

            catch (error) {

                /* ignore */

            }

        }

    }



    stage.addEventListener(
        "pointerup",
        finishDrag
    );


    stage.addEventListener(
        "pointercancel",
        finishDrag
    );



    /* =====================================================
       INITIAL STATE
    ===================================================== */

    setActive(
        0
    );

}



/* =========================================================
   LOAD WRITINGS
========================================================= */

function loadWritings() {

    if (!content) {
        return;
    }


    curtainTransition(() => {


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


    });

}



/* =========================================================
   LOAD ABOUT
========================================================= */

function loadAbout() {

    if (!content) {
        return;
    }


    curtainTransition(() => {


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


    });

}



/* =========================================================
   MENU CONTROL
========================================================= */

menuLinks.forEach(link => {


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

            }


            if (
                page ===
                "writings"
            ) {

                loadWritings();

            }


            if (
                page ===
                "about"
            ) {

                loadAbout();

            }


        }
    );


});



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

(function () {


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



    /* =====================================================
       CREATE NOZZLE
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

    let dpr = 1;


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
       MOUSE STATE
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


    const particles = [];



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
                mouseX + "px";


            nozzle.style.top =
                mouseY + "px";


            if (
                spraying
            ) {


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
       LEFT CLICK = SPRAY

       BUT:
       carousel controls/drag do not spray
    ===================================================== */

    document.addEventListener(
        "mousedown",
        event => {


            if (
                event.button !== 0
            ) {

                return;

            }


            if (
                event.target.closest(
                    ".works-carousel"
                )
            ) {

                return;

            }


            spraying = true;


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
       RELEASE
    ===================================================== */

    document.addEventListener(
        "mouseup",
        () => {


            spraying = false;


            nozzle.classList.remove(
                "spraying"
            );


        }
    );



    window.addEventListener(
        "blur",
        () => {


            spraying = false;


            nozzle.classList.remove(
                "spraying"
            );


        }
    );



    /* =====================================================
       CREATE SPRAY PARTICLES
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
                random > .97
            ) {


                size =
                    2.8 +
                    Math.random() *
                    3.3;


            }


            else if (
                random > .72
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
                    Math.cos(angle) *
                    distance,


                y:
                    y +
                    Math.sin(angle) *
                    distance,


                size:
                    size,


                life:
                    life,


                maxLife:
                    life,


                driftX:
                    (Math.random() - .5) *
                    .07,


                driftY:
                    (Math.random() - .5) *
                    .07


            });


        }



        /* dense center */

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
                    (Math.random() - .5) *
                    10,


                y:
                    y +
                    (Math.random() - .5) *
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

    let lastSpray = 0;


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
                particle.life <= 0
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
                ratio > .30
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
                Math.PI * 2
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
       RETURN
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
                mouseX + "px";


            nozzle.style.top =
                mouseY + "px";


            nozzle.style.opacity =
                "1";


        }
    );


})();



/* =========================================================
   NIRMUKA ARTWORK PROTECTION

   ACTIVE:
   - CAROUSEL / WORKS
   - ARTWORK DETAIL
========================================================= */

(function () {


    /* =====================================================
       CREATE WARNING
    ===================================================== */

    const oldWarning =
        document.querySelector(
            ".theft-warning"
        );


    if (oldWarning) {

        oldWarning.remove();

    }


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
       RIGHT CLICK
    ===================================================== */

    document.addEventListener(
        "contextmenu",
        event => {


            const protectedArtwork =
                event.target.closest(

                    ".carousel-artwork img, .art-card img, #art-image, .artwork-image img"

                );


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
       BLOCK DRAG
    ===================================================== */

    document.addEventListener(
        "dragstart",
        event => {


            const protectedArtwork =
                event.target.closest(

                    ".carousel-artwork img, .art-card img, #art-image, .artwork-image img"

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
       BLOCK SELECTION
    ===================================================== */

    document.addEventListener(
        "selectstart",
        event => {


            const protectedArtwork =
                event.target.closest(

                    ".carousel-artwork img, .art-card img, #art-image, .artwork-image img"

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
