

// ========================= */
// NIVELES DEL JUEGO (30 NIVELES DE AUDIO)
// ========================= */
const nivelesJuegoOriginales = [
    // 15 Niveles de Audio (A1 a A15)
    { tipo: "audio", archivo: "Audio/A1.mp3", acertijo: "A ver si te acuerdas... ¿En qué fecha exactita arrancó todo lo nuestro?", opciones: ["14 de febrero", "30 de abril", "15 de mayo", "01 de junio"], correcta: 1 },
    { tipo: "audio", archivo: "Audio/A2.mp3", acertijo: "¿Cuál fue esa jugada o momento clave que nos dio la confianza entera al conocernos?", opciones: ["Cuando nos quedamos en silencio", "Al momento de sacar una foto tuya", "Cuando jugamos monopolio", "Hablando de la universidad"], correcta: 1 },
    { tipo: "audio", archivo: "Audio/A3.mp3", acertijo: "De toda la lista infinita de postres, ¿cuál es el que de verdad me vuelve loco?", opciones: ["Pie de limón", "Helado de vainilla", "Torta de tres leches", "Salchipapa"], correcta: 2 },
    { tipo: "audio", archivo: "Audio/A4.mp3", acertijo: "Completa la frase : Hasta el infinito y...", opciones: ["más allá", "por siempre", "te amaré", "encontrarnos"], correcta: 0 },
    { tipo: "audio", archivo: "Audio/A5.mp3", acertijo: "¿Cuál de estas palabras se quedó pegada en nuestro vocabulario diario y es muy nuestra?", opciones: ["Bacán", "Elegante", "Genial", "Top"], correcta: 1 },
    { tipo: "audio", archivo: "Audio/A6.mp3", acertijo: "¿Cuál fue el primer sitio al que fuimos a dar una vuelta lejos de la U?", opciones: ["El centro", "El Parque de las Aguas (Piura)", "Real Plaza", "Un parque cualquiera"], correcta: 1 },
    { tipo: "audio", archivo: "Audio/A7.mp3", acertijo: "Entre gustos y colores, ¿cuál dirías que es mi color favorito fijo?", opciones: ["Rojo y negro", "Azul y verde", "Amarillo y blanco", "Gris y plomo"], correcta: 1 },
    { tipo: "audio", archivo: "Audio/A8.mp3", acertijo: "Hicimos un detalle manual combinando dos colores (yo el azul y tú el rosa). ¿Qué cosa fue?", opciones: ["Una maqueta", "El detalle de las pinturas", "Un cartel pintado", "Una caja decorada"], correcta: 1 },
    { tipo: "audio", archivo: "Audio/A9.mp3", acertijo: "Haciendo memoria del polo que me diste de regalo... ¿de qué color era?", opciones: ["Negro", "Plomo", "Color azul", "Blanco"], correcta: 2 },
    { tipo: "audio", archivo: "Audio/A10.mp3", acertijo: "¿Qué fue lo primero físico que te entregué como detalle al principio?", opciones: ["Un peluche", "Un chocolate", "Flores o rosas", "Una carta"], correcta: 2 },
    { tipo: "audio", archivo: "Audio/A11.mp3", acertijo: "Al inicio, ¿con qué apodo de confianza te picaba o te llamaba más?", opciones: ["Chulacas", "Loki", "Flaca", "Chiquita"], correcta: 0 },
    { tipo: "audio", archivo: "Audio/A12.mp3", acertijo: "Cuando te di un detalle con moño, ¿qué tono exacto era?", opciones: ["Rojo entero", "Color conchivino", "Rosado bajito", "Morado oscuro"], correcta: 1 },
    { tipo: "audio", archivo: "Audio/A13.mp3", acertijo: "De toda la gente cercana, ¿quién fue la primera de mi entorno en verte en persona?", opciones: ["Danixa", "Vicky", "Cualquier amiga", "Nadie"], correcta: 1 },
    { tipo: "audio", archivo: "Audio/A14.mp3", acertijo: "El peluche que te di para que me recuerdes, ¿cómo se llama?", opciones: ["Teddy", "Snoopy", "Oso", "Bobby"], correcta: 1 },
    { tipo: "audio", archivo: "Audio/A15.mp3", acertijo: "¿Cuál fue aquel momento que nos asustó un poco al principio pero que hoy recordamos?", opciones: ["JN", "XD", "F", "OK"], correcta: 0 },

    // 15 Niveles de Audio (A16 a A30)
    { tipo: "audio", archivo: "Audio/A16.mp3", acertijo: "Si de comer rico se trata, ¿cuál es mi plato favorito que nunca falla?", opciones: ["Seco de chavelo", "Fideos verdes con un pollito hornado", "Arroz con pato", "Ceviche"], correcta: 1 },
    { tipo: "audio", archivo: "Audio/A17.mp3", acertijo: "¿Qué día nos tocó quemar pestaña hablando serio de lo nuestro antes de formalizar?", opciones: ["14 de febrero", "18 de abril", "30 de abril", "1 de mayo"], correcta: 1 },
    { tipo: "audio", archivo: "Audio/A18.mp3", acertijo: "Cuando te veo y te jorobo un rato, ¿qué piropo tierno suelo soltarte?", opciones: ["Cachetitos de bombón o antenitas", "Mi princesita", "Ojos de lucero", "Cosita hermosa"], correcta: 0 },
    { tipo: "audio", archivo: "Audio/A19.mp3", acertijo: "Para nuestro segundo aniversario me diste algo que me gustó tanto que hasta quiero volver a pintar. ¿Qué fue?", opciones: ["Un lienzo pintado", "Un cuadernillo de dibujos personalizados", "Un cuadro impreso", "Un bloc de notas"], correcta: 1 },
    { tipo: "audio", archivo: "Audio/A20.mp3", acertijo: "Aquel día que andabas con antojo de golosinas, ¿qué te compré exacto?", opciones: ["Un chocolate blanco y un Pulp", "Chocolates y galletas", "Un chupete", "Caramelos"], correcta: 0 },
    { tipo: "audio", archivo: "Audio/A21.mp3", acertijo: "En la U, ¿cuál es nuestra base secreta fija para sentarnos a conversar?", opciones: ["La cafetería", "Las bancas del jardín", "Piso -1, fija", "La biblioteca"], correcta: 2 },
    { tipo: "audio", archivo: "Audio/A22.mp3", acertijo: "Pensando a futuro y en planes locos, ¿dónde nos visualizamos viviendo?", opciones: ["En Piura", "En Máncora", "En Órganos", "En Lima"], correcta: 2 },
    { tipo: "audio", archivo: "Audio/A23.mp3", acertijo: "Para el segundo aniversario, ¿con qué tipo de detalle te caí?", opciones: ["Una caja de chocolates con golosinas", "Un peluche enorme", "Una carta larga", "Un polo"], correcta: 0 },
    { tipo: "audio", archivo: "Audio/A24.mp3", acertijo: "Lo que más mantenemos firme entre los dos para que funcione es...", opciones: ["Decirnos las cosas con sinceridad", "Hablar todo el día", "Mandarnos estados", "Escribirnos textos"], correcta: 0 },
    { tipo: "audio", archivo: "Audio/A25.mp3", acertijo: "Haciendo cuentas de la fecha oficial que celebramos, ¿cuál es?", opciones: ["30 de abril", "15 de mayo", "30 de marzo", "18 de abril"], correcta: 0 },
    { tipo: "audio", archivo: "Audio/A26.mp3", acertijo: "Cada vez que nos vemos después de un rato, ¿qué es lo primero que sale natural?", opciones: ["Abrazarnos fuerte", "Saludarnos de lejos", "Correr", "Hablar rápido"], correcta: 0 },
    { tipo: "audio", archivo: "Audio/A27.mp3", acertijo: "Cuando hay algún enojo o rollo tonto, ¿cómo lo solucionamos?", opciones: ["Conversando con calma", "Dejándolo pasar", "Enojados horas", "No viéndonos"], correcta: 0 },
    { tipo: "audio", archivo: "Audio/A28.mp3", acertijo: "Si tuviera que asociar un olor, ¿cuál sería?", opciones: ["A café cargado", "A tu perfume de siempre", "A flores", "A vainilla"], correcta: 1 },
    { tipo: "audio", archivo: "Audio/A29.mp3", acertijo: "Musicalmente hablando, ¿cómo suena nuestra relación?", opciones: ["Cualquiera si la escuchamos juntos", "Baladas románticas", "Rock antiguo", "Instrumental"], correcta: 1 },
    { tipo: "audio", archivo: "Audio/A30.mp3", acertijo: "¿Qué tanto nos juramos cuidar este vacilón y relación?", opciones: ["Unos meses nomás", "Hasta que choque", "Por el resto de nuestras vidas", "Lo que dure"], correcta: 2 }
];

