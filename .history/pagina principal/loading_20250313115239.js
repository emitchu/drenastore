// Controlando a tela de carregamento durante a navegação
window.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');

    // Esconde a tela de carregamento assim que o conteúdo estiver carregado
    window.addEventListener('load', () => {
        // A tela de carregamento desaparece após o carregamento total da página
        loadingScreen.style.display = 'none';
        content.style.display = 'block';
    });

    // Exibindo a tela de carregamento quando a navegação é iniciada
    const productLinks = document.querySelectorAll('.product-link');
    productLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Exibe a tela de carregamento quando a navegação começa
            loadingScreen.style.display = 'flex';
        });
    });
});
