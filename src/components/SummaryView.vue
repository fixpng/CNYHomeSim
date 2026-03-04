<template>
  <div class="summary-view">
    <div class="card summary-header">
      <h2 class="summary-title">📊 春节假期总结</h2>
      <p class="summary-subtitle">你的9天春节假期结束了</p>
    </div>
    
    <!-- 最终评价 -->
    <div class="card">
      <h3 class="subtitle">🏆 最终评价</h3>
      <div class="rating" :class="ratingClass">
        <div class="rating-icon">{{ ratingIcon }}</div>
        <div class="rating-name">{{ ratingName }}</div>
        <div class="rating-desc">{{ ratingDesc }}</div>
      </div>
    </div>
    
    <!-- 属性变化曲线 -->
    <div class="card">
      <h3 class="subtitle">📈 属性变化</h3>
      <div ref="chartContainer" class="chart-container"></div>
    </div>
    
    <!-- 成就系统 -->
    <div class="card" v-if="achievements.length > 0">
      <h3 class="subtitle">🏆 解锁成就</h3>
      <div class="achievements-list">
        <div v-for="achievement in achievements" :key="achievement.id" class="achievement-item">
          <span class="achievement-icon">{{ achievement.icon }}</span>
          <div class="achievement-info">
            <div class="achievement-name">{{ achievement.name }}</div>
            <div class="achievement-desc">{{ achievement.description }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 统计数据 -->
    <div class="card">
      <h3 class="subtitle">📊 趣味统计</h3>
      <div class="statistics">
        <div class="stat-row">
          <span class="stat-label">总花费：</span>
          <span class="stat-value money">¥{{ totalSpent }}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">总收入：</span>
          <span class="stat-value money">¥{{ totalReceived }}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">被催婚次数：</span>
          <span class="stat-value">{{ state.statistics.marriagePressureCount }}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">喝酒次数：</span>
          <span class="stat-value">{{ state.statistics.drinkingCount }}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">收到红包：</span>
          <span class="stat-value money">¥{{ state.statistics.redPacketReceived }}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">发出红包：</span>
          <span class="stat-value money">¥{{ state.statistics.redPacketSent }}</span>
        </div>
      </div>
    </div>
    
    <!-- 最终属性 -->
    <div class="card">
      <h3 class="subtitle">💎 最终属性</h3>
      <div class="final-stats">
        <div class="final-stat-item">
          <span class="final-stat-label">健康</span>
          <div class="final-stat-bar">
            <div class="final-stat-fill health" :style="{ width: state.stats.health + '%' }"></div>
          </div>
          <span class="final-stat-value">{{ state.stats.health }}</span>
        </div>
        <div class="final-stat-item">
          <span class="final-stat-label">精神</span>
          <div class="final-stat-bar">
            <div class="final-stat-fill spirit" :style="{ width: state.stats.spirit + '%' }"></div>
          </div>
          <span class="final-stat-value">{{ state.stats.spirit }}</span>
        </div>
        <div class="final-stat-item">
          <span class="final-stat-label">余额</span>
          <span class="final-stat-value money">¥{{ state.stats.balance }}</span>
        </div>
        <div class="final-stat-item">
          <span class="final-stat-label">口碑</span>
          <div class="final-stat-bar">
            <div class="final-stat-fill reputation" :style="{ width: state.stats.reputation + '%' }"></div>
          </div>
          <span class="final-stat-value">{{ state.stats.reputation }}</span>
        </div>
      </div>
    </div>
    
    <!-- 重新开始按钮 -->
    <div class="card">
      <button class="btn btn-primary btn-large" @click="restart">🔄 再来一次</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { ACHIEVEMENTS } from '../game/achievements.js'

const props = defineProps({
  state: Object
})

// 获取已解锁的成就
const achievements = computed(() => {
  if (!props.state.achievements || props.state.achievements.length === 0) {
    return []
  }
  return ACHIEVEMENTS.filter(achievement => 
    props.state.achievements.includes(achievement.id)
  )
})

const emit = defineEmits(['restart'])

const chartContainer = ref(null)

// 计算总花费和收入
const totalSpent = computed(() => {
  return props.state.statistics.totalSpent || 0
})

const totalReceived = computed(() => {
  return props.state.statistics.totalReceived || 0
})

// 计算评价（基于最终结算属性）
const rating = computed(() => {
  const reputation = props.state.stats.reputation
  const spirit = props.state.stats.spirit
  const health = props.state.stats.health
  const balance = props.state.stats.balance
  
  // 计算属性变化
  const initialHealth = props.state.history.health?.[0] || 100
  const initialSpirit = props.state.history.spirit?.[0] || 100
  const initialReputation = props.state.history.reputation?.[0] || 50
  const initialBalance = props.state.history.balance?.[0] || 0
  
  const healthChange = health - initialHealth
  const spiritChange = spirit - initialSpirit
  const reputationChange = reputation - initialReputation
  const balanceChange = balance - initialBalance
  
  function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
  
  const bodyLine = health >= 80
    ? randomChoice(['这身体像新机，开机就能跑', '你这状态，体检医生都想给你点赞'])
    : health >= 60
      ? randomChoice(['身体还能转，但不是满电', '硬件还能用，就是偶尔卡顿'])
      : health >= 40
        ? randomChoice(['身体开始报警了，建议别硬刚', '你这血条已经在闪红'])
        : randomChoice(['身体状态像过热手机，随时黑屏', '这身子骨已经进入省电模式'])

  const moodLine = spirit >= 80
    ? randomChoice(['精神头很足，像抢到票那天', '你情绪稳定得像满格信号'])
    : spirit >= 60
      ? randomChoice(['精神一般在线，偶尔会转圈', '还行，属于能笑但不太想笑'])
      : spirit >= 40
        ? randomChoice(['心里有点堵，像春运候车室', '情绪偏低，像周一早八'])
        : randomChoice(['精神电量见底，充电器还没找到', '人还在，魂有点延误'])

  const relationLine = reputation >= 80
    ? randomChoice(['家里人对你好评如潮', '亲戚看你像看年度优选'])
    : reputation >= 60
      ? randomChoice(['家里关系基本稳定，暂无冲突热搜', '家里对你评价：总体可用'])
      : reputation >= 40
        ? randomChoice(['家庭气氛有点微妙，建议少开团', '你和亲戚聊天已进入谨慎模式'])
        : randomChoice(['亲戚局对你不太友好', '家庭关系进入高风险对线区'])

  const moneyLine = balanceChange > 1000
    ? randomChoice(['钱包还有余粮，底气在线', '你这现金流，至少没在裸奔'])
    : balanceChange > 0
      ? randomChoice(['手里有点余钱，但不敢飘', '余额还行，能撑几波'])
      : balanceChange > -1000
        ? randomChoice(['钱包有点瘦，但还没骨感', '钱是有点紧，不过还能呼吸'])
        : randomChoice(['钱包已经进入困难模式', '余额看完想给自己发个慰问金'])
  
  // 综合评分
  const avgScore = (reputation + spirit + health) / 3
  const balanceScore = balance >= 0 ? 50 : Math.max(0, 50 + balance / 100)
  const finalScore = (avgScore * 0.8 + balanceScore * 0.2)
  
  let level, name, icon, class_
  
  if (finalScore >= 80 && reputation >= 75 && spirit >= 70) {
    level = 'S'
    name = randomChoice(['全村的希望', '人间清醒年味版', '春节MVP'])
    icon = '🎉'
    class_ = 'rating-s'
  } else if (finalScore >= 65 && reputation >= 55 && spirit >= 50) {
    level = 'A'
    name = randomChoice(['稳住就赢', '平平淡淡才是真', '普通人胜利'])
    icon = '😊'
    class_ = 'rating-a'
  } else if (finalScore >= 45) {
    level = 'B'
    name = randomChoice(['人还在就行', '有点抽象', '糟心但能过'])
    icon = '😔'
    class_ = 'rating-b'
  } else {
    level = 'C'
    name = randomChoice(['建议重开', '鸡毛飞上天', '高压锅模式'])
    icon = '😢'
    class_ = 'rating-c'
  }
  
  const descVariants = [
    `今年这波春节，你属于：${bodyLine}；${moodLine}；${relationLine}；${moneyLine}。${getRatingSummary(health, spirit, reputation, balance, healthChange, spiritChange, reputationChange, balanceChange)}`,
    `总结一下：${bodyLine}，${moodLine}，${relationLine}，${moneyLine}。${getRatingSummary(health, spirit, reputation, balance, healthChange, spiritChange, reputationChange, balanceChange)}`,
    `贴吧老哥锐评：${bodyLine}，${moodLine}，${relationLine}，${moneyLine}。${getRatingSummary(health, spirit, reputation, balance, healthChange, spiritChange, reputationChange, balanceChange)}`
  ]
  
  const desc = randomChoice(descVariants)
  
  return { level, name, desc, icon, class: class_ }
})

// 生成口语化评价总结
function getRatingSummary(health, spirit, reputation, balance, healthChange, spiritChange, reputationChange, balanceChange) {
  function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
  
  const summaries = []
  
  // 健康变化（口语化）
  if (healthChange > 10) {
    summaries.push(randomChoice([
      '你这波把血条抬回来了',
      '休息确实有用，硬件续命成功',
      '状态回暖，至少不再红温'
    ]))
  } else if (healthChange < -10) {
    summaries.push(randomChoice([
      '你这波把自己玩成了低电量',
      '身体掉线有点明显，建议检修',
      '这假期过得像高强度副本'
    ]))
  }
  
  // 精神变化（口语化）
  if (spiritChange > 10) {
    summaries.push(randomChoice([
      '情绪回正，精神面貌可圈可点',
      '这波精神值上涨，像抢到回家票',
      '你人活过来了，眼里有光'
    ]))
  } else if (spiritChange < -10) {
    summaries.push(randomChoice([
      '精神值在掉，压力值在冲',
      '内耗有点重，建议别硬扛',
      '情绪像堵车，越急越走不动'
    ]))
  }
  
  // 口碑变化（口语化）
  if (reputationChange > 15) {
    summaries.push(randomChoice([
      '家里这条线你打通了',
      '亲情支线完成度很高',
      '家庭口碑稳中有升'
    ]))
  } else if (reputationChange < -15) {
    summaries.push(randomChoice([
      '家庭关系这块有点炸服',
      '你和亲戚进入互相观望阶段',
      '亲情频道信号不太稳定'
    ]))
  }
  
  // 余额变化（口语化）
  if (balanceChange < -2000) {
    summaries.push(randomChoice([
      '钱包经历了一次版本削弱',
      '钱花得很有年味，余额很有故事',
      '现金流压力上来了'
    ]))
  } else if (balanceChange > 500) {
    summaries.push(randomChoice([
      '收支还行，没被年关打穿',
      '你这波资金链暂时稳住了',
      '红包和节流都干得不错'
    ]))
  }
  
  if (summaries.length === 0) {
    return randomChoice([
      '整体看，虽然抽象但可控。',
      '一句话：没赢麻，也没崩盘。',
      '总体稳定，属于还能发朋友圈那种。'
    ]) + '。'
  }
  
  return summaries.join('；') + '。'
}

const ratingClass = computed(() => rating.value.class)
const ratingName = computed(() => rating.value.name)
const ratingDesc = computed(() => rating.value.desc)
const ratingIcon = computed(() => rating.value.icon)

// 绘制图表
onMounted(() => {
  nextTick(() => {
    if (chartContainer.value) {
      const chart = echarts.init(chartContainer.value)
      
      const healthData = props.state.history.health || []
      const spiritData = props.state.history.spirit || []
      const reputationData = props.state.history.reputation || []
      const balanceData = props.state.history.balance || []
      
      // 归一化余额数据用于显示（0-100范围）
      const maxBalance = Math.max(...balanceData, 1)
      const normalizedBalance = balanceData.map(b => (b / maxBalance) * 100)
      
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['健康', '精神', '口碑', '余额（归一化）'],
          bottom: 0
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: Array.from({ length: healthData.length }, (_, i) => `节点${i + 1}`)
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 100
        },
        series: [
          {
            name: '健康',
            type: 'line',
            data: healthData,
            smooth: true,
            itemStyle: { color: '#4caf50' }
          },
          {
            name: '精神',
            type: 'line',
            data: spiritData,
            smooth: true,
            itemStyle: { color: '#2196f3' }
          },
          {
            name: '口碑',
            type: 'line',
            data: reputationData,
            smooth: true,
            itemStyle: { color: '#ff9800' }
          },
          {
            name: '余额（归一化）',
            type: 'line',
            data: normalizedBalance,
            smooth: true,
            itemStyle: { color: '#9c27b0' },
            lineStyle: { type: 'dashed' }
          }
        ]
      }
      
      chart.setOption(option)
      
      // 响应式
      window.addEventListener('resize', () => {
        chart.resize()
      })
    }
  })
})

