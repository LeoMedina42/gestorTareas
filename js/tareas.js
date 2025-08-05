export default class Tarea {
  #id;
  #descripcion;
  #estado;
  #creada;
  #modificada;

  constructor(descripcion) {
    const ahora = new Date();
    this.#id = Date.now();
    this.#descripcion = descripcion;
    this.#estado = "creada";
    this.#creada = ahora.toISOString();
    this.#modificada = ahora.toISOString();
  }

  // Getters
  get id() {
    return this.#id;
  }

  get descripcion() {
    return this.#descripcion;
  }

  get estado() {
    return this.#estado;
  }

  get creada() {
    return this.#creada;
  }

  get modificada() {
    return this.#modificada;
  }

  // Setters
  set descripcion(nuevaDesc) {
    this.#descripcion = nuevaDesc;
    this.#modificada = new Date().toISOString();
  }

  set estado(nuevoEstado) {
    this.#estado = nuevoEstado;
    this.#modificada = new Date().toISOString();
  }

  // Método para alternar el estado
  alternarEstado() {
    if (this.#estado === "creada") this.#estado = "en proceso";
    else if (this.#estado === "en proceso") this.#estado = "terminada";
    else this.#estado = "creada";
    this.#modificada = new Date().toISOString();
  }

  // Serializar para guardar en localStorage
  toJSON() {
    return {
      id: this.#id,
      descripcion: this.#descripcion,
      estado: this.#estado,
      creada: this.#creada,
      modificada: this.#modificada
    };
  }

  // Crear una instancia desde JSON (objeto plano)
  static desdeJSON(obj) {
    const t = new Tarea(obj.descripcion);
    t.#id = obj.id;
    t.#estado = obj.estado;
    t.#creada = obj.creada;
    t.#modificada = obj.modificada;
    return t;
  }
}
