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

//#region Hero
var typed = new Typed('#dev-text', {
    strings: ["Desarrollador de Software.", "Ingeniero en Computación."],
    typeSpeed: 80,
    loop: true,
    backDelay: 1100,
    backSpeed: 30
});
//#endregion

//#region habilidades y portafolio
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

    let skill = document.createElement("div");
    skill.classList = 'c-flex align-center margin-mini card-skills';
    skill.innerHTML = `
            <svg class="able-icons">
                <use xlink:href="./img/svg-symbols.svg#${data.imagen}"></use>
            </svg>
            <a target="_blank" href="${data.url}"><h2 class="title-3">${data.titulo}</h2></a>
            <p class="s-description">${data.subtitulo}</p>
        `;

    /*
        ALTERNATIVA

        let skill = document.createElement('div');
        skill.classList = "card-skills square";
        skill.innerHTML = `
            <figure class="overlay-hover">
                <div class="c-flex justy-center align-center" style="background-color: white">
                    <svg class="able-icons">
                        <use xlink:href="./img/svg-symbols.svg#${data.imagen}"></use>
                    </svg>
                    <a target="_blank" href="${data.url}"><h2 class="title-3">${data.titulo}</h2></a>
                </div>
                <figcaption class="c-flex justy-center align-center">
                    <a target="_blank" href="${data.url}"><h3>${data.titulo}</h3></a>
                    <p class="s-description">${data.subtitulo}</p>
                </figcaption>
            </figure>
        `;
    */


    document.querySelector(data.contenedor).appendChild(skill);
}

function addPortfs(contenedor, data) {
    let herramientas = data.hecho_con,
        tools = "";

    herramientas.forEach(element => {
        tools += `
        <svg class="norm-icon">
            <use xlink:href="./img/svg-symbols.svg#logo-${element}"></use>
        </svg>
        `;
    });

    let portf = document.createElement('div');
    portf.classList = 'card-skills square';
    portf.innerHTML = `
        <figure class="overlay-hover">
            <img src="img/portafolio/${data.imagen}">
            <figcaption class="c-flex justy-center align-center">
                <h3>hecho con</h3>
                <a  class="flex" href="${data.url_github}" target="_blank">
                    ${tools}
                </a>
            </figcaption>
        </figure>
        <div class="card-body">
            <div class="card-category">
                <a href="${data.url_web}" target="_blank">VER PROYECTO</a>
            </div>
            <h2 class="title-3"><a target="_blank" href="${data.url_github}">${data.titulo}</a></h2>
            <p class="s-description">${data.descripcion}</p>
        </div>
    `;

    /*portf.innerHTML = `
        <figure class="overlay-hover">
            <img src="img/portafolio/${data.imagen}">
            <figcaption>
                <h3>Un Espacio Extra</h3>
                <p>Agregar mas contenido aca</p>
            </figcaption>
        </figure>

        <div class="card-body c-flex justy-between">
            <h2 class="title-3">${data.titulo}</h2>
            <div class="flex align-center">
                <svg style="width: 32px; height: 32px">
                    <use xlink:href="./img/svg-symbols.svg#logo-github"></use>
                </svg>
                <span style="padding: 6px;">
                    <a target="_blank" href="${data.enlace}">Código</a>
                    <span class="subtitle-2"> /  ${data.lenguaje}  / ${data.fecha}</span>
                </span>    
            </div>    
        </div>
    `;*/

    contenedor.appendChild(portf);
}
//#endregion

//#region navbar
let onTop = true,
    checked = false;
const navbar = document.getElementById("navbar");
const ckClick = document.getElementById("click");
const btnMenu = document.getElementById("btn-menu");

btnMenu.addEventListener('click', function() {
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

let enlaces = document.querySelectorAll('ul li a');

enlaces.forEach(enlace => {
    enlace.addEventListener('click', () => {
        btnMenu.click();
    });
});


window.onscroll = function() {
    if (document.body.scrollTop >= 20 || document.documentElement.scrollTop >= 20) {
        navbar.classList.add('scrolled');
        onTop = false;
    } else {
        onTop = true;
        if (!checked) {
            navbar.classList.remove('scrolled');
        }
    }
};
//#endregion