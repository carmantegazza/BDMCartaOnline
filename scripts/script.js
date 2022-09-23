//arrays
let items = [];
let itemsPedidos = [];

//clase para item de la orden
class ItemPedido {
  constructor(pedido, cantidad, precio) {
    this.pedido = pedido;
    this.cantidad = cantidad;
    this.precio = precio;
  }
}

//funciones
traerItems();
//confirmarOrden();
//cambiarDispo();

//async
async function traerItems() {
  const URLJSON = "json/itemsCarta.json"
  const response = await fetch(URLJSON)
  const data = await response.json()
  items = data;

  console.log(items);
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

//crear cards
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
          console.log('error switch')
      }

      botonDeItem.onclick = () => {
        let itemPedido = new ItemPedido(item.nombre, 1, item.precio);
        itemsPedidos.push(itemPedido);

        ordenarItemsPedidos();
      }
    }
  )
}

//funcion que ordena el contenido de la orden

let cuerpoTablaOrden = document.querySelector('#cuerpoTablaOrden')
let footTablaOrden = document.querySelector('#footTablaOrden')

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

ordenarItemsPedidos();


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

//funcion que crea las tabs
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
                  <button class="button ${claseBotonDisponibilidad}" type="button" id="dispoItem${item.nombre}">${textoBotonDisponibilidad}</button>
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

      /*let botonDispo = document.getElementById(`dispoItem${item.nombre}`);
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

      };*/
    }
  );
};
crearContenidoTabs(items);

//FUNCIONAMIENTO DE TABS
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

//FUNCIONAMIENTO DE MODAL
document.addEventListener('DOMContentLoaded', () => {
  // funciones que abren y cierran modales
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  // evento para que el boton dispare el modal
  (document.querySelectorAll('.botonModalOrden, .botonModalOrdenConfirmada, .botonModalClave, .botonModalAcceso') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  (document.querySelectorAll('.botonModalOrdenConfirmada') || []).forEach(($trigger) => {
    const modalOrden = document.getElementById('modalOrden')

    $trigger.addEventListener('click', () => {
      closeModal(modalOrden)
    });
  });

  (document.querySelectorAll('.botonModalAcceso') || []).forEach(($trigger) => {
    const modalClave = document.getElementById('modalClave')

    $trigger.addEventListener('click', () => {
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
