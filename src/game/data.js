// 游戏数据配置

// 工作单位选项
export const WORK_UNITS = [
  { id: 'private_micro', name: '私企（微型＜20人）' },
  { id: 'private_small', name: '私企（小型20-300人）' },
  { id: 'private_medium', name: '私企（中型300-1000人）' },
  { id: 'private_large', name: '私企（大型≥1000人）' },
  { id: 'foreign', name: '外企' },
  { id: 'state_central', name: '国企（央企）' },
  { id: 'state_provincial', name: '国企（省属）' },
  { id: 'state_city', name: '国企（市属）' },
  { id: 'institution', name: '事业单位' },
  { id: 'self_employed', name: '个体户' },
  { id: 'flexible', name: '灵活就业/临时工' },
  { id: 'public_welfare', name: '公益岗' }
]

// 职业选项（扩展版）
export const JOBS = [
  // 基础服务类
  { id: 'delivery', name: '外卖/快递', category: '基础服务', maxSalary: '5k_10k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3', 'tier4'] },
  { id: 'cleaner', name: '保洁/保安', category: '基础服务', maxSalary: '2k_5k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3', 'tier4', 'tier5', 'tier6'] },
  { id: 'driver', name: '网约车司机', category: '基础服务', maxSalary: '5k_10k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3', 'tier4'] },
  { id: 'cashier', name: '收银员/服务员', category: '基础服务', maxSalary: '2k_5k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3', 'tier4', 'tier5'] },
  { id: 'waiter', name: '餐厅服务员', category: '基础服务', maxSalary: '2k_5k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3', 'tier4', 'tier5'] },
  { id: 'factory_worker', name: '工厂工人', category: '基础服务', maxSalary: '5k_10k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3', 'tier4', 'tier5'] },
  { id: 'construction', name: '建筑工人', category: '基础服务', maxSalary: '5k_10k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3', 'tier4', 'tier5'] },
  
  // 职场类
  { id: 'programmer', name: '程序员', category: '职场', maxSalary: 'above_50k', cityLevel: ['tier1', 'new_tier1', 'tier2'] },
  { id: 'operator', name: '运营', category: '职场', maxSalary: '18k_30k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3'] },
  { id: 'sales', name: '销售', category: '职场', maxSalary: '30k_50k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3', 'tier4'] },
  { id: 'service', name: '客服', category: '职场', maxSalary: '5k_10k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3', 'tier4'] },
  { id: 'hr', name: '人事', category: '职场', maxSalary: '10k_18k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3'] },
  { id: 'finance', name: '财务', category: '职场', maxSalary: '18k_30k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3'] },
  { id: 'manager', name: '经理人', category: '职场', maxSalary: 'above_50k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3'] },
  { id: 'marketing', name: '市场/营销', category: '职场', maxSalary: '18k_30k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3'] },
  { id: 'designer', name: '设计师', category: '职场', maxSalary: '18k_30k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3'] },
  { id: 'product', name: '产品经理', category: '职场', maxSalary: '30k_50k', cityLevel: ['tier1', 'new_tier1', 'tier2'] },
  
  // 专业类
  { id: 'teacher', name: '教师', category: '专业', maxSalary: '10k_18k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3', 'tier4', 'tier5'] },
  { id: 'doctor', name: '医生', category: '专业', maxSalary: '30k_50k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3', 'tier4'] },
  { id: 'nurse', name: '护士', category: '专业', maxSalary: '5k_10k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3', 'tier4', 'tier5'] },
  { id: 'engineer', name: '工程师', category: '专业', maxSalary: '30k_50k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3'] },
  { id: 'chef', name: '厨师', category: '专业', maxSalary: '10k_18k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3', 'tier4', 'tier5'] },
  { id: 'lawyer', name: '律师', category: '专业', maxSalary: 'above_50k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3'] },
  { id: 'accountant', name: '会计师', category: '专业', maxSalary: '18k_30k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3'] },
  { id: 'architect', name: '建筑师', category: '专业', maxSalary: '30k_50k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3'] },
  
  // 自由类
  { id: 'streamer', name: '主播', category: '自由', maxSalary: 'above_50k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3'] },
  { id: 'media', name: '自媒体', category: '自由', maxSalary: '30k_50k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3'] },
  { id: 'part_time_driver', name: '代驾', category: '自由', maxSalary: '5k_10k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3', 'tier4'] },
  { id: 'writer', name: '写手', category: '自由', maxSalary: '10k_18k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3'] },
  { id: 'photographer', name: '摄影师', category: '自由', maxSalary: '18k_30k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3'] },
  { id: 'freelancer', name: '自由职业者', category: '自由', maxSalary: '18k_30k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3'] },
  
  // 个体户/农村职业（可以在农村有较高收入）
  { id: 'self_employed', name: '个体户', category: '个体', maxSalary: '30k_50k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3', 'tier4', 'tier5', 'tier6'], canHighSalaryInRural: true },
  { id: 'computer_repair', name: '修电脑/手机', category: '个体', maxSalary: '10k_18k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3', 'tier4', 'tier5', 'tier6'], canHighSalaryInRural: true },
  { id: 'small_shop', name: '小卖部/超市', category: '个体', maxSalary: '5k_10k', cityLevel: ['tier1', 'new_tier1', 'tier2', 'tier3', 'tier4', 'tier5', 'tier6'], canHighSalaryInRural: true },
  { id: 'farmer', name: '农民/养殖户', category: '个体', maxSalary: '5k_10k', cityLevel: ['tier4', 'tier5', 'tier6'], canHighSalaryInRural: true }
]

