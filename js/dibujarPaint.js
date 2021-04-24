
document.addEventListener('DOMContentLoaded' , () => {
        let canvas=document.getElementById('myCanvas');
        let contexto=canvas.getContext('2d');
        let rect=canvas.getBoundingClientRect();
        let x=0;
        let y=0;
        let click;
        let lapiz = document.getElementById("btnDibujar");
        let goma = document.getElementById("btnGoma");
        let dibujando = false;
        let borrando = false;

        lapiz.addEventListener("click", e => {
            dibujando = true;
            borrando = false;          
            comezarDibujo();
        });

        goma.addEventListener("click", e => {  // para borrar debo hacer lo mismo comenzarDibujo solo que la linea debe ser blanca
            dibujando = false;
            borrando = true;          
            comezarDibujo();
        });

        function comezarDibujo() {
            click = false;
            canvas.addEventListener("mousedown", e => { 
                //al presionar clikc  habilito  para dibujar un nuevo trazo
                contexto.beginPath();
                click = true;
            });

            canvas.addEventListener("mousemove", e => {
                 //cuando se mueve que dibuje
                if (click) {
                    x=e.clientX-rect.left;
                    y=e.clientY-rect.top;
                    dibujar(e);
                }
            });

            canvas.addEventListener("mouseup", e => { 
                //cuando suelto el click cierro el contexto
                click = false;
                contexto.closePath();
            });

            function dibujar(e) {
                x=e.clientX-rect.left;
                y=e.clientY-rect.top;
                contexto.lineWidth = 10;
                if (dibujando) {
                    contexto.strokeStyle = "#000000";
                } else if (borrando) {
                    contexto.strokeStyle = "#FFFFFF";  // si esta borrando le doy el estilo a la linea blanco
                }
                if (click) {
                    contexto.lineTo(x, y); // 200, 300
                    contexto.stroke();
                }
            }

        }


})
