let miOrden = "";
let itemPedido = parseInt(prompt("Ingresá el numero de tabla que querés pedir"));
while (itemPedido < 4) {
    let itemAgregar = prompt("Querés agregar la degustación de vinos? 1 para si, 0 para no");
    miOrden = itemPedido + itemAgregar;
    break
}
let miNombre = prompt("Cual es tu nombre?")
let miOrdenDetalle = "";
switch (miOrden) {
    case "10":
        miOrdenDetalle = "Tabla #1 sin degustación de vinos";
        miTotal = 1500
        break
    case "20":
        miOrdenDetalle = "Tabla #2 sin degustación de vinos";
        miTotal = 2200
        break
    case "30":
        miOrdenDetalle = "Tabla #3 sin degustación de vinos";
        miTotal = 2700
        break
    case "11":
        miOrdenDetalle = "Tabla #1 con degustación de vinos";
        miTotal = 2300
        break
    case "21":
        miOrdenDetalle = "Tabla #2 con degustación de vinos";
        miTotal = 3000
        break
    case "31":
        miOrdenDetalle = "Tabla #3 con degustación de vinos";
        miTotal = 3500
        break
    default:
        break
}
alert("Gracias, " + miNombre + "\n Tu orden es " + miOrdenDetalle + "\n El total es $" + miTotal);