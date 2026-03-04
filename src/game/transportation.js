// 返乡/返程交通方式系统

import { DISTANCE_TYPES } from './data.js'

// 交通方式选项
export const TRANSPORT_OPTIONS = {
  same_city: [
    { id: 'bus', name: '公交/地铁', cost: 5, health: -5, spirit: 0, reputation: 0, successRate: 100, delayChance: 0 }
  ],
  neighbor: [
    { id: 'bus', name: '大巴', cost: 30, health: -12, spirit: -10, reputation: 0, successRate: 100, delayChance: 25 },
    { id: 'train', name: '高铁（抢票）', cost: 260, health: -4, spirit: -1, reputation: 0, successRate: 78, requireBalance: 260, delayChance: 0 },
    { id: 'drive', name: '自驾', cost: 150, health: -10, spirit: -7, reputation: 5, successRate: 100, delayChance: 30 }
  ],
  same_province: [
    { id: 'bus', name: '大巴', cost: 80, health: -16, spirit: -14, reputation: 0, successRate: 100, delayChance: 45 },
    { id: 'train', name: '高铁（抢票）', cost: 460, health: -4, spirit: -1, reputation: 0, successRate: 72, requireBalance: 460, delayChance: 0 },
    { id: 'normal_train', name: '普通火车（抢票）', cost: 180, health: -13, spirit: -10, reputation: 0, successRate: 88, requireBalance: 180, delayChance: 50 },
    { id: 'drive', name: '自驾', cost: 220, health: -12, spirit: -9, reputation: 5, successRate: 100, delayChance: 40 }
  ],
  cross_province: [
    { id: 'normal_train', name: '普通火车（抢票）', cost: 220, health: -16, spirit: -13, reputation: 0, successRate: 82, requireBalance: 220, delayChance: 60 },
    { id: 'train', name: '高铁（抢票）', cost: 780, health: -4, spirit: -1, reputation: 0, successRate: 55, requireBalance: 780, delayChance: 0 },
    { id: 'plane', name: '飞机（抢票）', cost: 1280, health: -1, spirit: 6, reputation: 0, successRate: 62, requireBalance: 1280, requireSalary: 7000, delayChance: 0 },
    { id: 'bus', name: '大巴', cost: 120, health: -22, spirit: -20, reputation: 0, successRate: 100, delayChance: 55 },
    { id: 'drive', name: '自驾', cost: 320, health: -16, spirit: -12, reputation: 6, successRate: 100, delayChance: 50 }
  ],
  far_cross_province: [
    { id: 'slow_train', name: '绿皮火车（抢票）', cost: 300, health: -22, spirit: -22, reputation: 0, successRate: 80, requireBalance: 300, delayChance: 70 },
    { id: 'plane', name: '飞机（抢票）', cost: 2000, health: -1, spirit: 7, reputation: 0, successRate: 58, requireBalance: 2000, requireSalary: 10000, delayChance: 0 },
    { id: 'normal_train', name: '普通火车（抢票）', cost: 400, health: -20, spirit: -17, reputation: 0, successRate: 78, requireBalance: 400, delayChance: 70 },
    { id: 'drive', name: '自驾', cost: 500, health: -22, spirit: -18, reputation: 8, successRate: 100, delayChance: 60 }
  ]
}

// 获取可用的交通方式
export function getAvailableTransport(distanceType, balance, salary) {
  const options = TRANSPORT_OPTIONS[distanceType] || []
  
  return options.filter(option => {
    // 基础规则：必须买得起票
    if (balance < option.cost) {
      return false
    }
    // 检查余额要求
    if (option.requireBalance && balance < option.requireBalance) {
      return false
    }
    // 检查薪资要求
    if (option.requireSalary && salary < option.requireSalary) {
      return false
    }
    return true
  })
}

