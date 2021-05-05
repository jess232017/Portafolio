var firebaseConfig = {
    apiKey: "AIzaSyC3iZuxFaw_9KN86TuBGyxWoDyh-T9U5WI",
    authDomain: "portafolio-7cc07.firebaseapp.com",
    projectId: "portafolio-7cc07",
    storageBucket: "portafolio-7cc07.appspot.com",
    messagingSenderId: "180388262570",
    appId: "1:180388262570:web:50bb291b0c1ca3ce7256d3",
    measurementId: "G-MEDM53TSBW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
firebase.analytics();

//#region  habilidades
db.ref().child('front-end').on('value', snap => {
    document.querySelector('#front-end').innerHTML = "";
    let frontEnd = snap.val();

    for (let i in frontEnd) {
        let item = frontEnd[i];
        addSkills(item);
    }
});

db.ref().child('back-end').on('value', snap => {
    document.querySelector('#back-end').innerHTML = "";
    let backEnd = snap.val();

    for (let i in backEnd) {
        let item = backEnd[i];
        addSkills(item);
    }
});

db.ref().child('portafolio').on('value', snap => {
    let divPortf = document.querySelector('#portafolio');
    divPortf.innerHTML = "";
    let Portfs = snap.val();

    for (let i in Portfs) {
        let item = Portfs[i];
        addPortfs(divPortf, item);
    }
});

function addSkills(data) {

    let skill = document.createElement('div');
    skill.classList = 'c-flex align-center margin-mini card-skills';
    skill.innerHTML = `
        <svg class="able-icons">
            <use xlink:href="./img/svg-symbols.svg#${data.imagen}"></use>
        </svg>
        <h2 class="title-3">${data.titulo}</h2>
        <p class="s-description">${data.subtitulo}</p>
    `;

    document.querySelector(data.contenedor).appendChild(skill);
}

function addPortfs(contenedor, data) {

    let portf = document.createElement('div');
    portf.classList = 'card-skills square';
    portf.innerHTML = `
        <figure class="imghvr-slide-up">
            <img src="img/portafolio/${data.imagen}">
        </figure>

        <div class="descripcion">
            <h2 class="title-3">${data.titulo}</h2>
            <svg style="width: 32px; height: 32px;">
                <use xlink:href="./img/svg-symbols.svg#logo-github"></use>
            </svg>
            <a target="_blank" href="${data.enlace}">Código</a><span class="subtitle-2"> /  ${data.lenguaje}  / ${data.fecha}</span>
        </div>
    `;

    contenedor.appendChild(portf);
}
//#endregion

//#region navbar
let onTop = true,
    checked = false;
const navbar = document.getElementById("navbar");
const ckClick = document.getElementById("click");

document.querySelector('#btn-menu').addEventListener('click', function() {
    checked = !checked;
    if (checked) {
        navbar.classList.add('checked');
        if (onTop) {
            navbar.classList.add('scrolled');
        }
    } else {
        navbar.classList.remove('checked');
        if (onTop) {
            navbar.classList.remove('scrolled');
        }
    }
});

window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop >= 20 || document.documentElement.scrollTop >= 20) {
        navbar.classList.add('scrolled');
        onTop = false;
    } else {
        onTop = true;
        if (!checked) {
            navbar.classList.remove('scrolled');
        }
    }
}
//#endregion