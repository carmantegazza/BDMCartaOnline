//ARRAYS Y CLASES DE OBJETOS
//arrays
let items = [];
let itemsPedidos = [];
let resumenOrdenes = [];

//array de ordenes
let ordenes = JSON.parse(localStorage.getItem('ordenes')) || [];

//clase para items de la orden
class ItemPedido {
  constructor(pedido, cantidad, precio) {
    this.pedido = pedido;
    this.cantidad = cantidad;
    this.precio = precio;
  }
};
//clase para las ordenes
class OrdenConfirmada {
  constructor(numero, hora, total) {
    this.numero = numero;
    this.hora = hora;
    this.total = total;
  }
};

/*FUNCION ASYNC
para traer datos desde el json*/
async function traerItems() {
  const URLJSON = "json/itemsCarta.json";
  const response = await fetch(URLJSON);
  const data = await response.json();
  items = data;

  crearCards(items);
}
traerItems();

//FUNCIONES PARA CREAR CARDS DE ITEMS
//llamo elementos del html donde van a ir las cards
let contTablas = document.getElementById('contTablas');
let contQuesos = document.getElementById('contQuesos');
let contVinos = document.getElementById('contVinos');

//funcion para crear el boton segun disponibilidad (para agregar a la card)
let crearBotonDeItem = disponibilidad => {

  let botonAgregar = document.createElement('button');
  botonAgregar.className = 'button is-warning is-fullwidth';
  botonAgregar.innerText = 'Agregar';

  let botonNoDisponible = document.createElement('button');
  botonNoDisponible.className = 'button is-fullwidth';
  botonNoDisponible.title = 'Disabled button';
  botonNoDisponible.disabled = true;
  botonNoDisponible.innerText = 'No Disponible';

  disponibilidad == true ? boton = botonAgregar : boton = botonNoDisponible;

  return boton
};
let botonDeItem = crearBotonDeItem();

//funcion para crear cards de items
const crearCards = array => {
  array.forEach(
    (item) => {
      //creo html de las cards
      let columnCard = document.createElement('div');
      columnCard.className = 'column is-one-quarter';
      let card = document.createElement('div');
      card.className = 'card';
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
          contTablas.appendChild(columnCard);
          break
        case 'queso':
          contQuesos.appendChild(columnCard);
          break
        case 'vino':
          contVinos.appendChild(columnCard);
          break
        default:
          console.log('error switch funcion crearCards');
      };
      //evento del boton para agregar item a la orden
      botonDeItem.onclick = () => {
        let itemPedido = new ItemPedido(item.nombre, 1, item.precio);
        itemsPedidos.push(itemPedido);

        ordenarItemsPedidos();

        setTimeout(() => {
          botonDeItem.innerText = 'Agregado a la orden!'
        }, 300);
        setTimeout(() => {
          botonDeItem.innerText = 'Agregar'
        }, 1000)

      };
    }
  )
};

/* FUNCIONES DE LA ORDEN 
renderizar sumar total, renderizar items en tabla, mensaje de footer de tabla, confirmar orden, subir al storage */
//declaro variables a usar
let numeroOrden = '';
let fecha = moment().format('L');
let hora = moment().format('LT');
let sumaOrden;
let sumaOrdenEft;

//elementos del html 
//de la orden
let cuerpoTablaOrden = document.getElementById('cuerpoTablaOrden');
let mensajeTablaOrden = document.getElementById('mensajeTablaOrden');
let botonConfirmarOrden = document.getElementById('botonConfirmarOrden');
//de la orden confirmada
let ordenConfirmadaContent = document.getElementById('ordenConfirmadaContent');
let modalOrdenConfirmada = document.getElementById('modalOrdenConfirmada');
//del input
let nombreOrden = document.getElementById('nombreOrden');
let pagoEfectivo = document.getElementById('pagoEfectivo');

//funcion para sumar total
const sumarOrden = () => {
  let sumaOrden = 0;
  for (const item of itemsPedidos) {
    sumaOrden = sumaOrden + (item.precio * item.cantidad);
  }
  return sumaOrden
};

//funcion para borrar item
const borrarItem = itemBorrar => {
  let itemBorrado = itemsPedidos.findIndex((item) => itemBorrar.pedido == item.pedido)
  itemsPedidos.splice(itemBorrado,1);
  console.log(itemBorrado);
}

