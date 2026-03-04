// 特殊剧情系统（低数值触发、特殊事件触发、刚回到家剧情）

// 生成"刚回到家"的特殊剧情
export function generateHomecomingScene(state) {
  const familyRelation = state.attributes?.familyRelation
  const familyEconomy = state.attributes?.familyEconomy
  const job = state.attributes?.job
  const salaryRange = state.attributes?.salaryRange
  const ageRange = state.attributes?.ageRange
  const maritalStatus = state.attributes?.maritalStatus
  const balance = state.stats.balance
  
  // 计算薪资水平
  const avgSalary = salaryRange ? (salaryRange.min + salaryRange.max) / 2 : 0
  const isHighSalary = avgSalary >= 18000
  const isMidSalary = avgSalary >= 5000 && avgSalary < 18000
  const isLowSalary = avgSalary < 5000
  
  // 判断年龄
  const isYoung = ageRange?.id === '20_25' || ageRange?.id === '26_30'
  const isMiddle = ageRange?.id === '31_40'
  const isOld = ageRange?.id === '41_50'
  
  // 判断是否单身
  const isSingle = maritalStatus?.id === 'single'
  
  // 家庭关系值
  const relationValue = familyRelation?.value || 50
  
  // 根据家庭关系、财力、自身条件生成场景
  let scene = ''
  let thoughts = ''
  let effects = {
    health: 0,
    spirit: 0,
    balance: 0,
    reputation: 0
  }
  
  // 家庭关系很好 + 家庭经济好
  if (relationValue >= 80 && (familyEconomy?.id === 'well_off' || familyEconomy?.id === 'rich' || familyEconomy?.id === 'very_rich')) {
    if (isHighSalary) {
      scene = '你推开家门，爸妈已经在门口等着了。\n\n"回来了！"妈妈笑着接过你的行李。\n\n"工作怎么样？累不累？"爸爸关心地问。\n\n"还行，就是有点忙。"你笑着说。\n\n"回来就好，回来就好。"妈妈拍拍你的肩膀，"今年在家多待几天，好好休息。"'
      thoughts = '回到家真好，爸妈还是那么关心我。'
      effects.spirit = 10
      effects.reputation = 5
    } else if (isMidSalary) {
      scene = '你推开家门，爸妈已经在门口等着了。\n\n"回来了！"妈妈笑着接过你的行李。\n\n"工作怎么样？"爸爸问。\n\n"还行，就是工资一般。"你有点不好意思。\n\n"没事，慢慢来。"妈妈安慰你，"回来就好，在家好好休息。"'
      thoughts = '回到家真好，虽然工资不高，但爸妈还是很关心我。'
      effects.spirit = 8
      effects.reputation = 3
    } else {
      scene = '你推开家门，爸妈已经在门口等着了。\n\n"回来了！"妈妈笑着接过你的行李。\n\n"工作怎么样？"爸爸问。\n\n"还行吧..."你有点尴尬。\n\n"没事，慢慢来。"妈妈安慰你，"回来就好，在家好好休息，别想太多。"'
      thoughts = '回到家真好，虽然工资不高，但爸妈还是很关心我。'
      effects.spirit = 5
      effects.reputation = 2
    }
  }
  // 家庭关系很好 + 家庭经济一般/差
  else if (relationValue >= 80) {
    if (isHighSalary) {
      scene = '你推开家门，爸妈已经在门口等着了。\n\n"回来了！"妈妈笑着接过你的行李。\n\n"工作怎么样？累不累？"爸爸关心地问。\n\n"还行，就是有点忙。"你笑着说。\n\n"回来就好，回来就好。"妈妈拍拍你的肩膀，"今年在家多待几天，好好休息。"\n\n虽然家里经济条件一般，但看到你回来，他们还是很开心。'
      thoughts = '回到家真好，爸妈还是那么关心我。'
      effects.spirit = 10
      effects.reputation = 5
    } else if (isMidSalary) {
      scene = '你推开家门，爸妈已经在门口等着了。\n\n"回来了！"妈妈笑着接过你的行李。\n\n"工作怎么样？"爸爸问。\n\n"还行，就是工资一般。"你有点不好意思。\n\n"没事，慢慢来。"妈妈安慰你，"回来就好，在家好好休息。"'
      thoughts = '回到家真好，虽然工资不高，但爸妈还是很关心我。'
      effects.spirit = 8
      effects.reputation = 3
    } else {
      scene = '你推开家门，爸妈已经在门口等着了。\n\n"回来了！"妈妈笑着接过你的行李。\n\n"工作怎么样？"爸爸问。\n\n"还行吧..."你有点尴尬。\n\n"没事，慢慢来。"妈妈安慰你，"回来就好，在家好好休息，别想太多。"'
      thoughts = '回到家真好，虽然工资不高，但爸妈还是很关心我。'
      effects.spirit = 5
      effects.reputation = 2
    }
  }
  // 家庭关系一般 + 家庭经济好
  else if (relationValue >= 50 && (familyEconomy?.id === 'well_off' || familyEconomy?.id === 'rich' || familyEconomy?.id === 'very_rich')) {
    if (isHighSalary) {
      scene = '你推开家门，爸妈在客厅坐着。\n\n"回来了。"妈妈抬头看了你一眼。\n\n"嗯，回来了。"你放下行李。\n\n"工作怎么样？"爸爸问。\n\n"还行。"你简单回答。\n\n"回来就好。"妈妈点点头，"先去休息吧。"'
      thoughts = '回到家了，虽然关系一般，但还算正常。'
      effects.spirit = 5
      effects.reputation = 2
    } else {
      scene = '你推开家门，爸妈在客厅坐着。\n\n"回来了。"妈妈抬头看了你一眼。\n\n"嗯，回来了。"你放下行李。\n\n"工作怎么样？"爸爸问。\n\n"还行吧..."你有点尴尬。\n\n"回来就好。"妈妈点点头，"先去休息吧。"'
      thoughts = '回到家了，虽然关系一般，但还算正常。'
      effects.spirit = 3
      effects.reputation = 1
    }
  }
  // 家庭关系一般 + 家庭经济一般/差
  else if (relationValue >= 50) {
    if (isHighSalary) {
      scene = '你推开家门，爸妈在客厅坐着。\n\n"回来了。"妈妈抬头看了你一眼。\n\n"嗯，回来了。"你放下行李。\n\n"工作怎么样？"爸爸问。\n\n"还行。"你简单回答。\n\n"回来就好。"妈妈点点头，"先去休息吧。"'
      thoughts = '回到家了，虽然关系一般，但还算正常。'
      effects.spirit = 5
      effects.reputation = 2
    } else {
      scene = '你推开家门，爸妈在客厅坐着。\n\n"回来了。"妈妈抬头看了你一眼。\n\n"嗯，回来了。"你放下行李。\n\n"工作怎么样？"爸爸问。\n\n"还行吧..."你有点尴尬。\n\n"回来就好。"妈妈点点头，"先去休息吧。"'
      thoughts = '回到家了，虽然关系一般，但还算正常。'
      effects.spirit = 3
      effects.reputation = 1
    }
  }
  // 家庭关系差
  else {
    if (isHighSalary) {
      scene = '你推开家门，爸妈在客厅坐着，但没看你。\n\n"回来了。"你主动打招呼。\n\n"嗯。"妈妈淡淡地应了一声。\n\n"工作怎么样？"爸爸问，但语气很平淡。\n\n"还行。"你简单回答。\n\n"回来就好。"妈妈说完就继续看电视了。'
      thoughts = '回到家了，但感觉气氛有点冷。'
      effects.spirit = -5
      effects.reputation = -2
    } else {
      scene = '你推开家门，爸妈在客厅坐着，但没看你。\n\n"回来了。"你主动打招呼。\n\n"嗯。"妈妈淡淡地应了一声。\n\n"工作怎么样？"爸爸问，但语气很平淡。\n\n"还行吧..."你有点尴尬。\n\n"回来就好。"妈妈说完就继续看电视了。'
      thoughts = '回到家了，但感觉气氛有点冷，可能是因为我工资不高吧。'
      effects.spirit = -8
      effects.reputation = -3
    }
  }
  
  // 根据年龄和婚姻状态添加额外对话
  if (isSingle && isYoung) {
    scene += '\n\n"什么时候带个对象回来？"妈妈突然问。\n\n"这个..."你有点尴尬，"还没遇到合适的。"'
    thoughts += '又被催婚了...'
    effects.spirit -= 3
  } else if (isSingle && isMiddle) {
    scene += '\n\n"都这么大了，还不找对象？"妈妈有点不满。\n\n"这个..."你有点尴尬，"工作忙，没时间。"'
    thoughts += '又被催婚了，压力好大...'
    effects.spirit -= 5
    effects.reputation -= 2
  }
  
  // 根据余额和家庭经济添加额外对话和给钱逻辑
  if (balance < 1000) {
    // 手头紧，如果家庭经济好，父母会给钱
    if (familyEconomy?.id === 'well_off' || familyEconomy?.id === 'rich' || familyEconomy?.id === 'very_rich') {
      let moneyAmount = 0
      if (familyEconomy.id === 'very_rich') {
        moneyAmount = Math.floor(Math.random() * 5000) + 5000 // 5000-10000
        scene += '\n\n"今年手头有点紧..."你小声说。\n\n"没事，家里还有点钱，先用着。"妈妈说着，从包里拿出一沓钱，"这是' + moneyAmount + '，你先用着，不够再说。"'
        thoughts += '虽然没钱，但爸妈还是愿意帮我，给了' + moneyAmount + '元。'
      } else if (familyEconomy.id === 'rich') {
        moneyAmount = Math.floor(Math.random() * 3000) + 3000 // 3000-6000
        scene += '\n\n"今年手头有点紧..."你小声说。\n\n"没事，家里还有点钱，先用着。"妈妈说着，从包里拿出一些钱，"这是' + moneyAmount + '，你先用着。"'
        thoughts += '虽然没钱，但爸妈还是愿意帮我，给了' + moneyAmount + '元。'
      } else {
        moneyAmount = Math.floor(Math.random() * 2000) + 2000 // 2000-4000
        scene += '\n\n"今年手头有点紧..."你小声说。\n\n"没事，家里还有点钱，先用着。"妈妈说着，从包里拿出一些钱，"这是' + moneyAmount + '，你先用着。"'
        thoughts += '虽然没钱，但爸妈还是愿意帮我，给了' + moneyAmount + '元。'
      }
      effects.balance = moneyAmount
      effects.spirit += 5
      effects.reputation += 3
    } else {
      // 家庭经济一般或差，只是安慰
      scene += '\n\n"今年手头有点紧..."你小声说。\n\n"没事，慢慢来，家里虽然不宽裕，但还能过得去。"妈妈安慰你。'
      thoughts += '虽然没钱，但爸妈还是愿意安慰我。'
      effects.spirit += 3
      effects.reputation += 2
    }
  } else if (balance >= 10000) {
    scene += '\n\n"今年工作还不错，手头有点余钱。"你笑着说。\n\n"那就好，那就好。"爸妈听了很高兴。'
    thoughts += '看到爸妈为我高兴，我也很开心。'
    effects.spirit += 5
    effects.reputation += 3
  }
  
  return {
    scene,
    thoughts,
    effects
  }
}

