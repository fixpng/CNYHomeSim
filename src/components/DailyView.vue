<template>
  <div class="daily-view">
    <!-- 延迟提示 -->
    <div v-if="state.progress.transportDelayed" class="card delay-notice">
      <p class="delay-message">⚠️ {{ state.progress.delayedMessage || '交通工具延误，你晚了一天到家...' }}</p>
      <button class="btn btn-primary" @click="handleDelayContinue">继续</button>
    </div>
    
    <!-- 日期显示 -->
    <div class="card day-header">
      <h2 class="day-title">📅 第{{ state.progress.currentDay }}天</h2>
      <p class="day-name">{{ getDayName(state.progress.currentDay) }}</p>
      <p class="lunar-date">{{ getLunarDate(state.progress.currentDay) }}</p>
      <div class="day-info">
        <span class="time-slot">
          {{ getTimeSlotName(state.progress.currentTimeSlot).icon }} 
          {{ getTimeSlotName(state.progress.currentTimeSlot).name }}
        </span>
      </div>
    </div>
    
    <!-- 当前时段的事件选项 -->
    <div class="card">
      <h3 class="subtitle">🎯 选择你的行动</h3>
      <div v-if="currentEvents.length === 0" class="no-events">
        今天没有更多选项了
      </div>
      <div v-else class="options-list">
        <div
          v-for="event in currentEvents"
          :key="event.id"
          class="option-item"
          :class="{ 
            disabled: !isEventAvailable(event),
            'has-choices': event.choices && event.choices.length > 0 && !selectedEvent
          }"
        >
          <div v-if="!selectedEvent || selectedEvent.id !== event.id" class="option-content">
            <div class="option-header">
              <span class="option-icon">{{ getEventIcon(event.id) }}</span>
              <div class="option-text">
                <div class="option-name">{{ event.name }}</div>
                <div class="option-desc">{{ event.description }}</div>
              </div>
            </div>
            <div v-if="event.changes && event.changes.balance && event.changes.balance < 0" class="option-cost">
              💰 花费：¥{{ Math.abs(event.changes.balance) }}
              <span v-if="!checkEventBalance(event, state.stats.balance).canAfford" class="insufficient-funds">
                （余额不足）
              </span>
            </div>
            <div v-if="event.successRate !== undefined" class="option-hint">
              ⚠️ 成功率：{{ event.successRate }}%
            </div>
            <div v-if="event.choices && event.choices.length > 0" class="option-hint">
              点击查看选项
            </div>
            <button 
              v-if="!event.choices || event.choices.length === 0"
              class="btn-select"
              :disabled="!isEventAvailable(event)"
              @click="selectAction(event)"
            >
              选择
            </button>
            <button 
              v-else
              class="btn-select"
              :disabled="!isEventAvailable(event)"
              @click="selectedEvent = event"
            >
              查看选项
            </button>
          </div>
          <div v-else class="option-choices-container">
            <div class="choices-header">
              <span class="choices-title">{{ event.name }}</span>
              <button class="btn-back" @click="selectedEvent = null">返回</button>
            </div>
            <div class="option-choices">
              <div
                v-for="choice in event.choices"
                :key="choice.id"
                class="choice-item"
                :class="{ 
                  disabled: choice.changes && choice.changes.balance && choice.changes.balance < 0 && props.state.stats.balance < Math.abs(choice.changes.balance)
                }"
                @click="selectChoice(event, choice)"
              >
                <div class="choice-name">{{ choice.name }}</div>
                <div class="choice-desc">{{ event.description }}</div>
                <div v-if="choice.changes && choice.changes.balance && choice.changes.balance < 0" class="choice-cost">
                  💰 花费：¥{{ Math.abs(choice.changes.balance) }}
                  <span v-if="props.state.stats.balance < Math.abs(choice.changes.balance)" class="insufficient-funds">
                    （余额不足）
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 下一天按钮 -->
    <div v-if="state.progress.dayEnded" class="card">
      <button class="btn btn-primary btn-large" @click="nextDay">
        {{ state.progress.currentDay < 8 ? '➡️ 下一天' : '🚄 准备返程' }}
      </button>
    </div>
    
    <!-- 事件弹窗 -->
    <EventDialog
      :visible="showDialog"
      :title="dialogData?.title"
      :icon="dialogData?.icon"
      :scene="dialogData?.scene"
      :thoughts="dialogData?.thoughts"
      :nextChoices="dialogData?.nextChoices"
      @close="handleDialogCloseWithChoice"
      @select-choice="handleDialogueChoice"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { getDayEvents, processDynamicEvent, processInventoryChanges } from '../game/daily.js'
