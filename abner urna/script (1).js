const palavrasJogo = {
  facil: [
    { palavra: 'CASA', dica: 'Lugar onde moramos', explicacao: 'A casa é o lugar onde convivemos e organizamos nossa rotina de higiene.' },
    { palavra: 'LIVRO', dica: 'Material usado para estudar', explicacao: 'O livro ajuda na aprendizagem e também pode ter dicas de saúde e cuidado.' },
    { palavra: 'SOL', dica: 'Estrela que ilumina o dia', explicacao: 'O sol ajuda a iluminar e também é importante para a saúde quando usado com cuidado.' },
    { palavra: 'ESCOLA', dica: 'Lugar de aprendizagem', explicacao: 'A escola é um espaço para estudar, brincar e aprender sobre hábitos saudáveis.' },
    { palavra: 'MÃO', dica: 'Parte do corpo que usamos para pegar', explicacao: 'As mãos tocam muitos objetos e por isso precisam ser lavadas com frequência.' },
    { palavra: 'ÁGUA', dica: 'Líquido essencial para viver', explicacao: 'A água é fundamental para o corpo, para limpar e para manter a higiene.' },
    { palavra: 'BOLA', dica: 'Objeto redondo usado para brincar', explicacao: 'Brincar também é parte da rotina saudável e divertida das crianças.' },
    { palavra: 'PAPEL', dica: 'Material para escrever e desenhar', explicacao: 'O papel é útil para registrar informações e também é usado em higiene pessoal.' },
    { palavra: 'BANHO', dica: 'Atividade para se limpar', explicacao: 'O banho remove suor, sujeira e microrganismos do corpo.' }
  ],
  medio: [
    { palavra: 'COMPUTADOR', dica: 'Máquina usada para estudar e trabalhar', explicacao: 'O computador é útil, mas também precisa de cuidado, limpeza e uso consciente.' },
    { palavra: 'DESCARGA', dica: 'Mecanismo do vaso sanitário', explicacao: 'A descarga ajuda a remover resíduos e manter o ambiente mais limpo.' },
    { palavra: 'PAPEL', dica: 'Material branco para higiene', explicacao: 'O papel higiênico ajuda na limpeza após o uso do banheiro.' },
    { palavra: 'ESCOVA', dica: 'Objeto para limpar os dentes', explicacao: 'A escova de dentes remove restos de alimento e ajuda a evitar cáries.' },
    { palavra: 'TOALHA', dica: 'Tecido para secar', explicacao: 'A toalha deve ser limpa para evitar acúmulo de bactérias.' },
    { palavra: 'ESPELHO', dica: 'Objeto para se ver', explicacao: 'O espelho mostra a aparência, mas a higiene deve ser praticada todos os dias.' },
    { palavra: 'LAVAR', dica: 'Ação de limpar com água', explicacao: 'Lavar as mãos e os objetos é essencial para manter a saúde.' },
    { palavra: 'SABAO', dica: 'Produto usado para limpar', explicacao: 'O sabão ajuda a remover sujeira, gordura e microrganismos das mãos.' }
  ],
  dificil: [
    { palavra: 'CASA AZUL', dica: 'Duas palavras com um espaço', explicacao: 'Ambientes organizados ajudam a reduzir sujeira e manter a saúde.' },
    { palavra: 'GUARDA-CHUVA', dica: 'Objeto usado para proteger da chuva', explicacao: 'Itens de proteção ajudam na rotina e reduzem contato com sujeiras externas.' },
    { palavra: 'BACTERIAS', dica: 'Microorganismos invisíveis', explicacao: 'Bactérias podem causar doenças, por isso a higiene é tão importante.' },
    { palavra: 'DESINFETANTE', dica: 'Produto que mata germes', explicacao: 'Desinfetante é útil para limpar superfícies e reduzir microrganismos.' },
    { palavra: 'SANITARIO', dica: 'Relativo à higiene e saúde', explicacao: 'A higiene sanitária envolve limpeza, prevenção e bem-estar.' },
    { palavra: 'ESTERILIZACAO', dica: 'Processo de eliminar micróbios', explicacao: 'A esterilização ajuda a eliminar germes em objetos e ambientes.' },
    { palavra: 'HIGIENICO', dica: 'Adequado para a higiene', explicacao: 'Ser higiênico é manter cuidado com o corpo, o ambiente e a saúde.' },
    { palavra: 'PREVENCAO', dica: 'Ação de evitar problemas', explicacao: 'Prevenção é a melhor forma de evitar doenças e manter um ambiente limpo.' }
  ]
};

