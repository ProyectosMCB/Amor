// =====================================================================
// MURO DE MENSAJES COMPARTIDO
// =====================================================================
// - El nombre de la persona se guarda en su propio celular/navegador
//   (localStorage) y no se le vuelve a preguntar.
// - Los mensajes se guardan en Firebase (la nube), así que Misael y
//   Lizeth pueden verlos ambos, desde cualquier dispositivo.
// =====================================================================

const CLAVE_NOMBRE = "nombreVisitanteLM";
const CLAVE_MIS_MENSAJES = "misMensajesLM";

// IDs de los mensajes que ESTE navegador ha enviado (para poder editarlos)
function obtenerMisMensajes() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_MIS_MENSAJES)) || [];
    } catch {
        return [];
    }
}
function guardarMiMensaje(id) {
    const mios = obtenerMisMensajes();
    mios.push(id);
    localStorage.setItem(CLAVE_MIS_MENSAJES, JSON.stringify(mios));
}

const formNombre = document.getElementById("formNombre");
const inputNombre = document.getElementById("inputNombre");
const btnGuardarNombre = document.getElementById("btnGuardarNombre");

const formMensaje = document.getElementById("formMensaje");
const saludoNombre = document.getElementById("saludoNombre");
const inputMensaje = document.getElementById("inputMensaje");
const btnEnviarMensaje = document.getElementById("btnEnviarMensaje");
const estadoEnvio = document.getElementById("estadoEnvio");

const listaMensajes = document.getElementById("listaMensajes");
const cargandoMensajes = document.getElementById("cargandoMensajes");

// ---------- PASO 1: ¿ya tenemos el nombre guardado? ----------
function iniciar() {
    const nombreGuardado = localStorage.getItem(CLAVE_NOMBRE);
    if (nombreGuardado) {
        mostrarFormularioMensaje(nombreGuardado);
    } else {
        formNombre.style.display = "flex";
    }
}

btnGuardarNombre.addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    if (!nombre) {
        inputNombre.focus();
        return;
    }
    localStorage.setItem(CLAVE_NOMBRE, nombre);
    mostrarFormularioMensaje(nombre);
});

inputNombre.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnGuardarNombre.click();
});

function mostrarFormularioMensaje(nombre) {
    formNombre.style.display = "none";
    formMensaje.style.display = "flex";
    saludoNombre.textContent = `Hola, ${nombre} 👋 escribe tu mensaje:`;
}

// ---------- PASO 2: enviar mensaje a Firebase ----------
btnEnviarMensaje.addEventListener("click", () => {
    const nombre = localStorage.getItem(CLAVE_NOMBRE);
    const mensaje = inputMensaje.value.trim();

    if (!mensaje) {
        inputMensaje.focus();
        return;
    }

    btnEnviarMensaje.disabled = true;
    estadoEnvio.textContent = "Enviando...";

    db.collection("mensajes").add({
        nombre: nombre,
        mensaje: mensaje,
        fecha: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
        guardarMiMensaje(docRef.id);
        inputMensaje.value = "";
        estadoEnvio.textContent = "¡Mensaje enviado! 💖";
        btnEnviarMensaje.disabled = false;
        setTimeout(() => estadoEnvio.textContent = "", 2500);
    })
    .catch((error) => {
        console.error("Error al guardar el mensaje:", error);
        estadoEnvio.textContent = "No se pudo enviar, revisa tu internet.";
        btnEnviarMensaje.disabled = false;
    });
});

// ---------- PASO 3: mostrar mensajes en tiempo real ----------
function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

db.collection("mensajes")
    .orderBy("fecha", "desc")
    .onSnapshot((snapshot) => {
        if (cargandoMensajes) cargandoMensajes.remove();

        if (snapshot.empty) {
            listaMensajes.innerHTML = "<p style='text-align:center;'>Aún no hay mensajes, ¡sé el primero!</p>";
            return;
        }

        const misMensajes = obtenerMisMensajes();
        listaMensajes.innerHTML = "";

        snapshot.forEach((doc) => {
            const item = document.createElement("div");
            item.classList.add("mensaje-item");
            item.dataset.id = doc.id;
            renderMensajeItem(item, doc.id, doc.data(), misMensajes.includes(doc.id));
            listaMensajes.appendChild(item);
        });
    }, (error) => {
        console.error("Error al leer mensajes:", error);
        listaMensajes.innerHTML = "<p style='text-align:center;'>No se pudieron cargar los mensajes.</p>";
    });

// ---------- Dibuja (o vuelve a dibujar) un mensaje en modo normal ----------
function renderMensajeItem(item, id, data, esMio) {
    item.innerHTML = `
        <p class="mensaje-autor">${escaparHTML(data.nombre || "Anónimo")}</p>
        <p class="mensaje-texto">${escaparHTML(data.mensaje || "")}${data.editado ? ' <span class="mensaje-editado">(editado)</span>' : ''}</p>
        ${esMio ? `
            <div class="mensaje-acciones">
                <button class="btn-editar-mensaje">Editar</button>
                <button class="btn-borrar-mensaje">Eliminar</button>
            </div>
        ` : ''}
    `;

    if (esMio) {
        item.querySelector(".btn-editar-mensaje").addEventListener("click", () => {
            activarEdicion(item, id, data);
        });
        item.querySelector(".btn-borrar-mensaje").addEventListener("click", () => {
            if (confirm("¿Seguro que quieres borrar este mensaje?")) {
                db.collection("mensajes").doc(id).delete()
                    .catch((error) => console.error("Error al borrar:", error));
            }
        });
    }
}

// ---------- PASO 4: editar un mensaje propio ----------
function activarEdicion(item, id, data) {
    item.innerHTML = `
        <p class="mensaje-autor">Editando tu mensaje:</p>
        <textarea class="input-edicion" maxlength="300" rows="3">${data.mensaje || ""}</textarea>
        <div class="mensaje-acciones">
            <button class="btn-guardar-edicion">Guardar</button>
            <button class="btn-cancelar-edicion">Cancelar</button>
        </div>
    `;

    item.querySelector(".btn-guardar-edicion").addEventListener("click", () => {
        const nuevoTexto = item.querySelector(".input-edicion").value.trim();
        if (!nuevoTexto) return;

        db.collection("mensajes").doc(id).update({
            mensaje: nuevoTexto,
            editado: true
        }).catch((error) => console.error("Error al editar:", error));
        // El onSnapshot de arriba refresca la vista sola con el texto nuevo.
    });

    item.querySelector(".btn-cancelar-edicion").addEventListener("click", () => {
        renderMensajeItem(item, id, data, true);
    });
}

iniciar();
