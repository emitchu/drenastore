<script type="module">
  import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
  import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/OBJLoader.js';
  import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

  window.THREE = THREE;  // Tornar o THREE acessível globalmente

  function init() {
    const canvasWidth = 300;
    const canvasHeight = 300;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(canvasWidth, canvasHeight);
    
    // Adiciona o canvas 3D ao container
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

    // Controles Orbitais (corrigido para instanciá-los corretamente)
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

    // Função de renderização
    function animate() {
      requestAnimationFrame(animate);
      controls.update(); // Atualizar controles a cada quadro
      renderer.render(scene, camera);
    }

    animate();
  }

  window.addEventListener('DOMContentLoaded', init);
</script>


let scene, camera, renderer, loader, obj;
let controls;
let loaded = false;

// Configuração do Three.js
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('model').appendChild(renderer.domElement);

  // Controles de órbita
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  camera.position.z = 5;

  // Carregar o modelo 3D
  loader = new THREE.OBJLoader();
  loader.load('cuzin.obj', function (object) {
    obj = object;
    scene.add(obj);

    // Escala e ajustes no modelo
    obj.scale.set(0.5, 0.5, 0.5);
    obj.rotation.x = Math.PI / 4;
    obj.rotation.y = Math.PI / 4;
    
    // Luz
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Chama a função que vai esconder a tela de carregamento depois de carregado
    loaded = true;
  });
}

// Animação da cena
function animate() {
  requestAnimationFrame(animate);

  if (obj) {
    obj.rotation.x += 0.01;
    obj.rotation.y += 0.01;
  }

  controls.update();
  renderer.render(scene, camera);

  // Se o modelo foi carregado, esconda a tela de carregamento
  if (loaded) {
    document.getElementById('loading-screen').classList.add('hidden');
    document.body.classList.add('loaded');
  }
}

// Responsividade da tela
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Iniciar a animação
init();
animate();
