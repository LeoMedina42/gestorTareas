export default class Tarea {
  #id;
  #descripcion;
  #estado;
  #modificada;

  constructor(descripcion) {
    this.#id = crypto.randomUUID();
    this.#descripcion = descripcion;
    this.#estado = "pendiente";
    this.#modificada = new Date().toISOString();
  }

  get id() {
    return this.#id;
  }

  get descripcion() {
    return this.#descripcion;
  }

  set descripcion(nuevaDesc) {
    this.#descripcion = nuevaDesc;
    this.#modificada = new Date().toISOString();
  }

  get estado() {
    return this.#estado;
  }

  get modificada() {
    return this.#modificada;
  }

alternarEstado() {
  switch (this.#estado) {
    case "pendiente":
      this.#estado = "en proceso";
      break;
    case "en proceso":
      this.#estado = "terminada";
      break;
    case "terminada":
      this.#estado = "pendiente";
      break;
  }
  this.#modificada = new Date().toISOString();
}


  toJSON() {
    return {
      id: this.#id,
      descripcion: this.#descripcion,
      estado: this.#estado,
      modificada: this.#modificada
    };
  }

  static desdeJSON(obj) {
    const tarea = new Tarea(obj.descripcion);
    tarea.#id = obj.id;
    tarea.#estado = obj.estado;
    tarea.#modificada = obj.modificada;
    return tarea;
  }
}
