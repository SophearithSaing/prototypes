import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { milestones, skills } from '../data/resume'

type ResumeSceneProps = {
  selectedId: string | null
  onSelect: (id: string | null) => void
}

export type ResumeSceneHandle = {
  resetView: () => void
  focusFirst: () => void
}

type LabelRecord = {
  element: HTMLButtonElement
  anchor: THREE.Object3D
  priority: number
  width: number
  height: number
}

type InteractiveRecord = {
  id: string
  mesh: THREE.Object3D
  baseScale: number
  materials: THREE.Material[]
  accentMaterials?: THREE.Material[]
}

const CYAN = new THREE.Color('#12f1f3')
const LIME = new THREE.Color('#9dff45')
const BOARD_WIDTH = 13.2
const BOARD_HEIGHT = 7.6
const DEFAULT_ROTATION = { x: -0.09, y: -0.07, z: -0.035 }
const ROTATION_LIMITS = { minX: -0.72, maxX: 0.38, minY: -0.58, maxY: 0.52 }
const ROTATION_SENSITIVITY = 0.0034

function createRoundedGeometry(
  width: number,
  height: number,
  radius: number,
  depth: number,
  bevelThickness = 0.06,
  bevelSize = Math.min(radius * 0.22, 0.08),
) {
  const x = -width / 2
  const y = -height / 2
  const shape = new THREE.Shape()

  shape.moveTo(x + radius, y)
  shape.lineTo(x + width - radius, y)
  shape.quadraticCurveTo(x + width, y, x + width, y + radius)
  shape.lineTo(x + width, y + height - radius)
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  shape.lineTo(x + radius, y + height)
  shape.quadraticCurveTo(x, y + height, x, y + height - radius)
  shape.lineTo(x, y + radius)
  shape.quadraticCurveTo(x, y, x + radius, y)

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: bevelThickness < 0.02 ? 2 : 3,
    bevelSize,
    bevelThickness,
    curveSegments: 8,
  })
  geometry.computeVertexNormals()
  return geometry
}

function createBoardTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 576
  const context = canvas.getContext('2d')!

  let seed = 74121
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }

  const base = context.createLinearGradient(0, 0, canvas.width, canvas.height)
  base.addColorStop(0, '#2b3134')
  base.addColorStop(0.42, '#232a2d')
  base.addColorStop(1, '#1a2124')
  context.fillStyle = base
  context.fillRect(0, 0, canvas.width, canvas.height)

  const surfaceLight = context.createRadialGradient(360, 190, 20, 360, 190, 620)
  surfaceLight.addColorStop(0, 'rgba(118, 127, 130, 0.11)')
  surfaceLight.addColorStop(0.55, 'rgba(65, 73, 76, 0.025)')
  surfaceLight.addColorStop(1, 'rgba(0, 0, 0, 0.12)')
  context.fillStyle = surfaceLight
  context.fillRect(0, 0, canvas.width, canvas.height)

  for (let index = 0; index < 18; index += 1) {
    const x = random() * canvas.width
    const y = random() * canvas.height
    const radius = 80 + random() * 190
    const light = random() > 0.52
    const mottle = context.createRadialGradient(x, y, 0, x, y, radius)
    mottle.addColorStop(0, light ? 'rgba(145, 151, 153, 0.022)' : 'rgba(0, 0, 0, 0.026)')
    mottle.addColorStop(1, 'rgba(0, 0, 0, 0)')
    context.fillStyle = mottle
    context.fillRect(x - radius, y - radius, radius * 2, radius * 2)
  }

  context.lineWidth = 1
  context.strokeStyle = 'rgba(145, 154, 156, 0.035)'
  for (let index = 0; index < 9; index += 1) {
    const startX = 30 + random() * 180
    const startY = 28 + random() * (canvas.height - 56)
    const firstRun = 70 + random() * 150
    const rise = (random() > 0.5 ? 1 : -1) * (18 + random() * 48)
    const secondRun = 90 + random() * 210
    context.beginPath()
    context.moveTo(startX, startY)
    context.lineTo(startX + firstRun, startY)
    context.lineTo(startX + firstRun + 24, startY + rise)
    context.lineTo(startX + firstRun + secondRun, startY + rise)
    context.stroke()
  }

  const image = context.getImageData(0, 0, canvas.width, canvas.height)
  for (let index = 0; index < image.data.length; index += 4) {
    const grain = Math.floor(random() * 5) - 2
    image.data[index] += grain
    image.data[index + 1] += grain
    image.data[index + 2] += grain
  }
  context.putImageData(image, 0, 0)

  context.fillStyle = 'rgba(172, 179, 180, 0.075)'
  for (let index = 0; index < 65; index += 1) {
    const x = random() * canvas.width
    const y = random() * canvas.height
    const radius = random() > 0.8 ? 1.4 : 0.7
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

function createBoardMicroTexture(seed: number, base: number, variation: number) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 288
  const context = canvas.getContext('2d')!
  const image = context.createImageData(canvas.width, canvas.height)
  for (let index = 0; index < image.data.length; index += 4) {
    seed = (seed * 1664525 + 1013904223) >>> 0
    const grain = base + Math.floor((seed / 4294967296) * variation)
    image.data[index] = grain
    image.data[index + 1] = grain
    image.data[index + 2] = grain
    image.data[index + 3] = 255
  }
  context.putImageData(image, 0, 0)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.NoColorSpace
  texture.anisotropy = 4
  return texture
}

