'use strict';

/* ===== CONFIGURAÇÃO (edite aqui) ===== */
const WHATSAPP = '5592994142432';

// Para trocar preço/foto, adicionar ou remover produtos, edite somente este array.
// A ordem do array define a posição usada na mensagem do WhatsApp.
const PRODUTOS = [
  { id: 'p1', imagem: '903babaa-da47-4aed-896e-6930a710f233.jpeg', preco: 15.00, alt: 'Chaveirinho de crochê feito à mão' },
  { id: 'p2', imagem: '13eff717-808b-434e-81dd-779e9eadd14b.jpeg', preco: 20.00, alt: 'Chaveirinho de crochê feito à mão' },
  { id: 'p3', imagem: '3a653a64-45f5-4624-8672-b9645ed3997f.jpeg', preco: 20.00, alt: 'Chaveirinho de crochê feito à mão' },
  { id: 'p4', imagem: 'd7e8e7df-fd3e-490f-97fc-281474f64a5c.jpeg', preco: 15.00, alt: 'Chaveirinho de crochê feito à mão' },
  { id: 'p5', imagem: 'b8725cf5-1eac-48bb-8bc5-9891ad52cdb6.jpeg', preco: 25.00, alt: 'Chaveirinho de crochê feito à mão' },
  { id: 'p6', imagem: 'ff8367f3-db88-4ac5-9423-127884290628.jpeg', preco: 23.50, alt: 'Chaveirinho de crochê feito à mão' }
];

const ORDINAIS = ['primeira','segunda','terceira','quarta','quinta','sexta','sétima','oitava','nona','décima'];
const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/* ===== WHATSAPP ===== */
const linkWhats = texto => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

function mensagemProduto(indice, preco) {
  const ordinal = ORDINAIS[indice] || `${indice + 1}ª`;
  return `Olá! Gostaria de encomendar o chaveirinho da ${ordinal} foto, no valor de ${moeda.format(preco)}. Ele está disponível?`;
}

/* ===== CATÁLOGO ===== */
function criarCard(produto, indice) {
  const li = document.createElement('li');
  li.className = 'card';
  li.style.setProperty('--i', indice);

  const foto = document.createElement('div');
  foto.className = 'card__foto';
  const img = document.createElement('img');
  img.src = produto.imagem;
  img.alt = produto.alt;
  img.width = 800;
  img.height = 800;
  img.decoding = 'async';
  img.loading = indice < 2 ? 'eager' : 'lazy';
  foto.appendChild(img);

  const info = document.createElement('div');
  info.className = 'card__info';
  const preco = document.createElement('span');
  preco.className = 'card__preco';
  preco.textContent = moeda.format(produto.preco);

  const botao = document.createElement('a');
  botao.className = 'btn';
  botao.href = linkWhats(mensagemProduto(indice, produto.preco));
  botao.target = '_blank';
  botao.rel = 'noopener noreferrer';
  botao.textContent = 'Encomendar ♡';

  info.append(preco, botao);
  li.append(foto, info);
  return li;
}

const grid = document.getElementById('grid');
if (grid) grid.append(...PRODUTOS.map(criarCard));

/* ===== BOTÕES GERAIS DE CONTATO ===== */
const msgGeral = 'Olá! Vi o site da Mimo de Crochê e gostaria de fazer uma encomenda. Pode me ajudar?';
document.querySelectorAll('[data-whats-geral]').forEach(a => {
  a.href = linkWhats(msgGeral);
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
});

/* ===== MENU MOBILE ===== */
const btn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
function alternarMenu(abrir) {
  btn.setAttribute('aria-expanded', String(abrir));
  btn.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
  nav.classList.toggle('is-open', abrir);
}
btn.addEventListener('click', () => alternarMenu(btn.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', e => { if (e.target.closest('a')) alternarMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') alternarMenu(false); });