const faseDescricoes = [
  'Higiene Básica',
  'Cuidados Pessoais',
  'Banheiro e Limpeza',
  'Ambiente Limpo',
  'Saúde e Prevenção',
  'Desafio Final'
];

const STORAGE_KEYS = {
  record: 'descargaRecord',
  sound: 'descargaSound',
  achievements: 'descargaAchievements',
  stats: 'descargaStats'
};

function carregarStats() {
  try {
    const stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.stats) || '{}');
    return stats && typeof stats === 'object' ? stats : {};
  } catch {
    return {};
  }
}

const state = {
  dificuldade: 'facil',
  modo: 'classic',
  indice: 0,
  pontos: 0,
  vidas: 3,
  combo: 0,
  melhorCombo: 0,
  totalAcertos: 0,
  totalErros: 0,
  totalPartidas: Number(localStorage.getItem('descargaTotalPartidas')) || 0,
  recorde: Number(localStorage.getItem(STORAGE_KEYS.record)) || 0,
  palavraAtual: '',
  palavraAtualDica: '',
  palavraAtualExplicacao: '',
  palavraFormada: [],
  palavraMontada: '',
  letrasDisponiveis: [],
  processando: false,
  jogoIniciado: false,
  timer: null,
  tempoRestante: 60,
  soundOn: localStorage.getItem(STORAGE_KEYS.sound) !== 'off',
  achievements: JSON.parse(localStorage.getItem(STORAGE_KEYS.achievements) || '{}'),
  stats: carregarStats()
};

state.stats = {
  totalAcertos: Number(state.stats.totalAcertos) || 0,
  totalErros: Number(state.stats.totalErros) || 0,
  maiorCombo: Number(state.stats.maiorCombo) || 0,
  recorde: Number(state.stats.recorde) || state.recorde,
  totalPartidas: Number(state.stats.totalPartidas) || state.totalPartidas,
  fasesConcluidas: Number(state.stats.fasesConcluidas) || 0,
  acertosPorDificuldade: {
    facil: Number(state.stats.acertosPorDificuldade?.facil) || 0,
    medio: Number(state.stats.acertosPorDificuldade?.medio) || 0,
    dificil: Number(state.stats.acertosPorDificuldade?.dificil) || 0
  },
  dificuldadesConcluidas: {
    facil: state.stats.dificuldadesConcluidas?.facil === true,
    medio: state.stats.dificuldadesConcluidas?.medio === true,
    dificil: state.stats.dificuldadesConcluidas?.dificil === true
  },
  fasePerfeitaConcluida: Boolean(state.stats.fasePerfeitaConcluida)
};
state.melhorCombo = state.stats.maiorCombo;

const telaInicial = document.getElementById('inicioTela');
const telaJogo = document.getElementById('jogoArea');
const botaoIniciar = document.getElementById('iniciarJogo');
const botaoJogarMenu = document.getElementById('menuJogar');
const botaoTempoMenu = document.getElementById('menuTempo');
const botaoConquistas = document.getElementById('menuConquistas');
const botaoEstatisticas = document.getElementById('menuEstatisticas');
const botaoSom = document.getElementById('menuSom');
const letras = document.getElementById('letras');
const resultado = document.getElementById('resultado');
const palavra = document.getElementById('palavra');
const mensagem = document.getElementById('textoMensagem');
const sobreDica = document.getElementById('dicaReferencia');
const pontosElemento = document.getElementById('pontos');
const vidasElemento = document.getElementById('vidas');
const faseElemento = document.getElementById('fase');
const dificuldadeElemento = document.getElementById('dificuldadeAtual');
const pontosMaximoElemento = document.getElementById('pontosMaximo');
const botaoDescarga = document.getElementById('cordinha');
const botaoVerificar = document.getElementById('verificar');
const botaoApagar = document.getElementById('apagar');
const botaoLimpar = document.getElementById('limpar');
const aguaVaso = document.querySelector('.vaso-cena-agua');
const vasoCena = document.querySelector('.vaso-cena');
const palavraFormadaElemento = document.getElementById('palavraFormada');
const missaoTextoElemento = document.getElementById('missaoTexto');
const curiosidadeTextoElemento = document.getElementById('curiosidadeTexto');
const progressoTextoElemento = document.getElementById('progressoTexto');
const progressoFillElemento = document.getElementById('progressoFill');
const recompensaAtualElemento = document.getElementById('recompensaAtual');
const recompensaPontosElemento = document.getElementById('recompensaPontos');
const recompensaFaseElemento = document.getElementById('recompensaFase');
const recompensaListaElemento = document.querySelector('.recompensa-lista');
const faseTemaElemento = document.getElementById('faseTema');
const comboBadge = document.getElementById('comboBadge');
const timerLabel = document.getElementById('timerLabel');
const phaseProgressBar = document.getElementById('phaseProgressBar');
const phaseStats = document.getElementById('phaseStats');
const overlay = document.getElementById('gameOverlay');

