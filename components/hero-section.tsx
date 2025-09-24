"use client"

import React from "react"
import type { ReactElement } from "react"
import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin } from "lucide-react"
import * as THREE from "three"

// Simplified 3D Scene Component
const ThreeScene = React.memo(({ mouseX, mouseY }: { mouseX: number; mouseY: number }) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    sphere: THREE.Mesh
    particles: THREE.Points
    animationId: number
  }>()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // Animated sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64)
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.6,
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.scale.setScalar(2)
    scene.add(sphere)

    // Particle field
    const particleCount = 2000
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.015,
      transparent: true,
      opacity: 0.6,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    camera.position.z = 5

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      sphere,
      particles,
      animationId: 0,
    }

    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return

      const { sphere, particles, renderer, scene, camera } = sceneRef.current
      const time = Date.now() * 0.001

      // Rotate objects
      sphere.rotation.x = time * 0.2
      sphere.rotation.y = time * 0.3
      particles.rotation.x = time * 0.05
      particles.rotation.y = time * 0.075

      // Apply mouse influence to camera
      camera.position.x = mouseX * 2
      camera.position.y = -mouseY * 2
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
      sceneRef.current.animationId = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!sceneRef.current) return
      const { camera, renderer } = sceneRef.current

      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)
        sceneRef.current.renderer.dispose()
        if (mountRef.current && sceneRef.current.renderer.domElement) {
          mountRef.current.removeChild(sceneRef.current.renderer.domElement)
        }
      }
    }
  }, [])

  // Update camera position when mouse moves
  useEffect(() => {
    if (sceneRef.current) {
      const { camera } = sceneRef.current
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 2, 0.05)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, -mouseY * 2, 0.05)
    }
  }, [mouseX, mouseY])

  return <div ref={mountRef} className="absolute inset-0 opacity-30" />
})

export function HeroSection(): ReactElement {
  const [step, setStep] = useState(0)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring values for content transforms
  const contentRotateX = useSpring(0, { stiffness: 150, damping: 25 })
  const contentRotateY = useSpring(0, { stiffness: 150, damping: 25 })

  // Raw mouse values for 3D scene (no spring for immediate response)
  const [rawMouse, setRawMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 500)
    const timer2 = setTimeout(() => setStep(2), 1500)
    const timer3 = setTimeout(() => setStep(3), 2500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      const { clientX, clientY } = event
      const { innerWidth, innerHeight } = window

      const centerX = innerWidth / 2
      const centerY = innerHeight / 2

      const x = (clientX - centerX) / centerX
      const y = (clientY - centerY) / centerY

      // Update both spring values for content and raw values for 3D scene
      contentRotateY.set(x * 10)
      contentRotateX.set(-y * 10)

      setRawMouse({ x, y })
    },
    [contentRotateX, contentRotateY],
  )

  const motionStyle = useMemo(
    () => ({
      rotateX: contentRotateX,
      rotateY: contentRotateY,
      transformStyle: "preserve-3d" as const,
      perspective: 1000,
    }),
    [contentRotateX, contentRotateY],
  )

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-background"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Background with direct mouse tracking */}
      <ThreeScene mouseX={rawMouse.x} mouseY={rawMouse.y} />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10" />

      {/* Content with subtle parallax */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
        style={motionStyle}
        transition={{ type: "spring", stiffness: 150, damping: 25 }}
      >
        {/* Name Animation */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Daevik Jain
        </motion.h1>

        {/* Tagline with Typewriter Effect */}
        <motion.div
          className="text-xl md:text-2xl text-muted-foreground mb-8 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {step >= 2 && (
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-cyan-400"
            >
              Quality Driven Engineering
            </motion.span>
          )}
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 30 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="bg-background/50 backdrop-blur-sm border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
              asChild
            >
              <a href="https://linkedin.com/in/daevikjain" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </a>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="bg-background/50 backdrop-blur-sm border-violet-400/50 hover:border-violet-400 hover:bg-violet-400/10 transition-all duration-300"
              asChild
            >
              <a href="https://github.com/daevikjain" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 3 ? 1 : 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-violet-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
