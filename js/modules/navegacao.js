import { templates } from "./templates.js";

const titulos = {
    inicio: "Projeto Novo Amanhã",
    projetos: "Projetos | Projeto Novo Amanhã",
    cadastro: "Cadastro | Projeto Novo Amanhã"
};

function obterDestino() {
    const hash = window.location.hash.replace("#", "");

    if (!hash) {
        return {
            rota: "inicio",
            secao: null
        };
    }

    const [rota, secao] = hash.split("/");

    return {
        rota,
        secao: secao || null
    };
}

function atualizarLinkAtivo(rotaAtual) {
    const links = document.querySelectorAll(
        ".menu-principal a[data-route]"
    );

    links.forEach((link) => {
        const rotaDoLink = link.dataset.route.split("/")[0];

        if (rotaDoLink === rotaAtual) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

function fecharMenuMobile() {
    const controleMenu = document.querySelector("#menu-toggle");

    if (controleMenu) {
        controleMenu.checked = false;
    }
}

function acessarSecao(secao) {
    if (!secao) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return;
    }

    requestAnimationFrame(() => {
        const elemento = document.getElementById(secao);

        if (elemento) {
            elemento.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
}

export function renderizarRota() {
    const container = document.querySelector("#app");
    const { rota, secao } = obterDestino();

    const criarConteudo =
        templates[rota] || templates.naoEncontrada;

    container.innerHTML = criarConteudo();

    document.title =
        titulos[rota] || "Página não encontrada";

    atualizarLinkAtivo(rota);
    fecharMenuMobile();
    acessarSecao(secao);

    container.focus({
        preventScroll: Boolean(secao)
    });
}

function tratarCliqueNavegacao(evento) {
    const link = evento.target.closest("[data-route]");

    if (!link) {
        return;
    }

    evento.preventDefault();

    const destino = link.dataset.route;
    const novoHash = `#${destino}`;

    if (window.location.hash === novoHash) {
        renderizarRota();
    } else {
        window.location.hash = novoHash;
    }
}

export function iniciarNavegacao() {
    document.addEventListener(
        "click",
        tratarCliqueNavegacao
    );

    window.addEventListener(
        "hashchange",
        renderizarRota
    );

    renderizarRota();
}