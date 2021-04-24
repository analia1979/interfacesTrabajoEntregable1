document.addEventListener('DOMContentLoaded' , () => {

let canvas=document.getElementById('myCanvasImage');
let ctx=canvas.getContext('2d');

let myImage = new Image();
let imagen=document.getElementById('file');

imagen.addEventListener('change',function(e){

   if(e.target.files){

    let reader=new FileReader(); // creamos un objeto para almacenar la imagen
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = function (e){

        myImage.src=e.target.result;
        myImage.onload=()=>{

            canvas.width=myImage.width;
            canvas.hegth=myImage.height;
            myDrawImage(myImage);
        }
    }
     function myDrawImage(image){

            drawImage(image,0,0);
     }

    }
          

    })
//Filtro Blanco y negro.  Para aplicar el filtro BYN r,g,b deben tener el mismo valor
let btnBlancoYNegro=document.getElementById('btnBlancoYNegro');
 
btnBlancoYNegro.addEventListener('click',filtroBlancoYNegro);

function filtroBlancoYNegro(){

    let imageData=myImage.getImageData();
    for (let i = 0; i < myImage.width; i++) {

        for (let j = 0; j < myImage.height; j++) {
           
             red=myImage.imageData[i];
             green=myImage.imageData[i];
             red=myImage.imageData[i];
           
            
        }

      
        
    }


}




})




