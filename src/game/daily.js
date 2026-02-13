// 9天春节日常系统

// 每日事件配置
export const DAILY_EVENTS = {
  // 第1天：除夕
  1: {
    morning: [
      {
        id: 'clean',
        name: '帮父母打扫',
        description: '一起大扫除，准备过年',
        changes: { health: -15, reputation: 20 },
        available: true,
        setInventory: { hasCleaned: true }, // 标记已搞卫生
        specialScene: true // 有特殊剧情
      },
      {
        id: 'rest',
        name: '躺平',
        description: '太累了，先休息一下',
        changes: { health: 15, reputation: -15 },
        available: true
      },
      {
        id: 'shopping_cheap',
        name: '买年货（便宜）',
        description: '买点基本的年货，花费100元',
        changes: { balance: -100 },
        available: true,
        addInventory: { newYearGoods: 1 } // 存储年货
      },
      {
        id: 'shopping_medium',
        name: '买年货（中档）',
        description: '买点像样的年货，花费500元',
        changes: { balance: -500 },
        available: true,
        addInventory: { newYearGoods: 2 } // 存储年货
      },
      {
        id: 'shopping_expensive',
        name: '买年货（高档）',
        description: '买点好年货，花费1000元',
        changes: { balance: -1000 },
        available: true,
        addInventory: { newYearGoods: 3 } // 存储年货
      }
    ],
    noon: [
      {
        id: 'cook',
        name: '帮做饭',
        description: '和父母一起准备年夜饭',
        changes: { health: -15, reputation: 20 },
        available: true,
        specialScene: true
      },
      {
        id: 'chat_work',
        name: '和父母唠家常（聊工作）',
        description: '聊聊工作上的事',
        changes: { spirit: 0, reputation: 0 }, // 根据职业和工作地点动态生成
        available: true,
        dynamic: true,
        useJobContext: true // 使用职业上下文
      },
      {
        id: 'chat_love',
        name: '和父母唠家常（聊感情/家庭）',
        description: '根据婚姻状态聊对象、催生或孩子',
        changes: { spirit: 0, reputation: 0 }, // 根据婚姻状态动态生成
        available: true,
        dynamic: true,
        useMaritalContext: true // 使用婚姻状态上下文
      },
      {
        id: 'red_packet',
        name: '刷手机抢红包',
        description: '在群里抢红包',
        changes: { spirit: 5, balance: 0 }, // 随机获得0-50元
        available: true,
        random: true
      }
    ],
    evening: [
      {
        id: 'spring_festival_gala',
        name: '看春晚（固定）',
        description: '除夕夜必须看春晚',
        changes: { spirit: 0, reputation: 0 }, // 根据家庭关系动态调整
        available: true,
        locked: true,
        dynamic: true
      }
    ]
  },
  
  // 第2天：大年初一
  2: {
    morning: [
      {
        id: 'new_year_parents',
        name: '给父母拜年',
        description: '给父母拜年，发/收红包',
        changes: { balance: 0, reputation: 10 }, // 动态：发红包-200~1000，收红包+100~500
        available: true,
        dynamic: true
      },
      {
        id: 'new_year_neighbors',
        name: '去邻居家拜年',
        description: '拜访邻居',
        changes: { reputation: 15 },
        available: true
      },
      {
        id: 'sleep_late',
        name: '睡懒觉',
        description: '太累了，多睡会',
        changes: { health: 15, reputation: -15 },
        available: true
      }
    ],
    noon: [
      {
        id: 'receive_relatives',
        name: '突发：亲戚上门',
        description: '亲戚突然来串门（不可控）',
        changes: { reputation: 5 }, // 根据是否搞卫生动态调整
        available: true,
        checkCleaning: true // 检查是否搞卫生
      },
      {
        id: 'play_cards',
        name: '和兄弟姐妹打牌',
        description: '一起打牌娱乐',
        changes: { balance: 0, spirit: 0 }, // 随机输赢100-500，精神±10
        available: true,
        random: true
      },
      {
        id: 'help_cook',
        name: '帮做饭',
        description: '帮忙准备饭菜',
        changes: { health: -5, reputation: 10 },
        available: true
      }
    ],
    evening: [
      {
        id: 'family_dinner',
        name: '家庭聚餐',
        description: '一家人一起吃饭',
        changes: { health: 0, spirit: 0 }, // 选择：喝酒-10健康+5精神，不喝+5精神
        available: true,
        choices: [
          { id: 'drink', name: '喝酒', changes: { health: -20, spirit: 15 } },
          { id: 'no_drink', name: '不喝酒', changes: { spirit: 10 } }
        ]
      },
      {
        id: 'phone',
        name: '刷手机',
        description: '看看朋友圈，刷刷视频',
        changes: { spirit: 10 },
        available: true
      },
      {
        id: 'plan',
        name: '聊来年规划',
        description: '和父母聊聊新一年的计划',
        changes: { reputation: 0 }, // 根据家庭关系动态调整
        available: true,
        dynamic: true
      },
      {
        id: 'child_topic',
        name: '聊孩子/催生',
        description: '已婚后常见的话题：孩子教育或催生',
        changes: { spirit: 0, reputation: 0 },
        available: true,
        dynamic: true,
        useMaritalContext: true
      }
    ]
  }
}