function restart() {
  emit('restart')
}
</script>

<style scoped>
.summary-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summary-header {
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.summary-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
}

.summary-subtitle {
  font-size: 16px;
  opacity: 0.9;
}

.rating {
  text-align: center;
  padding: 20px;
}

.rating-icon {
  font-size: 64px;
  margin-bottom: 12px;
}

.rating-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.rating-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.rating-s .rating-name { color: #ffd700; }
.rating-a .rating-name { color: #4caf50; }
.rating-b .rating-name { color: #ff9800; }
.rating-c .rating-name { color: #f44336; }

.chart-container {
  width: 100%;
  height: 300px;
}

.statistics {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-label {
  color: #666;
  font-size: 14px;
}

.stat-value {
  color: #333;
  font-size: 14px;
  font-weight: 600;
}

.stat-value.money {
  color: #4caf50;
}

.final-stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.final-stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.final-stat-label {
  width: 60px;
  font-size: 14px;
  color: #666;
  flex-shrink: 0;
}

.final-stat-bar {
  flex: 1;
  height: 12px;
  background: #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
}

.final-stat-fill {
  height: 100%;
  transition: width 0.3s;
  border-radius: 6px;
}

.final-stat-fill.health {
  background: #4caf50;
}

.final-stat-fill.spirit {
  background: #2196f3;
}

.final-stat-fill.reputation {
  background: #ff9800;
}

.final-stat-value {
  width: 80px;
  text-align: right;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  flex-shrink: 0;
}

.final-stat-value.money {
  color: #4caf50;
}
</style>
