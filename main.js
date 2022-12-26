
//! FUNCIONES

const incrementoTerminacion = (linea) =>{
    switch (terminacion){
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

const calcularPrecioFinal = (largo) => {
    switch (linea){
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

const calcularCuotas = (precio) =>{
    cantidadCuotas = parseInt(document.getElementById("selectorCuotas").value);
    divValorCuotas = document.getElementById ("valorCuotas");
    switch (cantidadCuotas){
        case 1: 
            valorCuotas = precio / cantidadCuotas;
            divValorCuotas.innerHTML = `<p>${cantidadCuotas} cuota de $${valorCuotas} </p>`;
            promocion.innerHTML = `<p>Pagando en efectivo en nuestro Showroom accedes a un 10% OFF! (Precio final $${valorCuotas*0.9}) </p>`;
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

const formulario = document.getElementById("formulario");
const botonCotizar = document.getElementById("btn");
const infoCuotas = document.getElementById("valorCuotas");
const promocion = document.getElementById("promo");
const contenedorResultado = document.getElementById ("contenedorResultado");
const contenedorCuotas = document.getElementsByClassName ("oculto");
const botonCompra = document.getElementById("btn-compra");
const terminacionMueble = document.getElementById("terminacion");
const lineaMueble = document.getElementById("linea");
const largoMueble = document.getElementById("largo");
let valorCuotas;
let cantidadCuotas;
let precioIncrementado;
let precioFinal;

//! OBJETOS (CLASE CONSTRUCTORA)

class Mueble {
    constructor (linea, precio){
        this.linea = linea;
        this.precio = precio;
    }
}

class Terminacion {
    constructor (terminacion, precio){
        this.terminacion = terminacion;
        this.precio = precio;
    }
}

class MuebleCotizado {
    constructor (linea, terminacion, largo, precio, cantidadCuotas, valorCuotas){
        this.linea = linea;
        this.terminacion = terminacion;
        this.largo = largo;
        this.precio = precio;
        this.cantidadCuotas = cantidadCuotas;
        this.valorCuotas = valorCuotas;
    }
}


//! CREACIÓN DE OBJETOS A TRAVÉS DE CLASE CONSTRUCTORA

const muebleVintage = new Mueble ("vintage", 70000);
const muebleMinimal = new Mueble ("minimal", 78000);
const mueblePremium = new Mueble ("premium", 85000);

const melaminaColor = new Terminacion ("melamina color", 3000);
const melaminaTexturada = new Terminacion ("melamina texturada", 3000);
const rauvisio = new Terminacion ("rauvisio", 14500);


//! ARRAYS

const mueblesComprados = JSON.parse(localStorage.getItem("muebles")) || []; //(ARRAY VACÍO DONDE SE GUARDAN LOS DATOS DEL MUEBLE COMPRADO)
const colecciones = [muebleVintage, muebleMinimal, mueblePremium];
const terminaciones = [melaminaColor, melaminaTexturada, rauvisio];


//! EVENTOS

botonCotizar.onclick = (e) => {
    e.preventDefault();
    terminacion = terminacionMueble.value;
    linea = lineaMueble.value;
    largo = largoMueble.value;
    calcularPrecioFinal(largo);
    contenedorResultado.innerHTML = `<p>Precio final: $${precioFinal} </p>`;
}

selectorCuotas = document.getElementById("selectorCuotas");
selectorCuotas.onclick = () =>{
    calcularCuotas(precioFinal);
}

botonCompra.onclick = (e) => {   
    e.preventDefault();
    const muebleCotizado = new MuebleCotizado (linea, terminacion, largo, precioFinal, cantidadCuotas, valorCuotas);
    mueblesComprados.push(muebleCotizado);
    console.log (mueblesComprados);
    localStorage.setItem("muebles", JSON.stringify(mueblesComprados));
}