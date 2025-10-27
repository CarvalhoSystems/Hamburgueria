//================================//
// Hamburgeria - Projeto Frontend //
//   Autor Rodrigo            //
//================================//

//============================//
// 1. Botoes de toggle do menu  //
//============================//
const menuBtn = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");
const btnPedido = document.querySelector(".btn-pedido");

//===================================//
// 2. Abrir e fechar o menu
//===================================//

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navMenu.classList.toggle("active");
});
btnPedido.addEventListener("click", () => {
  // Fecha o menu se estiver aberto ao clicar em "Fazer Pedido"
  if (navMenu.classList.contains("active")) {
    menuBtn.classList.remove("active");
    navMenu.classList.remove("active");
  }
});
//=================================//
// 3. Carrinho de Compras
// ==================================
const carrinhoBtn = document.querySelector(".btn-carrinho");
const carrinhoSidebar = document.querySelector(".carrinho-sidebar");
const carrinhoOverlay = document.querySelector(".carrinho-overlay");
const carrinhoCloseBtn = document.querySelector("#carrinho-close");
const produtosCarrinhoContainer = document.querySelector(".produtos-carrinho");

//=================================//
// 4. Adicionar itens ao carrinho
// ==================================
const produtos = document.querySelectorAll(".produto");
const carrinhoItemsContainer = document.querySelector(".produtos-carrinho");
const totalCarrinhoEl = document.querySelector(".carrinho-total");
const limparCarrinhoBtn = document.querySelector("#limparCarrinhoBtn");
const finalizarCompraBtn = document.querySelector(".finalizarCompraBtn");
const quantidadeTotalEl = document.querySelector(".quantidade-total");
// O carrinho agora é uma variável global que persiste

let carrinho = [];

// ==========================================
// 5. Funções de controle do carrinho (abrir/fechar)
// ==========================================
function abrirCarrinho() {
  carrinhoOverlay.classList.add("open");
  carrinhoSidebar.classList.add("open");
}

function fecharCarrinho() {
  // Correto: Usar .remove() para fechar
  carrinhoOverlay.classList.remove("open");
  carrinhoSidebar.classList.remove("open");
}

carrinhoBtn.addEventListener("click", abrirCarrinho);
carrinhoCloseBtn.addEventListener("click", fecharCarrinho);

// É recomendado manter o overlay com .remove() para fechar
carrinhoOverlay.addEventListener("click", fecharCarrinho);

// ==========================================
// 6. Funções adicionar produtos ao carrinho
// ==========================================

function adicionarAoCarrinho(produtoId, produtoNome, produtoPreco) {
  // Verificar se o produto já está no carrinho
  const produtoExistente = carrinho.find((item) => item.id === produtoId);
  if (produtoExistente) {
    produtoExistente.quantidade++;
  } else {
    carrinho.push({
      id: produtoId,
      nome: produtoNome,
      preco: produtoPreco,
      quantidade: 1,
    });
  }
  atualizarCarrinho();
}

//=================================//
// 7. Atualizar o carrinho
//=================================//
function atualizarCarrinho() {
  // Limpar os itens atuais
  carrinhoItemsContainer.innerHTML = "";
  let total = 0;

  // Adicionar cada item do carrinho ao container
  carrinho.forEach((item) => {
    const itemEl = document.createElement("div");
    itemEl.classList.add("carrinho-item");
    itemEl.innerHTML = `
      <div class="produto-info">
        <span class="produto-nome">${item.nome}</span>
        <span class="produto-preco">R$ ${item.preco.toFixed(2)}</span>
      </div>
      <div class="produto-controles">
        <button class="btn-qtd" data-index="${carrinho.indexOf(
          item
        )}" data-action="decrease">-</button>
        <span class="quantidade">${item.quantidade}</span>
        <button class="btn-qtd" data-index="${carrinho.indexOf(
          item
        )}" data-action="increase">+</button>
        <button class="btn-remover" data-index="${carrinho.indexOf(
          item
        )}">Remover</button>
      </div>
    `;
    carrinhoItemsContainer.appendChild(itemEl);
    total += item.preco * item.quantidade;
  });
  totalCarrinhoEl.innerHTML = `<span>Total:</span> <span>R$ ${total
    .toFixed(2)
    .replace(".", ",")}</span>`;
}

// ==========================================
// 8. Função para Aumentar/Diminuir/Remover Itens
// ==========================================
function atualizarItemCarrinho(index, action) {
  const item = carrinho[index];

  if (action === "increase") {
    item.quantidade++;
  } else if (action === "decrease") {
    item.quantidade--;
  }

  // Se a quantidade for 0 ou a ação for 'remover', remove o item do array
  if (item.quantidade <= 0 || action === "remove") {
    carrinho.splice(index, 1);
  }

  atualizarCarrinho();
}