let movimentoAgua = null;
let restauracaoAgua = null;

const missoesEducativas = {
  facil: 'Lavar as mãos depois de usar o banheiro.',
  medio: 'Usar papel higiênico e escova de dentes com cuidado.',
  dificil: 'Aprender higiene com atenção às etapas diárias e à limpeza.'
};

const curiosidades = [
  'A higiene começa com pequenas atitudes diárias.',
  'Lavar as mãos ajuda a evitar germes e doenças.',
  'O papel higiênico e o banheiro devem ser usados com cuidado.',
  'Escovar os dentes ajuda a manter a boca saudável.',
  'Uma rotina de limpeza melhora o bem-estar de todos.'
];

const recompensas = [
  { nome: '🌟 Primeiros Passos', minimo: 0 },
  { nome: '🌈 Guardião do Banheiro', minimo: 120 },
  { nome: '⭐ Explorador Limpo', minimo: 350 },
  { nome: '🏆 Mestre da Higiene', minimo: 700 }
];

const achievementsList = [
  { id: 'mao-limpa', nome: '🧼 Mãos Limpas', descricao: 'Acertar 10 palavras.', condicao: () => state.stats.totalAcertos >= 10 },
  { id: 'descarga-perfeita', nome: '💦 Descarga Perfeita', descricao: 'Alcance combo de 5.', condicao: () => state.melhorCombo >= 5 },
  { id: 'rei-da-descarga', nome: '🚽 Rei da Descarga', descricao: 'Concluir uma fase sem perder vidas.', condicao: () => state.stats.fasePerfeitaConcluida },
  { id: 'caçador-bacterias', nome: '🦠 Caçador de Bactérias', descricao: 'Acertar 8 palavras difíceis.', condicao: () => contarAcertosPorDificuldade('dificil') >= 8 },
  { id: 'mestre-da-higiene', nome: '🏆 Mestre da Higiene', descricao: 'Concluir todas as dificuldades.', condicao: () => concluiuTodasDificuldades() }
];

function normalizarTexto(texto = '') {
  return String(texto)
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z]/g, '');
}

function embaralhar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function salvarStats() {
  localStorage.setItem(STORAGE_KEYS.record, String(state.recorde));
  localStorage.setItem(STORAGE_KEYS.sound, state.soundOn ? 'on' : 'off');
  localStorage.setItem(STORAGE_KEYS.achievements, JSON.stringify(state.achievements));
  localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify({
    totalAcertos: state.stats.totalAcertos,
    totalErros: state.stats.totalErros,
    maiorCombo: state.stats.maiorCombo,
    recorde: state.recorde,
    totalPartidas: state.totalPartidas,
    fasesConcluidas: state.stats.fasesConcluidas,
    acertosPorDificuldade: state.stats.acertosPorDificuldade,
    dificuldadesConcluidas: state.stats.dificuldadesConcluidas,
    fasePerfeitaConcluida: state.stats.fasePerfeitaConcluida
  }));
  localStorage.setItem('descargaTotalPartidas', String(state.totalPartidas));
}

function atualizarComboBadge() {
  comboBadge.textContent = `🔥 COMBO x${Math.max(1, state.combo)}`;
  comboBadge.style.opacity = state.combo > 1 ? '1' : '0.82';
}

function atualizarPlacar() {
  pontosElemento.textContent = state.pontos;
  vidasElemento.textContent = state.vidas;
  faseElemento.textContent = String(state.indice + 1);
  dificuldadeElemento.textContent = labelDaDificuldade(state.dificuldade);
  pontosMaximoElemento.textContent = state.recorde;
  atualizarProgressoEducativo();
  atualizarRecompensa();
  atualizarComboBadge();
  atualizarFaseInfo();
  atualizarTimer();
}

