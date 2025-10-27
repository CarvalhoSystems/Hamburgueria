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
  const navMenu = document.querySelector(".nav-links");
  navMenu.classList.toggle("active");
  menuBtn.classList.toggle("active");
  // fecha o menu clicando fora
  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !menuBtn.contains(event.target)) {
      navMenu.classList.remove("active");
      menuBtn.classList.remove("active");
    }
  });
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
// 9. Inicialização
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
// =========================================================
// 10. FUNÇÃO PARA MONTAR A MENSAGEM DO PEDIDO
//    (Usada pelo botão do Header e pelo SweetAlert)
// =========================================================
function montarMensagemPedido() {
  // Verifica se o carrinho está vazio (você pode querer chamar isso externamente)
  if (carrinho.length === 0) {
    return { total: 0 };
  }

  let mensagem = "🍔 Olá, Burger Master! Gostaria de fazer o seguinte pedido:";
  let total = 0;

  carrinho.forEach((item) => {
    // Assume que 'item' tem 'nome', 'quantidade' e 'preco'
    const precoItem = item.preco * item.quantidade;

    mensagem += `\n\n- ${item.nome}`;
    mensagem += `\n  Qtd: ${item.quantidade} x R$ ${item.preco.toFixed(2)}`;
    mensagem += `\n  Subtotal: R$ ${precoItem.toFixed(2)}`;

    total += precoItem;
  });

  mensagem += `\n\n======================`;
  mensagem += `\n*TOTAL GERAL: R$ ${total.toFixed(2)}*`;
  mensagem += `\n======================\n`;

  // Configura o URL do WhatsApp
  const numeroTelefone = "5511999998888"; // SUBSTITUA PELO SEU NÚMERO
  const mensagemCodificada = encodeURIComponent(mensagem);
  const urlWhatsApp = `https://wa.me/${numeroTelefone}?text=${mensagemCodificada}`;

  return {
    mensagem,
    total,
    urlWhatsApp,
    mensagemCodificada,
  };
}

// =========================================================
// 11. FUNÇÃO DE AÇÃO DO BOTÃO "FAZER PEDIDO" DO HEADER
//    (Redireciona diretamente para o WhatsApp)
// =========================================================

function acaoFazerPedidoHeader() {
  const pedido = montarMensagemPedido();

  if (carrinho.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Seu carrinho está vazio!",
      text: "Adicione produtos antes de finalizar o pedido.",
    });
    return;
  }

  // Redirecionamento direto para o header
  window.open(pedido.urlWhatsApp, "_blank");
}

// =========================================================
// 12. FUNÇÃO DE AÇÃO DO BOTÃO "FINALIZAR COMPRA" DO CARRINHO
//    (Abre o SweetAlert com opções de pagamento)
// =========================================================

function acaoFinalizarCompraCarrinho() {
  const pedido = montarMensagemPedido();

  if (carrinho.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Seu carrinho está vazio!",
      text: "Adicione produtos antes de finalizar o pedido.",
    });
    return;
  }

  Swal.fire({
    title: "Seu pedido será enviado via WhatsApp!",
    html: `
            <p>Por favor, informe ao nosso atendente no WhatsApp qual o método de pagamento preferido:</p>
            <div style="text-align: left; margin: 15px auto; width: fit-content;">
                <strong>✅ PIX (Chave aleatória)</strong><br>
                <strong>💳 Cartão de Crédito/Débito (Na entrega)</strong><br>
                <strong>💰 Dinheiro (Na entrega - Trazer troco)</strong>
            </div>
            <p>Ao clicar em "Confirmar e Enviar", você será redirecionado.</p>
        `,
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#ff4500", // Cor Primária
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Confirmar e Enviar Pedido",
  }).then((result) => {
    if (result.isConfirmed) {
      // Redireciona APÓS o cliente confirmar
      window.open(pedido.urlWhatsApp, "_blank");

      // Opcional: Limpa o carrinho após o envio
      // Verifique se a função limparCarrinho existe e chame-a aqui.
      // limparCarrinho();
    }
  });
}

// =========================================================
// 13. ADICIONA OS EVENT LISTENERS
// =========================================================

// Adiciona evento ao botão "Fazer Pedido" do header
btnPedido.addEventListener("click", acaoFazerPedidoHeader);

// Adiciona evento ao botão "Finalizar Pedido" da Sidebar do Carrinho
finalizarCompraBtn.addEventListener("click", acaoFinalizarCompraCarrinho);

// ==========================================
// 14. Delegação de Eventos Centralizada
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

// 15. Botão voltar ao topo
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
// 16. Botão ver acompanhamentos
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

//=========================
// Botão Menu
//=========================
