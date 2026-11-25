const formulario = document.getElementById("formulario-regalos");
const entradaRegalo = document.getElementById("regalo");
const listaRegalos = document.getElementById("lista-regalos");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombreRegalo = entradaRegalo.value.trim();

    if (!nombreRegalo) {
        entradaRegalo.setCustomValidity("Escribe el nombre de un regalo.");
        entradaRegalo.reportValidity();
        return;
    }

    entradaRegalo.setCustomValidity("");

    const elemento = document.createElement("div");
    elemento.setAttribute("role", "listitem");

    const nombre = document.createElement("span");
    nombre.textContent = nombreRegalo;

    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.textContent = "Eliminar";
    botonEliminar.setAttribute("aria-label", `Eliminar ${nombreRegalo}`);
    botonEliminar.addEventListener("click", () => elemento.remove());

    elemento.append(nombre, " ", botonEliminar);
    listaRegalos.append(elemento);

    entradaRegalo.value = "";
    entradaRegalo.focus();
});

entradaRegalo.addEventListener("input", () => {
    entradaRegalo.setCustomValidity("");
});