// 第3-7天：走亲访友/随机事件
const RELATIVE_VISITS = [
  { 
    id: 'grandparents', 
    name: '去爷爷奶奶家', 
    cost: 0, 
    reputation: 10,
    useGoods: true // 使用年货
  },
  { 
    id: 'uncle', 
    name: '去舅舅家', 
    cost: 0, 
    reputation: 8,
    useGoods: true
  },
  { 
    id: 'aunt', 
    name: '去姑姑家', 
    cost: 0, 
    reputation: 8,
    useGoods: true
  },
  { 
    id: 'cousin', 
    name: '去表兄弟家', 
    cost: 0, 
    reputation: 5,
    useGoods: true
  }
]

const RANDOM_EVENTS = [
  {
    id: 'classmate_drink',
    name: '同学约喝酒',
    description: '老同学约你出去喝酒',
    choices: [
      { id: 'go', name: '去', changes: { health: -20, spirit: 20, balance: -300 }, specialScene: true },
      { id: 'refuse', name: '不去', changes: { reputation: -15 } }
    ]
  },
  {
    id: 'relative_borrow',
    name: '亲戚借钱',
    description: '有亲戚找你借钱',
    choices: [
      { id: 'lend', name: '借', changes: { balance: -2000, reputation: 20 }, specialScene: true },
      { id: 'refuse', name: '不借', changes: { reputation: -20 } }
    ]
  },
  {
    id: 'relative_pressure',
    name: '亲戚连环拷问',
    description: '饭桌上被问工资、对象、买房进度',
    choices: [
      { id: 'endure', name: '硬扛微笑', changes: { spirit: -18, health: -6, reputation: 5 }, specialScene: true },
      { id: 'retort', name: '回怼两句', changes: { spirit: -8, reputation: -18 }, specialScene: true },
      { id: 'escape', name: '借口开溜', changes: { spirit: 5, reputation: -8 } }
    ]
  },
  {
    id: 'forced_drinking',
    name: '被劝酒',
    description: '亲戚不停劝酒，不喝不给面子',
    choices: [
      { id: 'drink_hard', name: '硬着头皮喝', changes: { health: -22, spirit: -10, reputation: 10 }, specialScene: true },
      { id: 'drink_less', name: '只抿一口', changes: { health: -10, spirit: -5, reputation: -3 } },
      { id: 'refuse', name: '坚定拒绝', changes: { spirit: 3, reputation: -12 } }
    ]
  },
  {
    id: 'red_packet_pressure',
    name: '压岁钱压力',
    description: '小辈排队拜年，红包预算爆炸',
    choices: [
      { id: 'give_big', name: '面子拉满', changes: { balance: -1200, reputation: 15 }, specialScene: true },
      { id: 'give_normal', name: '正常给', changes: { balance: -500, reputation: 8 } },
      { id: 'pretend_poor', name: '装穷避战', changes: { balance: -100, reputation: -12, spirit: -5 } }
    ]
  },
  {
    id: 'old_classmate_compare',
    name: '同学局比惨比富',
    description: '老同学聚会，话题逐渐变味',
    choices: [
      { id: 'join', name: '硬聊到底', changes: { spirit: -15, reputation: 5 }, specialScene: true },
      { id: 'low_profile', name: '低调划水', changes: { spirit: -5, reputation: 0 } },
      { id: 'leave', name: '提前开溜', changes: { spirit: 6, reputation: -6 } }
    ]
  },
  {
    id: 'blind_date',
    name: '被介绍相亲',
    description: '有人给你介绍对象',
    choices: [
      { id: 'go', name: '去', changes: { spirit: -25, reputation: 15 }, specialScene: true },
      { id: 'refuse', name: '不去', changes: { reputation: -15 } }
    ],
    // 已婚不触发相亲剧情
    condition: (state) => state.attributes?.maritalStatus?.id !== 'married'
  },
  {
    id: 'overtime',
    name: '临时加班',
    description: '公司要求临时加班（私企易触发）',
    choices: [
      { id: 'work', name: '加班', changes: { spirit: -30, balance: 800 }, specialScene: true },
      { id: 'refuse', name: '拒绝', changes: { reputation: -15 } }
    ],
    condition: (state) => {
      const workUnit = state.attributes.workUnit?.id || ''
      return workUnit.startsWith('private')
    }
  },
  {
    id: 'buy_return_ticket',
    name: '抢返程票',
    description: '提前抢返程的票',
    changes: { spirit: 0 }, // 成功+5，失败-10
    random: true,
    successRate: 60 // 成功率60%
  },
  {
    id: 'basketball_game',
    name: '打篮球',
    description: '和朋友们打篮球（成功率70%）',
    successRate: 70,
    successChanges: { health: 10, spirit: 15, reputation: 5 },
    failChanges: { health: -5, spirit: -5 },
    available: true
  },
  {
    id: 'table_tennis',
    name: '打乒乓球',
    description: '和亲戚打乒乓球（成功率80%）',
    successRate: 80,
    successChanges: { health: 5, spirit: 10, reputation: 8 },
    failChanges: { health: -3, spirit: -3 },
    available: true
  },
  {
    id: 'mahjong',
    name: '打麻将',
    description: '和亲戚打麻将（有输赢）',
    successRate: 50,
    successChanges: { spirit: 10, balance: 200, reputation: 5 },
    failChanges: { spirit: -5, balance: -200, reputation: -3 },
    available: true
  },
  {
    id: 'poker',
    name: '打牌',
    description: '和朋友们打牌（有输赢）',
    successRate: 50,
    successChanges: { spirit: 15, balance: 150 },
    failChanges: { spirit: -8, balance: -150 },
    available: true
  },
  {
    id: 'competition',
    name: '参加比赛',
    description: '参加社区/村里的比赛（成功率40%）',
    successRate: 40,
    successChanges: { spirit: 20, reputation: 15, balance: 500 },
    failChanges: { spirit: -10, reputation: -5 },
    available: true
  },
  {
    id: 'fireworks',
    name: '放烟花',
    description: '和家人一起放烟花（2线以下更常见）',
    successRate: 85,
    successChanges: { spirit: 15, reputation: 8, balance: -120 },
    failChanges: { spirit: -8, health: -3, balance: -120 },
    available: true,
    condition: (state) => ['tier3', 'tier4', 'tier5', 'tier6'].includes(state.attributes?.homeCity?.id)
  },
  {
    id: 'flower_market',
    name: '逛花街',
    description: '年味拉满，边逛边拍照（偏南方）',
    successRate: 80,
    successChanges: { spirit: 12, reputation: 10, balance: -180 },
    failChanges: { spirit: -5, balance: -180 },
    available: true,
    // 使用真实省份区域/标签
    condition: (state) => state.attributes?.homeProvince?.tags?.includes('flower_market')
  },
  {
    id: 'temple_fair',
    name: '逛庙会',
    description: '看表演、吃小吃，感受北方年味',
    successRate: 75,
    successChanges: { spirit: 10, reputation: 8, balance: -100 },
    failChanges: { spirit: -4, balance: -100 },
    available: true,
    condition: (state) => state.attributes?.homeProvince?.tags?.includes('temple_fair')
  },
  {
    id: 'ice_snow',
    name: '冰雪活动',
    description: '堆雪人、滑雪圈、打雪仗（北方/高寒地区）',
    successRate: 70,
    successChanges: { spirit: 18, health: 5, reputation: 6, balance: -120 },
    failChanges: { health: -6, spirit: -6, balance: -120 },
    available: true,
    condition: (state) => state.attributes?.homeProvince?.tags?.includes('ice_snow')
  },
  {
    id: 'shehuo',
    name: '看社火',
    description: '锣鼓、秧歌、舞龙舞狮，传统年味拉满',
    successRate: 78,
    successChanges: { spirit: 12, reputation: 10, balance: -80 },
    failChanges: { spirit: -3, balance: -80 },
    available: true,
    condition: (state) => state.attributes?.homeProvince?.tags?.includes('shehuo')
  }
]

