// 游戏工具函数

// 检查事件是否需要余额
export function checkEventBalance(event, currentBalance) {
  if (!event.changes || !event.changes.balance) {
    return { canAfford: true, cost: 0 }
  }

  const balanceChange = event.changes.balance
  if (balanceChange >= 0) {
    return { canAfford: true, cost: 0 }
  }

  const cost = Math.abs(balanceChange)
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
    'shehuo': '🥁',
    // 新增事件图标
    'childhood_friend': '🤝',
    'childhood_friend_deep': '🤝',
    'stray_pet': '🐱',
    'stray_pet_care': '🐱',
    'village_gossip': '🗣️',
    'night_walk': '🌙',
    'cook_special': '👨‍🍳',
    'family_photo': '📸',
    'online_shopping_fail': '📦',
    'dream_project': '💡',
    'dream_project_plan': '💡',
    'family_conflict': '⚡',
    'family_conflict_resolve': '🕊️',
    'childhood_spot': '🏫',
    'help_elderly': '👴',
    'morning_run': '🏃',
    'phone_call_friend': '📞',
    'family_karaoke': '🎤',
    'unexpected_money': '🎰',
    'argument_with_parents': '😤',
    'paste_couplets': '🧨',
    'call_grandparents': '📞',
    'morning_exercise': '🏋️',
    'red_packet_battle': '🧧',
    'set_off_fireworks': '🎆',
    'clean_room': '🧹',
    'morning_walk_last': '🚶',
    'give_parents_money': '💝',
    'teach_parents_phone': '📱',
    'write_letter': '✉️',
    'last_night_walk': '🌌',
    'homecoming': '🏠',
    // 第二轮新增
    'nap': '💤',
    'tidy_old_stuff': '📦',
    'video_games': '🎮',
    'help_parents_chores': '🧹',
    'cook_lunch': '🍳',
    'old_photo_album': '📷',
    'local_market': '🏪',
    'new_year_movie': '🎬',
    'temple_visit': '🙏',
    'hometown_change': '🏗️',
    'secret_snack': '🍪',
    'social_media_post': '📱',
    'pet_reunion': '🐱',
    'dream_friend_collab': '🤝',
    'sudden_rain': '🌧️',
    'parent_cooking_battle': '🍳',
    'wifi_down': '📶',
    'maternal_grandparents': '👴',
    'great_uncle': '👨‍🦳',
    'second_aunt': '👩‍🦳',
    'old_neighbor': '🏘️'
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
