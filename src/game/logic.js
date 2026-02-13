// 游戏逻辑判断函数

import { SALARY_RANGES, CITY_LEVELS } from './data.js'

// 检查职业和城市是否匹配（现实性检查）
export function isJobCityCompatible(job, workCity) {
  if (!job || !workCity) return true
  
  // 如果职业有城市限制
  if (job.cityLevel && job.cityLevel.length > 0) {
    return job.cityLevel.includes(workCity.id)
  }
  
  return true
}

// 检查薪资和职业是否匹配
export function isSalaryJobCompatible(salaryRange, job) {
  if (!salaryRange || !job) return true
  
  if (!job.maxSalary) return true
  
  // 获取薪资范围索引
  const salaryRanges = ['below_2k', '2k_5k', '5k_10k', '10k_18k', '18k_30k', '30k_50k', 'above_50k']
  const currentIndex = salaryRanges.indexOf(salaryRange.id)
  const maxIndex = salaryRanges.indexOf(job.maxSalary)
  
  // 当前薪资不能超过职业最大薪资
  return currentIndex <= maxIndex
}

// 根据职业和工作地点生成聊天内容
export function generateWorkChatContent(state) {
  const job = state.attributes.job
  const workCity = state.attributes.workCity
  const workUnit = state.attributes.workUnit
  const salaryRange = state.attributes.salaryRange
  
  if (!job || !workCity) {
    return {
      scene: '饭后，你们坐在客厅聊天。\n\n"工作怎么样？累不累？"爸爸问。\n\n你简单聊了聊工作上的事。',
      thoughts: '能和父母聊聊工作，感觉压力小了不少。'
    }
  }
  
  const cityName = workCity.name
  const jobName = job.name
  const unitName = workUnit?.name || '公司'
  
  // 根据职业类型生成不同内容
  let scene = ''
  let thoughts = ''
  
  if (job.category === '基础服务') {
    scene = `饭后，你们坐在客厅聊天。\n\n"在${cityName}做什么工作？"爸爸问。\n\n"在${unitName}做${jobName}。"你回答。\n\n"哦...工作累不累？"妈妈关心地问。\n\n"还行，就是比较辛苦。"你如实说。\n\n"注意身体，别太累了。"父母叮嘱道。`
    thoughts = '父母虽然担心，但还是支持我的选择。'
  } else if (job.category === '职场') {
    scene = `饭后，你们坐在客厅聊天。\n\n"在${cityName}工作怎么样？"爸爸问。\n\n"在${unitName}做${jobName}，工作还算稳定。"你回答。\n\n"薪资怎么样？够花吗？"妈妈问。\n\n你简单说了说薪资情况，父母听了还算满意。`
    thoughts = '和父母聊聊工作，感觉压力小了不少。'
  } else if (job.category === '专业') {
    scene = `饭后，你们坐在客厅聊天。\n\n"在${cityName}做${jobName}，工作还顺利吧？"爸爸问。\n\n"还行，工作比较稳定，就是有时候比较忙。"你回答。\n\n"专业对口就好，好好干。"父母鼓励道。`
    thoughts = '父母对我的工作还算满意。'
  } else if (job.category === '自由') {
    scene = `饭后，你们坐在客厅聊天。\n\n"在${cityName}做什么工作？"爸爸问。\n\n"做${jobName}，比较自由。"你回答。\n\n"自由职业？稳定吗？"妈妈有些担心。\n\n"还行，收入还可以。"你尽量让父母放心。`
    thoughts = '父母对自由职业还是有些担心...'
  } else {
    scene = `饭后，你们坐在客厅聊天。\n\n"工作怎么样？累不累？"爸爸问。\n\n你开始聊起工作上的事，有开心的，也有烦恼的。父母认真地听着，偶尔给些建议。`
    thoughts = '能和父母聊聊工作，感觉压力小了不少。'
  }
  
  // 根据薪资调整
  if (salaryRange) {
    const salaryValue = (salaryRange.min + salaryRange.max) / 2
    if (salaryValue < 5000) {
      scene += '\n\n"工资虽然不高，但慢慢来，会好的。"父母安慰道。'
      thoughts = '虽然工资不高，但父母还是理解我的。'
    } else if (salaryValue >= 18000) {
      scene += '\n\n"工资还不错，好好干，争取再往上走。"父母鼓励道。'
      thoughts = '父母对我的工作还算满意。'
    }
  }
  
  return { scene, thoughts }
}

