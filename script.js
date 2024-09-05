// Preços por quilo
const precos = {
  Maçã: 14.00,
  Banana: 15.00,
  Pera: 24.00,
  Mamao: 17.00,
  Morango: 24.00,
  Uva: 8.00,
  Manga: 9.00,
  Jaca: 14.00
};

// Carrinho de compras
const carrinho = {};

// Adicionar produto ao carrinho
function adicionarProduto() {
  const produto = document.getElementById('produto').value;
  const quantidade = parseFloat(document.getElementById('quantidade').value);

  if (!produto || isNaN(quantidade) || quantidade <= 0) {
    alert('Por favor, selecione um produto e insira uma quantidade válida.');
    return;
  }

  if (!carrinho[produto]) {
    carrinho[produto] = 0;
  }

  carrinho[produto] += quantidade;
  atualizarCarrinho();
}

// Remover 1 kg do produto do carrinho
function removerProduto(produto) {
  if (carrinho[produto]) {
    carrinho[produto] -= 1;
    if (carrinho[produto] <= 0) {
      delete carrinho[produto];
    }
    atualizarCarrinho();
  }
}

// Limpar carrinho
function limparCarrinho() {
  for (const produto in carrinho) {
    delete carrinho[produto];
  }
  atualizarCarrinho();
}

// Atualizar a lista do carrinho na página
function atualizarCarrinho() {
  const listaCarrinho = document.getElementById('carrinho');
  while (listaCarrinho.firstChild) {
    listaCarrinho.removeChild(listaCarrinho.firstChild);
  }

  let valorTotal = 0;

  for (const produto in carrinho) {
    const quantidade = carrinho[produto];
    const precoTotal = quantidade * precos[produto];
    valorTotal += precoTotal;

    const item = document.createElement('li');
    const texto = document.createTextNode(`${produto.charAt(0).toUpperCase() + produto.slice(1)}: ${quantidade} kg - R$${precoTotal.toFixed(2)}`);
    item.appendChild(texto);

    // Cria uma div para agrupar os botões
    const botoesDiv = document.createElement('div');
    botoesDiv.className = 'botoes-div';

    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = '-';
    botaoRemover.onclick = function () {
      removerProduto(produto);
    };
    botoesDiv.appendChild(botaoRemover);

    const botaoAdicionar = document.createElement('button');
    botaoAdicionar.textContent = '+';
    botaoAdicionar.onclick = function () {
      adicionarMaisProduto(produto, 1);
    };
    botoesDiv.appendChild(botaoAdicionar);

    item.appendChild(botoesDiv);
    listaCarrinho.appendChild(item);
  }

  // Atualizar o valor total no elemento span
  const spanValorTotal = document.getElementById('valorTotal');
  spanValorTotal.textContent = `Valor total: R$${valorTotal.toFixed(2)}`;
}

// Função para adicionar mais produto ao carrinho
function adicionarMaisProduto(produto, quantidade) {
  if (carrinho[produto]) {
    carrinho[produto] += quantidade;
  } else {
    carrinho[produto] = quantidade;
  }
  atualizarCarrinho();
}

// Atualizar o valor total no elemento span
const spanValorTotal = document.getElementById('valorTotal');
spanValorTotal.textContent = `Valor total: R$${valorTotal.toFixed(2)}`;

