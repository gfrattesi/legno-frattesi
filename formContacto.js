
//! VARIABLES GLOBALES

const formContacto = document.getElementById("formulario-contacto;");
const nombre = document.getElementById("form-nombre");
const apellido = document.getElementById("form-apellido");
const correo = document.getElementById("form-correo");
const telefono = document.getElementById("form-cel");
const direccion = document.getElementById("form-direccion");
const ciudad = document.getElementById("form-ciudad");
const asunto = document.getElementById("form-asunto");
const consulta = document.getElementById("form-consulta");
const botonEnviar = document.getElementById("form-submit");
const botonBorrar = document.getElementById("form-reset");


//! EVENTOS

// ENVIO DEL FORMULARIO
botonEnviar.onclick = (e) => {
    e.preventDefault();

    // RECUPERACIÓN DE DATOS DE INPUTS
    const nombreContacto = nombre.value;
    const apellidoContacto = apellido.value;
    const correoContacto = correo.value;
    const telefonoContacto = telefono.value;
    const direccionContacto = direccion.value;
    const ciudadContacto = ciudad.value;
    const asuntoContacto = asunto.value;
    const consultaContacto = consulta.value;

    // SIMULACIÓN DE ENVÍO DE DATOS AL SERVIDOR A TRAVES DE FETCH
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            nombre: nombreContacto,
            apellido: apellidoContacto,
            correo: correoContacto,
            telefono: telefonoContacto,
            direccion: direccionContacto,
            ciudad: ciudadContacto,
            asunto: asuntoContacto,
            consulta: consultaContacto,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));// SE MUESTRAN EN CONSOLA LOS DATOS ENVIADOS

    // EMITE ALERTA DE FORMULARIO ENVIADO
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Gracias por contactarnos!',
        text: 'Nos comunicaremos a la brevedad',
        showConfirmButton: false,
        timer: 3000
    });

    // SE VACIAN LOS CAMPOS DE INPUTS
    nombre.value = "";
    apellido.value = "";
    correo.value = "";
    telefono.value = "";
    direccion.value = "";
    ciudad.value = "";
    consulta.value = "";
    // FINALIZA EL PROCESO
    console.log("Fin del proceso");
}


// BORRAR DATOS DEL FORMULARIO
botonBorrar.onclick = (e) => {
    e.preventDefault();

    // EMITE ALERTA DE CONFIRMACIÓN DE ACCIÓN
    Swal.fire({
        title: '¿Quiere borrar los datos?',
        text: "Una vez borrados no podrá recuperarlos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            // EMITE ALERTA DE ÉXITO
            Swal.fire(
                '¡Datos borrados!',
                'Tus datos fueron borrados con éxito',
                'success'
            );
            // SE VACÍAN LOS CAMPOS
            nombre.value = "";
            apellido.value = "";
            correo.value = "";
            telefono.value = "";
            direccion.value = "";
            ciudad.value = "";
            consulta.value = "";
        }
    })
}