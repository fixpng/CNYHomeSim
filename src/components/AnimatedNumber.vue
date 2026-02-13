<template>
  <span>{{ formattedValue }}</span>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 800
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  }
})

const displayValue = ref(props.value)
let animationFrame = null

const formattedValue = computed(() => {
  return props.prefix + displayValue.value + props.suffix
})

function animateValue(start, end, duration) {
  if (start === end) {
    displayValue.value = end
    return
  }
  
  const startTime = performance.now()
  
  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // 使用easeOutCubic缓动函数
    const easeProgress = 1 - Math.pow(1 - progress, 3)
    const current = Math.round(start + (end - start) * easeProgress)
    
    displayValue.value = current
    
    if (progress < 1) {
      animationFrame = requestAnimationFrame(update)
    } else {
      displayValue.value = end
      animationFrame = null
    }
  }
  
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
  animationFrame = requestAnimationFrame(update)
}

watch(() => props.value, (newVal, oldVal) => {
  if (oldVal === undefined) {
    displayValue.value = newVal
    return
  }
  animateValue(oldVal, newVal, props.duration)
}, { immediate: false })

onMounted(() => {
  displayValue.value = props.value
})
</script>

<style scoped>
span {
  display: inline-block;
}
</style>