let nivelesJuego = [];
let nivelActual = 0;
let vidas = 3;
let puntaje = 0;
let umbralSiguienteVida = 100; 

const btnIniciarJuego = document.getElementById("btnIniciarJuego");
const juegoInicio = document.getElementById("juegoInicio");
const juegoContenedor = document.getElementById("juegoContenedor");
const indicadorNivel = document.getElementById("indicadorNivel");
const textoAcertijo = document.getElementById("textoAcertijo");
const opcionesAcertijo = document.getElementById("opcionesAcertijo");
const mensajeErrorJuego = document.getElementById("mensajeErrorJuego");
const zonaAcertijo = document.getElementById("zonaAcertijo");
const zonaVideoJuego = document.getElementById("zonaVideoJuego");

// Panel HUD Superior Pro
const panelHud = document.createElement("div");
panelHud.id = "panelHudJuego";
panelHud.className = "hud-pro";
if (juegoContenedor) {
    juegoContenedor.insertBefore(panelHud, indicadorNivel);
}

function actualizarHudUI() {
    if (panelHud) {
        panelHud.innerHTML = `
            <div class="hud-item"><span>Vidas:</span> <span class="hud-vidas">${"❤️".repeat(Math.max(0, vidas))}${"🖤".repeat(Math.max(0, 3 - vidas))}</span></div>
            <div class="hud-item"><span>Puntaje:</span> <span class="hud-puntos ${puntaje < 0 ? 'negativo' : ''}">${puntaje} pts</span></div>
        `;
    }
}