import { checkLowStatsTriggers, getSpecialEventScene, markLowStatsTriggered } from '../game/specialEvents.js'
import { checkEventBalance, getEventIcon } from '../game/utils.js'
import { getEventScene, generateDiaryThoughts } from '../game/scenes.js'
import EventDialog from './EventDialog.vue'

const props = defineProps({
  state: Object
})

const emit = defineEmits(['action-selected', 'next-day', 'add-diary'])

const selectedEvent = ref(null)
const showDialog = ref(false)
const dialogData = ref(null)
const dialogueState = ref(null) // 连续对话状态：{ round, totalRounds, accumulatedChanges }

// 检查并显示"刚回到家"特殊剧情
watch(() => props.state.progress.showHomecomingScene, (show) => {
  if (show && props.state.progress.homecomingScene) {
    const homecoming = props.state.progress.homecomingScene
    showEventDialog(
      {
        id: 'homecoming',
        name: '刚回到家'
      },
      { scene: homecoming.scene, thoughts: homecoming.thoughts },
      homecoming.thoughts,
      homecoming.effects,
      null,
      true // 标记为不消耗体力
    )
    // 清除标记
    props.state.progress.showHomecomingScene = false
    props.state.progress.homecomingScene = null
  }
}, { immediate: true })

// 组件挂载时也检查一次
onMounted(() => {
  if (props.state.progress.showHomecomingScene && props.state.progress.homecomingScene) {
    const homecoming = props.state.progress.homecomingScene
    showEventDialog(
      {
        id: 'homecoming',
        name: '刚回到家'
      },
      { scene: homecoming.scene, thoughts: homecoming.thoughts },
      homecoming.thoughts,
      homecoming.effects,
      null,
      true // 标记为不消耗体力
    )
    // 清除标记
    props.state.progress.showHomecomingScene = false
    props.state.progress.homecomingScene = null
  }
})

// 检查事件是否可用（包括余额检查）
function isEventAvailable(event) {
  if (!event.available || props.state.progress.dayEnded) {
    return false
  }
  
  // 检查余额
  const balanceCheck = checkEventBalance(event, props.state.stats.balance)
  if (!balanceCheck.canAfford) {
    return false
  }
  
  return true
}

// 获取农历日期（二十八到初七）
function getLunarDate(day) {
  const lunarDates = {
    0: '腊月二十八',
    1: '腊月二十九（除夕）',
    2: '正月初一',
    3: '正月初二',
    4: '正月初三',
    5: '正月初四',
    6: '正月初五',
    7: '正月初六',
    8: '正月初七'
  }
  return lunarDates[day] || `第${day}天`
}

// 获取日期名称
function getDayName(day) {
  const names = {
    0: '在路上',
    1: '除夕·到家',
    2: '大年初一·拜年',
    3: '初二·走亲访友',
    4: '初三·走亲访友',
    5: '初四·走亲访友',
    6: '初五·走亲访友',
    7: '初六·走亲访友',
    8: '初七·返程准备'
  }
  return names[day] || `第${day}天`
}

// 获取时段名称和图标
function getTimeSlotName(slot) {
  const names = {
    morning: { name: '早上', icon: '🌅' },
    noon: { name: '中午', icon: '☀️' },
    evening: { name: '晚上', icon: '🌙' }
  }
  return names[slot] || { name: slot, icon: '⏰' }
}

// 获取当前时段的事件
const currentEvents = computed(() => {
  if (props.state.progress.dayEnded) {
    return []
  }
  const dayEvents = getDayEvents(props.state.progress.currentDay, props.state)
  const timeSlot = props.state.progress.currentTimeSlot
  return dayEvents[timeSlot] || []
})