// 根据属性动态调整事件选项和文案
function adaptEventByAttributes(event, state) {
  const adapted = {
    ...event,
    choices: event.choices ? event.choices.map(choice => ({ ...choice })) : undefined
  }

  const balance = state?.stats?.balance || 0
  const reputation = state?.stats?.reputation || 50
  const familyRelation = state?.attributes?.familyRelation?.value || 50
  const skills = (state?.attributes?.skills || []).map(s => s.id)
  const hasChildren = !!state?.attributes?.hasChildren

  // 亲戚借钱：按当前余额给出更现实选项
  if (adapted.id === 'relative_borrow') {
    if (balance >= 3000) {
      adapted.choices = [
        { id: 'lend', name: '借全额（2000）', changes: { balance: -2000, reputation: 20 }, specialScene: true },
        { id: 'lend_partial', name: '借一部分（800）', changes: { balance: -800, reputation: 10 }, specialScene: true },
        { id: 'refuse', name: '不借', changes: { reputation: -15 } }
      ]
    } else if (balance >= 1000) {
      adapted.choices = [
        { id: 'lend_partial', name: '借一部分（500）', changes: { balance: -500, reputation: 8 }, specialScene: true },
        { id: 'delay', name: '说过两天再看', changes: { reputation: -5, spirit: -3 } },
        { id: 'refuse', name: '不借', changes: { reputation: -12 } }
      ]
    } else {
      adapted.choices = [
        { id: 'explain_poor', name: '坦白自己也紧张', changes: { spirit: -5, reputation: -3 } },
        { id: 'delay', name: '先拖着', changes: { spirit: -3, reputation: -6 } },
        { id: 'refuse', name: '直接拒绝', changes: { reputation: -10 } }
      ]
    }
  }

  // 相亲：按社交属性和状态给出不同策略
  if (adapted.id === 'blind_date') {
    const baseChoices = [
      { id: 'go', name: '去见面', changes: { spirit: -18, reputation: 10, balance: -120 }, specialScene: true },
      { id: 'refuse', name: '不去', changes: { reputation: -12 } }
    ]

    if (skills.includes('social_butterfly')) {
      baseChoices.push({
        id: 'go_confident',
        name: '主动推进（社牛模式）',
        changes: { spirit: 8, reputation: 12, balance: -180 },
        specialScene: true
      })
    }

    if (skills.includes('social_anxiety')) {
      baseChoices.push({
        id: 'online_first',
        name: '先线上聊聊',
        changes: { spirit: -4, reputation: 4 },
        specialScene: true
      })
    }

    if (reputation >= 70 && familyRelation >= 70) {
      baseChoices.push({
        id: 'family_assist',
        name: '让父母先探口风',
        changes: { spirit: 0, reputation: 8 },
        specialScene: true
      })
    }

    adapted.choices = baseChoices
  }

  // 亲戚压力：有娃可“聊孩子转移火力”
  if (adapted.id === 'relative_pressure' && hasChildren) {
    adapted.choices = [
      ...(adapted.choices || []),
      {
        id: 'shift_to_child',
        name: '聊孩子转移火力',
        changes: { spirit: -2, reputation: 10 },
        specialScene: true
      }
    ]
  }

  return adapted
}

