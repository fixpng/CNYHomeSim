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
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 14px;
  box-shadow: var(--shadow-card);
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--text-primary);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.diary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
}

.diary-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-neon-gold);
  margin: 0;
  letter-spacing: 0.5px;
}

.btn-clear {
  padding: 3px 10px;
  font-size: 11px;
  background: var(--bg-lighter);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  color: var(--text-muted);
  transition: all 0.2s;
  font-family: inherit;
}

.btn-clear:hover {
  background: var(--bg-hover);
  border-color: var(--color-danger);
  color: var(--color-danger);
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
  padding: 30px 20px;
  color: var(--text-muted);
  font-size: 13px;
}

.diary-hint {
  font-size: 11px;
  margin-top: 8px;
  opacity: 0.6;
}

.diary-entries {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.diary-entry {
  padding: 10px;
  background: var(--bg-light);
  border-radius: 4px;
  border-left: 2px solid var(--color-primary);
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease;
}

.diary-entry.entry-new {
  background: var(--color-warning-bg);
  border-left-color: var(--color-neon-gold);
  animation: highlight 0.6s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-8px);
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
    background: rgba(255, 206, 69, 0.15);
  }
}

.entry-time {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: 6px;
}

.time-icon {
  font-size: 12px;
}

.entry-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.entry-action {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.action-icon {
  font-size: 18px;
}

.entry-thoughts {
  font-size: 12px;
  color: var(--text-secondary);
  font-style: italic;
  padding: 6px 8px;
  background: var(--bg-lighter);
  border-radius: 3px;
  margin-top: 4px;
}

.entry-changes {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}

.change-item {
  padding: 2px 6px;
  background: var(--bg-lighter);
  border-radius: 3px;
  font-size: 11px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.change-positive {
  color: var(--color-health);
}

.change-negative {
  color: var(--color-danger);
}

/* 滚动条 */
.diary-content::-webkit-scrollbar {
  width: 4px;
}

.diary-content::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
  border-radius: 2px;
}

.diary-content::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border-radius: 2px;
}

.diary-content::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover);
}
</style>
