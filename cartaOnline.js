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
  constructor(nombre, detalle, origen, precio, disponibilidad) {
    this.nombre = nombre
    this.detalle = detalle
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
  constructor(nombre, detalle, bodega, precio, disponibilidad) {
    this.nombre = nombre
    this.detalle = detalle
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
  constructor(pedido, cantidad, precio) {
    this.pedido = pedido;
    this.cantidad = cantidad;
    this.precio = precio;
  }
}

class Orden {
  constructor(numero, total) {
    this.numero = numero;
    this.total = total;
  }
}

//creacion de objetos y arrays
let tabla1 = new Tabla('Pampa', 'Gouda, Camembert, Crottin', 1500, true)
let tabla2 = new Tabla('Patagonia', 'Lincoln, Brie, Patagonzola', 2200, true)
let tabla3 = new Tabla('Picantes', 'Goya, Pecorino, Chevrotin', 2700, true)
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
const ordenesConfirmadas = [];


/*
Manipoulacion del html segun objetos
*/
//MAIN orden: herotitulo/herocards x3
//funcion para crear el boton segun disponibilidad (para agregar a la card)
const crearBotonDeItem = disponibilidad => {

  let botonAgregar = document.createElement('button');
  botonAgregar.className = 'button is-primary is-fullwidth';
  botonAgregar.innerText = 'Agregar';

  let botonNoDisponible = document.createElement('button');
  botonNoDisponible.className = 'button is-light is-fullwidth';
  botonNoDisponible.title = 'Disabled button';
  botonNoDisponible.disabled = true;
  botonNoDisponible.innerText = 'No Disponible';

  disponibilidad == true ? boton = botonAgregar : boton = botonNoDisponible;

  return boton
};
let botonDeItem = crearBotonDeItem();

//funcion que devuelve string el tipo de item (para agregar a clases e ids)
const stringItem = array => {
  let tipoItem = '';
  switch (array) {
    case tablas:
      tipoItem = 'tabla';
      break;
    case vinos:
      tipoItem = 'vino';
      break;
    case quesos:
      tipoItem = 'queso';
      break;
    default:
      console.log('error funcion cards')
  }
  return tipoItem
};

//funcion que crea el hero de los titulos, esto esta OK
const crearHeroTitulo = array => {
  let tipoItem = stringItem(array);
  let sectionHeroTitulo = document.createElement('div');
  sectionHeroTitulo.className = 'hero is-primary is small';
  let bodyHeroTitulo = document.createElement('div');
  bodyHeroTitulo.className = 'hero-body';
  bodyHeroTitulo.id = `${tipoItem}sTitulo`;

  //innerhtml de los titulos
  switch (bodyHeroTitulo.id) {
    case 'tablasTitulo':
      bodyHeroTitulo.innerHTML = `
  <p class="title is-3 has-text-centered">
  Degustaciones de Quesos
  </p>
  <p class="subtitle has-text-centered">
  A cualquiera de nuestras tablas podes sumarle una degustación de 3 copas de vinos elegidos por
  nuestra Sommelier
  </p>
  `;
      break;
    case 'quesosTitulo':
      bodyHeroTitulo.innerHTML = `
  <p class="title is-3 has-text-centered">
  Quesos
  </p>
  <p class="subtitle has-text-centered">
  Porciones de quesos seleccionados, acompañados de pan de masamadre y dip de conservas casera
  </p>
  `;
      break;
    case 'vinosTitulo':
      bodyHeroTitulo.innerHTML = `
  <p class="title is-3 has-text-centered">
  Copas de Vino
  </p>
  <p class="subtitle has-text-centered">
  Vinos argentinos diversos y seleccionados especialmente!
  </p>
  `;
      break;
  }

  sectionHeroTitulo.append(bodyHeroTitulo);

  return sectionHeroTitulo;
};

//llamado a los funciones de titulos:
let heroTituloTablas = crearHeroTitulo(tablas);
let heroTituloQuesos = crearHeroTitulo(quesos);
let heroTituloVinos = crearHeroTitulo(vinos);

//funcion que crea el hero contenedor de las cards, 
//aca tengo problemas con los detalles de los opjetos, 
//repensar antes de entrega final!
const crearHeroCards = array => {
  let tipoItem = stringItem(array);

  let sectionHero = document.createElement('div');
  sectionHero.className = 'hero';
  let bodyHero = document.createElement('div');
  bodyHero.className = `hero-body bg-${tipoItem}s`;
  let columnsCards = document.createElement('div');
  columnsCards.className = 'columns is-3 is-multiline is-centered';
  columnsCards.id = `grilla${tipoItem}s`;

  array.forEach(
    (tipoItem) => {

      let columnCard = document.createElement('div');
      columnCard.className = 'column is-one-third';
      let card = document.createElement('div');
      card.className = 'card'

      let cardContent = document.createElement('div');
      cardContent.className = 'card-content';
      cardContent.innerHTML = `
          <h3 class="title is-4">${tipoItem.nombre}</h3>
          <p>${tipoItem.detalle}</p>
          <p>$ ${tipoItem.precio}</p>
          `;

      let botonDeItem = crearBotonDeItem(tipoItem.disponibilidad);
      let cardFooter = document.createElement('div');
      cardFooter.className = 'card-footer';
      cardFooter.append(botonDeItem);

      card.append(cardContent, cardFooter);
      columnCard.append(card);
      columnsCards.append(columnCard);

      botonDeItem.onclick = item => {
        let itemPedido = new ItemPedido(tipoItem.nombre, 1, tipoItem.precio);
        itemsPedidos.push(itemPedido);

        ordenarItemsPedidos();
      }
    }
  )

  bodyHero.append(columnsCards);
  sectionHero.append(bodyHero);

  return sectionHero;

};

//llamado a la funcion de las cards
let heroCardsTablas = crearHeroCards(tablas);
let heroCardsQuesos = crearHeroCards(quesos);
let heroCardsVinos = crearHeroCards(vinos);

//esto arma el orden de elemnetos del main
let mainCont = document.getElementById('main');
mainCont.append(heroTituloTablas, heroCardsTablas,
  heroTituloQuesos, heroCardsQuesos,
  heroTituloVinos, heroCardsVinos);

//MODAL DE ORDEN
//llamado al contenedor de la orden
let cuerpoTablaOrden = document.querySelector('#cuerpoTablaOrden')
let footTablaOrden = document.querySelector('#footTablaOrden')


//funcion que ordena el contenido de la orden
const ordenarItemsPedidos = () => {

  let sumaOrden = 0;
  cuerpoTablaOrden.innerHTML = '';

  itemsPedidos.forEach(
    (item) => {
      let renglonesOrden = document.createElement('tr');
      
      renglonesOrden.innerHTML = `
      <td>${item.cantidad}</td>
      <td>${item.pedido}</td>
      <td>$ ${item.precio}</td>
            <td><button class="delete" type="button" id="borrarItem${item.pedido}"></button></td>
            `;

      cuerpoTablaOrden.append(renglonesOrden);

      //evento para borrar items de la oden
      let botonBorrarItem = document.getElementById(`borrarItem${item.pedido}`);
      botonBorrarItem.onclick = () => {
        let itemBorrado = itemsPedidos.indexOf(itemBorrar => itemBorrar.pedido == item.pedido);
        itemsPedidos.splice(itemBorrado);

        ordenarItemsPedidos();
      };
      
      sumaOrden += item.cantidad * item.precio;
      footTablaOrden.innerHTML = `
      <tr>
      <td>Total $ ${sumaOrden}</td>
      </tr>
      `
    }
  );

  let fecha = moment().format('L');
  let hora = moment().format('LT');
  let ordenConfirmadaContent = document.getElementById('ordenConfirmadaContent')
  ordenConfirmadaContent.innerHTML = `
  <div class="columns is-multiline has-text-centered">
    <div class="column is-half">
    <p>Fecha: ${fecha}</p>
    </div>
    <div class="column is-half">
    <p>Hora: ${hora}</p>
    </div>
    <div class="column is-full">
    <p class="has-text-primary has-text-weight-semibold">Muchas gracias!</p>
    <p class="nuevaOrden"></p>
    </div>
  </div>
  `;
};

  /*
  COFNIRMAR ORDEN
  evento del boton confirmar orden, lo que quiero que haga
  vaciar el array de items pedidos (o)
  generar numero de orden (x)
  checkear storage para generar numero de orden (x)
  */
  let botonConfirmarOrden = document.getElementById('botonConfirmarOrden');
  botonConfirmarOrden.onclick = () => {
    itemsPedidos.length = 0;
    ordenarItemsPedidos();

    /*if (localStorage.getItem('1') == null) {
      numero = 1
    }
    let ordenConfirmada = new Orden(numero, sumaOrden);
    localStorage.setItem(numero, sumaOrden)
    ordenesConfirmadas.push(ordenConfirmada);

  }*/
}

/*
MODAL DE ACCESO PERSONAL, lo que deberia hacer es:
habilitarse el boton que dispara el modal con una clave (o)
en el modal navegar las tabs de listas de items (o)
boton para cambiar dispnibilidad de item (x)
*/

//resetear numero de orden (borra el local storage)
let botonResetOrden = document.getElementById('botonResetOrden');
botonResetOrden.onclick = () => localStorage.clear();


//funciones para clase (color) y texot de boton de disponbilidad (ACA PODRIA IR TERNARIO?)
const botonDisponibilidadClase = disponibilidad => {
  disponibilidad == true ? claseBoton = 'is-success' : claseBoton = 'is-primary';

  return claseBoton
}
let claseBotonDisponibilidad = botonDisponibilidadClase();

const botonDisponibilidadTexto = disponibilidad => {
  disponibilidad == true ? textoBoton = 'Disponible' : textoBoton = 'No Disponible';

  return textoBoton
}
let textoBotonDisponibilidad = botonDisponibilidadTexto();

//funcion que cambia la dispo
//intento de hacer funcion el metodo n3
//me parece que voy a tner que buscar el item con el index, MAÑANA!
const cambiarDispo = item => {
  if (tablas.includes(item) == true) {
    tabla.deshabilitar();
  } else if (quesos.includes(item) == true) {
    queso.deshabilitar();
  } else if (vinos.includes(item) == true) {
    vino.deshabilitar
  } else {
    console.log('error funcion cambiarDispo')
  }
  return item.disponibilidad;
}

//funcion que crea las tabs
const crearContenedorTabs = array => {
  //aca saco la palabra que define al array para reutilizar en clases y ids
  let id = '';
  switch (array) {
    case tablas:
      id = 'Tablas';
      break;
    case vinos:
      id = 'Vinos';
      break;
    case quesos:
      id = 'Quesos';
      break;
    default:
      console.log('error funcion listas')
  }

  //aca creo el html 
  let contenedorBoxTabs = document.getElementById('boxTabs');
  let contenedorTabs = document.createElement('div');
  contenedorTabs.className = 'content';
  contenedorTabs.id = 'contenedorTabs';
  contenedorBoxTabs.append(contenedorTabs);
  contenedorTabs.innerHTML = `
      <div class="contenidoTabs" id="tabAcceso${id}">
          <table class="table is-striped is-fullwidth">
              <thead>
                  <tr>
                      <td class="is-light">Item</td>
                      <td class="is-light">Disponibilidad</td>
                  </tr>
              </thead>
              <tbody id="listaAcceso${id}"></tbody>
          </table>
      </div>    
      `;

  //aca le agrego el active a la tab que esta abierta por default
  let tabActiva = document.getElementById('tabAccesoTablas')
  tabActiva.classList.add('active');

  //ahora tengo que crear los renglones
  let cuerpoTablaLista = document.getElementById(`listaAcceso${id}`)
  array.forEach(
    (item) => {
      let renglonesLista = document.createElement('tr');
      let claseBotonDisponibilidad = botonDisponibilidadClase(item.disponibilidad);
      let textoBotonDisponibilidad = botonDisponibilidadTexto(item.disponibilidad);

      renglonesLista.innerHTML = `
                  <td>${item.nombre}</td>
                  <td>
                  <button class="button ${claseBotonDisponibilidad}" type="button" id="dispoItem${item.nombre}">${textoBotonDisponibilidad}</button>
                  </td>                
              `;
      cuerpoTablaLista.append(renglonesLista)

      let botonDispo = document.getElementById(`dispoItem${item.nombre}`);
      botonDispo.onclick = () => {
        //intento funcion n2, aca adentro funciona pero tengo que sacar el resultado
        const cambiarDispo = () => {
          let disponibilidad = item.disponibilidad;
          disponibilidad == true ? item.disponibilidad = false : item.disponibilidad = true;

          return item.disponibilidad;
        }
        cambiarDispo();

        //esto para checkear que se cambia la disponibilidad
        console.log(item.disponibilidad);

      };
    }
  );
};

//LLAMADO A LAS FUNCIONES
crearContenedorTabs(tablas);
crearContenedorTabs(vinos);
crearContenedorTabs(quesos);

//evento que si es la clave correcta habilite el boton FUNCIONA OK, DEJAR ASI
let claveAcceso = document.getElementById('claveAcceso');

claveAcceso.oninput = () => {
  const habilitarBoton = () => {
    if (claveAcceso.value == '1234') {
      let botonIngresar = document.getElementById('botonIngresar');
      botonIngresar.disabled = false;
    }
  }
  habilitarBoton();
}
//FUNCIONAMIENTO DE TABS
//evento para que se activen las tabs (intento n5) 
//con el cambio de estructura FUNCIONAAAAA, GRACIAS SHINEE
let divTabs = document.querySelector('.tabs');
let tablinks = document.querySelectorAll('.tablinks');
let contenidoTabs = document.querySelectorAll('.contenidoTabs');

divTabs.onclick = e => {
  //esta en la tab donde pasa el evento
  const tabA = e.target;
  //esto es para llamar a los elementos por el id del data-target
  const id = e.target.dataset.target;
  //esta para agarrar el contenido de la tab con id = target
  const bloque = document.getElementById(id)

  tablinks.forEach(a => {
    a.classList.remove('is-active');
  });
  tabA.classList.add('is-active');

  contenidoTabs.forEach(block => {
    block.classList.remove('active');
  });

  bloque.classList.add('active');
}

/*
ME FALTA:
ARREGLAR LO QUE NO ANDA (o)
HACER QUE FUNCIONEN LAS TABS, AAARAGGGGGSGSG (o)
BOTON DE CAMBIAR DISPONIBILIDAAAAAAAD! 
 - TENGO UNA FUNCION ADENTRO DEL FOREACH QUE CUASI FUNCIONA
 - TENGO UNA FUNCION ARIBA QUE NO FUNCIONA PARA NADA, KMN
STORAGE PARA CALCULAR NUMERO DE ORDEN, NO ANDA
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
  (document.querySelectorAll('.botonModalOrden, .botonModalClave') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  (document.querySelectorAll('.botonModalOrdenConfirmada') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);
    const modalOrden = document.getElementById('modalOrden')

    $trigger.addEventListener('click', () => {
      openModal($target);
      closeModal(modalOrden)
    });
  });

  //
  /*(document.querySelectorAll('.botonModalClave') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });*/


  (document.querySelectorAll('.botonModalAcceso') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);
    const modalClave = document.getElementById('modalClave')

    $trigger.addEventListener('click', () => {
      openModal($target);
      closeModal(modalClave)
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