/*
objetos y arrays
*/
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

class Vino {
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
  constructor(pedido, cantidad) {
    this.pedido = pedido;
    this.cantidad = cantidad;
  }
}

//creacion de objetos y arrays
let tabla1 = new Tabla('Tablita #1', 'Gouda, Camembert, Crottin', 1500, true)
let tabla2 = new Tabla('Tablita #2', 'Lincoln, Brie, Patagonzola', 2200, true)
let tabla3 = new Tabla('Tablita #3', 'Goya, Pecorino, Chevrotin', 2700, true)
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

let vino1 = new Vino('Zorzal', 'Pinot Noir', 'Zorzal', 650, true)
let vino2 = new Vino('A Lisa', 'Malbec', 'Noemia', 720, true)
let vino3 = new Vino('Nuna', 'Chardonnay', 'Nuna Wines', 570, false)
let vino4 = new Vino('Zaha', 'Marsanne', 'Teho', 700, true)
let vino5 = new Vino('Asa Nisi Masa', 'Malbec', 'Mundo al Reves', 720, true)
let vino6 = new Vino('Petite Fleur', 'Malbec', 'Monteviejo', 750, false)
let vino7 = new Vino('Castizo', 'Cabernet Franc', 'FOW', 650, true)
let vino8 = new Vino('Pinto Verdot', 'Petit Verdot', 'Pielihueso', 800, true)
let vino9 = new Vino('Demencial', 'Blanco de Corte', 'Finca Las Moras', 650, false)
const vinos = []
vinos.push(vino1, vino2, vino3, vino4, vino5, vino6, vino7, vino8, vino9)

//array con los items de la orden
const itemsPedidos = [];

//creo el objeto degus para despues agregarlo a la orden como extra
const degus = {
  nombre: 'Degustacion de Vinos',
  precio: '800'
};

/*
Manipoulacion del html segun objetos
*/
//funcion para crear el boton segun disponibilidad
const crearBotonDeItem = (disponibilidad) => {

  let botonAgregar = document.createElement('button');
  botonAgregar.className = 'button is-primary is-fullwidth';
  botonAgregar.innerText = 'Agregar';

  let botonNoDisponible = document.createElement('button');
  botonNoDisponible.className = 'button is-light is-fullwidth';
  botonNoDisponible.title = 'Disabled button';
  botonNoDisponible.disabled = true;
  botonNoDisponible.innerText = 'No Disponible';

  if (disponibilidad == true) {
    boton = botonAgregar
  } else {
    boton = botonNoDisponible
  };
  return boton
};

let botonDeItem = crearBotonDeItem();