// 低数值触发剧情
export function checkLowStatsTriggers(state) {
  const triggers = []
  
  // 确保triggeredLowStats数组存在
  if (!state.triggeredLowStats) {
    state.triggeredLowStats = []
  }

  // 重大剧情：健康濒危
  if (state.stats.health < 12 && state.stats.health >= 0 && !state.triggeredLowStats.includes('crisis_health')) {
    triggers.push({
      type: 'crisis_health',
      severity: 'critical',
      scene: '你眼前一黑，耳边嗡的一声，差点在走廊上直接栽倒。\n\n爸妈慌了："你这不是累，是快撑不住了！"\n\n你被连夜带去诊所，医生皱着眉头说："再硬扛，年后就得躺着上班。"',
      thoughts: '我一直以为自己能扛，原来身体早就发了最后通牒。',
      effects: {
        health: -8,
        spirit: -12,
        balance: -300,
        reputation: -5
      }
    })
  }

  // 重大剧情：精神崩溃
  if (state.stats.spirit < 8 && state.stats.spirit >= 0 && !state.triggeredLowStats.includes('crisis_mental')) {
    triggers.push({
      type: 'crisis_mental',
      severity: 'critical',
      scene: '你盯着手机发呆了很久，消息一条都不想回。\n\n屋里很热闹，你却像被隔在玻璃外。\n\n妈妈敲门："你别一个人憋着，出来透透气。"\n\n你才发现自己已经把情绪憋到了临界点。',
      thoughts: '不是我矫情，是我真的快被压力压扁了。',
      effects: {
        spirit: -10,
        health: -8,
        reputation: -8
      }
    })
  }
  
  // 健康值过低（<30）触发生病剧情
  if (state.stats.health < 30 && state.stats.health >= 12 && !state.triggeredLowStats.includes('sick')) {
    triggers.push({
      type: 'sick',
      severity: state.stats.health < 15 ? 'severe' : 'moderate',
      scene: state.stats.health < 15 
        ? '你感觉非常不舒服，头痛欲裂，浑身无力...\n\n"怎么了？脸色这么差？"妈妈担心地问。\n\n"没事，就是有点累..."你强撑着说。\n\n但你知道，你可能是真的生病了。'
        : '你感觉有点不舒服，可能是最近太累了...\n\n"要不要去医院看看？"爸爸问。\n\n"不用，休息一下就好了。"你摆摆手。',
      thoughts: state.stats.health < 15 
        ? '真的生病了...早知道就不该这么拼。'
        : '有点不舒服，但还能坚持。',
      effects: {
        health: state.stats.health < 15 ? -5 : 0,
        spirit: -10,
        reputation: -5
      }
    })
  }
  
  // 精神值过低（<20）触发抑郁剧情
  if (state.stats.spirit < 20 && state.stats.spirit >= 8 && !state.triggeredLowStats.includes('depressed')) {
    triggers.push({
      type: 'depressed',
      severity: state.stats.spirit < 10 ? 'severe' : 'moderate',
      scene: state.stats.spirit < 10
        ? '你感到前所未有的疲惫和沮丧...\n\n所有的事情都压在你身上：工作、家庭、未来...\n\n你一个人躲在房间里，不想见任何人。\n\n"出来吃饭吧？"妈妈在门外喊。\n\n"不想吃..."你小声说。'
        : '你感到心情很低落，做什么都提不起精神...\n\n"怎么了？不开心？"爸爸问。\n\n"没什么..."你勉强笑笑。',
      thoughts: state.stats.spirit < 10
        ? '真的好累...感觉快要撑不下去了。'
        : '心情不好，但还是要坚持。',
      effects: {
        spirit: -5,
        health: -5,
        reputation: -10
      }
    })
  }
  
  // 余额过低（<500）触发穷困剧情
  if (state.stats.balance < 500 && state.stats.balance >= 0 && !state.triggeredLowStats.includes('poor')) {
    triggers.push({
      type: 'poor',
      severity: state.stats.balance < 200 ? 'severe' : 'moderate',
      scene: state.stats.balance < 200
        ? '你看着钱包里仅剩的' + state.stats.balance + '元，心里一阵发慌...\n\n"这个年过得真紧巴..."你叹了口气。\n\n连给亲戚的红包都拿不出来，更别说买年货了。'
        : '你的余额不多了，只剩下' + state.stats.balance + '元...\n\n"得省着点花了。"你提醒自己。',
      thoughts: state.stats.balance < 200
        ? '真的没钱了...这个年怎么过？'
        : '钱不多了，得省着点。',
      effects: {
        spirit: -15,
        reputation: state.stats.balance < 200 ? -10 : -5
      }
    })
  }
  
  // 口碑过低（<20）触发被嫌弃剧情
  if (state.stats.reputation < 20 && state.stats.reputation >= 0 && !state.triggeredLowStats.includes('disliked')) {
    triggers.push({
      type: 'disliked',
      severity: state.stats.reputation < 10 ? 'severe' : 'moderate',
      scene: state.stats.reputation < 10
        ? '你明显感觉到亲戚们对你的态度变了...\n\n"这孩子怎么这样..."你听到有人在背后议论。\n\n连父母看你的眼神都有些失望。\n\n"你到底怎么了？"妈妈终于忍不住问。'
        : '你感觉亲戚们对你的态度有些冷淡...\n\n"最近工作怎么样？"有人问，但语气明显不如以前热情。',
      thoughts: state.stats.reputation < 10
        ? '我是不是真的做错了什么...'
        : '感觉大家对我有点冷淡。',
      effects: {
        spirit: -20,
        reputation: -5
      }
    })
  }
  
  return triggers
}

