document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formRegistro");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validación HTML5
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const usuario = {
      nombre: document.getElementById("txtNombre").value.trim(),
      apellido: document.getElementById("txtApellido").value.trim(),
      email: document.getElementById("txtEmail").value.trim(),
      fechaNacimiento: document.getElementById("txtFechaNacimiento").value
    };

    // Simulación de registro
    sessionStorage.setItem("userdata", JSON.stringify(usuario));

    alert("Registro realizado con éxito. Sesión iniciada.");

    // Redirigir al index (ruta segura)
    window.location.href = "../../index.html";
  });
});