// 薪资范围
export const SALARY_RANGES = [
  { id: 'below_2k', name: '低于2k', min: 0, max: 2000 },
  { id: '2k_5k', name: '2~5k', min: 2000, max: 5000 },
  { id: '5k_10k', name: '5~10k', min: 5000, max: 10000 },
  { id: '10k_18k', name: '10~18k', min: 10000, max: 18000 },
  { id: '18k_30k', name: '18~30k', min: 18000, max: 30000 },
  { id: '30k_50k', name: '30~50k', min: 30000, max: 50000 },
  { id: 'above_50k', name: '50k+', min: 50000, max: 200000 }
]

// 城市层级
export const CITY_LEVELS = [
  { id: 'tier1', name: '超一线（北上广深）' },
  { id: 'new_tier1', name: '新一线' },
  { id: 'tier2', name: '二线' },
  { id: 'tier3', name: '三线' },
  { id: 'tier4', name: '四线（县城）' },
  { id: 'tier5', name: '五线（乡镇）' },
  { id: 'tier6', name: '六线（农村）' }
]

// 老家省份/区域（用于更真实的春节民俗触发）
// region: south / north / southwest / northwest / northeast / central
// tags: 可触发的民俗活动标签
export const HOME_PROVINCES = [
  { id: 'guangdong', name: '广东', region: 'south', regionName: '华南', tags: ['flower_market', 'fireworks'] },
  { id: 'guangxi', name: '广西', region: 'south', regionName: '华南', tags: ['flower_market', 'fireworks'] },
  { id: 'fujian', name: '福建', region: 'south', regionName: '华南', tags: ['flower_market', 'fireworks'] },
  { id: 'hainan', name: '海南', region: 'south', regionName: '华南', tags: ['flower_market'] },
  { id: 'zhejiang', name: '浙江', region: 'south', regionName: '华东', tags: ['flower_market', 'temple_fair'] },
  { id: 'jiangsu', name: '江苏', region: 'south', regionName: '华东', tags: ['flower_market', 'temple_fair'] },
  { id: 'shanghai', name: '上海', region: 'south', regionName: '华东', tags: ['flower_market', 'temple_fair'] },
  { id: 'anhui', name: '安徽', region: 'central', regionName: '华东', tags: ['temple_fair', 'shehuo'] },
  { id: 'jiangxi', name: '江西', region: 'south', regionName: '华东', tags: ['flower_market', 'temple_fair'] },
  { id: 'hunan', name: '湖南', region: 'central', regionName: '中南', tags: ['fireworks', 'temple_fair'] },
  { id: 'hubei', name: '湖北', region: 'central', regionName: '中南', tags: ['temple_fair', 'shehuo'] },
  { id: 'henan', name: '河南', region: 'north', regionName: '华中', tags: ['temple_fair', 'shehuo'] },
  { id: 'hebei', name: '河北', region: 'north', regionName: '华北', tags: ['temple_fair', 'shehuo', 'fireworks'] },
  { id: 'beijing', name: '北京', region: 'north', regionName: '华北', tags: ['temple_fair', 'ice_snow'] },
  { id: 'tianjin', name: '天津', region: 'north', regionName: '华北', tags: ['temple_fair', 'ice_snow'] },
  { id: 'shanxi', name: '山西', region: 'north', regionName: '华北', tags: ['temple_fair', 'shehuo'] },
  { id: 'shandong', name: '山东', region: 'north', regionName: '华东', tags: ['temple_fair', 'shehuo'] },
  { id: 'liaoning', name: '辽宁', region: 'northeast', regionName: '东北', tags: ['ice_snow', 'temple_fair'] },
  { id: 'jilin', name: '吉林', region: 'northeast', regionName: '东北', tags: ['ice_snow', 'shehuo'] },
  { id: 'heilongjiang', name: '黑龙江', region: 'northeast', regionName: '东北', tags: ['ice_snow'] },
  { id: 'sichuan', name: '四川', region: 'southwest', regionName: '西南', tags: ['temple_fair', 'shehuo', 'fireworks'] },
  { id: 'chongqing', name: '重庆', region: 'southwest', regionName: '西南', tags: ['fireworks', 'temple_fair'] },
  { id: 'guizhou', name: '贵州', region: 'southwest', regionName: '西南', tags: ['shehuo', 'fireworks'] },
  { id: 'yunnan', name: '云南', region: 'southwest', regionName: '西南', tags: ['temple_fair', 'flower_market'] },
  { id: 'shaanxi', name: '陕西', region: 'northwest', regionName: '西北', tags: ['shehuo', 'temple_fair'] },
  { id: 'gansu', name: '甘肃', region: 'northwest', regionName: '西北', tags: ['shehuo'] },
  { id: 'qinghai', name: '青海', region: 'northwest', regionName: '西北', tags: ['shehuo'] },
  { id: 'ningxia', name: '宁夏', region: 'northwest', regionName: '西北', tags: ['shehuo'] },
  { id: 'xinjiang', name: '新疆', region: 'northwest', regionName: '西北', tags: ['ice_snow', 'shehuo'] }
]

