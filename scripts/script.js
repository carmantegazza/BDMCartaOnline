//declaro arrays vacios
let items = [];
let itemsPedidos = [];
let ordenes = [];
let resumenOrdenes = [];

//clase para items de la orden
class ItemPedido {
  constructor(pedido, cantidad, precio) {
    this.pedido = pedido;
    this.cantidad = cantidad;
    this.precio = precio;
  }
}
//clase para las ordenes
class OrdenConfirmada {
  constructor(numero, hora, total) {
    this.numero = numero;
    this.hora = hora;
    this.total = total;
  }
};

//llamado a funcion async
traerItems();

//funcion async para traer datos desde el json
async function traerItems() {
  const URLJSON = "../json/itemsCarta.json"
  const response = await fetch(URLJSON)
  const data = await response.json()
  items = data;

  crearCards(items);
}

/*RENDERIZAR ITEMS*/
//funcion para crear el boton segun disponibilidad (para agregar a la card)
let crearBotonDeItem = disponibilidad => {

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

//llamo elementos del html que voy a usar
let contTablas = document.getElementById('contTablas')
let contQuesos = document.getElementById('contQuesos')
let contVinos = document.getElementById('contVinos')

//funcion para crear cards de items
const crearCards = array => {
  array.forEach(
    (item) => {
      //creo html de las cards
      let columnCard = document.createElement('div');
      columnCard.className = 'column is-one-third';
      let card = document.createElement('div');
      card.className = 'card'
      let cardContent = document.createElement('div');
      cardContent.className = 'card-content';
      cardContent.innerHTML = `
      <h3 class="title is-4">${item.nombre}</h3>
      <p>${item.detalle}</p>
      <p>$ ${item.precio}</p>
      `;
      //creo boton de disponibilidad y lo pongo en el footer de la card
      let botonDeItem = crearBotonDeItem(item.disponibilidad);
      let cardFooter = document.createElement('div');
      cardFooter.className = 'card-footer';
      cardFooter.append(botonDeItem);
      //armo las cards
      card.append(cardContent, cardFooter);
      columnCard.append(card);
      //condicional para ubicar cards segun tipo de item
      switch (item.tipo) {
        case 'tabla':
          contTablas.appendChild(columnCard)
          break
        case 'queso':
          contQuesos.appendChild(columnCard)
          break
        case 'vino':
          contVinos.appendChild(columnCard)
          break
        default:
          console.log('error switch funcion crearCards')
      }
      //evento del boton para agregar item a la orden
      botonDeItem.onclick = () => {
        let itemPedido = new ItemPedido(item.nombre, 1, item.precio);
        itemsPedidos.push(itemPedido);

        ordenarItemsPedidos();
      }
    }
  )
}

/* FUNCIONES DE LA ORDEN 
renderizar tabla de orden, sumar el total, mensaje de footer
*/
//declaro variables a usar
let numeroOrden = '';
let fecha = moment().format('L');
let hora = moment().format('LT');

//llamo elementos del html que voy a usar en esta seccion
let ordenConfirmadaContent = document.getElementById('ordenConfirmadaContent');
let modalOrdenConfirmada = document.getElementById('modalOrdenConfirmada');
//llamado a elementos de la tabla
let cuerpoTablaOrden = document.querySelector('#cuerpoTablaOrden')
let footTablaOrden = document.querySelector('#footTablaOrden')

//funcion para sumar total
const sumarOrden = () => {
  let sumaOrden = 0;
  for (const item of itemsPedidos) {
    sumaOrden = sumaOrden + (item.precio * item.cantidad)
  }
  return sumaOrden
}

//funcion para ordenar contenido orden
const ordenarItemsPedidos = () => {
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
    }
  );

  //creacion del footer de la tabla (mensaje o suma y deshabilitacion de boton)
  let sumaOrden = sumarOrden();
  let botonConfirmarOrden = document.getElementById('botonConfirmarOrden')
  if (sumaOrden == 0) {
    footTablaOrden.innerHTML = `
    <tr>
    <td class="has-text-centered">Aqui no hay nada! Hace clic en 'Agregar' en cualquiera de nuestras opciones disponibles para agregarlo a la orden </td>
    </tr>`
    botonConfirmarOrden.disabled = true
  } else {
    footTablaOrden.innerHTML = `
    <tr>
    <td>Total $ ${sumaOrden}</td>
    </tr>
    `
    botonConfirmarOrden.disabled = false
  }
};
ordenarItemsPedidos();

