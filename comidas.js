const carrito = new Map();
const elementosCarrito = document.getElementById("elementos-carrito");
const totalCarrito = document.getElementById("total-carrito");
const botonComprar = document.getElementById("boton-comprar");
const mensajeCompra = document.getElementById("mensaje-compra");

function formatoPrecio(monto) {
    return `Bs ${monto.toLocaleString("es-BO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    })}`;
}

function mostrarCarrito() {
    elementosCarrito.replaceChildren();

    if (carrito.size === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "El carrito está vacío.";
        elementosCarrito.append(mensaje);
        totalCarrito.textContent = formatoPrecio(0);
        botonComprar.disabled = true;
        return;
    }

    botonComprar.disabled = false;
    let total = 0;

    carrito.forEach((plato, id) => {
        const fila = document.createElement("div");
        fila.className = "producto-carrito";
        const detalle = document.createElement("p");
        detalle.textContent = `${plato.nombre}: ${plato.cantidad} x ${formatoPrecio(plato.precio)} = ${formatoPrecio(plato.precio * plato.cantidad)}`;

        const botonRestar = document.createElement("button");
        botonRestar.type = "button";
        botonRestar.textContent = "-";
        botonRestar.setAttribute("aria-label", `Quitar una unidad de ${plato.nombre}`);
        botonRestar.addEventListener("click", () => {
            if (plato.cantidad === 1) {
                carrito.delete(id);
            } else {
                plato.cantidad -= 1;
            }
            mostrarCarrito();
        });

        const botonSumar = document.createElement("button");
        botonSumar.type = "button";
        botonSumar.textContent = "+";
        botonSumar.setAttribute("aria-label", `Agregar una unidad de ${plato.nombre}`);
        botonSumar.addEventListener("click", () => {
            plato.cantidad += 1;
            mostrarCarrito();
        });

        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", () => {
            carrito.delete(id);
            mostrarCarrito();
        });

        fila.append(detalle, botonRestar, botonSumar, botonEliminar);
        elementosCarrito.append(fila);
        total += plato.precio * plato.cantidad;
    });

    totalCarrito.textContent = formatoPrecio(total);
}

document.querySelectorAll(".agregar-carrito").forEach((boton) => {
    boton.addEventListener("click", () => {
        const id = boton.dataset.id;
        const plato = carrito.get(id);

        if (plato) {
            plato.cantidad += 1;
        } else {
            carrito.set(id, {
                nombre: boton.dataset.nombre,
                precio: Number(boton.dataset.precio),
                cantidad: 1
            });
        }

        mensajeCompra.textContent = "";
        mostrarCarrito();
    });
});

botonComprar.addEventListener("click", () => {
    if (carrito.size === 0) {
        return;
    }

    let total = 0;
    carrito.forEach((plato) => {
        total += plato.precio * plato.cantidad;
    });

    carrito.clear();
    mostrarCarrito();
    mensajeCompra.textContent = `Compra de demostración por ${formatoPrecio(total)}. No se procesó ningún pago real.`;
});

mostrarCarrito();