// 距离类型
export const DISTANCE_TYPES = [
  { id: 'same_city', name: '同城', distance: 0 },
  { id: 'neighbor', name: '邻市', distance: 100 },
  { id: 'same_province', name: '省内跨市', distance: 300 },
  { id: 'cross_province', name: '跨省', distance: 800 },
  { id: 'far_cross_province', name: '远跨省', distance: 2000 }
]

// 家庭关系梯度
export const FAMILY_RELATIONS = [
  { id: 'hostile', name: '仇视', value: 0 },
  { id: 'strange', name: '陌生', value: 20 },
  { id: 'tense', name: '紧张', value: 40 },
  { id: 'plain', name: '平淡', value: 60 },
  { id: 'harmonious', name: '和睦', value: 80 },
  { id: 'close', name: '亲密', value: 90 },
  { id: 'loving', name: '相亲相爱', value: 100 }
]

// 原生家庭经济
export const FAMILY_ECONOMY = [
  { id: 'destitute', name: '一贫如洗', value: 0, probability: 0.05 },
  { id: 'poor', name: '穷困潦倒', value: 20, probability: 0.10 },
  { id: 'tight', name: '拮据', value: 40, probability: 0.15 },
  { id: 'basic', name: '温饱', value: 60, probability: 0.25 },
  { id: 'comfortable', name: '小康', value: 80, probability: 0.25 },
  { id: 'well_off', name: '小康偏富', value: 90, probability: 0.15 },
  { id: 'rich', name: '家财万贯', value: 95, probability: 0.04 },
  { id: 'very_rich', name: '富可敌国', value: 100, probability: 0.01 }
]

// 婚姻状态
export const MARITAL_STATUS = [
  { id: 'single', name: '单身' },
  { id: 'dating', name: '恋爱' },
  { id: 'married', name: '已婚' },
  { id: 'divorced', name: '离异' }
]

