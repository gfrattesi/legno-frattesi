
//! FUNCIONES

//FUNCIÓN PARA INCREMENTAR PRECIO POR SELECCIÓN DE TERMINACIÓN
const incrementoTerminacion = (linea) => {
    switch (terminacion) {
        case "melamina color":
            precioIncrementado = linea.precio + terminaciones[0].precio;
            break;
        case "melamina texturada":
            precioIncrementado = linea.precio + terminaciones[1].precio;
            break;
        case "rauvisio":
            precioIncrementado = linea.precio + terminaciones[2].precio;
            break;
        default:
            break;
    }
    return precioIncrementado;
}

//FUNCIÓN PARA CALCULAR PRECIO FINAL DEL MUEBLE
const calcularPrecioFinal = (largo) => {
    switch (linea) {
        case "vintage":
            incrementoTerminacion(muebleVintage);
            precioFinal = precioIncrementado * largo;
            break;
        case "minimal":
            incrementoTerminacion(muebleMinimal);
            precioFinal = precioIncrementado * largo;
            break;
        case "premium":
            incrementoTerminacion(mueblePremium);
            precioFinal = precioIncrementado * largo;
            break;
    }
    return precioFinal;
}

//FUNCIÓN PARA CALCULAR EL VALOR DE LAS CUOTAS
const calcularCuotas = (precio) => {
    cantidadCuotas = parseInt(document.getElementById("selectorCuotas").value);
    divValorCuotas = document.getElementById("valorCuotas");
    switch (cantidadCuotas) {
        case 1:
            valorCuotas = precio / cantidadCuotas;
            divValorCuotas.innerHTML = `<p>${cantidadCuotas} cuota de $${valorCuotas} </p>`;
            promocion.innerHTML = `<p>Pagando en efectivo en nuestro Showroom accedes a un 10% OFF! (Precio final $${valorCuotas * 0.9}) </p>`;
            break;
        case 3:
            valorCuotas = precio * 1.12 / cantidadCuotas;
            divValorCuotas.innerHTML = `<p>${cantidadCuotas} cuotas de $${valorCuotas.toFixed(2)} </p>`;
            break;
        case 6:
            valorCuotas = precio * 1.24 / cantidadCuotas;
            divValorCuotas.innerHTML = `<p>${cantidadCuotas} cuotas de $${valorCuotas.toFixed(2)} </p>`;
            break;
        case 12:
            valorCuotas = precio * 1.36 / cantidadCuotas;
            divValorCuotas.innerHTML = `<p>${cantidadCuotas} cuotas de $${valorCuotas.toFixed(2)} </p>`;
            break;
        default:
            break;
    }
}

//! VARIABLES GLOBALES

const formulario = document.getElementById("form");
const botonCotizar = document.getElementById("btn");
const infoCuotas = document.getElementById("valorCuotas");
const promocion = document.getElementById("promo");
const contenedorResultado = document.getElementById("contenedorResultado");
const contenedorCuotas = document.getElementsByClassName("oculto");
const botonCompra = document.getElementById("btn-compra");
const terminacionMueble = document.getElementById("terminacion");
const lineaMueble = document.getElementById("linea");
const largoMueble = document.getElementById("largo");
const nombreCotizador = document.getElementById("nombre-cotiz");
const apellidoCotizador = document.getElementById("apellido-cotiz");
const correoCotizador = document.getElementById("email-cotiz");
const celCotizador = document.getElementById("tel-cotiz");
const contenedorResumen = document.getElementById("contenedor-resumen");
const botonEnvio = document.getElementById('button');
let valorCuotas;
let cantidadCuotas;
let precioIncrementado;
let precioFinal;

//! OBJETOS (CLASE CONSTRUCTORA)

//CLASE PARA CREAR LOS MUEBLES BASE
class Mueble {
    constructor(linea, precio) {
        this.linea = linea;
        this.precio = precio;
    }
}

//CLASE PARA CREAR TERMINACIONES
class Terminacion {
    constructor(terminacion, precio) {
        this.terminacion = terminacion;
        this.precio = precio;
    }
}

//CLASE PARA CREAR EL MUEBLE COTIZADO CON LOS VALORES INGRESADOS POR EL USUARIO
class MuebleCotizado {
    constructor(linea, terminacion, largo, precio, cantidadCuotas, valorCuotas, nombre, apellido, correo, telefono) {
        this.linea = linea;
        this.terminacion = terminacion;
        this.largo = largo;
        this.precio = precio;
        this.cantidadCuotas = cantidadCuotas;
        this.valorCuotas = valorCuotas;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.telefono = telefono;
    }
}