function labelDaDificuldade(nivel) {
  return {
    facil: 'Fácil',
    medio: 'Médio',
    dificil: 'Difícil'
  }[nivel] || 'Fácil';
}

function atualizarFaseInfo() {
  const faseIndex = Math.min(state.indice, faseDescricoes.length - 1);
  faseTemaElemento.textContent = faseDescricoes[faseIndex];
  const totalPalavras = palavrasJogo[state.dificuldade].length;
  const progresso = Math.min(100, ((state.indice + 1) / totalPalavras) * 100);
  phaseProgressBar.style.width = `${progresso}%`;
  phaseStats.textContent = `Palavra ${Math.min(state.indice + 1, totalPalavras)}/${totalPalavras}`;
}

function atualizarProgressoEducativo() {
  const total = palavrasJogo[state.dificuldade].length;
  const atual = Math.min(state.indice + 1, total);
  const porcentagem = Math.min(100, (atual / total) * 100);
  progressoTextoElemento.textContent = `${atual}/${total}`;
  progressoFillElemento.style.width = `${porcentagem}%`;
  missaoTextoElemento.textContent = missoesEducativas[state.dificuldade];
}

function atualizarRecompensa() {
  const recompensa = [...recompensas].reverse().find(item => state.pontos >= item.minimo) || recompensas[0];
  recompensaAtualElemento.textContent = recompensa.nome;
  recompensaPontosElemento.textContent = state.pontos;
  const faseAtual = Math.min(state.indice + 1, palavrasJogo[state.dificuldade].length);
  recompensaFaseElemento.textContent = `Fase ${faseAtual}`;
  document.querySelectorAll('.recompensa-badge').forEach((badge) => badge.classList.remove('ativo'));
  const principal = document.querySelector('.recompensa-badge');
  if (principal) principal.classList.add('ativo');
}

function mostrarCuriosidade() {
  curiosidadeTextoElemento.textContent = curiosidades[Math.floor(Math.random() * curiosidades.length)];
}

function mostrarFeedback(texto, cor = '#ffffff') {
  resultado.textContent = texto;
  resultado.style.color = cor;
}

function mostrarMensagem(texto) {
  mensagem.textContent = texto;
}

function iniciarDificuldade(nivel) {
  clearInterval(state.timer);
  state.timer = null;
  state.modo = 'classic';
  state.dificuldade = nivel;
  state.indice = 0;
  state.pontos = 0;
  state.vidas = 3;
  state.combo = 0;
  state.totalAcertos = 0;
  state.totalErros = 0;
  state.palavraFormada = [];
  state.palavraMontada = '';
  state.processando = false;
  state.jogoIniciado = true;
  state.tempoRestante = 60;
  state.totalPartidas += 1;
  salvarStats();
  telaInicial.classList.add('oculto');
  telaJogo.classList.remove('oculto');
  esconderOverlay();
  resetarBotoes();
  atualizarPlacar();
  animarVaso();
  iniciarPalavra();
}

function iniciarModoTempo() {
  state.modo = 'tempo';
  state.dificuldade = 'medio';
  state.indice = 0;
  state.pontos = 0;
  state.vidas = 3;
  state.combo = 0;
  state.totalAcertos = 0;
  state.totalErros = 0;
  state.palavraFormada = [];
  state.palavraMontada = '';
  state.processando = false;
  state.jogoIniciado = true;
  state.tempoRestante = 60;
  state.totalPartidas += 1;
  salvarStats();
  telaInicial.classList.add('oculto');
  telaJogo.classList.remove('oculto');
  esconderOverlay();
  resetarBotoes();
  atualizarPlacar();
  animarVaso();
  iniciarPalavra();
  iniciarCronometro();
}

function resetarBotoes() {
  botaoVerificar.disabled = false;
  botaoApagar.disabled = false;
  botaoLimpar.disabled = false;
}

function mostrarMenuDificuldade() {
  const modal = document.createElement('div');
  modal.className = 'modal-dificuldade';
  modal.innerHTML = `
    <div class="modal-conteudo">
      <h2>Escolha a Dificuldade 🎮</h2>
      <div class="botoes-dificuldade">
        <button class="botao-dificuldade" type="button" data-nivel="facil">⭐ Fácil</button>
        <button class="botao-dificuldade" type="button" data-nivel="medio">⭐⭐ Médio</button>
        <button class="botao-dificuldade" type="button" data-nivel="dificil">⭐⭐⭐ Difícil</button>
      </div>
    </div>
  `;

  modal.querySelectorAll('.botao-dificuldade').forEach((botao) => {
    botao.addEventListener('click', () => {
      modal.remove();
      iniciarDificuldade(botao.dataset.nivel);
    });
  });

  document.body.appendChild(modal);
}

