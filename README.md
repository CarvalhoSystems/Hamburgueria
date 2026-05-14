# 🍔 Burger Master - O Sabor Perfeito

O **Burger Master** é uma landing page moderna e responsiva para uma hamburgueria artesanal. O projeto permite que os usuários visualizem o cardápio, adicionem produtos a um carrinho de compras virtual e finalizem o pedido diretamente pelo WhatsApp.

## 🚀 Funcionalidades

- **Cardápio Interativo:** Visualização de hambúrgueres, acompanhamentos e bebidas com fotos e descrições.
- **Sistema de Carrinho:**
  - Adição de múltiplos itens.
  - Controle de quantidade (aumentar/diminuir) dentro da sidebar.
  - Remoção de itens específicos ou limpeza total do carrinho.
  - Cálculo automático de subtotal e total geral.
- **Integração com WhatsApp:** Geração automática de mensagem formatada com os detalhes do pedido e total para finalização via API do WhatsApp.
- **Modal de Acompanhamentos:** Seção extra de produtos acessível via modal para não sobrecarregar a página principal.
- **Responsividade:** Design adaptável para dispositivos móveis, incluindo menu lateral (hamburger menu).
- **Feedback Visual:** Uso da biblioteca **SweetAlert2** para confirmações de adição ao carrinho, limpeza e avisos.
- **Botão "Voltar ao Topo":** Melhora a navegação em páginas extensas.

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica do conteúdo.
- **CSS3:** Estilização personalizada utilizando Variáveis CSS (Root) para fácil manutenção de cores.
- **JavaScript (Vanilla):** Lógica do carrinho, manipulação do DOM e integração com a API do WhatsApp.
- **SweetAlert2:** Biblioteca para diálogos e alertas personalizados e elegantes.
- **Google Fonts:** Fonte "Ubuntu" para uma tipografia moderna.

## 📦 Estrutura de Arquivos

```text
Hamburgueria/
├── image/                 # Imagens gerais e favicons
├── imagem-menu/           # Imagens dos produtos do cardápio
├── src/
│   ├── index.css          # Estilos globais e componentes
│   └── index.js           # Lógica do carrinho e eventos
├── index.html             # Estrutura principal
└── README.md              # Documentação do projeto
```

## 🔧 Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/hamburgueria.git
   ```
2. Navegue até a pasta do projeto:
   ```bash
   cd hamburgueria
   ```
3. Abra o arquivo `index.html` em seu navegador de preferência.

---

## 📝 Configuração do WhatsApp

Para que o sistema de pedidos funcione corretamente para o seu número, altere a variável `numeroTelefone` no arquivo `src/index.js`:

```javascript
// Localize esta linha no src/index.js e altere para o seu número (DDI + DDD + Número)
const numeroTelefone = "5511999998888";
```

## ✒️ Autor

**CarvalhoSystems** - _Desenvolvedor Frontend_

---

### 💡 Melhorias Futuras

- [ ] Integração com um banco de dados para persistência do cardápio.
- [ ] Painel administrativo para alteração de preços e produtos.
- [ ] Cálculo automático de taxa de entrega baseado no CEP.
- [ ] Suporte a Dark Mode.

---

© 2026 Burger Master. Todos os direitos reservados.
