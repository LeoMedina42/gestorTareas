import Tarea from './tareas.js';

// 1. DOM
const inputTarea = document.getElementById("nuevaTarea");
const btnAgregar = document.getElementById("btnAgregar");
const listaTareas = document.getElementById("listaTareas");
const listaTerminadas = document.getElementById("listaTerminadas");
const ultimaHora = document.getElementById("ultimaHora");

// 2. Inicializamos el array de tareas desde localStorage
let tareas = (JSON.parse(localStorage.getItem("tareas")) || []).map(Tarea.desdeJSON);

// 3. Guardar tareas en localStorage
function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas.map(t => t.toJSON())));
}

// 4. Mostrar hora de última modificacion 
function mostrarHoraAccion() {
  const ahora = new Date();
  ultimaHora.textContent = ahora.toLocaleString();
}

// 5. Renderizar tareas
function renderizarTareas() {
  listaTareas.innerHTML = "";
  listaTerminadas.innerHTML = "";

  tareas.forEach(tarea => {
    const card = document.createElement("div");
    card.className = "card p-2";

    const titulo = document.createElement("h5");
    titulo.textContent = tarea.descripcion;
    card.appendChild(titulo);

    const estado = document.createElement("span");
    estado.className = "badge mb-2";

    switch (tarea.estado) {
      case "pendiente":
        estado.classList.add("bg-secondary");
        break;
      case "en proceso":
        estado.classList.add("bg-warning");
        break;
      case "terminada":
        estado.classList.add("bg-success");
        break;
    }
    estado.textContent = tarea.estado;
    card.appendChild(estado);

    const hora = document.createElement("p");
    hora.className = "mb-1 text-muted";
    hora.textContent = `Última modificación: ${new Date(tarea.modificada).toLocaleString()}`;
    card.appendChild(hora);

    const contenedorBotones = document.createElement("div");
    contenedorBotones.className = "d-flex gap-2 flex-wrap";

    const btnEstado = document.createElement("button");
    btnEstado.className = "btn btn-info btn-sm";
    btnEstado.addEventListener("click", () => cambiarEstado(tarea.id));

    switch (tarea.estado) {
      case "pendiente":
        btnEstado.textContent = "Comenzar";
        break;
      case "en proceso":
        btnEstado.textContent = "Finalizar";
        break;
      case "terminada":
        btnEstado.textContent = "Reiniciar";
        break;
    }

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "btn btn-warning btn-sm";
    btnEditar.addEventListener("click", () => editarTarea(tarea.id));

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "btn btn-danger btn-sm";
    btnEliminar.addEventListener("click", () => eliminarTarea(tarea.id));

    contenedorBotones.appendChild(btnEstado);
    contenedorBotones.appendChild(btnEditar);
    contenedorBotones.appendChild(btnEliminar);

    card.appendChild(contenedorBotones);

    if (tarea.estado === "terminada") {
      listaTerminadas.appendChild(card);
    } else {
      listaTareas.appendChild(card);
    }
  });
}

// 6. Agregar tarea
function agregarTarea() {
  const descripcion = inputTarea.value.trim();
  if (!descripcion) {
    return Swal.fire({
      icon: "error",
      title: "Oops..",
      text: "Ingrese una tarea para poder continuar",
    });
  }

  const nueva = new Tarea(descripcion);
  tareas.push(nueva);
  guardarTareas();
  renderizarTareas();
  mostrarHoraAccion();
  inputTarea.value = "";
}

// 7. Cambiar estado
function cambiarEstado(id) {
  const tarea = tareas.find(t => t.id === id);
  if (!tarea) return;
  tarea.alternarEstado();
  guardarTareas();
  renderizarTareas();
  mostrarHoraAccion();
}

// 8. Eliminar tarea
function eliminarTarea(id) {
  tareas = tareas.filter(t => t.id !== id);
  guardarTareas();
  renderizarTareas();
  mostrarHoraAccion();
}

// 9. Editar tarea
function editarTarea(id) {
  const tarea = tareas.find(t => t.id === id);
  if (!tarea) return;

  const nuevaDesc = prompt("Editar tarea:", tarea.descripcion);
  if (nuevaDesc && nuevaDesc.trim() !== "") {
    tarea.descripcion = nuevaDesc.trim();
    guardarTareas();
    renderizarTareas();
    mostrarHoraAccion();
  }
}

// 10. Ordenar tareas por fecha modificada
function ordenarTareasPorFecha() {
  tareas.sort((a, b) => new Date(b.modificada) - new Date(a.modificada));
}

// 11. Inicialización
btnAgregar.addEventListener("click", e => {
  e.preventDefault();
  agregarTarea();
});

document.addEventListener("DOMContentLoaded", () => {
  ordenarTareasPorFecha();
  renderizarTareas();
  mostrarHoraAccion();
});