// 标记低数值剧情已触发
export function markLowStatsTriggered(state, triggerType) {
  if (!state.triggeredLowStats) {
    state.triggeredLowStats = []
  }
  if (!state.triggeredLowStats.includes(triggerType)) {
    state.triggeredLowStats.push(triggerType)
  }
}

// 根据家庭经济触发剧情
export function getFamilyEconomyScene(state, eventId) {
  const familyEconomy = state.attributes.familyEconomy
  if (!familyEconomy) return null
  
  const economyValue = familyEconomy.value || 50
  const economyId = familyEconomy.id
  
  // 家庭经济相关的特殊剧情
  const scenes = {
    // 一贫如洗/穷困潦倒 - 父母需要帮助
    destitute: {
      scene: '你看到父母为了省钱，连年货都舍不得买...\n\n"今年就不买那么多了，省着点花。"妈妈说。\n\n你心里一阵酸楚，决定要帮帮家里。',
      thoughts: '家里条件不好，我应该多帮帮父母。',
      effects: { balance: -500, reputation: 15, spirit: -10 }
    },
    poor: {
      scene: '"今年手头有点紧..."爸爸叹了口气。\n\n你看到家里的情况，心里不是滋味。\n\n"我还有点钱，给家里用吧。"你说。',
      thoughts: '家里不容易，能帮就帮。',
      effects: { balance: -300, reputation: 10, spirit: -5 }
    },
    // 小康偏富/家财万贯 - 父母给钱
    well_off: {
      scene: '"你在外面不容易，这点钱你拿着。"妈妈塞给你一个红包。\n\n"不用，我有钱。"你推辞。\n\n"拿着吧，家里不缺这点。"妈妈坚持。',
      thoughts: '父母总是这样，总想给我最好的。',
      effects: { balance: 1000, spirit: 10, reputation: 5 }
    },
    rich: {
      scene: '"今年表现不错，这是给你的。"爸爸递给你一个厚厚的红包。\n\n"谢谢爸！"你接过红包，心里暖暖的。',
      thoughts: '有家人的支持，真好。',
      effects: { balance: 2000, spirit: 15, reputation: 10 }
    }
  }
  
  // 在特定事件中触发
  if (eventId === 'new_year_parents' || eventId === 'chat_work') {
    if (economyId === 'destitute' || economyId === 'poor') {
      return scenes[economyId] || scenes.poor
    } else if (economyId === 'well_off' || economyId === 'rich') {
      return scenes[economyId] || scenes.well_off
    }
  }
  
  return null
}

