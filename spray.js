/* =========================================================
   NIRMUKA SPRAY SYSTEM

   Handle:
   - Custom nozzle cursor
   - Spray paint particles
   - Canvas effect
   - Mouse interaction

========================================================= */



(function(){



"use strict";





/* =========================================================
   CREATE CANVAS
========================================================= */


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





/* =========================================================
   CREATE NOZZLE CURSOR
========================================================= */


const nozzle =
    document.createElement(
        "div"
    );


nozzle.className =
    "spray-nozzle";



nozzle.innerHTML = `


<div class="nozzle-top"></div>


<div class="nozzle-body"></div>


`;



document.body.appendChild(
    nozzle
);








/* =========================================================
   RESIZE CANVAS
========================================================= */


function resize(){


    canvas.width =
        window.innerWidth;


    canvas.height =
        window.innerHeight;


}


resize();



window.addEventListener(
    "resize",
    resize
);







/* =========================================================
   PARTICLE SYSTEM
========================================================= */


const particles = [];



let mouseX =
    window.innerWidth / 2;


let mouseY =
    window.innerHeight / 2;



let spraying =
    false;



let lastSpray =
    0;







function createParticle(
    x,
    y
){


    const angle =
        Math.random()
        *
        Math.PI
        *
        2;



    const speed =
        Math.random()
        *
        4
        +
        1;



    particles.push({


        x:x,

        y:y,


        vx:
            Math.cos(angle)
            *
            speed,


        vy:
            Math.sin(angle)
            *
            speed,



        size:
            Math.random()
            *
            3
            +
            .5,



        life:
            80
            +
            Math.random()
            *
            80


    });



}









function sprayBurst(
    x,
    y
){



    for(
        let i=0;
        i<45;
        i++
    ){


        createParticle(
            x,
            y
        );


    }



}







/* =========================================================
   DRAW LOOP
========================================================= */


function animate(){



    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );




    particles.forEach(
        (particle,index)=>{


            particle.x +=
                particle.vx;



            particle.y +=
                particle.vy;



            particle.life--;



            ctx.beginPath();



            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI*2
            );



            ctx.fillStyle =
                `rgba(245,245,235,${particle.life/150})`;



            ctx.fill();





            if(
                particle.life <= 0
            ){


                particles.splice(
                    index,
                    1
                );


            }



        }
    );



    requestAnimationFrame(
        animate
    );


}


animate();








/* =========================================================
   MOUSE MOVE
========================================================= */


document.addEventListener(
    "mousemove",
    event=>{


        mouseX =
            event.clientX;



        mouseY =
            event.clientY;




        nozzle.style.left =
            `${mouseX}px`;



        nozzle.style.top =
            `${mouseY}px`;



    }

);







/* =========================================================
   SPRAY ACTION

   CLICK HOLD

========================================================= */


document.addEventListener(
    "mousedown",
    event=>{


        if(
            event.button !== 0
        ){

            return;

        }



        spraying = true;



        nozzle.classList.add(
            "active"
        );



    }

);





document.addEventListener(
    "mouseup",
    ()=>{


        spraying = false;



        nozzle.classList.remove(
            "active"
        );


    }

);







/* =========================================================
   SPRAY LOOP
========================================================= */


function sprayLoop(
    time
){



    if(
        spraying
    ){



        if(
            time-lastSpray > 30
        ){


            sprayBurst(
                mouseX,
                mouseY
            );


            lastSpray =
                time;


        }


    }



    requestAnimationFrame(
        sprayLoop
    );


}


requestAnimationFrame(
    sprayLoop
);





})();
