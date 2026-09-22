const screen = document.getElementById("screen");
const startButton = document.getElementById("startButton");

// Aquí guardaremos todo lo que Amanda vaya contestando
const investigation = {
    mood: "",
    receivedFlowers: null,
    sender: "",
    flowerRating: 0,
    suspicion: 20
};


// ================================
// FUNCIONES GENERALES
// ================================

function changeScreen(content) {
    screen.style.animation = "none";

    setTimeout(() => {
        screen.innerHTML = content;

        screen.style.animation = "appear 0.6s ease";
    }, 150);
}


function suspicionBar() {

    let level = investigation.suspicion;

    if (level > 100) level = 100;
    if (level < 0) level = 0;

    return `
        <div style="margin-bottom: 25px;">
            <p style="
                color:#777;
                font-size:0.7rem;
                letter-spacing:2px;
                margin-bottom:8px;
            ">
                NIVEL DE SOSPECHA
            </p>

            <div style="
                width:100%;
                height:8px;
                background:#292929;
                border-radius:20px;
                overflow:hidden;
            ">
                <div style="
                    width:${level}%;
                    height:100%;
                    background:#e1b900;
                    transition:1s;
                "></div>
            </div>

            <p style="
                margin-top:7px;
                color:#aaa;
                font-size:0.75rem;
            ">
                ${level}%
            </p>
        </div>
    `;
}


// ================================
// PREGUNTA 1
// ================================

function questionOne() {

    changeScreen(`
        ${suspicionBar()}

        <p class="classified">
            INTERROGATORIO 01
        </p>

        <h1 style="font-size:2rem;">
            Empecemos tranquilamente.
        </h1>

        <p class="description">
            Amanda, ¿cómo estuvo tu día?
        </p>

        <button onclick="answerMood('bien')">
            😌 Muy bien
        </button>

        <button onclick="answerMood('normal')" style="margin-top:12px;">
            😐 Normal
        </button>

        <button onclick="answerMood('mal')" style="margin-top:12px;">
            😔 Mal
        </button>
    `);
}


function answerMood(answer) {

    investigation.mood = answer;

    if (answer === "bien") {

        investigation.suspicion += 10;

        reaction(
            "🤨",
            "¿Muy bien?",
            "Curioso... demasiado bien considerando los acontecimientos recientes.",
            questionTwo
        );

    }

    else if (answer === "normal") {

        investigation.suspicion += 5;

        reaction(
            "📝",
            "Respuesta registrada",
            "“Normal”. La respuesta favorita de cualquier persona bajo investigación.",
            questionTwo
        );

    }

    else {

        investigation.suspicion -= 5;

        reaction(
            "📞",
            "Situación preocupante",
            "Tonny, tenemos un problema. Y sorprendentemente esta vez quizá no sean las flores.",
            questionTwo
        );

    }
}


// ================================
// PANTALLA DE REACCIÓN
// ================================

function reaction(icon, title, text, nextFunction) {

    changeScreen(`
        <div class="icon">${icon}</div>

        <p class="classified">
            RESPUESTA ANALIZADA
        </p>

        <h1 style="font-size:2rem;">
            ${title}
        </h1>

        <p class="description">
            ${text}
        </p>

        <button id="continueButton">
            CONTINUAR
        </button>
    `);

    setTimeout(() => {

        document
            .getElementById("continueButton")
            .addEventListener("click", nextFunction);

    }, 200);
}


// ================================
// PREGUNTA 2
// ================================

function questionTwo() {

    changeScreen(`
        ${suspicionBar()}

        <p class="classified">
            INTERROGATORIO 02
        </p>

        <h1 style="font-size:2rem;">
            Ahora sí.
        </h1>

        <p class="description">
            Amanda...
            <br><br>
            ¿Recibiste flores amarillas recientemente?
        </p>

        <button onclick="flowersAnswer(true)">
            🌻 Sí
        </button>

        <button
            onclick="flowersAnswer(false)"
            style="margin-top:12px;"
        >
            No 👀
        </button>
    `);
}


function flowersAnswer(answer) {

    investigation.receivedFlowers = answer;

    if (answer) {

        investigation.suspicion += 35;

        reaction(
            "🚨",
            "CONFESIÓN REGISTRADA",
            `
            Amanda acaba de admitir oficialmente
            haber recibido flores amarillas.
            <br><br>
            <strong>Procedencia:</strong> cuestionable.
            <br>
            <strong>Tonny:</strong> probablemente leyendo esto.
            `,
            questionThreeYes
        );

    }

    else {

        investigation.suspicion += 25;

        scanningScreen();

    }
}


// ================================
// ESCÁNER PARA EL "NO"
// ================================

