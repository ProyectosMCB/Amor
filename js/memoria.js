(function () {
  const TODOS = [
    ["Fotico", "como te llame despues de La foto que te saqué para que entraras a la sala"],
    ["Chulacas", "Mi \"chalacas\" mal dicho"],
    ["Zambuco", "Como me dices por ser zambo, con cariño"],
    ["Así no era", "Lo que dijiste tras el primer beso"],
    ["Snoopy", "Tu peluche favorito para dormir"],
    ["Órganos", "Nuestra casa frente al mar"],
    ["Épico", "Lo que dices cuando algo te encanta"],
    ["Elegante", "Lo que dices de todo lo fino y bonito"],
    ["El top de top", "Cuando algo te conquista de verdad"],
    ["Último cartucho", "Lo que pensé de ti esa noche en el Real Plaza"],
    ["Cachetitos de bombón", "Uno de mis apodos cariñosos para ti"],
    ["Zambuco", "Uno de los nombres con que me llamas"],
    ["Loqueo", "Tu forma juguetona de molestarme"],
    ["Cheesecake de maracuyá", "Tu postre favorito"],
    ["Rosas", "Lo que te di el 15 de mayo"],
    ["Manos pintadas", "El cuadro junto al 30"],
    ["Real Plaza", "Donde me hablaste en serio el 18 de abril"],
    ["El cine", "Donde nos dimos el primer beso"],
    ["El Diablo Viste a la Moda 2", "La película que no terminamos de ver"],
    ["Chuleta a la BBQ", "La comida top del Real Plaza"],
    ["EPPO", "Donde te espero cuando llegas"],
    ["Vicky", "La primera de mi entorno en conocerte"],
    ["Lotso", "El peluchito de la caja de tu cumpleaños"],
    ["Cristiano Ronaldo", "La temática de tu caja de caramelos"],
    ["Polo azul", "Lo que me regalaste a los dos meses"],
    ["El 30", "Nuestra fecha de cada mes"],
    ["PLATO", "Donde competimos, nos enojamos y nos reímos"],
    ["Hasta el infinito", "...y más allá"],
    ["Bonita", "Una de las canciones que te dediqué"],
    ["Página web", "Mi regalo de nuestro primer mes"]
  ];
  const PARES_POR_RONDA = 8;
  const grid = document.getElementById("memGrid"), msg = document.getElementById("memMsg");
  if (!grid) return;
  const mezclar = (a) => { a = [...a]; for (let k = a.length - 1; k > 0; k--) { const r = Math.floor(Math.random() * (k + 1)); [a[k], a[r]] = [a[r], a[k]]; } return a; };
  let abiertas = [], aciertos = 0, bloqueo = false, pares = [];
  function armar() {
    grid.innerHTML = ""; aciertos = 0; abiertas = []; bloqueo = false; msg.textContent = "";
    pares = mezclar(TODOS).slice(0, PARES_POR_RONDA);
    const cartas = [];
    pares.forEach((p, k) => { cartas.push({ k, t: p[0] }); cartas.push({ k, t: p[1] }); });
    mezclar(cartas).forEach((c) => {
      const b = document.createElement("button"); b.className = "mem-card"; b.textContent = c.t; b.dataset.k = c.k;
      b.onclick = () => {
        if (bloqueo || b.classList.contains("abierta") || b.classList.contains("ok")) return;
        b.classList.add("abierta"); abiertas.push(b);
        if (abiertas.length === 2) {
          const [x, y] = abiertas;
          if (x.dataset.k === y.dataset.k) {
            x.className = y.className = "mem-card ok"; aciertos++; abiertas = [];
            if (aciertos === pares.length) {
              msg.textContent = "¡Las encontraste todas, mi amor!";
              const r = document.createElement("button"); r.className = "btn"; r.textContent = "Jugar otra vez (con otras palabras)"; r.onclick = armar;
              msg.appendChild(document.createElement("br")); msg.appendChild(r);
            }
          } else { bloqueo = true; setTimeout(() => { x.classList.remove("abierta"); y.classList.remove("abierta"); abiertas = []; bloqueo = false; }, 900); }
        }
      };
      grid.appendChild(b);
    });
  }
  armar();
})();