if (btnIniciarJuego) {
    btnIniciarJuego.addEventListener("click", () => {
        juegoInicio.style.display = "none";
        juegoContenedor.style.display = "block";
        
        nivelesJuego = [...nivelesJuegoOriginales].sort(() => Math.random() - 0.5);

        nivelActual = 0;
        vidas = 3;
        puntaje = 0;
        umbralSiguienteVida = 100;
        actualizarHudUI();
        cargarNivel(nivelActual);
    });
}

function cargarNivel(index) {
    if (vidas <= 0) {
        zonaAcertijo.innerHTML = `
            <h3 style="color:var(--rojo); margin-bottom:15px;">¡Te quedaste sin vidas, mi amor! 💔</h3>
            <p style="margin-bottom:15px; color:var(--texto);">Puntaje final: <b>${puntaje} pts</b>. ¡Pero puedes reintentarlo!</p>
            <button class="btn" id="btnReiniciarJuego">Intentar de nuevo 🔄</button>
        `;
        zonaVideoJuego.style.display = "none";
        document.getElementById("btnReiniciarJuego").addEventListener("click", () => {
            location.reload();
        });
        return;
    }

    if (index >= nivelesJuego.length) {
        zonaAcertijo.style.display = "block";
        zonaVideoJuego.style.display = "none";
        zonaAcertijo.innerHTML = `<h3>🎉 ¡Felicidades mi vida! Completaste los 30 niveles con un puntaje de ${puntaje} pts. ¡Te amo con todo mi corazón ❤️!</h3>`;
        if (panelHud) panelHud.style.display = "none";
        return;
    }

    actualizarHudUI();
    const nivel = nivelesJuego[index];
    if (indicadorNivel) indicadorNivel.textContent = `Nivel ${index + 1} de ${nivelesJuego.length} (🎵 Audio)`;
    if (textoAcertijo) textoAcertijo.textContent = nivel.acertijo;
    if (opcionesAcertijo) opcionesAcertijo.innerHTML = "";
    if (mensajeErrorJuego) mensajeErrorJuego.textContent = "";

    zonaAcertijo.style.display = "block";
    zonaVideoJuego.style.display = "none";

    const textoRespuestaCorrecta = nivel.opciones[nivel.correcta];
    let opcionesBarajadas = [...nivel.opciones];
    opcionesBarajadas.sort(() => Math.random() - 0.5);

    opcionesBarajadas.forEach((textoOpcion) => {
        const btn = document.createElement("button");
        btn.classList.add("btn-opcion-juego");
        btn.textContent = textoOpcion;
        btn.addEventListener("click", () => {
            if (textoOpcion === textoRespuestaCorrecta) {
                puntaje += 20;
                
                if (puntaje >= umbralSiguienteVida) {
                    vidas++;
                    umbralSiguienteVida += 100; 
                }

                zonaAcertijo.style.display = "none";
                zonaVideoJuego.style.display = "block";

                zonaVideoJuego.innerHTML = `
                    <div style="text-align:center; padding: 25px; background: linear-gradient(135deg, rgba(255, 240, 245, 0.9), rgba(240, 230, 250, 0.9)); border: 2px solid var(--morado-suave); border-radius:20px; margin-bottom:15px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                        <p style="font-weight:bold; color:var(--morado); margin-bottom:12px; font-size: 1.1rem;">🎵 Reproduciendo nota de audio secreta...</p>
                        <audio id="audioNivel" controls style="width:100%; max-width:400px; outline: none;">
                            <source src="${nivel.archivo}" type="audio/mp3">
                            Tu navegador no soporta la reproducción de audio.
                        </audio>
                    </div>
                    <button class="btn" id="btnSiguienteNivel">Siguiente Nivel ➔</button>
                `;
                document.getElementById("btnSiguienteNivel").addEventListener("click", pasarSiguienteNivel);
                const audioElem = document.getElementById("audioNivel");
                if (audioElem) {
                    audioElem.play().catch(error => {
                        console.log("Reproducción automática bloqueada por el navegador:", error);
                    });
                }

            } else {
                puntaje -= 10;
                vidas--;
                actualizarHudUI();
                
                if (vidas > 0) {
                    mensajeErrorJuego.textContent = "Ups, respuesta incorrecta (-10 pts). ¡Concéntrate mi amor! ❤️";
                } else {
                    cargarNivel(nivelActual);
                }
            }
        });
        opcionesAcertijo.appendChild(btn);
    });
}

function pasarSiguienteNivel() {
    nivelActual++;
    zonaVideoJuego.innerHTML = `
        <div style="text-align:center; padding: 25px; background: linear-gradient(135deg, rgba(255, 240, 245, 0.9), rgba(240, 230, 250, 0.9)); border: 2px solid var(--morado-suave); border-radius:20px; margin-bottom:15px;">
            <p style="font-weight:bold; color:var(--morado); margin-bottom:12px;">🎵 Reproduciendo nota de audio secreta...</p>
            <audio id="audioNivel" controls style="width:100%; max-width:400px;">
                <source src="" type="audio/mp3">
                Tu navegador no soporta la reproducción de audio.
            </audio>
        </div>
        <button class="btn" id="btnSiguienteNivel">Siguiente Nivel ➔</button>
    `;
    document.getElementById("btnSiguienteNivel").addEventListener("click", pasarSiguienteNivel);
    cargarNivel(nivelActual);
}