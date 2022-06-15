import { insert, getRegistros, eliminarRegistro, getRegistro, actualizarRegistro } from "./firestore.js";

//-------------------------VARIABLES GLOBALES----------------------------
let contador = 0;
let editStatus = false;
let id = "";
let seleccionarForm = document.querySelector(`form`);


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
            <form name="formulario" id=${element.id}" class="formulario">
                <div class="container card-1  mt-2 limp">
                    <div class="row mt-3" id="apro${contador}"> 
                        <div class="col-10"> 
                            <p>Alumno:<b> ${dato.nombre}</b></p>
                            <p>Notas:<b> ${dato.notas}</b></p>
                            <p>Promedio:<b> ${dato.promedio}</b></p>
                        </div>
                        <div class="col-2 mt-3" id="p2"> 
                            <div class="my-1">
                                <a href="#" class="eliminar"><i class="fas fa-trash-alt text-right btn btn-danger btn-sm" data-id=${element.id}></i></a>
                            </div>
                            <div>
                                <a href="#"class="editar"><i class="fas fa-edit btn btn-info btn-sm" data-id=${element.id}></i></a>
                            </div>
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
        $(seleccionarForm).remove()
        //ELIMINA EL REGISTRO POR SU ID
        eliminarRegistro(dataset.id);
        // hacer q se elimine en tiempo real $(`.contador${contador}`).hide(0).fadeOut(1000).remove();
    })

    //---------------------ELIMINAR COLECCION----------------------------
/*     const btnEliminarTodo = $(`#limpiar`);
    btnEliminarTodo.on('click', async function(){
        const prueba = await getRegistros()
        console.log(prueba)
    }) */

    //---------------------EDITAR--------------------------------
    const btnsEditar = $(`.editar`);
    btnsEditar.on('click', async function ({target:{dataset}}){
        const doc = await getRegistro(dataset.id);
        const reg = doc.data();
        $("#nom").val(reg.nombre);
        $("#not").val(reg.promedio);
        editStatus = true;
        id = dataset.id;
        $(seleccionarForm).hide(300)
        $('#genprom').val('Actualizar')
    })

    
})
    const btnAZ = $(`.aZ`);
    btnAZ.on('click', async function(){
        let prueba = $(`.formulario`)
        $(prueba).hide(300);
        const querySnapshot = await getRegistros();
         //RECORRE CADA REGISTRO
        querySnapshot.forEach(element => {
        //DATO ELEMENTO DEL REGISTRO '.(ALIAS DEL CAMPO)' 
        const dato = element.data();
        let prueba1 = [dato.nombre.toUpperCase()]
        
        console.log(prueba1)

        //AGREGO AL DIV CON ID 'PADRE' UN FORMULARIO CON LOS DATOS YA CARGADOS DE LA BASE DE DATOS
        $(`#padre`).append(
            `
            <form name="formulario" id=${element.id}" class="formulario">
                <div class="container card-1  mt-2 limp">
                    <div class="row mt-3" id="apro${contador}"> 
                        <div class="col-10"> 
                            <p>Alumno:<b> ${prueba1.sort()}</b></p>
                            <p>Notas:<b> ${dato.notas}</b></p>
                            <p>Promedio:<b> ${dato.promedio}</b></p>
                        </div>
                        <div class="col-2 mt-3" id="p2"> 
                            <div class="my-1">
                                <a href="#" class="eliminar"><i class="fas fa-trash-alt text-right btn btn-danger btn-sm" data-id=${element.id}></i></a>
                            </div>
                            <div>
                                <a href="#"class="editar"><i class="fas fa-edit btn btn-info btn-sm" data-id=${element.id}></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
             `
            )    
    contador ++;
    })})

//---------------------------CALCULAR PROMEDIO--------------------------------------------------
let promedio;
function calcularPromedio(arrayNotas){
    let contador = 0;
    for(let elemento of arrayNotas){
        contador = contador + elemento;
    }
    let largo = arrayNotas.length;
    promedio = (contador / largo);
    console.log(promedio);
    return(promedio);
}   

//------------------------------------BOTÓN MAS---------------------------------------------------------------------
let arrayNotas = [];
$("#mas").on("click", function(){
    let nota = $("#not").val();
    if(!nota == ""){
        arrayNotas.push(parseInt($("#not").val()));
    }
    $("#not").val("");
    $("#not").focus()
})    

//---------------------------SUMAR onEnter ||| despues hacer q pushee en vez de sumar-----------------------------
$("#not").on("keypress", function(event){
    let nota = $("#not").val();
    if(event.key === "Enter"){
        if(!nota == ""){
            arrayNotas.push(parseInt($("#not").val()));
        }
        $("#not").val("");
        $("#not").focus()
    }
}) 

//------------------función que crea un div con los datos ingresados-------------------------------
$(`#genprom`).on('click', function(){
    let nombre = $("#nom").val();
    //let nota = $("#not").val();
    let promedio = calcularPromedio(arrayNotas);
    if(!editStatus){
        calcularPromedio(arrayNotas);
        let notas = arrayNotas;
        insert(nombre, notas, promedio);
    }else{
        let notas = arrayNotas;
        actualizarRegistro(id,{nombre, notas, promedio});
        editStatus = false;
    }
    //calcularPromedio();
    $(`#padre`).append(
        `
        <form name="formulario">
            <div class="container card-1 contador${contador} mt-3 limp">
                <div class="row mt-3" id="apro${contador}"> 
                    <div class="col-10"> 
                        <p>Alumno:<b> ${nombre}</b></p>
                        <p>Notas:<b> ${arrayNotas}</b></p>
                        <p>Promedio:<b> ${promedio}</b></p>
                    </div>
                    <div class="col-2 mt-3" id="p2"> 
                        <div class="my-1">
                            <a href="#"><i class="fas fa-trash-alt text-right btn btn-danger btn-sm"></i></a>
                        </div>
                        <div>
                            <a href="#"><i class="fas fa-edit btn btn-info btn-sm"></i></a>
                        </div>
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
    //window.location.reload(true);
    !editStatus && $('#genprom').val('Generar promedio')
    }
)