//funciones para crear cards, REVISAR COMO ACHICAR ESTO, NO ME SALIO, AMPLIAREMOS
//funcion para crear Cards para quesos
const crearCardQueso = queso => {

  let botonDeItem = crearBotonDeItem(queso.disponibilidad);

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

//funcion para vinos
const crearCardVino = vino => {

  let botonDeItem = crearBotonDeItem(vino.disponibilidad);

  let cardFooter = document.createElement('div');
  cardFooter.className = 'card-footer';
  cardFooter.append(botonDeItem);

  let cardContent = document.createElement('div');
  cardContent.className = 'card-content';
  cardContent.innerHTML = `
          <h3 class="title is-4">${vino.nombre}</h3>
          <p>${vino.cepa}</p>
          <p>${vino.bodega}</p>
          <p>$ ${vino.precio}</p>
  `;

  let cardVino = document.createElement('div');
  cardVino.className = 'card';
  cardVino.append(cardContent);
  cardVino.append(cardFooter);

  let columnaCardVino = document.createElement('div');
  columnaCardVino.className = 'column is-one-third';
  columnaCardVino.append(cardVino);

  //evento para agregar vinos a la orden
  botonDeItem.onclick = () => {
    let itemPedido = new ItemPedido(vino, 1);
    itemsPedidos.push(itemPedido);

    ordenarItemsPedidos();
  };

  return columnaCardVino;

};

//funcion para tablas
const crearCardTabla = tabla => {

  let botonDeItem = crearBotonDeItem(tabla.disponibilidad);

  let cardFooter = document.createElement('div');
  cardFooter.className = 'card-footer';
  cardFooter.append(botonDeItem);

  let cardContent = document.createElement('div');
  cardContent.className = 'card-content';
  cardContent.innerHTML = `
          <h3 class="title is-4">${tabla.nombre}</h3>
          <p>${tabla.detalle}</p>
          <p>$ ${tabla.precio}</p>
          <div class="content mt-3 has-text-weight-semibold">
          <label class="checkbox">
          <input type="checkbox" id="sumarDegus"> Sumar degustacion de vinos ($ 800)
          </label>
          </div>
          `;

  let cardTabla = document.createElement('div');
  cardTabla.className = 'card';
  cardTabla.append(cardContent);
  cardTabla.append(cardFooter);

  let columnaCardTabla = document.createElement('div');
  columnaCardTabla.className = 'column is-one-third';
  columnaCardTabla.append(cardTabla);

  //evento que hace que se sume la degustacion a la orden, NO ANDA NO ANDA NO ANDA
  /*const sumarDegus = document.getElementById('sumarDegus')
  sumarDegus.addEventListener('change', () => {
    let itemPedido = new ItemPedido(degus, 1);
    itemsPedidos.push(itemPedido);
  })*/

  //evento para agregar tablas a la orden
  botonDeItem.onclick = () => {
    let itemPedido = new ItemPedido(tabla, 1);
    itemsPedidos.push(itemPedido);

    ordenarItemsPedidos();
  };

  return columnaCardTabla

};

//orden de elementos en html
//llamado al elemento html donde van las grillas
const grillaQuesos = document.getElementById('grillaQuesos')
const grillaVinos = document.getElementById('grillaVinos')
const listaTablas = document.getElementById('listaTablas')

//funciones son las rtes iguales, no se como simplicar KMN
//funcion que ordena la grilla de quesos
const ordenarGrillaQuesos = () => {
  quesos.forEach(
    (queso) => {
      let columnaCard = crearCardQueso(queso)
      grillaQuesos.append(columnaCard);
    }
  );
}
ordenarGrillaQuesos();

//funcion para ordenar grilla vinos
const ordenarGrillaVinos = () => {
  vinos.forEach(
    (vino) => {
      let columnaCard = crearCardVino(vino)
      grillaVinos.append(columnaCard)
    }
  );
}
ordenarGrillaVinos();

//funcion para ordenar lista de tablitas
const ordenarListaTablas = () => {
  tablas.forEach(
    (tabla) => {
      let columnaCardTabla = crearCardTabla(tabla)
      listaTablas.append(columnaCardTabla)
    }
  )
}
ordenarListaTablas();

//orden
//llamado al contenedor de la orden
const cuerpoTablaOrden = document.querySelector('#cuerpoTablaOrden')
const footTablaOrden = document.querySelector('#footTablaOrden')

//funcion que ordena el contenido de la orden
const ordenarItemsPedidos = () => {
  let sumaOrden = 0;
  let renglonesOrden = '';

  itemsPedidos.forEach(
    (item) => {
      renglonesOrden += `
            <tr>
            <td>${item.cantidad}</td>
            <td>${item.pedido.nombre}</td>
            <td>$ ${item.pedido.precio}</td>
            <td><button class="delete" id="borrarItem${item.pedido.nombre}"></button>
            </tr>
            `;
      cuerpoTablaOrden.innerHTML = renglonesOrden;

      let borrarItem = document.getElementById(`borrarItem${item.pedido.nombre}`);
      borrarItem.addEventListener('click', (e) => {
        removerItemPedido(item);
        ordenarItemsPedidos();
      });

      sumaOrden += item.cantidad * item.pedido.precio;
      footTablaOrden.innerText = `Total: $ ${sumaOrden}`
    }
  );
};
//funcion para borrar items de la orden NO ANDA, REVISAR, NO ENCUENTRO EL DESGRACIADO ERROR DE REFERENCIA =(
const removerItemPedido = (itemAEliminar) => {
  const itemsAMantener = itemsPedidos.filter((item) => itemAEliminar.item.nombre != item.pedido.nombre);
  itemsPedidos.length = 0;

  itemsAMantener.forEach((item) => itemsPedidos.push(item))
}

ordenarItemsPedidos();

/*
ME FALTA:
ARREGLAR LO QUE NO ANDA
ESTILOS, COLORES, IMAGENES
CREAR SECCION PARA DESABILITAR OPCIONES: METODO .DEHABILITAR Y MODAL O PANEL DE CONTROL
*/

/*
CODIGO DE BULMA, eventos para abrir y cerrar modal
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
  (document.querySelectorAll('.botonModalOrden') || []).forEach(($trigger) => {
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
});