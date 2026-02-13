// 游戏工具函数

// 检查事件是否需要余额
export function checkEventBalance(event, currentBalance) {
  if (!event.changes || !event.changes.balance) {
    return { canAfford: true, cost: 0 }
  }
  
  const cost = Math.abs(event.changes.balance)
  return {
    canAfford: currentBalance >= cost,
    cost: cost
  }
}

// 获取事件图标
export function getEventIcon(eventId) {
  const iconMap = {
    // 日常活动
    'clean': '🧹',
    'rest': '😴',
    'shopping_cheap': '🛒',
    'shopping_medium': '🛍️',
    'shopping_expensive': '💎',
    'cook': '👨‍🍳',
    'chat_work': '💼',
    'chat_love': '💕',
    'child_topic': '👶',
    'day_plan_out': '🚶',
    'day_plan_home': '🏠',
    'red_packet': '🧧',
    'spring_festival_gala': '📺',
    'new_year_parents': '🙏',
    'new_year_neighbors': '🏠',
    'sleep_late': '😴',
    'receive_relatives': '👨‍👩‍👧‍👦',
    'play_cards': '🃏',
    'help_cook': '👨‍🍳',
    'family_dinner': '🍽️',
    'phone': '📱',
    'plan': '📋',
    'visit_relatives': '👨‍👩‍👧‍👦',
    'watch_tv': '📺',
    'farm_work': '🌾',
    'read': '📚',
    'classmate_drink': '🍺',
    'relative_borrow': '💰',
    'relative_pressure': '😵',
    'forced_drinking': '🍻',
    'red_packet_pressure': '🧧',
    'old_classmate_compare': '🫠',
    'blind_date': '💑',
    'overtime': '💻',
    'buy_return_ticket': '🎫',
    'pack': '🎒',
    'buy_souvenirs': '🎁',
    'farewell_meal': '🍜',
    'repair': '🔧',
    'heart_to_heart': '💬',
    'check_work': '📧',
    'early_sleep': '😴',
    // 成功失败事件
    'basketball_game': '🏀',
    'table_tennis': '🏓',
    'mahjong': '🀄',
    'poker': '🃏',
    'competition': '🏆'
    ,
    'fireworks': '🎆',
    'flower_market': '🌸',
    'temple_fair': '🏮',
    'ice_snow': '❄️',
    'shehuo': '🥁'
  }
  return iconMap[eventId] || '📌'
}

// 获取属性图标
export function getStatIcon(statName) {
  const iconMap = {
    'health': '❤️',
    'spirit': '🧠',
    'balance': '💰',
    'reputation': '⭐'
  }
  return iconMap[statName] || '📊'
}

// 获取交通方式图标
export function getTransportIcon(transportId) {
  const iconMap = {
    'bus': '🚌',
    'train': '🚄',
    'normal_train': '🚂',
    'slow_train': '🚃',
    'plane': '✈️',
    'drive': '🚗'
  }
  return iconMap[transportId] || '🚗'
}
