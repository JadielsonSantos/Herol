var url = window.location.search.split('=')[1];
if(url.length == 0) {
    alert('Por favor insira nome do desenho...')
}
var urlFiltrada = url.replaceAll('+', ' ')
var arrayDados = "";

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
    // Esse log vai retorna true ou false vai depende da verificacao em cima

}
// Funcao para transforma string em boliano 
function getValue(parament) {
    if (parament == "false") {
        return false;
    }
    return true;
}






fetch(`https://gateway.marvel.com/v1/public/characters?name=${urlFiltrada}&apikey=e25677106dc8820bdc8fe99d0e3b563e&hash=dca733da1ec0ff7f9028befe882afd84&ts=1620692803`)
    .then((response) => {
        return response.json();
    })
    .then((dados) => {
        // Verifica se a consulta a api vai retorna algo
        if(dados.data.count >= 1){
            arrayDados = dados.data.results;
            for (let i = 0; i < arrayDados.length; i++) {
                // Criando elementos em cada interação do for
                const col = document.createElement('div');
                col.classList.add('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-l12', 'col-xl-12', 'col-xxl-12');
                const card = document.createElement('div');
                card.classList.add('card');
                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                const cardTitle = document.createElement('h5');
                cardTitle.classList.add('card-title');
                const cardDescricao = document.createElement('p');
                cardDescricao.classList.add('card-text');
                const cardImg = document.createElement('img');
                cardImg.classList.add('card-img-top');

                // Add o conteudo nos elementos 
                cardTitle.innerText = arrayDados[i].name;
                cardDescricao.innerText = arrayDados[i].description;
                cardImg.src = arrayDados[i].thumbnail.path + '.' + arrayDados[i].thumbnail.extension;

                // Mostra no front

                const row = document.querySelector('.row');
                row.appendChild(col);
                col.appendChild(card);
                card.appendChild(cardImg);
                card.appendChild(cardBody);
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardDescricao);
            }
        }else {
            // Caso nao retorne nenhum personagem vai exibi um alerta
            const row = document.querySelector('.row');
            const divAlert = document.createElement('div');
            divAlert.classList.add('alert', 'alert-sucess');
            divAlert.role = 'alert';
            const alertMensagem = document.createElement('h4');
            alertMensagem.classList.add('alert-heading');
            alertMensagem.innerText = "Ops ocorreu um equívoco...";
            const alertDescricao = document.createElement('p');
            alertDescricao.innerText = "Infelizmente nao encontramos nenhuma heróis com esse nome "+urlFiltrada+"";
            row.appendChild(divAlert);
            divAlert.appendChild(alertMensagem);
            divAlert.appendChild(alertDescricao);
        }
    })
    .catch((erro) => {
        console.log(erro);
    })