//! CREACIÓN DE OBJETOS A TRAVÉS DE CLASE CONSTRUCTORA

const muebleVintage = new Mueble("vintage", 70000);
const muebleMinimal = new Mueble("minimal", 78000);
const mueblePremium = new Mueble("premium", 85000);

const melaminaColor = new Terminacion("melamina color", 3000);
const melaminaTexturada = new Terminacion("melamina texturada", 4500);
const rauvisio = new Terminacion("rauvisio", 14500);


//! ARRAYS

const mueblesCotizados = JSON.parse(localStorage.getItem("muebles")) || []; //(ARRAY VACÍO DONDE SE GUARDAN LOS DATOS DEL MUEBLE COTIZADO)
const colecciones = [muebleVintage, muebleMinimal, mueblePremium];
const terminaciones = [melaminaColor, melaminaTexturada, rauvisio];


//! EVENTOS

//COTIZADOR: CALCULA EL PRECIO DEL MUEBLE SEGÚN LÍNEA, LARGO Y TERMINACIÓN
botonCotizar.onclick = (e) => {
    e.preventDefault();
    let timerInterval
    //EMITE ALERTA DE 2 SEGUNDOS MIENTRAS CALCULA EL PRECIO
    Swal.fire({
        title: 'Cotizando...',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('Precio calculado')
        }
    })
    setTimeout(() => {
        terminacion = terminacionMueble.value;
        linea = lineaMueble.value;
        largo = largoMueble.value;
        calcularPrecioFinal(largo);
        contenedorResultado.innerHTML = `<p>Precio final: $${precioFinal.toFixed(2)} </p>`;
    }, 2000);

}

//MUESTRA AL USUARIO EL VALOR DE LAS CUOTAS DE FORMA DINÁMICA SEGÚN SU SELECCIÓN
selectorCuotas = document.getElementById("selectorCuotas");
selectorCuotas.onclick = () => {
    calcularCuotas(precioFinal);
}

//CONFIRMA LA COTIZACIÓN Y GENERA ARRAY CON LOS DATOS DEL MUEBLE Y FINANCIACION
botonCompra.onclick = (e) => {
    e.preventDefault();
    const nombre = nombreCotizador.value;
    const apellido = apellidoCotizador.value;
    const correo = correoCotizador.value;
    const telefono = celCotizador.value;
    const muebleCotizado = new MuebleCotizado(linea, terminacion, largo, precioFinal, cantidadCuotas, valorCuotas, nombre, apellido, correo, telefono);
    mueblesCotizados.push(muebleCotizado);
    console.log(mueblesCotizados);
    localStorage.setItem("muebles", JSON.stringify(mueblesCotizados));

    //SE GENERA DE FORMA DINÁMICA EL RESUMEN DE LA COTIZACIÓN
    contenedorResumen.innerHTML =
        `<div class="margenes">
        <h3>Resumen de tu cotización</h3>
        <p>Nombre: ${nombre}</p>
        <p>Apellido: ${apellido}</p>
        <p>Correo: ${correo}</p>
        <p>Teléfono de contacto: ${telefono}</p>
        <p>Mueble: Linea ${linea} | Terminación: ${terminacion}</p>
        <p>Precio: $${precioFinal} | Financiación: ${cantidadCuotas} pagos de $${valorCuotas.toFixed(2)}</p>
        </div>`;

    botonEnvio.classList.remove("oculto");
}

//ENVIO DE LOS DATOS DE LA COTIZACIÓN

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    //CAMBIO DEL TEXTO DEL BOTON
    botonEnvio.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_legno';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            //SI LA PROMESA SE RESUELVE, VUELVE A SU VALOR Y EMITE ALERTA DE CORREO ENVIADO
            botonEnvio.value = 'Enviar Cotización';
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cotización enviada!',
                text: 'Un asesor se comunicará a la brevedad para finalizar la compra',
                showConfirmButton: false,
                timer: 3000
            });
            console.log("Fin del proceso");
        }, (err) => {
            botonEnvio.value = 'Enviar Cotización';
            alert(JSON.stringify(err));
        });

    //SE USA PROMESA PARA OBTENER CADA COTIZACIÓN COMO UN OBJETO AL FINAL DEL PROCESO
    const Cotizacion = new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(mueblesCotizados)
        }, 1000)
    })
        .then((muebles) => {
            muebles.map(el => {
                console.log(el)
            })
        })
});
