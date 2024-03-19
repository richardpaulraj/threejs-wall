import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas2d = document.getElementById('canvas2d')
const ctx = canvas2d.getContext('2d')
const canvas3d = document.getElementById('canvas3d')
const button = document.getElementById('toggleViewButton')

let is3DView = false

button.addEventListener('click', toggleView)

function toggleView() {
  is3DView = !is3DView
  if (is3DView) {
    canvas2d.style.display = 'none'
    canvas3d.style.display = 'block'
    draw3DScene()
  } else {
    canvas3d.style.display = 'none'
    canvas2d.style.display = 'block'
    draw2DScene()
  }
}

function draw2DScene() {
  // Initialize drawing variables
  let isDrawing = false
  let lastX = 0
  let lastY = 0

  // Event listeners for mouse interactions
  canvas2d.addEventListener('mousedown', startDrawing)
  canvas2d.addEventListener('mousemove', draw)
  canvas2d.addEventListener('mouseup', stopDrawing)
  canvas2d.addEventListener('mouseout', stopDrawing)

  function startDrawing(e) {
    isDrawing = true
    ;[lastX, lastY] = [e.offsetX, e.offsetY]
  }

  function draw(e) {
    if (!isDrawing) return
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(e.offsetX, e.offsetY)
    // ctx.moveTo(50, 50)
    // ctx.lineTo(200, 200)
    ctx.moveTo(975, 378)
    ctx.lineTo(978, 378)
    console.log(
      lastX,
      ':LastX',
      lastY,
      ':lastY',
      e.offsetX,
      ':e.offsetX',
      e.offsetY,
      ':e.offsetY'
    )
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 30
    ctx.stroke()
    ;[lastX, lastY] = [e.offsetX, e.offsetY]
  }

  function stopDrawing() {
    isDrawing = false
  }
  console.log('2D drawing initialized')
}

function draw3DScene() {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  const renderer = new THREE.WebGLRenderer({ canvas: canvas3d })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor('#fff')

  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 'red' })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  camera.position.z = 5

  const controls = new OrbitControls(camera, canvas3d)

  const animate = function () {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    controls.update()

    renderer.render(scene, camera)
  }

  animate()
}

// Initial drawing
draw2DScene()
