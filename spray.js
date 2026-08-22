/* =========================================================

   NIRMUKA SPRAY ENGINE

   GLOBAL VISUAL EFFECT

   Works
   Artwork
   Writings
   Article

========================================================= */


(function(){


"use strict";



function createSprayCanvas(){



if(
document.getElementById(
"nirmuka-spray-canvas"
)
){

return;

}




const canvas =
document.createElement(
"canvas"
);



canvas.id =
"nirmuka-spray-canvas";



canvas.style.position =
"fixed";


canvas.style.inset =
"0";



canvas.style.width =
"100%";



canvas.style.height =
"100%";



canvas.style.pointerEvents =
"none";



canvas.style.zIndex =
"9999";



canvas.style.mixBlendMode =
"screen";



document.body.appendChild(
canvas
);




return canvas;



}









function spray(){



const canvas =
createSprayCanvas();



if(!canvas){

return;

}





const ctx =
canvas.getContext(
"2d"
);



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






const particles=[];







function createParticle(){



particles.push({


x:
Math.random()
*
canvas.width,


y:
Math.random()
*
canvas.height,


size:
Math.random()
*
80
+
20,


alpha:
Math.random()
*
0.15,


speed:
Math.random()
*
0.5
+
0.2,


angle:
Math.random()
*
Math.PI
*
2



});



}





for(
let i=0;
i<35;
i++
){

createParticle();

}










function animate(){



ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



particles.forEach(
p=>{


ctx.beginPath();



ctx.arc(
p.x,
p.y,
p.size,
0,
Math.PI*2
);



ctx.fillStyle =
`rgba(
255,
255,
255,
${p.alpha}
)`;



ctx.fill();




p.x +=
Math.cos(
p.angle
)
*
p.speed;



p.y +=
Math.sin(
p.angle
)
*
p.speed;




if(
p.x < -100 ||
p.x > canvas.width+100 ||
p.y < -100 ||
p.y > canvas.height+100
){

p.x =
Math.random()
*
canvas.width;


p.y =
Math.random()
*
canvas.height;


}



});


requestAnimationFrame(
animate
);



}



animate();



}







/* START */




if(
document.readyState ===
"loading"
){


document.addEventListener(
"DOMContentLoaded",
spray
);


}
else{


spray();


}



})();
