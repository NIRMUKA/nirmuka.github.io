/* =========================================================
   NIRMUKA ART PROTECTION SYSTEM
   VERSION 3.0

   Protection:
   - Disable right click
   - Disable copy
   - Disable cut
   - Disable image dragging
   - Disable save shortcuts
   - Disable inspect shortcuts
   - Warning image overlay

========================================================= */


(function(){

"use strict";



const CONFIG = {

    warningImage:
    "/images-12.webp",

    duration:
    2500

};



let overlay = null;

let timer = null;




/* =========================================================
   CREATE OVERLAY
========================================================= */


function createOverlay(){


    if(overlay){
        return;
    }



    overlay =
    document.createElement(
        "div"
    );


    overlay.className =
    "protection-overlay";



    overlay.innerHTML = `


        <div class="protection-warning-box">


            <img

            src="${CONFIG.warningImage}"

            class="protection-warning-image"

            alt="Protection Warning"

            >


        </div>


    `;



    document.body.appendChild(
        overlay
    );



}





/* =========================================================
   SHOW WARNING
========================================================= */


function showWarning(){


    createOverlay();



    clearTimeout(timer);



    overlay.classList.add(
        "show"
    );



    timer =
    setTimeout(()=>{


        overlay.classList.remove(
            "show"
        );


    }, CONFIG.duration);



}







/* =========================================================
   BLOCK ACTION
========================================================= */


function blockAction(event){


    event.preventDefault();



    if(event.stopImmediatePropagation){

        event.stopImmediatePropagation();

    }



    event.stopPropagation();



    showWarning();



    return false;


}







/* =========================================================
   RIGHT CLICK
========================================================= */


document.addEventListener(

"contextmenu",

function(event){


    blockAction(event);



},

true

);








/* =========================================================
   COPY
========================================================= */


document.addEventListener(

"copy",

function(event){


    blockAction(event);



},

true

);








/* =========================================================
   CUT
========================================================= */


document.addEventListener(

"cut",

function(event){


    blockAction(event);



},

true

);









/* =========================================================
   DRAG IMAGE
========================================================= */


document.addEventListener(

"dragstart",

function(event){


    const target =
    event.target;



    if(

        target.tagName === "IMG"

        ||

        target.tagName === "CANVAS"

    ){


        blockAction(event);


    }



},

true

);









/* =========================================================
   KEYBOARD PROTECTION
========================================================= */


document.addEventListener(

"keydown",

function(event){



    const key =
    event.key.toLowerCase();



    const command =
    event.ctrlKey ||
    event.metaKey;





    if(

        command &&

        (

        key==="c" ||

        key==="x" ||

        key==="s" ||

        key==="u" ||

        key==="p" ||

        key==="a"

        )

    ){


        blockAction(event);


    }






    if(

        event.key === "F12"

    ){


        blockAction(event);


    }






    if(

        event.ctrlKey &&

        event.shiftKey &&

        (

        key==="i" ||

        key==="j" ||

        key==="c"

        )

    ){


        blockAction(event);


    }



},

true

);








/* =========================================================
   INIT
========================================================= */


document.addEventListener(

"DOMContentLoaded",

function(){


    createOverlay();


}

);



})();
