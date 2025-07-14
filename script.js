const semestres = [
  {
    nombre: "Semestre 1",
    materias: [
      { nombre: "Cátedra San Pablo", creditos: 3 },
      { nombre: "Competencias Comunicativas", creditos: 3 },
      { nombre: "Profesiones de la comunicación", creditos: 3 },
      { nombre: "Teoría Organizacional", creditos: 3 },
      { nombre: "Medios y producción", creditos: 3 },
      { nombre: "Inglés I (A1)", creditos: 3 },
    ]
  },
  {
    nombre: "Semestre 2",
    materias: [
      { nombre: "Cátedra Interdisciplinar I historia general de Colombia", creditos: 3 },
      { nombre: "Leer y escribir", creditos: 3 },
      { nombre: "Epistemología", creditos: 3 },
      { nombre: "Fotografía", creditos: 3 },
      { nombre: "Comunicación organizacional", creditos: 3 },
      { nombre: "Inglés II (A2)", creditos: 3 },
    ]
  },
  {
    nombre: "Semestre 3",
    materias: [
      { nombre: "Cátedra Interdisciplinar II sociedad y cultura", creditos: 3 },
      { nombre: "Lenguajes y géneros", creditos: 3 },
      { nombre: "Teorías de la Comunicación", creditos: 3 },
      { nombre: "Producción editorial", creditos: 3 },
      { nombre: "Gestión de la comunicación estratégica", creditos: 3 },
      { nombre: "Inglés III (B1)", creditos: 3 },
    ]
  },
  {
    nombre: "Semestre 4",
    materias: [
      { nombre: "Cátedra Interdisciplinar III responsabilidad social", creditos: 3 },
      { nombre: "El mundo y sus signos", creditos: 3 },
      { nombre: "Marketing digital", creditos: 3 },
      { nombre: "Escribir para medios crónica y reportaje", creditos: 3 },
      { nombre: "Formatos radiofónicos", creditos: 3 },
      { nombre: "Inglés IV (B2)", creditos: 3 },
    ]
  },
  {
    nombre: "Semestre 5",
    materias: [
      { nombre: " Antropología y comunicación", creditos: 3 },
      { nombre: " Globalización y sociedades contemporáneas", creditos: 3 },
      { nombre: " Medios y opinión pública", creditos: 3 },
      { nombre: "Periodismo radial", creditos: 3 },
      { nombre: " Innovación y creatividad", creditos: 3 },
      { nombre: "Electiva I", creditos: 3 },
    ]
  },
  {
    nombre: "Semestre 6",
    materias: [
      { nombre: "Sociedad,cuidadanía y comunicación", creditos: 3 },
      { nombre: "Periodismo investigativo", creditos: 3 },
      { nombre: "Narrativas Audiovisuales", creditos: 3 },
      { nombre: "Emprendimiento y empresarismo", creditos: 3 },
      { nombre: "Electiva I", creditos: 3 },
      { nombre: "Electiva II", creditos: 3 },
    ]
  },
  {
    nombre: "Semestre 7",
    materias: [
      { nombre: "Comunicación para el cambio social y políticas públicas", creditos: 3 },
      { nombre: "Investigación", creditos: 3 },
      { nombre: "Teoría Organizacional", creditos: 3 },
      { nombre: "Periodismo y géneros televisivos", creditos: 3 },
      { nombre: "Diseño web animación y multimedia", creditos: 3 },
      { nombre: "Logística", creditos: 3 },
      { nombre: "Electiva IV", creditos: 3 },
    ]
  },
  {
    nombre: "Semestre 8",
    materias: [
      { nombre: "Proyecto de Grado", creditos: 3 },
      { nombre: "Práctica Profesional", creditos: 3 },
      { nombre: "Relaciones interacionales", creditos: 3 },
      { nombre: "Tendencias en comunicación audiovisual y cultura digital", creditos: 3 },
      { nombre: " Diseño y producción transmedia", creditos: 3 },
      
    ]
  }
];

let totalCreditos = 0;
const contenedor = document.getElementById("semestres");
const creditosSpan = document.getElementById("creditos");

let seleccionadas = JSON.parse(localStorage.getItem("materiasSeleccionadas")) || [];

const totalMaterias = semestres.reduce((acc, sem) => acc + sem.materias.length, 0);

function mostrarFelicitacion() {
  if (seleccionadas.length === totalMaterias) {
    setTimeout(() => {
      alert("🎓 ¡Felicitaciones, nueva comunicadora social! 💖 Has completado toda la malla.");
    }, 300);
  }
}

function guardarSeleccionadas() {
  localStorage.setItem("materiasSeleccionadas", JSON.stringify(seleccionadas));
  alert("✅ ¡Tu selección ha sido guardada!");
}

document.getElementById("guardarBtn").addEventListener("click", guardarSeleccionadas);

semestres.forEach((sem, i) => {
  const semDiv = document.createElement("div");
  semDiv.classList.add("semestre");
  semDiv.innerHTML = `<h2>${sem.nombre}</h2>`;

  sem.materias.forEach((mat, j) => {
    const idMateria = `s${i}m${j}`;
    const matDiv = document.createElement("div");
    matDiv.classList.add("materia");
    matDiv.textContent = `${mat.nombre} (${mat.creditos} créditos)`;

    if (seleccionadas.includes(idMateria)) {
      matDiv.classList.add("seleccionada");
      totalCreditos += mat.creditos;
    }

    matDiv.addEventListener("click", () => {
      if (!matDiv.classList.contains("seleccionada")) {
        totalCreditos += mat.creditos;
        matDiv.classList.add("seleccionada");
        seleccionadas.push(idMateria);
      } else {
        totalCreditos -= mat.creditos;
        matDiv.classList.remove("seleccionada");
        seleccionadas = seleccionadas.filter(id => id !== idMateria);
      }

      creditosSpan.textContent = totalCreditos;
      mostrarFelicitacion();
    });

    semDiv.appendChild(matDiv);
  });

  contenedor.appendChild(semDiv);
});

creditosSpan.textContent = totalCreditos;
mostrarFelicitacion();