window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;

    // Remove a tela de carregamento com animação
    loadingScreen.classList.add('hidden');
    
    // Mostra o conteúdo da página após a animação de fade-out
    setTimeout(() => {
        loadingScreen.style.display = 'none'; // Garantir que a tela de carregamento desapareça
        body.classList.add('loaded'); // Torna o conteúdo visível
    }, 500); // Correspondente ao tempo da animação de fade-out
});

window.addEventListener('load', function () {
    // Quando a página terminar de carregar, esconda a tela de carregamento
    document.getElementById('loading-screen').classList.add('hidden');
    document.body.classList.add('loaded');
  });