//funcion para ordenar contenido orden, evento confirmar
const ordenarItemsPedidos = () => {
  cuerpoTablaOrden.innerHTML = '';

  itemsPedidos.forEach(
    (item) => {
      let precioTotal = item.precio * item.cantidad;
      let renglonesOrden = document.createElement('tr');
      renglonesOrden.innerHTML = `
      <td><input class="input is-rounded is-small" id="${item.pedido}Cantidad" type="number" value="${item.cantidad}" min="1" max="10" step="1"></td>
      <td>${item.pedido}</td>
      <td>$ ${item.precio}</td>
      <td>$ ${precioTotal}</td>
      <td><button class="delete" type="button" id="borrarItem${item.pedido}"></button></td>
      `;
      cuerpoTablaOrden.append(renglonesOrden);

      //evento para agregar cantidad desde el input
      let cantidadTotal = document.getElementById(`${item.pedido}Cantidad`)
      cantidadTotal.addEventListener("change", (e) => {
        let nuevaCantidad = e.target.value;
        item.cantidad = nuevaCantidad;
        ordenarItemsPedidos();
      })

      //evento para borrar items de la oden
      let botonBorrarItem = document.getElementById(`borrarItem${item.pedido}`);
      botonBorrarItem.onclick = () => {
        borrarItem(item);
        ordenarItemsPedidos();
      }
    }
  );

  //creacion del footer de la tabla (mensaje o suma y deshabilitacion de boton)
  sumaOrden = sumarOrden();
  sumaOrdenEft = sumarOrden() * 0.9;
  if (sumaOrden == 0) {
    mensajeTablaOrden.innerText = `Aún no agregaste nada a tu orden!`;
    botonConfirmarOrden.disabled = true;
  } else {
    mensajeTablaOrden.innerText = `
    Total $${sumaOrden}.
    En efectivo tenes 10% de descuento, seria $${sumaOrdenEft}.
    `;
    botonConfirmarOrden.disabled = false;
  }
};
ordenarItemsPedidos();

//evento boton Confirmar Orden
botonConfirmarOrden.onclick = () => {
  sumaOrden = sumarOrden(itemsPedidos);
  sumaOrdenEft = sumarOrden() * 0.9;

  //verifico el storage para continuidad de numero de ordenes
  if (ordenes != null) {
    numeroOrden = ordenes.length + 1;
  } else {
    numeroOrden = 1;
  };

  //verifico el medio de pago para saber el total de la venta
  let totalOrden;
  pagoEfectivo.checked == true ? totalOrden = sumaOrdenEft : totalOrden = sumaOrden;

  //creo objeto de orden y lo pusheo al array, y lo subo al storage
  let nuevaOrden = new OrdenConfirmada(numeroOrden, hora, totalOrden);
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
    <p class="has-text-weight-semibold color-marca is-capitalized">Muchas gracias ${nombreOrden.value}!</p>
    <p>Tu orden es la numero ${numeroOrden}</p>
    <p>El total es $${totalOrden}</p>
    <p>Acercate a la caja para realizar el pago!</p>
    </div>
  </div>
  `;
  //limpio datos de imput
  nombreOrden.value = '';
  pagoEfectivo.checked = false;
  //limpio array de items pedidos
  itemsPedidos = [];
  ordenarItemsPedidos();
};

/*FUNCIONES DEL TABLERO DE ACCESO DE PERSONAL
renderizar items segun tipo, 
ver disponibilidad, cambiar disponibilidad, resetear conteo de ordenes */
//elementos del html a usar en modal clave
let claveAcceso = document.getElementById('claveAcceso');
let botonIngresar = document.getElementById('botonIngresar');
//en modal acceso
let cuerpoResumen = document.getElementById('cuerpoResumen');
let footResumen = document.getElementById('footResumen');
let botonResetOrden = document.getElementById('botonResetOrden');

//traigo los datos del storage
//resumenOrdenes = JSON.parse(localStorage.getItem('ordenes'));

//funcion para calcular el total de ventas
const sumarTotalVentas = () => {
  let totalVentas = 0;
  for (const orden of ordenes) {
    totalVentas = totalVentas + orden.total;
  }
  return totalVentas
};

//funcion para renderizar el contenido del storage
const resumirOrdenes = () => {
  cuerpoResumen.innerHTML = '';

  ordenes.forEach(
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
  <td class="has-text-weight-semibold">Total Ordenes = ${ordenes.length}</td>
  <td class="has-text-weight-semibold">Total Ventas = $${totalVentas}</td>
  </tr>
  `;
};

//funcion para habiltar boton de ingreso con clave
const habilitarBoton = () => {
  if (claveAcceso.value == '1234') {
    botonIngresar.disabled = false;
  }
}
//evento que ejecuta la funcion
claveAcceso.oninput = () => habilitarBoton();

//evento de boton Ingresas (renderiza ordenes y limpia el modal de clave)
botonIngresar.onclick = () => {
  resumirOrdenes();
  claveAcceso.value = '';
  botonIngresar.disabled = true;
};

//evento reseteo de ordenes (limpia storage)
botonResetOrden.onclick = () => {
  localStorage.clear();
  cuerpoResumen.innerHTML = '';
  footResumen.innerHTML = '';
};

/*FUNCIONALIDAD DE MODALES*/
//modales traidos de bulma, modificados segun necesidad
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

  //eventos para que se cierre el modal ya abrierto (en orden y en acceso personal)
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

  //evento para que el modal se cierre desde cualquier lado donde haga click
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');
    $close.addEventListener('click', () => {
      cerrarModal($target);
    });
  });
});