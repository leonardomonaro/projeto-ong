import { iniciarNavegacao } from "./modules/navegacao.js";
import { iniciarEventosInterface } from "./modules/eventos.js";

document.addEventListener("DOMContentLoaded", () => {
    iniciarNavegacao();
    iniciarEventosInterface();

    console.log(
        "Aplicação Projeto Novo Amanhã iniciada."
    );
});