function obterMensagem(campo) {
    const validade = campo.validity;

    if (validade.valueMissing) {
        return "Este campo é obrigatório.";
    }

    if (validade.tooShort) {
        return `Digite pelo menos ${campo.minLength} caracteres.`;
    }

    if (validade.typeMismatch) {
        return "Digite um e-mail válido.";
    }

    if (validade.patternMismatch) {
        const mensagens = {
            cpf: "Digite o CPF no formato 000.000.000-00.",
            telefone: "Digite no formato (11) 99999-9999.",
            cep: "Digite o CEP no formato 00000-000."
        };

        return mensagens[campo.id] || "Formato inválido.";
    }

    if (
        campo.id === "nascimento" &&
        campo.value &&
        new Date(campo.value + "T00:00:00") > new Date()
    ) {
        return "A data de nascimento não pode estar no futuro.";
    }

    return "";
}

function obterElementoMensagem(campo) {
    const idMensagem = `${campo.id}-erro`;

    let mensagem = document.getElementById(idMensagem);

    if (!mensagem) {
        mensagem = document.createElement("small");
        mensagem.id = idMensagem;
        mensagem.className = "mensagem-campo";
        mensagem.setAttribute("aria-live", "polite");

        campo.insertAdjacentElement("afterend", mensagem);
    }

    return mensagem;
}

export function validarCampo(campo) {
    campo.setCustomValidity("");

    const mensagemTexto = obterMensagem(campo);

    if (mensagemTexto) {
        campo.setCustomValidity(mensagemTexto);
    }

    const mensagem = obterElementoMensagem(campo);
    const campoValido = mensagemTexto === "";

    campo.classList.toggle(
        "campo-invalido",
        !campoValido
    );

    campo.classList.toggle(
        "campo-valido",
        campoValido && campo.value !== ""
    );

    campo.setAttribute(
        "aria-invalid",
        String(!campoValido)
    );

    if (!campoValido) {
        campo.setAttribute(
            "aria-describedby",
            mensagem.id
        );

        mensagem.textContent = mensagemTexto;
    } else {
        campo.removeAttribute("aria-describedby");
        mensagem.textContent = "";
    }

    return campoValido;
}

export function validarFormulario(formulario) {
    const campos = formulario.querySelectorAll(
        "input[required], select[required]"
    );

    const resultados = Array.from(campos).map(
        (campo) => validarCampo(campo)
    );

    return resultados.every(
        (resultado) => resultado === true
    );
}

export function limparValidacao(formulario) {
    const campos = formulario.querySelectorAll(
        ".campo-valido, .campo-invalido"
    );

    campos.forEach((campo) => {
        campo.classList.remove(
            "campo-valido",
            "campo-invalido"
        );

        campo.removeAttribute("aria-invalid");
        campo.removeAttribute("aria-describedby");
        campo.setCustomValidity("");
    });

    const mensagens = formulario.querySelectorAll(
        ".mensagem-campo"
    );

    mensagens.forEach((mensagem) => {
        mensagem.remove();
    });
}