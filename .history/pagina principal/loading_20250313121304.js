// loading.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

function init() {
    const canvasWidth = 300;
    const canvasHeight = 300;

    // Criação do renderer
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    });
    renderer.setSize(canvasWidth, canvasHeight);

    // Adiciona o canvas 3D ao container
    const canvasContainer = document.getElementById('model');
    canvasContainer.appendChild(renderer.domElement);

    // Configuração da câmera
    const fov = 60;
    const aspect = canvasWidth / canvasHeight;
    const near = 1.0;
    const far = 1000.0;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 5, 170);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Criar a cena
    const scene = new THREE.Scene();

    // Adicionar luz
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.position.set(20, 100, 10);
    scene.add(light);

    // Controles Orbit
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    // Carregar o modelo OBJ
    const loader = new OBJLoader();
    loader.load('cuzin.obj', (object) => {
        object.scale.set(0.5, 0.5, 0.5);
        object.position.set(0, 0, 0);
        scene.add(object);
    });

    // Função de animação para renderizar
    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // Atualiza os controles de órbita
        renderer.render(scene, camera);
    }

    animate();
}

// Espera o carregamento completo da página e então inicializa
window.addEventListener('DOMContentLoaded', init);
