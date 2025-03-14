<!-- Incluir os scripts do Three.js e OBJLoader -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/loaders/OBJLoader.js"></script>

<!-- A div onde o canvas será inserido -->
<div id="logo3d-container"></div>

<script>
document.addEventListener("DOMContentLoaded", function() {
    // Cena do Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(500, 500);  // Ajuste o tamanho da logo 3D
    document.getElementById('logo3d-container').appendChild(renderer.domElement);

    // Luzes
    const light = new THREE.AmbientLight(0x404040, 1); // Luz suave
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Luz direcional
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Carregar o modelo 3D
    const loader = new THREE.OBJLoader();
    loader.load('logo.obj', function (objeto) {  // Altere 'logo.obj' para o caminho do seu arquivo .obj
        scene.add(objeto);
        objeto.scale.set(0.5, 0.5, 0.5);  // Ajuste o tamanho da logo, se necessário
    });

    // Ajuste da câmera
    camera.position.z = 5;

    // Função de animação
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotacionar o modelo para dar efeito 3D
        scene.children.forEach(child => {
            if (child instanceof THREE.Mesh) {
                child.rotation.x += 0.01;
                child.rotation.y += 0.01;
            }
        });

        renderer.render(scene, camera);
    }

    animate();
});
</script>