function createRoundedOutline(
  width: number,
  height: number,
  radius: number,
  z: number,
  color: THREE.Color,
) {
  const curve = new THREE.CurvePath<THREE.Vector3>()
  const left = -width / 2
  const right = width / 2
  const bottom = -height / 2
  const top = height / 2
  const point = (x: number, y: number) => new THREE.Vector3(x, y, z)

  curve.add(new THREE.LineCurve3(point(left + radius, bottom), point(right - radius, bottom)))
  curve.add(
    new THREE.QuadraticBezierCurve3(
      point(right - radius, bottom),
      point(right, bottom),
      point(right, bottom + radius),
    ),
  )
  curve.add(new THREE.LineCurve3(point(right, bottom + radius), point(right, top - radius)))
  curve.add(
    new THREE.QuadraticBezierCurve3(
      point(right, top - radius),
      point(right, top),
      point(right - radius, top),
    ),
  )
  curve.add(new THREE.LineCurve3(point(right - radius, top), point(left + radius, top)))
  curve.add(
    new THREE.QuadraticBezierCurve3(
      point(left + radius, top),
      point(left, top),
      point(left, top - radius),
    ),
  )
  curve.add(new THREE.LineCurve3(point(left, top - radius), point(left, bottom + radius)))
  curve.add(
    new THREE.QuadraticBezierCurve3(
      point(left, bottom + radius),
      point(left, bottom),
      point(left + radius, bottom),
    ),
  )

  const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(160))
  return new THREE.LineLoop(
    geometry,
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.72, toneMapped: false }),
  )
}

function createRoundedFrame(
  width: number,
  height: number,
  radius: number,
  z: number,
  color: THREE.Color,
) {
  const x = -width / 2
  const y = -height / 2
  const shape = new THREE.Shape()
  shape.moveTo(x + radius, y)
  shape.lineTo(x + width - radius, y)
  shape.quadraticCurveTo(x + width, y, x + width, y + radius)
  shape.lineTo(x + width, y + height - radius)
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  shape.lineTo(x + radius, y + height)
  shape.quadraticCurveTo(x, y + height, x, y + height - radius)
  shape.lineTo(x, y + radius)
  shape.quadraticCurveTo(x, y, x + radius, y)

  const points = shape.getSpacedPoints(128)
  points.pop()
  const curve = new THREE.CatmullRomCurve3(
    points.map((point) => new THREE.Vector3(point.x, point.y, z)),
    true,
    'centripetal',
  )
  const geometry = new THREE.TubeGeometry(curve, 160, 0.009, 5, true)
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.78,
    toneMapped: true,
  })
  return new THREE.Mesh(geometry, material)
}

