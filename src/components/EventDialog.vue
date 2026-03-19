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
            <!-- 连续对话选项 -->
            <div v-if="nextChoices && nextChoices.length > 0" class="dialogue-choices">
              <div class="choices-label">选择你的回应：</div>
              <div
                v-for="choice in nextChoices"
                :key="choice.id"
                class="dialogue-choice-item"
                :class="{ disabled: choice.disabled }"
                @click="!choice.disabled && selectDialogueChoice(choice)"
              >
                <div class="choice-text">{{ choice.name }}</div>
                <div v-if="choice.cost" class="choice-cost">💰 {{ choice.cost }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button v-if="!nextChoices || nextChoices.length === 0" class="btn btn-primary" @click="close">知道了</button>
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
  thoughts: String,
  nextChoices: Array // 连续对话的下一轮选项
})

const emit = defineEmits(['close', 'select-choice'])

function close() {
  emit('close')
}

function selectDialogueChoice(choice) {
  emit('select-choice', choice)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-overlay-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: var(--bg-card);
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
  color: var(--text-primary);
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
  border-bottom: 1px solid var(--border-color);
}

.modal-icon {
  font-size: 32px;
}

.modal-title {
  flex: 1;
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.modal-close {
  width: 32px;
  height: 32px;
  border: none;
  background: var(--bg-lighter);
  border-radius: 50%;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-secondary);
}

.modal-close:hover {
  background: var(--bg-progress);
  color: var(--text-primary);
}

.modal-body {
  padding: 20px;
}

.scene-content {
  line-height: 1.8;
}

.scene-text {
  font-size: 16px;
  color: var(--text-tertiary);
  margin: 0 0 16px 0;
  white-space: pre-line;
}

.thoughts {
  margin-top: 20px;
  padding: 16px;
  background: var(--bg-light);
  border-radius: 8px;
  border-left: 4px solid var(--color-primary);
}

.thoughts-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.thoughts-text {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
  font-style: italic;
  white-space: pre-line;
}

.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--border-color);
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

.dialogue-choices {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid var(--border-color);
}

.choices-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 12px;
}

.dialogue-choice-item {
  padding: 12px 16px;
  margin-bottom: 8px;
  background: var(--bg-light);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.dialogue-choice-item:hover:not(.disabled) {
  background: #e8eaf6;
  border-color: var(--color-primary);
  transform: translateX(4px);
}

.dialogue-choice-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--bg-lighter);
}

.choice-text {
  font-size: 15px;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.choice-cost {
  font-size: 12px;
  color: var(--color-danger);
  font-weight: 500;
}
</style>