function scanningScreen() {

    changeScreen(`
        <div class="icon">🔍</div>

        <p class="classified">
            VERIFICANDO DECLARACIÓN
        </p>

        <h1 style="font-size:2rem;">
            Analizando respuesta...
        </h1>

        <p id="scanText" class="description">
            Consultando expediente...
        </p>

        <div style="
            width:100%;
            height:8px;
            background:#292929;
            border-radius:20px;
            overflow:hidden;
        ">
            <div id="scanner" style="
                width:0%;
                height:100%;
                background:#e1b900;
                transition:3s linear;
            "></div>
        </div>
    `);

    setTimeout(() => {
        document.getElementById("scanner").style.width = "100%";
    }, 300);

    setTimeout(() => {
        document.getElementById("scanText").innerHTML =
            "Comparando con evidencia floral...";
    }, 1300);

    setTimeout(() => {
        document.getElementById("scanText").innerHTML =
            "Resultado: <strong>ALTAMENTE SOSPECHOSO.</strong>";
    }, 2600);

    setTimeout(() => {
        questionThreeNo();
    }, 4000);
}


// ================================
// RUTA: DIJO QUE SÍ
// ================================

function questionThreeYes() {

    changeScreen(`
        ${suspicionBar()}

        <p class="classified">
            INTERROGATORIO 03-A
        </p>

        <h1 style="font-size:2rem;">
            Tenemos una pregunta.
        </h1>

        <p class="description">
            ¿Quién te mandó esas flores?
        </p>

        <button onclick="senderAnswer('tonny')">
            ❤️ Tonny
        </button>

        <button onclick="senderAnswer('nose')" style="margin-top:12px;">
            👀 No sé
        </button>

        <button onclick="senderAnswer('amigo')" style="margin-top:12px;">
            🤝 “Un amigo”
        </button>

        <button onclick="senderAnswer('silencio')" style="margin-top:12px;">
            ⚖️ Prefiero permanecer en silencio
        </button>
    `);
}


// ================================
// RUTA: DIJO QUE NO
// ================================

function questionThreeNo() {

    changeScreen(`
        ${suspicionBar()}

        <p class="classified">
            INTERROGATORIO 03-B
        </p>

        <h1 style="font-size:2rem;">
            Interesante...
        </h1>

        <p class="description">
            Entonces si hipotéticamente hubieras recibido
            flores amarillas...
            <br><br>
            ¿quién crees que te las habría mandado?
        </p>

        <button onclick="senderAnswer('tonny')">
            ❤️ Tonny
        </button>

        <button onclick="senderAnswer('nose')" style="margin-top:12px;">
            👀 Ni idea
        </button>

        <button onclick="senderAnswer('amigo')" style="margin-top:12px;">
            🤝 Hipotéticamente... “un amigo”
        </button>
    `);
}


// ================================
// RESPUESTA DEL REMITENTE
// ================================

function senderAnswer(answer) {

    investigation.sender = answer;

    if (answer === "tonny") {

        investigation.suspicion -= 15;

        reaction(
            "✅",
            "Respuesta aceptable",
            "Tonny ha sido seleccionado. El nivel de sospecha ha disminuido ligeramente.",
            ratingQuestion
        );

    }

    else if (answer === "nose") {

        investigation.suspicion += 15;

        reaction(
            "🤨",
            "¿No sabes?",
            "Claro, Amanda. Y nosotros nacimos ayer.",
            ratingQuestion
        );

    }

    else if (answer === "amigo") {

        investigation.suspicion += 30;

        reaction(
            "🚨",
            "ALERTA DE SEGURIDAD",
            "TONNY. VEN A VER ESTO.",
            ratingQuestion
        );

    }

    else {

        investigation.suspicion += 20;

        reaction(
            "⚖️",
            "Solicitud denegada",
            "El Departamento Internacional de Flores Amarillas no reconoce ese derecho.",
            ratingQuestion
        );

    }
}


// ================================
// CALIFICAR LAS FLORES
// ================================

function ratingQuestion() {

    changeScreen(`
        ${suspicionBar()}

        <p class="classified">
            EVALUACIÓN DE EVIDENCIA
        </p>

        <h1 style="font-size:2rem;">
            Última cosa sobre las flores...
        </h1>

        <p class="description">
            Del 1 al 10,
            ¿qué tan bonitas estaban?
        </p>

        <input
            id="rating"
            type="range"
            min="1"
            max="10"
            value="5"
            style="width:100%;"
            oninput="updateRating(this.value)"
        >

        <h1
            id="ratingNumber"
            style="
                color:#e1b900;
                margin:25px 0;
                font-size:4rem;
            "
        >
            5
        </h1>

        <button onclick="submitRating()">
            REGISTRAR CALIFICACIÓN
        </button>
    `);
}


function updateRating(value) {

    document.getElementById("ratingNumber").innerText = value;

}


function submitRating() {

    const rating =
        Number(document.getElementById("rating").value);

    investigation.flowerRating = rating;

    if (rating <= 4) {

        investigation.suspicion -= 10;

        reaction(
            "😌",
            "Excelente.",
            "Tonny puede dormir tranquilo esta noche.",
            trapQuestion
        );

    }

    else if (rating <= 8) {

        investigation.suspicion += 10;

        reaction(
            "📋",
            "Respuesta preocupante",
            "El comité ha tomado nota de esta información.",
            trapQuestion
        );

    }

    else {

        investigation.suspicion += 25;

        reaction(
            "🚨",
            "9 O 10...",
            "Esta información ha sido enviada automáticamente a Tonny.",
            trapQuestion
        );

    }
}


