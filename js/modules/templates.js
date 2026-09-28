const dadosProjetos = [
    {
        id: "educacao",
        titulo: "Educação para o Futuro",
        categoria: "Educação",
        classeBadge: "badge-educacao",
        descricao:
            "Aulas de reforço escolar, leitura e informática para " +
            "crianças e adolescentes da comunidade."
    },
    {
        id: "alimentos",
        titulo: "Alimento que Transforma",
        categoria: "Doações",
        classeBadge: "badge-doacao",
        descricao:
            "Arrecadação e distribuição de alimentos para famílias " +
            "em situação de vulnerabilidade social."
    },
    {
        id: "oficinas",
        titulo: "Oficinas para a Comunidade",
        categoria: "Oficinas",
        classeBadge: "badge-oficina",
        descricao:
            "Oficinas culturais e profissionalizantes voltadas à " +
            "criatividade, autonomia e geração de renda."
    }
];

const itensParaDoacao = [
    "Alimentos não perecíveis",
    "Materiais escolares",
    "Roupas em bom estado",
    "Produtos de higiene pessoal"
];

function criarCardProjeto(projeto) {
    return `
        <article id="${projeto.id}">
            <h3>${projeto.titulo}</h3>

            <span class="badge ${projeto.classeBadge}">
                ${projeto.categoria}
            </span>

            <p>${projeto.descricao}</p>
        </article>
    `;
}

function criarItemDoacao(item) {
    return `<li>${item};</li>`;
}

