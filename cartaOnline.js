//objetos
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
//arrays
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

//armar orden, esta clase son los item que se van sumando a la orden
class ItemPedido {
    constructor(queso, cantidad) {
        this.queso = queso;
        this.cantidad = cantidad;
    }
}
//array con los items de la orden
const itemsPedidos = [];

//agregar items a la orden (falta crear el html con este id!)
const contenedorOrden = document.querySelector('#contenedorOrden')


const ordenarItemsPedidos = () => {
    let renglonesOrden = '';

    itemsPedidos.forEach(
        (queso) => {
            renglonesOrden += `
            <tr>
                <td>${queso.nombre}</td>
                <td>${queso.cantidad}</td>
                <td>$ ${queso.precio}</td>
            </tr>
            `;
        }
    );
    contenedorOrden.innerHTML = renglonesOrden;
}

//ca este contenedor van a ir las cards de quesos
const grillaQuesos = document.getElementById('grillaQuesos')

//funcion para crear Cards para quesos
const crearCard = queso => {
    let botonAgregar = document.createElement('button');
    botonAgregar.className = 'button is-primary is-fullwidth';
    botonAgregar.innerText = 'Agregar';

    let cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';
    cardFooter.append(botonAgregar);

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

    //evento para agregar items a la orden
    botonAgregar.onclick = () => {
        let itemPedido = new ItemPedido(queso, 1);
        itemsPedidos.push(itemPedido);

        ordenarItemsPedidos();
    };
        
    return columnaCardQueso;
}

const ordenarGrillaQuesos = () => {
    quesos.forEach(
        (queso) => {
            let columnaCardQueso = crearCard(queso)
            grillaQuesos.append(columnaCardQueso);
        }
    );
}

//llamar funciones que crean elementos html
//falta crear orden
ordenarItemsPedidos();
ordenarGrillaQuesos();

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