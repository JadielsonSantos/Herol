const apiPublic = "e25677106dc8820bdc8fe99d0e3b563e";
const dateTemp = "1620692803";
const apiPublicUser = "dca733da1ec0ff7f9028befe882afd84";
var arrayDados = [];
var arrayPersonagemTotal = [];
arrayPersonagem1 = [];
arrayPersonagem2 = [];
arrayPersonagem3 = [];
var limit = 54;


window.onload = Inicio();

function Inicio() {
    const check = document.querySelector('.form-check-input');
    const body = document.querySelector('body');
    check.checked = getValue(localStorage.getItem('ativa'));
    if (check.checked) {
        body.classList.add('dark-mode');
        theme.classList.remove('far', 'fa-moon');
        theme.classList.add('fas', 'fa-moon');
    } else {
        body.classList.remove('dark-mode')
        theme.classList.remove('fas', 'fa-moon');
        theme.classList.add('far', 'fa-moon');
    }
    fetch(`http://gateway.marvel.com/v1/public/comics?ts=${dateTemp}&apikey=${apiPublic}&hash=${apiPublicUser}&limit=${limit}`)
        .then((response) => {
            return response.json();
        })
        .then((dados) => {
            // recebendo dos os dados trazido da api 
            arrayDados = dados.data.results;
            // chama funcao para filtra os dados
            filtro(arrayDados);
        })
        .catch((erro) => {
            console.log(erro);
        })
}

function filtro(filtraDados) {
    // For vai verifica os elementos que nao tem descrição e vai coloca um Lorem Ipsum 
    for (let i = 0; i < filtraDados.length; i++) {
        if (!filtraDados[i].description == "") {

        } else {
            filtraDados[i].description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo saepe, debitis ratione commodi voluptatibus molestiae veniam aliquid aliquam corporis facilis inventore possimus illum tempora sit ex dicta maxime qui et.";
        }

    }
    // Vai filtra todos os dados e tirando os dados que nao tive img ( que a imagem seja image_not_available)
    arrayPersonagemTotal = arrayDados.filter(dados => dados.thumbnail.path > "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available")
    // Vai separa o arrayPersonagemTotal em 3 array novos
    arrayPersonagem1 = arrayPersonagemTotal.slice(0, 4);
    arrayPersonagem2 = arrayPersonagemTotal.slice(4, 8);
    arrayPersonagem3 = arrayPersonagemTotal.slice(8, 12);

    // Vai pega o elemento que controla pages 
    const item = document.querySelectorAll('.item');

    // Função vai verifica qual page esta e vai add Personagens no front-end
    switch (sessionStorage.getItem('page')) {
        case '1':
            limpaClass();
            item[0].classList.add('active');            
            criaElementos(arrayPersonagem1);
            break;
        case '2':
            limpaClass();
            item[1].classList.add('active')            
            criaElementos(arrayPersonagem2);
            break;
        case '3':
            limpaClass();
            item[2].classList.add('active')            
            criaElementos(arrayPersonagem3);
            break;

        default:
            // Verificação vai cai aqui quando inicia em uma nova guia
            limpaClass();
            item[0].classList.add('active');
            criaElementos(arrayPersonagem1)
            break;
    }
    function limpaClass(){
        for (let i = 0; i < item.length; i++) {
            item[i].classList.remove('active');
        }
    }
}


function criaElementos(personagens) {
    for (let i = 0; i < personagens.length; i++) {
        // Criando elementos em cada interação do for
        const col = document.createElement('div');
        col.classList.add('col-xs-12', 'col-sm-12', 'col-md-6', 'col-lg-l6', 'col-xl-6', 'col-xxl-6');
        const card = document.createElement('div');
        card.classList.add('card');
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        const a = `<button type='button' onclick='montaModal(${personagens[i].id})' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal'>Mais detalhes</button>`;
        const cardImg = document.createElement('img');
        cardImg.classList.add('card-img-top');

        // Add o conteudo nos elementos 
        cardTitle.innerText = personagens[i].title;
        cardImg.src = personagens[i].thumbnail.path + '.' + personagens[i].thumbnail.extension;
        mostraFront(col, card, cardBody, cardImg, cardTitle, a);
    }
}

function mostraFront(col, card, cardBody, cardImg, cardTitle, a) {
    const row = document.querySelector('.row');
    row.appendChild(col);
    col.appendChild(card);
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    cardBody.innerHTML = a;
    cardBody.appendChild(cardTitle);
}

// Funcao que Verifica se o theme esta check e salva em localstorage
function check(element) {
    const theme = document.querySelector("#theme");
    const body = document.querySelector("body");
    const ativa = localStorage.getItem('ativa');
    if (!getValue(ativa)) {
        body.classList.add('dark-mode');
        theme.classList.remove('far', 'fa-moon')
        theme.classList.add('fas', 'fa-moon')
    } else {
        body.classList.remove('dark-mode');
        theme.classList.remove('fas', 'fa-moon')
        theme.classList.add('far', 'fa-moon')
    }
    localStorage.setItem('ativa', !getValue(ativa))

}
// Funcao para transforma string em boliano 
function getValue(parament) {
    if (parament == "false") {
        return false;
    }
    return true;
}


// Funcoes da paginacoes

var pageAtual = sessionStorage.getItem('page');

function proximo() {
    if (pageAtual == '3') {
        sessionStorage.setItem('page', 3);
    limpapage();
    }else {
        var nu = ++pageAtual;
        sessionStorage.setItem('page', nu)
        limpapage();
    }
}
function volta() {
    if (pageAtual == '1') {
        sessionStorage.setItem('page', 1);
        limpapage();
    }else {
        var nu = --pageAtual;
        sessionStorage.setItem('page', nu)
        limpapage();

    }
}

function page(index) {
    sessionStorage.setItem('page', index)
    // Vou zera tudo que tive dentro do elemento principal e vou chama a funcao inicio pra add os novos elementos
    limpapage()
}
function limpapage() {
    pageAtual = sessionStorage.getItem('page');
    // Vou sera tudo que tive dentro do elemento principal e vou chama a funcao inicio pra add os novos elementos
    document.querySelector('.row').innerHTML = '';
    Inicio();
}

