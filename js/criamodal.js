// Arquivo que vai fica de responsavel por cria modal e coloca conteudo



const apiPubli = "e25677106dc8820bdc8fe99d0e3b563e";
const dateTem = "1620692803";
const apiPublicUse = "dca733da1ec0ff7f9028befe882afd84";
var notPersonagem = null;
var isPersonagem = null;

function montaModal(id) {
    fetch(`http://gateway.marvel.com/v1/public/comics/${id}/characters?apikey=${apiPublic}&hash=${apiPublicUse}&ts=${dateTemp}`)
        .then((response) => {
            return response.json();
        })
        .then((dados) => {
            const modalTitle = document.querySelector('.modal-title');
            const modalDescricao = document.querySelector('.modal-descricao');
            // Verificando os dados recebido e filtrando os que tem descricao e nome 
            if(dados.data.results[0]){
                isPersonagem = dados.data.results[0];
                modalTitle.innerText = isPersonagem.name;
                modalDescricao.innerText = isPersonagem.description;
            }else {
                console.log(dados);
                modalTitle.innerText = "This character has no description";
                modalDescricao.innerText = "A thousand excuses of the moment the character does not contain description";
            }
        })
        .catch((erro) => {
            alert('Infelismente ocorreu um erro, consute o console blz...')
            console.log(erro);
        })

}