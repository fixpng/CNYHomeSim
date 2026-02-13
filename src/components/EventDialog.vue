<template>
  <transition name="modal">
    <div v-if="visible" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <div class="modal-header">
          <span class="modal-icon">{{ icon }}</span>
          <h3 class="modal-title">{{ title }}</h3>
          <button class="modal-close" @click="close">×</button>
        </div>
        <div class="modal-body">
          <div class="scene-content">
            <p class="scene-text">{{ scene }}</p>
            <div v-if="thoughts" class="thoughts">
              <div class="thoughts-label">💭 你的想法：</div>
              <p class="thoughts-text">{{ thoughts }}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="close">知道了</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  visible: Boolean,
  title: String,
  icon: String,
  scene: String,
  thoughts: String
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-icon {
  font-size: 32px;
}

.modal-title {
  flex: 1;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.modal-close {
  width: 32px;
  height: 32px;
  border: none;
  background: #f0f0f0;
  border-radius: 50%;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s;
  color: #666;
}

.modal-close:hover {
  background: #e0e0e0;
  color: #333;
}

.modal-body {
  padding: 20px;
}

.scene-content {
  line-height: 1.8;
}

.scene-text {
  font-size: 16px;
  color: #555;
  margin: 0 0 16px 0;
  white-space: pre-line;
}

.thoughts {
  margin-top: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.thoughts-label {
  font-size: 14px;
  font-weight: 600;
  color: #667eea;
  margin-bottom: 8px;
}

.thoughts-text {
  font-size: 14px;
  color: #666;
  margin: 0;
  font-style: italic;
  white-space: pre-line;
}

.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
