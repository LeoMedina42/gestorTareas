import Tarea from './tareas.js';
// 1. DOM
const inputTarea = document.getElementById("nuevaTarea");
const btnAgregar = document.getElementById("btnAgregar");
const listaTareas = document.getElementById("listaTareas");

// 2. Inicializamos el array de tareas desde localStorage
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// 3. Función para crear una nueva tarea
function crearTarea(descripcion) {
  const ahora = new Date();
  return {
    id: Date.now(), // id único
    descripcion: descripcion,
    estado: "creada",
    creada: ahora.toISOString(),
    modificada: ahora.toISOString(),
  };
}

// 4. Guardar tareas en localStorage
function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// 5. Renderizar todas las tareas en pantalla
function renderizarTareas() {
  listaTareas.innerHTML = ""; // limpiamos la lista

  tareas.forEach((tarea) => {
    const li = document.createElement("li");
    li.classList.add("mb-2");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarea.estado === "terminada";
    checkbox.classList.add("form-check-input", "me-2");
    checkbox.addEventListener("change", () => cambiarEstado(tarea.id));

    const span = document.createElement("span");
    span.textContent = tarea.descripcion + ` [${tarea.estado}]`;
    span.classList.add("me-2");

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
    btnEliminar.addEventListener("click", () => eliminarTarea(tarea.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnEliminar);

    listaTareas.appendChild(li);
  });
}

// 6. Función para agregar una nueva tarea
function agregarTarea() {
  const descripcion = inputTarea.value.trim();
  if (descripcion === "") return alert("escriba una tarea");

  const nueva = crearTarea(descripcion);
  tareas.push(nueva);
  guardarTareas();
  renderizarTareas();
  inputTarea.value = "";
}

// 7. Cambiar estado de tarea (ciclo creado → en proceso → terminada)
function cambiarEstado(id) {
  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) return;

  if (tarea.estado === "creada") tarea.estado = "en proceso";
  else if (tarea.estado === "en proceso") tarea.estado = "terminada";
  else tarea.estado = "creada";

  tarea.modificada = new Date().toISOString();
  guardarTareas();
  renderizarTareas();
}

// 8. Eliminar una tarea por id, uso t como una variable temporal
function eliminarTarea(id) {
  tareas = tareas.filter((t) => t.id !== id);
  guardarTareas();
  renderizarTareas();
}

// 9. Event listener para botón agregar
document.addEventListener("DOMContentLoaded", () => {
  renderizarTareas();
});

btnAgregar.addEventListener("click", (e) => {
  e.preventDefault();
  agregarTarea();
});
