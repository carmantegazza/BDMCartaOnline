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
  deshabilitar() {
    if (this.disponibilidad == true) {
      this.disponibilidad = false
    } else {}
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
  deshabilitar() {
    if (this.disponibilidad == true) {
      this.disponibilidad = false
    } else {}
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
  deshabilitar() {
    if (this.disponibilidad == true) {
      this.disponibilidad = false
    } else {}
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
let queso5 = new Queso('Patagonzola', 'Oveja', 'Neuquen', 900, true)
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

  //(ACA PODRIA IR TERNARIO?)
  if (disponibilidad == true) {
    boton = botonAgregar
  } else {
    boton = botonNoDisponible
  };
  return boton
};
let botonDeItem = crearBotonDeItem();

//funciones para crear cards, REVISAR COMO ACHICAR ESTO, tengo uno que no funciona en drafts
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
};

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
//checkbox para agregar degustacion, no anda revisar el evento
let checkboxDegus = document.getElementById('sumarDegus')

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

  //evento para agregar tablas a la orden
  botonDeItem.onclick = () => {
    let itemPedido = new ItemPedido(tabla, 1);
    itemsPedidos.push(itemPedido);

    ordenarItemsPedidos();
  };
  return columnaCardTabla
};

//ordenar elementos en html
//llamado al elemento html donde van las grillas
const listaTablas = document.getElementById('listaTablas')
const grillaQuesos = document.getElementById('grillaQuesos')
const grillaVinos = document.getElementById('grillaVinos')

//funciones para las grillas, son iguales, no se como simplicar KMN
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

//modal de orden
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
            <td><button class="delete" type="button" id="borrarItem${item.pedido.nombre}"></button></td>
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

//funcion para borrar items de la orden ANDA RARO, NO ENCUENTRO EL ERROR
const removerItemPedido = (itemAEliminar) => {
  const itemsAMantener = itemsPedidos.filter((item) => itemAEliminar.pedido.nombre != item.pedido.nombre);
  itemsPedidos.length = 0;

  itemsAMantener.forEach((item) => itemsPedidos.push(item))
}
ordenarItemsPedidos();

/*
MODAL DE ACCESO PERSONAL, lo que deberia hacer es:
habilitarse el boton que dispara el modal con una clave (x)
en el modal navegar las tabs de listas de items (x)
boton para cambiar dispnibilidad de item (x)
*/

//llamado a elementos del panel donde van el input y las listas,
let claveAcceso = document.getElementById('claveAcceso');
let listaAccesoTablas = document.getElementById('listaAccesoTablas');
let listaAccesoQuesos = document.getElementById('listaAccesoQuesos');
let listaAccesoVinos = document.getElementById('listaAccesoVinos');

//INPUT


//PRUEBA DE BOTON PARA CAMBIAR DISPONIBILIDAD, NO ANDA lo dejo comentado para seguir
//funciones para clase (color) y texot de boton de disponbilidad (ACA PODRIA IR TERNARIO?)
const botonDisponibilidadClase = disponibilidad => {
  if (disponibilidad == true) {
    claseBoton = 'is-success'
  } else {
    claseBoton = 'is-primary'
  }
  return claseBoton
}
let claseBotonDisponibilidad = botonDisponibilidadClase();

const botonDisponibilidadTexto = disponibilidad => {
  if (disponibilidad == true) {
    textoBoton = 'Disponible'
  } else {
    textoBoton = 'No Disponible'
  }
  return textoBoton
}
let textoBotonDisponibilidad = botonDisponibilidadTexto();

//funcion para crear el contenido de las tabs, las tabs que no andan LOL
const listarItems = (arrayItems) => {
  let renglonesLista = '';

  arrayItems.forEach(
    (item) => {
      let claseBotonDisponibilidad = botonDisponibilidadClase(item.disponibilidad);
      let textoBotonDisponibilidad = botonDisponibilidadTexto(item.disponibilidad);
      renglonesLista += `
            <tr>
            <td>${item.nombre}</td>
            <td>
            <button class="button ${claseBotonDisponibilidad}" type="button" id="deshabilitarItem${item.nombre}">${textoBotonDisponibilidad}</button>
            </td>
            </tr>
            `;

      //ESTO NO ANDA, INTENTO MAÑANA
      /*let deshabilitarItem = document.getElementById(`deshabilitarItem${item.nombre}`);
      deshabilitarItem.addEventListener('click', (e) => {
        deshabilitarFuncion(item);
      });*/
    }

  );
  return renglonesLista
};

//funcion para deshabilitar items 
const deshabilitarFuncion = item => {
  item.deshabilitar()
}

//guardo los resultados de las funciones para cada array
renglonesListaTablas = listarItems(tablas);
renglonesListaQuesos = listarItems(quesos);
renglonesListaVinos = listarItems(vinos);

//inyecto la lista en el html
listaAccesoAll.innerHTML = renglonesListaTablas + renglonesListaQuesos + renglonesListaVinos;
listaAccesoTablas.innerHTML = renglonesListaTablas;
listaAccesoQuesos.innerHTML = renglonesListaQuesos;
listaAccesoVinos.innerHTML = renglonesListaVinos;

//FUNCIONAMIENTO DE TABS, QUE NO FUNCIONAN
//evento para que se activen las tabs (intento n3)
const padreTabs = document.querySelector('#tabsDisponibilidad');
const tablinks = document.querySelectorAll('.tablinks');
const contenidoTabs = document.querySelectorAll('.contenidoTabs');

padreTabs.onclick = e => {
  const id = e.target.dataset.id;
  if (id) {
    tablinks.forEach(a => {
      a.classList.remove('is-active');
    });
    e.target.classList.add('is-active');

    contenidoTabs.forEach(block => {
      block.classList.remove('active');
    });

    const element = document.getElementById(id);
    element.classList.add('active');
  }
}

/*
ME FALTA:
ARREGLAR LO QUE NO ANDA
HACER QUE FUNCIONEN LAS TABS, AAARAGGGGGSGSG
*/

/*
CODIGO COPIADO DE BULMA, eventos para abrir y cerrar modal, agrego mis otros modales
*/

//codigo para el modal sacado de Bulma, leer y cambiar segun necesidad
document.addEventListener('DOMContentLoaded', () => {
  // funciones que abren y cierran modales
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

  // evento para que el boton dispare el modal
  (document.querySelectorAll('.botonModalOrden') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  //
  (document.querySelectorAll('.botonModalClave') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });


  (document.querySelectorAll('.botonModalAcceso') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // evento para que el modal se cierre desde cualquier lado donde haga click
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });
});