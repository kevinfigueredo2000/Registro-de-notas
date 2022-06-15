/*
 // usa la función de validar si aprobó o no
function validar(){
    //var alumno1 = new alumno(nombre, nota1, ndiv, np);
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