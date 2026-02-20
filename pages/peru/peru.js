import { getData, setData } from "../../utils/localStorage.controller.js";
import { cardComponent } from "../../components/card.js";

const KEY_CARRITO = "carrito";
const contenedor = document.getElementById("contenedor-peru");

let paquetes = [];

fetch("../../data/destinos.json")
  .then(res => res.json())
  .then(data => {
    paquetes = data.filter(p => p.categoria === "peru");
    contenedor.innerHTML = paquetes.map(cardComponent).join("");

    // Inicializar totales visuales (por si el HTML arranca en 1 pasajero y nochesBase)
    paquetes.forEach(p => actualizarTotalUI(p.id, p.nochesBase));
  });

function getPasajeros(id) {
  const span = document.getElementById(`pasajeros-${id}`);
  return parseInt(span.textContent);
}

function getNoches(id) {
  const span = document.getElementById(`noches-${id}`);
  return parseInt(span.textContent);
}

function actualizarTotalUI(id, nochesBaseFallback = 1) {
  const paquete = paquetes.find(p => p.id === id);
  if (!paquete) return;

  // pasajeros
  const pasajeros = getPasajeros(id);

  // noches (si por alguna razón no existe, uso nochesBase del JSON)
  let noches = getNoches(id);
  if (Number.isNaN(noches) || noches < 1) noches = nochesBaseFallback;

  const total = paquete.precioBase * pasajeros * noches;

  const totalSpan = document.getElementById(`total-${id}`);
  if (totalSpan) totalSpan.textContent = total;

  return { pasajeros, noches, total };
}

contenedor.addEventListener("click", (e) => {
  const btn = e.target;
  const id = Number(btn.dataset.id);
  if (!id) return;

  // SUMAR pasajeros
  if (btn.classList.contains("btn-sumar-pasajeros")) {
    const span = document.getElementById(`pasajeros-${id}`);
    span.textContent = parseInt(span.textContent) + 1;
    actualizarTotalUI(id);
  }

  // RESTAR pasajeros
  if (btn.classList.contains("btn-restar-pasajeros")) {
    const span = document.getElementById(`pasajeros-${id}`);
    const value = parseInt(span.textContent);
    if (value > 1) span.textContent = value - 1;
    actualizarTotalUI(id);
  }

  // SUMAR noches
  if (btn.classList.contains("btn-sumar-noches")) {
    const span = document.getElementById(`noches-${id}`);
    span.textContent = parseInt(span.textContent) + 1;
    actualizarTotalUI(id);
  }

  // RESTAR noches
  if (btn.classList.contains("btn-restar-noches")) {
    const span = document.getElementById(`noches-${id}`);
    const value = parseInt(span.textContent);
    if (value > 1) span.textContent = value - 1;
    actualizarTotalUI(id);
  }

  // AGREGAR A RESERVA
  if (btn.classList.contains("btn-reserva")) {
    const paquete = paquetes.find(p => p.id === id);
    if (!paquete) return;

    const { pasajeros, noches, total } = actualizarTotalUI(id, paquete.nochesBase);

    const carrito = getData(KEY_CARRITO);
    carrito.push({
      id: paquete.id,
      nombre: paquete.nombre,
      categoria: paquete.categoria,
      precioBase: paquete.precioBase,
      pasajeros,
      noches,
      total
    });

    setData(KEY_CARRITO, carrito);
    alert("Paquete agregado a la reserva");
  }
});
