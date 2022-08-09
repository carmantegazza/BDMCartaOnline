class Tabla {
    constructor(nombre, detalle, precio, disponibilidad) {
        this.nombre = nombre
        this.detalle = detalle
        this.precio = precio
        this.disponibilidad = disponibilidad
    }
}

class Queso {
    constructor(nombre, leche, origen, precio, disponibilidad) {
        this.nombre = nombre
        this.leche = leche
        this.origen = origen
        this.precio = precio
        this.disponibilidad = disponibilidad
    }
}

let tabla1 = new Tabla(1, 'Gouda, Camembert, Crottin', 1500, true)
let tabla2 = new Tabla(2, 'Lincoln, Brie, Patagonzola', 2200, true)
let tabla3 = new Tabla(3, 'Goya, Pecorino, Chevrotin', 2700, true)

const tablas = []
tablas.push(tabla1, tabla2, tabla3)

let queso1 = new Queso('Gouda', 'Vaca', 'Buenos Aires', 500, true)
let queso2 = new Queso('Camembert', 'Vaca', 'Cordoba', 580, true)
let queso3 = new Queso('Crottin', 'Cabra', 'Buenos Aires', 630, true)
let queso4 = new Queso('Lincoln', 'Vaca', 'San Luis', 690, true)
let queso5 = new Queso('Patagonzola', 'Oveja', 'Neuquen', 900, true)
let queso6 = new Queso('Brie', 'Vaca', 'Buenos Aires', 750, true)
let queso7 = new Queso('Goya', 'Vaca', 'Buenos Aires', 750, true)
let queso8 = new Queso('Pecorino', 'Oveja', 'San Luis', 1200, true)
let queso9 = new Queso('Chevrotin', 'Cabra', 'Buenos Aires', 1080, true)

const quesos = []
quesos.push(queso1, queso2, queso3, queso4, queso5, queso6, queso7, queso8, queso9)

const totalOrdenTabla = (degus, vinos) => {
    let tablaElegida = tablas.find(tabla => tabla.numero == degus.Number)
    let totalParcial = tablaElegida.precio
    if (vinos == 0) {
        totalVinos = 0
    } else if (vinos == 1) {
        totalVinos = 800
    } else {
        alert('Opcion no valida')
    }
    return totalParcial + totalVinos
};

const totalQueso = (nombre) => {
    let quesoElegido = quesos.find(queso => queso.nombre.toUpperCase() == nombre.toUpperCase())
    if (quesoElegido == undefined) {
        alert('No es valido')
    } else {
        let precioQueso = quesoElegido.precio
        return precioQueso
    }
}

console.log('Simulador de: toma de pedidos para stand/foodtruck de bar')
console.table(tablas)
console.table(quesos['nombre', 'precio'])

for (let i = 1; i < 1; i++) {
    alert('Bienvenido a Bar du Marche! \nPodes realizar tu pedido, y aguardar a que te llamemos para retirarlo');
    let demora = i * 3;
    let nombre = prompt('Cual es tu nombre?');
    let ordenTabla = confirm('Queres pedir una de nuestras tablas de quesos? Apreta "cancelar" si solo queres elegir una porcion')
    if (ordenTabla == true) {
        let miOrdenTabla = totalOrdenTabla(prompt('Ingresá el número de tabla elegida'), parseInt(prompt('Querés agregar la degustación de vinos? 1 para si, 0 para no')));
        alert(`Muchas gracias, ${nombre}. 
        Tu orden es la # ${i} El total es de $ ${miOrdenTabla} 
        La demora aproximada es de ${demora} minutos`);
    } else {
        let miOrdenQueso = totalQueso(prompt('Ingresa el nombre del queso elegido'))
        while (miOrdenQueso != undefined) {
            alert(`Muchas gracias, ${nombre}.    
                Tu orden es la # ${i} El total es de $ ${miOrdenQueso} 
                La demora aproximada es de ${demora} minutos`);
                break
        }
    }
};