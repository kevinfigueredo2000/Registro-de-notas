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

let contador = 0;

$("#genprom").on("click",function(){
    let alumno1 = new alumno(nombre, nota1, ndiv, np);
    ndiv.push(parseInt($("#not").val().split(",")));
    $(`#padre`).append(
                        `<div class="container card contador${contador}" id="prueba">
                            <div class="row"> 
                                <div class="col-6"> 
                                    <p>Alumno:${nombre.val()}</p>
                                    <p>Promedio:${alumno1.calcularPromedio(ndiv)}</p>
                                </div>
                                <div class="col-6" id="p2"> 
                                    <a href="#" id="eliminar"><i class="fas fa-trash-alt text-right btn btn-danger eliminar"></i></a>
                                    <a href="#" id="editar"><i class="fas fa-edit btn btn-info"></i></a>
                                </div>
                            </div>
                         </div>`
                            )     
    $(`.contador${contador}`).hide(0).fadeIn(1000);                 
    $("#not").val("");
    $("#nom").val("");
    contador ++;
})
$(`.eliminar${contador}`).on("click", function(){
    $(`.contador${contador}`).remove(0).fadeOut(1000);
})

$("#mas").on("click", function(){
    ndiv.push(parseInt($("#not").val().split(",")));
    $("#not").val("");
    $("#not").focus()
})
