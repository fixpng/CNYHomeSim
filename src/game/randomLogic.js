// 随机属性生成逻辑（确保合理性）

import { JOBS, SALARY_RANGES, CITY_LEVELS, AGE_RANGES, WORK_UNITS, HOME_PROVINCES } from './data.js'
import { isJobCityCompatible } from './logic.js'
import { getReasonableWorkCities, isWorkCityReasonable } from './cityLogic.js'

// 随机选择数组元素
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)]
}

// 根据年龄获取薪资上限调整
export function getAgeSalaryLimit(ageRange) {
  if (!ageRange) return 1.0
  
  const age = (ageRange.min + ageRange.max) / 2
  
  // 年龄越小，薪资上限越低
  if (age <= 25) {
    return 0.6 // 20-25岁，薪资上限降低40%
  } else if (age <= 30) {
    return 0.75 // 26-30岁，薪资上限降低25%
  } else if (age <= 40) {
    return 0.9 // 31-40岁，薪资上限降低10%
  }
  return 1.0 // 41-50岁，无限制
}

// 根据城市层级获取适合的职业
export function getJobsForCity(workCity) {
  if (!workCity) return JOBS
  
  const cityId = workCity.id
  
  // 农村/乡镇：只能选择基础服务、个体户、部分专业职业
  if (cityId === 'tier6' || cityId === 'tier5') {
    return JOBS.filter(job => {
      // 允许：基础服务、个体户、教师、护士、厨师、农民
      return job.category === '基础服务' || 
             job.category === '个体' ||
             job.id === 'teacher' ||
             job.id === 'nurse' ||
             job.id === 'chef' ||
             job.id === 'farmer'
    })
  }
  
  // 四线（县城）：允许更多职业，但排除高薪职业
  if (cityId === 'tier4') {
    return JOBS.filter(job => {
      // 排除：程序员、产品经理、律师等高薪职业
      const highSalaryJobs = ['programmer', 'product', 'lawyer', 'manager']
      if (highSalaryJobs.includes(job.id)) return false
      return isJobCityCompatible(job, workCity)
    })
  }
  
  // 其他城市：根据职业的城市限制筛选
  return JOBS.filter(job => isJobCityCompatible(job, workCity))
}

// 根据城市、职业、年龄获取合理的薪资范围
export function getReasonableSalaryRange(workCity, job, ageRange) {
  if (!job) return SALARY_RANGES
  
  // 获取职业的最大薪资
  const maxSalaryId = job.maxSalary
  if (!maxSalaryId) return SALARY_RANGES
  
  // 获取薪资范围索引
  const salaryRanges = ['below_2k', '2k_5k', '5k_10k', '10k_18k', '18k_30k', '30k_50k', 'above_50k']
  const maxIndex = salaryRanges.indexOf(maxSalaryId)
  
  // 根据年龄调整上限
  const ageLimit = getAgeSalaryLimit(ageRange)
  const adjustedMaxIndex = Math.floor(maxIndex * ageLimit)
  
  // 农村/乡镇特殊处理
  const cityId = workCity?.id || ''
  if ((cityId === 'tier6' || cityId === 'tier5') && !job.canHighSalaryInRural) {
    // 农村非个体户职业，薪资上限更低
    const ruralMaxIndex = Math.min(adjustedMaxIndex, 2) // 最高5k-10k
    return SALARY_RANGES.filter((range, index) => index <= ruralMaxIndex)
  }
  
  // 根据调整后的上限筛选
  return SALARY_RANGES.filter((range, index) => {
    const rangeIndex = salaryRanges.indexOf(range.id)
    return rangeIndex <= adjustedMaxIndex
  })
}

// 智能随机生成属性（确保合理性）
export function generateSmartRandomAttributes() {
  // 1. 先随机老家
  const homeCity = randomChoice(CITY_LEVELS)
  const homeProvince = randomChoice(HOME_PROVINCES)
  
  // 2. 随机工作单位（可能影响工作地选择）
  const workUnit = randomChoice(WORK_UNITS)
  
  // 3. 根据老家和工作单位获取合理的工作地
  const reasonableWorkCities = getReasonableWorkCities(homeCity, workUnit)
  const workCity = randomChoice(reasonableWorkCities.length > 0 ? reasonableWorkCities : CITY_LEVELS)
  
  // 4. 根据城市获取适合的职业
  const availableJobs = getJobsForCity(workCity)
  const job = randomChoice(availableJobs)
  
  // 5. 随机年龄
  const ageRange = randomChoice(AGE_RANGES)
  
  // 6. 根据城市、职业、年龄获取合理的薪资范围
  const availableSalaries = getReasonableSalaryRange(workCity, job, ageRange)
  const salaryRange = randomChoice(availableSalaries)
  
  return {
    workCity,
    homeCity,
    homeProvince,
    job,
    ageRange,
    salaryRange,
    workUnit
  }
}