// 生成第3-7天的事件
export function generateDayEvents(day, state) {
  const events = {
    morning: [],
    noon: [],
    evening: []
  }

  // 初始化当天上下文（只在第3-7天使用）
  if (!state.progress.dayContext || state.progress.dayContext.day !== day) {
    const surpriseVisitChance = 0.45
    const surpriseSlot = Math.random() < surpriseVisitChance
      ? (Math.random() < 0.5 ? 'noon' : 'evening')
      : null
    state.progress.dayContext = {
      day,
      surpriseVisitSlot: surpriseSlot
    }
  }

  // 先按天定主线：出门 or 在家（不消耗体力）
  if (!state.progress.dayMode) {
    events.morning.push(
      {
        id: 'day_plan_out',
        name: '今天主打：出门拜年',
        description: '一整天都在外面奔波，串门/社交/活动为主',
        changes: {},
        available: true,
        noEnergyCost: true
      },
      {
        id: 'day_plan_home',
        name: '今天主打：宅家陪家人',
        description: '一整天都在家，休息/聊天/临时接待为主',
        changes: {},
        available: true,
        noEnergyCost: true
      }
    )
    return events
  }

  // 出门模式：以拜年和外出活动为主
  const visitOption = {
    id: 'visit_relatives',
    name: '走亲访友',
    description: '去亲戚家拜年',
    available: true,
    choices: RELATIVE_VISITS.map(rel => ({
      id: rel.id,
      name: rel.name,
      changes: { reputation: 0 }, // 根据年货动态调整
      useGoods: rel.useGoods || false
    }))
  }

  // 在家模式：宅家活动
  const stayHomeOptions = [
    {
      id: 'watch_tv',
      name: '陪父母看电视',
      description: '在家陪父母',
      changes: { spirit: 5, reputation: 5 },
      available: true
    },
    {
      id: 'farm_work',
      name: '干农活',
      description: '帮忙干农活（农村触发）',
      changes: { health: -10, reputation: 10 },
      available: state.attributes.homeCity?.id === 'tier6'
    },
    {
      id: 'read',
      name: '看书',
      description: '在家看书',
      changes: { spirit: 10 },
      available: true
    }
  ]
  
  // 随机事件（每天1-2个）
  const availableRandomEvents = RANDOM_EVENTS.filter(event => {
    if (event.condition) {
      return event.condition(state)
    }
    return true
  }).map(event => adaptEventByAttributes({
    ...event,
    available: true
  }, state))
  
  // 所有随机事件（已包含成功失败事件和地域春节活动）
  const allRandomEvents = [...availableRandomEvents]
  
  const selectedRandomEvents = []
  const randomCount = Math.floor(Math.random() * 2) + 1
  const shuffled = [...allRandomEvents].sort(() => Math.random() - 0.5)
  for (let i = 0; i < randomCount && i < shuffled.length; i++) {
    const event = shuffled[i]
    if (!selectedRandomEvents.find(e => e.id === event.id)) {
      selectedRandomEvents.push(event)
    }
  }
  
  const surpriseVisitEvent = {
    id: 'receive_relatives',
    name: '突发：亲戚上门',
    description: '你本来在家歇着，亲戚突然来串门了',
    changes: { reputation: 5 },
    available: true,
    checkCleaning: true
  }

  // 分配到三个时段（按天主线）
  if (state.progress.dayMode === 'out') {
    events.morning.push(visitOption, ...selectedRandomEvents.slice(0, 1))
    events.noon.push(visitOption, ...selectedRandomEvents.slice(1, 2))
    // 晚上也保留外出主线，避免随机事件不足导致空白
    events.evening.push(visitOption, ...selectedRandomEvents.slice(2, 3))
  } else {
    events.morning.push(...stayHomeOptions.filter(o => o.available))
    events.noon.push(...stayHomeOptions.filter(o => o.available), ...selectedRandomEvents.slice(0, 1))
    events.evening.push(...stayHomeOptions.filter(o => o.available), ...selectedRandomEvents.slice(1, 2))

    // 突发到访：不是玩家控制的主动选项
    const slot = state.progress.dayContext?.surpriseVisitSlot
    if (slot && events[slot]) {
      events[slot] = [surpriseVisitEvent]
    }
  }

  // 兜底：任何时段都至少有一个可选项，避免“没有更多选项”的死局
  const homeFallback = stayHomeOptions.filter(o => o.available)
  const fallbackList = state.progress.dayMode === 'out'
    ? [visitOption]
    : (homeFallback.length > 0 ? homeFallback : [visitOption])
  if (events.morning.length === 0) {
    events.morning.push(...fallbackList)
  }
  if (events.noon.length === 0) {
    events.noon.push(...fallbackList)
  }
  if (events.evening.length === 0) {
    events.evening.push(...fallbackList)
  }
  
  return events
}

