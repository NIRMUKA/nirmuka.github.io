/* =====================================================
   NIRMUKA SPRAY / NOZZLE ENGINE
   GLOBAL EFFECT
===================================================== */


(function(){


"use strict";


function initSpray(){


    if(
        document.querySelector(".nirmuka-nozzle")
    ){
        return;
    }



    const nozzle =
    document.createElement("div");



    nozzle.className =
    "nirmuka-nozzle";



    document.body.appendChild(nozzle);





    document.addEventListener(
        "mousemove",
        function(e){



            nozzle.style.left =
            e.clientX + "px";



            nozzle.style.top =
            e.clientY + "px";



        }
    );







    document.addEventListener(
        "click",
        function(e){



            createPaint(
                e.clientX,
                e.clientY
            );


        }
    );



}






function createPaint(x,y){


    for(
        let i=0;
        i<12;
        i++
    ){


        const drop =
        document.createElement(
            "span"
        );


        drop.className =
        "paint-drop";



        drop.style.left =
        x +
        (Math.random()*40-20)
        +
        "px";



        drop.style.top =
        y +
        (Math.random()*40-20)
        +
        "px";



        drop.style.width =
        Math.random()*30+10
        +
        "px";



        drop.style.height =
        drop.style.width;



        document.body.appendChild(
            drop
        );




        setTimeout(()=>{

            drop.remove();

        },2000);


    }


}






if(
document.readyState === "loading"
){


document.addEventListener(
"DOMContentLoaded",
initSpray
);


}
else{


initSpray();


}



})();