// 选择行动
function selectAction(event) {
  if (!isEventAvailable(event)) {
    return
  }
  
  // 如果有子选项，显示子选项
  if (event.choices && event.choices.length > 0) {
    selectedEvent.value = event
    return
  }
  
  // 处理动态事件（先处理，因为可能需要判断成功失败）
  let changes = processDynamicEvent(event, props.state)
  
  // 如果有成功失败标记，传递给state用于场景生成
  if (changes._success !== undefined) {
    props.state._lastEventSuccess = changes._success
    delete changes._success // 删除标记，不应用到属性
  }
  
  // 获取场景描述（依赖changes中的成功失败标记）
  const scene = getEventScene(event.id, null, props.state)
  
  // 弹窗想法使用场景内文案，日记文案单独生成（形成反差）
  const thoughts = typeof scene === 'object' ? (scene.thoughts || '') : ''
  
  // 显示弹窗（库存变化在弹窗关闭时处理）
  showEventDialog(event, scene, thoughts, changes, null, !!event.noEnergyCost)
}

// 显示事件弹窗
function showEventDialog(event, scene, thoughts, changes, choice = null, noEnergyCost = false) {
  const actionName = choice ? `${event.name} - ${choice.name}` : event.name
  const sceneText = typeof scene === 'object' ? (scene.scene || scene.thoughts || '') : scene
  const thoughtsText = thoughts || (typeof scene === 'object' ? scene.thoughts : '')
  
  dialogData.value = {
    title: actionName,
    icon: getEventIcon(event.id),
    scene: sceneText,
    thoughts: thoughtsText,
    nextChoices: typeof scene === 'object' && Array.isArray(scene.choices) ? scene.choices : null,
    event,
    choice,
    changes,
    noEnergyCost // 标记是否不消耗体力
  }
  showDialog.value = true
}

// 连续对话中选择下一步分支
function handleDialogueChoice(choice) {
  if (!dialogData.value?.event || !choice) {
    return
  }
  const { event } = dialogData.value
  showDialog.value = false
  dialogData.value = null
  selectChoice(event, choice)
}

// 选择子选项
function selectChoice(event, choice) {
  if (props.state.progress.dayEnded) {
    return
  }
  
  // 检查选择的余额
  if (choice.changes && choice.changes.balance && choice.changes.balance < 0) {
    const cost = Math.abs(choice.changes.balance)
    if (props.state.stats.balance < cost) {
      // 余额不足，不执行操作（UI上已经显示"余额不足"提示）
      return
    }
  }
  
  // 确保inventory存在
  if (!props.state.inventory) {
    props.state.inventory = { newYearGoods: 0, hasCleaned: false }
  }
  
  // 合并事件和选择的变化（传入choice用于年货判断）
  let changes = processDynamicEvent(event, props.state, choice)
  if (choice.changes) {
    Object.keys(choice.changes).forEach(key => {
      changes[key] = (changes[key] || 0) + choice.changes[key]
    })
  }
  
  // 如果有成功失败标记，传递给state用于场景生成
  if (changes._success !== undefined) {
    props.state._lastEventSuccess = changes._success
    delete changes._success // 删除标记，不应用到属性
  }
  
  // 获取场景描述（依赖changes中的成功失败标记）
  let scene = getEventScene(event.id, choice.id, props.state)
  // 弹窗想法使用场景内文案，日记文案单独生成（形成反差）
  let thoughts = typeof scene === 'object' ? (scene.thoughts || '') : ''
  
  // 检查是否有特殊剧情（包括家庭经济、关系、婚姻状态、职业）
  const specialScene = getSpecialEventScene(event.id, choice.id, props.state)
  if (specialScene) {
    // 如果特殊剧情有scene属性，使用它；否则直接使用
    if (typeof specialScene === 'object' && specialScene.scene) {
      scene = specialScene
      // 如果有effects，合并到changes中
      if (specialScene.effects) {
        Object.keys(specialScene.effects).forEach(key => {
          changes[key] = (changes[key] || 0) + specialScene.effects[key]
        })
      }
    } else if (typeof specialScene === 'object') {
      scene = specialScene
    }
  }
  
  // 显示弹窗
  showEventDialog(event, scene, thoughts, changes, choice, !!event.noEnergyCost)
}

