const CLAVE_NOMBRE = "nombreVisitanteLM";
const CLAVE_COLOR = "colorVisitanteLM";
const CLAVE_MIS_MENSAJES = "misMensajesLM";

let idMensajeRespondido = null;

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
const inputColor = document.getElementById("inputColor");
const btnGuardarNombre = document.getElementById("btnGuardarNombre");

const formMensaje = document.getElementById("formMensaje");
const saludoNombre = document.getElementById("saludoNombre");
const inputMensaje = document.getElementById("inputMensaje");
const btnEnviarMensaje = document.getElementById("btnEnviarMensaje");
const estadoEnvio = document.getElementById("estadoEnvio");

const inputImagen = document.getElementById("inputImagen");
const previewImagen = document.getElementById("previewImagen");

const listaMensajes = document.getElementById("listaMensajes");
const cargandoMensajes = document.getElementById("cargandoMensajes");

const panelRespuesta = document.getElementById("panelRespuesta");
const autorRespondido = document.getElementById("autorRespondido");
const textoRespondido = document.getElementById("textoRespondido");
const btnCancelarRespuesta = document.getElementById("btnCancelarRespuesta");

function iniciar() {
    const nombreGuardado = localStorage.getItem(CLAVE_NOMBRE);
    if (nombreGuardado) {
        mostrarFormularioMensaje(nombreGuardado);
    } else if (formNombre) {
        formNombre.style.display = "flex";
    }
}

if (btnGuardarNombre) {
    btnGuardarNombre.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();
        const color = inputColor.value;
        if (!nombre) {
            inputNombre.focus();
            return;
        }
        localStorage.setItem(CLAVE_NOMBRE, nombre);
        localStorage.setItem(CLAVE_COLOR, color);
        mostrarFormularioMensaje(nombre);
    });
}

if (inputNombre) {
    inputNombre.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && btnGuardarNombre) btnGuardarNombre.click();
    });
}

function mostrarFormularioMensaje(nombre) {
    if (formNombre) formNombre.style.display = "none";
    if (formMensaje) formMensaje.style.display = "flex";
    if (saludoNombre) saludoNombre.textContent = `Hola, ${nombre} ✨ Escribe tu mensaje:`;
}

if (btnCancelarRespuesta && panelRespuesta) {
    btnCancelarRespuesta.addEventListener("click", () => {
        idMensajeRespondido = null;
        panelRespuesta.style.display = "none";
    });
}

if (btnEnviarMensaje) {
    btnEnviarMensaje.addEventListener("click", async () => {
        const nombre = localStorage.getItem(CLAVE_NOMBRE);
        const colorAutor = localStorage.getItem(CLAVE_COLOR) || "#b3243f";
        const mensaje = inputMensaje ? inputMensaje.value.trim() : "";
        const archivo = inputImagen && inputImagen.files ? inputImagen.files[0] : null;

        if (!mensaje && !archivo) {
            if (inputMensaje) inputMensaje.focus();
            return;
        }

        btnEnviarMensaje.disabled = true;
        if (estadoEnvio) estadoEnvio.textContent = "Enviando con amor...";

        try {
            let base64Imagen = "";

            if (archivo) {
                base64Imagen = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const img = new Image();
                        img.src = event.target.result;
                        img.onload = () => {
                            const canvas = document.createElement("canvas");
                            const MAX_WIDTH = 600; 
                            const scaleSize = MAX_WIDTH / img.width;
                            
                            canvas.width = MAX_WIDTH;
                            canvas.height = img.height * (img.width > MAX_WIDTH ? scaleSize : 1);

                            const ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                            
                            resolve(canvas.toDataURL("image/jpeg", 0.7));
                        };
                        img.onerror = (err) => reject(err);
                    };
                    reader.onerror = (err) => reject(err);
                    reader.readAsDataURL(archivo);
                });
            }

            const objetoMensaje = {
                nombre: nombre,
                colorAutor: colorAutor,
                mensaje: mensaje,
                imagen: base64Imagen,
                likes: 0,
                fecha: firebase.firestore.FieldValue.serverTimestamp()
            };

            if (idMensajeRespondido) {
                objetoMensaje.respondiendoAId = idMensajeRespondido;
            }

            const docRef = await db.collection("mensajes").add(objetoMensaje);
            guardarMiMensaje(docRef.id);

            if (inputMensaje) inputMensaje.value = "";
            if (inputImagen) inputImagen.value = "";
            if (previewImagen) {
                previewImagen.src = "";
                previewImagen.style.display = "none";
            }
            idMensajeRespondido = null;
            if (panelRespuesta) panelRespuesta.style.display = "none";
            
            if (estadoEnvio) estadoEnvio.textContent = "¡Mensaje enviado con éxito! 💖";
            setTimeout(() => { if (estadoEnvio) estadoEnvio.textContent = ""; }, 2500);

        } catch (error) {
            console.error(error);
            if (estadoEnvio) estadoEnvio.textContent = "No se pudo enviar. La foto podría ser muy pesada.";
        }

        btnEnviarMensaje.disabled = false;
    });
}