function createIconTexture(mark: string, label: string, color: string) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const context = canvas.getContext('2d')!
  context.clearRect(0, 0, 256, 256)
  context.strokeStyle = color
  context.fillStyle = color
  context.lineWidth = 10
  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.save()
  context.translate(128, 96)
  context.scale(0.68, 0.68)
  context.translate(-128, -128)

  if (mark === 'RE') {
    for (const rotation of [0, Math.PI / 3, -Math.PI / 3]) {
      context.save()
      context.translate(128, 128)
      context.rotate(rotation)
      context.beginPath()
      context.ellipse(0, 0, 76, 27, 0, 0, Math.PI * 2)
      context.stroke()
      context.restore()
    }
    context.beginPath()
    context.arc(128, 128, 11, 0, Math.PI * 2)
    context.fill()
  } else if (mark === 'TS') {
    context.fillRect(49, 49, 158, 158)
    context.fillStyle = '#020607'
    context.font = '700 70px IBM Plex Mono, monospace'
    context.fillText('TS', 128, 136)
  } else if (mark === 'SD') {
    for (const offset of [-38, 0, 38]) {
      context.beginPath()
      context.moveTo(128, 55 + offset)
      context.lineTo(202, 94 + offset)
      context.lineTo(128, 133 + offset)
      context.lineTo(54, 94 + offset)
      context.closePath()
      context.stroke()
    }
  } else if (mark === 'JS') {
    context.beginPath()
    for (let index = 0; index < 6; index += 1) {
      const angle = -Math.PI / 2 + (index * Math.PI) / 3
      const x = 128 + Math.cos(angle) * 82
      const y = 128 + Math.sin(angle) * 82
      if (index === 0) context.moveTo(x, y)
      else context.lineTo(x, y)
    }
    context.closePath()
    context.stroke()
    context.font = '700 58px IBM Plex Mono, monospace'
    context.fillText('JS', 128, 132)
  } else if (mark === '3D') {
    context.beginPath()
    context.moveTo(128, 42)
    context.lineTo(212, 192)
    context.lineTo(44, 192)
    context.closePath()
    context.moveTo(128, 42)
    context.lineTo(128, 152)
    context.moveTo(44, 192)
    context.lineTo(128, 152)
    context.lineTo(212, 192)
    context.stroke()
  } else if (mark === 'CI') {
    context.beginPath()
    context.moveTo(128, 128)
    context.bezierCurveTo(87, 67, 35, 77, 35, 128)
    context.bezierCurveTo(35, 179, 87, 189, 128, 128)
    context.bezierCurveTo(169, 67, 221, 77, 221, 128)
    context.bezierCurveTo(221, 179, 169, 189, 128, 128)
    context.stroke()
  } else {
    context.font = '700 72px IBM Plex Mono, monospace'
    context.fillText(mark, 128, 132)
  }
  context.restore()
  context.fillStyle = '#edf3f3'
  context.font = `${label.length > 10 ? 24 : 29}px Space Grotesk, sans-serif`
  context.fillText(label, 128, 210)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

function createTileShadowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 224
  const context = canvas.getContext('2d')!
  context.shadowColor = 'rgba(0, 0, 0, 0.78)'
  context.shadowBlur = 26
  context.shadowOffsetX = 7
  context.shadowOffsetY = 10
  context.fillStyle = 'rgba(0, 0, 0, 0.48)'
  context.beginPath()
  context.roundRect(37, 29, 176, 154, 24)
  context.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  return texture
}

function makeLabel(
  root: HTMLDivElement,
  kind: 'milestone' | 'skill',
  id: string,
  title: string,
  subtitle: string,
  onSelect: (id: string) => void,
) {
  const element = document.createElement('button')
  element.type = 'button'
  element.className = `scene-label ${kind}-label`
  element.dataset.id = id
  element.setAttribute(
    'aria-label',
    `View details for ${[title, subtitle].filter(Boolean).join(' ')}`,
  )

  const text = document.createElement('span')
  text.className = 'scene-label-title'
  text.textContent = subtitle
  if (title) {
    const accent = document.createElement('span')
    accent.className = 'scene-label-accent'
    accent.textContent = title
    element.append(accent)
  }
  element.append(text)
  element.addEventListener('click', () => onSelect(id))
  root.append(element)
  return element
}

function categoryColor(category: (typeof skills)[number]['category']) {
  if (category === 'backend') return '#9dff45'
  if (category === 'platform') return '#55f29a'
  return '#12f1f3'
}