// 年龄范围
export const AGE_RANGES = [
  { id: '20_25', name: '20-25岁', min: 20, max: 25 },
  { id: '26_30', name: '26-30岁', min: 26, max: 30 },
  { id: '31_40', name: '31-40岁', min: 31, max: 40 },
  { id: '41_50', name: '41-50岁', min: 41, max: 50 }
]

// 技能
export const SKILLS = [
  { id: 'drinking', name: '会喝酒' },
  { id: 'social_butterfly', name: '社牛' },
  { id: 'social_anxiety', name: '社恐' },
  { id: 'cooking', name: '会做饭' }
]

// 性别选项
export const GENDERS = [
  { id: 'male', name: '男' },
  { id: 'female', name: '女' }
]

// 负债类型
export const DEBT_TYPES = [
  { id: 'none', name: '无负债', amount: 0 },
  { id: 'small', name: '小额负债', amount: 5000 },
  { id: 'large', name: '大额负债', amount: 50000 }
]

// 根据概率随机选择
export function randomByProbability(items) {
  const total = items.reduce((sum, item) => sum + (item.probability || 1), 0)
  let random = Math.random() * total
  for (const item of items) {
    random -= (item.probability || 1)
    if (random <= 0) return item
  }
  return items[items.length - 1]
}

// 随机选择数组元素
export function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)]
}

// 根据城市层级获取薪资调整系数
export function getCitySalaryMultiplier(workCity) {
  if (!workCity) return 1.0
  
  const cityMultipliers = {
    'tier1': 1.3,      // 超一线（北上广深）：+30%
    'new_tier1': 1.2,  // 新一线：+20%
    'tier2': 1.1,      // 二线：+10%
    'tier3': 1.0,      // 三线：基准（不变）
    'tier4': 0.9,      // 四线（县城）：-10%
    'tier5': 0.8,      // 五线（乡镇）：-20%
    'tier6': 0.7       // 六线（农村）：-30%
  }
  
  return cityMultipliers[workCity.id] || 1.0
}

