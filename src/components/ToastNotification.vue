<template>
  <div class="toast-container">
    <transition-group name="toast">
      <div v-for="n in notifications" :key="n.id" class="toast-item" :class="'toast-' + (n.type || 'info')" @click="dismiss(n.id)">
        <span v-if="n.icon" class="toast-icon">{{ n.icon }}</span>
        <div class="toast-content">
          <div v-if="n.title" class="toast-title">{{ n.title }}</div>
          <div class="toast-message">{{ n.message }}</div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
const props = defineProps({
  notifications: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['dismiss'])

function dismiss(id) {
  emit('dismiss', id)
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  pointer-events: none;
  width: 90%;
  max-width: 420px;
}

.toast-item {
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 8px;
  background: rgba(15, 15, 25, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 255, 252, 0.15);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5), 0 0 12px rgba(0, 255, 252, 0.08);
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.toast-item:hover {
  border-color: rgba(0, 255, 252, 0.35);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 255, 252, 0.15);
}

/* Type: info (cyan) */
.toast-info {
  border-color: rgba(0, 255, 252, 0.3);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5), 0 0 12px rgba(0, 255, 252, 0.1);
}

.toast-info .toast-title {
  color: #00fffc;
}

/* Type: success (green) */
.toast-success {
  border-color: rgba(0, 255, 136, 0.3);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5), 0 0 12px rgba(0, 255, 136, 0.1);
}

.toast-success .toast-title {
  color: #00ff88;
}

/* Type: error (red) */
.toast-error {
  border-color: rgba(255, 68, 68, 0.3);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5), 0 0 12px rgba(255, 68, 68, 0.1);
}

.toast-error .toast-title {
  color: #ff4444;
}

/* Type: achievement (gold) */
.toast-achievement {
  border-color: rgba(255, 206, 69, 0.5);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 206, 69, 0.15);
  padding: 18px 22px;
}

.toast-achievement .toast-icon {
  font-size: 32px;
  line-height: 1;
}

.toast-achievement .toast-title {
  color: #ffce45;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 1px;
}

.toast-achievement .toast-message {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.75);
}

/* Shared styles */
.toast-icon {
  font-size: 22px;
  flex-shrink: 0;
  line-height: 1.2;
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #00fffc;
}

.toast-message {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
  word-break: break-word;
}

/* Transition: slide in from top, fade out */
.toast-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-30px) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
