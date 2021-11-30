class alumno{
    constructor(nombre, nota1, ndiv, np){
        this.nombre = nombre;
        this.nota1 = nota1; 
        this.ndiv = ndiv;
        this.np = np;
    }   
    calcularPromedio(ndiv){
        let contador = 0;
        for(let elemento of ndiv){
            contador = contador + elemento;
        }
        let largo = ndiv.length;
        return (contador / largo);
    }        
}
let nombre = $("#nom");

let nota1 = $("#not");

let ndiv = [];

let np = ndiv.length;

let alumno1 = new alumno(nombre, nota1, ndiv, np);

$("#genprom").on("click",function(){
    ndiv.push(parseInt($("#not").val().split(",")));
    $("#padre").append(
                        `<div class="container card" id="prueba">
                            <div class="row"> 
                                <div class="col-6"> 
                                    <p>Alumno:${nombre.val()}</p>
                                    <p>Promedio:${alumno1.calcularPromedio(ndiv)}</p>
                                </div>
                                <div class="col-6" id="p2"> 
                                    <a href="#" id="eliminar"><i class="fas fa-trash-alt text-right"></i></a>
                                    <a href="#" id="editar"><i class="fas fa-edit"></i></a>
                                </div>
                            </div>
                         </div>`
                            )     
    $("#p2").hide(0).fadeIn(3000); /*hacer contador */                    
    $("#not").val("");
    $("#nom").val("");
})

$("#mas").on("click", function(){
    ndiv.push(parseInt($("#not").val().split(",")));
    $("#not").val("");
})
$("#eliminar").on("click", function(){
    $("#prueba").remove();
})
