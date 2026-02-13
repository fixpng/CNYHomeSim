// 游戏状态管理

// 初始游戏状态
export function createInitialState() {
  return {
    // 游戏阶段
    phase: 'setup', // setup, going_home, daily, returning, summary
    
    // 玩家属性
    attributes: {
      workUnit: null,
      job: null,
      salaryRange: null,
      workCity: null,
      homeCity: null,
      homeProvince: null,
      distanceType: null,
      familyRelation: null,
      familyEconomy: null,
      maritalStatus: null,
      hasChildren: false, // 是否已育
      travelWithFamily: false, // 是否全家返乡
      ageRange: null,
      skills: [],
      debtType: null
    },
    
    // 动态属性
    stats: {
      health: 100,
      spirit: 100,
      balance: 0,
      reputation: 50
    },
    
    // 游戏进度
    progress: {
      currentDay: 0, // 0-9, 0是返乡之路，1-9是春节9天
      currentTimeSlot: null, // morning, noon, evening
      dayEnded: false, // 当天是否已结束（晚间行动后为true）
      hasReturnedHome: false,
      hasReturnedWork: false,
      // 第3-7天的当日行动模式：home(宅家) / out(出门)
      dayMode: null,
      // 当天临时上下文（用于突发上门等一次性逻辑）
      dayContext: null,
      // 抢票失败后置灰的交通选项（按阶段区分）
      failedTransportOptions: {
        going_home: [],
        returning: []
      },
      // 交通阶段是否已请求过借钱支持（防止无限刷）
      travelSupportUsed: {
        going_home: false,
        returning: false
      }
    },
    
    // 统计数据
    statistics: {
      totalSpent: 0,
      totalReceived: 0,
      marriagePressureCount: 0,
      drinkingCount: 0,
      redPacketReceived: 0,
      redPacketSent: 0
    },
    
    // 属性历史（用于绘制曲线）
    history: {
      health: [100],
      spirit: [100],
      balance: [],
      reputation: [50]
    },
    
    // 选择的交通方式
    transportation: {
      goingHome: null,
      goingBack: null
    },
    
    // 日记记录
    diary: [],
    
    // 游戏物品/状态
    inventory: {
      newYearGoods: 0, // 年货数量（0=没买，1=便宜，2=中档，3=高档）
      hasCleaned: false // 是否搞过卫生
    },
    
    // 成就系统
    achievements: [], // 已解锁的成就ID列表
    
    // 已触发的低数值剧情（避免重复触发）
    triggeredLowStats: [] // 已触发的低数值剧情类型：['sick', 'depressed', 'poor', 'disliked']
  }
}

// 保存游戏状态到localStorage
export function saveGameState(state) {
  try {
    localStorage.setItem('cnyHomeSim_state', JSON.stringify(state))
    return true
  } catch (e) {
    console.error('保存游戏状态失败:', e)
    return false
  }
}

// 从localStorage加载游戏状态
export function loadGameState() {
  try {
    const saved = localStorage.getItem('cnyHomeSim_state')
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (e) {
    console.error('加载游戏状态失败:', e)
  }
  return null
}

// 清除游戏状态
export function clearGameState() {
  try {
    localStorage.removeItem('cnyHomeSim_state')
    return true
  } catch (e) {
    console.error('清除游戏状态失败:', e)
    return false
  }
}

// 更新属性
export function updateStats(state, changes) {
  const oldStats = { ...state.stats }
  
  // 应用变化
  Object.keys(changes).forEach(key => {
    if (state.stats.hasOwnProperty(key)) {
      state.stats[key] = Math.max(0, Math.min(100, state.stats[key] + changes[key]))
    }
  })
  
  // 记录历史
  state.history.health.push(state.stats.health)
  state.history.spirit.push(state.stats.spirit)
  state.history.reputation.push(state.stats.reputation)
  if (state.history.balance.length === 0) {
    state.history.balance.push(state.stats.balance)
  }
  state.history.balance.push(state.stats.balance)
  
  // 检查状态触发
  const triggers = []
  if (oldStats.health >= 50 && state.stats.health < 50) {
    triggers.push('sick')
  }
  if (oldStats.spirit >= 30 && state.stats.spirit < 30) {
    triggers.push('emo')
  }
  
  return triggers
}
