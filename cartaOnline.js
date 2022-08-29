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

  //TERNARIO (if que define boton segun dispo)
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

//funcion que crea el hero de los titulos
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

//funcion que crea el hero contenedor de las cards
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
          <p>${tipoItem.detItem}</p>
          <p>${tipoItem.detItem2}</p>
          <p>$ ${tipoItem.precio}</p>
          `;

      let botonDeItem = crearBotonDeItem(tipoItem.disponibilidad);
      let cardFooter = document.createElement('div');
      cardFooter.className = 'card-footer';
      cardFooter.append(botonDeItem);

      card.append(cardContent, cardFooter);
      columnCard.append(card);
      columnsCards.append(columnCard);
    }
  )

  bodyHero.append(columnsCards);
  sectionHero.append(bodyHero);

  return sectionHero;
}
//llamado a la funcion de las cards
let heroCardsTablas = crearHeroCards(tablas);
let heroCardsQuesos = crearHeroCards(quesos);
let heroCardsVinos = crearHeroCards(vinos);

//esto deberia armar el main, RECEMOS
let mainCont = document.getElementById('main');
mainCont.append(heroTituloTablas, heroCardsTablas,
  heroTituloQuesos, heroCardsQuesos,
  heroTituloVinos, heroCardsVinos);

//MODAL DE ORDEN
//llamado al contenedor de la orden
let cuerpoTablaOrden = document.querySelector('#cuerpoTablaOrden')
let footTablaOrden = document.querySelector('#footTablaOrden')

//funciones
//esto deberia recuperar los items del storage, ANDAAAAAAAAA 
/*const recuperarOrden = () => {
  if (localStorage.getItem('miOrden') != null) {
    itemStorage = JSON.parse(localStorage.getItem('miOrden'));
  }

  return itemStorage
}
recuperarOrden();

//esto imprime lo que quedo en el storage en el carrito, FUNCIONA VOY A LLORAR
const imprimirStorage = () => {
  let renglonesStorage = '';

  let itemsStorage = recuperarOrden();

  itemsStorage.forEach(
    (item) => {
      renglonesStorage += `
            <tr>
            <td>${item.cantidad}</td>
            <td>${item.pedido.nombre}</td>
            <td>$ ${item.pedido.precio}</td>
            <td><button class="delete" type="button" id="borrarItem${item.pedido.nombre}"></button></td>
            </tr>
            `;

      cuerpoTablaOrden.innerHTML = renglonesStorage;
    }
  )
}
imprimirStorage();*/

//funcion que ordena el contenido de la orden
const ordenarItemsPedidos = () => {
  let sumaOrden = 0;
  cuerpoTablaOrden.innerHTML = '';

  itemsPedidos.forEach(
    (item) => {
      let renglonesOrden = document.createElement('tr');

      renglonesOrden.innerHTML = `
            <td>${item.cantidad}</td>
            <td>${item.pedido.nombre}</td>
            <td>$ ${item.pedido.precio}</td>
            <td><button class="delete" type="button" id="borrarItem${item.pedido.nombre}"></button></td>
            `;

      cuerpoTablaOrden.append(renglonesOrden);

      //EVENTO PARA EL BOTON DE BORRAR ITEM DE LA ORDEN, INTENTO 4(SPLICE), NO ANDA NOT SURPRISED
      let botonBorrarItem = document.getElementById(`borrarItem${item.pedido.nombre}`);
      botonBorrarItem.onclick = () => {
        let itemBorrado = itemsPedidos.indexOf(itemBorrar => itemBorrar.pedido.nombre == item.pedido.nombre);
        itemsPedidos.splice(itemBorrado);

        ordenarItemsPedidos();
      };

      localStorage.setItem('miOrden', JSON.stringify(itemsPedidos));

      sumaOrden += item.cantidad * item.pedido.precio;
      footTablaOrden.innerText = `Total: $ ${sumaOrden}`
    }
  );
};

/*
MODAL DE ACCESO PERSONAL, lo que deberia hacer es:
habilitarse el boton que dispara el modal con una clave (o)
en el modal navegar las tabs de listas de items (o)
boton para cambiar dispnibilidad de item (x)
*/

//TABS ACCESO CONTENIDO 
//MIRA QUE BELLEZA ESTO ME RE QUIERO
//funciones para clase (color) y texot de boton de disponbilidad (ACA PODRIA IR TERNARIO?)
const botonDisponibilidadClase = disponibilidad => {
  disponibilidad == true ? claseBoton = 'is-success': claseBoton = 'is-primary';

  return claseBoton
}
let claseBotonDisponibilidad = botonDisponibilidadClase();

const botonDisponibilidadTexto = disponibilidad => {
  disponibilidad == true ? textoBoton = 'Disponible': textoBoton = 'No Disponible';

  return textoBoton
}
let textoBotonDisponibilidad = botonDisponibilidadTexto();

//funcion que cambia la dispo
//intento de hacer funcion el metodo n3
//me parece que voy a tner que buscar el item con el index, MAÑANA!
/*const cambiarDispo = item => {
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
}*/

//FUNCION QUE CREA LOS CONT DE LAS TABS
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

  //el remover anda en los dos, no anda el agregar class
  tablinks.forEach(a => {
    a.classList.remove('is-active');
  });
  tabA.classList.add('is-active');

  //este console.log es para ver que agarra bien el cambio de clase, 
  //lo toma pero no toma las caracteristicas de la clase (checkear doc de bulma)
  console.log(tabA.className)

  contenidoTabs.forEach(block => {
    block.classList.remove('active');
  });

  //aca no agarra el id, da null
  bloque.classList.add('active');
}

//boton cambiar disponibilidad LETS GET IT


/*
ME FALTA:
ARREGLAR LO QUE NO ANDA (o)
HACER QUE FUNCIONEN LAS TABS, AAARAGGGGGSGSG (o)
BOTON DE CAMBIAR DISPONIBILIDAAAAAAAD! 
 - TENGO UNA FUNCION ADENTRO DEL FOREACH QUE CUASI FUNCIONA
 - TENGO UNA FUNCION ARIBA QUE NO FUNCIONA PARA NADA, KMN
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