// 根据婚姻状态生成聊天内容
export function generateLoveChatContent(state) {
  const maritalStatus = state.attributes.maritalStatus
  const ageRange = state.attributes.ageRange
  const hasChildren = !!state.attributes.hasChildren
  const travelWithFamily = !!state.attributes.travelWithFamily
  
  if (!maritalStatus) {
    return {
      scene: '"有对象了吗？"妈妈突然问。\n\n你心里一紧，这个问题还是来了...',
      thoughts: '又来了...每年都要被催婚，真是头疼。'
    }
  }
  
  let scene = ''
  let thoughts = ''
  
  if (maritalStatus.id === 'single') {
    const age = ageRange ? (ageRange.min + ageRange.max) / 2 : 25
    if (age >= 30) {
      scene = '"有对象了吗？"妈妈突然问。\n\n"还没呢..."你小声说。\n\n"都30多了，该考虑考虑了！"妈妈开始着急。\n\n"工作太忙了，没时间。"你找借口。\n\n"工作再忙也要找对象啊！"妈妈不依不饶。'
      thoughts = '又被催婚了...压力好大。'
    } else {
      scene = '"有对象了吗？"妈妈问。\n\n"还没呢，不着急。"你回答。\n\n"也该考虑考虑了。"妈妈说。'
      thoughts = '虽然被催，但压力还不算太大。'
    }
  } else if (maritalStatus.id === 'dating') {
    scene = '"有对象了吗？"妈妈问。\n\n"有，正在谈。"你回答。\n\n"真的？什么时候带回来看看？"妈妈兴奋地说。\n\n"等稳定了再说吧。"你敷衍道。'
    thoughts = '虽然有了对象，但还是有压力。'
  } else if (maritalStatus.id === 'married') {
    if (hasChildren) {
      if (travelWithFamily) {
        scene = '"孩子路上闹没闹？"妈妈一边接行李一边问。\n\n"还好，路上睡了一觉。"你回答。\n\n"全家能一起回来就好，家里热闹多了。"爸爸笑着说。\n\n"明天你们歇歇，我来带娃。"妈妈补了一句。'
        thoughts = '全家一起回老家，虽然累，但年味真的足。'
      } else {
        scene = '"孩子没一起回来？"妈妈问。\n\n"这次先让我回来看你们，孩子在另一边陪外公外婆。"你解释。\n\n"也行，两边都得照顾到。"妈妈点点头。\n\n"下次争取全家都回来。"你说。'
        thoughts = '成家后过年像排班表，两边家庭都要兼顾。'
      }
    } else {
      scene = '"你俩最近怎么样？"妈妈问。\n\n"挺好的，就是都忙。"你回答。\n\n"那孩子的事也可以考虑了。"妈妈接上。\n\n你沉默两秒："我们还在商量。"\n\n"行，你们自己拿主意，别太晚就行。"妈妈说。'
      thoughts = '结婚后不催婚了，但催生接档了。'
    }
  } else if (maritalStatus.id === 'divorced') {
    scene = '"最近怎么样？"妈妈小心翼翼地问。\n\n"还行。"你简短回答。\n\n"会好的，慢慢来。"妈妈安慰道。'
    thoughts = '这个话题有点敏感...'
  }
  
  return { scene, thoughts }
}

// 检查年货并应用效果
export function useNewYearGoods(state, visitType) {
  const goodsLevel = state.inventory.newYearGoods
  
  if (goodsLevel === 0) {
    // 没买年货，空手去
    return {
      changes: { reputation: -5 },
      message: '你空手去串门，亲戚虽然没说什么，但感觉有点尴尬...'
    }
  } else if (goodsLevel === 1) {
    // 便宜年货
    return {
      changes: { reputation: 5 },
      message: '你带了年货去串门，虽然不贵，但心意到了。'
    }
  } else if (goodsLevel === 2) {
    // 中档年货
    return {
      changes: { reputation: 10 },
      message: '你带了不错的年货去串门，亲戚很高兴。'
    }
  } else {
    // 高档年货
    return {
      changes: { reputation: 15 },
      message: '你带了很好的年货去串门，亲戚非常满意。'
    }
  }
}

// 检查是否搞过卫生
export function checkCleaningStatus(state) {
  return state.inventory.hasCleaned
}

// 没搞卫生的影响
export function getNoCleaningPenalty() {
  return {
    changes: { reputation: -10 },
    message: '亲戚来拜年，看到家里有点乱，虽然没明说，但眼神里有些不满...'
  }
}