function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

if (db && listaMensajes) {
    db.collection("mensajes")
        .orderBy("fecha", "asc")
        .onSnapshot((snapshot) => {
            if (cargandoMensajes) cargandoMensajes.remove();

            if (snapshot.empty) {
                listaMensajes.innerHTML = "<p style='text-align:center; color:var(--morado);'>Aún no hay mensajes, ¡sé el primero en dejar uno! 💌</p>";
                return;
            }

            const misMensajes = obtenerMisMensajes();
            listaMensajes.innerHTML = "";

            const mapaDocs = {};
            snapshot.forEach((doc) => {
                mapaDocs[doc.id] = doc.data();
            });

            snapshot.forEach((doc) => {
                const item = document.createElement("div");
                item.classList.add("mensaje-item");
                item.dataset.id = doc.id;
                
                const data = doc.data();
                let infoRespuesta = null;
                if (data.respondiendoAId && mapaDocs[data.respondiendoAId]) {
                    infoRespuesta = mapaDocs[data.respondiendoAId];
                }

                renderMensajeItem(item, doc.id, data, misMensajes.includes(doc.id), infoRespuesta);
                listaMensajes.appendChild(item);
            });
        }, (error) => {
            console.error("Error al leer mensajes:", error);
            listaMensajes.innerHTML = "<p style='text-align:center; color:var(--rojo);'>No se pudieron cargar los mensajes.</p>";
        });
}