function iniciarPalavra() {
  state.processando = false;
  letras.innerHTML = '';
  state.palavraFormada = [];
  state.palavraMontada = '';
  state.palavraAtual = '';
  state.palavraAtualDica = '';
  state.palavraAtualExplicacao = '';
  palavra.textContent = '_';
  palavraFormadaElemento.textContent = '';
  resultado.textContent = '';

  const pool = palavrasJogo[state.dificuldade];
  const indiceAleatorio = Math.floor(Math.random() * pool.length);
  const item = pool[indiceAleatorio];
  state.palavraAtual = item.palavra;
  state.palavraAtualDica = item.dica;
  state.palavraAtualExplicacao = item.explicacao;
  sobreDica.textContent = item.dica;
  mostrarMensagem(`💡 Dica: ${item.dica}`);

  const letrasDaPalavra = embaralhar([...normalizarTexto(item.palavra)]);
  state.letrasDisponiveis = letrasDaPalavra;

  letrasDaPalavra.forEach((letra, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'letra';
    btn.textContent = letra;
    btn.style.animationDelay = `${index * 0.04}s`;
    btn.addEventListener('click', () => {
      if (state.processando || btn.classList.contains('usada')) return;
      btn.classList.add('usada');
      state.palavraFormada.push(letra);
      formarPalavra();
    });
    letras.appendChild(btn);
  });

  atualizarPlacar();
  atualizarFaseInfo();
}

function formarPalavra() {
  state.palavraMontada = state.palavraFormada.join('');
  palavra.textContent = state.palavraMontada || '_';
  palavraFormadaElemento.textContent = state.palavraMontada || '';
  return state.palavraMontada;
}

function limparJogo() {
  if (state.processando) return;
  state.palavraFormada = [];
  state.palavraMontada = '';
  document.querySelectorAll('.letra.usada').forEach((botao) => botao.classList.remove('usada'));
  resultado.textContent = '';
  mostrarMensagem(`💡 Dica: ${state.palavraAtualDica}`);
  formarPalavra();
}

function apagarLetra() {
  if (state.palavraFormada.length === 0 || state.processando) return;
  const ultimo = state.palavraFormada.pop();
  const botoesUsados = document.querySelectorAll('.letra.usada');
  for (let i = botoesUsados.length - 1; i >= 0; i -= 1) {
    if (botoesUsados[i].textContent === ultimo) {
      botoesUsados[i].classList.remove('usada');
      break;
    }
  }
  resultado.textContent = '';
  formarPalavra();
}

function atualizarTimer() {
  if (state.modo === 'tempo') {
    timerLabel.textContent = `⏱️ ${state.tempoRestante}s`;
  } else {
    timerLabel.textContent = '⚡ Clássico';
  }
}

function iniciarCronometro() {
  clearInterval(state.timer);
  state.timer = setInterval(() => {
    if (state.modo !== 'tempo' || !state.jogoIniciado || state.processando) return;
    state.tempoRestante -= 1;
    atualizarTimer();
    if (state.tempoRestante <= 0) {
      clearInterval(state.timer);
      fimDeJogoTempo();
    }
  }, 1000);
}

function fimDeJogoTempo() {
  state.processando = true;
  mostrarFeedback('⏱️ TEMPO ESGOTADO!', '#fddb3a');
  mostrarMensagem(`Tempo acabou! Você fez ${state.pontos} pontos. 🚽`);
  mostrarOverlay('Fim de jogo', `
    <p><strong>Pontuação:</strong> ${state.pontos}</p>
    <p><strong>Maior combo:</strong> ${state.melhorCombo}</p>
    <p><strong>Palavras acertadas:</strong> ${state.totalAcertos}</p>
    <p><strong>Recorde:</strong> ${state.recorde}</p>
  `, [
    { texto: 'Jogar de novo', classe: 'accent', action: () => iniciarModoTempo() },
    { texto: 'Menu principal', classe: '', action: () => voltarAoMenu() }
  ]);
}

function verificarPalavra() {
  if (state.processando) return;
  if (state.palavraFormada.length === 0) {
    mostrarFeedback('⚠️ Monte uma palavra primeiro!', '#fcd34d');
    return;
  }

  const tentativa = state.palavraFormada.join('');
  const esperada = normalizarTexto(state.palavraAtual);

  if (normalizarTexto(tentativa) === esperada) {
    processarAcerto();
  } else {
    processarErro();
  }
}

