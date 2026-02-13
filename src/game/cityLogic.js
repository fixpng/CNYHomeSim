// 城市层级逻辑

import { CITY_LEVELS } from './data.js'

// 城市层级排序（从低到高）
const CITY_TIER_ORDER = {
  'tier6': 0,  // 六线（农村）
  'tier5': 1,  // 五线（乡镇）
  'tier4': 2,  // 四线（县城）
  'tier3': 3,  // 三线
  'tier2': 4,  // 二线
  'new_tier1': 5, // 新一线
  'tier1': 6   // 超一线（北上广深）
}

// 获取城市层级数值
export function getCityTierValue(city) {
  if (!city) return 0
  return CITY_TIER_ORDER[city.id] || 0
}

// 检查工作地是否比老家发达（一般情况）
export function isWorkCityMoreDeveloped(workCity, homeCity) {
  if (!workCity || !homeCity) return true
  
  const workTier = getCityTierValue(workCity)
  const homeTier = getCityTierValue(homeCity)
  
  // 工作地层级应该 >= 老家层级（工作地更发达或同级）
  return workTier >= homeTier
}

// 检查工作地是否合理（允许从高到低的情况）
export function isWorkCityReasonable(workCity, homeCity, workUnit) {
  if (!workCity || !homeCity) return true
  
  const workTier = getCityTierValue(workCity)
  const homeTier = getCityTierValue(homeCity)
  
  // 如果工作地比老家层级低，检查是否合理
  if (workTier < homeTier) {
    // 允许的情况：公务员、事业单位、国企（可能回老家工作）
    const allowedUnits = ['institution', 'state_central', 'state_provincial', 'state_city', 'public_welfare']
    if (workUnit && allowedUnits.includes(workUnit.id)) {
      return true
    }
    // 允许的情况：个体户（可能回老家创业）
    if (workUnit && workUnit.id === 'self_employed') {
      return true
    }
    // 其他情况：最多只能从一线跑到二线（层级差不超过1）
    return (homeTier - workTier) <= 1
  }
  
  return true
}

// 根据老家获取合理的工作地选择
export function getReasonableWorkCities(homeCity, workUnit = null) {
  if (!homeCity) return []
  
  const homeTier = getCityTierValue(homeCity)
  
  // 如果是公务员、事业单位、国企，可以回老家或更低层级
  const allowedUnits = ['institution', 'state_central', 'state_provincial', 'state_city', 'public_welfare']
  if (workUnit && allowedUnits.includes(workUnit.id)) {
    // 可以回老家或更低层级
    return CITY_LEVELS.filter(city => getCityTierValue(city) <= homeTier)
  }
  
  // 如果是个体户，可以回老家或更低层级
  if (workUnit && workUnit.id === 'self_employed') {
    return CITY_LEVELS.filter(city => getCityTierValue(city) <= homeTier)
  }
  
  // 一般情况：工作地应该 >= 老家层级，或者最多低1级（从一线到二线）
  return CITY_LEVELS.filter(city => {
    const cityTier = getCityTierValue(city)
    return cityTier >= homeTier || (homeTier - cityTier) <= 1
  })
}
