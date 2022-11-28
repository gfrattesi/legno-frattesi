
//! FUNCION PARA CALCULAR PRECIO DEL MUEBLE

function calcularPrecio (largo, valor){
    return largo * (valor + (valor * IVA))
}

//! FUNCION PARA CALCULAR CUOTAS
function cuotas (precio){
    const cantidadCuotas = parseInt(prompt ("Seleccione la cantidad de cuotas (1-3-6-12):"));
    switch (cantidadCuotas){
        case 1: 
            valorCuotas = precio / cantidadCuotas;
            alert (`Es 1 cuota de $${valorCuotas}`);
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
            alert (`Ingrese un número válido`);
    }
}

//! VARIABLES GLOBALES

let valorMetroVintage = 10000;
let valorMetroMinimal = 12000;
let valorMetroPremium = 15000;
const IVA = 0.21;
let precioVintage;
let precioMinimal;
let precioPremium;
let valorCuotas;

//! INICIO DE INTERACCIÓN CON EL USUARIO

let largoMueble = parseFloat(prompt ("Ingrese el largo del mueble (entre 1m y 8m):"));

while ((largoMueble < 1) || (largoMueble > 8)){
    alert ("Ingrese una medida válida (máximo: 8m)");
    largoMueble = parseFloat(prompt ("Ingrese e el largo del mueble:"));
}

if ((largoMueble >= 1) && (largoMueble <= 8)) {
    let lineaMueble = prompt ("Ingrese la línea deseada (Vintage/Minimal/Premium):").toLowerCase();
    switch (lineaMueble){
        case "vintage":
            precioVintage = calcularPrecio (largoMueble, valorMetroVintage);
            alert(`El precio del mueble es $${precioVintage}`);
            cuotas (precioVintage);
            break;
        case "minimal":
            precioMinimal = calcularPrecio (largoMueble, valorMetroMinimal);
            alert(`El precio del mueble es $${precioMinimal}`);
            cuotas (precioMinimal);
            break;
        case "premium":
            precioPremium = calcularPrecio (largoMueble, valorMetroPremium);
            alert(`El precio del mueble es $${precioPremium}`);
            cuotas (precioPremium);
            break;
        default:
            alert("Ingrese una línea válida");
    }
}