function processarAcerto() {
  state.processando = true;
  state.combo += 1;
  state.melhorCombo = Math.max(state.melhorCombo, state.combo);
  state.totalAcertos += 1;
  state.stats.totalAcertos += 1;
  state.stats.maiorCombo = Math.max(state.stats.maiorCombo, state.combo);
  state.stats.acertosPorDificuldade[state.dificuldade] += 1;

  const dificuldadeBonus = { facil: 10, medio: 20, dificil: 35 }[state.dificuldade] || 10;
  const faseBonus = (state.indice + 1) * 12;
  const comboBonus = (state.combo - 1) * 25;
  const velocidadeBonus = state.modo === 'tempo' ? Math.max(0, state.tempoRestante) : 0;
  const bonus = 100 + dificuldadeBonus + faseBonus + comboBonus + velocidadeBonus;
  state.pontos += bonus;
  if (state.pontos > state.recorde) {
    state.recorde = state.pontos;
    localStorage.setItem(STORAGE_KEYS.record, String(state.recorde));
  }

  const textoAcerto = state.combo >= 5 ? `🔥 COMBO x${state.combo}!` : `✅ CORRETO!`;
  mostrarFeedback(textoAcerto, '#9ae6b4');
  mostrarMensagem(`💦 DESCARGA PERFEITA! +${bonus} pontos`);
  mostrarCuriosidade();
  tocarSom('acerto');
  animarVaso();
  atualizarPlacar();
  verificarConquistas();

  setTimeout(() => {
    state.indice += 1;
    const total = palavrasJogo[state.dificuldade].length;

    if (state.indice >= total) {
      concluirFase();
      return;
    }

    state.processando = false;
    iniciarPalavra();
  }, 1200);
}

function processarErro() {
  state.combo = 0;
  state.totalErros += 1;
  state.stats.totalErros += 1;
  state.vidas -= 1;
  state.processando = true;
  mostrarFeedback('❌ RESPOSTA INCORRETA!', '#fca5a5');
  mostrarMensagem(`❤️ -1 VIDA · Tente novamente!`);
  tocarSom('erro');
  atualizarPlacar();
  salvarStats();
  document.querySelector('.desafio').classList.add('shake');
  setTimeout(() => document.querySelector('.desafio').classList.remove('shake'), 360);

  if (state.vidas <= 0) {
    setTimeout(() => fimDeJogo(), 700);
    return;
  }

  setTimeout(() => {
    state.processando = false;
    limparJogo();
  }, 700);
}

function concluirFase() {
  state.stats.fasesConcluidas = (state.stats.fasesConcluidas || 0) + 1;
  state.stats.dificuldadesConcluidas[state.dificuldade] = true;
  if (state.vidas === 3) state.stats.fasePerfeitaConcluida = true;
  verificarConquistas();
  salvarStats();
  mostrarOverlay('🚽 Banheiro liberado!', `
    <p>Você concluiu a fase e avançou com ${state.pontos} pontos.</p>
    <p><strong>Maior combo:</strong> ${state.melhorCombo}</p>
    <p><strong>Palavras corretas:</strong> ${state.totalAcertos}</p>
  `, [
    { texto: 'Continuar', classe: 'accent', action: () => { esconderOverlay(); reiniciarJogo(); } },
    { texto: 'Menu principal', classe: '', action: () => voltarAoMenu() }
  ]);
  state.processando = true;
}

function fimDeJogo() {
  state.processando = true;
  clearInterval(state.timer);
  mostrarOverlay('💀 Fim de jogo', `
    <p><strong>Pontuação final:</strong> ${state.pontos}</p>
    <p><strong>Recorde:</strong> ${state.recorde}</p>
    <p><strong>Maior combo:</strong> ${state.melhorCombo}</p>
    <p><strong>Palavras acertadas:</strong> ${state.totalAcertos}</p>
  `, [
    { texto: 'Jogar novamente', classe: 'accent', action: () => iniciarDificuldade(state.dificuldade) },
    { texto: 'Menu principal', classe: '', action: () => voltarAoMenu() }
  ]);
}

