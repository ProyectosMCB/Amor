(function () {
  const PREGUNTAS = [
    ["¿Qué día formó el profesor nuestro grupo de trabajo?",["4 de abril", "18 de abril", "30 de abril", "15 de mayo"]],
    ["¿Con qué vestido entraste al salón la primera vez que me quedé mirándote?",["Beige y negro", "Rojo", "Blanco", "Azul"]],
    ["¿Por qué tuve que tomarte una foto el día que nos reunimos?",["Para subirla a redes", "Para que te dejaran entrar a la sala", "Para un trabajo de arte", "Para tu carné"]],
    ["¿Qué palabra dije mal y nació nuestra primera broma?",["Chalacas → chulacas", "Choclo → chuclo", "Chicha → chiclas", "Chifa → chufa"]],
    ["¿Qué apodo te puse por aquella foto?",["Fotico", "Flaquita", "Chiquita", "Pecas"]],
    ["¿Qué pasó el 18 de abril?",["Mi cumpleaños", "Tu cumpleaños", "Nuestro aniversario", "Fin de ciclo"]],
    ["¿A qué centro comercial fuimos esa noche a hablar en serio?",["Real Plaza", "Mall del Sur", "Open Plaza", "Plaza Norte"]],
    ["¿Qué me dijiste esa noche que buscabas?",["Algo serio, al cien por ciento", "Algo pasajero", "Solo amistad", "Nada todavía"]],
    ["¿Qué pensé que sería para mí esa relación?",["Mi último cartucho", "Mi distracción", "Un experimento", "Una aventura"]],
    ["¿Qué excusa me diste para llevarme al cine?",["Que iba a ver la cartelera para tu prima", "Que era para el cumpleaños de tu mamá", "Que tenías un trabajo de la universidad", "Que ya tenías entradas para tus amigas"]],
    ["¿Qué película fuimos a ver cuando nos dimos el primer beso?",["El Diablo Viste a la Moda 2", "Titanic", "Toy Story", "Barbie"]],
    ["¿Qué frase dijiste después del beso?",["Así no era", "Ya fue", "Qué pena", "Nos vemos"]],
    ["¿Qué nos dijimos en el cine, el día que empezó todo?",["Te amo", "Te extraño", "Te quiero mucho", "Hasta mañana"]],
    ["¿Qué fecha celebramos como nuestro aniversario mensual?",["El 30", "El 15", "El 18", "El 4"]],
    ["¿Qué flores te di el 15 de mayo?",["Rosas", "Girasoles", "Tulipanes", "Margaritas"]],
    ["¿Cuál es tu postre favorito, el que te llevaba?",["Cheesecake de maracuyá", "Torta de chocolate", "Helado", "Pie de limón"]],
    ["¿Qué te regalé el 4 de junio sin ningún motivo?",["Un Snoopy", "Un oso", "Un libro", "Un collar"]],
    ["¿Qué regalo te hice por nuestro primer mes?",["Una página web", "Un peluche", "Un reloj", "Una carta impresa"]],
    ["¿Qué temática tenía la caja de caramelos que me diste?",["Cristiano Ronaldo", "Messi", "Mario Bros", "Disney"]],
    ["¿Qué dejamos marcado en el cuadro de los dos meses?",["Nuestras manos pintadas", "Nuestras firmas", "Una foto", "Un dibujo"]],
    ["¿Qué te regalé por los dos meses?",["Una caja con chocolates, cosas que te gustan y una carta", "Un polo azul", "Un perfume", "Un libro para colorear"]],
    ["¿Qué no quise hacer cuando pediste un tiempo?",["Alejarme; preferí hablar", "Ignorarte", "Dejarte", "Enojarme"]],
    ["¿Qué pasó el tercer mes que casi nos separa?",["La posibilidad de que estudiaras virtual", "Una mudanza", "Un viaje", "Una pelea"]],
    ["¿Qué incluía la página del tercer mes?",["Consejos, fotos y un juego de acertijos", "Solo música", "Solo videos", "Un mapa"]],
    ["¿Qué día fue tu cumpleaños?",["15 de agosto", "16 de agosto", "30 de agosto", "4 de abril"]],
    ["¿Qué llevaba la caja que mandé a hacer para ti?",["Una flor, un peluchito de Toy Story y caramelos", "Una torta", "Un collar", "Un perfume"]],
    ["¿Cuál fue la mayor autoridad de tu familia que conocí al día siguiente?",["Tus abuelos", "Tus padres", "Tus tíos", "Tu hermano"]],
    ["¿Dónde soñamos tener nuestra casa frente al mar?",["Órganos", "Máncora", "Piura", "Lima"]],
    ["¿Cómo me llamas con cariño por ser zambo?",["Zambuco", "Negrito", "Moreno", "Chino"]],
    ["¿Cómo termina siempre nuestra frase? Te amo hasta el infinito y...",["más allá", "siempre", "por siempre", "hoy"]]
  ];
  const NIVELES = 20, META = 300;
  const $ = (id) => document.getElementById(id);
  if (!$("j2Inicio")) return;
  let niv = [], i = 0, vidas = 3, pts = 0, umbral = 100, bloqueado = false;
  const mezclar = (a) => { a = [...a]; for (let k = a.length - 1; k > 0; k--) { const r = Math.floor(Math.random() * (k + 1)); [a[k], a[r]] = [a[r], a[k]]; } return a; };
  
  function hud() {
    $("j2Hud").innerHTML = `<div class="hud-item"><span>Vidas:</span> <span class="hud-vidas">${"♥".repeat(Math.max(0, vidas))}${"♡".repeat(Math.max(0, 3 - vidas))}</span></div>
    <div class="hud-item"><span>Puntaje:</span> <span class="hud-puntos ${pts < 0 ? "negativo" : ""}">${pts} pts</span></div>`;
  }
  function desbloquear() {
    $("j2Juego").style.display = "none";
    $("j2Premio").style.display = "block";
    const v = $("j2Video"); if (!v.getAttribute("src")) v.setAttribute("src", "videos/video.mp4");
  }
  function fin(ok) {
    $("j2Zona").innerHTML = ok
      ? `<h3 style="color:var(--guinda)">¡Lo lograste, mi amor! ${pts} puntos</h3><p style="margin-top:10px">Tu premio te está esperando...</p>`
      : `<h3 style="color:var(--guinda);margin-bottom:12px">${vidas <= 0 ? "Te quedaste sin vidas" : "Te faltaron puntos (" + pts + " de " + META + ")"}</h3><button class="btn" id="j2Reintentar">Intentar de nuevo</button>`;
    if (ok) setTimeout(desbloquear, 1800);
    else $("j2Reintentar").onclick = iniciar;
  }
  function cargar() {
    bloqueado = false; hud();
    if (vidas <= 0) return fin(false);
    if (i >= niv.length) return fin(pts >= META);
    const [q, ops] = niv[i], correcta = ops[0];
    $("j2Zona").innerHTML = `<div style="font-weight:bold;color:var(--azul);margin-bottom:12px">Nivel ${i + 1} de ${niv.length}</div>
      <p style="font-size:1.1rem;font-weight:600;margin-bottom:15px">${q}</p>
      <div id="j2Ops" style="display:flex;flex-direction:column;gap:10px;max-width:420px;margin:0 auto"></div>
      <p id="j2Msg" style="color:var(--guinda);min-height:22px;margin-top:10px"></p>`;
    mezclar(ops).forEach((t) => {
      const b = document.createElement("button"); b.className = "btn-opcion-juego"; b.textContent = t;
      b.onclick = () => {
        if (bloqueado) return;
        if (t === correcta) {
          bloqueado = true; pts += 20;
          if (pts >= umbral) { vidas++; umbral += 100; }
          $("j2Msg").textContent = "¡Correcto! +20 pts"; hud();
          setTimeout(() => { i++; cargar(); }, 900);
        } else {
          pts -= 10; vidas--; hud(); b.disabled = true; b.style.opacity = ".4";
          if (vidas <= 0) setTimeout(cargar, 600); else $("j2Msg").textContent = "Ups, esa no era (-10 pts)";
        }
      };
      $("j2Ops").appendChild(b);
    });
  }
  function iniciar() {
    niv = mezclar(PREGUNTAS).slice(0, NIVELES); i = 0; vidas = 3; pts = 0; umbral = 100;
    $("j2Inicio").style.display = "none"; $("j2Juego").style.display = "block"; cargar();
  }
  $("j2Btn").onclick = iniciar;
  })();