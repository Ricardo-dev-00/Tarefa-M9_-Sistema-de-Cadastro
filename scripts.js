
// URL da API do CrudCrud
const API_URL = "https://crudcrud.com/api/98c8539ad88f4be78794dfae1db42528/cadastro-clientes";

// Elemento onde os nomes dos clientes serão exibidos
const listaClientes = document.querySelector(".lista-clientes");

// Função para buscar e exibir os clientes
function buscarClientes() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar clientes");
            }
            return response.json();
        })
        .then(clientes => {
            // Limpa a lista antes de adicionar os clientes
            listaClientes.innerHTML = "";

            // Itera sobre os clientes retornados pela API
            clientes.forEach(cliente => {
                // Cria um card para cada cliente
                const card = document.createElement("div");
                card.classList.add("card-cliente");

                // Adiciona o nome e o email do cliente
                card.innerHTML = `
                    <h3>👤 Cliente</h3>
                    <p>${cliente.nome}</p>
                    <h3>✉️ Email</h3>
                    <p>${cliente.email}</p>
                    <button class="btn-remove" data-id="${cliente._id}">Remover Cliente</button>
                `;

                // Adiciona o card à lista de clientes
                listaClientes.appendChild(card);
            });

            // Adiciona eventos de remoção aos botões
            adicionarEventosRemover();
        })
        .catch(error => console.error("Erro ao buscar clientes:", error));
}

// Função para remover um cliente
function removerCliente(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao remover cliente");
            }
            console.log("Cliente removido com sucesso!");
            buscarClientes(); // Atualiza a lista de clientes
        })
        .catch(error => console.error("Erro ao remover cliente:", error));
}

// Adiciona eventos de clique aos botões de remoção
function adicionarEventosRemover() {
    const botoesRemover = document.querySelectorAll(".btn-remove");
    botoesRemover.forEach(botao => {
        botao.addEventListener("click", () => {
            const id = botao.getAttribute("data-id");
            removerCliente(id);
        });
    });
}

// Chama a função para buscar e exibir os clientes ao carregar a página
document.addEventListener("DOMContentLoaded", buscarClientes);

// Elementos do DOM
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const botaoCadastrar = document.querySelector("button[type='button']");

// Função para cadastrar um novo cliente
function cadastrarCliente() {
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();

    // Validação dos campos
    if (!nome || !email) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Objeto do cliente a ser enviado
    const novoCliente = { nome, email };

    // Requisição POST para a API
    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(novoCliente),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao cadastrar cliente");
            }
            console.log("Cliente cadastrado com sucesso!");
            nomeInput.value = ""; // Limpa o campo de nome
            emailInput.value = ""; // Limpa o campo de email
            buscarClientes(); // Atualiza a lista de clientes
        })
        .catch(error => console.error("Erro ao cadastrar cliente:", error));
}

// Adiciona evento ao botão de cadastro
botaoCadastrar.addEventListener("click", cadastrarCliente);