// 关闭弹窗并应用变化
function handleDialogCloseWithChoice() {
  if (!dialogData.value) {
    showDialog.value = false
    return
  }
  
  const { event, choice, changes } = dialogData.value
  
  // 如果没有event或changes，说明数据有问题，直接关闭
  if (!event || !changes) {
    showDialog.value = false
    dialogData.value = null
    return
  }
  
  showDialog.value = false
  
  // 统计信息
  const statistics = {}
  if (choice?.id === 'drink' || (event.id === 'family_dinner' && choice?.id === 'drink')) {
    statistics.drinkingCount = 1
  }
  if (event.id === 'blind_date' || (event.id.includes('marriage'))) {
    statistics.marriagePressureCount = 1
  }
  if (event.id === 'new_year_parents' && changes.balance > 0) {
    statistics.redPacketReceived = changes.balance
  }
  if (event.id === 'new_year_parents' && changes.balance < 0) {
    statistics.redPacketSent = Math.abs(changes.balance)
  }
  
  const shouldApplyChanges = event.id !== 'homecoming'

  // 添加日记（homecoming 已在上游写入）
  if (shouldApplyChanges) {
    const timeSlot = props.state.progress.currentTimeSlot
    const timeSlotInfo = getTimeSlotName(timeSlot)
    const dayName = getDayName(props.state.progress.currentDay)
    const time = `${dayName} ${timeSlotInfo.icon} ${timeSlotInfo.name}`
    
    const actionName = choice ? `${event.name} - ${choice.name}` : event.name
    const diaryEntry = {
      time,
      icon: getEventIcon(event.id),
      action: actionName,
      thoughts: generateDiaryThoughts(event, choice, changes),
      changes: { ...changes },
      isNew: true
    }
    
    emit('add-diary', diaryEntry)
  }
  
  if (shouldApplyChanges) {
    // 处理库存变化
    processInventoryChanges(event, props.state)
    
    // 收集库存变化用于传递
    const inventoryChanges = {}
    if (event.addInventory) {
      inventoryChanges.addInventory = event.addInventory
    }
    if (event.setInventory) {
      inventoryChanges.setInventory = event.setInventory
    }
    // 传递是否消耗体力的标记
    emit('action-selected', changes, statistics, Object.keys(inventoryChanges).length > 0 ? inventoryChanges : null, !dialogData.value?.noEnergyCost)
  }
  selectedEvent.value = null
  
  // 移动到下一个时段（如果不是不消耗体力的特殊剧情）
  if (!dialogData.value?.noEnergyCost) {
    moveToNextTimeSlot()
  }
  
  // 清空dialogData和成功失败标记
  dialogData.value = null
  dialogueState.value = null
  if (props.state._lastEventSuccess !== undefined) {
    delete props.state._lastEventSuccess
  }
  
  // 检查低数值触发剧情（在应用changes之后检查）
  setTimeout(() => {
    const lowStatsTriggers = checkLowStatsTriggers(props.state)
    if (lowStatsTriggers.length > 0) {
      const trigger = lowStatsTriggers[0] // 显示第一个触发
      // 标记已触发，避免重复触发
      markLowStatsTriggered(props.state, trigger.type)
      showEventDialog(
        { 
          id: trigger.type, 
          name: trigger.type === 'crisis_health' ? '身体亮红灯' :
                trigger.type === 'crisis_mental' ? '情绪崩盘' :
                trigger.type === 'sick' ? '生病了' : 
                trigger.type === 'depressed' ? '心情低落' : 
                trigger.type === 'poor' ? '经济困难' : '被嫌弃' 
        },
        { scene: trigger.scene, thoughts: trigger.thoughts },
        trigger.thoughts,
        trigger.effects,
        null,
        true // 标记为不消耗体力（低数值触发剧情通常是一两句话就能过的）
      )
    }
  }, 500)
}

// 移动到下一个时段
function moveToNextTimeSlot() {
  const timeSlots = ['morning', 'noon', 'evening']
  const currentIndex = timeSlots.indexOf(props.state.progress.currentTimeSlot)
  
  if (currentIndex < timeSlots.length - 1) {
    props.state.progress.currentTimeSlot = timeSlots[currentIndex + 1]
  } else {
    // 晚间结束，等待玩家点击下一天
    props.state.progress.dayEnded = true
  }
}

