<template>
  <div class="setup-view">
    <div class="card">
      <h2 class="subtitle">选择游戏模式</h2>
      <div class="mode-buttons">
        <button class="btn btn-primary" @click="mode = 'custom'">自定义模式</button>
        <button class="btn btn-primary" @click="mode = 'random'; generateRandom()">随机模式</button>
      </div>
    </div>
    
    <!-- 自定义模式 -->
    <div v-if="mode === 'custom'" class="card">
      <h2 class="subtitle">设置你的属性</h2>
      
      <!-- 工作单位 -->
      <div class="form-group">
        <label>工作单位</label>
        <select v-model="attributes.workUnit" class="form-select">
          <option :value="null">请选择</option>
          <option v-for="unit in workUnits" :key="unit.id" :value="unit">
            {{ unit.name }}
          </option>
        </select>
      </div>
      
      <!-- 工作地 -->
      <div class="form-group">
        <label>工作地</label>
        <select v-model="attributes.workCity" class="form-select" @change="filterJobsByCity">
          <option :value="null">请选择</option>
          <option v-for="city in cityLevels" :key="city.id" :value="city">
            {{ city.name }}
          </option>
        </select>
      </div>
      
      <!-- 职业 -->
      <div class="form-group">
        <label>职业</label>
        <select v-model="attributes.job" class="form-select" @change="filterSalaryByJob">
          <option :value="null">请选择</option>
          <option 
            v-for="job in availableJobs" 
            :key="job.id" 
            :value="job"
            :disabled="!isJobAvailable(job)"
          >
            {{ job.name }}{{ !isJobAvailable(job) ? ' (不匹配)' : '' }}
          </option>
        </select>
        <div v-if="attributes.workCity && !attributes.job" class="form-hint">
          请先选择工作地，系统会根据城市筛选合适的职业
        </div>
      </div>
      
      <!-- 薪资范围 -->
      <div class="form-group">
        <label>薪资范围</label>
        <select v-model="attributes.salaryRange" class="form-select">
          <option :value="null">请选择</option>
          <option 
            v-for="range in availableSalaryRanges" 
            :key="range.id" 
            :value="range"
            :disabled="!isSalaryAvailable(range)"
          >
            {{ range.name }}{{ !isSalaryAvailable(range) ? ' (超出职业上限)' : '' }}
          </option>
        </select>
        <div v-if="attributes.job && !attributes.salaryRange" class="form-hint">
          根据职业选择合理的薪资范围
        </div>
      </div>
      
      <!-- 老家 -->
      <div class="form-group">
        <label>老家</label>
        <select v-model="attributes.homeCity" class="form-select" @change="filterWorkCityByHome">
          <option :value="null">请选择</option>
          <option v-for="city in cityLevels" :key="city.id" :value="city">
            {{ city.name }}
          </option>
        </select>
        <div v-if="attributes.homeCity && attributes.workCity && !isWorkCityReasonable(attributes.workCity, attributes.homeCity, attributes.workUnit)" class="form-hint">
          提示：一般打工地比老家发达，除非是公务员/事业单位/个体户
        </div>
      </div>

      <!-- 老家省份 -->
      <div class="form-group">
        <label>老家省份</label>
        <select v-model="attributes.homeProvince" class="form-select">
          <option :value="null">请选择</option>
          <option v-for="province in homeProvinces" :key="province.id" :value="province">
            {{ province.name }}（{{ province.regionName }}）
          </option>
        </select>
      </div>
      
      <!-- 距离类型（自动计算） -->
      <div class="form-group" v-if="attributes.workCity && attributes.homeCity">
        <label>距离类型</label>
        <input type="text" :value="getDistanceType()?.name || '请先选择工作地和老家'" class="form-input" disabled>
      </div>
      
      <button class="btn btn-primary mt-16" @click="generateRandomAttributes()">一键随机填充</button>
    </div>
    
    <!-- 随机模式显示 -->
    <div v-if="mode === 'random' && attributes.workUnit" class="card">
      <h2 class="subtitle">🎲 你的随机属性</h2>
      <div class="attributes-display">
        <div class="attr-row">
          <span class="attr-name">工作单位：</span>
          <span class="attr-value">{{ attributes.workUnit?.name }}</span>
        </div>
        <div class="attr-row">
          <span class="attr-name">职业：</span>
          <span class="attr-value">{{ attributes.job?.name }}</span>
        </div>
        <div class="attr-row">
          <span class="attr-name">薪资范围：</span>
          <span class="attr-value">{{ attributes.salaryRange?.name }}</span>
        </div>
        <div class="attr-row">
          <span class="attr-name">工作地：</span>
          <span class="attr-value">{{ attributes.workCity?.name }}</span>
        </div>
        <div class="attr-row">
          <span class="attr-name">老家：</span>
          <span class="attr-value">{{ attributes.homeCity?.name }}</span>
        </div>
        <div class="attr-row">
          <span class="attr-name">老家省份：</span>
          <span class="attr-value">{{ attributes.homeProvince?.name }}</span>
        </div>
        <div class="attr-row">
          <span class="attr-name">区域：</span>
          <span class="attr-value">{{ attributes.homeProvince?.regionName }}</span>
        </div>
        <div class="attr-row">
          <span class="attr-name">距离：</span>
          <span class="attr-value">{{ getDistanceType()?.name }}</span>
        </div>
        <div class="attr-row">
          <span class="attr-name">家庭关系：</span>
          <span class="attr-value">{{ attributes.familyRelation?.name }}</span>
        </div>
        <div class="attr-row">
          <span class="attr-name">家庭经济：</span>
          <span class="attr-value">{{ attributes.familyEconomy?.name }}</span>
        </div>
        <div class="attr-row">
          <span class="attr-name">婚姻状态：</span>
          <span class="attr-value">{{ attributes.maritalStatus?.name }}</span>
        </div>
        <div class="attr-row" v-if="attributes.maritalStatus?.id === 'married'">
          <span class="attr-name">是否已育：</span>
          <span class="attr-value">{{ attributes.hasChildren ? '已育' : '未育' }}</span>
        </div>
        <div class="attr-row" v-if="attributes.maritalStatus?.id === 'married'">
          <span class="attr-name">返乡方式：</span>
          <span class="attr-value">{{ attributes.travelWithFamily ? '全家返乡' : '独自返乡' }}</span>
        </div>
        <div class="attr-row">
          <span class="attr-name">年龄：</span>
          <span class="attr-value">{{ attributes.ageRange?.name }}</span>
        </div>
        <div class="attr-row">
          <span class="attr-name">技能：</span>
          <span class="attr-value">{{ attributes.skills.map(s => s.name).join('、') || '无' }}</span>
        </div>
        <div class="attr-row">
          <span class="attr-name">负债：</span>
          <span class="attr-value">{{ attributes.debtType?.name }}</span>
        </div>
        <div class="attr-row">
          <span class="attr-name">初始余额：</span>
          <span class="attr-value money">¥{{ initialBalance }}</span>
        </div>
      </div>
      <button class="btn btn-secondary mt-16" @click="generateRandom()">重新随机</button>
    </div>
    
    <!-- 开始游戏按钮 -->
    <div class="card" v-if="canStart">
      <button class="btn btn-primary btn-large" @click="startGame">开始游戏</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  WORK_UNITS, JOBS, SALARY_RANGES, CITY_LEVELS, DISTANCE_TYPES,
  HOME_PROVINCES, FAMILY_RELATIONS, FAMILY_ECONOMY, MARITAL_STATUS, AGE_RANGES, SKILLS, DEBT_TYPES,
  randomByProbability, randomChoice, calculateInitialBalance
} from '../game/data.js'
import { isJobCityCompatible, isSalaryJobCompatible } from '../game/logic.js'
import { generateSmartRandomAttributes, getJobsForCity, getReasonableSalaryRange } from '../game/randomLogic.js'
import { getReasonableWorkCities, isWorkCityReasonable } from '../game/cityLogic.js'
import { createInitialState } from '../game/state.js'

