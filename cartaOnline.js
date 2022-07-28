let pesos = "$"
let miOrden = "";
let miTotal = "";

let itemPedido = prompt("Ingresa el numero de flight elegido")
while (itemPedido != "0") {
    let itemAgrega = prompt("Queres agregar la degustacion de quesos de " + itemPedido + " ? Ingresa 1 para si, 0 para no")
    switch (itemAgrega) {
        case "1":
            miOrden = miOrden + itemPedido + itemAgrega;
            alert("Orden de flight " + itemPedido + "con degustacion de quesos");
            break
        case "2":
            alert("Orden de flight " + itemPedido + "sin degustacion de quesos");
            break
    }
    break
    miOrden = itemPedido + itemAgrega;
}

let miNombre = prompt("Tu nombre?")
alert("Gracias " + miNombre + "! Tu orden es " + miOrden + "\n El total es $ " + miTotal)