// 计算初始余额（差异化计算，更符合实际情况）
export function calculateInitialBalance(salaryRange, debtType, workCity = null, workUnit = null, familyEconomy = null, maritalStatus = null) {
  if (!salaryRange || !debtType) return 0
  
  // 基础薪资
  let baseSalary = (salaryRange.min + salaryRange.max) / 2
  
  // 根据城市层级调整薪资（城市越发达，薪资越高）
  let adjustedSalary = baseSalary
  if (workCity) {
    const multiplier = getCitySalaryMultiplier(workCity)
    adjustedSalary = baseSalary * multiplier
  }
  
  // 判断薪资水平
  const isHighSalary = adjustedSalary >= 18000  // 18k以上算高薪
  const isMidSalary = adjustedSalary >= 5000 && adjustedSalary < 18000  // 5k-18k算中薪
  const isLowSalary = adjustedSalary < 5000  // 5k以下算低薪
  
  // 判断工作单位类型
  const isStableWork = workUnit && ['state_central', 'state_provincial', 'state_city', 'institution', 'public_welfare'].includes(workUnit.id)
  const isSelfEmployed = workUnit && workUnit.id === 'self_employed'
  const isFlexible = workUnit && ['flexible', 'public_welfare'].includes(workUnit.id)
  
  // 判断家庭经济状况
  const isFamilyPoor = familyEconomy && ['destitute', 'poor', 'tight'].includes(familyEconomy.id)
  const isFamilyRich = familyEconomy && ['well_off', 'rich', 'very_rich'].includes(familyEconomy.id)
  
  // 判断是否已婚
  const isMarried = maritalStatus && maritalStatus.id === 'married'
  
  // ========== 月固定支出 ==========
  let monthlyFixedExpenses = 0
  
  if (isHighSalary) {
    // 高薪：可能有房贷车贷
    if (isMarried) {
      // 已婚高薪：房贷+车贷
      monthlyFixedExpenses = adjustedSalary * 0.35  // 35%用于房贷车贷
    } else {
      // 单身高薪：房租+车贷（可能）
      monthlyFixedExpenses = adjustedSalary * 0.25  // 25%用于房租
      if (Math.random() > 0.5) {
        monthlyFixedExpenses += adjustedSalary * 0.10  // 50%概率有车贷
      }
    }
  } else if (isMidSalary) {
    // 中薪：主要是房租
    const cityMultiplier = workCity ? getCitySalaryMultiplier(workCity) : 1.0
    monthlyFixedExpenses = adjustedSalary * (0.20 + (cityMultiplier - 1) * 0.10)  // 20-30%用于房租
    if (isMarried && Math.random() > 0.7) {
      // 已婚中薪：30%概率有房贷
      monthlyFixedExpenses = adjustedSalary * 0.30
    }
  } else {
    // 低薪：只有房租，比例更高
    const cityMultiplier = workCity ? getCitySalaryMultiplier(workCity) : 1.0
    monthlyFixedExpenses = adjustedSalary * (0.30 + (cityMultiplier - 1) * 0.15)  // 30-45%用于房租
  }
  
  // 个体户/灵活就业：固定支出较少（可能住家里或自己开店）
  if (isSelfEmployed || isFlexible) {
    monthlyFixedExpenses = adjustedSalary * 0.15  // 15%固定支出
  }
  
  // 月可支配收入
  const monthlyDisposable = adjustedSalary - monthlyFixedExpenses
  
  // ========== 月存款 ==========
  let monthlySavings = 0
  
  if (isHighSalary) {
    // 高薪：存款能力强
    monthlySavings = monthlyDisposable * 0.30  // 可支配收入的30%用于存款
    if (isStableWork) {
      monthlySavings = monthlyDisposable * 0.35  // 国企/事业单位存款更多
    }
  } else if (isMidSalary) {
    // 中薪：有一定存款能力
    monthlySavings = monthlyDisposable * 0.20  // 可支配收入的20%用于存款
    if (isStableWork) {
      monthlySavings = monthlyDisposable * 0.25  // 国企/事业单位存款更多
    }
  } else {
    // 低薪：存款能力弱
    monthlySavings = monthlyDisposable * 0.10  // 可支配收入的10%用于存款
    if (isFamilyPoor) {
      monthlySavings = monthlyDisposable * 0.05  // 家庭经济差，可能还要补贴家里
    }
  }
  
  // 个体户/灵活就业：收入不稳定，存款较少
  if (isSelfEmployed || isFlexible) {
    monthlySavings = monthlyDisposable * 0.15  // 15%存款
  }
  
  // ========== 计算6个月累计余额 ==========
  let balance = monthlySavings * 6
  
  // ========== 减去负债 ==========
  balance -= debtType.amount
  
  // ========== 减去定期存款（高薪/中薪才可能有定期存款） ==========
  if (isHighSalary || (isMidSalary && isStableWork)) {
    const fixedDeposit = monthlySavings * 2.5  // 2.5个月的存款存了定期
    balance -= fixedDeposit
  }
  
  // ========== 减去意外支出 ==========
  const unexpectedExpenses = monthlyDisposable * 0.08 * 6  // 可支配收入的8%用于意外支出（6个月）
  balance -= unexpectedExpenses
  
  // ========== 家庭经济影响 ==========
  if (isFamilyPoor && isLowSalary) {
    // 家庭经济差 + 低薪：可能需要补贴家里，余额减少
    balance -= adjustedSalary * 0.5  // 补贴家里0.5个月工资
  } else if (isFamilyRich && isLowSalary) {
    // 家庭经济好 + 低薪：父母可能给补贴
    balance += adjustedSalary * 0.3  // 父母补贴0.3个月工资
  }
  
  // ========== 确保余额合理 ==========
  if (balance < 200) {
    // 至少保留月薪的2-5%作为应急资金，最低200
    balance = Math.max(200, Math.floor(adjustedSalary * 0.02))
  }
  
  // 高薪人群余额不应该太低（除非负债很重）
  if (isHighSalary && balance < adjustedSalary * 0.5 && debtType.id === 'no_debt') {
    balance = Math.max(balance, Math.floor(adjustedSalary * 0.5))
  }
  
  return Math.floor(balance)
}