const emit = defineEmits(['start-game'])

const mode = ref('custom')
const attributes = ref({
  workUnit: null,
  job: null,
  salaryRange: null,
  workCity: null,
  homeCity: null,
  homeProvince: null,
  distanceType: null,
  familyRelation: null,
  familyEconomy: null,
  maritalStatus: null,
  hasChildren: false,
  travelWithFamily: false,
  ageRange: null,
  skills: [],
  debtType: null
})

const workUnits = WORK_UNITS
const jobs = JOBS
const salaryRanges = SALARY_RANGES
const cityLevels = CITY_LEVELS
const homeProvinces = HOME_PROVINCES

// 根据城市筛选可用职业
const availableJobs = computed(() => {
  if (!attributes.value.workCity) {
    return jobs
  }
  return jobs.filter(job => isJobCityCompatible(job, attributes.value.workCity))
})

// 根据职业筛选可用薪资
const availableSalaryRanges = computed(() => {
  if (!attributes.value.job) {
    return salaryRanges
  }
  return salaryRanges.filter(range => isSalaryJobCompatible(range, attributes.value.job))
})

// 检查职业是否可用
function isJobAvailable(job) {
  if (!attributes.value.workCity) return true
  return isJobCityCompatible(job, attributes.value.workCity)
}

// 检查薪资是否可用
function isSalaryAvailable(range) {
  if (!attributes.value.job) return true
  return isSalaryJobCompatible(range, attributes.value.job)
}

