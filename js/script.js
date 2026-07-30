// CONTADOR DE DÍAS (con animación de conteo)
const fechaInicio = new Date("2026-04-30T00:00:00");
const hoy = new Date();
const diferencia = hoy - fechaInicio;
const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
const diasJuntos = document.getElementById("diasJuntos");

if (diasJuntos && dias <= 0) {
    diasJuntos.textContent = "0";
} else if (diasJuntos) {
    let contadorActual = 0;
    const pasoTiempo = Math.max(15, Math.floor(1200 / dias));
    const intervaloConteo = setInterval(() => {
        contadorActual++;
        diasJuntos.textContent = contadorActual;
        if (contadorActual >= dias) {
            diasJuntos.textContent = dias;
            clearInterval(intervaloConteo);
        }
    }, pasoTiempo);
}

// CORAZONES (mezcla de rojo, morado y rosa)
const coloresCorazon = ["❤️", "💜", "💗"];
function crearCorazon() {
    const corazon = document.createElement("div");
    corazon.classList.add("heart");
    corazon.innerHTML = coloresCorazon[Math.floor(Math.random() * coloresCorazon.length)];
    corazon.style.left = Math.random() * 100 + "vw";
    corazon.style.fontSize = Math.random() * 20 + 15 + "px";
    corazon.style.animationDuration = Math.random() * 3 + 4 + "s";
    document.body.appendChild(corazon);
    setTimeout(() => {
        corazon.remove();
    }, 7000);
}

setInterval(crearCorazon, 450);

// VISOR DE IMÁGENES
const visor = document.getElementById("visor");
const contenidoVisor = document.getElementById("contenidoVisor");
const cerrar = document.getElementById("cerrar");

// IMÁGENES
document.querySelectorAll(".galeria-collage img").forEach(img => {
    img.addEventListener("click", () => {
        visor.style.display = "flex";
        contenidoVisor.innerHTML = `
            <img src="${img.src}">
        `;
    });
});

// VIDEOS

document.querySelectorAll(".galeria-collage video").forEach(video => {
    video.addEventListener("click", () => {
        visor.style.display = "flex";
        contenidoVisor.innerHTML = `
            <video src="${video.src}" controls autoplay></video>
        `;
    });
});

// CERRAR
cerrar.addEventListener("click", () => {
    visor.style.display = "none";
    contenidoVisor.innerHTML = "";
});
// cerrar al tocar fondo oscuro

visor.addEventListener("click", (e) => {
    if (e.target === visor) {
        visor.style.display = "none";
        contenidoVisor.innerHTML = "";
    }
});