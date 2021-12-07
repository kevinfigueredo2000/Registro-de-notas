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
                        `<div class="container card contador${contador} mt-3" id="prueba">
                            <div class="row mt-3" id="apro${contador}"> 
                                <div class="col-6"> 
                                    <p>Alumno:<b>${nombre.val()}</b></p>
                                    <p>Promedio:<b>${alumno1.calcularPromedio(ndiv)}</b></p>
                                </div>
                                <div class="col-6 mt-3" id="p2"> 
                                    <a href="#"><i class="fas fa-trash-alt text-right btn btn-danger btn-sm eliminar${contador}"></i></a>
                                    <a href="#"><i class="fas fa-edit btn btn-info btn-sm"></i></a>
                                </div>
                            </div>
                         </div>`
                            )    
    aprobado();
    $(`.contador${contador}`).hide(0).fadeIn(1000);     
    ndiv = [];         
    $("#not").val("");
    $("#nom").val("");
    contador ++;
})
$(`.eliminar${contador}`).on("click", function(){
    $(`.contador${contador}`).remove().fadeOut(1000);
})

$("#mas").on("click", function(){
    ndiv.push(parseInt($("#not").val().split(",")));
    $("#not").val("");
    $("#not").focus()
})

function aprobado(){
    var alumno1 = new alumno(nombre, nota1, ndiv, np);
    if(alumno1.calcularPromedio(ndiv) >= 7){
        $(`#apro${contador}`).append(
            `
                <div class="col-sm-12 alert alert-success">
                    <strong>¡El alumno está aprobado!</strong>
                </div>
            `
        )
        console.log("aprobado");
    }else if(alumno1.calcularPromedio(ndiv) <= 7){
        $(`#apro${contador}`).append(
            `
                <div class="col-sm-12 alert alert-warning">
                    <strong>¡El alumno está desaprobado!</strong>
                </div>
            `
        )
    }else{
        $(`#apro${contador}`).append(
            `
                <div class="col-sm-12 alert alert-danger">
                    <strong>¡No se selecciono ninguna nota!</strong>
                </div>
            `)
    }
}
