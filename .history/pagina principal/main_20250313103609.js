import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

class Website3DDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    const canvasWidth = 300;  // Largura do canvas
    const canvasHeight = 300; // Altura do canvas

    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setSize(canvasWidth, canvasHeight); // Ajuste o tamanho aqui

    // Adiciona o canvas 3D ao container especificado
    const canvasContainer = document.getElementById('model');
    canvasContainer.appendChild(this._threejs.domElement);

    window.addEventListener('resize', () => {
      this._OnWindowResize(canvasWidth, canvasHeight);
    }, false);

    const fov = 60;
    const aspect = canvasWidth / canvasHeight;  // Mantém a proporção do canvas
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // Afastando a câmera no eixo Z para visualizar melhor o objeto
    this._camera.position.set(0, 5, 170);  // Afastando mais no eixo z
    this._camera.lookAt(new THREE.Vector3(0, 0, 0));  // Garantir que a câmera olhe para o centro da cena

    this._scene = new THREE.Scene();

    // Adicionando luz
    let light = new THREE.DirectionalLight(0xFFFFFF);
    light.position.set(20, 100, 10);
    light.castShadow = true;
    this._scene.add(light);

    light = new THREE.AmbientLight(0xFFFFFF, 0.5);
    this._scene.add(light);

    // Controles orbitais
    this._controls = new OrbitControls(this._camera, this._threejs.domElement);
    this._controls.target.set(0, 0, 0); // Centraliza a câmera no centro do objeto
    this._controls.update();

    // Carregar o modelo
    this._LoadModel('./cuzin.obj', new THREE.Vector3(0, 0, 0));

    // Adiciona o ouvinte de movimento do mouse
    document.addEventListener('mousemove', (event) => {
      this._onMouseMove(event);
    });

    this._RAF();
  }

  _LoadModel(modelFile, offset) {
    const loader = new OBJLoader();
    loader.load(modelFile, (obj) => {
        // Escala o objeto para ficar menor
        obj.scale.set(0.5, 0.5, 0.5);  // Reduz o tamanho do objeto
        obj.position.copy(offset);

        // Ajustando rotação para o objeto ficar mais inclinado para a frente
        obj.rotation.x = Math.PI / 11;  // Ajuste para uma rotação positiva (inclinado para a frente)

        this._obj = obj;  // Armazenando o objeto para poder manipulá-lo depois

        const material = new THREE.MeshStandardMaterial({ color: 0x000000 });
        obj.traverse((child) => {
            if (child.isMesh) {
                child.material = material;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        this._scene.add(obj);
    }, undefined, (error) => {
        console.error("Erro ao carregar o modelo:", error);
    });
  }

  _onMouseMove(event) {
    // Calcula a posição do mouse em relação à tela
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;  // Mapeia para o intervalo de -1 a 1
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;  // Mapeia para o intervalo de -1 a 1

    // Movendo o objeto com base na posição do mouse
    if (this._obj) {
      // Ajustando rotação para que o movimento do mouse afete a rotação do objeto
      // Limita o movimento a uma faixa para evitar que o objeto fique muito para cima ou para baixo
      this._obj.rotation.y = mouseX * Math.PI / 5;  // Movimento horizontal suave
      this._obj.rotation.x = mouseY * Math.PI / 8;  // Movimento vertical suave
    }
  }

  _OnWindowResize(canvasWidth, canvasHeight) {
    this._camera.aspect = canvasWidth / canvasHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(canvasWidth, canvasHeight);
  }

  _RAF() {
    requestAnimationFrame(() => this._RAF());
    this._threejs.render(this._scene, this._camera);
  }
}

let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new Website3DDemo();
});
