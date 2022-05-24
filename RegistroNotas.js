import { insert } from "./firestore";
import { getUUID } from "./utils.js";


/*
    creación de objeto con: Nombre, notas, Ndiv(array con notas, q se reinician cada vez que se genera el promedio) y np(ndiv.length)
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
}*/

/*---------------------------------------------------------------------

Asignación de variables al html

let nombre = $("#nom");

let nota1 = $("#not");

let ndiv = [];

let np = ndiv.length;

let contador = 0; */

/* ---------------------------------------------------------------------------------

$("#genprom").on("click",function(){
    let alumno1 = new alumno(nombre, nota1, ndiv, np);
    ndiv.push(parseInt($("#not").val().split(",")));
    $(`#padre`).append(
                        `
                        <form name="formulario">
                            <div class="container card-1 contador${contador} mt-3 limp">
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
                            </div>
                        </form>
                         `
                            )    
    validar();
    $(`.contador${contador}`).hide(0).fadeIn(1000);     
    ndiv = [];         
    $("#not").val("");
    $("#nom").val("");
    contador ++;
}) */


$(`.eliminar${contador}`).on("click", function(){
    $(`.contador${contador}`).remove().fadeOut(3000);
})

//limpiar lista completa alumnos

$("#limpiar").on("click", function(){
    $(".limp").remove().fadeOut();
})

//sumar numeros

$("#mas").on("click", function(){
    ndiv.push(parseInt($("#not").val().split(",")));
    $("#not").val("");
    $("#not").focus();
})

// enter en mas, auto focus

$("#not").on("keypress", function(event){
    if(event.key === "Enter"){
        ndiv.push(parseInt($("#not").val().split(",")));
        $("#not").val("");
        $("#not").focus()
    }
})

//validar si está aplicado todo bien, sino carteles

/* function validar(){
    var alumno1 = new alumno(nombre, nota1, ndiv, np);
    if(($("#nom").val() !== "") && (alumno1.calcularPromedio(ndiv) >= 7)){
        $(`#apro${contador}`).append(
            `
                <div class="col-sm-12 alert alert-success">
                    <strong>¡El alumno está aprobado!</strong>
                </div>
            `
        )
    }else if(($("#nom").val() !== "") && (alumno1.calcularPromedio(ndiv) <= 7)){
        $(`#apro${contador}`).append(
            `
                <div class="col-sm-12 alert alert-warning">
                    <strong>¡El alumno está desaprobado!</strong>
                </div>
            `
        )
    }else{
        $(`#alerta`).append(
            `
                <div class="col-sm-12 mt-3 alert alert-danger" id="al${contador}">
                    <strong>¡No se seleccionó ninguna nota y/o nombre!</strong>
                </div>
            `)
        $(`.contador${contador}`).remove();
        $(`#al${contador}`).fadeOut(4000);
    }
} */

//ordenar de a-z
$("#a-z").on("click", function(){
    total-alumnos.sort();
})

//-----------------------------------------------------NUEVO------------------------------------------------------------------

//let nombre = $("#nom");
$("#genprom").on("click",function(){
    //(acá se generaba un alumno nuevo---viejo) ||| let alumno1 = new alumno(nombre, nota1, ndiv, np);
    //lo puse arriba y los pasa a numero, los sube al array y los separa con coma ||| ndiv.push(parseInt($("#not").val().split(",")));
    $(`#padre`).append(
                        `
                        <form name="formulario">
                            <div class="container card-1 contador${contador} mt-3 limp">
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
                            </div>
                        </form>
                         `
                            )    
    validar(); // usa la función de validar si aprobó o no
    $(`.contador${contador}`).hide(0).fadeIn(1000);// muestra con efecto el div donde estan los datos subidos
    ndiv = []; // setea en cero el array (viejo--cambiarlo)     
    $("#not").val("");// setea en blanco los inputs
    $("#nom").val("");// setea en blanco los inputs
    contador ++;//contador de div para separar y crear uno nuevo
})

////validar si está aplicado todo bien, sino carteles

function validar(){
    var alumno1 = new alumno(nombre, nota1, ndiv, np);
    if(($("#nom").val() !== "") && (alumno1.calcularPromedio(ndiv) >= 7)){
        $(`#apro${contador}`).append(
            `
                <div class="col-sm-12 alert alert-success">
                    <strong>¡El alumno está aprobado!</strong>
                </div>
            `
        )
    }else if(($("#nom").val() !== "") && (alumno1.calcularPromedio(ndiv) <= 7)){
        $(`#apro${contador}`).append(
            `
                <div class="col-sm-12 alert alert-warning">
                    <strong>¡El alumno está desaprobado!</strong>
                </div>
            `
        )
    }else{
        $(`#alerta`).append(
            `
                <div class="col-sm-12 mt-3 alert alert-danger" id="al${contador}">
                    <strong>¡No se seleccionó ninguna nota y/o nombre!</strong>
                </div>
            `)
        $(`.contador${contador}`).remove();
        $(`#al${contador}`).fadeOut(4000);
    }
}