function renderMensajeItem(item, id, data, esMio, infoRespuesta) {
    let fechaTexto = "";
    let puedeBorrar = false;

    if (data.fecha) {
        const fechaObj = data.fecha.toDate();
        fechaTexto = fechaObj.toLocaleString("es-PE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });

        const ahora = new Date();
        const diferenciaMinutos = (ahora - fechaObj) / (1000 * 60);
        if (diferenciaMinutos <= 10) {
            puedeBorrar = true;
        }
    } else {
        puedeBorrar = true;
    }

    let htmlRespuesta = "";
    if (infoRespuesta) {
        htmlRespuesta = `
            <div style="background: var(--beige-suave); border-left: 3px solid var(--rojo); padding: 6px 10px; margin-bottom: 10px; border-radius: 6px; font-size: 12px; color: var(--texto);">
                <strong>En respuesta a ${escaparHTML(infoRespuesta.nombre)}:</strong>
                <p style="margin:2px 0 0 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escaparHTML(infoRespuesta.mensaje)}</p>
            </div>
        `;
    }

    const colorNombre = data.colorAutor || "var(--rojo)";

    // Asigna el borde izquierdo del mensaje exactamente con el color elegido por el usuario
    item.style.borderLeftColor = colorNombre;

    item.innerHTML = `
        ${htmlRespuesta}
        <div class="mensaje-cabecera">
            <span class="mensaje-autor" style="color:${colorNombre};">${escaparHTML(data.nombre || "Anónimo")}</span>
            <span class="mensaje-fecha">${fechaTexto}</span>
        </div>

        ${data.imagen ? `
            <div class="mensaje-imagen-contenedor">
                <img src="${data.imagen}" class="mensaje-imagen" onclick="abrirVisor('${data.imagen}')" title="Haz clic para ampliar">
            </div>
        ` : ""}
        
        <p class="mensaje-texto">
            ${escaparHTML(data.mensaje || "")}
            ${data.editado ? '<span class="mensaje-editado"> (editado)</span>' : ''}
        </p>

        <div class="mensaje-footer">
            <span class="span-likes">
                ❤️ <span style="font-weight:bold;">${data.likes || 0}</span>
            </span>
            <button class="btn-responder-msg">Responder</button>
        </div>

        ${esMio ? `
            <div class="mensaje-acciones">
                <button class="btn-accion-editar">Editar</button>
                ${puedeBorrar ? `<button class="btn-accion-borrar">Eliminar</button>` : ''}
            </div>
        ` : ''}
    `;

    // Doble clic limpio (cambia el fondo rojo y actualiza los likes)
    item.ondblclick = () => {
        db.collection("mensajes").doc(id).update({
            likes: firebase.firestore.FieldValue.increment(1)
        }).catch(err => console.error("Error al dar like:", err));

        item.classList.add("latido-rojo");

        setTimeout(() => {
            item.classList.remove("latido-rojo");
        }, 1500);
    };

    const btnResponder = item.querySelector(".btn-responder-msg");
    if (btnResponder) {
        btnResponder.addEventListener("click", () => {
            idMensajeRespondido = id;
            if (autorRespondido) autorRespondido.textContent = data.nombre || "Anónimo";
            if (textoRespondido) textoRespondido.textContent = data.mensaje || "[Imagen]";
            if (panelRespuesta) panelRespuesta.style.display = "block";
            if (inputMensaje) inputMensaje.focus();
        });
    }

    if (esMio) {
        const btnEditar = item.querySelector(".btn-accion-editar");
        if (btnEditar) {
            btnEditar.addEventListener("click", () => {
                activarEdicion(item, id, data);
            });
        }

        const btnBorrar = item.querySelector(".btn-accion-borrar");
        if (btnBorrar) {
            btnBorrar.addEventListener("click", () => {
                if (confirm("¿Seguro que quieres borrar este mensaje?")) {
                    db.collection("mensajes").doc(id).delete()
                        .catch((error) => console.error("Error al borrar:", error));
                }
            });
        }
    }
}

if (inputImagen) {
    inputImagen.addEventListener("change", () => {
        const archivo = inputImagen.files[0];
        if(!archivo){
            if (previewImagen) previewImagen.style.display = "none";
            return;
        }
        if (previewImagen) {
            previewImagen.src = URL.createObjectURL(archivo);
            previewImagen.style.display = "block";
        }
    });
}

function activarEdicion(item, id, data) {
    item.innerHTML = `
        <p style="font-weight:bold; color:var(--rojo); font-size:13px; margin-bottom:6px;">Editando tu mensaje:</p>
        <textarea class="input-edicion" maxlength="300" rows="3">${data.mensaje || ""}</textarea>
        <div style="display:flex; gap:8px; margin-top:10px;">
            <button class="btn-guardar-edicion btn-accion-editar" style="background:var(--rojo); color:white;">Guardar</button>
            <button class="btn-cancelar-edicion btn-accion-borrar">Cancelar</button>
        </div>
    `;

    item.querySelector(".btn-guardar-edicion").addEventListener("click", () => {
        const nuevoTexto = item.querySelector(".input-edicion").value.trim();
        if (!nuevoTexto) return;

        db.collection("mensajes").doc(id).update({
            mensaje: nuevoTexto,
            editado: true
        }).catch((error) => console.error("Error al editar:", error));
    });

    item.querySelector(".btn-cancelar-edicion").addEventListener("click", () => {
        db.collection("mensajes").doc(id).get().then(doc => {
            if(doc.exists) {
                const misMensajes = obtenerMisMensajes();
                renderMensajeItem(item, id, doc.data(), misMensajes.includes(id), null);
            }
        });
    });
}

window.abrirVisor = function(url) {
    const visor = document.getElementById("visorModal") || document.getElementById("visor");
    const imgAmpliada = document.getElementById("imagenAmpliada") || document.getElementById("contenidoVisor");
    if (visor) {
        if (imgAmpliada && imgAmpliada.tagName === "IMG") {
            imgAmpliada.src = url;
        }
        visor.style.display = "flex";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const visor = document.getElementById("visorModal") || document.getElementById("visor");
    const cerrar = document.getElementById("cerrarVisor") || document.getElementById("cerrar");
    
    if (cerrar && visor) {
        cerrar.addEventListener("click", () => {
            visor.style.display = "none";
        });
        visor.addEventListener("click", (e) => {
            if (e.target === visor) {
                visor.style.display = "none";
            }
        });
    }
});

iniciar();