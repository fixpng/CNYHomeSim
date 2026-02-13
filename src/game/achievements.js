// 成就系统

export const ACHIEVEMENTS = [
  // 躺平类
  {
    id: 'lazy_king',
    name: '躺平之王',
    description: '连续3天以上选择躺平',
    icon: '😴',
    condition: (state) => {
      let consecutiveLazy = 0
      let maxConsecutive = 0
      state.diary.forEach(entry => {
        if (entry.action.includes('躺平') || entry.action.includes('睡懒觉')) {
          consecutiveLazy++
          maxConsecutive = Math.max(maxConsecutive, consecutiveLazy)
        } else {
          consecutiveLazy = 0
        }
      })
      return maxConsecutive >= 3
    }
  },
  {
    id: 'social_phobia',
    name: '社恐冠军',
    description: '拒绝所有饭局和聚会',
    icon: '🚫',
    condition: (state) => {
      const refusedCount = state.diary.filter(entry => 
        entry.action.includes('不去') || entry.action.includes('拒绝')
      ).length
      return refusedCount >= 5
    }
  },
  
  // 社交类
  {
    id: 'social_butterfly',
    name: '社交达人',
    description: '参加所有聚会和饭局',
    icon: '🦋',
    condition: (state) => {
      const socialCount = state.diary.filter(entry => 
        entry.action.includes('喝酒') || entry.action.includes('聚餐') || 
        entry.action.includes('走亲访友') || entry.action.includes('拜年')
      ).length
      return socialCount >= 8
    }
  },
  {
    id: 'red_packet_king',
    name: '红包王者',
    description: '收到红包超过2000元',
    icon: '🧧',
    condition: (state) => {
      return state.statistics.redPacketReceived >= 2000
    }
  },
  
  // 经济类
  {
    id: 'big_spender',
    name: '挥金如土',
    description: '总花费超过5000元',
    icon: '💸',
    condition: (state) => {
      return state.statistics.totalSpent >= 5000
    }
  },
  {
    id: 'frugal',
    name: '勤俭持家',
    description: '总花费少于500元',
    icon: '💰',
    condition: (state) => {
      return state.statistics.totalSpent <= 500 && state.progress.currentDay >= 9
    }
  },
  
  // 状态类
  {
    id: 'sick_warrior',
    name: '病痛战士',
    description: '健康值低于20仍坚持活动',
    icon: '🏥',
    condition: (state) => {
      return state.stats.health <= 20 && state.progress.currentDay >= 9
    }
  },
  {
    id: 'depressed',
    name: 'emo之王',
    description: '精神值低于15',
    icon: '😢',
    condition: (state) => {
      return state.stats.spirit <= 15
    }
  },
  {
    id: 'perfect_health',
    name: '健康达人',
    description: '健康值始终保持在80以上',
    icon: '💪',
    condition: (state) => {
      return state.history.health.every(h => h >= 80) && state.history.health.length > 5
    }
  },
  
  // 家庭类
  {
    id: 'family_man',
    name: '家庭模范',
    description: '口碑值达到90以上',
    icon: '⭐',
    condition: (state) => {
      return state.stats.reputation >= 90
    }
  },
  {
    id: 'black_sheep',
    name: '家族败类',
    description: '口碑值低于20',
    icon: '👿',
    condition: (state) => {
      return state.stats.reputation <= 20
    }
  },
  
  // 特殊类
  {
    id: 'marriage_pressure',
    name: '催婚受害者',
    description: '被催婚超过5次',
    icon: '💔',
    condition: (state) => {
      return state.statistics.marriagePressureCount >= 5
    }
  },
  {
    id: 'alcoholic',
    name: '酒鬼',
    description: '喝酒超过5次',
    icon: '🍺',
    condition: (state) => {
      return state.statistics.drinkingCount >= 5
    }
  },
  {
    id: 'workaholic',
    name: '工作狂',
    description: '春节期间还加班',
    icon: '💼',
    condition: (state) => {
      return state.diary.some(entry => entry.action.includes('加班'))
    }
  },
  {
    id: 'clean_freak',
    name: '洁癖',
    description: '每天都搞卫生',
    icon: '🧹',
    condition: (state) => {
      const cleanCount = state.diary.filter(entry => 
        entry.action.includes('打扫') || entry.action.includes('搞卫生')
      ).length
      return cleanCount >= 5
    }
  }
]

// 检查并解锁成就
export function checkAchievements(state) {
  const unlocked = []
  ACHIEVEMENTS.forEach(achievement => {
    if (!state.achievements || !state.achievements.includes(achievement.id)) {
      if (achievement.condition(state)) {
        unlocked.push(achievement)
      }
    }
  })
  return unlocked
}
