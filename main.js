
//! VARIABLES GLOBALES

const IVA = 0.21;
let valorCuotas;
let cantidadCuotas;


//! OBJETOS (CLASE CONSTRUCTORA - MÉTODOS)

class Mueble {
    constructor (linea, precio, largo, precioFinal){
        this.linea = linea;
        this.precio = precio;
        this.largo = largo;
        this.precioFinal = precioFinal;
    }
    cotizarMueble (){
        this.largo = parseFloat(prompt ("Ingrese el largo del mueble (entre 1m y 8m):"));
        while ((this.largo < 1) || (this.largo > 8)){
            alert ("Ingrese una medida válida (máximo: 8m)");
            this.largo = parseFloat(prompt ("Ingrese e el largo del mueble:"));
        }
        if ((this.largo >= 1) && (this.largo <= 8)) {
            this.precioFinal = this.largo * (this.precio + (this.precio * IVA));
        }
        alert (`El precio del mueble es $${this.precioFinal}`);
        return this.precioFinal;
    }
    calcularCuotas(precio){
        cantidadCuotas = parseInt(prompt ("Seleccione la cantidad de cuotas (1-3-6-12):"));
        while ((cantidadCuotas !== 1) && (cantidadCuotas !==3) && (cantidadCuotas !==6) && (cantidadCuotas !== 12)){
            alert (`Ingrese un número de cuotas válido`);
            cantidadCuotas = parseInt(prompt ("Seleccione la cantidad de cuotas (1-3-6-12):"));
        }
        switch (cantidadCuotas){
            case 1: 
                valorCuotas = precio / cantidadCuotas;
                alert (`El precio en un pago es de $${valorCuotas}`);
                break;
            case 3: 
                valorCuotas = precio / cantidadCuotas;
                alert (`Son 3 cuotas de $${valorCuotas.toFixed(2)}`);
                break;
            case 6:
                valorCuotas = precio / cantidadCuotas;
                alert (`Son 6 cuotas de $${valorCuotas.toFixed(2)}`);
                break;
            case 12:
                valorCuotas = precio / cantidadCuotas;
                alert (`Son 12 cuotas de $${valorCuotas.toFixed(2)}`);
                break;
            default:
                alert (`Ingrese un número de cuotas válido`);
                break;
        }
    }
}

//! CREACIÓN DE OBJETOS A TRAVÉS DE CLASE CONSTRUCTORA

const muebleVintage = new Mueble ("vintage", 70000, 0, 0);
const muebleMinimal = new Mueble ("minimal", 78000, 0, 0);
const mueblePremium = new Mueble ("premium", 85000, 0, 0);


//! ARRAYS (ARRAY VACÍO DONDE SE GUARDAN LOS DATOS DEL MUEBLE COMPRADO)

let muebleComprado = [];


//! FUNCIÓN PARA CALCULAR DESCUENTO (INCORPORACIÓN DE FUNCIONES DE ORDEN SUPERIOR EN ARRAY)
/* LA FUNCIÓN VERIFICA SI EL USUARIO DESEA PAGAR EN UNA CUOTA, Y SI LO ELIGIÓ LE OFRECE UN DESCUENTO POR PAGO EN EFECTIVO */

function descuento(precioFinal) {
    let pagoContado = muebleComprado.some(el => el == 1);
    if (pagoContado == true){
        let precioConDescuento = precioFinal * 0.9;
        alert (`Pagando en efectivo en nuestro showroom accedes a un 10% OFF! El precio con descuento es $${precioConDescuento}`)
    return muebleComprado.push (precioConDescuento);
    }
}


//! INICIO DE INTERACCIÓN CON EL USUARIO

let lineaMueble = prompt ("Ingrese la línea deseada (Vintage/Minimal/Premium):").toLowerCase();
while ((lineaMueble !== "vintage") && (lineaMueble !== "minimal") && (lineaMueble !== "premium")){
    alert ("Ingrese una línea válida");
    lineaMueble = prompt ("Ingrese la línea deseada (Vintage/Minimal/Premium):").toLowerCase();
}
switch (lineaMueble){
    case "vintage":
        muebleVintage.cotizarMueble();
        muebleVintage.calcularCuotas(muebleVintage.precioFinal);
        muebleComprado.push(muebleVintage, cantidadCuotas, valorCuotas.toFixed(2));
        descuento(muebleVintage.precioFinal);
        console.log(muebleComprado);
        break;
    case "minimal":
        muebleMinimal.cotizarMueble();
        muebleMinimal.calcularCuotas(muebleMinimal.precioFinal);
        muebleComprado.push(muebleMinimal, cantidadCuotas, valorCuotas.toFixed(2));
        descuento(muebleMinimal.precioFinal);
        console.log(muebleComprado);
        break;
    case "premium":
        mueblePremium.cotizarMueble();
        mueblePremium.calcularCuotas(mueblePremium.precioFinal);
        muebleComprado.push(mueblePremium, cantidadCuotas, valorCuotas.toFixed(2));
        descuento(mueblePremium.precioFinal);
        console.log(muebleComprado);
        break;
    default:
        alert ("Ingrese una línea válida");
        break;
}