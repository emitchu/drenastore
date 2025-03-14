// Controlando a tela de carregamento durante a navegação
window.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');

    window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loading-screen');
        
        // Adiciona a classe 'hidden' para aplicar a animação de fade-out
        loadingScreen.classList.add('hidden');
    
        // Após a animação de fade-out, esconda completamente a tela de carregamento
        setTimeout(() => {
            loadingScreen.style.display = 'none'; // Isso garante que ela não ocupará espaço
        }, 500); // Duração da animação (500ms)
    });
    
});
