document.addEventListener('DOMContentLoaded' , () => {

let canvas=document.getElementById('myCanvasImage');

let ctx=canvas.getContext('2d');
let width=canvas.width;
let height=canvas.height
let myImage = new Image();
let imagen=document.getElementById('file');
let imagenOriginal;


imagen.addEventListener('change',function(e){

   if(e.target.files){

    let reader=new FileReader(); // creamos un objeto para almacenar la imagen
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = function (e){

        myImage.src=e.target.result;
        myImage.onload=()=>{

          //  canvas.width=myImage.width;
           // canvas.height=myImage.height;
            myDrawImage(myImage);
        }
    }   

    }          

    });

function myDrawImage(image){

        ctx.drawImage(image,0,0,width,height);
        imagenOriginal=ctx.getImageData(0,0,width,height);

 }
//////////////////////////---------------------RESTAURAR------------------------////////////////////
 document.getElementById("btnRestaurar").addEventListener("click", e => {
   ctx.putImageData(imagenOriginal, 0, 0);
});
 let btnGuardar = document.querySelector("#btnGuardar");
 btnGuardar.addEventListener("click", e => {
     let dir = canvas.toDataURL('images/jpg');
     btnGuardar.href = dir;
 });
//------------------------FILTRO BLANCO Y NEGRO--------------------------------------------------------------
//Filtro Blanco y negro.  Para aplicar el filtro BYN r,g,b deben tener el mismo valor
let btnBlancoYNegro=document.getElementById('btnBlancoyNegro'); 
btnBlancoYNegro.addEventListener('click',filtroBlancoYNegro);

function filtroBlancoYNegro(){

    //let imageData=ctx.getImageData(0,0,myImage.width,myImage.height);
    let imageData=ctx.getImageData(0,0,width,height);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {

            let color=getColor(imageData,x,y)
            setPixel(imageData,x,y,color,color,color,255);           
            
        }
        
    }
    ctx.putImageData( imageData, 0, 0 ); 


}
function getColor(imageData,x,y){

    let index=(x+y*imageData.height)*4;
    let red=imageData.data[index+0];
    let green=imageData.data[index+1];
    let blue=imageData.data[index+2];

    return ((red+green+blue)/3);
}


function setPixel(imageData,x,y,r,g,b,a){

    let index=(x+y*imageData.height)*4;
    imageData.data[index+0]=r;
    imageData.data[index+1]=g;
    imageData.data[index+2]=b;
    imageData.data[index+3]=a;


}

///////////////////////////////////----------------------------------------------------------////////////////////////////////////////////

//-----------------------------------------------FILTRO NEGATIVO----------------------------------------------------------------------------

let btnNegativo=document.getElementById('btnNegativo');
btnNegativo.addEventListener('click', filtroNegativo);
function filtroNegativo() {
   // let imageData=ctx.getImageData(0,0,myImage.width,myImage.height);
    let imageData=ctx.getImageData(0,0,width,height);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let pixel = getPixelRGB(imageData, x, y);
            let red = 255 - pixel[0];
            let green = 255 - pixel[1];
            let blue = 255 - pixel[2];           
            setPixel(imageData, x, y, red, green, blue, 255);
        }
    }
   ctx.putImageData(imageData,0,0);
}

function getPixelRGB(imageData, x, y){

    let index=(x+y*imageData.height)*4;
    let red=imageData.data[index+0];
    let green=imageData.data[index+1];
    let blue=imageData.data[index+2];
    let a=imageData.data[index+3];

    return [red,green,blue,a];

}
//-------------------------------------------FILTRO SEPIA------------------------------------------------------------

let btnSepia=document.getElementById('btnSepia');
btnSepia.addEventListener('click', filtroSepia);
function filtroSepia() {
   // let imageData=ctx.getImageData(0,0,myImage.width,myImage.height);
    let imageData=ctx.getImageData(0,0,width,height);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let pixel = getPixelRGB(imageData, x, y);
            let red = (0.393*pixel[0])+(0.769*pixel[1])+(0.189*pixel[2]);
            let green = (0.349*pixel[0])+(0.686*pixel[1])+(0.168*pixel[2]);
            let blue =  (0.272*pixel[0])+(0.534*pixel[1])+(0.131*pixel[2]);     
            setPixel(imageData, x, y, red, green, blue, 255);
        }
    }
   ctx.putImageData(imageData,0,0);
}

function getPixelRGB(imageData, x, y){

    let index=(x+y*imageData.height)*4;
    let red=imageData.data[index+0];
    let green=imageData.data[index+1];
    let blue=imageData.data[index+2];
    let a=imageData.data[index+3];

    return [red,green,blue,a];

}

