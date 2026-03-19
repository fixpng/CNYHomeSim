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
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.modal-content {
  background: var(--bg-card-solid);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  max-width: 480px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: var(--shadow-modal);
  animation: slideUp 0.3s ease;
  color: var(--text-primary);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(24px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-light);
}

.modal-icon {
  font-size: 28px;
}

.modal-title {
  flex: 1;
  font-size: 17px;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
}

.modal-close {
  width: 28px;
  height: 28px;
  border: 1px solid var(--border-color);
  background: var(--bg-lighter);
  border-radius: 4px;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: var(--bg-hover);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.modal-body {
  padding: 20px;
}

.scene-content {
  line-height: 1.8;
}

.scene-text {
  font-size: 14px;
  color: var(--text-tertiary);
  margin: 0 0 16px 0;
  white-space: pre-line;
}

.thoughts {
  margin-top: 16px;
  padding: 14px;
  background: var(--bg-light);
  border-radius: 6px;
  border-left: 3px solid var(--color-neon-purple);
}

.thoughts-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-neon-purple);
  margin-bottom: 6px;
  letter-spacing: 0.5px;
}

.thoughts-text {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
  font-style: italic;
  white-space: pre-line;
}

.modal-footer {
  padding: 12px 20px;
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
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid var(--border-color);
}

.choices-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 10px;
  letter-spacing: 0.5px;
}

.dialogue-choice-item {
  padding: 10px 14px;
  margin-bottom: 8px;
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.dialogue-choice-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-primary);
  opacity: 0;
  transition: opacity 0.2s;
}

.dialogue-choice-item:hover:not(.disabled) {
  background: var(--bg-hover);
  border-color: var(--color-primary);
  box-shadow: 0 0 12px var(--color-primary-light);
}

.dialogue-choice-item:hover:not(.disabled)::before {
  opacity: 1;
}

.dialogue-choice-item.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: var(--bg-lighter);
}

.choice-text {
  font-size: 14px;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.choice-cost {
  font-size: 11px;
  color: var(--color-danger);
  font-weight: 600;
}
</style>