// 根据家庭关系触发剧情
export function getFamilyRelationScene(state, eventId) {
  const familyRelation = state.attributes.familyRelation
  if (!familyRelation) return null
  
  const relationValue = familyRelation.value || 50
  const relationId = familyRelation.id
  
  // 家庭关系相关的特殊剧情
  const scenes = {
    // 仇视/陌生 - 冲突剧情
    hostile: {
      scene: '你们坐在客厅，气氛有些尴尬...\n\n"最近怎么样？"爸爸问。\n\n"还行。"你简短回答。\n\n又是一阵沉默。\n\n"算了，不说了。"爸爸起身离开。',
      thoughts: '和家人的关系还是这么紧张...',
      effects: { spirit: -20, reputation: -10 }
    },
    strange: {
      scene: '你们之间似乎有些生疏...\n\n"工作忙吗？"妈妈问。\n\n"嗯，挺忙的。"你回答。\n\n"那就好。"妈妈说。\n\n对话就这样结束了，你们都不知道该说什么。',
      thoughts: '感觉和父母之间有些距离...',
      effects: { spirit: -15, reputation: -5 }
    },
    // 亲密/相亲相爱 - 温馨剧情
    close: {
      scene: '你们坐在一起，聊得很开心。\n\n"在外面要照顾好自己。"妈妈叮嘱。\n\n"知道了，你们也是。"你说。\n\n"一家人在一起，真好。"爸爸笑着说。',
      thoughts: '和家人在一起，真的很温暖。',
      effects: { spirit: 20, reputation: 10, health: 5 }
    },
    loving: {
      scene: '你们聊了很久，从工作到生活，从过去到未来...\n\n"无论什么时候，家都是你的港湾。"妈妈说。\n\n"我知道，谢谢你们。"你感动地说。\n\n你们拥抱在一起，感受着家的温暖。',
      thoughts: '有家人的爱，什么都不怕。',
      effects: { spirit: 25, reputation: 15, health: 10 }
    }
  }
  
  // 在特定事件中触发
  if (eventId === 'chat_work' || eventId === 'chat_love' || eventId === 'spring_festival_gala') {
    if (relationId === 'hostile' || relationId === 'strange') {
      return scenes[relationId] || scenes.hostile
    } else if (relationId === 'close' || relationId === 'loving') {
      return scenes[relationId] || scenes.loving
    }
  }
  
  return null
}

