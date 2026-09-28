# Projeto Novo Amanhã

Aplicação web desenvolvida para uma ONG fictícia, com o objetivo de apresentar suas iniciativas, divulgar formas de contribuição e permitir o cadastro de novos voluntários.

## Funcionalidades

- Navegação SPA com hash routing
- Apresentação dinâmica dos projetos
- Listagem de itens para doação
- Formulário de cadastro de voluntários
- Máscaras para CPF, telefone e CEP
- Validação dinâmica dos campos
- Feedbacks visuais acessíveis
- Persistência da navegação com localStorage
- Notificações com SweetAlert2
- Layout responsivo

## Tecnologias utilizadas

- HTML5 semântico
- CSS3
- JavaScript ES6+
- ES6 Modules
- Web Storage API
- SweetAlert2
- Git e GitHub

## Estrutura do projeto

```text
projeto-ong/
├── css/
│   └── style.css
├── html/
│   ├── cadastro.html
│   ├── index.html
│   └── projetos.html
├── img/
│   ├── oficina-educativa.png
│   ├── oficina-educativa.webp
│   ├── voluntarios.png
│   └── voluntarios.webp
├── js/
│   ├── main.js
│   └── modules/
│       ├── armazenamento.js
│       ├── eventos.js
│       ├── navegacao.js
│       ├── templates.js
│       └── validacao.js
└── README.md