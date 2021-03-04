export const canvasCode = `
const screen = document.getElementById("screen");
`

export const rendererCode = `
const renderer = new THREE.WebGLRenderer();
renderer.setSize(screen.offsetWidth, screen.offsetHeight);
screen.appendChild(renderer.domElement);
`

export const sceneCode = `
const scene = new THREE.Scene();
`

export const cameraCode = `
const camera = new THREE.PerspectiveCamera(
  75,
  screen.offsetWidth / screen.offsetHeight,
  0.1,
  1000
);
camera.position.z = 5;
camera.lookAt(0, 0, 0);
`

export const lightCode = `
const pointLight = new THREE.PointLight(0xaaaaaa);
pointLight.position.set(5, 10, 15);
scene.add(pointLight);
const light = new THREE.AmbientLight( 0xaaaaaa, 0.5 );
scene.add( light );
`

export const meshCode = `
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
`

export const createTShirt = `
const tshirt = {
  color: "#eeeeee",
  isMale: true,
  loadImage() {
    file && file.click();
  },
  maleMesh: null,
  femaleMesh: null,
  changeVisibility(maleVisible) {
    this.maleMesh.visible = maleVisible;
    this.femaleMesh.visible = !maleVisible;
  },
  changeColor(colorString) {
    this.maleMesh.children[0].material.color.set(
      +colorString.replace("#", "0x")
    );
  },
  changeTexture(texture) {
    this.maleMesh.children[1].material.map = texture;
  }
};
`

export const loadTShirtCode = (modelLoadedCode = '') => `
const loader = new GLTFLoader();
loader.load(
	'models/t-shirts.glb',
	(gltf) => {
      ${modelLoadedCode
        .split(/\r?\n/)
        .map((l) => '      ' + l)
        .join('\n')}
  },
	(xhr) => console.log((xhr.loaded / xhr.total * 100 ) + '% loaded'),
	(error) => console.log( 'An error happened' )
);
`

export const modelLoadedCode = `
renderer.setClearColor(0xffffff);
const [male, female] = gltf.scene.children;
scene.add(female);
scene.add(male);
tshirt.maleMesh = male;
tshirt.femaleMesh = female;
tshirt.changeVisibility(true);
tshirt.changeColor(tshirt.color);
`

export const datGUICode = `
window.gui = new dat.GUI();
gui
  .add(tshirt, "isMale")
  .name("Male / Female")
  .onChange((value) => {
    tshirt.changeVisibility(value);
  });
gui.addColor(tshirt, "color").onChange((color) => {
  tshirt.changeColor(color);
});
gui.add(tshirt, "loadImage").name("Upload image");
`

export const renderCode = `
renderer.render(scene, camera);
`

export const rotateXCode = `
cube.rotation.x = 30 * Math.PI / 180;
`

export const rotateYCode = `cube.rotation.y = -30 * Math.PI / 180;
`

export const setIntervalCode = `
function animate () {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
};

setInterval(animate, 1/60 * 1000);
`

export const requestAnimationFrameCode = `
function animate () {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
};
`

export const animateCode = `
animate();
`

export const createOrbitControlsCode = `
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 2;
controls.maxDistance = 10;
controls.update();
`

export const renderWithOrbitControlsCode = `
function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}
`

export const createFileElement = `
const textureLoader = new THREE.TextureLoader();

const file = document.createElement("input");
file.type = "file";
file.addEventListener("change", (e) => {
  if (!e.target.files || !e.target.files[0]) {
    return;
  }
  textureLoader.load(
    URL.createObjectURL(e.target.files[0]),
    (texture) => tshirt.changeTexture(texture),
    (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
    (err) => console.error("An error happened.")
  );
});
`
