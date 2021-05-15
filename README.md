# Herol test front-end application

## Sobre
#### Herol e uma aplicação desenvolvida com objetivo de consumi a api da marvel, listandos os desenhos que eles dispõem, em forma de cards

## Objetivos
* [x] Mostra todos os herois em cards
* [x] Cria funcao de busca
* [x] Cria filtro do retorno da api
* [x] Mostra detalhes dos herois
* [x] Cria Paginação virtual com uso de session storage e localstorage
* [x] Cria possibilidade de muda o tema e salva persistente no navegador
* [x] Ser responsivo em Mobile, Tablet, Desktop
* [x] Cria o request com javascript ou algo dos framework [reactjs, vuejs, angulajs]
* [x] Criar arquivo usando sass
* [x] Implemente o conceito visual "B.E.M."
* [x] Css compilado deve ser organizado
* [x] Cria versao minificada do css compilado pelo sass

## Estrutura
```
│   index.html
│   README.md
│
├───busca
│   │   index.html
│   │
│   └───js
│           main.js
│
├───css
│   └───scss
│       │   style.css
│       │   style.css.map
│       │   style.scss
│       │
│       └───components
│               _cards.scss
│               _darkmode.scss
│               _fonts.scss
│               _header.scss
│               _paginacao.scss
│
└───js
        criamodal.js
        main.js
```