export const templates = {
    inicio: () => `
        <section>
            <h2>Quem somos</h2>

            <picture>
                <source
                    srcset="../img/voluntarios.webp"
                    type="image/webp"
                >

                <img
                    src="../img/voluntarios.png"
                    alt="Voluntários distribuindo alimentos para famílias da comunidade"
                    width="600"
                >
            </picture>

            <p>
                O Projeto Novo Amanhã é uma organização sem fins
                lucrativos dedicada ao apoio de crianças, adolescentes
                e famílias em situação de vulnerabilidade social.
            </p>

            <p>
                Nossa missão é promover oportunidades por meio de ações
                educacionais, culturais e de assistência social.
            </p>
        </section>

        <section>
            <h2>Como ajudar</h2>

            <p>
                Participe de nossas campanhas, faça uma doação ou
                cadastre-se para atuar como voluntário.
            </p>

            <a href="#cadastro" data-route="cadastro">
                Quero ser voluntário
            </a>
        </section>

        <section>
            <h2>Contato</h2>

            <address>
                <p>
                    E-mail:
                    <a href="mailto:contato@novamanha.org">
                        contato@novamanha.org
                    </a>
                </p>

                <p>
                    Telefone:
                    <a href="tel:+551147474747">
                        (11) 4747-4747
                    </a>
                </p>

                <p>Rua da Solidariedade, 100 – Suzano/SP</p>
            </address>
        </section>
    `,

    projetos: () => `
        <section>
            <h2>Nossos projetos sociais</h2>

            <picture>
                <source
                    srcset="../img/oficina-educativa.webp"
                    type="image/webp"
                >

                <img
                    src="../img/oficina-educativa.png"
                    alt="Voluntários auxiliando crianças e adolescentes em uma oficina educativa"
                    width="600"
                >
            </picture>

            ${dadosProjetos.map(criarCardProjeto).join("")}

        </section>

        <section>
            <h2>Campanha de doação</h2>

            <p>Você pode contribuir com os seguintes itens:</p>

            <ul>
                ${itensParaDoacao.map(criarItemDoacao).join("")}
            </ul>

            <p>
                Entre em contato pelo e-mail
                <a href="mailto:doacoes@novamanha.org">
                    doacoes@novamanha.org
                </a>.
            </p>
        </section>

        <section>
            <h2>Trabalho voluntário</h2>

            <p>
                Os voluntários podem participar das atividades
                educacionais, campanhas e distribuição de doações.
            </p>

            <a href="#cadastro" data-route="cadastro">
                Faça seu cadastro
            </a>
        </section>
    `,

    cadastro: () => `
        <section>
            <h2>Faça parte da nossa equipe</h2>

            <p>
                Preencha os campos obrigatórios indicados abaixo.
            </p>

            <form id="form-cadastro" action="#" method="post">
                <fieldset>
                    <legend>Dados pessoais</legend>

                    <p>
                        <label for="nome">Nome completo:</label>

                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            minlength="3"
                            autocomplete="name"
                            required
                        >
                    </p>

                    <p>
                        <label for="cpf">CPF:</label>

                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            pattern="[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}"
                            placeholder="000.000.000-00"
                            maxlength="14"
                            title="Digite no formato 000.000.000-00"
                            required
                        >
                    </p>

                    <p>
                        <label for="nascimento">
                            Data de nascimento:
                        </label>

                        <input
                            type="date"
                            id="nascimento"
                            name="nascimento"
                            required
                        >
                    </p>

                    <p>
                        <label for="email">E-mail:</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            autocomplete="email"
                            required
                        >
                    </p>
                </fieldset>

                <fieldset>
                    <legend>Contato e endereço</legend>

                    <p>
                        <label for="telefone">Telefone:</label>

                        <input
                            type="tel"
                            id="telefone"
                            name="telefone"
                            pattern="\\([0-9]{2}\\) [0-9]{4,5}-[0-9]{4}"
                            placeholder="(11) 99999-9999"
                            maxlength="15"
                            title="Digite no formato (11) 99999-9999"
                            required
                        >
                    </p>

                    <p>
                        <label for="cep">CEP:</label>

                        <input
                            type="text"
                            id="cep"
                            name="cep"
                            pattern="[0-9]{5}-[0-9]{3}"
                            placeholder="00000-000"
                            maxlength="9"
                            title="Digite no formato 00000-000"
                            required
                        >
                    </p>

                    <p>
                        <label for="endereco">Endereço:</label>

                        <input
                            type="text"
                            id="endereco"
                            name="endereco"
                            required
                        >
                    </p>

                    <p>
                        <label for="cidade">Cidade:</label>

                        <input
                            type="text"
                            id="cidade"
                            name="cidade"
                            required
                        >
                    </p>

                    <p>
                        <label for="estado">Estado:</label>

                        <select id="estado" name="estado" required>
                            <option value="">Selecione</option>
                            <option value="SP">São Paulo</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PR">Paraná</option>
                        </select>
                    </p>
                </fieldset>

                <fieldset>
                    <legend>Área de interesse</legend>

                    <p>
                        <input
                            type="checkbox"
                            id="interesse-educacao"
                            name="interesse"
                            value="educacao"
                        >

                        <label for="interesse-educacao">
                            Educação
                        </label>
                    </p>

                    <p>
                        <input
                            type="checkbox"
                            id="interesse-doacoes"
                            name="interesse"
                            value="doacoes"
                        >

                        <label for="interesse-doacoes">
                            Campanhas de doação
                        </label>
                    </p>

                    <p>
                        <input
                            type="checkbox"
                            id="interesse-oficinas"
                            name="interesse"
                            value="oficinas"
                        >

                        <label for="interesse-oficinas">
                            Oficinas comunitárias
                        </label>
                    </p>
                </fieldset>

                <button type="submit">Enviar cadastro</button>
                <button type="reset">Limpar formulário</button>
            </form>
        </section>

        <section
            class="demonstracao-feedback"
            aria-labelledby="titulo-feedback"
            hidden
        >
            <h2 id="titulo-feedback">
                Retornos do formulário
            </h2>

            <div
                class="alerta alerta-sucesso"
                role="status"
                hidden
            >
                <strong>Cadastro realizado!</strong>

                <span>
                    Seus dados foram recebidos com sucesso.
                </span>
            </div>

            <div
                class="alerta alerta-aviso"
                role="status"
                hidden
            >
                <strong>Formulário limpo.</strong>

                <span>
                    Os dados preenchidos foram removidos.
                </span>
            </div>

            <div
                class="alerta alerta-erro"
                role="alert"
                hidden
            >
                <strong>Não foi possível enviar.</strong>

                <span>
                    Corrija os campos destacados e tente novamente.
                </span>
            </div>
        </section>

        <aside
            class="toast"
            role="status"
            aria-live="polite"
            hidden
        >
            <span aria-hidden="true">✓</span>

            <div>
                <strong>Dados salvos</strong>

                <p>
                    As informações do voluntário foram registradas.
                </p>
            </div>
        </aside>

    `,

    naoEncontrada: () => `
        <section>
            <h2>Página não encontrada</h2>

            <p>
                O conteúdo solicitado não está disponível.
            </p>

            <a href="#inicio" data-route="inicio">
                Voltar ao início
            </a>
        </section>
    `
};