/////////----------------------------------FILTRO BRILLO-----------------------------------------------------------------//////////////
/////En cuanto al brillo, el mismo consiste en sumar una constante  que se encuentre en el rango 0-255; 
//
let btnBrilloMas = document.getElementById('btnBrillo');
btnBrilloMas.addEventListener('change', function() {
    var brillo = parseInt(this.value);
    filtroBrillo(brillo);
});
    function filtroBrillo(valor){
        //let factor;
     // let intensidad = 255 * (valor * 0.1);
     let intensidad=valor;
      //let imageData=ctx.getImageData(0,0,myImage.width,myImage.height);
      let imageData=ctx.getImageData(0,0,width,height);
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let pixel = getPixelRGB(imageData, x, y);
                let red = rangoColor(pixel[0] + intensidad);
                let green = rangoColor(pixel[1] + intensidad);
                let blue = rangoColor(pixel[2] + intensidad);                
                setPixel(imageData, x, y, red, green, blue, 255);
            }
       }      
      
       ctx.putImageData( imageData, 0, 0 );    
     } 

    function rangoColor(valor){

        if (valor < 0)
        valor = 0;
        if (valor > 255)
        valor = 255;

         return valor;

    }
   
////////////////////////////---------BINARIZACION---------------------------------------/////////////////////
//La binarizacion de imagenes es una tecnica del procesamiento de imagenes que consiste en un proceso 
//de reduccion de la informacion de una imagen digital a dos valores : 0 (negro) y 255(blanco).
//Esta tecnica consiste en comparar cada pixel de la imagen con un determinado umbral 
//(valor limite que determina si un pixel sera de color blanco o negro).
// Los valores de la imagen que sean mayores que el umbral toman un valor 255 (blanco), 
//el resto de pixeles toman valor 0(negro).
let btnBinarizacion=document.getElementById('btnBinarizacion');
btnBinarizacion.addEventListener('click',filtroBinarizacion)

function filtroBinarizacion() {
    //let imageData = ctx.getImageData(0, 0, myImage.width,myImage.height);
    let imageData=ctx.getImageData(0,0,width,height);

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let pixel = getPixelRGB(imageData, x, y);
            let promedioPixel = rangoColor(Math.floor((pixel[0] + pixel[1] + pixel[2]) / 3));
            let pixelBlancoNegro = comprobarBlancoNegro(promedioPixel);          
            
            setPixel(imageData, x, y, pixelBlancoNegro, pixelBlancoNegro, pixelBlancoNegro, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0 );
    
}

function comprobarBlancoNegro(pixel) {
    if ((pixel > 127) && (pixel <= 255)) {
        return 255;
    } else if ((pixel >= 0) && (pixel <= 127)) {
        return 0;
    }
}

//---------------------------------------SATURACION-----------------------------------------



let rangoSaturacion = document.getElementById('rangoSaturacion');
rangoSaturacion.addEventListener('change', function() {
    var saturacion = parseInt(this.value);
    filtroSaturacion(saturacion);
});



function filtroSaturacion(saturacion) {
   // let imageData = ctx.getImageData(0, 0, myImage.width, myImage.height); 
   let imageData=ctx.getImageData(0,0,width,height);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y <  height; y++) {
            let pixel = getPixelRGB(imageData, x, y);
            let hsv = rgbToHsv(pixel[0], pixel[1], pixel[2]);
            let rgb = HSVtoRGB(hsv[0], (hsv[1] + saturacion), hsv[2]);
           
            setPixel(imageData, x, y, rgb[0], rgb[1], rgb[2], 255);
        }
    }
   ctx.putImageData(imageData,0,0);
}

function rgbToHsv(r, g, b) {
    var h;
    var s;
    var v;

    var maxColor = Math.max(r, g, b);
    var minColor = Math.min(r, g, b);
    var delta = maxColor - minColor;

    if (delta == 0) {
        h = 0;
    } else if (r == maxColor) {
        h = (6 + (g - b) / delta) % 6;
    } else if (g == maxColor) {
        h = 2 + (b - r) / delta;
    } else if (b == maxColor) {
        h = 4 + (r - g) / delta;
    } else {
        h = 0;
    }

    h = h / 6;

    if (maxColor != 0) {
        s = delta / maxColor;
    } else {
        s = 0;
    }

    v = maxColor / 255;

    return [h, s, v];
}

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s;
        v = h.v;
        h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
    ];
}


})




