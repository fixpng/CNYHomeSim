<template>
  <div class="transportation-view">
    <div class="card">
      <h2 class="subtitle">{{ isReturning ? '🚄 返程打工' : '🏠 返乡之路' }}</h2>
      <p class="description">
        {{ isReturning ? '春节假期结束了，该回去打工了...' : '终于放假了，准备回家过年！' }}
      </p>
      
      <div class="info-section">
        <div class="info-item">
          <span class="info-label">📍 距离：</span>
          <span class="info-value">{{ state.attributes.distanceType?.name }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">💰 当前余额：</span>
          <span class="info-value money">¥{{ state.stats.balance }}</span>
        </div>
      </div>
      
      <div class="transport-options">
        <h3 class="options-title">🚗 选择交通方式</h3>
        <div v-if="availableTransports.length === 0" class="no-options">
          没有可用的交通方式（余额不足）
        </div>
        <div v-else class="options-list">
          <div
            v-for="transport in availableTransports"
            :key="transport.id"
            class="option-item"
            :class="{ disabled: isTransportFailed(transport.id) }"
            @click="selectTransport(transport)"
          >
            <div class="option-content">
              <div class="option-name">
                <span class="transport-icon">{{ getTransportIcon(transport.id) }}</span>
                {{ transport.name }}
                <span v-if="isTransportFailed(transport.id)" class="failed-tag">（已失败）</span>
              </div>
              <div class="option-details">
                <span class="detail-item">费用：¥{{ transport.cost }}</span>
                <span class="detail-item">健康：{{ transport.health > 0 ? '+' : '' }}{{ transport.health }}</span>
                <span class="detail-item">精神：{{ transport.spirit > 0 ? '+' : '' }}{{ transport.spirit }}</span>
                <span v-if="transport.reputation" class="detail-item">
                  口碑：+{{ transport.reputation }}
                </span>
                <span v-if="transport.successRate < 100" class="detail-item warning">
                  成功率：{{ transport.successRate }}%
                </span>
                <span v-if="transport.delayChance && transport.delayChance > 0" class="detail-item warning">
                  可能延误：{{ transport.delayChance }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showSupportActions" class="support-actions">
        <h3 class="options-title">🆘 没钱了怎么办</h3>
        <p class="support-tip">可以开口一次：向爸妈或亲友借路费（成功率受家庭关系/口碑影响）。</p>
        <div class="support-buttons">
          <button class="btn btn-secondary" :disabled="supportUsed" @click="requestSupport('parents')">向爸妈开口</button>
          <button class="btn btn-secondary" :disabled="supportUsed" @click="requestSupport('friends')">向亲友周转</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { getAvailableTransport, selectTransport as selectTransportOption, requestTravelSupport } from '../game/transportation.js'
import { getTransportIcon } from '../game/utils.js'

const props = defineProps({
  state: Object,
  isReturning: Boolean
})

const emit = defineEmits(['transport-selected'])

const availableTransports = computed(() => {
  if (!props.state.attributes.distanceType) {
    return []
  }
  
  const salary = props.state.attributes.salaryRange 
    ? (props.state.attributes.salaryRange.min + props.state.attributes.salaryRange.max) / 2 
    : 0
  
  return getAvailableTransport(
    props.state.attributes.distanceType.id,
    props.state.stats.balance,
    salary
  )
})

function selectTransport(transport) {
  if (isTransportFailed(transport.id)) {
    return
  }
  const result = selectTransportOption(props.state, transport.id)
  emit('transport-selected', result)
}

function isTransportFailed(transportId) {
  const phaseKey = props.isReturning ? 'returning' : 'going_home'
  const failed = props.state.progress?.failedTransportOptions?.[phaseKey] || []
  return failed.includes(transportId)
}

const supportUsed = computed(() => {
  const phaseKey = props.isReturning ? 'returning' : 'going_home'
  return !!props.state.progress?.travelSupportUsed?.[phaseKey]
})

const showSupportActions = computed(() => {
  const isNoTransport = availableTransports.value.length === 0
  return isNoTransport || props.isReturning
})

function requestSupport(source) {
  if (supportUsed.value) return
  const result = requestTravelSupport(props.state, source, props.isReturning)
  emit('transport-selected', result)
}
</script>

<style scoped>
.transportation-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.description {
  color: #666;
  font-size: 14px;
  margin-bottom: 16px;
  line-height: 1.6;
}

.info-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  color: #666;
  font-size: 14px;
}

.info-value {
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.info-value.money {
  color: #4caf50;
}

.transport-options {
  margin-top: 20px;
}

.options-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
}

.no-options {
  text-align: center;
  padding: 20px;
  color: #999;
  background: #f8f9fa;
  border-radius: 8px;
}

.option-content {
  width: 100%;
}

.option-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.transport-icon {
  font-size: 24px;
}

.option-details {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
  color: #666;
}

.detail-item {
  padding: 4px 8px;
  background: #f0f0f0;
  border-radius: 4px;
}

.detail-item.warning {
  background: #fff3cd;
  color: #856404;
}

.option-item.disabled {
  opacity: 0.5;
  filter: grayscale(0.4);
  cursor: not-allowed;
  pointer-events: none;
}

.failed-tag {
  color: #d32f2f;
  font-size: 12px;
  font-weight: 600;
}

.support-actions {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px dashed #ddd;
}

.support-tip {
  color: #777;
  font-size: 13px;
  margin-bottom: 10px;
}

.support-buttons {
  display: flex;
  gap: 10px;
}
</style>
