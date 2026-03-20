<template>
  <canvas ref="canvas" class="particle-bg"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let ctx = null
let animationId = null
let particles = []
let width = 0
let height = 0

const PARTICLE_COUNT = 35
const DARK_COLOR = { r: 0, g: 255, b: 252 }   // #00fffc
const LIGHT_COLOR = { r: 26, g: 115, b: 232 }  // #1a73e8

function isDarkTheme() {
  return document.documentElement.getAttribute('data-theme') !== 'light'
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function createParticle(randomY = false) {
  return {
    x: Math.random() * width,
    y: randomY ? Math.random() * height : height + Math.random() * 20,
    radius: 1 + Math.random() * 2,
    speed: 0.2 + Math.random() * 0.5,
    drift: (Math.random() - 0.5) * 0.3,
    opacity: 0,
    targetOpacity: 0,
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.005 + Math.random() * 0.015,
  }
}

function updateTargetOpacity(p) {
  const dark = isDarkTheme()
  const minO = dark ? 0.1 : 0.05
  const maxO = dark ? 0.4 : 0.1
  p.targetOpacity = minO + Math.random() * (maxO - minO)
}

function initParticles() {
  particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = createParticle(true)
    updateTargetOpacity(p)
    p.opacity = p.targetOpacity
    particles.push(p)
  }
}

function resize() {
  if (!canvas.value) return
  width = window.innerWidth
  height = window.innerHeight
  canvas.value.width = width
  canvas.value.height = height
}

function draw() {
  if (!ctx) return

  ctx.clearRect(0, 0, width, height)

  const dark = isDarkTheme()
  const color = dark ? DARK_COLOR : LIGHT_COLOR

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]

    // Move upward
    p.y -= p.speed
    p.x += p.drift

    // Twinkle: modulate opacity
    p.twinklePhase += p.twinkleSpeed
    const twinkle = Math.sin(p.twinklePhase)
    const baseOpacity = p.targetOpacity
    const opacityVariation = baseOpacity * 0.35
    p.opacity = baseOpacity + twinkle * opacityVariation

    // Recycle particle when it goes off-screen
    if (p.y < -10 || p.x < -10 || p.x > width + 10) {
      particles[i] = createParticle(false)
      updateTargetOpacity(particles[i])
      continue
    }

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${p.opacity.toFixed(3)})`
    ctx.fill()
  }

  animationId = requestAnimationFrame(draw)
}

onMounted(() => {
  if (prefersReducedMotion()) return

  ctx = canvas.value?.getContext('2d')
  if (!ctx) return

  resize()
  initParticles()
  animationId = requestAnimationFrame(draw)
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  window.removeEventListener('resize', resize)
  particles = []
  ctx = null
})
</script>

<style scoped>
.particle-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}
</style>
