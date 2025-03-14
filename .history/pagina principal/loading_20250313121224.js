


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
