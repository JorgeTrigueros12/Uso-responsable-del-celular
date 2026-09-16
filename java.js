document.addEventListener("DOMContentLoaded", () => {

  // ACORDEÓN
  const botones = document.querySelectorAll(".custom-accordion-btn");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const contenido = boton.nextElementSibling;
      const abierto = boton.classList.contains("active");

      botones.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-expanded", "false");
        b.nextElementSibling?.classList.remove("show");
      });

      if (!abierto) {
        boton.classList.add("active");
        boton.setAttribute("aria-expanded", "true");
        contenido.classList.add("show");
      }
    });
  });


  // TEST
  const form = document.getElementById("formTest");

  if (form) {
    const resultado = document.getElementById("resultadoTest");
    const titulo = document.getElementById("tituloResultado");
    const descripcion = document.getElementById("descripcionResultado");
    const icono = document.getElementById("iconoResultado");
    const barra = document.getElementById("barraProgreso");
    const progreso = document.getElementById("textoProgreso");
    const preguntas = ["p1", "p2", "p3"];

    function actualizarProgreso() {
      const respondidas = preguntas.filter(
        p => document.querySelector(`input[name="${p}"]:checked`)
      ).length;

      barra.style.width = `${(respondidas / preguntas.length) * 100}%`;
      progreso.textContent = `${respondidas} de 3`;
    }

    form.querySelectorAll('input[type="radio"]')
      .forEach(radio => radio.addEventListener("change", actualizarProgreso));

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const respuestas = preguntas.map(
        p => document.querySelector(`input[name="${p}"]:checked`)
      );

      if (respuestas.some(r => !r)) {
        alert("Por favor, responde todas las preguntas antes de obtener tu resultado.");
        return;
      }

      const puntaje = respuestas.reduce(
        (total, respuesta) => total + parseInt(respuesta.value),
        0
      );

      resultado.className = "mt-4 p-4 text-center shadow";

      if (puntaje <= 4) {
        resultado.classList.add("bg-success", "text-white");
        icono.textContent = "😊";
        titulo.textContent = "Uso saludable";
        descripcion.textContent =
          "Tus respuestas muestran buenos hábitos de uso del celular. Continúa manteniendo un equilibrio entre la tecnología y tus actividades diarias.";

      } else if (puntaje <= 7) {
        resultado.classList.add("bg-warning", "text-dark");
        icono.textContent = "🙂";
        titulo.textContent = "Uso moderado";
        descripcion.textContent =
          "Tus hábitos son aceptables, pero existen algunos momentos en los que podrías reducir el uso del celular y establecer límites.";

      } else {
        resultado.classList.add("bg-danger", "text-white");
        icono.textContent = "📱";
        titulo.textContent = "Uso elevado";
        descripcion.textContent =
          "Tus respuestas muestran hábitos de uso que podrías revisar. Puedes consultar nuestras recomendaciones para encontrar estrategias que te ayuden a organizar mejor tu tiempo.";
      }

      resultado.classList.remove("d-none");
      resultado.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }


  // COMENTARIOS
  const commentForm = document.getElementById("commentForm");

  if (commentForm) {
    const lista = document.getElementById("listaComentarios");
    const mensaje = document.getElementById("mensajeComentario");

    // Mensajes de error
    const errorNombre = document.getElementById("errorNombre");
    const errorComentario = document.getElementById("errorComentario");

    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const comentario = document.getElementById("comentario").value.trim();

      // Limpiar mensajes anteriores
      errorNombre.textContent = "";
      errorComentario.textContent = "";

      // Validar nombre
      if (!nombre) {
        errorNombre.textContent = "Rellena este apartado para poder enviar el comentario.";
        return;
      }
      if (!comentario) {
        errorComentario.textContent = "Rellena este apartado para que se pueda enviar tu mensaje.";
        return;
      }
      const nuevo = document.createElement("div");
      nuevo.classList.add("comment-item");

      nuevo.innerHTML = `
        <div class="comment-name">👤 ${nombre}</div>
        <p class="comment-text mt-2">${comentario}</p>
      `;

      lista.prepend(nuevo);

      // Limpiar formulario
      commentForm.reset();

      // Mostrar mensaje de comentario enviado
      mensaje.classList.remove("d-none");

      setTimeout(() => mensaje.classList.add("d-none"), 3000);
    });
  }


  // BOTÓN VOLVER ARRIBA
  const btnArriba = document.getElementById("btnArriba");

  if (btnArriba) {
    window.addEventListener("scroll", () => {
      btnArriba.style.display = window.scrollY > 300 ? "flex" : "none";
    });

    btnArriba.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

});