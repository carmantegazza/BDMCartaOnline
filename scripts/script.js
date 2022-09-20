//declaro arrays vacios
let items = [];
let itemsPedidos = [];

//clase para items de la orden
class ItemPedido {
  constructor(pedido, cantidad, precio) {
    this.pedido = pedido;
    this.cantidad = cantidad;
    this.precio = precio;
  }
}

//llamado a funciones
traerItems();
//confirmarOrden();
//cambiarDispo();

//funcion async para traer datos desde el json
async function traerItems() {
  const URLJSON = "../json/itemsCarta.json"
  const response = await fetch(URLJSON)
  const data = await response.json()
  items = data;

  crearCards(items);
  crearContenidoTabs(items);
}

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

//funcion para crear cards de items
const crearCards = array => {
  let contTablas = document.getElementById('contTablas')
  let contQuesos = document.getElementById('contQuesos')
  let contVinos = document.getElementById('contVinos')

  array.forEach(
    (item) => {
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

      let botonDeItem = crearBotonDeItem(item.disponibilidad);
      let cardFooter = document.createElement('div');
      cardFooter.className = 'card-footer';
      cardFooter.append(botonDeItem);

      card.append(cardContent, cardFooter);
      columnCard.append(card);

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

  //mensaje de confirmacion de orden
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
    <p>El total es de $${sumaOrden}</p>
    <p>En efectivo tenes 10% de descuento seria $${sumaOrden*0.9}
    <p class="has-text-primary has-text-weight-semibold">Muchas gracias!</p>
    <p class="nuevaOrden"></p>
    </div>
  </div>
  `;
};
ordenarItemsPedidos();

/*FUNCIONES DEL TABLERO DE ACCESO DE PERSONAL
renderizar items segun tipo, 
ver disponibilidad, cambiar disponibilidad, resetear conteo de ordenes */

//funciones para clase (color) y texto de boton de disponbilidad 
const botonDisponibilidadClase = disponibilidad => {
  disponibilidad == true ? claseBoton = 'is-primary' : claseBoton = 'is-danger';

  return claseBoton
}
let claseBotonDisponibilidad = botonDisponibilidadClase();

const botonDisponibilidadTexto = disponibilidad => {
  disponibilidad == true ? textoBoton = 'Disponible' : textoBoton = 'No Disponible';

  return textoBoton
}
let textoBotonDisponibilidad = botonDisponibilidadTexto();

//funcion que crea las tabs de items segun tipo
const crearContenidoTabs = array => {
  let listaAccesoTablas = document.getElementById('listaAccesoTablas')
  let listaAccesoQuesos = document.getElementById('listaAccesoQuesos')
  let listaAccesoVinos = document.getElementById('listaAccesoVinos')

  array.forEach(
    (item) => {
      let renglonesLista = document.createElement('tr');
      let claseBotonDisponibilidad = botonDisponibilidadClase(item.disponibilidad);
      let textoBotonDisponibilidad = botonDisponibilidadTexto(item.disponibilidad);

      renglonesLista.innerHTML = `
                  <td>${item.nombre}</td>
                  <td>
                  <button class="button ${claseBotonDisponibilidad} botonesDispo" type="button" id="dispoItem${item.nombre}">${textoBotonDisponibilidad}</button>
                  </td>                
              `;

      switch (item.tipo) {
        case 'tabla':
          listaAccesoTablas.append(renglonesLista)
          break
        case 'queso':
          listaAccesoQuesos.append(renglonesLista)
          break
        case 'vino':
          listaAccesoVinos.append(renglonesLista)
          break
        default:
          console.log('error en el swithch de contenido')
      }
    }
  );
};
crearContenidoTabs(items);

//funcion para cambio de disponibilidad

let botonesDispo = document.getElementsByClassName('botonesDispo')
console.log(botonesDispo)
botonesDispo.onclick = () => {
  let itemCambiaDispo = botonesDispo.find(i => i.position == items.position)
  
}

/*botonDispo.onclick = () => {
  //intento funcion n2, aca adentro funciona pero tengo que sacar el resultado
  const cambiarDispo = () => {
    let disponibilidad = item.disponibilidad;
    disponibilidad == true ? item.disponibilidad = false : item.disponibilidad = true;

    return item.disponibilidad;
  }
  cambiarDispo();

  //esto para checkear que se cambia la disponibilidad
  console.log(item.disponibilidad);

};*/

/*FUNCIONALIDAD DE TABS Y MODALES*/
//tabs
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