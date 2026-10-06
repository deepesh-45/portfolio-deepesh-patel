import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface NamaskaramAvatarProps {
  theme: 'dark' | 'light'
}

export const NamaskaramAvatar = ({ theme }: NamaskaramAvatarProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth || 800
    const height = container.clientHeight || 560

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0.35, 5.2)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    container.appendChild(renderer.domElement)

    // Lighting setup - warm, studio portrait editorial lighting
    const ambientLight = new THREE.AmbientLight(theme === 'dark' ? 0xeae0d5 : 0xfaf7f2, theme === 'dark' ? 1.6 : 1.4)
    scene.add(ambientLight)

    const mainKeyLight = new THREE.DirectionalLight(0xfff6eb, theme === 'dark' ? 2.5 : 2.2)
    mainKeyLight.position.set(4, 5, 4)
    mainKeyLight.castShadow = true
    scene.add(mainKeyLight)

    const fillLight = new THREE.DirectionalLight(0xbab0a2, 1.0)
    fillLight.position.set(-4, 2, 2)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0xe8ded1, 1.8)
    rimLight.position.set(0, 4, -4)
    scene.add(rimLight)

    // Group holding the entire character
    const avatarGroup = new THREE.Group()
    scene.add(avatarGroup)

    // Materials using warm taupe, oat, and rich tactile tones
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xd9cbbd,
      roughness: 0.45,
      metalness: 0.05,
    })

    const clothingMaterial = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x4a4441 : 0x766d66, // Elegant warm taupe kurta/tunic
      roughness: 0.7,
      metalness: 0.1,
    })

    const collarMaterial = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0xdcd5c9 : 0xeee7dc, // Oat linen trim
      roughness: 0.6,
      metalness: 0.05,
    })

    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x221f1e, // Deep espresso charcoal
      roughness: 0.8,
      metalness: 0.05,
    })

    const goldAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xc8aa6e, // Subtle warm gold / brass accent
      roughness: 0.3,
      metalness: 0.7,
    })

    // Head & Face
    const headGeo = new THREE.SphereGeometry(0.72, 32, 32)
    headGeo.scale(1, 1.15, 0.95)
    const head = new THREE.Mesh(headGeo, skinMaterial)
    head.position.y = 1.35
    head.castShadow = true
    avatarGroup.add(head)

    // Hair - modern stylized crop
    const hairGeo = new THREE.SphereGeometry(0.75, 32, 32)
    hairGeo.scale(1.04, 1.08, 1.02)
    const hair = new THREE.Mesh(hairGeo, hairMaterial)
    hair.position.set(0, 1.48, -0.06)
    avatarGroup.add(hair)

    // Hair quiff / top volume
    const hairTuftGeo = new THREE.CylinderGeometry(0.45, 0.72, 0.5, 16)
    const hairTuft = new THREE.Mesh(hairTuftGeo, hairMaterial)
    hairTuft.position.set(0, 2.05, 0.08)
    hairTuft.rotation.x = 0.2
    avatarGroup.add(hairTuft)

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.3, 0.36, 0.45, 24)
    const neck = new THREE.Mesh(neckGeo, skinMaterial)
    neck.position.y = 0.65
    avatarGroup.add(neck)

    // Torso / Shoulders with refined tunic
    const torsoGeo = new THREE.CylinderGeometry(0.68, 0.82, 1.5, 24)
    torsoGeo.scale(1.3, 1, 0.8)
    const torso = new THREE.Mesh(torsoGeo, clothingMaterial)
    torso.position.y = -0.3
    torso.castShadow = true
    avatarGroup.add(torso)

    // Nehru / Mandarin collar
    const collarGeo = new THREE.TorusGeometry(0.42, 0.08, 16, 32)
    collarGeo.scale(1.1, 0.8, 1)
    const collar = new THREE.Mesh(collarGeo, collarMaterial)
    collar.rotation.x = Math.PI / 2
    collar.position.set(0, 0.45, 0.02)
    avatarGroup.add(collar)

    // Shoulders & Upper Arms (Posed bending inward for Namaskaram)
    const leftArmGroup = new THREE.Group()
    leftArmGroup.position.set(-0.85, 0.25, 0)

    const rightArmGroup = new THREE.Group()
    rightArmGroup.position.set(0.85, 0.25, 0)

    // Left Shoulder/Upper arm
    const upperArmGeo = new THREE.CylinderGeometry(0.24, 0.2, 0.85, 20)
    const leftUpperArm = new THREE.Mesh(upperArmGeo, clothingMaterial)
    leftUpperArm.position.set(0.2, -0.35, 0.2)
    leftUpperArm.rotation.set(0.4, 0, -0.55)
    leftArmGroup.add(leftUpperArm)

    // Right Shoulder/Upper arm
    const rightUpperArm = new THREE.Mesh(upperArmGeo, clothingMaterial)
    rightUpperArm.position.set(-0.2, -0.35, 0.2)
    rightUpperArm.rotation.set(0.4, 0, 0.55)
    rightArmGroup.add(rightUpperArm)

    // Forearms angled forward toward chest center
    const forearmGeo = new THREE.CylinderGeometry(0.18, 0.15, 0.8, 20)
    const leftForearm = new THREE.Mesh(forearmGeo, clothingMaterial)
    leftForearm.position.set(0.48, -0.65, 0.55)
    leftForearm.rotation.set(-0.7, 0.45, -0.7)
    leftArmGroup.add(leftForearm)

    const rightForearm = new THREE.Mesh(forearmGeo, clothingMaterial)
    rightForearm.position.set(-0.48, -0.65, 0.55)
    rightForearm.rotation.set(-0.7, -0.45, 0.7)
    rightArmGroup.add(rightForearm)

    avatarGroup.add(leftArmGroup)
    avatarGroup.add(rightArmGroup)

    // NAMASKARAM / ANJALI MUDRA HANDS
    const handsGroup = new THREE.Group()
    handsGroup.position.set(0, -0.05, 0.82)

    // Left palm & fingers
    const palmGeo = new THREE.BoxGeometry(0.18, 0.38, 0.06)
    const leftPalm = new THREE.Mesh(palmGeo, skinMaterial)
    leftPalm.position.set(-0.04, 0, 0)
    leftPalm.rotation.z = -0.08
    handsGroup.add(leftPalm)

    // Right palm & fingers
    const rightPalm = new THREE.Mesh(palmGeo, skinMaterial)
    rightPalm.position.set(0.04, 0, 0)
    rightPalm.rotation.z = 0.08
    handsGroup.add(rightPalm)

    // Golden kada / bracelets on wrists
    const braceletGeo = new THREE.TorusGeometry(0.16, 0.03, 16, 24)
    const leftKada = new THREE.Mesh(braceletGeo, goldAccentMaterial)
    leftKada.rotation.x = Math.PI / 2
    leftKada.position.set(-0.06, -0.22, 0)
    handsGroup.add(leftKada)

    const rightKada = new THREE.Mesh(braceletGeo, goldAccentMaterial)
    rightKada.rotation.x = Math.PI / 2
    rightKada.position.set(0.06, -0.22, 0)
    handsGroup.add(rightKada)

    avatarGroup.add(handsGroup)

    // Floating pedestal ring below avatar
    const ringGeo = new THREE.TorusGeometry(1.4, 0.035, 16, 64)
    const ring = new THREE.Mesh(ringGeo, goldAccentMaterial)
    ring.rotation.x = Math.PI / 2 + 0.15
    ring.position.y = -1.2
    avatarGroup.add(ring)

    // Outer ambient orbital particles
    const particleCount = 16
    interface ParticleData {
      angle: number
      radius: number
      speed: number
      yBase: number
    }
    const particles: THREE.Mesh[] = []
    const particleMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0xc4b8aa : 0xe2dacd,
      roughness: 0.3,
      metalness: 0.2,
    })

    for (let i = 0; i < particleCount; i++) {
      const pGeo = new THREE.SphereGeometry(0.045 + Math.random() * 0.035, 16, 16)
      const pMesh = new THREE.Mesh(pGeo, particleMat)
      const angle = (i / particleCount) * Math.PI * 2
      const radius = 1.6 + Math.random() * 0.8
      pMesh.position.set(
        Math.cos(angle) * radius,
        -0.6 + Math.random() * 2.2,
        Math.sin(angle) * radius
      )
      const pData: ParticleData = {
        angle,
        radius,
        speed: 0.004 + Math.random() * 0.005,
        yBase: pMesh.position.y,
      }
      pMesh.userData = pData
      avatarGroup.add(pMesh)
      particles.push(pMesh)
    }

    // Mouse tracking and subtle interactive parallax
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      targetX = ((x / (rect.width || window.innerWidth)) - 0.5) * 2
      targetY = ((y / (rect.height || window.innerHeight)) - 0.5) * 2
    }

    window.addEventListener('mousemove', onMouseMove)

    // Resize handler
    const onResize = () => {
      if (!container) return
      const newW = container.clientWidth || 800
      const newH = container.clientHeight || 560
      camera.aspect = newW / newH
      camera.updateProjectionMatrix()
      renderer.setSize(newW, newH)
    }

    window.addEventListener('resize', onResize)

    // Animation Loop
    let clock = new THREE.Clock()
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05

      // Gentle breathing float & subtle Namaskaram bow tilt
      avatarGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.06
      avatarGroup.rotation.y = mouseX * 0.35 + Math.sin(elapsedTime * 0.6) * 0.04
      avatarGroup.rotation.x = mouseY * 0.18 + 0.05 + Math.sin(elapsedTime * 1.1) * 0.02 // respectful forward bow

      // Hand subtle breathing pulse
      handsGroup.position.z = 0.82 + Math.sin(elapsedTime * 1.8) * 0.015

      // Orbiting particles
      particles.forEach((p) => {
        const data = p.userData as ParticleData
        data.angle += data.speed
        p.position.x = Math.cos(data.angle) * data.radius
        p.position.z = Math.sin(data.angle) * data.radius
        p.position.y = data.yBase + Math.sin(elapsedTime * 2.0 + data.angle) * 0.12
      })

      ring.rotation.z = elapsedTime * 0.15

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [theme])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
      }}
    />
  )
}

export default NamaskaramAvatar
