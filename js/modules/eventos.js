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
    const feedbacks = document.querySelectorAll(
        ".alerta, .toast"
    );

    feedbacks.forEach((feedback) => {
        feedback.hidden = true;
    });
}

function mostrarFeedback(tipo) {
    ocultarFeedbacks();

    const seletores = {
        sucesso: ".alerta-sucesso",
        aviso: ".alerta-aviso",
        erro: ".alerta-erro"
    };

    const feedback = document.querySelector(
        seletores[tipo]
    );

    if (feedback) {
        feedback.hidden = false;
    }

    if (tipo === "sucesso") {
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

    if (!(campo instanceof HTMLInputElement)) {
        return;
    }

    const mascaras = {
        cpf: aplicarMascaraCpf,
        telefone: aplicarMascaraTelefone,
        cep: aplicarMascaraCep
    };

    const aplicarMascara = mascaras[campo.id];

    if (aplicarMascara) {
        campo.value = aplicarMascara(campo.value);
    }

    if (campo.matches("[required]")) {
        campo.setAttribute(
            "aria-invalid",
            String(!campo.validity.valid)
        );
    }
}

function tratarEnvio(evento) {
    const formulario = evento.target;

    if (!formulario.matches("#form-cadastro")) {
        return;
    }

    evento.preventDefault();

    if (!formulario.checkValidity()) {
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
        const campos = formulario.querySelectorAll(
            "[aria-invalid]"
        );

        campos.forEach((campo) => {
            campo.removeAttribute("aria-invalid");
        });

        mostrarFeedback("aviso");
    }, 0);
}

export function iniciarEventosInterface() {
    document.addEventListener(
        "input",
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