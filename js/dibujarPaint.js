
document.addEventListener('DOMContentLoaded' , () => {
let canvas=document.getElementById('myCanvas');
let contexto=canvas.getContext('2d');

let rect=canvas.getBoundingClientRect(); //posicion del canvas con respecto a la pantalla
//puntos iniciales  donde va a empezar a dibujar
let x=0;
let y=0;

let dibujando=false; // indicador de si esta dibujando o no.(cuando hizo click o si solto)
let color="red";
let grosorLinea='1';
let color_background="white";

contexto.fillStyle=color_background;
contexto.fillRect(0,0,canvas.width,canvas.heigth); 

let btnDibujar=document.getElementById('btnDibujar');
btnDibujar.addEventListener('click',habilitarDibujo);

function habilitarDibujo(){
        console.log('hola ')
       // finalizarBorrado();
        comenzarDibujo();
        comenzarTrazo();
        finalizarDibujo();
}

//evento que controla cuando hace click dentro de canvas.---
function comenzarDibujo(){
     
    if(!dibujando){
        canvas.addEventListener('mousedown',function(e){
        //me guardo la posicion en donde el usuario hizo click y le resto la posicion con respecto al canvas
        x=e.clientX-rect.left;
        y=e.clientY-rect.top;
        dibujando=true;
      })}
      
    }
 // cuando el mouse de mueve
function comenzarTrazo(){
       
        canvas.addEventListener('mousemove',function(e){

        if(dibujando) {


            let posActualX=e.clientX-rect.left;
            let posActualY=e.clientY-rect.top;    
            dibujar(x,y,posActualX,posActualY);
            //mi nuevo punto inicial es x1 y y2
            x=posActualX;
            y=posActualY;
        
        }
        })}

//necesito una funcion cuando el dejamos de hacer click en el mouse
function finalizarDibujo(){
            canvas.addEventListener('mouseup',function(e){

            //me quedo con las coordenadas donde dejo de hacer click y debo dibujar la ultima linea

            if(dibujando){
               // let posActualX=e.clientX-rect.left;
               // let posActualY=e.clientY-rect.top;    
              //  dibujar(x,y,posActualX,posActualY);
                //ahora mi punto inicial vuelve a cero
                x=0;
                y=0;
                dibujando=false;

            }


}) }

function dibujar(xInicial,yInicial,xFinal,yFinal){

    contexto.beginPath();
    contexto.strokeStyle=color;
    contexto.lineWidth=grosorLinea;
    contexto.moveTo(xInicial,yInicial);
    contexto.lineTo(xFinal,yFinal);
    contexto.stroke(); //Para que se dibuje la linea;
    contexto.closePath();
}


// BORRADO TOTAL

let btnBorrarCanvas=document.getElementById('btnLimpiar');

btnBorrarCanvas.addEventListener('click',()=>{
 
 
    contexto.fillStyle=color_background;
    contexto.clearRect(0,0,canvas.width,canvas.height);
   // contexto.fillRect(0,0,canvas.width,canvas.height); 

});

//BORRADO PARCIAL

//DEBERIA HACER LO MISMO QUE DIBUJAR SOLO QUE LA LINEA DEBERIA HACERLA EN COLOR BLANCO
let btnGomaBorrar=document.getElementById('btnBorrar');

btnGomaBorrar.addEventListener('click',()=>{
   
    comenzarBorrado();
    comenzarTrazoBorrado();
    finalizarBorrado();
    

});

function comenzarBorrado(){

       if(!dibujando){
        canvas.addEventListener('mousedown',function(e){
        //me guardo la posicion en donde el usuario hizo click y le resto la posicion con respecto al canvas
        x=e.clientX-rect.left;
        y=e.clientY-rect.top;
        console.log(x,y);
        dibujando=true;
      })
    }
    }
 // cuando el mouse de mueve
function comenzarTrazoBorrado(){
       
        canvas.addEventListener('mousemove',function(e){

        if(dibujando) return;

            let posActualX=e.clientX-rect.left;
            let posActualY=e.clientY-rect.top;    
            borrar(x,y,posActualX,posActualY);
            //mi nuevo punto inicial es x1 y y2
            x=posActualX;
            y=posActualY;
        

        })}

//necesito una funcion cuando el dejamos de hacer click en el mouse
function finalizarBorrado(){
            canvas.addEventListener('mouseup',function(e){

            //me quedo con las coordenadas donde dejo de hacer click y debo dibujar la ultima linea

            if(dibujando){
             //   let posActualX=e.clientX-rect.left;
              //  let posActualY=e.clientY-rect.top;    
             //   borrar(x,y,posActualX,posActualY);
                //ahora mi punto inicial vuelve a cero
                x=0;
                y=0;
                dibujando=false;
            }          


}) }

function borrar(xInicial,yInicial,xFinal,yFinal){

    contexto.beginPath();
    contexto.strokeStyle='white';
    contexto.lineWidth=50;
    contexto.moveTo(xInicial,yInicial);
    contexto.lineTo(xFinal,yFinal);
    contexto.stroke(); //Para que se dibuje la linea;
    contexto.closePath();
}


})