// 城市改变时重置职业和薪资
function filterJobsByCity() {
  // 检查工作地和老家的合理性
  if (attributes.value.homeCity && attributes.value.workCity) {
    if (!isWorkCityReasonable(attributes.value.workCity, attributes.value.homeCity, attributes.value.workUnit)) {
      // 如果不合理，自动调整为合理的工作地
      const reasonableCities = getReasonableWorkCities(attributes.value.homeCity, attributes.value.workUnit)
      if (reasonableCities.length > 0 && !reasonableCities.includes(attributes.value.workCity)) {
        attributes.value.workCity = reasonableCities[0]
      }
    }
  }
  
  if (!isJobCityCompatible(attributes.value.job, attributes.value.workCity)) {
    attributes.value.job = null
  }
  filterSalaryByJob()
}

// 老家改变时检查工作地合理性
function filterWorkCityByHome() {
  if (attributes.value.homeCity && attributes.value.workCity) {
    if (!isWorkCityReasonable(attributes.value.workCity, attributes.value.homeCity, attributes.value.workUnit)) {
      const reasonableCities = getReasonableWorkCities(attributes.value.homeCity, attributes.value.workUnit)
      if (reasonableCities.length > 0) {
        attributes.value.workCity = reasonableCities[0]
      }
    }
  }
  filterJobsByCity()
}

// 职业改变时重置薪资
function filterSalaryByJob() {
  if (!isSalaryJobCompatible(attributes.value.salaryRange, attributes.value.job)) {
    attributes.value.salaryRange = null
  }
}

// 计算距离类型
function getDistanceType() {
  if (!attributes.value.workCity || !attributes.value.homeCity) {
    return null
  }
  
  // 简单判断：同城、邻市、省内、跨省、远跨省
  if (attributes.value.workCity.id === attributes.value.homeCity.id) {
    return DISTANCE_TYPES[0] // 同城
  }
  
  // 这里简化处理，实际可以根据城市层级判断
  const workTier = parseInt(attributes.value.workCity.id.replace(/\D/g, '')) || 1
  const homeTier = parseInt(attributes.value.homeCity.id.replace(/\D/g, '')) || 1
  
  // 根据层级差判断距离
  const diff = Math.abs(workTier - homeTier)
  if (diff === 0) return DISTANCE_TYPES[1] // 邻市
  if (diff <= 2) return DISTANCE_TYPES[2] // 省内跨市
  if (diff <= 4) return DISTANCE_TYPES[3] // 跨省
  return DISTANCE_TYPES[4] // 远跨省
}

// 生成随机属性（智能匹配）
function generateRandom() {
  // 使用智能随机生成，确保城市、职业、薪资、年龄的合理性
  const smartAttrs = generateSmartRandomAttributes()
  
  attributes.value.workCity = smartAttrs.workCity
  attributes.value.job = smartAttrs.job
  attributes.value.ageRange = smartAttrs.ageRange
  attributes.value.salaryRange = smartAttrs.salaryRange
  attributes.value.workUnit = smartAttrs.workUnit
  
  // 智能生成已经包含了合理的工作地和老家匹配
  attributes.value.homeCity = smartAttrs.homeCity
  attributes.value.homeProvince = smartAttrs.homeProvince
  attributes.value.distanceType = getDistanceType()
  
  // 随机其他属性
  attributes.value.familyRelation = randomChoice(FAMILY_RELATIONS)
  attributes.value.familyEconomy = randomByProbability(FAMILY_ECONOMY)
  attributes.value.maritalStatus = randomChoice(MARITAL_STATUS)
  assignFamilyStatusByMarital()
  
  // 随机技能（0-2个）
  const skillCount = Math.floor(Math.random() * 3)
  const availableSkills = [...SKILLS]
  attributes.value.skills = []
  for (let i = 0; i < skillCount; i++) {
    const skill = randomChoice(availableSkills)
    attributes.value.skills.push(skill)
    availableSkills.splice(availableSkills.indexOf(skill), 1)
  }
  
  attributes.value.debtType = randomChoice(DEBT_TYPES)
}

// 根据婚姻状态补全“是否已育/是否全家返乡”
function assignFamilyStatusByMarital() {
  const statusId = attributes.value.maritalStatus?.id
  if (statusId === 'married') {
    attributes.value.hasChildren = Math.random() < 0.65
    attributes.value.travelWithFamily = attributes.value.hasChildren
      ? Math.random() < 0.7
      : Math.random() < 0.45
  } else {
    attributes.value.hasChildren = false
    attributes.value.travelWithFamily = false
  }
}

