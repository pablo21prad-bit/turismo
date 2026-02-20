import { getData, setData } from "../../utils/localStorage.controller.js";

const KEY_CARRITO = "carrito";

const tabla = document.getElementById("tabla-carrito");
const totalHTML = document.getElementById("total");

// Traer reserva
let carrito = getData(KEY_CARRITO);

// Dibujar tabla
function cargarCarrito() {
  tabla.innerHTML = "";
  let totalReserva = 0;

  if (carrito.length === 0) {
    tabla.innerHTML = `
      <tr>
        <td colspan="6" class="text-center">
          No hay paquetes en la reserva
        </td>
      </tr>
    `;
    totalHTML.textContent = "0";
    return;
  }

  carrito.forEach(item => {
    totalReserva += item.total;

    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>
        <strong>${item.nombre}</strong><br>
        <small class="text-muted text-capitalize">${item.categoria}</small>
      </td>
      <td>$${item.precioBase}</td>
      <td>${item.pasajeros}</td>
      <td>${item.noches}</td>
      <td>$${item.total}</td>
      <td>
        <button 
          class="btn btn-danger btn-sm btn-eliminar"
          data-id="${item.id}"
          data-noches="${item.noches}">
          Eliminar
        </button>
      </td>
    `;

    tabla.appendChild(fila);
  });

  totalHTML.textContent = totalReserva;
}

// Eliminar paquete
tabla.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-eliminar")) {
    const id = Number(e.target.dataset.id);
    const noches = Number(e.target.dataset.noches);

    carrito = carrito.filter(
      item => !(item.id === id && item.noches === noches)
    );

    setData(KEY_CARRITO, carrito);
    cargarCarrito();
  }
});

cargarCarrito();


