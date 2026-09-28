const CHAVE_NAVEGACAO = "projetoOng:navegacao";

function obterEstadoInicial() {
    return {
        ultimaRota: "inicio",
        historico: []
    };
}

function lerEstado() {
    const dadosSalvos = localStorage.getItem(CHAVE_NAVEGACAO);

    if (!dadosSalvos) {
        return obterEstadoInicial();
    }

    try {
        return JSON.parse(dadosSalvos);
    } catch (erro) {
        console.error("Não foi possível recuperar os dados:", erro);
        return obterEstadoInicial();
    }
}

function salvarEstado(estado) {
    const dadosEmTexto = JSON.stringify(estado);

    localStorage.setItem(CHAVE_NAVEGACAO, dadosEmTexto);
}

export function registrarNavegacao(rota, secao) {
    const estado = lerEstado();

    const destino = secao
        ? `${rota}/${secao}`
        : rota;

    const novoRegistro = {
        destino,
        acessadoEm: new Date().toISOString()
    };

    estado.ultimaRota = destino;
    estado.historico.push(novoRegistro);

    estado.historico = estado.historico.slice(-10);

    salvarEstado(estado);
}

export function obterUltimaRota() {
    const estado = lerEstado();

    return estado.ultimaRota;
}