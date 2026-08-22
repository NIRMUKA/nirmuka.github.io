/* =========================================================
   NIRMUKA ART PROTECTION SYSTEM

   Handle:
   - Disable context menu
   - Disable image dragging
   - Theft warning overlay

========================================================= */


(function(){


"use strict";



/* =========================================================
   CREATE WARNING OVERLAY
========================================================= */


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





/* =========================================================
   SHOW WARNING
========================================================= */


function showWarning(){


    warning.classList.add(
        "show"
    );



    setTimeout(()=>{


        warning.classList.remove(
            "show"
        );


    },1600);



}








/* =========================================================
   DETECT PROTECTED IMAGE

========================================================= */


function isArtworkImage(
    element
){


    if(
        !element
    ){

        return false;

    }




    return (

        element.tagName === "IMG"

        &&

        (

            element.closest(
                ".carousel-artwork"
            )

            ||

            element.closest(
                ".artwork-image"
            )

            ||

            element.id ===
            "art-image"

        )

    );



}







/* =========================================================
   BLOCK RIGHT CLICK

========================================================= */


document.addEventListener(
    "contextmenu",
    event=>{


        if(
            isArtworkImage(
                event.target
            )
        ){


            event.preventDefault();


            showWarning();



        }



    }

);







/* =========================================================
   BLOCK DRAG IMAGE

========================================================= */


document.addEventListener(
    "dragstart",
    event=>{


        if(
            isArtworkImage(
                event.target
            )
        ){


            event.preventDefault();


            showWarning();



        }



    }

);







/* =========================================================
   BLOCK IMAGE SAVE SHORTCUT

   Ctrl + S
   Cmd + S

========================================================= */


document.addEventListener(
    "keydown",
    event=>{


        if(

            (
                event.ctrlKey ||
                event.metaKey
            )

            &&

            event.key.toLowerCase()
            ===
            "s"

        ){


            event.preventDefault();


            showWarning();



        }



    }

);






})();