// 一键随机填充（自定义模式）
function generateRandomAttributes() {
  // 如果工作城市已选择，根据城市生成合理的职业和薪资
  if (attributes.value.workCity) {
    const availableJobs = getJobsForCity(attributes.value.workCity)
    if (!attributes.value.job || !isJobCityCompatible(attributes.value.job, attributes.value.workCity)) {
      attributes.value.job = randomChoice(availableJobs)
    }
    
    // 根据城市、职业、年龄生成合理的薪资
    if (attributes.value.job) {
      const availableSalaries = getReasonableSalaryRange(
        attributes.value.workCity, 
        attributes.value.job, 
        attributes.value.ageRange
      )
      if (!attributes.value.salaryRange || !availableSalaries.includes(attributes.value.salaryRange)) {
        attributes.value.salaryRange = randomChoice(availableSalaries)
      }
    }
  } else {
    // 如果城市未选择，使用智能随机生成
    const smartAttrs = generateSmartRandomAttributes()
    if (!attributes.value.workCity) attributes.value.workCity = smartAttrs.workCity
    if (!attributes.value.job) attributes.value.job = smartAttrs.job
    if (!attributes.value.salaryRange) attributes.value.salaryRange = smartAttrs.salaryRange
    if (!attributes.value.workUnit) attributes.value.workUnit = smartAttrs.workUnit
    if (!attributes.value.ageRange) attributes.value.ageRange = smartAttrs.ageRange
  }
  
  if (!attributes.value.homeCity) attributes.value.homeCity = randomChoice(CITY_LEVELS)
  if (!attributes.value.homeProvince) attributes.value.homeProvince = randomChoice(HOME_PROVINCES)
  attributes.value.distanceType = getDistanceType()
}


// 计算初始余额
const initialBalance = computed(() => {
  if (mode.value === 'custom') {
    // 自定义模式需要手动设置debtType，如果没有则返回0
    if (!attributes.value.salaryRange || !attributes.value.debtType) {
      return 0
    }
  } else {
    // 随机模式应该有debtType
    if (!attributes.value.salaryRange || !attributes.value.debtType) {
      return 0
    }
  }
  // 传入工作城市、工作单位、家庭经济、婚姻状况，根据这些因素差异化计算
  return calculateInitialBalance(
    attributes.value.salaryRange, 
    attributes.value.debtType, 
    attributes.value.workCity,
    attributes.value.workUnit,
    attributes.value.familyEconomy,
    attributes.value.maritalStatus
  )
})

// 是否可以开始游戏
const canStart = computed(() => {
  if (mode.value === 'custom') {
    return attributes.value.workUnit && attributes.value.job && 
           attributes.value.salaryRange && attributes.value.workCity && 
           attributes.value.homeCity && attributes.value.homeProvince
  } else {
    return attributes.value.workUnit !== null
  }
})

// 开始游戏
function startGame() {
  // 如果是自定义模式，需要生成随机属性
  if (mode.value === 'custom') {
    attributes.value.distanceType = getDistanceType()
    attributes.value.familyRelation = randomChoice(FAMILY_RELATIONS)
    attributes.value.familyEconomy = randomByProbability(FAMILY_ECONOMY)
    attributes.value.maritalStatus = randomChoice(MARITAL_STATUS)
    assignFamilyStatusByMarital()
    attributes.value.ageRange = randomChoice(AGE_RANGES)
    
    const skillCount = Math.floor(Math.random() * 3)
    const availableSkills = [...SKILLS]
    attributes.value.skills = []
    for (let i = 0; i < skillCount; i++) {
      const skill = randomChoice(availableSkills)
      attributes.value.skills.push(skill)
      availableSkills.splice(availableSkills.indexOf(skill), 1)
    }
    
    attributes.value.debtType = randomChoice(DEBT_TYPES)
  }
  
  const gameState = createInitialState()
  gameState.attributes = { ...attributes.value }
  gameState.stats.balance = initialBalance.value
  // 初始化余额历史
  gameState.history.balance = [initialBalance.value]
  
  emit('start-game', gameState)
}
</script>

<style scoped>
.setup-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mode-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.form-select,
.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  min-height: 44px;
}

.form-select:focus,
.form-input:focus {
  outline: none;
  border-color: #667eea;
}

.form-select option:disabled {
  color: #999;
  background: #f0f0f0;
}

.form-hint {
  margin-top: 6px;
  font-size: 12px;
  color: #999;
  font-style: italic;
}

.btn-large {
  width: 100%;
  font-size: 18px;
  padding: 16px;
}

.attributes-display {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.attr-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.attr-row:last-child {
  border-bottom: none;
}

.attr-name {
  color: #666;
  font-size: 14px;
}

.attr-value {
  color: #333;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
}

.attr-value.money {
  color: #4caf50;
}
</style>
