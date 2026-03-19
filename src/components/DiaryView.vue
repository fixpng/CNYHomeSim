<template>
  <div class="diary-view">
    <div class="diary-header">
      <h3 class="diary-title">📔 春节日记</h3>
      <button v-if="diaryEntries.length > 0" class="btn-clear" @click="clearDiary">清空</button>
    </div>
    <div class="diary-content">
      <div v-if="diaryEntries.length === 0" class="diary-empty">
        <p>还没有记录...</p>
        <p class="diary-hint">你的选择会记录在这里</p>
      </div>
      <div v-else class="diary-entries">
        <div
          v-for="(entry, index) in diaryEntries"
          :key="index"
          class="diary-entry"
          :class="{ 'entry-new': entry.isNew }"
        >
          <div class="entry-time">
            <span class="time-icon">⏰</span>
            <span class="time-text">{{ entry.time }}</span>
          </div>
          <div class="entry-content">
            <div class="entry-action">
              <span class="action-icon">{{ entry.icon }}</span>
              <span class="action-text">{{ entry.action }}</span>
            </div>
            <div v-if="entry.thoughts" class="entry-thoughts">
              💭 {{ entry.thoughts }}
            </div>
            <div v-if="entry.changes" class="entry-changes">
              <span
                v-for="(value, key) in entry.changes"
                :key="key"
                class="change-item"
                :class="getChangeClass(key, value)"
              >
                {{ getChangeLabel(key) }}{{ value > 0 ? '+' : '' }}{{ value }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, nextTick } from 'vue'

const props = defineProps({
  entries: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['clear'])

const diaryEntries = computed(() => props.entries)

// 标记新条目
watch(() => props.entries.length, (newLen, oldLen) => {
  if (newLen > oldLen && newLen > 0) {
    nextTick(() => {
      const lastEntry = props.entries[props.entries.length - 1]
      if (lastEntry) {
        lastEntry.isNew = true
        setTimeout(() => {
          lastEntry.isNew = false
        }, 2000)
      }
    })
  }
})

function getChangeLabel(key) {
  const labels = {
    health: '❤️',
    spirit: '🧠',
    balance: '💰',
    reputation: '⭐'
  }
  return labels[key] || key
}

function getChangeClass(key, value) {
  if (value > 0) return 'change-positive'
  if (value < 0) return 'change-negative'
  return ''
}

function clearDiary() {
  if (confirm('确定要清空日记吗？')) {
    emit('clear')
  }
}
</script>

<style scoped>
.diary-view {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 16px;
  box-shadow: var(--shadow-card);
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--text-primary);
}

.diary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--bg-lighter);
}

.diary-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.btn-clear {
  padding: 4px 12px;
  font-size: 12px;
  background: var(--bg-lighter);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.btn-clear:hover {
  background: var(--bg-progress);
  color: var(--text-primary);
}

.diary-content {
  flex: 1;
  overflow-y: auto;
  max-height: 400px;
}

@media (min-width: 1024px) {
  .diary-content {
    max-height: calc(100vh - 200px);
  }
}

.diary-empty {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-muted);
}

.diary-hint {
  font-size: 12px;
  margin-top: 8px;
  opacity: 0.7;
}

.diary-entries {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.diary-entry {
  padding: 12px;
  background: var(--bg-light);
  border-radius: 8px;
  border-left: 3px solid var(--color-primary);
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease;
}

.diary-entry.entry-new {
  background: var(--color-warning-bg);
  border-left-color: var(--color-warning-border);
  animation: highlight 0.5s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes highlight {
  0%, 100% {
    background: var(--color-warning-bg);
  }
  50% {
    background: #ffe69c;
  }
}

.entry-time {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.time-icon {
  font-size: 14px;
}

.entry-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.entry-action {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.action-icon {
  font-size: 20px;
}

.entry-thoughts {
  font-size: 13px;
  color: var(--text-secondary);
  font-style: italic;
  padding: 8px;
  background: var(--bg-card);
  border-radius: 6px;
  margin-top: 4px;
}

.entry-changes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.change-item {
  padding: 4px 8px;
  background: var(--bg-card);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.change-positive {
  color: var(--color-health);
}

.change-negative {
  color: var(--color-danger);
}

/* 滚动条样式 */
.diary-content::-webkit-scrollbar {
  width: 6px;
}

.diary-content::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
  border-radius: 3px;
}

.diary-content::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border-radius: 3px;
}

.diary-content::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover);
}
</style>