// 根据婚姻状态触发剧情
export function getMaritalStatusScene(state, eventId) {
  const maritalStatus = state.attributes.maritalStatus
  const ageRange = state.attributes.ageRange
  const hasChildren = !!state.attributes.hasChildren
  const travelWithFamily = !!state.attributes.travelWithFamily
  if (!maritalStatus) return null
  
  const age = ageRange ? (ageRange.min + ageRange.max) / 2 : 25
  const statusId = maritalStatus.id
  
  // 婚姻状态相关的特殊剧情
  const scenes = {
    // 单身 - 催婚剧情
    single: age >= 30 ? {
      scene: '"你都30多了，还不找对象？"妈妈开始着急。\n\n"你看隔壁小王，孩子都上小学了！"爸爸也说。\n\n"工作太忙了..."你找借口。\n\n"工作再忙也要找对象啊！"妈妈不依不饶。\n\n你感到压力山大...',
      thoughts: '又被催婚了...压力好大。',
      effects: { spirit: -20, reputation: -5 }
    } : {
      scene: '"有对象了吗？"妈妈问。\n\n"还没呢，不着急。"你回答。\n\n"也该考虑考虑了。"妈妈说。',
      thoughts: '虽然被催，但压力还不算太大。',
      effects: { spirit: -10 }
    },
    // 恋爱中 - 带回家剧情
    dating: {
      scene: '"什么时候带对象回来看看？"妈妈期待地问。\n\n"等稳定了再说吧。"你敷衍道。\n\n"都谈了这么久了，也该见见家长了。"妈妈说。\n\n"再说吧..."你有些紧张。',
      thoughts: '带对象回家...压力还是有的。',
      effects: { spirit: -15, reputation: 5 }
    },
    // 已婚 - 催生剧情
    married: hasChildren ? {
      scene: travelWithFamily
        ? '"孩子晚上睡哪屋？"妈妈一边铺床一边问。\n\n"跟我们睡就行。"你回答。\n\n"明天我带他去串门，你们俩先歇会。"妈妈说。\n\n一家人忙忙碌碌，但气氛很热闹。'
        : '"这次怎么没把孩子带回来？"妈妈问。\n\n"两边老人都想看孩子，这次先去另一边了。"你解释。\n\n"也是，成家后两边都要顾到。"妈妈点点头。',
      thoughts: travelWithFamily ? '带娃返乡确实累，但一家人团聚值了。' : '有了孩子后，过年行程像排班表。',
      effects: { spirit: travelWithFamily ? -5 : -3, reputation: 8 }
    } : {
      scene: '"什么时候要孩子？"妈妈问。\n\n"不着急，先稳定工作。"你说。\n\n"都结婚了，该考虑要孩子了。"妈妈说。\n\n"再说吧..."你有些无奈。',
      thoughts: '刚催完婚，又开始催生了...',
      effects: { spirit: -15, reputation: 5 }
    },
    // 离异 - 敏感话题
    divorced: {
      scene: '"最近怎么样？"妈妈小心翼翼地问。\n\n"还行。"你简短回答。\n\n"会好的，慢慢来。"妈妈安慰道。\n\n"我知道。"你点点头，但心里还是有些难受。',
      thoughts: '这个话题有点敏感...',
      effects: { spirit: -20, reputation: -5 }
    }
  }
  
  // 在特定事件中触发
  if (eventId === 'chat_love' || eventId === 'new_year_parents' || eventId === 'child_topic') {
    return scenes[statusId]
  }
  
  return null
}

