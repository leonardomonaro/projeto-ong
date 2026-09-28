import {
    validarCampo,
    validarFormulario,
    limparValidacao
} from "./validacao.js";

function aplicarMascaraCpf(valor) {
    return valor
        .replace(/\D/g, "")
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function aplicarMascaraTelefone(valor) {
    const numeros = valor
        .replace(/\D/g, "")
        .slice(0, 11);

    if (numeros.length <= 10) {
        return numeros
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return numeros
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
}

function aplicarMascaraCep(valor) {
    return valor
        .replace(/\D/g, "")
        .slice(0, 8)
        .replace(/(\d{5})(\d)/, "$1-$2");
}

function ocultarFeedbacks() {
    const area = document.querySelector(
        ".demonstracao-feedback"
    );

    const feedbacks = document.querySelectorAll(
        ".alerta, .toast"
    );

    if (area) {
        area.hidden = true;
    }

    feedbacks.forEach((feedback) => {
        feedback.hidden = true;
    });
}

function mostrarFeedback(tipo) {
    ocultarFeedbacks();

    const area = document.querySelector(
        ".demonstracao-feedback"
    );

    const seletores = {
        sucesso: ".alerta-sucesso",
        aviso: ".alerta-aviso",
        erro: ".alerta-erro"
    };

    const feedback = document.querySelector(
        seletores[tipo]
    );

    if (area) {
        area.hidden = false;
    }

    if (feedback) {
        feedback.hidden = false;
    }

            if (tipo === "sucesso") {
            if (window.Swal) {
                window.Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Cadastro enviado com sucesso!",
                    text: "Obrigado por querer colaborar com o projeto.",
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true
                });

                return;
            }

            const toast = document.querySelector(".toast");

            if (toast) {
                toast.hidden = false;

                window.setTimeout(() => {
                    toast.hidden = true;
                }, 4000);
            }
        }
}

function tratarDigitacao(evento) {
    const campo = evento.target;

    const campoCompativel =
        campo instanceof HTMLInputElement ||
        campo instanceof HTMLSelectElement;

    if (!campoCompativel) {
        return;
    }

    if (campo instanceof HTMLInputElement) {
        const mascaras = {
            cpf: aplicarMascaraCpf,
            telefone: aplicarMascaraTelefone,
            cep: aplicarMascaraCep
        };

        const aplicarMascara = mascaras[campo.id];

        if (aplicarMascara) {
            campo.value = aplicarMascara(campo.value);
        }
    }

    if (campo.matches("[required]")) {
        validarCampo(campo);
    }
}

function tratarEnvio(evento) {
    const formulario = evento.target;

    if (!formulario.matches("#form-cadastro")) {
        return;
    }

    evento.preventDefault();

    if (!validarFormulario(formulario)) {
        mostrarFeedback("erro");
        formulario.reportValidity();
        return;
    }

    mostrarFeedback("sucesso");
}

function tratarLimpeza(evento) {
    const formulario = evento.target;

    if (!formulario.matches("#form-cadastro")) {
        return;
    }

    window.setTimeout(() => {
        limparValidacao(formulario);
        mostrarFeedback("aviso");
    }, 0);
}

export function iniciarEventosInterface() {
    document.addEventListener(
        "input",
        tratarDigitacao
    );

    document.addEventListener(
        "change",
        tratarDigitacao
    );

    document.addEventListener(
        "submit",
        tratarEnvio
    );

    document.addEventListener(
        "reset",
        tratarLimpeza
    );
}