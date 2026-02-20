import { navbar } from "./components/navbar.js";


const header = document.querySelector("header");
if (header) header.innerHTML = navbar;


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
  
  window.location.href = new URL(pathFromRoot, import.meta.url).href;
}


//  Toggle botones Login/Salir según sesión

function syncAuthUI() {
  const user = getUser();

  
  const btnLogout = document.getElementById("btn-logout");

  // Si no existe 
  if (!btnLogout) return;

  
  const loginLink = document.querySelector('a[href="./pages/login/login.html"]');

  if (user) {
    if (loginLink) loginLink.classList.add("d-none");
    btnLogout.classList.remove("d-none");
  } else {
    if (loginLink) loginLink.classList.remove("d-none");
    btnLogout.classList.add("d-none");
  }
}


//  Logout

function setupLogout() {
  const btnLogout = document.getElementById("btn-logout");
  if (!btnLogout) return;

  btnLogout.addEventListener("click", () => {
    clearUser();
    goTo("./index.html");
  });
}


//  Login (solo si existe el form)

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

       
        goTo("./index.html");
        
      } else {
        alert("Credenciales inválidas. Probá de nuevo.");
      }
    } catch (err) {
      console.error(err);
      alert("Error al intentar iniciar sesión.");
    }
  });
}



setupLogout();
setupLogin();
syncAuthUI();