// 根据职业触发特殊剧情
export function getJobSpecialScene(state, eventId) {
  const job = state.attributes.job
  if (!job) return null
  
  const jobId = job.id
  const jobCategory = job.category || ''
  
  // 职业相关的特殊剧情
  const scenes = {
    // 程序员
    programmer: {
      scene: '"你是做什么的？"亲戚问。\n\n"程序员。"你回答。\n\n"哦，修电脑的？"亲戚说。\n\n"不是..."你有些无奈。\n\n"那帮我看看电脑吧，最近有点卡。"亲戚说。\n\n你只能苦笑...',
      thoughts: '又被当成修电脑的了...',
      effects: { spirit: -10, reputation: 5 }
    },
    // 医生/护士
    doctor: {
      scene: '"你是医生啊？太好了！"亲戚兴奋地说。\n\n"我最近有点不舒服，你帮我看看？"亲戚说。\n\n"我不是这个科的..."你解释。\n\n"没事，你肯定懂。"亲戚坚持。\n\n你只能硬着头皮看...',
      thoughts: '又被当成全科医生了...',
      effects: { spirit: -10, reputation: 10 }
    },
    // 教师
    teacher: {
      scene: '"你是老师啊？"亲戚问。\n\n"嗯。"你回答。\n\n"那帮我孩子补补课吧，成绩不太好。"亲戚说。\n\n"我教的是..."你解释。\n\n"没事，你肯定能教。"亲戚说。\n\n你有些无奈...',
      thoughts: '又被当成全科老师了...',
      effects: { spirit: -10, reputation: 8 }
    },
    // 外卖/快递
    delivery: {
      scene: '"你是送外卖的？"亲戚问。\n\n"嗯。"你回答。\n\n"那挺辛苦的。"亲戚说。\n\n"还行吧。"你说。\n\n"工资怎么样？"亲戚又问。\n\n"一般。"你简短回答。\n\n你感觉有些尴尬...',
      thoughts: '感觉亲戚有些看不起...',
      effects: { spirit: -15, reputation: -5 }
    },
    // 销售
    sales: {
      scene: '"你是做销售的？"亲戚问。\n\n"嗯。"你回答。\n\n"那肯定很能说。"亲戚说。\n\n"还行吧。"你说。\n\n"那你帮我推销一下这个产品吧。"亲戚说。\n\n你有些无奈...',
      thoughts: '又被当成推销员了...',
      effects: { spirit: -10, reputation: 5 }
    },
    // 自由职业/主播
    freelancer: {
      scene: '"你是做什么的？"亲戚问。\n\n"自由职业。"你回答。\n\n"哦，就是没工作？"亲戚说。\n\n"不是..."你解释。\n\n"那还是找个稳定工作吧。"亲戚说。\n\n你感到有些无奈...',
      thoughts: '又被误解了...',
      effects: { spirit: -15, reputation: -5 }
    }
  }
  
  // 在特定事件中触发（走亲访友、聊天等）
  if (eventId === 'visit_relatives' || eventId === 'chat_work' || eventId === 'receive_relatives') {
    // 根据职业ID匹配
    if (scenes[jobId]) {
      return scenes[jobId]
    }
    // 根据职业类别匹配
    if (jobCategory === '基础服务' && scenes.delivery) {
      return scenes.delivery
    }
    if (jobCategory === '自由' && scenes.freelancer) {
      return scenes.freelancer
    }
  }
  
  return null
}

