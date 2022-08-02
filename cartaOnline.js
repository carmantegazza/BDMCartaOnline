console.log('Simulador de: toma de pedidos para stand/foodtruck de bar')

const totalOrden = (degus, vinos) => {
    switch (degus) {
        case '1':
            totalParcial = 1500
            break
        case '2':
            totalParcial = 2200
            break
        case '3':
            totalParcial = 2700
            break
        default:
            alert('Opcion no valida')
            break
    }
    if (vinos == 0) {
        totalVinos = 0
    } else if (vinos == 1) {
        totalVinos = 800
    } else {
        alert('Opcion no valida')
    }
    return totalParcial + totalVinos
};

const totalEft = (miOrden) => miOrden * 0.9;


for (let i = 1; i < 6; i++) {
    alert('Bienvenido a Bar du Marche! \nPodes realizar tu pedido, y aguardar a que te llamemos para retirarlo');
    let nombre = prompt('Cual es tu nombre?');
    let miOrden = totalOrden(prompt('Ingresá el número de tabla elegida'), parseInt(prompt('Querés agregar la degustación de vinos? 1 para si, 0 para no')));
    let miOrdenEft = totalEft(miOrden);
    let demora = i * 3;
    alert(`Muchas gracias, ${nombre}. 
    Tu orden es la # ${i} El total es de $ ${miOrden} 
    En efectivo tenes 10% de descuento, seria $ ${miOrdenEft}
    La demora aproximada es de ${demora} minutos`);
};