export const ResumeScene = forwardRef<ResumeSceneHandle, ResumeSceneProps>(function ResumeScene(
  { selectedId, onSelect },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const resetRef = useRef<() => void>(() => undefined)
  const focusFirstRef = useRef<() => void>(() => undefined)
  const selectedRef = useRef(selectedId)
  const onSelectRef = useRef(onSelect)

  selectedRef.current = selectedId
  onSelectRef.current = onSelect

  useImperativeHandle(
    ref,
    () => ({
      resetView: () => resetRef.current(),
      focusFirst: () => focusFirstRef.current(),
    }),
    [],
  )

  useEffect(() => {
    const container = containerRef.current!
    const canvas = canvasRef.current!
    const overlayRoot = overlayRef.current!
    if (!container || !canvas || !overlayRoot) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 100)
    camera.position.set(0, 0.1, 14.7)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.shadowMap.enabled = false
    renderer.setClearColor(0x000000, 0)

    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.36, 0.1, 0.9)
    composer.addPass(renderPass)
    composer.addPass(bloomPass)

    const board = new THREE.Group()
    board.rotation.set(DEFAULT_ROTATION.x, DEFAULT_ROTATION.y, DEFAULT_ROTATION.z)
    board.position.set(0.45, -0.05, 0)
    scene.add(board)

    const boardTexture = createBoardTexture()
    const boardBumpTexture = createBoardMicroTexture(91827, 120, 17)
    const boardRoughnessTexture = createBoardMicroTexture(31415, 238, 17)
    const boardMaterial = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      map: boardTexture,
      bumpMap: boardBumpTexture,
      bumpScale: 0.016,
      roughnessMap: boardRoughnessTexture,
      metalness: 0.08,
      roughness: 1,
      clearcoat: 0.02,
      clearcoatRoughness: 1,
    })
    const sideMaterial = new THREE.MeshStandardMaterial({
      color: '#151d20',
      metalness: 0.06,
      roughness: 0.96,
    })
    const boardGeometry = createRoundedGeometry(BOARD_WIDTH, BOARD_HEIGHT, 0.42, 0.34)
    const boardBase = new THREE.Mesh(boardGeometry, boardMaterial)
    boardBase.position.z = 0
    board.add(boardBase)

    const sideGeometry = createRoundedGeometry(BOARD_WIDTH + 0.08, BOARD_HEIGHT + 0.08, 0.44, 0.34)
    const boardSide = new THREE.Mesh(sideGeometry, sideMaterial)
    boardSide.position.z = -0.36
    board.add(boardSide)

    const underGeometry = createRoundedGeometry(BOARD_WIDTH - 0.26, BOARD_HEIGHT - 0.16, 0.36, 0.16)
    const underLayer = new THREE.Mesh(
      underGeometry,
      new THREE.MeshStandardMaterial({ color: '#080d0f', metalness: 0.04, roughness: 0.98 }),
    )
    underLayer.position.set(0.03, -0.07, -0.58)
    board.add(underLayer)

    const edge = createRoundedOutline(BOARD_WIDTH - 0.12, BOARD_HEIGHT - 0.12, 0.39, 0.43, CYAN)
    board.add(edge)

    const lowerEdge = createRoundedOutline(
      BOARD_WIDTH + 0.015,
      BOARD_HEIGHT + 0.015,
      0.42,
      -0.415,
      CYAN,
    )
    ;(lowerEdge.material as THREE.LineBasicMaterial).opacity = 0.42
    board.add(lowerEdge)

    const insetEdge = createRoundedOutline(
      BOARD_WIDTH - 0.48,
      BOARD_HEIGHT - 0.48,
      0.3,
      0.44,
      new THREE.Color('#35515d'),
    )
    ;(insetEdge.material as THREE.LineBasicMaterial).opacity = 0.38
    board.add(insetEdge)

    const panelMaterial = new THREE.LineBasicMaterial({
      color: '#263842',
      transparent: true,
      opacity: 0.38,
    })
    const panelDefinitions = [
      { x: -4.85, y: 2.75, w: 1.0, h: 0.45 },
      { x: 4.95, y: -2.8, w: 1.05, h: 0.45 },
      { x: -0.2, y: 3.1, w: 2.2, h: 0.25 },
    ]
    panelDefinitions.forEach(({ x, y, w, h }) => {
      const points = [
        new THREE.Vector3(x - w / 2, y - h / 2, 0.455),
        new THREE.Vector3(x + w / 2, y - h / 2, 0.455),
        new THREE.Vector3(x + w / 2, y + h / 2, 0.455),
        new THREE.Vector3(x - w / 2, y + h / 2, 0.455),
      ]
      board.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points), panelMaterial))
    })

    const contactGeometry = new THREE.CylinderGeometry(0.035, 0.035, 0.018, 12)
    contactGeometry.rotateX(Math.PI / 2)
    const contactMaterial = new THREE.MeshStandardMaterial({
      color: '#26363c',
      metalness: 0.08,
      roughness: 0.92,
    })
    const contactPositions = [
      [-5.45, 2.72],
      [-5.18, 2.72],
      [-4.91, 2.72],
      [-5.45, 2.48],
      [-5.18, 2.48],
      [5.45, -2.62],
      [5.18, -2.62],
      [4.91, -2.62],
      [5.45, -2.86],
      [5.18, -2.86],
      [-5.75, -2.65],
      [-5.52, -2.82],
      [5.72, 2.72],
      [5.48, 2.88],
    ]
    contactPositions.forEach(([x, y]) => {
      const contact = new THREE.Mesh(contactGeometry, contactMaterial)
      contact.position.set(x, y, 0.47)
      board.add(contact)
    })

    const ambient = new THREE.AmbientLight('#e0e7e8', 1.85)
    scene.add(ambient)
    const ambientDepth = new THREE.HemisphereLight('#d6e2e4', '#06090b', 0.55)
    scene.add(ambientDepth)

    const labels: LabelRecord[] = []
    const interactives: InteractiveRecord[] = []
    const labelAnchors = new Map<string, THREE.Object3D>()
    const pathGeometries: THREE.BufferGeometry[] = []
    const skillPathMaterials: THREE.LineDashedMaterial[] = []

    const careerPoints = [
      new THREE.Vector3(-6.05, -2.05, 0.54),
      ...milestones.flatMap((milestone, index) => {
        const [x, y, z] = milestone.position
        if (index === 0)
          return [new THREE.Vector3(x - 0.65, y - 0.5, z), new THREE.Vector3(x, y, z)]
        return [new THREE.Vector3(x - 0.7, y - 0.18, z), new THREE.Vector3(x, y, z)]
      }),
    ]
    const careerCurve = new THREE.CatmullRomCurve3(careerPoints, false, 'centripetal', 0.1)
    const careerGeometry = new THREE.TubeGeometry(careerCurve, 220, 0.019, 8, false)
    const careerColors = new Float32Array(careerGeometry.attributes.position.count * 3)
    const careerPosition = careerGeometry.attributes.position
    const transitionStart = milestones.at(-2)!.position[0]
    const transitionEnd = milestones.at(-1)!.position[0]
    const pathColor = new THREE.Color()
    for (let index = 0; index < careerPosition.count; index += 1) {
      const progress = THREE.MathUtils.smoothstep(
        careerPosition.getX(index),
        transitionStart,
        transitionEnd,
      )
      pathColor.copy(CYAN).lerp(LIME, progress).multiplyScalar(1.35)
      pathColor.toArray(careerColors, index * 3)
    }
    careerGeometry.setAttribute('color', new THREE.BufferAttribute(careerColors, 3))
    const careerMaterial = new THREE.MeshBasicMaterial({
      color: '#ffffff',
      vertexColors: true,
      toneMapped: false,
    })
    const careerPath = new THREE.Mesh(careerGeometry, careerMaterial)
    careerPath.castShadow = false
    board.add(careerPath)
    pathGeometries.push(careerGeometry)
    const careerIndexCount = careerGeometry.index?.count ?? 0
    if (!reducedMotion.matches) careerGeometry.setDrawRange(0, 0)

    const ringGeometry = new THREE.TorusGeometry(0.22, 0.018, 8, 48)
    const centerGeometry = new THREE.CylinderGeometry(0.055, 0.055, 0.035, 24)
    centerGeometry.rotateX(Math.PI / 2)
    milestones.forEach((milestone) => {
      const color = milestone.current ? LIME : CYAN
      const ringMaterial = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: milestone.current ? 1.35 : 1.15,
        metalness: 0,
        roughness: 0.82,
        toneMapped: false,
      })
      const node = new THREE.Group()
      node.position.fromArray(milestone.position)
      node.userData.id = milestone.id
      node.userData.kind = 'milestone'
      node.userData.baseEmissive = milestone.current ? 1.35 : 1.15
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      const center = new THREE.Mesh(centerGeometry, ringMaterial)
      center.position.z = 0.015
      node.add(ring, center)

      const hitGeometry = new THREE.CircleGeometry(0.35, 24)
      const hitMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
      })
      const hitTarget = new THREE.Mesh(hitGeometry, hitMaterial)
      hitTarget.position.z = 0.03
      hitTarget.userData.id = milestone.id
      hitTarget.userData.kind = 'milestone'
      node.add(hitTarget)
      board.add(node)
      interactives.push({ id: milestone.id, mesh: node, baseScale: 1, materials: [ringMaterial] })

      const anchor = new THREE.Object3D()
      anchor.position.set(
        milestone.position[0],
        milestone.position[1] + 0.52,
        milestone.position[2] + 0.03,
      )
      board.add(anchor)
      labelAnchors.set(milestone.id, anchor)
      const label = makeLabel(
        overlayRoot,
        'milestone',
        milestone.id,
        milestone.year,
        milestone.role,
        (id) => onSelectRef.current(id),
      )
      if (milestone.current) label.classList.add('is-current')
      labels.push({ element: label, anchor, priority: 2, width: 132, height: 62 })
    })

    const chipGeometry = createRoundedGeometry(1.28, 1.12, 0.16, 0.025, 0.012, 0.018)
    const tileShadowTexture = createTileShadowTexture()
    const iconTextures: THREE.Texture[] = []

    skills.forEach((skill, index) => {
      const milestone = milestones.find(({ id }) => id === skill.milestoneId)!
      const colorHex = categoryColor(skill.category)
      const color = new THREE.Color(colorHex)
      const start = new THREE.Vector3(...milestone.position)
      const end = new THREE.Vector3(skill.position[0], skill.position[1], 0.54)
      const direction = end.clone().sub(start)
      const branchPoints = [
        start.clone().add(new THREE.Vector3(0, -0.18, -0.015)),
        start
          .clone()
          .add(direction.clone().multiplyScalar(0.32))
          .add(new THREE.Vector3(0.05, -0.18, -0.015)),
        start
          .clone()
          .add(direction.clone().multiplyScalar(0.68))
          .add(new THREE.Vector3(-0.08, 0.08, -0.015)),
        end.clone().add(new THREE.Vector3(0, 0.65, -0.015)),
      ]
      const branchGeometry = new THREE.BufferGeometry().setFromPoints(branchPoints)
      const branchMaterial = new THREE.LineDashedMaterial({
        color,
        dashSize: 0.075,
        gapSize: 0.06,
        transparent: true,
        opacity: reducedMotion.matches ? 0.8 : 0,
        toneMapped: false,
      })
      const branchLine = new THREE.Line(branchGeometry, branchMaterial)
      branchLine.computeLineDistances()
      board.add(branchLine)
      skillPathMaterials.push(branchMaterial)

      const chip = new THREE.Group()
      chip.position.set(skill.position[0], skill.position[1], 0.56)
      chip.userData.id = skill.id
      chip.userData.kind = 'skill'
      const chipMaterial = new THREE.MeshStandardMaterial({
        color: '#050a0d',
        emissive: '#010304',
        emissiveIntensity: 0.04,
        metalness: 0,
        roughness: 1,
      })
      const chipBase = new THREE.Mesh(chipGeometry, chipMaterial)
      chipBase.userData.id = skill.id
      chipBase.userData.kind = 'skill'
      const shadow = new THREE.Mesh(
        new THREE.PlaneGeometry(1.55, 1.38),
        new THREE.MeshBasicMaterial({
          map: tileShadowTexture,
          transparent: true,
          opacity: 0.72,
          depthWrite: false,
          toneMapped: false,
        }),
      )
      shadow.position.set(0.045, -0.055, -0.075)
      const chipEdge = createRoundedFrame(1.21, 1.05, 0.14, 0.045, color)
      const chipEdgeMaterial = chipEdge.material as THREE.MeshBasicMaterial

      const texture = createIconTexture(skill.mark, skill.name, colorHex)
      iconTextures.push(texture)
      const iconMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        toneMapped: true,
      })
      const icon = new THREE.Mesh(new THREE.PlaneGeometry(0.96, 0.96), iconMaterial)
      icon.position.set(0, 0, 0.05)
      chip.add(shadow, chipBase, chipEdge, icon)
      board.add(chip)
      interactives.push({
        id: skill.id,
        mesh: chip,
        baseScale: 1,
        materials: [],
        accentMaterials: [chipEdgeMaterial],
      })

      const anchor = new THREE.Object3D()
      anchor.position.set(skill.position[0], skill.position[1], 0.63)
      board.add(anchor)
      labelAnchors.set(skill.id, anchor)
      const label = makeLabel(overlayRoot, 'skill', skill.id, '', skill.name, (id) =>
        onSelectRef.current(id),
      )
      labels.push({ element: label, anchor, priority: 1, width: 1, height: 1 })

      branchLine.userData.revealDelay = 0.3 + index * 0.08
    })

    let targetRotationX = DEFAULT_ROTATION.x
    let targetRotationY = DEFAULT_ROTATION.y
    let targetRotationZ = DEFAULT_ROTATION.z
    let velocityX = 0
    let velocityY = 0
    let targetCameraZ = 14.7
    let hoveredId: string | null = null
    let focusedIndex = -1
    let pointerMoved = false
    let pinchDistance = 0
    const activePointers = new Map<number, { x: number; y: number }>()
    const raycaster = new THREE.Raycaster()
    const pointerNdc = new THREE.Vector2()

    function setPointerNdc(clientX: number, clientY: number) {
      const rect = canvas.getBoundingClientRect()
      pointerNdc.set(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1,
      )
    }

    function hitTest(clientX: number, clientY: number) {
      setPointerNdc(clientX, clientY)
      raycaster.setFromCamera(pointerNdc, camera)
      const hits = raycaster.intersectObjects(
        interactives.map(({ mesh }) => mesh),
        true,
      )
      return hits.find((hit) => hit.object.userData.id)?.object.userData.id as string | undefined
    }

    function onPointerDown(event: PointerEvent) {
      canvas.setPointerCapture(event.pointerId)
      activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
      pointerMoved = false
      if (activePointers.size === 2) {
        const [a, b] = [...activePointers.values()]
        pinchDistance = Math.hypot(a.x - b.x, a.y - b.y)
      }
      canvas.classList.add('is-grabbing')
    }

    function onPointerMove(event: PointerEvent) {
      const previous = activePointers.get(event.pointerId)
      if (!previous) {
        const id = hitTest(event.clientX, event.clientY)
        hoveredId = id ?? null
        canvas.classList.toggle('is-hovering', Boolean(id))
        return
      }

      const dx = event.clientX - previous.x
      const dy = event.clientY - previous.y
      activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
      if (Math.abs(dx) + Math.abs(dy) > 2) pointerMoved = true

      if (activePointers.size === 2) {
        const [a, b] = [...activePointers.values()]
        const distance = Math.hypot(a.x - b.x, a.y - b.y)
        if (pinchDistance)
          targetCameraZ = THREE.MathUtils.clamp(
            targetCameraZ - (distance - pinchDistance) * 0.018,
            10.2,
            19,
          )
        pinchDistance = distance
        return
      }

      velocityY = dx * ROTATION_SENSITIVITY
      velocityX = dy * ROTATION_SENSITIVITY
      targetRotationY = THREE.MathUtils.clamp(
        targetRotationY + velocityY,
        ROTATION_LIMITS.minY,
        ROTATION_LIMITS.maxY,
      )
      targetRotationX = THREE.MathUtils.clamp(
        targetRotationX + velocityX,
        ROTATION_LIMITS.minX,
        ROTATION_LIMITS.maxX,
      )
    }

    function onPointerUp(event: PointerEvent) {
      const wasSinglePointer = activePointers.size === 1
      activePointers.delete(event.pointerId)
      if (!activePointers.size) canvas.classList.remove('is-grabbing')
      if (wasSinglePointer && !pointerMoved) {
        const id = hitTest(event.clientX, event.clientY)
        if (id) onSelectRef.current(id)
      }
      pinchDistance = 0
    }

    function onWheel(event: WheelEvent) {
      event.preventDefault()
      targetCameraZ = THREE.MathUtils.clamp(targetCameraZ + event.deltaY * 0.008, 10.2, 19)
    }

    function focusInteractive(index: number) {
      focusedIndex = (index + interactives.length) % interactives.length
      const record = interactives[focusedIndex]
      const label = labels.find(({ element }) => element.dataset.id === record.id)
      label?.element.focus({ preventScroll: true })
      hoveredId = record.id
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        focusInteractive(focusedIndex + 1)
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        focusInteractive(focusedIndex - 1)
      } else if ((event.key === 'Enter' || event.key === ' ') && focusedIndex >= 0) {
        event.preventDefault()
        onSelectRef.current(interactives[focusedIndex].id)
      } else if (event.key === 'Escape') {
        onSelectRef.current(null)
      }
    }

    resetRef.current = () => {
      targetRotationX = DEFAULT_ROTATION.x
      targetRotationY = DEFAULT_ROTATION.y
      targetRotationZ = DEFAULT_ROTATION.z
      targetCameraZ = 14.7
      velocityX = 0
      velocityY = 0
    }
    focusFirstRef.current = () => {
      canvas.focus({ preventScroll: true })
      focusInteractive(0)
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointercancel', onPointerUp)
    canvas.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('keydown', onKeyDown)

    const boardNormal = new THREE.Vector3()
    const cameraDirection = new THREE.Vector3()
    const projected = new THREE.Vector3()
    const worldPosition = new THREE.Vector3()
    const worldQuaternion = new THREE.Quaternion()
    const localNormal = new THREE.Vector3(0, 0, 1)
    let width = 1
    let height = 1

    function resize() {
      const rect = container.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 720 ? 1.35 : 1.8))
      renderer.setSize(width, height, false)
      composer.setSize(width, height)
      bloomPass.resolution.set(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    function updateLabels() {
      board.getWorldQuaternion(worldQuaternion)
      boardNormal.copy(localNormal).applyQuaternion(worldQuaternion)
      const placed: { left: number; right: number; top: number; bottom: number }[] = []

      labels
        .slice()
        .sort((a, b) => b.priority - a.priority)
        .forEach((label) => {
          label.anchor.getWorldPosition(worldPosition)
          cameraDirection.copy(camera.position).sub(worldPosition).normalize()
          projected.copy(worldPosition).project(camera)
          const x = (projected.x * 0.5 + 0.5) * width
          const y = (-projected.y * 0.5 + 0.5) * height
          const visible =
            projected.z > -1 &&
            projected.z < 1 &&
            projected.x > -1.1 &&
            projected.x < 1.1 &&
            projected.y > -1.1 &&
            projected.y < 1.1 &&
            boardNormal.dot(cameraDirection) > 0.05
          const bounds = {
            left: x - label.width / 2,
            right: x + label.width / 2,
            top: y - label.height / 2,
            bottom: y + label.height / 2,
          }
          const overlaps = placed.some(
            (other) =>
              !(
                bounds.right < other.left ||
                bounds.left > other.right ||
                bounds.bottom < other.top ||
                bounds.top > other.bottom
              ),
          )
          label.element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
          label.element.classList.toggle('is-hidden', !visible || overlaps)
          label.element.classList.toggle(
            'is-selected',
            label.element.dataset.id === selectedRef.current,
          )
          if (visible && !overlaps) placed.push(bounds)
        })
    }

    const clock = new THREE.Clock()
    let animationFrame = 0
    function animate() {
      const delta = Math.min(clock.getDelta(), 0.05)
      const elapsed = clock.elapsedTime
      const motionAllowed = !reducedMotion.matches

      if (!activePointers.size && motionAllowed) {
        targetRotationY = THREE.MathUtils.clamp(
          targetRotationY + velocityY,
          ROTATION_LIMITS.minY,
          ROTATION_LIMITS.maxY,
        )
        targetRotationX = THREE.MathUtils.clamp(
          targetRotationX + velocityX,
          ROTATION_LIMITS.minX,
          ROTATION_LIMITS.maxX,
        )
        velocityX *= 0.92
        velocityY *= 0.92
      }
      board.rotation.x = THREE.MathUtils.lerp(board.rotation.x, targetRotationX, 0.1)
      board.rotation.y = THREE.MathUtils.lerp(board.rotation.y, targetRotationY, 0.1)
      board.rotation.z = THREE.MathUtils.lerp(board.rotation.z, targetRotationZ, 0.1)
      board.position.y = -0.05 + (motionAllowed ? Math.sin(elapsed * 0.42) * 0.035 : 0)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCameraZ, 0.12)

      if (motionAllowed) {
        const reveal = THREE.MathUtils.clamp(elapsed / 2.4, 0, 1)
        careerGeometry.setDrawRange(0, Math.floor(careerIndexCount * reveal))
        skillPathMaterials.forEach((material, index) => {
          material.opacity = THREE.MathUtils.clamp((elapsed - 1.55 - index * 0.08) * 1.4, 0, 0.82)
        })
      }

      interactives.forEach((record) => {
        const active = record.id === hoveredId || record.id === selectedRef.current
        const desiredScale = record.baseScale * (active ? 1.09 : 1)
        record.mesh.scale.lerp(
          new THREE.Vector3(desiredScale, desiredScale, desiredScale),
          motionAllowed ? 0.13 : 1,
        )
        record.materials.forEach((material) => {
          if ('emissiveIntensity' in material) {
            const emissiveMaterial = material as THREE.MeshStandardMaterial
            const baseline = (record.mesh.userData.baseEmissive as number | undefined) ?? 1.15
            emissiveMaterial.emissiveIntensity = THREE.MathUtils.lerp(
              emissiveMaterial.emissiveIntensity,
              active ? baseline + 0.4 : baseline,
              motionAllowed ? 0.12 : 1,
            )
          }
        })
        record.accentMaterials?.forEach((material) => {
          material.opacity = THREE.MathUtils.lerp(
            material.opacity,
            active ? 1 : 0.78,
            motionAllowed ? 0.14 : 1,
          )
        })
      })

      updateLabels()
      composer.render(delta)
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointercancel', onPointerUp)
      canvas.removeEventListener('wheel', onWheel)
      container.removeEventListener('keydown', onKeyDown)
      labels.forEach(({ element }) => element.remove())
      boardTexture.dispose()
      boardBumpTexture.dispose()
      boardRoughnessTexture.dispose()
      tileShadowTexture.dispose()
      iconTextures.forEach((texture) => texture.dispose())
      scene.traverse((object) => {
        if (!(
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line ||
          object instanceof THREE.LineLoop
        ))
          return
        object.geometry.dispose()
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach((material) => material.dispose())
      })
      composer.dispose()
      renderer.dispose()
      resetRef.current = () => undefined
      focusFirstRef.current = () => undefined
    }
  }, [])

  return (
    <div ref={containerRef} className="resume-scene">
      <canvas
        ref={canvasRef}
        className="resume-canvas"
        tabIndex={0}
        aria-label="Interactive circuit board resume. Use arrow keys to move between nodes and Enter to open details."
      />
      <div ref={overlayRef} className="scene-labels" />
    </div>
  )
})
