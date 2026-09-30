const eventosLinea = [
    ["4 de abril", "Nos tocó en el mismo grupo y nació el \"chulacas\""],
    ["18 de abril", "Mi cumpleaños bajo la luna, en el Real Plaza"],
    ["30 de abril", "Nuestro primer beso y el primer te amo, en el cine"],
    ["15 de mayo", "Las rosas en un rincón de la universidad"],
    ["30 de mayo", "Nuestro primer mes"],
    ["4 de junio", "El Snoopy sin motivo"],
    ["30 de junio", "Dos meses: el cuadro con nuestras manos pintadas"],
    ["15 de agosto", "Tu cumpleaños y la caja con flor y peluchito"],
    ["16 de agosto", "Conocí a tus abuelos y a tus tías"]
  ];
  const lo = document.getElementById("lineaOpciones"), ll = document.getElementById("lineaLista"), lm = document.getElementById("lineaMsg");
  let lp = 0, fallos = 0;
  function pintarLinea() {
    lo.innerHTML = "";
    [...eventosLinea.keys()].filter(i => i >= lp).sort(() => Math.random() - 0.5).forEach(i => {
      const b = document.createElement("button");
      b.className = "btn-opcion-juego"; b.textContent = eventosLinea[i][1];
      b.onclick = () => {
        if (i === lp) {
          const d = document.createElement("div");
          d.className = "linea-ok"; d.innerHTML = "<b>" + eventosLinea[i][0] + "</b> · " + eventosLinea[i][1];
          ll.appendChild(d); lp++; lm.textContent = "";
          if (lp === eventosLinea.length) {
            lo.innerHTML = "";
            lm.textContent = "¡Lo lograste, mi amor! Esa es nuestra historia, en orden" + (fallos ? " (con " + fallos + " tropiezos)." : ", sin fallar ni una vez.");
            const r = document.createElement("button"); r.className = "btn"; r.textContent = "Jugar otra vez";
            r.onclick = () => { lp = 0; fallos = 0; ll.innerHTML = ""; lm.textContent = ""; pintarLinea(); };
            lo.appendChild(r);
          } else pintarLinea();
        } else { fallos++; lm.textContent = "Mmm, ese vino después. Piénsalo otra vez."; }
      };
      lo.appendChild(b);
    });
  }
  if (lo) pintarLinea();