// 处理延迟继续
function handleDelayContinue() {
  const delayedDuringReturning = props.state.phase === 'returning'
  props.state.progress.transportDelayed = false
  props.state.progress.delayedMessage = null

  // 返程延误：继续后直接抵达工作地并进入总结
  if (delayedDuringReturning) {
    props.state.progress.hasReturnedWork = true
    props.state.phase = 'summary'
    return
  }

  props.state.phase = 'daily'
  props.state.progress.currentDay = 1
  props.state.progress.currentTimeSlot = 'morning'
  props.state.progress.dayEnded = false
  props.state.progress.dayMode = null
  props.state.progress.dayContext = null
  
  // 触发"刚回到家"特殊剧情
  setTimeout(() => {
    import('../game/specialEvents.js').then(({ generateHomecomingScene }) => {
      const homecoming = generateHomecomingScene(props.state)
      
      // 应用效果
      Object.keys(homecoming.effects).forEach(key => {
        if (props.state.stats.hasOwnProperty(key)) {
          if (key === 'balance') {
            props.state.stats.balance = Math.max(0, props.state.stats.balance + homecoming.effects[key])
          } else {
            props.state.stats[key] = Math.max(0, Math.min(100, props.state.stats[key] + homecoming.effects[key]))
          }
        }
      })
      
      // 记录历史
      props.state.history.health.push(props.state.stats.health)
      props.state.history.spirit.push(props.state.stats.spirit)
      props.state.history.reputation.push(props.state.stats.reputation)
      props.state.history.balance.push(props.state.stats.balance)
      
      // 添加日记
      const diaryEntry = {
        time: '到家',
        icon: '🏠',
        action: '刚回到家',
        thoughts: homecoming.thoughts,
        changes: homecoming.effects,
        isNew: true
      }
      props.state.diary.push(diaryEntry)
      
      // 显示剧情
      props.state.progress.showHomecomingScene = true
      props.state.progress.homecomingScene = {
        scene: homecoming.scene,
        thoughts: homecoming.thoughts,
        effects: homecoming.effects
      }
    })
  }, 100)
}

// 下一天
function nextDay() {
  emit('next-day')
}
</script>

<style scoped>
.daily-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.day-header {
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.day-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
}

.day-name {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 8px;
}

.lunar-date {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 12px;
}

.delay-notice {
  background: #fff3cd;
  border: 2px solid #ffc107;
  margin-bottom: 16px;
}

.delay-message {
  color: #856404;
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 500;
}

.day-info {
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  opacity: 0.8;
}

.time-slot {
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

.no-events {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.option-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
}

.option-icon {
  font-size: 32px;
  flex-shrink: 0;
  line-height: 1;
}

.option-text {
  flex: 1;
}

.option-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.option-desc {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
}

.option-cost {
  margin-top: 8px;
  padding: 6px 12px;
  background: #fff3cd;
  border-radius: 6px;
  font-size: 12px;
  color: #856404;
}

.insufficient-funds {
  color: #dc3545;
  font-weight: 600;
}

.option-hint {
  font-size: 12px;
  color: #667eea;
  margin-top: 8px;
  font-style: italic;
}

.btn-select {
  margin-top: 12px;
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 44px;
  width: 100%;
}

.btn-select:hover:not(:disabled) {
  background: #5568d3;
}

.btn-select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.option-choices-container {
  width: 100%;
}

.choices-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.choices-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.btn-back {
  padding: 4px 12px;
  background: #f0f0f0;
  color: #666;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.option-choices {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.choice-item {
  padding: 12px;
  background: white;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 44px;
}

.choice-item:hover {
  border-color: #667eea;
  background: #f0f4ff;
}

.choice-item:active:not(.disabled) {
  transform: scale(0.98);
}

.choice-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f5f5f5;
}

.choice-item.disabled:hover {
  border-color: #ddd;
  background: #f5f5f5;
  transform: none;
}

.choice-cost {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

.choice-cost .insufficient-funds {
  color: #dc3545;
  font-weight: 600;
}

.choice-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.choice-desc {
  font-size: 12px;
  color: #666;
}
</style>
