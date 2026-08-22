/* =====================================
   NIRMUKA DIGITAL ARCHIVE SYSTEM
===================================== */

const curtain = document.querySelector(".curtain");
const content = document.getElementById("content-container");
const menuLinks = document.querySelectorAll(".main-menu a");


/* =====================================
   CURTAIN TRANSITION
===================================== */

function curtainTransition(callback) {

    curtain.classList.add("active");

    setTimeout(() => {

        callback();

        curtain.classList.remove("active");

    }, 900);

}


/* =====================================
   RETURN TO LANDING
===================================== */

function backToLanding() {

    curtainTransition(() => {

        content.innerHTML = "";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =====================================
   LOAD WORKS
===================================== */

function loadWorks() {

    curtainTransition(() => {

        content.innerHTML = `

        <section class="page-section">

            <div class="section-inner">

                <a href="#" class="back-home">
                    ← BACK
                </a>

                <p class="work-number">
                    ARCHIVE / WORKS
                </p>

                <h2>
                    WORKS
                </h2>

                <div class="works-gallery"></div>

            </div>

        </section>

        `;


        fetch("artworks.json")

        .then(response => response.json())

        .then(artworks => {

            const gallery =
                document.querySelector(".works-gallery");


            artworks.forEach(work => {

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

        })

        .catch(error => {

            console.error(
                "Error loading artworks:",
                error
            );

        });

    });

}


/* =====================================
   LOAD WRITINGS
===================================== */

function loadWritings() {

    curtainTransition(() => {

        content.innerHTML = `

        <section class="page-section">

            <div class="section-inner">

                <a href="#" class="back-home">
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


/* =====================================
   LOAD ABOUT
===================================== */

function loadAbout() {

    curtainTransition(() => {

        content.innerHTML = `

        <section class="page-section about-page">

            <div class="section-inner">

                <a href="#" class="back-home">
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


/* =====================================
   MENU CONTROL
===================================== */

menuLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            event.preventDefault();

            const page =
                link.dataset.page;


            if (page === "works") {
                loadWorks();
            }


            if (page === "writings") {
                loadWritings();
            }


            if (page === "about") {
                loadAbout();
            }

        }
    );

});


/* =====================================
   BACK BUTTON CONTROL
===================================== */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.classList.contains(
                "back-home"
            )
        ) {

            event.preventDefault();

            backToLanding();

        }

    }
);


/* =====================================
   NIRMUKA SPRAY PAINT SYSTEM
===================================== */

(function () {

    /*
       only desktop / mouse devices
    */

    if (
        !window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        return;

    }


    /* =====================================
       CREATE SPRAY CANVAS
    ===================================== */

    const sprayCanvas =
        document.createElement("canvas");

    sprayCanvas.id =
        "spray-canvas";

    document.body.appendChild(
        sprayCanvas
    );


    const ctx =
        sprayCanvas.getContext("2d");


    /* =====================================
       CREATE SPRAY NOZZLE
    ===================================== */

    const sprayCursor =
        document.createElement("div");

    sprayCursor.className =
        "spray-cursor";

    document.body.appendChild(
        sprayCursor
    );


    /* =====================================
       SCREEN RESOLUTION
    ===================================== */

    let dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    function resizeCanvas() {

        dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        sprayCanvas.width =
            window.innerWidth *
            dpr;


        sprayCanvas.height =
            window.innerHeight *
            dpr;


        sprayCanvas.style.width =
            window.innerWidth +
            "px";


        sprayCanvas.style.height =
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


    /* =====================================
       MOUSE DATA
    ===================================== */

    let mouseX = 0;
    let mouseY = 0;

    let previousX = 0;
    let previousY = 0;

    let mouseSpeed = 0;

    let spraying = false;

    let mouseVisible = false;


    const particles = [];


    /* =====================================
       MOVE
    ===================================== */

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


            sprayCursor.style.left =
                mouseX + "px";


            sprayCursor.style.top =
                mouseY + "px";


            if (
                !mouseVisible
            ) {

                sprayCursor.style.opacity =
                    "1";

                mouseVisible =
                    true;

            }


            if (
                spraying
            ) {

                createSpray(
                    mouseX,
                    mouseY,
                    mouseSpeed
                );

            }

        }
    );


    /* =====================================
       PRESS MOUSE
    ===================================== */

    document.addEventListener(
        "mousedown",
        event => {

            /*
               left click only
            */

            if (
                event.button !== 0
            ) {

                return;

            }


            spraying =
                true;


            sprayCursor.classList.add(
                "spraying"
            );


            createSpray(
                mouseX,
                mouseY,
                0
            );

        }
    );


    /* =====================================
       RELEASE MOUSE
    ===================================== */

    document.addEventListener(
        "mouseup",
        () => {

            spraying =
                false;


            sprayCursor.classList.remove(
                "spraying"
            );

        }
    );


    window.addEventListener(
        "blur",
        () => {

            spraying =
                false;


            sprayCursor.classList.remove(
                "spraying"
            );

        }
    );


    /* =====================================
       CREATE SPRAY
    ===================================== */

    function createSpray(
        x,
        y,
        speed = 0
    ) {

        /*
           moving faster makes
           the spray wider
        */

        const spread =
            30 +
            Math.min(
                speed * .8,
                25
            );


        const amount =
            Math.min(
                65,
                25 +
                Math.floor(
                    speed * .8
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


            /*
               nonlinear distribution:
               more particles stay
               near the nozzle
            */

            const distance =
                Math.pow(
                    Math.random(),
                    1.8
                ) *
                spread;


            const xPosition =
                x +
                Math.cos(angle) *
                distance;


            const yPosition =
                y +
                Math.sin(angle) *
                distance;


            const random =
                Math.random();


            let size;


            /*
               occasional large paint dots
            */

            if (
                random > .96
            ) {

                size =
                    2.8 +
                    Math.random() *
                    3.2;

            }

            else if (
                random > .70
            ) {

                size =
                    1.2 +
                    Math.random() *
                    1.7;

            }

            else {

                size =
                    .35 +
                    Math.random() *
                    .9;

            }


            const life =
                85 +
                Math.random() *
                100;


            particles.push({

                x:
                    xPosition,

                y:
                    yPosition,

                size:
                    size,

                life:
                    life,

                maxLife:
                    life,

                driftX:
                    (Math.random() - .5) *
                    .08,

                driftY:
                    (Math.random() - .5) *
                    .08

            });

        }


        /*
           denser paint in middle
        */

        for (
            let i = 0;
            i < 7;
            i++
        ) {

            const life =
                90 +
                Math.random() *
                100;


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
                    2.2,

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


    /* =====================================
       HOLD CLICK = CONTINUOUS SPRAY
    ===================================== */

    let previousSprayTime =
        0;


    function continuousSpray(
        time
    ) {

        if (
            spraying &&
            time -
            previousSprayTime >
            25
        ) {

            createSpray(
                mouseX,
                mouseY,
                mouseSpeed * .25
            );


            previousSprayTime =
                time;

        }

    }


    /* =====================================
       DRAW SPRAY
    ===================================== */

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
                .65;


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


            const lifeRatio =
                particle.life /
                particle.maxLife;


            let alpha;


            /*
               paint stays strong
               for most of its life
            */

            if (
                lifeRatio >
                .30
            ) {

                alpha =
                    .70 +
                    Math.random() *
                    .18;

            }

            else {

                alpha =
                    lifeRatio *
                    2.2;

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
                `rgba(
                    245,
                    245,
                    240,
                    ${alpha}
                )`;


            ctx.fill();

        }


        requestAnimationFrame(
            draw
        );

    }


    requestAnimationFrame(
        draw
    );


    /* =====================================
       CURSOR LEAVES WINDOW
    ===================================== */

    document.addEventListener(
        "mouseleave",
        () => {

            sprayCursor.style.opacity =
                "0";

            spraying =
                false;

            sprayCursor.classList.remove(
                "spraying"
            );

        }
    );


    document.addEventListener(
        "mouseenter",
        () => {

            sprayCursor.style.opacity =
                "1";

        }
    );

})();