// 第8天：返程准备
export const DAY_8_EVENTS = {
  morning: [
    {
      id: 'pack',
      name: '收拾行李',
      description: '整理返程的行李',
      changes: {},
      available: true
    },
    {
      id: 'buy_souvenirs',
      name: '买返程特产',
      description: '买点特产带回去',
      changes: { balance: -150, spirit: 5 }, // 随机100-300
      available: true,
      random: true
    },
    {
      id: 'rest',
      name: '躺平',
      description: '再休息一下',
      changes: { health: 5 },
      available: true
    }
  ],
  noon: [
    {
      id: 'farewell_meal',
      name: '吃告别饭',
      description: '和父母吃最后一顿饭',
      changes: { spirit: 0 }, // 根据家庭关系动态调整
      available: true,
      dynamic: true
    },
    {
      id: 'buy_return_ticket',
      name: '抢返程票',
      description: '提前抢返程的票',
      changes: { spirit: 0 }, // 成功+5，失败-10
      available: true,
      random: true
    },
    {
      id: 'repair',
      name: '帮父母修家电',
      description: '修修家里的电器',
      changes: { reputation: 10 },
      available: true
    }
  ],
  evening: [
    {
      id: 'heart_to_heart',
      name: '和父母聊心里话',
      description: '和父母深入交流',
      changes: { spirit: 10 },
      available: true
    },
    {
      id: 'check_work',
      name: '刷工作消息',
      description: '看看工作群的消息',
      changes: { spirit: -10 },
      available: true
    },
    {
      id: 'early_sleep',
      name: '早睡',
      description: '早点休息，明天要返程',
      changes: { health: 10, spirit: 5 },
      available: true
    }
  ]
}