// ================================
// PREGUNTA TRAMPA
// ================================

function trapQuestion() {

    changeScreen(`
        ${suspicionBar()}

        <p class="classified">
            PRUEBA FINAL
        </p>

        <h1 style="font-size:2rem;">
            ¿Quién da mejores flores?
        </h1>

        <p class="description">
            Selecciona cuidadosamente.
            Esta respuesta podría tener consecuencias.
        </p>

        <button onclick="chooseTonny()">
            🌻 Tonny
        </button>

        <button
            id="wrongButton"
            style="
                margin-top:12px;
                background:#333;
                color:white;
            "
        >
            🌻 La otra persona
        </button>
    `);

    setTimeout(() => {

        const wrongButton =
            document.getElementById("wrongButton");

        wrongButton.addEventListener(
            "mouseenter",
            escapeButton
        );

        wrongButton.addEventListener(
            "touchstart",
            escapeButton
        );

    }, 300);
}


// ================================
// BOTÓN QUE ESCAPA
// ================================

function escapeButton() {

    const button =
        document.getElementById("wrongButton");

    button.style.position = "fixed";

    const maxX =
        window.innerWidth - button.offsetWidth - 20;

    const maxY =
        window.innerHeight - button.offsetHeight - 20;

    const randomX =
        Math.max(20, Math.random() * maxX);

    const randomY =
        Math.max(20, Math.random() * maxY);

    button.style.left = randomX + "px";
    button.style.top = randomY + "px";
}


function chooseTonny() {

    investigation.suspicion -= 20;

    finalAnalysis();

}


// ================================
// ANÁLISIS FINAL
// ================================

function finalAnalysis() {

    changeScreen(`
        <div class="icon">🖥️</div>

        <p class="classified">
            PROCESANDO EXPEDIENTE
        </p>

        <h1 style="font-size:2rem;">
            Calculando veredicto...
        </h1>

        <p id="finalText" class="description">
            Revisando declaraciones...
        </p>

        <div style="
            width:100%;
            height:8px;
            background:#292929;
            border-radius:20px;
            overflow:hidden;
        ">
            <div id="finalBar" style="
                width:0%;
                height:100%;
                background:#e1b900;
                transition:4s linear;
            "></div>
        </div>
    `);

    setTimeout(() => {
        document.getElementById("finalBar").style.width = "100%";
    }, 300);

    setTimeout(() => {
        document.getElementById("finalText").innerText =
            "Analizando flores...";
    }, 1200);

    setTimeout(() => {
        document.getElementById("finalText").innerText =
            "Comparando declaraciones...";
    }, 2200);

    setTimeout(() => {
        document.getElementById("finalText").innerText =
            "Contactando a Tonny...";
    }, 3200);

    setTimeout(() => {
        finalResult();
    }, 4500);
}


// ================================
// RESULTADO
// ================================

function finalResult() {

    let suspicion = investigation.suspicion;

    if (suspicion > 100) suspicion = 100;
    if (suspicion < 0) suspicion = 0;

    let verdict;

    if (suspicion <= 30) {

        verdict =
            "Amanda queda absuelta por falta de evidencia.";

    }

    else if (suspicion <= 60) {

        verdict =
            "Amanda queda bajo vigilancia floral preventiva.";

    }

    else {

        verdict =
            "Amanda deberá explicar varias cosas ante el comité familiar.";

    }

    changeScreen(`
        <div class="icon">📁</div>

        <p class="classified">
            INVESTIGACIÓN FINALIZADA
        </p>

        <h1 style="font-size:2.3rem;">
            CASO CERRADO
        </h1>

        <div style="
            text-align:left;
            background:#111;
            border:1px solid #333;
            padding:20px;
            border-radius:8px;
            margin:25px 0;
            line-height:2;
        ">

            <strong>Sujeto:</strong> Amanda
            <br>

            <strong>Persona afectada:</strong> Tonny
            <br>

            <strong>Objeto involucrado:</strong>
            Flores amarillas 🌻
            <br>

            <strong>Calificación de las flores:</strong>
            ${investigation.flowerRating}/10
            <br>

            <strong>Nivel final de sospecha:</strong>
            ${suspicion}%

        </div>

        <p class="description">
            <strong>${verdict}</strong>
            <br><br>

            Sin embargo, independientemente del resultado,
            deberá soportar carrilla relacionada con las
            flores amarillas hasta nuevo aviso.
        </p>

        <div class="warning">
            Este interrogatorio fue programado con aproximadamente
            el mismo nivel de dificultad necesario para mandar
            flores virtuales.
        </div>

        <button onclick="location.reload()">
            REABRIR EXPEDIENTE
        </button>
    `);
}


// ================================
// INICIO
// ================================

startButton.addEventListener("click", questionOne);