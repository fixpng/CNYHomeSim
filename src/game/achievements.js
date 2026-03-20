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
      const isFinished = state.phase === 'summary' || state.progress.currentDay >= 8
      return state.statistics.totalSpent <= 500 && isFinished
    }
  },
  
  // 状态类
  {
    id: 'sick_warrior',
    name: '病痛战士',
    description: '健康值低于20仍坚持活动',
    icon: '🏥',
    condition: (state) => {
      const isFinished = state.phase === 'summary' || state.progress.currentDay >= 8
      return state.stats.health <= 20 && isFinished
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
  },

  // ===== 新增成就 =====
  {
    id: 'pet_savior',
    name: '毛孩子救星',
    description: '收养了流浪猫并帮它找到归宿',
    icon: '🐱',
    condition: (state) => {
      return state.storylines?.strayPet === 'resolved'
    }
  },
  {
    id: 'peacemaker',
    name: '和事佬',
    description: '成功调解家庭矛盾',
    icon: '🕊️',
    condition: (state) => {
      return state.storylines?.familyConflict === 'resolved'
    }
  },
  {
    id: 'dreamer',
    name: '追梦人',
    description: '认真规划了一个副业/创业计划',
    icon: '💡',
    condition: (state) => {
      return state.storylines?.dreamProject === 'resolved'
    }
  },
  {
    id: 'old_friend',
    name: '故人重逢',
    description: '和发小深入聊了一次',
    icon: '🤝',
    condition: (state) => {
      return state.storylines?.childhoodFriend === 'resolved'
    }
  },
  {
    id: 'photographer',
    name: '记录者',
    description: '拍了全家福',
    icon: '📸',
    condition: (state) => {
      return state.diary.some(entry => entry.action.includes('全家福'))
    }
  },
  {
    id: 'chef',
    name: '大厨',
    description: '给家人做了一道拿手菜',
    icon: '👨‍🍳',
    condition: (state) => {
      return state.diary.some(entry => entry.action.includes('露一手'))
    }
  },
  {
    id: 'filial_piety',
    name: '孝心满分',
    description: '偷偷给父母留了钱并写了信',
    icon: '💝',
    condition: (state) => {
      const leftMoney = state.diary.some(entry => entry.action.includes('偷偷留钱'))
      const wroteLetter = state.diary.some(entry => entry.action.includes('写一封信'))
      return leftMoney && wroteLetter
    }
  },
  {
    id: 'night_walker',
    name: '夜行者',
    description: '每次都选择夜间散步',
    icon: '🌙',
    condition: (state) => {
      const walkCount = state.diary.filter(entry =>
        entry.action.includes('散步') || entry.action.includes('夜间')
      ).length
      return walkCount >= 3
    }
  },
  {
    id: 'gambler',
    name: '赌神',
    description: '麻将/打牌赢了超过3次',
    icon: '🀄',
    condition: (state) => {
      const winCount = state.diary.filter(entry =>
        (entry.action.includes('麻将') || entry.action.includes('打牌') || entry.action.includes('打牌')) &&
        entry.changes && entry.changes.balance > 0
      ).length
      return winCount >= 3
    }
  },
  {
    id: 'survivor',
    name: '春节幸存者',
    description: '所有属性都低于30但还是撑到了最后',
    icon: '🏴‍☠️',
    condition: (state) => {
      const isFinished = state.phase === 'summary' || state.progress.currentDay >= 8
      return isFinished && state.stats.health <= 30 && state.stats.spirit <= 30 && state.stats.reputation <= 30
    }
  },

  // ===== 第二轮新增成就 =====
  {
    id: 'homebody',
    name: '宅家王者',
    description: '连续3天以上选择宅家模式',
    icon: '🏠',
    condition: (state) => {
      const homeCount = state.diary.filter(entry =>
        entry.action.includes('宅家') || entry.action.includes('今天主打：宅家')
      ).length
      return homeCount >= 3
    }
  },
  {
    id: 'social_king',
    name: '走亲大使',
    description: '每天都选择出门拜年',
    icon: '🚶',
    condition: (state) => {
      const outCount = state.diary.filter(entry =>
        entry.action.includes('出门拜年') || entry.action.includes('走亲访友')
      ).length
      return outCount >= 4
    }
  },
  {
    id: 'movie_star',
    name: '春节档影迷',
    description: '带家人去看了电影',
    icon: '🎬',
    condition: (state) => {
      return state.diary.some(entry => entry.action.includes('电影'))
    }
  },
  {
    id: 'market_lover',
    name: '赶集达人',
    description: '去赶集并请父母吃小吃',
    icon: '🏪',
    condition: (state) => {
      return state.diary.some(entry => entry.action.includes('赶集') || entry.action.includes('请爸妈'))
    }
  },
  {
    id: 'rain_walker',
    name: '风雨无阻',
    description: '在下雨/下雪天依然出门',
    icon: '🌧️',
    condition: (state) => {
      return state.diary.some(entry => entry.action.includes('冒雨') || entry.action.includes('冒雪'))
    }
  },
  {
    id: 'all_storylines',
    name: '人生赢家',
    description: '完成所有四条剧情线',
    icon: '🌟',
    condition: (state) => {
      return state.storylines?.childhoodFriend === 'resolved' &&
        state.storylines?.strayPet === 'resolved' &&
        state.storylines?.familyConflict === 'resolved' &&
        state.storylines?.dreamProject === 'resolved'
    }
  },
  {
    id: 'wifi_hero',
    name: '网络工程师',
    description: '修好了家里的WiFi',
    icon: '📶',
    condition: (state) => {
      return state.diary.some(entry => entry.action.includes('修好') || entry.action.includes('断网'))
    }
  },

  // ===== 第三轮新增成就 =====
  {
    id: 'early_bird',
    name: '早起冠军',
    description: '连续3天选择早上的活动',
    icon: '🌅',
    condition: (state) => {
      const morningCount = state.diary.filter(entry =>
        entry.time && entry.time.includes('上午')
      ).length
      return morningCount >= 3
    }
  },
  {
    id: 'mahjong_master',
    name: '麻将之神',
    description: '打麻将赢了500元以上',
    icon: '🀄',
    condition: (state) => {
      let total = 0
      state.diary.forEach(entry => {
        if ((entry.action.includes('麻将') || entry.action.includes('打牌')) && entry.changes?.balance > 0) {
          total += entry.changes.balance
        }
      })
      return total >= 500
    }
  },
  {
    id: 'debt_free',
    name: '财务自由',
    description: '春节结束时余额超过初始余额',
    icon: '🏦',
    condition: (state) => {
      const isFinished = state.phase === 'summary' || state.progress.currentDay >= 8
      const initial = state.history.balance?.[0] || 0
      return isFinished && state.stats.balance > initial
    }
  },
  {
    id: 'peacekeeper',
    name: '和平使者',
    description: '春节期间没有任何属性降到30以下',
    icon: '☮️',
    condition: (state) => {
      const isFinished = state.phase === 'summary' || state.progress.currentDay >= 8
      if (!isFinished) return false
      return state.history.health.every(h => h >= 30) &&
        state.history.spirit.every(s => s >= 30) &&
        state.history.reputation.every(r => r >= 30)
    }
  },
  {
    id: 'foodie',
    name: '美食家',
    description: '参与了3次以上做饭或吃饭相关活动',
    icon: '🍖',
    condition: (state) => {
      const foodCount = state.diary.filter(entry =>
        entry.action.includes('做饭') || entry.action.includes('厨房') ||
        entry.action.includes('年夜饭') || entry.action.includes('露一手') ||
        entry.action.includes('煮') || entry.action.includes('吃')
      ).length
      return foodCount >= 3
    }
  },
  {
    id: 'generous',
    name: '散财童子',
    description: '发出红包超过1000元',
    icon: '🧧',
    condition: (state) => {
      return state.statistics.redPacketSent >= 1000
    }
  },
  {
    id: 'nostalgia',
    name: '怀旧青年',
    description: '翻看老照片或整理旧物品',
    icon: '📷',
    condition: (state) => {
      return state.diary.some(entry =>
        entry.action.includes('照片') || entry.action.includes('旧物') ||
        entry.action.includes('老相册')
      )
    }
  },
  {
    id: 'zen_master',
    name: '佛系达人',
    description: '精神值始终保持在70以上',
    icon: '🧘',
    condition: (state) => {
      return state.history.spirit.every(s => s >= 70) && state.history.spirit.length > 5
    }
  },
  {
    id: 'adventure_seeker',
    name: '冒险家',
    description: '每次都选择高风险选项',
    icon: '🎯',
    condition: (state) => {
      const riskyCount = state.diary.filter(entry =>
        entry.action.includes('赌') || entry.action.includes('冒险') ||
        entry.action.includes('拼') || entry.action.includes('喝酒') ||
        entry.action.includes('硬撑')
      ).length
      return riskyCount >= 4
    }
  },
  {
    id: 'balanced_life',
    name: '人生赢家·Plus',
    description: '所有属性都在60以上结束游戏',
    icon: '💫',
    condition: (state) => {
      const isFinished = state.phase === 'summary' || state.progress.currentDay >= 8
      return isFinished &&
        state.stats.health >= 60 &&
        state.stats.spirit >= 60 &&
        state.stats.reputation >= 60 &&
        state.stats.balance >= 3000
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
