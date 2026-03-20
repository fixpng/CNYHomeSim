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
      },
      {
        id: 'paste_couplets',
        name: '贴春联',
        description: '和爸爸一起贴春联和福字',
        changes: { spirit: 10, reputation: 12, health: -5 },
        available: true,
        specialScene: true
      },
      {
        id: 'call_grandparents',
        name: '给远方亲人打电话',
        description: '给不能到场的亲人打个电话拜年',
        changes: { spirit: 8, reputation: 10 },
        available: true
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
      },
      {
        id: 'morning_exercise',
        name: '晨起锻炼',
        description: '新年第一天，做个早操',
        changes: { health: 12, spirit: 8 },
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
      },
      {
        id: 'red_packet_battle',
        name: '微信红包大战',
        description: '亲戚群里红包飞来飞去',
        changes: { spirit: 8, balance: 0 },
        available: true,
        random: true
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
      },
      {
        id: 'set_off_fireworks',
        name: '放鞭炮/烟花',
        description: '和家人一起在门口放鞭炮',
        changes: { spirit: 15, reputation: 8, balance: -100 },
        available: true
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
  },
  {
    id: 'maternal_grandparents',
    name: '去外公外婆家',
    cost: 0,
    reputation: 10,
    useGoods: true
  },
  {
    id: 'great_uncle',
    name: '去大伯家',
    cost: 0,
    reputation: 8,
    useGoods: true
  },
  {
    id: 'second_aunt',
    name: '去二姨家',
    cost: 0,
    reputation: 7,
    useGoods: true
  },
  {
    id: 'old_neighbor',
    name: '拜访老邻居',
    cost: 0,
    reputation: 6,
    useGoods: false
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
    // 使用真实省份标签触发地域活动
    condition: (state) => {
      return state.attributes?.homeProvince?.tags?.includes('flower_market')
    }
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
  },

  // ===== 新增随机事件 =====
  {
    id: 'childhood_friend',
    name: '偶遇发小',
    description: '在街上碰到了从小玩到大的发小',
    choices: [
      { id: 'catch_up', name: '坐下来好好聊聊', changes: { spirit: 15, health: -5, balance: -80 }, specialScene: true },
      { id: 'quick_hi', name: '打个招呼就走', changes: { spirit: 3, reputation: -3 } },
      { id: 'avoid', name: '装没看见', changes: { spirit: -5, reputation: -8 } }
    ],
    // 只有未触发过发小线时才出现
    condition: (state) => !state.storylines?.childhoodFriend
  },
  {
    id: 'childhood_friend_deep',
    name: '发小约你出去',
    description: '发小说有件事想和你聊聊',
    choices: [
      { id: 'listen', name: '认真听', changes: { spirit: 10, reputation: 5 }, specialScene: true },
      { id: 'advise', name: '给建议', changes: { spirit: 5, reputation: 10 }, specialScene: true },
      { id: 'decline', name: '说自己忙', changes: { spirit: -3, reputation: -5 } }
    ],
    condition: (state) => state.storylines?.childhoodFriend === 'met'
  },
  {
    id: 'stray_pet',
    name: '路边的流浪猫',
    description: '你在村口/小区门口看到了一只瘦巴巴的流浪猫',
    choices: [
      { id: 'adopt', name: '带回家暂养', changes: { spirit: 20, reputation: 5, balance: -50 }, specialScene: true },
      { id: 'feed', name: '喂点吃的', changes: { spirit: 10, balance: -20 }, specialScene: true },
      { id: 'ignore', name: '不管了', changes: { spirit: -5 } }
    ],
    condition: (state) => !state.storylines?.strayPet
  },
  {
    id: 'stray_pet_care',
    name: '照顾流浪猫',
    description: '你收养的小猫需要照顾',
    choices: [
      { id: 'vet', name: '带去看兽医', changes: { spirit: 10, balance: -200, reputation: 8 }, specialScene: true },
      { id: 'play', name: '陪它玩一会', changes: { spirit: 15, health: 5 }, specialScene: true },
      { id: 'find_owner', name: '帮它找新主人', changes: { spirit: 5, reputation: 15 }, specialScene: true }
    ],
    condition: (state) => state.storylines?.strayPet === 'found'
  },
  {
    id: 'village_gossip',
    name: '村里大新闻',
    description: '隔壁邻居家出了大事，全村都在议论',
    choices: [
      { id: 'listen_gossip', name: '听完八卦', changes: { spirit: 5, reputation: -3 }, specialScene: true },
      { id: 'help_neighbor', name: '去帮忙', changes: { health: -10, reputation: 15, spirit: 5 }, specialScene: true },
      { id: 'mind_own', name: '不掺和', changes: { spirit: 0 } }
    ]
  },
  {
    id: 'night_walk',
    name: '夜间散步',
    description: '吃完饭后出去走走，消消食',
    choices: [
      { id: 'walk_alone', name: '一个人走走', changes: { health: 8, spirit: 12 }, specialScene: true },
      { id: 'walk_parents', name: '和父母一起', changes: { health: 5, spirit: 8, reputation: 10 }, specialScene: true },
      { id: 'stay_home', name: '算了不出去了', changes: { spirit: -3 } }
    ]
  },
  {
    id: 'cook_special',
    name: '露一手',
    description: '在外面学的菜，做给家人尝尝',
    choices: [
      { id: 'cook_success', name: '用心做', changes: { health: -8, spirit: 15, reputation: 15, balance: -80 }, specialScene: true },
      { id: 'cook_simple', name: '做个简单的', changes: { health: -5, spirit: 8, reputation: 8, balance: -30 } }
    ],
    condition: (state) => {
      const skills = (state.attributes?.skills || []).map(s => s.id)
      return skills.includes('cooking')
    }
  },
  {
    id: 'family_photo',
    name: '拍全家福',
    description: '难得聚齐了，不如拍张全家福',
    choices: [
      { id: 'photo_pro', name: '认真拍一张', changes: { spirit: 15, reputation: 12 }, specialScene: true },
      { id: 'photo_casual', name: '随便拍一张', changes: { spirit: 8, reputation: 5 } },
      { id: 'photo_refuse', name: '算了吧', changes: { spirit: -5, reputation: -8 } }
    ]
  },
  {
    id: 'online_shopping_fail',
    name: '快递爆仓',
    description: '年前买的东西还没到，快递显示"爆仓中"',
    choices: [
      { id: 'wait', name: '继续等', changes: { spirit: -8 } },
      { id: 'complain', name: '打电话催', changes: { spirit: -5, health: -3 } },
      { id: 'go_buy', name: '算了去实体店买', changes: { spirit: -3, balance: -150 } }
    ]
  },
  {
    id: 'dream_project',
    name: '一个念头',
    description: '你突然有了一个创业/副业的想法',
    choices: [
      { id: 'think_deep', name: '认真想想', changes: { spirit: 15 }, specialScene: true },
      { id: 'tell_family', name: '跟家人说说', changes: { spirit: 5, reputation: -5 }, specialScene: true },
      { id: 'dismiss', name: '算了，不靠谱', changes: { spirit: -5 } }
    ],
    condition: (state) => !state.storylines?.dreamProject
  },
  {
    id: 'dream_project_plan',
    name: '继续想那个计划',
    description: '你的副业想法一直在脑子里转',
    choices: [
      { id: 'research', name: '上网查资料', changes: { spirit: 10, health: -5 }, specialScene: true },
      { id: 'find_partner', name: '找发小聊合作', changes: { spirit: 12, reputation: 5 }, specialScene: true },
      { id: 'give_up', name: '冷静了，算了', changes: { spirit: -8 } }
    ],
    condition: (state) => state.storylines?.dreamProject === 'idea'
  },
  {
    id: 'family_conflict',
    name: '家庭矛盾升级',
    description: '亲戚之间的老矛盾又被翻出来了',
    choices: [
      { id: 'mediate', name: '居中调解', changes: { spirit: -15, reputation: 20, health: -5 }, specialScene: true },
      { id: 'side_parents', name: '站在父母这边', changes: { spirit: -8, reputation: 5 }, specialScene: true },
      { id: 'stay_out', name: '两不相帮', changes: { spirit: -5, reputation: -10 } }
    ],
    condition: (state) => {
      const relation = state.attributes?.familyRelation?.value || 50
      return relation < 60 && !state.storylines?.familyConflict
    }
  },
  {
    id: 'family_conflict_resolve',
    name: '矛盾后续',
    description: '之前的家庭矛盾还没彻底解决',
    choices: [
      { id: 'apologize', name: '主动道歉和解', changes: { spirit: -5, reputation: 25 }, specialScene: true },
      { id: 'gift', name: '买点东西缓和', changes: { balance: -300, reputation: 15, spirit: 5 }, specialScene: true },
      { id: 'cold_war', name: '继续冷战', changes: { spirit: -15, reputation: -15 } }
    ],
    condition: (state) => state.storylines?.familyConflict === 'sparked'
  },
  {
    id: 'childhood_spot',
    name: '重访老地方',
    description: '经过小时候经常去的地方',
    choices: [
      { id: 'visit', name: '进去看看', changes: { spirit: 18, health: -3 }, specialScene: true },
      { id: 'photo_memory', name: '拍张照就走', changes: { spirit: 10 } },
      { id: 'pass_by', name: '匆匆路过', changes: { spirit: -3 } }
    ]
  },
  {
    id: 'help_elderly',
    name: '帮村里老人',
    description: '遇到村里的老人需要帮忙',
    choices: [
      { id: 'help_full', name: '帮到底', changes: { health: -12, reputation: 20, spirit: 10 }, specialScene: true },
      { id: 'help_quick', name: '帮一下就走', changes: { health: -5, reputation: 10, spirit: 5 } },
      { id: 'pretend_busy', name: '假装没看到', changes: { spirit: -8, reputation: -5 } }
    ]
  },
  {
    id: 'morning_run',
    name: '晨跑',
    description: '早起跑个步，呼吸一下家乡的空气',
    successRate: 75,
    successChanges: { health: 15, spirit: 12 },
    failChanges: { health: -5, spirit: -3 },
    available: true
  },
  {
    id: 'phone_call_friend',
    name: '远方朋友来电',
    description: '在外地的好朋友打来电话拜年',
    choices: [
      { id: 'long_chat', name: '聊很久', changes: { spirit: 15, health: -3 }, specialScene: true },
      { id: 'short_chat', name: '简单聊几句', changes: { spirit: 8 } },
      { id: 'miss_call', name: '没接到', changes: { spirit: -5 } }
    ]
  },
  {
    id: 'family_karaoke',
    name: '家庭KTV',
    description: '有人搬出了音响，全家开始唱歌',
    choices: [
      { id: 'sing', name: '上去唱一首', changes: { spirit: 18, reputation: 8 }, specialScene: true },
      { id: 'listen', name: '在旁边听', changes: { spirit: 10, reputation: 3 } },
      { id: 'escape_noise', name: '受不了，躲开', changes: { spirit: -5, reputation: -5 } }
    ]
  },
  {
    id: 'unexpected_money',
    name: '意外收入',
    description: '突然收到一笔意外之财',
    choices: [
      { id: 'keep', name: '收着', changes: { balance: 500, spirit: 10 }, specialScene: true },
      { id: 'share', name: '分给家人', changes: { balance: 200, reputation: 15, spirit: 8 }, specialScene: true },
      { id: 'donate', name: '捐了', changes: { reputation: 20, spirit: 12 }, specialScene: true }
    ],
    // 低概率事件通过随机选取控制
  },
  {
    id: 'argument_with_parents',
    name: '和父母吵架',
    description: '因为一些事情和父母产生了分歧',
    choices: [
      { id: 'calm_down', name: '深呼吸，冷静下来', changes: { spirit: -10, reputation: 5 }, specialScene: true },
      { id: 'argue_back', name: '据理力争', changes: { spirit: -20, reputation: -15 }, specialScene: true },
      { id: 'walk_away', name: '出去冷静一下', changes: { spirit: -8, reputation: -5 }, specialScene: true }
    ],
    condition: (state) => {
      const relation = state.attributes?.familyRelation?.value || 50
      return relation < 70
    }
  },

  // ===== 第二轮新增随机事件 =====
  {
    id: 'local_market',
    name: '赶集',
    description: '跟着爸妈去赶集/逛市场',
    choices: [
      { id: 'buy_stuff', name: '买点东西', changes: { spirit: 10, balance: -120, reputation: 5 }, specialScene: true },
      { id: 'just_look', name: '只逛不买', changes: { spirit: 8 } },
      { id: 'treat_parents', name: '请爸妈吃小吃', changes: { spirit: 12, balance: -60, reputation: 10 }, specialScene: true }
    ]
  },
  {
    id: 'new_year_movie',
    name: '看春节档电影',
    description: '带家人去看春节档大片',
    choices: [
      { id: 'watch_together', name: '带全家去', changes: { spirit: 15, balance: -200, reputation: 10 }, specialScene: true },
      { id: 'watch_alone', name: '自己去看', changes: { spirit: 12, balance: -50 } },
      { id: 'skip', name: '算了不看了', changes: { spirit: -3 } }
    ]
  },
  {
    id: 'temple_visit',
    name: '去庙里拜拜',
    description: '新年去庙里祈福',
    choices: [
      { id: 'pray_serious', name: '认真拜一拜', changes: { spirit: 15, balance: -50, reputation: 8 }, specialScene: true },
      { id: 'pray_quick', name: '随便看看', changes: { spirit: 8, balance: -20 } },
      { id: 'buy_charm', name: '买个护身符', changes: { spirit: 10, balance: -80, reputation: 5 }, specialScene: true }
    ],
    condition: (state) => {
      const tags = state.attributes?.homeProvince?.tags || []
      return tags.includes('temple_fair') || tags.includes('flower_market') || Math.random() < 0.5
    }
  },
  {
    id: 'hometown_change',
    name: '发现家乡变化',
    description: '走在路上，发现家乡变了不少',
    choices: [
      { id: 'feel_good', name: '拍照记录', changes: { spirit: 12 }, specialScene: true },
      { id: 'feel_sad', name: '有点感慨', changes: { spirit: -5 }, specialScene: true },
      { id: 'ask_parents', name: '问问爸妈', changes: { spirit: 8, reputation: 5 }, specialScene: true }
    ]
  },
  {
    id: 'secret_snack',
    name: '偷吃零食',
    description: '趁家人不注意，偷偷吃零食',
    choices: [
      { id: 'eat_lots', name: '放开吃', changes: { health: -5, spirit: 12 } },
      { id: 'eat_little', name: '吃一点点', changes: { spirit: 5 } },
      { id: 'share', name: '叫上家人一起吃', changes: { spirit: 8, reputation: 5 } }
    ]
  },
  {
    id: 'social_media_post',
    name: '发朋友圈',
    description: '过年了，发个朋友圈记录一下',
    choices: [
      { id: 'post_family', name: '发全家福/团圆照', changes: { spirit: 10, reputation: 8 }, specialScene: true },
      { id: 'post_food', name: '发美食', changes: { spirit: 8, reputation: 3 } },
      { id: 'post_nothing', name: '算了不发了', changes: { spirit: -3 } }
    ]
  },
  {
    id: 'pet_reunion',
    name: '小猫认主',
    description: '你养的小猫变得特别依赖你',
    choices: [
      { id: 'cuddle', name: '抱着它不放', changes: { spirit: 18, health: 3 }, specialScene: true },
      { id: 'worry_leave', name: '想到要走有点难过', changes: { spirit: -5 }, specialScene: true }
    ],
    condition: (state) => state.storylines?.strayPet === 'found'
  },
  {
    id: 'dream_friend_collab',
    name: '发小聊合作',
    description: '发小对你的副业想法很感兴趣',
    choices: [
      { id: 'plan_together', name: '一起做计划', changes: { spirit: 20, reputation: 5 }, specialScene: true },
      { id: 'cautious', name: '先各自想想', changes: { spirit: 8 } }
    ],
    condition: (state) => state.storylines?.dreamProject === 'idea' && state.storylines?.childhoodFriend === 'resolved'
  },
  {
    id: 'sudden_rain',
    name: '突然下雨/下雪',
    description: '天气突变，计划被打乱',
    choices: [
      { id: 'stay_cozy', name: '在家窝着', changes: { spirit: 8, health: 5 } },
      { id: 'go_anyway', name: '冒雨/雪出门', changes: { spirit: 5, health: -8 }, specialScene: true },
      { id: 'watch_rain', name: '站门口看雨/雪', changes: { spirit: 12 }, specialScene: true }
    ]
  },
  {
    id: 'parent_cooking_battle',
    name: '爸妈厨艺PK',
    description: '爸爸妈妈争着做菜，你当评委',
    choices: [
      { id: 'dad_wins', name: '说爸爸做的好吃', changes: { spirit: 10, reputation: -3 }, specialScene: true },
      { id: 'mom_wins', name: '说妈妈做的好吃', changes: { spirit: 10, reputation: -3 }, specialScene: true },
      { id: 'both_good', name: '都好吃！', changes: { spirit: 12, reputation: 8 }, specialScene: true }
    ]
  },
  {
    id: 'wifi_down',
    name: '断网了',
    description: '家里WiFi突然断了',
    choices: [
      { id: 'fix_wifi', name: '研究半天修好了', changes: { spirit: 5, reputation: 15, health: -3 } },
      { id: 'use_data', name: '用流量', changes: { spirit: -5, balance: -20 } },
      { id: 'go_offline', name: '干脆不上网了', changes: { spirit: 8, health: 5 } }
    ]
  },

  // ===== 第三轮新增随机事件（提升重玩性） =====
  {
    id: 'work_emergency',
    name: '工作突发状况',
    description: '老板假期突然打来电话，说有个急事要处理',
    choices: [
      { id: 'handle_remote', name: '远程处理', changes: { spirit: -15, health: -5, reputation: 10, balance: 300 }, specialScene: true },
      { id: 'pretend_miss', name: '假装没看到', changes: { spirit: 8, balance: -100 } },
      { id: 'refuse_directly', name: '直接拒绝', changes: { spirit: 10, reputation: -12 }, specialScene: true }
    ],
    condition: (state) => {
      const workUnit = state.attributes?.workUnit?.id || ''
      return workUnit !== ''
    }
  },
  {
    id: 'family_sick',
    name: '家人身体不适',
    description: '家里有人突然说不舒服，脸色不太好',
    choices: [
      { id: 'go_hospital', name: '陪去医院', changes: { spirit: -8, health: -10, balance: -350, reputation: 18 }, specialScene: true },
      { id: 'buy_medicine', name: '买药回来', changes: { spirit: -3, balance: -100, reputation: 8 } },
      { id: 'suggest_rest', name: '劝他们多休息', changes: { reputation: -5 } }
    ]
  },
  {
    id: 'ex_encounter',
    name: '前任偶遇',
    description: '在街上偶遇了前任，对方也看到了你',
    choices: [
      { id: 'say_hello', name: '礼貌打招呼', changes: { spirit: -3, reputation: 5 }, specialScene: true },
      { id: 'pretend_not_see', name: '装没看见', changes: { spirit: -8 } },
      { id: 'sit_and_chat', name: '坐下来聊聊', changes: { spirit: -10, reputation: -5, health: -3 }, specialScene: true }
    ],
    condition: (state) => state.attributes?.ageRange?.id !== 'young'
  },
  {
    id: 'unexpected_visitor',
    name: '远方亲戚突然来访',
    description: '一个很久没联系的远房亲戚突然登门拜访',
    choices: [
      { id: 'warm_welcome', name: '热情接待', changes: { spirit: -5, balance: -200, reputation: 15 }, specialScene: true },
      { id: 'simple_host', name: '简单招待', changes: { spirit: -3, balance: -50, reputation: 5 } },
      { id: 'excuse_busy', name: '推说有事', changes: { spirit: 3, reputation: -10 } }
    ]
  },
  {
    id: 'childhood_teacher',
    name: '偶遇小学老师',
    description: '在镇上碰到了小学老师，头发白了不少',
    choices: [
      { id: 'greet_teacher', name: '上前打招呼', changes: { spirit: 12, reputation: 8 }, specialScene: true },
      { id: 'avoid_teacher', name: '假装没看见', changes: { spirit: -8 } },
      { id: 'treat_teacher', name: '请老师吃饭', changes: { spirit: 15, balance: -200, reputation: 15 }, specialScene: true }
    ]
  },
  {
    id: 'power_outage',
    name: '停电了',
    description: '正看着电视呢，突然全屋黑了',
    choices: [
      { id: 'candle_chat', name: '点蜡烛聊天', changes: { spirit: 15, reputation: 10 }, specialScene: true },
      { id: 'go_out', name: '出门逛逛', changes: { spirit: 5, health: -3 } },
      { id: 'play_phone', name: '刷手机等来电', changes: { spirit: -8, health: -3 } }
    ]
  },
  {
    id: 'online_gossip',
    name: '亲戚群里吵起来了',
    description: '家族微信群突然炸了，两个亲戚吵得不可开交',
    choices: [
      { id: 'peacemaker', name: '当和事佬', changes: { spirit: -8, reputation: 12 }, specialScene: true },
      { id: 'quit_group', name: '退出群聊', changes: { spirit: 8, reputation: -10 } },
      { id: 'watch_drama', name: '吃瓜看戏', changes: { spirit: 3, reputation: -2 } }
    ]
  },
  {
    id: 'talent_show',
    name: '被拉去表演节目',
    description: '村里/小区搞联欢，有人把你推上了台',
    choices: [
      { id: 'perform', name: '大方表演', changes: { spirit: 15, reputation: 12 }, specialScene: true },
      { id: 'decline_politely', name: '推辞婉拒', changes: { spirit: -3, reputation: -5 } },
      { id: 'drag_others', name: '拉别人一起', changes: { spirit: 10, reputation: 5 }, specialScene: true }
    ],
    condition: (state) => {
      const skills = (state.attributes?.skills || []).map(s => s.id)
      return skills.length > 0
    }
  },
  {
    id: 'lost_wallet',
    name: '钱包丢了',
    description: '出门回来发现钱包不见了，翻遍口袋都没有',
    choices: [
      { id: 'search_carefully', name: '仔细找找', changes: { spirit: -5, health: -5 }, specialScene: true, successRate: 80, successChanges: { spirit: 10 }, failChanges: { balance: -350, spirit: -15 } },
      { id: 'accept_loss', name: '认了吧', changes: { spirit: -10, balance: -300 } },
      { id: 'ask_family', name: '问问家人', changes: { spirit: 3, balance: -50, reputation: -3 }, specialScene: true }
    ]
  },
  {
    id: 'neighbor_conflict',
    name: '邻居纠纷',
    description: '隔壁两家因为一点小事吵了起来，有人喊你帮忙评评理',
    choices: [
      { id: 'mediate_neighbors', name: '帮忙调解', changes: { spirit: -8, reputation: 15, health: -3 }, specialScene: true },
      { id: 'stay_away', name: '不掺和', changes: { spirit: 0 } },
      { id: 'smooth_talk', name: '两边说好话', changes: { spirit: -5, reputation: 8 }, specialScene: true, successRate: 60, successChanges: { reputation: 10 }, failChanges: { reputation: -8 } }
    ]
  },
  {
    id: 'drunk_relative',
    name: '亲戚喝多了',
    description: '聚会上有个亲戚喝高了，开始胡说八道',
    choices: [
      { id: 'send_home', name: '送他回家', changes: { spirit: -10, health: -8, reputation: 15 }, specialScene: true },
      { id: 'call_family', name: '叫家属来接', changes: { spirit: -3, reputation: 3 } },
      { id: 'ignore_drunk', name: '不管他', changes: { reputation: -8 } }
    ],
    condition: (state) => state.progress?.day >= 3
  },
  {
    id: 'social_media_viral',
    name: '发的朋友圈火了',
    description: '之前发的一条朋友圈突然收到几百个赞和评论',
    choices: [
      { id: 'keep_interacting', name: '继续互动', changes: { spirit: 10, reputation: 5 } },
      { id: 'delete_post', name: '删掉算了', changes: { spirit: -5 } },
      { id: 'screenshot', name: '截图纪念', changes: { spirit: 5 } }
    ],
    condition: (state) => (state.diary || []).some(entry => (entry.text || '').includes('发朋友圈'))
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
    },
    {
      id: 'nap',
      name: '午睡补觉',
      description: '饭后躺一会，充充电',
      changes: { health: 10, spirit: 5 },
      available: true
    },
    {
      id: 'tidy_old_stuff',
      name: '翻翻旧物',
      description: '整理房间时发现以前的东西',
      changes: { spirit: 12 },
      available: true,
      specialScene: true
    },
    {
      id: 'video_games',
      name: '打游戏',
      description: '拿出手机/电脑打两把',
      changes: { spirit: 10, reputation: -3 },
      available: true
    },
    {
      id: 'help_parents_chores',
      name: '帮父母做家务',
      description: '洗洗碗、拖拖地',
      changes: { health: -8, reputation: 12, spirit: 3 },
      available: true
    },
    {
      id: 'cook_lunch',
      name: '做顿饭',
      description: '中午给家人做顿饭',
      changes: { health: -5, reputation: 10, spirit: 5 },
      available: true
    },
    {
      id: 'old_photo_album',
      name: '翻老照片',
      description: '翻出了家里的老相册',
      changes: { spirit: 15, reputation: 5 },
      available: true,
      specialScene: true
    }
  ]
  
  // 随机事件（每天1-3个，后期增加频率）
  const availableRandomEvents = RANDOM_EVENTS.filter(event => {
    if (event.condition) {
      return event.condition(state)
    }
    return true
  }).filter(event => {
    // 过滤掉已触发的一次性剧情线事件
    const storylineEvents = ['childhood_friend', 'stray_pet', 'family_conflict', 'dream_project']
    if (storylineEvents.includes(event.id)) {
      // 一次性事件只触发一次
      return !(state.triggeredRandomEvents || []).includes(event.id)
    }
    // 续集事件根据condition过滤即可
    return true
  }).map(event => adaptEventByAttributes({
    ...event,
    available: true
  }, state))
  
  // 所有随机事件（已包含成功失败事件和地域春节活动）
  const allRandomEvents = [...availableRandomEvents]
  
  const selectedRandomEvents = []
  // 后期天数（第5-7天）更多随机事件
  const baseCount = day >= 5 ? 2 : 1
  const randomCount = Math.floor(Math.random() * 2) + baseCount
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
  const availableHomeOptions = stayHomeOptions.filter(o => o.available)
  // 每个时段随机选3-4个宅家选项，保持新鲜感
  const pickHomeOptions = (count = 3) => {
    const shuffled = [...availableHomeOptions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(count, shuffled.length))
  }

  if (state.progress.dayMode === 'out') {
    // 出门模式：走亲访友 + 随机选4-5个亲戚（不是全部）
    const shuffledVisits = [...RELATIVE_VISITS].sort(() => Math.random() - 0.5).slice(0, Math.min(5, RELATIVE_VISITS.length))
    const outVisitOption = {
      ...visitOption,
      choices: shuffledVisits.map(rel => ({
        id: rel.id,
        name: rel.name,
        changes: { reputation: 0 },
        useGoods: rel.useGoods || false
      }))
    }
    events.morning.push(outVisitOption, ...selectedRandomEvents.slice(0, 1))
    events.noon.push(outVisitOption, ...selectedRandomEvents.slice(1, 2))
    events.evening.push(outVisitOption, ...selectedRandomEvents.slice(2, 3))
  } else {
    events.morning.push(...pickHomeOptions(3))
    events.noon.push(...pickHomeOptions(3), ...selectedRandomEvents.slice(0, 1))
    events.evening.push(...pickHomeOptions(3), ...selectedRandomEvents.slice(1, 2))

    // 突发到访：不是玩家控制的主动选项
    const slot = state.progress.dayContext?.surpriseVisitSlot
    if (slot && events[slot]) {
      events[slot] = [surpriseVisitEvent]
    }
  }

  // 兜底：任何时段都至少有一个可选项，避免”没有更多选项”的死局
  const homeFallback = availableHomeOptions.slice(0, 3)
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
    },
    {
      id: 'clean_room',
      name: '收拾房间',
      description: '走之前把自己房间收拾干净',
      changes: { health: -5, reputation: 10, spirit: 3 },
      available: true
    },
    {
      id: 'morning_walk_last',
      name: '最后的晨走',
      description: '在家附近走走，再看看家乡的样子',
      changes: { health: 5, spirit: 15 },
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
    },
    {
      id: 'give_parents_money',
      name: '偷偷留钱给父母',
      description: '在枕头底下/抽屉里偷偷放点钱',
      changes: { balance: -500, reputation: 20, spirit: 10 },
      available: true
    },
    {
      id: 'teach_parents_phone',
      name: '教父母用手机',
      description: '教父母怎么视频通话、发微信',
      changes: { health: -3, reputation: 15, spirit: 8 },
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
    },
    {
      id: 'write_letter',
      name: '给父母写一封信',
      description: '把说不出口的话写下来',
      changes: { spirit: 20, reputation: 15 },
      available: true
    },
    {
      id: 'last_night_walk',
      name: '最后的夜间散步',
      description: '在家门口走走，看看星空',
      changes: { spirit: 15, health: 3 },
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
  
  // 处理多日剧情线推进
  if (!state.storylines) {
    state.storylines = { childhoodFriend: null, strayPet: null, familyConflict: null, dreamProject: null }
  }
  if (!state.triggeredRandomEvents) {
    state.triggeredRandomEvents = []
  }

  if (event.id === 'childhood_friend' && choice && choice.id === 'catch_up') {
    state.storylines.childhoodFriend = 'met'
    if (!state.triggeredRandomEvents.includes('childhood_friend')) {
      state.triggeredRandomEvents.push('childhood_friend')
    }
  }
  if (event.id === 'childhood_friend_deep' && choice && (choice.id === 'listen' || choice.id === 'advise')) {
    state.storylines.childhoodFriend = 'resolved'
  }
  if (event.id === 'stray_pet' && choice && (choice.id === 'adopt' || choice.id === 'feed')) {
    state.storylines.strayPet = choice.id === 'adopt' ? 'found' : 'fed'
    if (!state.triggeredRandomEvents.includes('stray_pet')) {
      state.triggeredRandomEvents.push('stray_pet')
    }
  }
  if (event.id === 'stray_pet_care') {
    state.storylines.strayPet = 'resolved'
  }
  if (event.id === 'family_conflict' && choice && (choice.id === 'mediate' || choice.id === 'side_parents')) {
    state.storylines.familyConflict = 'sparked'
    if (!state.triggeredRandomEvents.includes('family_conflict')) {
      state.triggeredRandomEvents.push('family_conflict')
    }
  }
  if (event.id === 'family_conflict_resolve') {
    state.storylines.familyConflict = 'resolved'
  }
  if (event.id === 'dream_project' && choice && (choice.id === 'think_deep' || choice.id === 'tell_family')) {
    state.storylines.dreamProject = 'idea'
    if (!state.triggeredRandomEvents.includes('dream_project')) {
      state.triggeredRandomEvents.push('dream_project')
    }
  }
  if (event.id === 'dream_project_plan') {
    state.storylines.dreamProject = 'resolved'
  }
  if (event.id === 'dream_friend_collab' && choice && choice.id === 'plan_together') {
    state.storylines.dreamProject = 'resolved'
  }
  if (event.id === 'pet_reunion') {
    state.storylines.strayPet = 'resolved'
  }

  // 处理红包大战
  if (event.id === 'red_packet_battle') {
    changes.balance = Math.floor(Math.random() * 101) + 20 // 20-120
    changes.spirit = 8
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
