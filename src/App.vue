<template>
  <div class="app">
    <transition name="fade" mode="out-in">
      <div class="container" :key="state.phase">
      <!-- 游戏标题 -->
      <div class="game-header" v-if="state.phase === 'setup'">
        <h1 class="game-title">🏠 打工人春节回家模拟器</h1>
        <p class="game-subtitle">体验9天春节假期的真实返乡生活</p>
      </div>
      
      <!-- 游戏阶段路由 -->
      <SetupView 
        v-if="state.phase === 'setup'"
        @start-game="handleStartGame"
      />
      
      <TransportationView
        v-if="state.phase === 'going_home' || state.phase === 'returning'"
        :state="state"
        :is-returning="state.phase === 'returning'"
        @transport-selected="handleTransportSelected"
      />
      
      <DailyView
        v-if="state.phase === 'daily' || (state.phase === 'going_home' && state.progress.transportDelayed)"
        :state="state"
        @action-selected="handleActionSelected"
        @next-day="handleNextDay"
        @add-diary="handleAddDiary"
      />
      
      <SummaryView
        v-if="state.phase === 'summary'"
        :state="state"
        @restart="handleRestart"
      />
      
      <!-- 重来按钮和基础信息按钮 -->
      <div v-if="state.phase !== 'setup' && state.phase !== 'summary'" class="top-buttons-container">
        <button class="btn btn-secondary btn-info" @click="showInfoModal = true">
          ℹ️ 基础信息
        </button>
        <button class="btn btn-secondary btn-restart" @click="handleRestartWithDialog">
          🔄 大梦一场
        </button>
      </div>
      
      <!-- 基础信息浮窗 -->
      <div v-if="showInfoModal" class="modal-overlay" @click="showInfoModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>📋 基础信息</h3>
            <button class="modal-close" @click="showInfoModal = false">×</button>
          </div>
          <div class="modal-body">
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">工作单位：</span>
                <span class="info-value">{{ state.attributes.workUnit?.name || '未设置' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">职业：</span>
                <span class="info-value">{{ state.attributes.job?.name || '未设置' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">薪资范围：</span>
                <span class="info-value">{{ state.attributes.salaryRange?.name || '未设置' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">工作地：</span>
                <span class="info-value">{{ state.attributes.workCity?.name || '未设置' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">老家：</span>
                <span class="info-value">{{ state.attributes.homeCity?.name || '未设置' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">老家省份：</span>
                <span class="info-value">{{ state.attributes.homeProvince?.name || '未设置' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">区域：</span>
                <span class="info-value">{{ state.attributes.homeProvince?.regionName || '未设置' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">距离：</span>
                <span class="info-value">{{ getDistanceTypeName() || '未设置' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">家庭关系：</span>
                <span class="info-value">{{ state.attributes.familyRelation?.name || '未设置' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">家庭经济：</span>
                <span class="info-value">{{ state.attributes.familyEconomy?.name || '未设置' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">婚姻状态：</span>
                <span class="info-value">{{ state.attributes.maritalStatus?.name || '未设置' }}</span>
              </div>
              <div class="info-item" v-if="state.attributes.maritalStatus?.id === 'married'">
                <span class="info-label">是否已育：</span>
                <span class="info-value">{{ state.attributes.hasChildren ? '已育' : '未育' }}</span>
              </div>
              <div class="info-item" v-if="state.attributes.maritalStatus?.id === 'married'">
                <span class="info-label">返乡方式：</span>
                <span class="info-value">{{ state.attributes.travelWithFamily ? '全家返乡' : '独自返乡' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">年龄：</span>
                <span class="info-value">{{ state.attributes.ageRange?.name || '未设置' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">技能：</span>
                <span class="info-value">{{ state.attributes.skills?.map(s => s.name).join('、') || '无' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">负债：</span>
                <span class="info-value">{{ state.attributes.debtType?.name || '未设置' }}</span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="showInfoModal = false">关闭</button>
          </div>
        </div>
      </div>
      
      <!-- 右侧栏（属性+日记） -->
      <transition name="slide">
        <div v-if="state.phase !== 'setup' && state.phase !== 'summary'" class="sidebar">
          <!-- 属性显示栏 -->
          <div class="stats-bar">
            <div class="stat-item">
              <span class="stat-label">❤️ 健康</span>
              <div class="stat-bar">
                <div class="stat-fill health" :style="{ width: animatedStats.health + '%' }"></div>
              </div>
              <span class="stat-value">
                <AnimatedNumber :value="state.stats.health" />
              </span>
            </div>
            <div class="stat-item">
              <span class="stat-label">🧠 精神</span>
              <div class="stat-bar">
                <div class="stat-fill spirit" :style="{ width: animatedStats.spirit + '%' }"></div>
              </div>
              <span class="stat-value">
                <AnimatedNumber :value="state.stats.spirit" />
              </span>
            </div>
            <div class="stat-item">
              <span class="stat-label">💰 余额</span>
              <span class="stat-value money">
                ¥<AnimatedNumber :value="state.stats.balance" />
              </span>
            </div>
            <div class="stat-item">
              <span class="stat-label">⭐ 口碑</span>
              <div class="stat-bar">
                <div class="stat-fill reputation" :style="{ width: animatedStats.reputation + '%' }"></div>
              </div>
              <span class="stat-value">
                <AnimatedNumber :value="state.stats.reputation" />
              </span>
            </div>
          </div>
          
          <!-- 日记 -->
          <DiaryView
            v-if="state.phase === 'daily'"
            :entries="state.diary"
            @clear="handleClearDiary"
          />
        </div>
      </transition>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { createInitialState, saveGameState, loadGameState } from './game/state.js'
import { checkAchievements } from './game/achievements.js'
import { generateHomecomingScene } from './game/specialEvents.js'
import { DISTANCE_TYPES } from './game/data.js'
import SetupView from './components/SetupView.vue'
import TransportationView from './components/TransportationView.vue'
import DailyView from './components/DailyView.vue'
import SummaryView from './components/SummaryView.vue'
import DiaryView from './components/DiaryView.vue'
import AnimatedNumber from './components/AnimatedNumber.vue'

const state = ref(createInitialState())

// 基础信息浮窗显示状态
const showInfoModal = ref(false)

// 动画数值（用于进度条和数字动画）
const animatedStats = ref({
  health: 100,
  spirit: 100,
  balance: 0,
  reputation: 50
})

// 加载保存的游戏状态
onMounted(() => {
  const saved = loadGameState()
  if (saved) {
    state.value = saved
    animatedStats.value = {
      health: saved.stats.health,
      spirit: saved.stats.spirit,
      balance: saved.stats.balance,
      reputation: saved.stats.reputation
    }
  }
})

// 监听数值变化，实现动画
watch(() => state.value.stats.health, (newVal, oldVal) => {
  if (oldVal !== undefined && oldVal !== newVal) {
    animateValue('health', oldVal, newVal)
  }
}, { immediate: false })
watch(() => state.value.stats.spirit, (newVal, oldVal) => {
  if (oldVal !== undefined && oldVal !== newVal) {
    animateValue('spirit', oldVal, newVal)
  }
}, { immediate: false })
watch(() => state.value.stats.balance, (newVal, oldVal) => {
  if (oldVal !== undefined && oldVal !== newVal) {
    animateValue('balance', oldVal, newVal)
  }
}, { immediate: false })
watch(() => state.value.stats.reputation, (newVal, oldVal) => {
  if (oldVal !== undefined && oldVal !== newVal) {
    animateValue('reputation', oldVal, newVal)
  }
}, { immediate: false })

// 数值动画函数
let animationFrames = {}
function animateValue(key, startValue, targetValue) {
  if (startValue === targetValue) {
    animatedStats.value[key] = targetValue
    return
  }
  
  // 取消之前的动画
  if (animationFrames[key]) {
    cancelAnimationFrame(animationFrames[key])
  }
  
  const duration = 800
  const startTime = performance.now()
  
  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // 使用easeOutCubic缓动函数
    const easeProgress = 1 - Math.pow(1 - progress, 3)
    const current = startValue + (targetValue - startValue) * easeProgress
    
    animatedStats.value[key] = Math.round(current)
    
    if (progress < 1) {
      animationFrames[key] = requestAnimationFrame(update)
    } else {
      animatedStats.value[key] = targetValue
      delete animationFrames[key]
    }
  }
  
  animationFrames[key] = requestAnimationFrame(update)
}

// 计算距离类型名称
function getDistanceTypeName() {
  if (!state.value.attributes.workCity || !state.value.attributes.homeCity) {
    return null
  }
  
  // 简单判断：同城、邻市、省内、跨省、远跨省
  if (state.value.attributes.workCity.id === state.value.attributes.homeCity.id) {
    return DISTANCE_TYPES[0].name // 同城
  }
  
  // 这里简化处理，实际可以根据城市层级判断
  const workTier = parseInt(state.value.attributes.workCity.id.replace(/\D/g, '')) || 1
  const homeTier = parseInt(state.value.attributes.homeCity.id.replace(/\D/g, '')) || 1
  
  // 根据层级差判断距离
  const diff = Math.abs(workTier - homeTier)
  if (diff === 0) return DISTANCE_TYPES[1].name // 邻市
  if (diff <= 2) return DISTANCE_TYPES[2].name // 省内跨市
  if (diff <= 4) return DISTANCE_TYPES[3].name // 跨省
  return DISTANCE_TYPES[4].name // 远跨省
}

// 自动保存
function autoSave() {
  saveGameState(state.value)
}

// 生成初始属性说明
function generateInitialStatsExplanation(health, spirit, reputation, balance) {
  let healthReason = ''
  let spiritReason = ''
  let reputationReason = ''
  
  // 根据健康值生成说明
  if (health >= 90) {
    healthReason = '你平时很注意身体，作息规律，身体状态很好。'
  } else if (health >= 80) {
    healthReason = '工作压力大，偶尔熬夜加班，身体有些疲惫，但还能坚持。'
  } else if (health >= 70) {
    healthReason = '工作强度大，经常熬夜，身体明显感到疲惫，需要好好休息。'
  } else if (health >= 60) {
    healthReason = '长期加班熬夜，身体透支严重，已经出现一些健康问题。'
  } else {
    healthReason = '工作过度劳累，身体已经严重透支，健康状态堪忧。'
  }
  
  // 根据精神值生成说明
  if (spirit >= 90) {
    spiritReason = '虽然工作累，但想到要回家过年，心情特别好，精神饱满。'
  } else if (spirit >= 80) {
    spiritReason = '工作压力大，但想到要回家过年，心情还是不错的。'
  } else if (spirit >= 70) {
    spiritReason = '工作压力大，精神有些疲惫，但回家的期待让你还能坚持。'
  } else if (spirit >= 60) {
    spiritReason = '工作压力很大，精神疲惫，心情有些低落。'
  } else {
    spiritReason = '工作压力巨大，精神极度疲惫，心情很糟糕。'
  }
  
  // 根据口碑值生成说明
  if (reputation >= 70) {
    reputationReason = '平时经常和家里联系，关系很好，家人对你很满意。'
  } else if (reputation >= 60) {
    reputationReason = '平时工作忙，但偶尔会和家里联系，关系还算不错。'
  } else if (reputation >= 50) {
    reputationReason = '平时工作忙，和家里联系不多，关系还算正常。'
  } else if (reputation >= 40) {
    reputationReason = '平时工作太忙，很少和家里联系，关系有些疏远。'
  } else {
    reputationReason = '平时工作忙，几乎不和家里联系，关系比较紧张。'
  }
  
  // 根据余额生成说明（更贴合实际情况）
  let balanceReason = ''
  if (balance >= 20000) {
    balanceReason = `工作一年下来，扣除各种支出后，手头还有 ¥${balance.toLocaleString()}，还算宽裕。`
  } else if (balance >= 10000) {
    balanceReason = `工作一年下来，扣除各种支出后，手头还有 ¥${balance.toLocaleString()}，勉强够用。`
  } else if (balance >= 5000) {
    balanceReason = `工作一年下来，扣除房租/房贷和各种支出后，手头还有 ¥${balance.toLocaleString()}，有点紧张。`
  } else if (balance >= 2000) {
    balanceReason = `工作一年下来，扣除房租和各种支出后，手头只有 ¥${balance.toLocaleString()}，比较紧张。`
  } else if (balance >= 500) {
    balanceReason = `工作一年下来，扣除房租和生活费后，手头只有 ¥${balance.toLocaleString()}，非常紧张。`
  } else {
    balanceReason = `工作一年下来，扣除各种支出后，手头只有 ¥${balance.toLocaleString()}，几乎没钱了。`
  }
  
  return `经过一年的打拼，你的状态是这样的：\n\n❤️ 健康 ${health}：${healthReason}\n\n🧠 精神 ${spirit}：${spiritReason}\n\n💰 余额 ¥${balance}：${balanceReason}\n\n⭐ 口碑 ${reputation}：${reputationReason}`
}

// 开始游戏
function handleStartGame(gameState) {
  state.value = gameState
  
  // 随机生成初始属性，更符合现实（经过一年工作后的状态）
  // 健康：60-95之间随机，偏向较低（工作压力大）
  const health = Math.floor(Math.random() * 36) + 60 // 60-95
  state.value.stats.health = health
  state.value.history.health = [health]
  
  // 精神：65-95之间随机，偏向中等（想到回家过年心情会好一些）
  const spirit = Math.floor(Math.random() * 31) + 65 // 65-95
  state.value.stats.spirit = spirit
  state.value.history.spirit = [spirit]
  
  // 口碑：40-70之间随机，偏向中等（平时工作忙联系不多）
  const reputation = Math.floor(Math.random() * 31) + 40 // 40-70
  state.value.stats.reputation = reputation
  state.value.history.reputation = [reputation]
  
  // 余额已经通过计算得出
  const actualBalance = state.value.stats.balance
  
  // 添加初始日记，根据随机值生成说明
  const initialDiary = {
    time: '游戏开始',
    icon: '📝',
    action: '初始状态',
    thoughts: generateInitialStatsExplanation(health, spirit, reputation, actualBalance),
    changes: {
      health: 0,
      spirit: 0,
      balance: 0,
      reputation: 0
    },
    isNew: false
  }
  state.value.diary.push(initialDiary)
  
  state.value.phase = 'going_home'
  autoSave()
}

// 交通方式选择
function handleTransportSelected(result) {
  const phaseKey = state.value.phase === 'returning' ? 'returning' : 'going_home'
  if (!state.value.progress.failedTransportOptions) {
    state.value.progress.failedTransportOptions = { going_home: [], returning: [] }
  }
  if (!state.value.progress.travelSupportUsed) {
    state.value.progress.travelSupportUsed = { going_home: false, returning: false }
  }

  // 借路费请求（不切换阶段，只更新属性和日记）
  if (result.supportRequest) {
    Object.keys(result.changes || {}).forEach(key => {
      if (state.value.stats.hasOwnProperty(key)) {
        if (key === 'balance') {
          state.value.stats.balance = Math.max(0, state.value.stats.balance + (result.changes[key] || 0))
        } else {
          state.value.stats[key] = Math.max(0, Math.min(100, state.value.stats[key] + (result.changes[key] || 0))
          )
        }
      }
    })

    state.value.history.health.push(state.value.stats.health)
    state.value.history.spirit.push(state.value.stats.spirit)
    state.value.history.reputation.push(state.value.stats.reputation)
    state.value.history.balance.push(state.value.stats.balance)

    state.value.diary.push({
      time: state.value.phase === 'going_home' ? '返乡路上' : '返程路上',
      icon: result.success ? '💸' : '🫠',
      action: result.source === 'parents' ? '向爸妈借路费' : '向亲友借路费',
      thoughts: result.message || '这次开口借钱，心里五味杂陈。',
      changes: {
        health: result.changes?.health || 0,
        spirit: result.changes?.spirit || 0,
        balance: result.changes?.balance || 0,
        reputation: result.changes?.reputation || 0
      },
      isNew: true
    })

    alert(result.message || (result.success ? '借钱成功。' : '借钱失败。'))
    autoSave()
    return
  }

  // 抢票失败：不扣钱、不跳转，记录失败并置灰对应选项
  if (result.ticketFailed) {
    const failedList = state.value.progress.failedTransportOptions[phaseKey] || []
    if (!failedList.includes(result.failedTransportId)) {
      failedList.push(result.failedTransportId)
    }
    state.value.progress.failedTransportOptions[phaseKey] = failedList

    // 记录交通失败日记
    state.value.diary.push({
      time: state.value.phase === 'going_home' ? '返乡路上' : '返程路上',
      icon: '🎫',
      action: '抢票失败',
      thoughts: result.message || '这趟票没抢到，只能重新选。',
      changes: { health: 0, spirit: 0, balance: 0, reputation: 0 },
      isNew: true
    })

    alert(result.message || '抢票失败，请重新选择交通方式。')
    autoSave()
    return
  }

  if (result.success) {
    // 应用属性变化
    Object.keys(result.changes).forEach(key => {
      if (state.value.stats.hasOwnProperty(key)) {
        if (key === 'balance') {
          state.value.stats.balance = Math.max(0, state.value.stats.balance + result.changes[key])
        } else {
          state.value.stats[key] = Math.max(0, Math.min(100, state.value.stats[key] + result.changes[key]))
        }
      }
    })
    
    // 记录历史
    state.value.history.health.push(state.value.stats.health)
    state.value.history.spirit.push(state.value.stats.spirit)
    state.value.history.reputation.push(state.value.stats.reputation)
    state.value.history.balance.push(state.value.stats.balance)
    
    // 记录交通方式
    if (state.value.phase === 'going_home') {
      state.value.transportation.goingHome = result.transport
      state.value.progress.hasReturnedHome = true
      state.value.progress.failedTransportOptions.going_home = []
      
      // 如果延迟，晚一天到家
      if (result.delayed) {
        state.value.progress.currentDay = 0 // 还在路上
        state.value.progress.transportDelayed = true
        state.value.progress.delayedMessage = `由于${result.transport.name}延误，你晚了一天到家...`
      } else {
        state.value.phase = 'daily'
        state.value.progress.currentDay = 1
        state.value.progress.currentTimeSlot = 'morning'
        state.value.progress.dayEnded = false
        state.value.progress.dayMode = null
        state.value.progress.dayContext = null
        
        // 触发"刚回到家"特殊剧情（延迟触发，确保界面已切换）
        setTimeout(() => {
          triggerHomecomingScene()
        }, 300)
      }
    } else if (state.value.phase === 'returning') {
      state.value.transportation.goingBack = result.transport
      state.value.progress.failedTransportOptions.returning = []
      // 如果延迟，晚一天到工作地
      if (result.delayed) {
        state.value.progress.returnDelayed = true
        state.value.progress.delayedMessage = `由于${result.transport.name}延误，你晚了一天到工作地...`
      } else {
        state.value.progress.hasReturnedWork = true
        state.value.phase = 'summary'
      }
    }

    // 记录交通情况到日记（成功/延迟）
    const transportAction = state.value.phase === 'summary' ? '返程交通' : '返乡交通'
    const transportThought = result.delayed
      ? `${result.transport.name}途中延误，晚了一天。`
      : `你选择了${result.transport.name}，一路还算顺利。`
    state.value.diary.push({
      time: state.value.transportation.goingBack ? '返程路上' : '返乡路上',
      icon: '🚗',
      action: transportAction,
      thoughts: transportThought,
      changes: {
        health: result.changes?.health || 0,
        spirit: result.changes?.spirit || 0,
        balance: result.changes?.balance || 0,
        reputation: result.changes?.reputation || 0
      },
      isNew: true
    })
    
    autoSave()
  }
}

// 触发"刚回到家"特殊剧情
function triggerHomecomingScene() {
  const homecoming = generateHomecomingScene(state.value)
  
  // 应用效果
  Object.keys(homecoming.effects).forEach(key => {
    if (state.value.stats.hasOwnProperty(key)) {
      if (key === 'balance') {
        state.value.stats.balance = Math.max(0, state.value.stats.balance + homecoming.effects[key])
      } else {
        state.value.stats[key] = Math.max(0, Math.min(100, state.value.stats[key] + homecoming.effects[key]))
      }
    }
  })
  
  // 记录历史
  state.value.history.health.push(state.value.stats.health)
  state.value.history.spirit.push(state.value.stats.spirit)
  state.value.history.reputation.push(state.value.stats.reputation)
  state.value.history.balance.push(state.value.stats.balance)
  
  // 添加日记
  const diaryEntry = {
    time: '到家',
    icon: '🏠',
    action: '刚回到家',
    thoughts: homecoming.thoughts,
    changes: homecoming.effects,
    isNew: true
  }
  state.value.diary.push(diaryEntry)
  
  // 通过事件系统显示弹窗（不消耗体力）
  // 这里我们需要通过一个特殊的方式触发，让DailyView显示这个剧情
  // 我们可以在state中添加一个标记，让DailyView检查并显示
  state.value.progress.showHomecomingScene = true
  state.value.progress.homecomingScene = {
    scene: homecoming.scene,
    thoughts: homecoming.thoughts,
    effects: homecoming.effects
  }
  
  autoSave()
}

// 每日行动选择
function handleActionSelected(changes, statistics, inventoryChanges = null, shouldConsumeEnergy = true) {
  // 处理库存变化
  if (inventoryChanges) {
    if (inventoryChanges.addInventory) {
      Object.keys(inventoryChanges.addInventory).forEach(key => {
        if (state.value.inventory.hasOwnProperty(key)) {
          state.value.inventory[key] = inventoryChanges.addInventory[key]
        }
      })
    }
    if (inventoryChanges.setInventory) {
      Object.keys(inventoryChanges.setInventory).forEach(key => {
        if (state.value.inventory.hasOwnProperty(key)) {
          state.value.inventory[key] = inventoryChanges.setInventory[key]
        }
      })
    }
  }
  
  // 应用属性变化
  Object.keys(changes).forEach(key => {
    if (state.value.stats.hasOwnProperty(key)) {
      if (key === 'balance') {
        state.value.stats.balance = Math.max(0, state.value.stats.balance + changes[key])
      } else {
        state.value.stats[key] = Math.max(0, Math.min(100, state.value.stats[key] + changes[key]))
      }
    }
  })
  
  // 更新统计
  if (statistics) {
    Object.keys(statistics).forEach(key => {
      if (state.value.statistics.hasOwnProperty(key)) {
        state.value.statistics[key] += statistics[key]
      }
    })
  }
  
  // 记录历史
  state.value.history.health.push(state.value.stats.health)
  state.value.history.spirit.push(state.value.stats.spirit)
  state.value.history.reputation.push(state.value.stats.reputation)
  state.value.history.balance.push(state.value.stats.balance)
  
  // 检查并解锁成就（延迟检查，避免阻塞）
  setTimeout(() => {
    try {
      const newAchievements = checkAchievements(state.value)
      if (newAchievements.length > 0) {
        newAchievements.forEach(achievement => {
          if (!state.value.achievements.includes(achievement.id)) {
            state.value.achievements.push(achievement.id)
            // 触发成就解锁通知
            console.log(`🎉 解锁成就：${achievement.name} - ${achievement.description}`)
            // 可以在这里显示成就弹窗
            alert(`🎉 解锁成就：${achievement.name}\n${achievement.description}`)
          }
        })
      }
    } catch (err) {
      console.error('检查成就失败:', err)
    }
  }, 100)
  
  autoSave()
}

// 添加日记
function handleAddDiary(entry) {
  state.value.diary.push(entry)
  autoSave()
}

// 清空日记
function handleClearDiary() {
  state.value.diary = []
  autoSave()
}

// 下一天
function handleNextDay() {
  if (state.value.progress.currentDay < 8) {
    state.value.progress.currentDay += 1
    state.value.progress.currentTimeSlot = 'morning'
    state.value.progress.dayEnded = false
    state.value.progress.dayMode = null
    state.value.progress.dayContext = null
  } else if (state.value.progress.currentDay === 8) {
    // 第9天，进入返程
    state.value.phase = 'returning'
  }
  autoSave()
}

// 重新开始（带确认对话框）
function handleRestartWithDialog() {
  if (confirm('大梦一场，原来刚刚是在做梦...\n\n确定要重新开始吗？')) {
    handleRestart()
  }
}

// 重新开始
function handleRestart() {
  state.value = createInitialState()
  animatedStats.value = {
    health: 100,
    spirit: 100,
    balance: 0,
    reputation: 50
  }
  autoSave()
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  padding-bottom: 20px;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.game-header {
  text-align: center;
  color: white;
  padding: 20px 0;
  margin-bottom: 20px;
}

.game-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.game-subtitle {
  font-size: 16px;
  opacity: 0.9;
}

.stats-bar {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}

.stat-item:last-child {
  margin-bottom: 0;
}

.stat-label {
  min-width: 60px;
  width: auto;
  font-size: 14px;
  color: #666;
  flex-shrink: 0;
  white-space: nowrap;
}

.stat-bar {
  flex: 1;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 4px;
}

.stat-fill.health {
  background: #4caf50;
}

.stat-fill.spirit {
  background: #2196f3;
}

.stat-fill.reputation {
  background: #ff9800;
}

.stat-value {
  min-width: 70px;
  width: auto;
  text-align: right;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  flex-shrink: 0;
  white-space: nowrap;
}

.stat-value.money {
  color: #4caf50;
}

/* 重来按钮 */
/* 顶部按钮容器 */
.top-buttons-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
  display: flex;
  gap: 10px;
}

.btn-info,
.btn-restart {
  font-size: 14px;
  padding: 8px 16px;
  min-height: 36px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 基础信息浮窗 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.modal-close {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 24px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.modal-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #667eea;
}

.info-label {
  font-weight: 600;
  color: #666;
  min-width: 100px;
  flex-shrink: 0;
}

.info-value {
  color: #333;
  flex: 1;
}

.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  background: #f8f9fa;
}

@media (max-width: 1023px) {
  .top-buttons-container {
    top: 10px;
    right: 10px;
    gap: 8px;
  }
  
  .btn-info,
  .btn-restart {
    font-size: 12px;
    padding: 6px 12px;
    min-height: 32px;
  }
  
  .modal-content {
    width: 95%;
    max-height: 85vh;
  }
  
  .modal-header {
    padding: 16px;
  }
  
  .modal-header h3 {
    font-size: 18px;
  }
  
  .modal-body {
    padding: 16px;
  }
  
  .info-label {
    min-width: 80px;
    font-size: 14px;
  }
  
  .info-value {
    font-size: 14px;
  }
}

@media (min-width: 768px) {
  .game-title {
    font-size: 32px;
  }
}
</style>