// 特殊事件剧情
export function getSpecialEventScene(eventId, choiceId, state) {
  const specialScenes = {
    // 帮父母打扫的特殊剧情
    clean: {
      scene: '你拿起扫把，开始认真打扫。\n\n"这孩子真懂事！"妈妈欣慰地说。\n\n虽然累得满头大汗，但看到父母满意的笑容，你觉得一切都值得。\n\n你们一起把家里打扫得干干净净，准备迎接新年。',
      thoughts: '虽然累，但能帮到父母，心里很满足。'
    },
    
    // 帮做饭的特殊剧情
    cook: {
      scene: '你系上围裙，走进厨房。\n\n"来，我教你做这道菜。"妈妈笑着说。\n\n你们一起准备年夜饭，虽然手忙脚乱，但笑声不断。\n\n"这孩子长大了，会做饭了！"爸爸夸你。',
      thoughts: '和父母一起做饭，感觉特别温馨。'
    },
    
    // 同学约喝酒的特殊剧情
    classmate_drink_go: {
      scene: '你和老同学在酒馆里喝酒聊天。\n\n"还记得以前吗？"同学问。\n\n你们聊起学生时代，聊起现在的生活，聊起未来的梦想...\n\n"来，干杯！"你们举起酒杯。\n\n虽然喝得有点多，但心情特别好。',
      thoughts: '和老朋友在一起，真的很放松。'
    },
    
    // 临时加班的特殊剧情
    overtime_work: {
      scene: '大过年的，你还要打开电脑加班...\n\n"这个项目很急，没办法..."你叹了口气。\n\n家人在客厅看电视，你在房间里工作。\n\n"还在忙啊？"妈妈进来问。\n\n"嗯，马上就好..."你头也不抬地说。\n\n虽然很累，但至少能多赚点钱。',
      thoughts: '大过年的还要加班...打工人真不容易。'
    }
  }
  
  const key = choiceId ? `${eventId}_${choiceId}` : eventId
  return specialScenes[key] || null
}