// 获取某天的事件
export function getDayEvents(day, state) {
  const cloneEvents = (src) => ({
    morning: (src.morning || []).map(e => ({ ...e, choices: e.choices ? e.choices.map(c => ({ ...c })) : undefined })),
    noon: (src.noon || []).map(e => ({ ...e, choices: e.choices ? e.choices.map(c => ({ ...c })) : undefined })),
    evening: (src.evening || []).map(e => ({ ...e, choices: e.choices ? e.choices.map(c => ({ ...c })) : undefined }))
  })

  const adaptMaritalEvents = (events) => {
    const statusId = state?.attributes?.maritalStatus?.id
    const hasChildren = !!state?.attributes?.hasChildren

    ;['morning', 'noon', 'evening'].forEach(slot => {
      events[slot] = (events[slot] || []).map(event => {
        if (event.id === 'chat_love') {
          if (statusId === 'married' && hasChildren) {
            return { ...event, name: '和父母唠家常（聊孩子）', description: '聊孩子、教育和过年安排' }
          }
          if (statusId === 'married' && !hasChildren) {
            return { ...event, name: '和父母唠家常（聊催生）', description: '已婚后高频话题：什么时候要孩子' }
          }
          if (statusId === 'divorced') {
            return { ...event, name: '和父母唠家常（聊近况）', description: '聊聊最近状态和后续打算' }
          }
        }
        if (event.id === 'child_topic') {
          // 只有已婚时出现孩子/催生专属话题
          return { ...event, available: statusId === 'married' }
        }
        return event
      })
    })

    return events
  }

  if (day === 1) {
    return adaptMaritalEvents(cloneEvents(DAILY_EVENTS[1]))
  } else if (day === 2) {
    return adaptMaritalEvents(cloneEvents(DAILY_EVENTS[2]))
  } else if (day >= 3 && day <= 7) {
    return generateDayEvents(day, state)
  } else if (day === 8) {
    return DAY_8_EVENTS
  }
  return { morning: [], noon: [], evening: [] }
}