// ==========================================
// 8. Inicialização
// ==========================================
atualizarCarrinho();

limparCarrinhoBtn.addEventListener("click", () => {
  Swal.fire({
    title: "Tem certeza que deseja limpar o carrinho?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim, limpar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      limparCarrinho();
    }
  });
});
function limparCarrinho() {
  carrinho = [];
  atualizarCarrinho();
}
//=================================//
// 9. Fazer o pedido via WhatsApp
//=================================//
const fazerPedidoBtn = document.getElementById("fazer-pedido"); // Botão do header

function enviarPedidoWhatsApp() {
  if (carrinho.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Seu carrinho está vazio!",
      text: "Adicione produtos antes de finalizar o pedido.",
    });
    return;
  }

  // Monta a mensagem do pedido
  let mensagem = "Olá, gostaria de fazer o seguinte pedido:";
  let total = 0;

  carrinho.forEach((item) => {
    mensagem += `\n\n*${item.nome}*`;
    mensagem += `\nQuantidade: ${item.quantidade}`;
    mensagem += `\nPreço: R$ ${item.preco.toFixed(2)}`;
    total += item.preco * item.quantidade;
  });

  mensagem += `\n\n*Total do Pedido: R$ ${total.toFixed(2)}*`;

  // Número de telefone (substitua pelo seu número com código do país e DDD)
  const numeroTelefone = "5511999998888";

  // Codifica a mensagem para a URL
  const mensagemCodificada = encodeURIComponent(mensagem);

  // Monta a URL e redireciona
  const urlWhatsApp = `https://wa.me/${numeroTelefone}?text=${mensagemCodificada}`;
  window.open(urlWhatsApp, "_blank");
}

// Adiciona o evento aos dois botões
fazerPedidoBtn.addEventListener("click", enviarPedidoWhatsApp);
finalizarCompraBtn.addEventListener("click", enviarPedidoWhatsApp);

// ==========================================
// 10. Delegação de Eventos Centralizada
// ==========================================
document.addEventListener("click", (event) => {
  const target = event.target;

  // Adicionar produto ao carrinho
  if (target.classList.contains("btn-adicionar")) {
    const produtoEl = target.closest(".menu-item");
    const produtoId = target.dataset.id; // Mais robusto que usar index
    const produtoNome = produtoEl.querySelector("h4").innerText;
    const produtoPrecoText = produtoEl.querySelector(".preco").innerText;
    const produtoPreco = parseFloat(
      produtoPrecoText.replace("R$ ", "").replace(",", ".")
    );

    adicionarAoCarrinho(produtoId, produtoNome, produtoPreco);

    Swal.fire({
      icon: "success",
      title: "Produto Adicionado!",
      text: `${produtoNome} foi adicionado ao carrinho.`,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  // Ações dentro do carrinho (aumentar, diminuir, remover)
  if (target.matches(".btn-qtd")) {
    const index = parseInt(target.dataset.index);
    const acao = target.dataset.action;
    atualizarItemCarrinho(index, acao);
  } else if (target.matches(".btn-remover")) {
    const index = parseInt(target.dataset.index);
    atualizarItemCarrinho(index, "remove");
  }
});

// 10. Botão voltar ao topo
//=================================//
const backToTopBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//=================================//
// 11. Botão ver acompanhamentos
//=================================//
const abrirAcompanhamentosBtn = document.querySelector("#abri-acompanhamentos");
const fecharAcompanhamentosBtn = document.querySelector(
  "#fechar-acompanhamentos-btn"
);
const acompanhamentosModal = document.querySelector("#acompanhamentos-modal");

function abrirModalAcompanhamentos() {
  acompanhamentosModal.classList.add("active");
  document.body.style.overflow = "hidden"; // Desabilita o scroll do fundo
}
function fecharModalAcompanhamentos() {
  acompanhamentosModal.classList.remove("active");
  document.body.style.overflow = "auto"; // Habilita o scroll do fundo
}

abrirAcompanhamentosBtn.addEventListener("click", abrirModalAcompanhamentos);
fecharAcompanhamentosBtn.addEventListener("click", fecharModalAcompanhamentos);

// Fecha o modal se clicar fora do conteúdo
acompanhamentosModal.addEventListener("click", (event) => {
  if (event.target === acompanhamentosModal) {
    fecharModalAcompanhamentos();
  }
});
