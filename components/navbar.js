const navElements = [
  { title: "contacto",   link: "/index.html" },
  { title: "Brasil", link: "/pages/brasil/brasil.html" },
  { title: "España", link: "/pages/espana/espana.html" },
  { title: "Perú",   link: "/pages/peru/peru.html" }
];

export const navbar = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">

    <a class="navbar-brand fw-bold" href="/index.html">✈️ Turismo</a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
      data-bs-target="#navbarNav" aria-controls="navbarNav"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        ${navElements.map(el => `
          <li class="nav-item">
            <a class="nav-link" href="${el.link}">${el.title}</a>
          </li>
        `).join("")}
      </ul>

      <div class="ms-auto d-flex align-items-center gap-3">
        <a href="/pages/carrito/carrito.html" class="btn btn-outline-light">
          <i class="bi bi-bag-check fs-5"></i>
        </a>

        <a href="/pages/login/login.html" class="btn btn-success" id="btn-login">
          Login
        </a>

        <button class="btn btn-danger" id="btn-logout">
          Salir
        </button>
      </div>
    </div>
  </div>
</nav>
`;
