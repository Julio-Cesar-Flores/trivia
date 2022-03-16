import Red, { opt, data } from "./Red";
import "./style.css";
import "./w3.css";

let info = { data };

const Pregunta = (np, q, co, ainc) => {
  let html = `
  <div class="w3-card"><br/><p>${np+1}.- ${q} <span id="p${np}"></span></p>`;
  const ind = Math.floor(Math.random() * (ainc.length + 1));
  ainc.splice(ind, 0, co);
  let id, i;
  i = 0;
  for (let resp of ainc) {
    id = "id" + np + "-" + i;
    html += `
    <tr><td><input type="radio" id="${id}" name="r${np}" value="${
      i === ind ? 1 : 0
    }"><label for="${id}">${resp}&nbsp;&nbsp;</label>`;
    i++;
  }
  html += "<br/><br/></div>";
  return html;
};

const showTrivia = () => {
  const { results } = info.data;
  let html = "";
  results.forEach((e, i) => {
    // category, type, difficulty,
    const { question, correct_answer, incorrect_answers } = e;
    html += Pregunta(i, question, correct_answer, incorrect_answers);
  });
  const preg = document.getElementById("preg");
  preg.innerHTML = html;
  const btns = document.getElementById("botones");
  btns.style.display = "block";
  btns.style.margin = "auto";
  const sel = document.getElementById("sel");
  sel.style.display = "none";
};

const msg = (m) => {
  const msg = document.getElementById("msg");
  msg.innerHTML = m;
  setTimeout(function () {
    msg.innerHTML = ``;
  }, 3000);
};

const setData = (data) => {
  let html;
  info = { ...info, data };
  if (data?.response_code === 0) {
    showTrivia();
  } else {
    msg(`Código Error=${data?.response_code}`);
  }
};

const iniClic = () => {
  const cat = document.getElementById("trivia_category").value;
  const dif = document.getElementById("trivia_difficulty").value;
  const tip = document.getElementById("trivia_type").value;
  const opt = `?amount=10&category=${cat}&difficulty=${dif}&type=${tip}`;
  Red.getData(setData, opt);
};

const verificaClic = () => {
  const nump = info.data.results.length;
  let sinresp = 0;
  let correctas = 0;
  let incorrectas = 0;
  let pregunta;
  let respuesta;
  for (let i = 0; i < nump; i++) {
    pregunta = document.querySelector(`input[name="r${i}"]:checked`);
    respuesta = document.getElementById(`p${i}`);
    if (!pregunta) {
      sinresp++;
      respuesta.innerHTML = "🔍";
    } else {
      if (pregunta.value === "1") {
        correctas++;
        respuesta.innerHTML = "👍"; //👌
      } else {
        incorrectas++;
        respuesta.innerHTML = "👎";
      }
    }
  }
  msg(
    `Correctas=${correctas} Incorrectas=${incorrectas} Sin responder=${sinresp} Puntos=${
      correctas * 100
    }`
  );
};

const reinicioClic = () => {
  const preg = document.getElementById("preg");
  preg.innerHTML = "";
  const btns = document.getElementById("botones");
  btns.style.display = "none";
  const sel = document.getElementById("sel");
  sel.style.display = "block";
};

const App = () => {
  const bIni = document.getElementById("bInicio");
  bIni.addEventListener("click", iniClic);
  const bVer = document.getElementById("bVer");
  bVer.addEventListener("click", verificaClic);
  const bReinicio = document.getElementById("bIni");
  bReinicio.addEventListener("click", reinicioClic);
};

export default App;
