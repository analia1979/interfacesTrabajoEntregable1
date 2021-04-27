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
/////En cuanto al brillo, el mismo consiste en sumar a cada pixel una constante  
//
let btnBrilloMas = document.getElementById('btnBrillo');
btnBrilloMas.addEventListener('click', function() {
    let brillo = 50;
    filtroBrillo(brillo);
});
    function filtroBrillo(valor){
        
     let intensidad=valor;
   
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
// Los valores de la imagen que sean mayores de 127 toman un valor 255 (blanco), 
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

function comprobarBlancoNegro(pixel) {  // si el pixel esta entre 127 y 255 entonces es totalmente blanco caso contrario totalmente negro
    if ((pixel > 127) && (pixel <= 255)) {
        return 255;
    } else if ((pixel >= 0) && (pixel <= 127)) {
        return 0;
    }
}

//---------------------------------------SATURACION-----------------------------------------

// debo pasar a hsv y luego a rgb

let btnSaturacion = document.getElementById('btnSaturacion');
btnSaturacion.addEventListener('click', function() {
    let saturacion = 0.5;
    filtroSaturacion(saturacion);
});



function filtroSaturacion(saturacion) {

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

//-------------------------------------------- FILTRO BLUR----------------------------------------------------------------------------

let btnBlur=document.getElementById('btnBlur');
btnBlur.addEventListener('click',filtroBlur);

function filtroBlur(){

    let imagenOriginal = ctx.getImageData(0, 0, width, height); 
    let imageDataEditada = aplicarBlur(imagenOriginal);
    ctx.putImageData(imageDataEditada, 0, 0);
}

function aplicarBlur(imagen){

    let matrizFiltro = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ];
     let n=9;
    
    for (let x =1; x < (width - 1); x++) {
        for (let y = 1; y < (height - 1); y++) {
            let pixel_1_SupIzq = getPixelRGB(imagen, x - 1, y - 1); //superior izquirda 1
            let pixel_2_Arriba = getPixelRGB(imagen, x - 1, y); //arriba 2
            let pixel_3_SupDer = getPixelRGB(imagen, x - 1, y + 1); //superior derecha 3
            let pixel_4_Izq = getPixelRGB(imagen, x, y - 1); //izquierda 4
            let pixel_5_Centro = getPixelRGB(imagen, x, y); // pixel a cambiar del medio 5
            let pixel_6_Der = getPixelRGB(imagen, x, y + 1); // derecha 6
            let pixel_7_InfIzq = getPixelRGB(imagen, x + 1, y - 1); // inferior izquierda 7
            let pixel_8_Abajo = getPixelRGB(imagen, x + 1, y); // abajo 8
            let pixel_9_InfDer = getPixelRGB(imagen, x + 1, y + 1); // inferior derecha 9
            // saco el promedio
            let r = Math.floor((
                (pixel_1_SupIzq[0] * matrizFiltro[0][0]) + (pixel_2_Arriba[0] * matrizFiltro[0][1]) + (pixel_3_SupDer[0] * matrizFiltro[0][2]) +
                (pixel_4_Izq[0] * matrizFiltro[1][0]) + (pixel_5_Centro[0] * matrizFiltro[1][1]) + (pixel_6_Der[0] * matrizFiltro[1][2]) +
                (pixel_7_InfIzq[0] * matrizFiltro[2][0]) + (pixel_8_Abajo[0] * matrizFiltro[2][1]) + (pixel_9_InfDer[0] * matrizFiltro[2][2])
            ) / n);
            let g = Math.floor((
                (pixel_1_SupIzq[1] * matrizFiltro[0][0]) + (pixel_2_Arriba[1] * matrizFiltro[0][1]) + (pixel_3_SupDer[1] * matrizFiltro[0][2]) +
                (pixel_4_Izq[1] * matrizFiltro[1][0]) + (pixel_5_Centro[1] * matrizFiltro[1][1]) + (pixel_6_Der[1] * matrizFiltro[1][2]) +
                (pixel_7_InfIzq[1] * matrizFiltro[2][0]) + (pixel_8_Abajo[1] * matrizFiltro[2][1]) + (pixel_9_InfDer[1] * matrizFiltro[2][2])
            ) / n);
            let b = Math.floor((
                (pixel_1_SupIzq[2] * matrizFiltro[0][0]) + (pixel_2_Arriba[2] * matrizFiltro[0][1]) + (pixel_3_SupDer[2] * matrizFiltro[0][2]) +
                (pixel_4_Izq[2] * matrizFiltro[1][0]) + (pixel_5_Centro[2] * matrizFiltro[1][1]) + (pixel_6_Der[2] * matrizFiltro[1][2]) +
                (pixel_7_InfIzq[2] * matrizFiltro[2][0]) + (pixel_8_Abajo[2] * matrizFiltro[2][1]) + (pixel_9_InfDer[2] * matrizFiltro[2][2])
            ) / n);
         
            setPixel(imagen, x, y, r, g, b, 255);
        }
    }
 
    return imagen;
}

let btnGuardar=document.getElementById('btnGuardar');
btnGuardar.addEventListener('click',grabarImagen)

function grabarImagen(){

    grabar();
    let imageData = ctx.createImageData(width,height);    
    for (let x=0;x<width;x++){
        for(let y=0;y<height;y++){
            setPixel(imageData,x,y,255,255,255,255);
        }
    }
    ctx.putImageData(imageData,0,0);

};
function grabar () {
    var link = window.document.createElement( 'a' ),
        url = canvas.toDataURL(),
        filename = 'imagen.jpg';

    link.setAttribute( 'href', url );
    link.setAttribute( 'download', filename );
    link.style.visibility = 'hidden';
    window.document.body.appendChild( link );
    link.click();
    window.document.body.removeChild( link );
    
};









})