function voltarAoMenu() {
  clearInterval(state.timer);
  state.timer = null;
  state.modo = 'classic';
  esconderOverlay();
  state.processando = false;
  state.jogoIniciado = false;
  telaJogo.classList.add('oculto');
  telaInicial.classList.remove('oculto');
  mostrarMensagem('Escolha uma dificuldade para começar! 🚽');
  resultado.textContent = '';
  limparJogo();
  atualizarPlacar();
}

function reiniciarJogo() {
  state.indice = 0;
  state.combo = 0;
  state.pontos = 0;
  state.vidas = 3;
  state.processando = false;
  state.tempoRestante = 60;
  state.palavraFormada = [];
  state.palavraMontada = '';
  resetarBotoes();
  letras.innerHTML = '';
  palavra.textContent = '_';
  palavraFormadaElemento.textContent = '';
  resultado.textContent = '';
  mostrarMensagem('Próxima rodada iniciando...');
  iniciarPalavra();
}

function animarVaso() {
  if (!vasoCena) return;
  vasoCena.classList.remove('animar');
  void vasoCena.offsetWidth;
  vasoCena.classList.add('animar');
  acionarDescarga();
  setTimeout(() => {
    vasoCena.classList.remove('animar');
  }, 900);
}

function acionarDescarga() {
  if (!aguaVaso) return;

  clearInterval(movimentoAgua);
  clearTimeout(restauracaoAgua);
  aguaVaso?.classList.add('descargando');
  let posicao = 0;

  movimentoAgua = setInterval(() => {
    posicao += 5;
    if (aguaVaso) {
      const deslocamento = Math.min(posicao * 0.18, 18);
      const escala = Math.max(0.84, 1 - posicao / 650);
      aguaVaso.style.transform = `translateY(${deslocamento}px) scale(${escala})`;
      aguaVaso.style.opacity = String(Math.max(0.3, 1 - posicao / 140));
    }

    if (posicao >= 100) {
      clearInterval(movimentoAgua);
      movimentoAgua = null;
      restauracaoAgua = setTimeout(() => {
        aguaVaso?.classList.remove('descargando');
        if (aguaVaso) {
          aguaVaso.style.transform = '';
          aguaVaso.style.opacity = '';
        }
      }, 550);
    }
  }, 50);
}

function animarCordinha() {
  if (!botaoDescarga) return;

  botaoDescarga.classList.add('puxada');
  setTimeout(() => {
    botaoDescarga.classList.remove('puxada');
  }, 500);
}

function executarDescarga() {
  animarCordinha();
  acionarDescarga();
}

function tocarSom(tipo) {
  if (!state.soundOn) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const audio = new AudioContext();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  oscillator.connect(gain);
  gain.connect(audio.destination);

  const freqMap = {
    acerto: [750, 950],
    erro: [220, 180]
  };

  const values = freqMap[tipo] || [440, 440];
  oscillator.frequency.setValueAtTime(values[0], audio.currentTime);
  oscillator.frequency.setValueAtTime(values[1], audio.currentTime + 0.12);
  gain.gain.setValueAtTime(0.18, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.25);
  oscillator.start();
  oscillator.stop(audio.currentTime + 0.25);
}

function contarAcertosPorDificuldade(nivel) {
  return state.stats.acertosPorDificuldade[nivel] || 0;
}

function concluiuTodasDificuldades() {
  return Object.values(state.stats.dificuldadesConcluidas).every(Boolean);
}

function verificarConquistas() {
  achievementsList.forEach((item) => {
    const ok = item.condicao();
    if (ok) state.achievements[item.id] = true;
  });
  salvarStats();
  renderizarConquistas();
}

function renderizarConquistas() {
  const lista = Object.entries(state.achievements).filter(([, value]) => value).map(([key, value]) => ({
    key,
    value
  }));

  if (!lista.length) return;
}

function mostrarOverlay(titulo, conteudo, botoes) {
  overlay.innerHTML = `
    <div class="overlay-card">
      <h2>${titulo}</h2>
      <div>${conteudo}</div>
      <div class="overlay-actions">
        ${botoes.map((botao) => `<button class="${botao.classe || ''}" type="button" data-action="${botao.texto}">${botao.texto}</button>`).join('')}
      </div>
    </div>
  `;

  overlay.classList.remove('hidden');
  overlay.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      const texto = button.textContent.trim();
      const botao = botoes.find((item) => item.texto === texto);
      if (botao && botao.action) botao.action();
    });
  });
}

function esconderOverlay() {
  overlay.classList.add('hidden');
  overlay.innerHTML = '';
}

