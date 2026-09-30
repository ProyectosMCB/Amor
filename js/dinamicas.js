(function () {
    const mezclar = (a) => { a = [...a]; for (let k = a.length - 1; k > 0; k--) { const r = Math.floor(Math.random() * (k + 1)); [a[k], a[r]] = [a[r], a[k]]; } return a; };
    const H = '<span style="color:#e0112b">♥</span>';
  
    /* ---------- DINÁMICA 1: ¿QUIÉN LO DIJO? ---------- */
    const FRASES = [
      ["\"Así no era\"", "Lizeth"],
      ["\"Chulacas\" (queriendo decir chalacas)", "Misael"],
      ["\"Te amo hasta el infinito y más allá\"", "Misael"],
      ["\"Te amo\" casi sin voz, en el cine", "Lizeth"],
      ["\"¿Quieres ser mi enamorada?\"", "Misael"],
      ["\"Sí, sí quiero\"", "Lizeth"],
      ["\"Zambuco\"", "Lizeth"],
      ["\"Fotico\"", "Misael"],
      ["\"Será mi último cartucho\"", "Misael"],
      ["\"Épico\" y \"el top de top\"", "Lizeth"],
      ["\"Ven, acompáñame al cine, es para mi prima\"", "Lizeth"],
      ["\"Mis antenitas y mis cachetitos de bombón\"", "Misael"],
      ["\"My boy\"", "Lizeth"],
      ["\"Solo quiero que venga y salga de ti\"", "Lizeth"],
      ["\"Esperarte en el EPPO se ha vuelto una costumbre\"", "Misael"],
      ["\"Estoy aquí, aunque no pueda abrazarte\"", "Misael"]
    ];
    const zona = document.getElementById("quienZona"), qmsg = document.getElementById("quienMsg");
    if (zona) {
      let ronda = [], i = 0, pts = 0;
      function jugar() {
        ronda = mezclar(FRASES).slice(0, 8); i = 0; pts = 0; qmsg.textContent = ""; mostrar();
      }
      function mostrar() {
        if (i >= ronda.length) {
          zona.innerHTML = "";
          qmsg.innerHTML = "Acertaste " + pts + " de " + ronda.length + (pts === ronda.length ? ", ¡me conoces y te conozco perfecto! " : ", ¡casi! ") + H + "<br>";
          const r = document.createElement("button"); r.className = "btn"; r.textContent = "Jugar otra vez"; r.onclick = jugar; qmsg.appendChild(r);
          return;
        }
        zona.innerHTML = "<p style='font-size:1.1rem;font-weight:600;margin-bottom:15px'>" + (i + 1) + "/" + ronda.length + " · " + ronda[i][0] + "</p><div id='quienOps' style='display:flex;flex-direction:column;gap:10px;max-width:320px;margin:0 auto'></div>";
        ["Misael", "Lizeth"].forEach((n) => {
          const b = document.createElement("button"); b.className = "btn-opcion-juego"; b.textContent = n;
          b.onclick = () => {
            if (n === ronda[i][1]) { pts++; qmsg.textContent = "¡Correcto!"; } else { qmsg.textContent = "Era " + ronda[i][1] + "."; }
            i++; setTimeout(() => { qmsg.textContent = ""; mostrar(); }, 900);
          };
          document.getElementById("quienOps").appendChild(b);
        });
      }
      jugar();
    }
  
    /* ---------- DINÁMICA 2: RAZONES PARA AMARTE ---------- */
    const RAZONES = [
      "Por tu forma de caminar, tan elegante y segura.",
      "Por tu honestidad: dices las cosas como son, sin adornarlas.",
      "Por tu risa, que solo tú tienes.",
      "Por tu loqueo, que convierte cualquier momento normal en uno que recordamos.",
      "Por tus ojos y tu mirada.",
      "Por tu cabello.",
      "Por tu enojo tierno que termina desarmándome.",
      "Por tus detalles, aunque sean pequeños.",
      "Por cuidarme y preocuparte por mí sin que te lo pida.",
      "Por tus abrazos cuando estoy triste.",
      "Por tus valores y por cómo piensas en tu futuro.",
      "Por tu esfuerzo de cada día, aunque a veces estés cansada.",
      "Por elegirme un día tras otro.",
      "Por convertir cosas normales en cosas nuestras.",
      "Por quedarte incluso en los días nublados.",
      "Por tus apodos, que me hacen sonreír apenas los escucho.",
      "Por cómo me haces sentir cuando me mimas.",
      "Por confiar en mí.",
      "Por dejarme conocer esa versión tuya que no todos conocen.",
      "Porque a tu lado ya no sobrevivo los días: los vivo.",
      "Por nuestros videojuegos, donde nos enojamos y terminamos riéndonos.",
      "Porque entre millones de personas, ninguna es tú.",
      "Por tu sonrisa, que hace que todo lo demás desaparezca por un momento.",
      "Por ser tú, completa."
    ];
    const btn = document.getElementById("razonBtn"), txt = document.getElementById("razonTexto"), cont = document.getElementById("razonCont");
    if (btn) {
      let bolsa = [], vistas = 0;
      btn.onclick = () => {
        if (!bolsa.length) { bolsa = mezclar(RAZONES); if (vistas) cont.textContent = ""; }
        txt.innerHTML = H + " " + bolsa.pop() + " " + H;
        vistas++; cont.textContent = "Razón " + vistas + " de " + RAZONES.length + " (y faltan millones)";
        if (!bolsa.length) { vistas = 0; }
      };
    }
  })();