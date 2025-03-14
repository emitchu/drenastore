<script type="module">
  import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
  import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/OBJLoader.js';
  import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

  window.THREE = THREE;  // Tornar o THREE acessível globalmente

  function init() {
    const canvasWidth = 300;
    const canvasHeight = 300;

    // Criar o renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(canvasWidth, canvasHeight);

    // Adicionar o canvas 3D ao container
    const canvasContainer = document.getElementById('model');
    canvasContainer.appendChild(renderer.domElement);

    // Câmera
    const fov = 60;
    const aspect = canvasWidth / canvasHeight;
    const near = 1.0;
    const far = 1000.0;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 5, 170);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Cena
    const scene = new THREE.Scene();

    // Luz
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.position.set(20, 100, 10);
    scene.add(light);

    // Controles orbitais
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

    // Função de animação
    function animate() {
      requestAnimationFrame(animate);
      controls.update();  // Atualizar controles a cada quadro
      renderer.render(scene, camera);
    }

    animate();
  }

  // Aguardar o carregamento do conteúdo da página e iniciar a animação
  window.addEventListener('DOMContentLoaded', init);
</script>
