 export const cardComponent = (paquete) => {
  return `
    <div class="col">
      <div class="card h-100">

        <img src="${paquete.img}" alt="${paquete.nombre}">

        <div class="card-footer">

          <h5 class="card-title mt-2">${paquete.nombre}</h5>
          <p class="card-text">${paquete.descripcion}</p>

          <!-- PRECIO POR PERSONA -->
          <div class="d-flex justify-content-between align-items-center mt-2">
            <p class="mb-0 fw-bold">Precio x persona:</p>
            <p class="mb-0 fw-bold">$${paquete.precioBase}</p>
          </div>

          <!-- PASAJEROS + NOCHES -->
          <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">

            <!-- PASAJEROS -->
            <div class="d-flex align-items-center gap-2">
              <span class="small fw-semibold">Pasajeros:</span>

              <button 
                type="button" 
                class="btn btn-sm btn-outline-secondary btn-restar-pasajeros"
                data-id="${paquete.id}">
                -
              </button>

              <span class="fw-semibold" id="pasajeros-${paquete.id}">1</span>

              <button 
                type="button" 
                class="btn btn-sm btn-outline-secondary btn-sumar-pasajeros"
                data-id="${paquete.id}">
                +
              </button>
            </div>

            <!-- NOCHES -->
            <div class="d-flex align-items-center gap-2">
              <span class="small fw-semibold">Noches:</span>

              <button 
                type="button" 
                class="btn btn-sm btn-outline-secondary btn-restar-noches"
                data-id="${paquete.id}">
                -
              </button>

              <span class="fw-semibold" id="noches-${paquete.id}">
                ${paquete.nochesBase ?? 1}
              </span>

              <button 
                type="button" 
                class="btn btn-sm btn-outline-secondary btn-sumar-noches"
                data-id="${paquete.id}">
                +
              </button>
            </div>

          </div>

          <!-- TOTAL -->
          <div class="d-flex justify-content-between align-items-center mt-2">
            <p class="mb-0 fw-bold">Total:</p>
            <p class="mb-0 fw-bold" id="total-${paquete.id}">
              $${paquete.precioBase}
            </p>
          </div>

          <!-- AGREGAR A RESERVA -->
          <button 
            type="button" 
            class="btn btn-${paquete.btnColor ?? "primary"} w-100 mt-3 btn-reserva"
            data-id="${paquete.id}">
            Agregar a reserva
          </button>

        </div>
      </div>
    </div>
  `
}

