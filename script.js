document.querySelectorAll(".img1 img").forEach((imagen) => {
    imagen.addEventListener("click", () => {
        const descripcion = imagen.parentElement.querySelector(".descripcion");
        descripcion.classList.toggle("mostrar");
    });
});