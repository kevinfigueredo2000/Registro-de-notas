import { insert, getRegistros, eliminarRegistro, getRegistro, actualizarRegistro } from "./firestore.js";

//-------------------------VARIABLES GLOBALES----------------------------
let contador = 0;
let editStatus = false;
let id = "";


//---------------------AL CARGAR PÁGINA, MOSTRAR LOS REGISTROS DE NOTAS DE LA BASE DE DATOS------------------------
window.addEventListener('DOMContentLoaded', async ()=>{
    //CONSTANTE DONDE GUARDA FUNCION DE OBTENER REGISTROS
    const querySnapshot = await getRegistros();
    //RECORRE CADA REGISTRO
    querySnapshot.forEach(element => {
        //DATO ELEMENTO DEL REGISTRO '.(ALIAS DEL CAMPO)' 
        const dato = element.data();
        //AGREGO AL DIV CON ID 'PADRE' UN FORMULARIO CON LOS DATOS YA CARGADOS DE LA BASE DE DATOS
        $(`#padre`).append(
            `
            <form name="formulario">
                <div class="container card-1 contador${contador} mt-3 limp">
                    <div class="row mt-3" id="apro${contador}"> 
                        <div class="col-6"> 
                            <p>Alumno:<b>${dato.nombre}</b></p>
                            <p>Notas:<b>${dato.notas}</b></p>
                            <p>Promedio:<b>${dato.promedio}</b></p>
                        </div>
                        <div class="col-6 mt-3" id="p2"> 
                            <a href="#" class="eliminar"><i class="fas fa-trash-alt text-right btn btn-danger btn-sm" data-id=${element.id}></i></a>
                            <a href="#"class="editar"><i class="fas fa-edit btn btn-info btn-sm" data-id=${element.id}></i></a>
                        </div>
                    </div>
                </div>
            </form>
             `
            )    
    contador ++;
    });
    

    //---------------------ELIMINAR----------------------------
    const btnsEliminar = $(`.eliminar`);
    //HACIENDO CLICK, LLAMA A UNA FUNCION Q TOMA COMO PARAMETRO AL OBJETIVO SELECCIONADO CON LOS DATOS
    btnsEliminar.on('click', function({target:{dataset}}){
        //ELIMINA EL REGISTRO POR SU ID
        eliminarRegistro(dataset.id);
        // hacer q se elimine en tiempo real $(`.contador${contador}`).hide(0).fadeOut(1000).remove();
    })

    //---------------------EDITAR--------------------------------
    const btnsEditar = $(`.editar`);
    btnsEditar.on('click', async function ({target:{dataset}}){
        const doc = await getRegistro(dataset.id);
        const reg = doc.data();
        $("#nom").val(reg.nombre);
        $("#not").val(reg.notas);
        editStatus = true;
        id = dataset.id;
        $('#genprom').val('Actualizar')
    })

    /* 
    hacer q despues eliminen todos
    const eliminarTodoBtn = $('#limpiar');
    eliminarTodoBtn.on('click', function(){
        eliminarTodo();
    }) */
    
})
// calcular promedio ya funciona, falta aplicar a los cards y al firebase
function calcularPromedio(arrayNotas){
    let contador = 0;
    for(let elemento of arrayNotas){
        contador = contador + elemento;
    }
    let largo = arrayNotas.length;
    let promedio = (contador / largo);
    console.log(promedio);
    return(promedio);
}   

//------------------------------------BOTÓN MAS---------------------------------------------------------------------
let arrayNotas = [];
$("#mas").on("click", function(){
    //let nota = $("#not").val(null);
    arrayNotas.push(parseInt($("#not").val()));
    console.log(arrayNotas);
    //insert(nota);
    $("#not").val("");
    $("#not").focus()
})    

//------------------función que crea un div con los datos ingresados-------------------------------

$(`#genprom`).on('click', function(){
    let nombre = $("#nom").val();
    let nota = $("#not").val();
    let promedio = calcularPromedio(arrayNotas);
    if(!editStatus){
        calcularPromedio(arrayNotas);
        insert(nombre, arrayNotas, promedio);
    }else{
        actualizarRegistro(id,{nombre, nota});
        editStatus = false;
    }
    //calcularPromedio();
    $(`#padre`).append(
        `
        <form name="formulario">
            <div class="container card-1 contador${contador} mt-3 limp">
                <div class="row mt-3" id="apro${contador}"> 
                    <div class="col-6"> 
                        <p>Alumno:<b>${nombre}</b></p>
                        <p>Notas:<b>${arrayNotas}</b></p>
                        <p>Promedio:<b>${promedio}</b></p>
                    </div>
                    <div class="col-6 mt-3" id="p2"> 
                        <a href="#"><i class="fas fa-trash-alt text-right btn btn-danger btn-sm"></i></a>
                        <a href="#"><i class="fas fa-edit btn btn-info btn-sm"></i></a>
                    </div>
                </div>
            </div>
        </form>
         `
        )    
 // usa la función de validar si aprobó o no
    $(`.contador${contador}`).hide(0).fadeIn(1000);// muestra con efecto el div donde estan los datos subidos
    arrayNotas = []; // setea en cero el array (viejo--cambiarlo)     
    $("#not").val("");// setea en blanco los inputs
    $("#nom").val("");// setea en blanco los inputs
    contador ++;//contador de div para separar y crear uno nuevo
    }
)

//---------------------------SUMAR onEnter ||| despues hacer q pushee en vez de sumar-----------------------------
$("#not").on("keypress", function(event){
    if(event.key === "Enter"){
        let nota = $("#not").val(null);
        insert(nota);
        $("#not").val("");
        $("#not").focus()
    }
}) 
/*  function calcularPromedio(ndiv){
    let nota = $("#not").val(null);
    let contador = 0;
    nota.map=(notas)=>{
        contador = contador + notas;
    }
    let largo = nota.length;
    return (contador / largo);
}        */