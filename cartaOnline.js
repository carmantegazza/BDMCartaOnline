//clases para objetos
class Tabla {
  constructor(nombre, detalle, precio, disponibilidad) {
    this.nombre = nombre
    this.detalle = detalle
    this.precio = precio
    this.disponibilidad = disponibilidad
  }
};

class Queso {
  constructor(nombre, leche, origen, precio, disponibilidad) {
    this.nombre = nombre
    this.leche = leche
    this.origen = origen
    this.precio = precio
    this.disponibilidad = disponibilidad
  }
};

class Vinos {
  constructor(nombre, cepa, bodega, precio, disponibilidad) {
    this.nombre = nombre
    this.cepa = cepa
    this.bodega = bodega
    this.precio = precio
    this.disponibilidad = disponibilidad
  }
}

//clase para item de la orden
class ItemPedido {
  constructor(queso, cantidad) {
    this.queso = queso;
    this.cantidad = cantidad;
  }
}

//creacion de objetos y arrays
let tabla1 = new Tabla(1, 'Gouda, Camembert, Crottin', 1500, true)
let tabla2 = new Tabla(2, 'Lincoln, Brie, Patagonzola', 2200, true)
let tabla3 = new Tabla(3, 'Goya, Pecorino, Chevrotin', 2700, true)
const tablas = []
tablas.push(tabla1, tabla2, tabla3)

let queso1 = new Queso('Gouda', 'Vaca', 'Buenos Aires', 500, true)
let queso2 = new Queso('Camembert', 'Vaca', 'Cordoba', 580, true)
let queso3 = new Queso('Crottin', 'Cabra', 'Buenos Aires', 630, true)
let queso4 = new Queso('Lincoln', 'Vaca', 'San Luis', 690, true)
let queso5 = new Queso('Patagonzola', 'Oveja', 'Neuquen', 900, false)
let queso6 = new Queso('Brie', 'Vaca', 'Buenos Aires', 750, true)
let queso7 = new Queso('Goya', 'Vaca', 'Buenos Aires', 750, true)
let queso8 = new Queso('Pecorino', 'Oveja', 'San Luis', 1200, false)
let queso9 = new Queso('Chevrotin', 'Cabra', 'Buenos Aires', 1080, true)
const quesos = []
quesos.push(queso1, queso2, queso3, queso4, queso5, queso6, queso7, queso8, queso9)

let vino1 = new Vino('Zorzal', 'Pinot Noir', 'Zorzal', 240, true)
let vino2 = new Vino('A Lisa', 'Malbec', 'Noemia', 330, true)
let vino3 = new Vino('Nuna', 'Chardonnay', 'Nuna Wines', 270, false)
const vinos = []
vinos.push(vino1, vino2, vino3)

//array con los items de la orden
const itemsPedidos = [];

/*
Manipoulacion del html segun objetos
*/
//llamado al elemento html donde va la grilla de quesos
const grillaQuesos = document.getElementById('grillaQuesos')

//funcion para crear Cards para quesos
const crearCard = queso => {

  //funcion para crear el boton segun disponibilidad
  const crearBotonDeItem = () => {

    let botonAgregar = document.createElement('button');
    botonAgregar.className = 'button is-primary is-fullwidth';
    botonAgregar.innerText = 'Agregar';

    let botonNoDisponible = document.createElement('button');
    botonNoDisponible.className = 'button is-primary is-fullwidth';
    botonNoDisponible.title = 'Disabled button';
    botonNoDisponible.disabled = true;
    botonNoDisponible.innerText = 'No Disponible';

    if (queso.disponibilidad == true) {
      boton = botonAgregar
    } else {
      boton = botonNoDisponible
    };
    return boton
  };

  let botonDeItem = crearBotonDeItem();

  let cardFooter = document.createElement('div');
  cardFooter.className = 'card-footer';
  cardFooter.append(botonDeItem);

  let cardContent = document.createElement('div');
  cardContent.className = 'card-content';
  cardContent.innerHTML = `
        <h3 class="title is-4">${queso.nombre}</h3>
        <p>${queso.leche}</p>
        <p>${queso.origen}</p>
        <p>$ ${queso.precio}</p>
        `;

  let cardQueso = document.createElement('div');
  cardQueso.className = 'card';
  cardQueso.append(cardContent);
  cardQueso.append(cardFooter);

  let columnaCardQueso = document.createElement('div');
  columnaCardQueso.className = 'column is-one-third';
  columnaCardQueso.append(cardQueso);

  //evento para agregar quesos a la orden
  botonDeItem.onclick = () => {
    let itemPedido = new ItemPedido(queso, 1);
    itemsPedidos.push(itemPedido);

    ordenarItemsPedidos();
  };

  return columnaCardQueso;
}

//funcion que ordena la grilla de quesos
const ordenarGrillaQuesos = () => {
  quesos.forEach(
    (queso) => {
      let columnaCardQueso = crearCard(queso)
      grillaQuesos.append(columnaCardQueso);
    }
  );
}
ordenarGrillaQuesos();

//orden
//llamado al contenedor de la orden
const contenedorOrden = document.querySelector('#contenedorOrden')

//funcion que ordena el contenido de la orden
const ordenarItemsPedidos = () => {
  let renglonesOrden = '';

  itemsPedidos.forEach(
    (item) => {
      renglonesOrden += `
            <tr>
            <td>${item.cantidad}</td>
                <td>${item.queso.nombre}</td>
                <td>$ ${item.queso.precio}</td>
            </tr>
            `;
    }
  );
  contenedorOrden.innerHTML = renglonesOrden;
}
ordenarItemsPedidos();

/*
CODIGO DE BULMA, REVISAR
*/

/*
HACER TABLA DE ORDEN EN CONTENEDORORDEN
HACER GRILLA TABLA Y VINOS, CREAR/MEJORAR CARDS
ESTILOS, CAMBIAR PRIMARY, BACKGROUND IMAGE, TIPOGRAFIA

CREAR MODAL PARA DESABILITAR OPCIONES
*/

//codigo para el modal sacado de Bulma, leer y cambiar segun necesidad
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});