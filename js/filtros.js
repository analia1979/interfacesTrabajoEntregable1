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
            ctx.drawImage(myImage,0,0);
        }
    }
    }
          

    })



})