function mostrarEstatisticas() {
  const totalTentativas = state.stats.totalAcertos + state.stats.totalErros;
  const taxa = totalTentativas ? Math.round((state.stats.totalAcertos / totalTentativas) * 100) : 0;
  mostrarOverlay('📊 Estatísticas', `
    <p><strong>Pontuação atual:</strong> ${state.pontos}</p>
    <p><strong>Recorde:</strong> ${state.recorde}</p>
    <p><strong>Maior combo:</strong> ${state.stats.maiorCombo}</p>
    <p><strong>Palavras acertadas:</strong> ${state.stats.totalAcertos}</p>
    <p><strong>Palavras erradas:</strong> ${state.stats.totalErros}</p>
    <p><strong>Partidas:</strong> ${state.totalPartidas}</p>
    <p><strong>Taxa de acerto:</strong> ${taxa}%</p>
  `, [
    { texto: 'Fechar', classe: '', action: () => esconderOverlay() }
  ]);
}

function mostrarConquistas() {
  const itens = achievementsList.map((item) => {
    const unlocked = !!state.achievements[item.id];
    return `
      <div class="achievement-item ${unlocked ? 'active' : ''}">
        <strong>${item.nome}</strong>
        <span>${item.descricao}</span>
      </div>
    `;
  }).join('');

  mostrarOverlay('🏆 Conquistas', `<div class="achievement-list">${itens}</div>`, [
    { texto: 'Fechar', classe: '', action: () => esconderOverlay() }
  ]);
}

function inicializarMenu() {
  botaoIniciar.addEventListener('click', mostrarMenuDificuldade);
  botaoJogarMenu.addEventListener('click', mostrarMenuDificuldade);
  botaoTempoMenu.addEventListener('click', iniciarModoTempo);
  botaoConquistas.addEventListener('click', mostrarConquistas);
  botaoEstatisticas.addEventListener('click', mostrarEstatisticas);
  botaoSom.addEventListener('click', () => {
    state.soundOn = !state.soundOn;
    localStorage.setItem(STORAGE_KEYS.sound, state.soundOn ? 'on' : 'off');
    botaoSom.textContent = `🔊 Som: ${state.soundOn ? 'ON' : 'OFF'}`;
  });

  let inicioPuxada = null;
  let distanciaPuxada = 0;
  let descargaAcionada = false;

  function acionarCordinha() {
    if (descargaAcionada || state.processando) return;
    descargaAcionada = true;
    executarDescarga();
    setTimeout(() => {
      descargaAcionada = false;
    }, 700);
  }

  function finalizarPuxada() {
    if (inicioPuxada === null) return;

    inicioPuxada = null;
    botaoDescarga.classList.remove('arrastando');

    if (distanciaPuxada >= 28) acionarCordinha();

    distanciaPuxada = 0;
  }

  botaoDescarga.addEventListener('pointerdown', (event) => {
    if (state.processando) return;
    inicioPuxada = event.clientY;
    distanciaPuxada = 0;
    botaoDescarga.classList.add('arrastando');
    botaoDescarga.setPointerCapture(event.pointerId);
  });

  botaoDescarga.addEventListener('pointermove', (event) => {
    if (inicioPuxada === null) return;
    const distancia = Math.max(0, event.clientY - inicioPuxada);
    distanciaPuxada = distancia;
    botaoDescarga.style.setProperty('--puxada', `${Math.min(distancia, 42)}px`);
  });

  botaoDescarga.addEventListener('pointerup', (event) => {
    if (botaoDescarga.hasPointerCapture(event.pointerId)) {
      botaoDescarga.releasePointerCapture(event.pointerId);
    }
    finalizarPuxada();
    botaoDescarga.style.removeProperty('--puxada');
  });

  botaoDescarga.addEventListener('pointercancel', finalizarPuxada);
  botaoDescarga.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      acionarCordinha();
    }
  });

  botaoVerificar.addEventListener('click', verificarPalavra);
  botaoApagar.addEventListener('click', apagarLetra);
  botaoLimpar.addEventListener('click', limparJogo);
  document.addEventListener('keydown', (event) => {
    if (telaJogo.classList.contains('oculto')) return;
    if (event.key === 'Enter') verificarPalavra();
    if (event.key === 'Backspace') apagarLetra();
  });

  botaoSom.textContent = `🔊 Som: ${state.soundOn ? 'ON' : 'OFF'}`;
  atualizarPlacar();
  mostrarMensagem('Escolha uma dificuldade para começar! 🚽');
}

inicializarMenu();


