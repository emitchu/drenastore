// Controlando a tela de carregamento durante a navegação
window.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');

    // Quando a página é carregada, esconder a tela de carregamento
    if (content) {
        loadingScreen.style.display = 'none';
        content.style.display = 'block';
    }

    // Exibindo a tela de carregamento quando a navegação é iniciada
    const productLinks = document.querySelectorAll('.product-link');
    productLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Exibe a tela de carregamento
            loadingScreen.style.display = 'flex';
        });
    });
});