// 处理动态事件效果
export function processDynamicEvent(event, state, choice = null) {
  const changes = { ...event.changes }

  // 第3-7天先定当天主线（不消耗体力）
  if (event.id === 'day_plan_out') {
    state.progress.dayMode = 'out'
    return changes
  }
  if (event.id === 'day_plan_home') {
    state.progress.dayMode = 'home'
    return changes
  }
  
  // 处理年货使用（走亲访友）
  if (choice && choice.useGoods) {
    // 确保inventory存在
    if (!state.inventory) {
      state.inventory = { newYearGoods: 0, hasCleaned: false }
    }
    const goodsLevel = state.inventory.newYearGoods || 0
    if (goodsLevel === 0) {
      // 没买年货，空手去
      changes.reputation = (changes.reputation || 0) - 5
    } else if (goodsLevel === 1) {
      // 便宜年货
      changes.reputation = (changes.reputation || 0) + 5
    } else if (goodsLevel === 2) {
      // 中档年货
      changes.reputation = (changes.reputation || 0) + 10
    } else {
      // 高档年货
      changes.reputation = (changes.reputation || 0) + 15
    }
  }
  
  // 处理搞卫生检查（接待亲戚）
  if (event.checkCleaning) {
    // 确保inventory存在
    if (!state.inventory) {
      state.inventory = { newYearGoods: 0, hasCleaned: false }
    }
    if (!state.inventory.hasCleaned) {
      changes.reputation = (changes.reputation || 0) - 10
    }
  }
  
  // 根据家庭关系调整
  if (event.dynamic) {
    const familyRelation = state.attributes.familyRelation
    if (familyRelation) {
      const relationValue = familyRelation.value || 50
      
      // 聊天类事件（如果不是使用职业上下文）
      if ((event.id.includes('chat') || event.id === 'spring_festival_gala') && !event.useJobContext && !event.useMaritalContext) {
        changes.spirit = Math.floor((relationValue - 50) / 10) // -5到+5
        changes.reputation = relationValue > 60 ? 5 : -5
      }
      
      // 告别饭
      if (event.id === 'farewell_meal') {
        changes.spirit = Math.floor((relationValue - 50) / 5) // -10到+10
      }
      
      // 规划类
      if (event.id === 'plan') {
        changes.reputation = relationValue > 70 ? 5 : -5
      }
    }
  }
  
  // 处理有成功率的事件（比赛、打球、赌博等）
  if (event.successRate !== undefined) {
    const success = Math.random() * 100 < event.successRate
    if (success) {
      // 成功
      Object.keys(event.successChanges || {}).forEach(key => {
        changes[key] = (changes[key] || 0) + event.successChanges[key]
      })
      // 标记成功，用于场景描述
      changes._success = true
    } else {
      // 失败
      Object.keys(event.failChanges || {}).forEach(key => {
        changes[key] = (changes[key] || 0) + event.failChanges[key]
      })
      // 标记失败，用于场景描述
      changes._success = false
    }
  }
  
  // 处理随机事件
  if (event.random) {
    if (event.id === 'red_packet') {
      changes.balance = Math.floor(Math.random() * 51) // 0-50
    } else if (event.id === 'play_cards') {
      const win = Math.random() > 0.5
      const amount = Math.floor(Math.random() * 401) + 100 // 100-500
      changes.balance = win ? amount : -amount
      changes.spirit = win ? 10 : -10
    } else if (event.id === 'buy_souvenirs') {
      changes.balance = -(Math.floor(Math.random() * 201) + 100) // -100到-300
    } else if (event.id === 'buy_return_ticket') {
      const success = Math.random() * 100 < (event.successRate || 60)
      changes.spirit = success ? 5 : -10
      changes._success = success
    }
  }
  
  // 处理拜年红包（结合家庭经济剧情）
  if (event.id === 'new_year_parents') {
    const familyEconomy = state.attributes.familyEconomy
    const economyValue = familyEconomy?.value || 50
    const economyId = familyEconomy?.id || ''
    
    // 根据家庭经济决定收/发红包
    if (economyValue > 70 || economyId === 'well_off' || economyId === 'rich') {
      // 家庭条件好，收红包
      changes.balance = Math.floor(Math.random() * 401) + 100 // 100-500
    } else if (economyValue < 30 || economyId === 'destitute' || economyId === 'poor') {
      // 家庭条件差，可能需要给家里钱
      changes.balance = -(Math.floor(Math.random() * 501) + 300) // -300到-800
      changes.reputation = 15 // 帮助家里增加口碑
    } else {
      // 家庭条件一般，发红包
      changes.balance = -(Math.floor(Math.random() * 801) + 200) // -200到-1000
    }
  }
  
  return changes
}

// 处理库存变化
export function processInventoryChanges(event, state) {
  if (event.addInventory) {
    Object.keys(event.addInventory).forEach(key => {
      if (state.inventory.hasOwnProperty(key)) {
        state.inventory[key] = event.addInventory[key]
      }
    })
  }
  
  if (event.setInventory) {
    Object.keys(event.setInventory).forEach(key => {
      if (state.inventory.hasOwnProperty(key)) {
        state.inventory[key] = event.setInventory[key]
      }
    })
  }
}