//evento boton Confirmar Orden
botonConfirmarOrden.onclick = () => {
  let sumaOrden = sumarOrden(itemsPedidos);
  //verifico el storage para continuidad de numero de ordenes
  if (localStorage.getItem('ordenes') != null) {
    numeroOrden = ordenes.length + 1;
  } else {
    numeroOrden = 1;
  };
  //creo objeto de orden y lo pusheo al array, y lo subo al storage
  let nuevaOrden = new OrdenConfirmada(numeroOrden, hora, sumaOrden);
  ordenes.push(nuevaOrden);
  localStorage.setItem('ordenes', JSON.stringify(ordenes));
  //mensaje de confirmacion de orden
  ordenConfirmadaContent.innerHTML = `
    <div class="columns is-multiline has-text-centered">
    <div class="column is-half">
    <p>Fecha: ${fecha}</p>
    </div>
    <div class="column is-half">
    <p>Hora: ${hora}</p>
    </div>
    <div class="column is-full">
    <p>Tu orden es la numero ${numeroOrden}</p>
    <p>El total es de $${sumaOrden}</p>
    <p>En efectivo tenes 10% de descuento seria $${sumaOrden*0.9}
    <p class="has-text-primary has-text-weight-semibold">Muchas gracias!</p>
    <p class="nuevaOrden"></p>
    </div>
  </div>
  `;
  //vacio el array de items pedidos
  itemsPedidos = [];
  ordenarItemsPedidos();
};

/*FUNCIONES DEL TABLERO DE ACCESO DE PERSONAL
renderizar items segun tipo, 
ver disponibilidad, cambiar disponibilidad, resetear conteo de ordenes */

//llamo elementos del html a usar
let cuerpoResumen = document.getElementById('cuerpoResumen');
let footResumen = document.getElementById('footResumen');
let botonResumirOrden = document.getElementById('botonResetDispo');

resumenOrdenes = JSON.parse(localStorage.getItem('ordenes'));
console.log(resumenOrdenes)
//funcion para calcular el total de ventas
const sumarTotalVentas = () => {
  let totalVentas = 0;
  for (const orden of resumenOrdenes) {
    totalVentas =  totalVentas + orden.total;
  }
  return totalVentas
}

//funcion para renderizar el contenido del storage
const resumirOrdenes = () => {
  console.log('funciona el log de la funcion resumir');
  cuerpoResumen.innerHTML = '';

  resumenOrdenes.forEach(
    (orden) => {
      let renglonesResumen = document.createElement('tr')
      renglonesResumen.innerHTML = `
      <td>Orden #${orden.numero}</td>
      <td>$${orden.total}</td>
      `;

      cuerpoResumen.append(renglonesResumen);
    }
  )
  let totalVentas = sumarTotalVentas();
  footResumen.innerHTML = `
  <tr>
  <td class="has-text-weight-semibold">Total Ordenes = ${resumenOrdenes.length}</td>
  <td class="has-text-weight-semibold">Total Ventas = $${totalVentas}</td>
  </tr>
  `;
}
resumenOrdenes != null && resumirOrdenes();

//reseteo de ordenes
let botonResetOrden = document.getElementById('botonResetOrden');
botonResetOrden.onclick = () => {
  localStorage.clear();
  cuerpoResumen.innerHTML = '';
  footResumen.innerHTML = '';
};

/*FUNCIONALIDAD DE MODALES*/
//modales
document.addEventListener('DOMContentLoaded', () => {
  //funciones que abren y cierran modales
  const abrirModal = $el => $el.classList.add('is-active');
  const cerrarModal = $el => $el.classList.remove('is-active');

  //evento que triggerea los modales
  (document.querySelectorAll('.botonModalOrden, .botonModalOrdenConfirmada, .botonModalClave, .botonModalAcceso') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);
    $trigger.addEventListener('click', () => {
      abrirModal($target);
    });
  });

  //eventos para que se cierre el modal ya abrierot (en orden y en acceso personal)
  (document.querySelectorAll('.botonModalOrdenConfirmada') || []).forEach(($trigger) => {
    const modalOrden = document.getElementById('modalOrden')
    $trigger.addEventListener('click', () => {
      cerrarModal(modalOrden)
    });
  });
  (document.querySelectorAll('.botonModalAcceso') || []).forEach(($trigger) => {
    const modalClave = document.getElementById('modalClave')
    $trigger.addEventListener('click', () => {
      cerrarModal(modalClave)
    });
  });

  // evento para que el modal se cierre desde cualquier lado donde haga click
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');
    $close.addEventListener('click', () => {
      cerrarModal($target);
    });
  });
});