// 选择交通方式并应用效果
export function selectTransport(state, transportId) {
  const distanceType = state.attributes.distanceType.id
  const options = TRANSPORT_OPTIONS[distanceType] || []
  const transport = options.find(t => t.id === transportId)
  
  if (!transport) {
    return { success: false, message: '无效的交通方式' }
  }
  
  // 统一校验：至少要支付得起票价
  if (state.stats.balance < transport.cost) {
    return { success: false, message: '余额不足' }
  }

  // 额外门槛：部分交通方式要求更高可用余额
  if (transport.requireBalance && state.stats.balance < transport.requireBalance) {
    return { success: false, message: '余额不足，暂时无法选择该交通方式' }
  }
  
  // 检查抢票成功率
  let success = true
  if (transport.successRate < 100) {
    success = Math.random() * 100 < transport.successRate
  }
  
  if (!success) {
    // 抢票失败：不扣钱，不跳转，留在原界面并置灰该选项
    return {
      success: false,
      ticketFailed: true,
      failedTransportId: transportId,
      transport,
      message: `${transport.name}抢票失败，本次不扣钱，请重新选择交通方式`,
      changes: {
        health: 0,
        spirit: 0,
        balance: 0,
        reputation: 0
      }
    }
  }
  
  // 检查是否延迟（火车、大巴、自驾根据距离可能晚一天）
  let delayed = false
  if (transport.delayChance && transport.delayChance > 0) {
    delayed = Math.random() * 100 < transport.delayChance
  }
  
  // 应用交通方式效果
  return {
    success: true,
    transport: transport,
    message: success ? `成功选择${transport.name}` : '抢票失败',
    delayed: delayed, // 是否延迟
    changes: {
      health: transport.health,
      spirit: transport.spirit,
      balance: -transport.cost,
      reputation: transport.reputation || 0
    }
  }
}

// 返程/返乡兜底：向父母或亲友借路费（按关系/口碑/家庭经济判定）
export function requestTravelSupport(state, source = 'parents', isReturning = false) {
  const phaseKey = isReturning ? 'returning' : 'going_home'
  if (!state.progress.travelSupportUsed) {
    state.progress.travelSupportUsed = { going_home: false, returning: false }
  }
  if (state.progress.travelSupportUsed[phaseKey]) {
    return {
      supportRequest: true,
      success: false,
      message: '这趟已经开口借过一次了，再借容易翻车。',
      changes: { health: 0, spirit: -2, balance: 0, reputation: -2 }
    }
  }

  const distanceType = state.attributes.distanceType?.id
  const options = TRANSPORT_OPTIONS[distanceType] || []
  const salary = state.attributes.salaryRange
    ? (state.attributes.salaryRange.min + state.attributes.salaryRange.max) / 2
    : 0

  // 估算最低可行车票金额（忽略当前余额，但保留薪资门槛）
  const viableOptions = options.filter(option => !option.requireSalary || salary >= option.requireSalary)
  const minCost = viableOptions.length > 0 ? Math.min(...viableOptions.map(o => o.cost)) : 300

  const relationValue = state.attributes.familyRelation?.value || 50
  const reputation = state.stats.reputation || 50
  const economyId = state.attributes.familyEconomy?.id || 'basic'
  const economyBonusMap = {
    destitute: -20,
    poor: -10,
    tight: -5,
    basic: 0,
    comfortable: 8,
    well_off: 18,
    rich: 30,
    very_rich: 40
  }
  const economyBonus = economyBonusMap[economyId] || 0

  let successRate = 50
  let successAmount = minCost + 200
  let successChanges = { health: 0, spirit: 0, balance: 0, reputation: 0 }
  let failChanges = { health: 0, spirit: -8, balance: 0, reputation: -3 }
  let successMsg = ''
  let failMsg = ''

  if (source === 'parents') {
    successRate = Math.max(10, Math.min(95, 35 + relationValue * 0.45 + economyBonus))
    successAmount = minCost + Math.floor(Math.random() * 600) + 200
    successChanges = { health: 0, spirit: 6, balance: successAmount, reputation: 3 }
    failChanges = { health: 0, spirit: -10, balance: 0, reputation: -4 }
    successMsg = `爸妈凑了¥${successAmount}给你，让你先把返程票解决。`
    failMsg = '爸妈手头也紧，想帮但暂时拿不出来。'
  } else {
    successRate = Math.max(8, Math.min(90, 20 + reputation * 0.65))
    successAmount = minCost + Math.floor(Math.random() * 350) + 100
    successChanges = { health: 0, spirit: -2, balance: successAmount, reputation: 1 }
    failChanges = { health: 0, spirit: -12, balance: 0, reputation: -6 }
    successMsg = `朋友周转了¥${successAmount}给你，先把票买上再说。`
    failMsg = '你开口借钱后，对方只回了“最近也紧”。'
  }

  const success = Math.random() * 100 < successRate
  state.progress.travelSupportUsed[phaseKey] = true

  return {
    supportRequest: true,
    success,
    source,
    amount: success ? successAmount : 0,
    message: success ? successMsg : failMsg,
    changes: success ? successChanges : failChanges
  }
}
