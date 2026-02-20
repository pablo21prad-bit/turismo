import { navbar } from "./components/navbar.js";

// ================================
// 1) Render NAVBAR
// ================================
const header = document.querySelector("header");
if (header) header.innerHTML = navbar;

// ================================
// 2) Helpers de sesión + navegación
// ================================
const KEY_USER = "userdata";

function getUser() {
  try {
    const raw = sessionStorage.getItem(KEY_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setUser(user) {
  sessionStorage.setItem(KEY_USER, JSON.stringify(user));
}

function clearUser() {
  sessionStorage.removeItem(KEY_USER);
}

function goTo(pathFromRoot) {
  // pathFromRoot ejemplo: "./index.html", "./pages/carrito/carrito.html"
  window.location.href = new URL(pathFromRoot, import.meta.url).href;
}

// ================================
// 3) Toggle botones Login/Salir según sesión
// ================================
function syncAuthUI() {
  const user = getUser();

  // En el navbar que te pasé:
  // - el botón Login es un <a> con href a login.html (no tiene id)
  // - el botón Salir es <button id="btn-logout">
  // Si querés control total, podés agregar id="btn-login" en el navbar.
  const btnLogout = document.getElementById("btn-logout");

  // Si no existe (por ejemplo en alguna página sin navbar), salimos
  if (!btnLogout) return;

  // Intentamos encontrar el botón Login por su href (sin romper si cambia)
  const loginLink = document.querySelector('a[href="./pages/login/login.html"]');

  if (user) {
    if (loginLink) loginLink.classList.add("d-none");
    btnLogout.classList.remove("d-none");
  } else {
    if (loginLink) loginLink.classList.remove("d-none");
    btnLogout.classList.add("d-none");
  }
}

// ================================
// 4) Logout
// ================================
function setupLogout() {
  const btnLogout = document.getElementById("btn-logout");
  if (!btnLogout) return;

  btnLogout.addEventListener("click", () => {
    clearUser();
    goTo("./index.html");
  });
}

// ================================
// 5) Login (solo si existe el form)
// ================================
function setupLogin() {
  const form = document.getElementById("Login");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailEl = document.getElementById("email");
    const passEl = document.getElementById("pass");

    const useremail = (emailEl?.value || "").trim();
    const userPass = (passEl?.value || "").trim();

    if (!useremail || !userPass) {
      alert("Completá email y contraseña.");
      return;
    }

    try {
      // ✅ Siempre apunta al data/users.json de la raíz del proyecto
      const usersUrl = new URL("./data/users.json", import.meta.url);
      const res = await fetch(usersUrl);

      if (!res.ok) {
        alert("No se pudo cargar users.json (ruta o servidor).");
        return;
      }

      const users = await res.json();

      const user = users.find(
        (u) => u.email === useremail && u.pass === userPass
      );

      if (user) {
        setUser(user);

        // Redirección post-login (elegí una)
        // 1) Volver al inicio:
        goTo("./index.html");
        // 2) O mandarlo directo a Brasil:
        // goTo("./pages/brasil/brasil.html");
      } else {
        alert("Credenciales inválidas. Probá de nuevo.");
      }
    } catch (err) {
      console.error(err);
      alert("Error al intentar iniciar sesión.");
    }
  });
}

// ================================
// 6) Init
// ================================
setupLogout();
setupLogin();
syncAuthUI();
