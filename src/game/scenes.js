// 事件场景描述和想法
import { generateWorkChatContent, generateLoveChatContent } from './logic.js'
import { getCasualScene } from './casualScenes.js'
import { getAbstractScene } from './abstractScenes.js'

// 随机选择数组元素
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)]
}

export const EVENT_SCENES = {
  // 第1天：除夕
  clean: {
    scene: '你拿起扫把，和父母一起开始大扫除。\n\n妈妈在擦窗户，爸爸在拖地，你负责整理杂物。虽然有点累，但看到家里一点点变得整洁，心里还挺有成就感的。\n\n"今年回来得早，能帮上忙真好。"妈妈笑着说。',
    thoughts: '虽然累，但能帮父母分担家务，感觉还不错。'
  },
  rest: {
    scene: '你躺在沙发上，刷着手机。\n\n"刚回来就躺着？"妈妈路过时看了你一眼。\n\n"太累了，让我休息一下..."你小声嘟囔。\n\n虽然嘴上这么说，但心里还是有点愧疚。',
    thoughts: '确实有点累，但这样是不是太懒了...'
  },
  shopping_cheap: {
    scene: '你去了附近的超市，买了些基本的年货。\n\n瓜子、花生、糖果...都是些便宜但实用的东西。\n\n"今年就买这些吧，够用就行。"你心里想着。',
    thoughts: '虽然便宜，但心意到了就行。'
  },
  shopping_medium: {
    scene: '你去了超市，精心挑选了一些年货。\n\n除了基本的零食，还买了些水果和茶叶。\n\n"这个茶叶不错，给爸妈尝尝。"你看着购物车，还算满意。',
    thoughts: '买点像样的年货，让家里有点年味。'
  },
  shopping_expensive: {
    scene: '你去了大超市，买了不少好年货。\n\n进口零食、高档茶叶、新鲜水果...购物车装得满满的。\n\n"今年多买点，让家里热闹热闹。"你刷卡时虽然有点心疼，但想到家人的笑容，还是值得的。',
    thoughts: '虽然花了不少钱，但能让家人开心就好。'
  },
  cook: {
    scene: '你系上围裙，走进厨房。\n\n"来，帮我切菜。"妈妈递给你一把菜刀。\n\n你们一起准备年夜饭，你负责切菜、洗菜，妈妈负责炒菜。厨房里飘着香味，充满了年味。\n\n"今年有你帮忙，轻松多了。"妈妈笑着说。',
    thoughts: '和妈妈一起做饭，感觉回到了小时候。'
  },
  day_plan_out: {
    scene: '你看了看今天安排，决定主打“在外奔波模式”。\n\n"那我白天去串门，晚上再回家。"你说。\n\n妈妈点点头："路上慢点，别空着手去。"',
    thoughts: '今天就不宅了，主打一个社交冲刺。'
  },
  day_plan_home: {
    scene: '你决定今天主打“宅家模式”。\n\n"我今天不出门了，在家陪你们。"你对爸妈说。\n\n"行，正好家里也有不少事。"妈妈笑了笑。',
    thoughts: '今天就不折腾了，在家稳住。'
  },
  // chat_work和chat_love现在由logic.js动态生成
  red_packet: {
    scene: '你打开手机，在各个群里抢红包。\n\n"手气最佳！"你抢到了一个50元的大红包。\n\n"哈哈，运气不错！"你心里美滋滋的。',
    thoughts: '抢红包真有意思，虽然钱不多但很开心。'
  },
  spring_festival_gala: {
    scene: '晚上8点，春晚开始了。\n\n你们一家人坐在沙发上，一起看春晚。\n\n"今年春晚有什么好看的节目吗？"妈妈问。\n\n"不知道，先看看。"你回答。\n\n第一个节目是歌舞，你们边看边聊天。\n\n"这个歌手唱得不错。"爸爸说。\n\n"是啊，比去年好多了。"妈妈附和。\n\n接下来是小品，你们一起笑出声。\n\n"这个段子挺有意思的。"你说。\n\n"是啊，过年就是要开心。"爸爸笑着说。\n\n中间插播广告时，你们聊起了家常。\n\n"今年工作怎么样？"妈妈问。\n\n"还行，就是有点累。"你回答。\n\n"要注意身体啊。"爸爸关心地说。\n\n春晚继续，你们一起看完了整场。\n\n虽然节目可能没那么精彩，但一家人坐在一起，说说笑笑，这才是最重要的。\n\n"这个节目不错。"爸爸指着电视说。\n\n"是啊，一家人在一起看春晚，这才是过年。"妈妈说。',
    thoughts: '虽然春晚没那么好看，但和家人一起看的感觉真好。'
  },
  
  // 第2天：大年初一
  new_year_parents: {
    scene: '早上，你给父母拜年。\n\n"爸、妈，新年快乐！"你笑着说。\n\n"新年快乐！"父母也笑着回应。\n\n你拿出准备好的红包递给父母，或者父母给你红包。\n\n"又长了一岁，要懂事啊。"妈妈说。',
    thoughts: '给父母拜年，虽然简单但很有仪式感。'
  },
  new_year_neighbors: {
    scene: '你去邻居家拜年。\n\n"新年好！"你敲开门。\n\n"新年好！快进来坐！"邻居热情地招呼你。\n\n你们聊了几句，互相祝福新年快乐。',
    thoughts: '邻里之间的情谊，还是很温暖的。'
  },
  receive_relatives: {
    scene: '亲戚们来拜年了。\n\n你忙着泡茶、端水果，招待客人。\n\n"这孩子真懂事。"亲戚夸你。\n\n你笑着回应，虽然有点累，但还是要保持礼貌。',
    thoughts: '招待亲戚虽然累，但这是应该的。'
  },
  play_cards: {
    scene: '你和兄弟姐妹一起打牌。\n\n"哈哈，我赢了！"你兴奋地说。\n\n"再来一局！"大家兴致勃勃。\n\n虽然只是小打小闹，但玩得很开心。',
    thoughts: '和家人一起打牌，输赢不重要，开心就好。'
  },
  family_dinner: {
    scene: '晚上，一家人围坐在一起吃饭。\n\n"来，干杯！"爸爸举起酒杯。\n\n你选择喝酒或不喝酒，但无论如何，这顿饭都充满了温馨。\n\n"新的一年，要加油啊！"妈妈说。',
    thoughts: '一家人在一起吃饭，这就是家的味道。'
  },
  
  // 随机事件
  classmate_drink: {
    scene: '老同学发来消息："晚上出来喝酒啊？"\n\n你犹豫了一下，是去还是不去？\n\n如果去的话，可能会玩得很晚，但能和老朋友聚聚也不错。\n\n如果不去，可能会被说不够意思...',
    thoughts: '老同学约喝酒，去还是不去呢？'
  },
  relative_borrow: {
    scene: '有亲戚找到你："最近手头有点紧，能不能借点钱？"\n\n你心里有点纠结。\n\n借吧，可能自己也不宽裕；不借吧，又怕伤了和气。\n\n"这个..."你犹豫着。',
    thoughts: '亲戚借钱，真是让人为难...'
  },
  relative_pressure: {
    scene: '饭桌上，亲戚们的话题精准落在你身上。\n\n"工资多少了？买房了吗？"\n\n"对象呢？孩子呢？"\n\n你夹着菜，笑容逐渐职业化。',
    thoughts: '春节饭桌有时候像一场面试。'
  },
  forced_drinking: {
    scene: '"来来来，再走一个！"亲戚把酒杯递到你面前。\n\n"不喝就是不给面子啊。"\n\n你看着杯子，胃先紧张了。',
    thoughts: '喝不喝都难受，这局很难。'
  },
  red_packet_pressure: {
    scene: '小辈们一排站好，齐声拜年。\n\n你摸了摸红包，心里默算了一遍预算。\n\n今天的关键词：面子和余额二选一。',
    thoughts: '红包发出去的是祝福，流走的是现金流。'
  },
  old_classmate_compare: {
    scene: '同学局开始十分钟后，话题从“最近咋样”升级成“谁混得更好”。\n\n有人聊年薪，有人聊房车。\n\n你笑着听，心里在找退场时机。',
    thoughts: '同学会有时像年度对账会。'
  },
  blind_date: {
    scene: '有人给你介绍对象："我认识一个不错的，要不要见见？"\n\n你心里五味杂陈。\n\n一方面觉得相亲有点尴尬，另一方面又觉得也许是个机会。\n\n"这个..."你犹豫着。',
    thoughts: '又被介绍相亲了...去还是不去呢？'
  },
  overtime: {
    scene: '公司发来消息："临时有个项目，需要你加个班。"\n\n你看着消息，心里很不爽。\n\n"大过年的还要加班？"你抱怨道。\n\n但如果不加班，可能会影响工作...',
    thoughts: '大过年的还要加班，真是无语...'
  },
  
  // 返程准备
  pack: {
    scene: '你开始收拾行李，准备返程。\n\n妈妈在一旁看着，时不时往你箱子里塞东西。\n\n"这个带上，那个也带上..."妈妈不停地往箱子里装。\n\n"够了够了，装不下了。"你笑着说。',
    thoughts: '又要走了，真舍不得...'
  },
  farewell_meal: {
    scene: '最后一顿饭，妈妈做了很多你爱吃的菜。\n\n"多吃点，回去就吃不到了。"妈妈说。\n\n你默默地吃着，心里有点难受。\n\n"下次什么时候回来？"爸爸问。',
    thoughts: '又要离开家了，心里真不是滋味...'
  },
  heart_to_heart: {
    scene: '晚上，你和父母坐在客厅，聊起了心里话。\n\n"在外面要照顾好自己。"妈妈说。\n\n"我知道，你们也要注意身体。"你说。\n\n你们聊了很久，说了很多平时不会说的话。',
    thoughts: '和父母聊心里话，感觉距离更近了。'
  },
  
  // 成功失败事件场景
  basketball_game_success: {
    scene: '你和朋友们在球场上挥汗如雨。\n\n"好球！"你投进了一个三分球。\n\n"今天状态不错啊！"朋友夸你。\n\n你们打得很尽兴，虽然累但很开心。',
    thoughts: '打篮球真爽，今天发挥不错！'
  },
  basketball_game_fail: {
    scene: '你和朋友们在球场上打球。\n\n"哎呀，没投进..."你有点沮丧。\n\n"没事，再来！"朋友鼓励你。\n\n虽然打得不太好，但运动一下还是不错的。',
    thoughts: '今天状态不太好，但运动一下也挺好的。'
  },
  table_tennis_success: {
    scene: '你和亲戚在打乒乓球。\n\n"好球！"你打出了一个漂亮的扣杀。\n\n"这孩子技术不错！"亲戚夸你。\n\n你们打得很开心，气氛很融洽。',
    thoughts: '打乒乓球真有意思，和亲戚关系更好了。'
  },
  table_tennis_fail: {
    scene: '你和亲戚在打乒乓球。\n\n"哎呀，又没接住..."你有点尴尬。\n\n"没事，慢慢来。"亲戚笑着说。\n\n虽然打得不太好，但一起玩还是很开心的。',
    thoughts: '技术不太行，但和亲戚一起玩还挺开心的。'
  },
  mahjong_success: {
    scene: '你和亲戚们一起打麻将。\n\n"胡了！"你兴奋地说。\n\n"手气不错啊！"亲戚们笑着说。\n\n你赢了一些钱，虽然不多但很开心。',
    thoughts: '今天手气不错，赢了一些钱。'
  },
  mahjong_fail: {
    scene: '你和亲戚们一起打麻将。\n\n"哎呀，又输了..."你有点心疼。\n\n"没事，娱乐而已。"亲戚安慰你。\n\n虽然输了一些钱，但大家一起玩还是很开心的。',
    thoughts: '今天手气不太好，输了一些钱，但娱乐而已。'
  },
  poker_success: {
    scene: '你和朋友们一起打牌。\n\n"我赢了！"你兴奋地说。\n\n"手气不错啊！"朋友们笑着说。\n\n你赢了一些钱，虽然不多但很开心。',
    thoughts: '今天手气不错，赢了一些钱。'
  },
  poker_fail: {
    scene: '你和朋友们一起打牌。\n\n"哎呀，又输了..."你有点心疼。\n\n"没事，娱乐而已。"朋友安慰你。\n\n虽然输了一些钱，但大家一起玩还是很开心的。',
    thoughts: '今天手气不太好，输了一些钱，但娱乐而已。'
  },
  competition_success: {
    scene: '你参加了社区/村里的比赛。\n\n"恭喜你获得第一名！"主持人宣布。\n\n"太好了！"你兴奋地说。\n\n你获得了奖金和荣誉，大家都很为你高兴。',
    thoughts: '太棒了！获得了第一名，还有奖金！'
  },
  competition_fail: {
    scene: '你参加了社区/村里的比赛。\n\n"很遗憾，你没有获奖..."主持人说。\n\n"没事，重在参与。"你安慰自己。\n\n虽然没获奖，但参与的过程还是很开心的。',
    thoughts: '虽然没获奖，但参与的过程还是很开心的。'
  }
}

// 根据事件ID和选择获取场景
export function getEventScene(eventId, choiceId = null, state = null, dialogueRound = 0) {
  // 处理成功失败事件（如果有_lastEventSuccess标记）
  if (state && state._lastEventSuccess !== undefined) {
    const successKey = state._lastEventSuccess ? `${eventId}_success` : `${eventId}_fail`
    if (EVENT_SCENES[successKey]) {
      return EVENT_SCENES[successKey]
    }
  }
  
  // 特殊处理：聊天工作
  if (eventId === 'chat_work' && state) {
    return generateWorkChatContent(state)
  }
  
  // 特殊处理：聊天对象
  if (eventId === 'chat_love' && state) {
    return generateLoveChatContent(state)
  }
  // 特殊处理：孩子/催生话题（复用婚姻状态对话生成）
  if (eventId === 'child_topic' && state) {
    return generateLoveChatContent(state)
  }

  // 特殊处理：亲戚借钱连续对话（按属性和选择）
  if (eventId === 'relative_borrow' && state) {
    return generateRelativeBorrowScene(choiceId, state)
  }

  // 特殊处理：相亲连续对话（按属性和选择）
  if (eventId === 'blind_date' && state) {
    return generateBlindDateScene(choiceId, state)
  }

  // 特殊处理：亲戚压力连续对话（按选择）
  if (eventId === 'relative_pressure' && state) {
    return generateRelativePressureScene(choiceId, state)
  }
  
  // 特殊处理：走亲访友使用年货
  if (choiceId && state && state.inventory) {
    const visitIds = ['grandparents', 'uncle', 'aunt', 'cousin']
    if (visitIds.includes(choiceId)) {
      const goodsLevel = state.inventory.newYearGoods || 0
      let message = ''
      if (goodsLevel === 0) {
        message = '你空手去串门，亲戚虽然没说什么，但感觉有点尴尬...'
      } else if (goodsLevel === 1) {
        message = '你带了年货去串门，虽然不贵，但心意到了。'
      } else if (goodsLevel === 2) {
        message = '你带了不错的年货去串门，亲戚很高兴。'
      } else {
        message = '你带了很好的年货去串门，亲戚非常满意。'
      }
      
      const relativeName = choiceId === 'grandparents' ? '爷爷奶奶' : 
                          choiceId === 'uncle' ? '舅舅' : 
                          choiceId === 'aunt' ? '姑姑' : '表兄弟'
      
      return {
        scene: `你去${relativeName}家拜年。\n\n${message}`,
        thoughts: message
      }
    }
  }
  
  // 特殊处理：接待亲戚时检查卫生
  if (eventId === 'receive_relatives' && state && state.inventory) {
    if (!state.inventory.hasCleaned) {
      return {
        scene: '亲戚们来拜年了。\n\n你忙着招待客人，但亲戚看到家里有点乱，虽然没明说，但眼神里有些不满...\n\n"最近工作忙吧？"亲戚委婉地说。',
        thoughts: '没搞卫生就被亲戚看到了，有点尴尬...'
      }
    }
  }

  // 按概率混入“弱智吧风格”场景，避免全程同一种语气
  if (Math.random() < 0.45) {
    const abstractScene = getAbstractScene(eventId, choiceId)
    if (abstractScene) {
      return abstractScene
    }
  }
  
  // 优先使用口语化场景
  const casualScene = getCasualScene(eventId, choiceId)
  if (casualScene) {
    return casualScene
  }
  
  const sceneKey = choiceId ? `${eventId}_${choiceId}` : eventId
  let scene = EVENT_SCENES[sceneKey] || EVENT_SCENES[eventId]
  
  // 如果没有找到，尝试生成通用场景
  if (!scene) {
    scene = {
      scene: '你选择了这个行动...',
      thoughts: '做了这个选择，不知道会怎样。'
    }
  }
  
  // 根据状态调整想法
  if (state && scene.thoughts) {
    // 可以根据家庭关系等调整想法
    const familyRelation = state.attributes?.familyRelation?.value || 50
    if (familyRelation < 40 && scene.thoughts.includes('温暖')) {
      scene.thoughts = '虽然有点尴尬，但还是做了。'
    }
  }
  
  return scene
}

function generateRelativeBorrowScene(choiceId, state) {
  const balance = state.stats?.balance || 0
  const relation = state.attributes?.familyRelation?.value || 50
  const opener = balance < 1000
    ? '"你最近手头还行吗？能不能先借我一点应急..."亲戚压低声音说。'
    : '"最近有点周转不开，能不能借我点钱？"亲戚有点尴尬地开口。'

  if (choiceId === 'lend') {
    return {
      scene: `${opener}\n\n你沉默两秒，还是把钱转了过去。\n\n"真谢谢你，我这边缓过来第一时间还你。"对方连声道谢。\n\n你点点头："先把眼前难关过了吧。"` ,
      thoughts: relation >= 70 ? '关系摆在这，能帮一把就帮一把。' : '借出去那一刻，心里还是有点打鼓。'
    }
  }

  if (choiceId === 'lend_partial') {
    return {
      scene: `${opener}\n\n"我这边也不宽裕，只能先借你一部分。"你说。\n\n亲戚连忙点头："有一点是一点，先谢了。"\n\n你把金额敲进转账框，手指停顿了一下还是按了确认。`,
      thoughts: '全借扛不住，折中一下至少不至于撕破脸。'
    }
  }

  if (choiceId === 'delay') {
    return {
      scene: `${opener}\n\n你先稳住语气："我这两天也在周转，过两天我看看再答复你。"\n\n亲戚笑了一下："行，那我等你消息。"\n\n话题就这么悬在空中，谁都没再往下说。`,
      thoughts: '先拖一手，给自己留点回旋空间。'
    }
  }

  if (choiceId === 'explain_poor') {
    return {
      scene: `${opener}\n\n你苦笑："我现在返程票都得算着买，真拿不出。"\n\n对方沉默两秒，叹了口气："行，我再想想别的办法。"\n\n你们都笑了笑，但空气有点干。`,
      thoughts: '不是不想帮，是真的口袋比脸还干净。'
    }
  }

  if (choiceId === 'refuse') {
    return {
      scene: `${opener}\n\n你吸了口气："这次我帮不了，真的。"\n\n亲戚点点头："明白。"\n\n话题戛然而止，碗筷声突然变得特别清楚。`,
      thoughts: '拒绝很难听，但有时候比硬撑更现实。'
    }
  }

  return {
    scene: `${opener}\n\n你一时没接上话，只能先把话题岔开。\n\n亲戚也看出你的为难，没再追问。`,
    thoughts: '这类话题最难的，不是选项，是开口那一秒。'
  }
}

function generateBlindDateScene(choiceId, state, dialogueRound = 0) {
  const skills = (state.attributes?.skills || []).map(s => s.id)
  const reputation = state.stats?.reputation || 50
  const isSocial = skills.includes('social_butterfly')
  const isAnxious = skills.includes('social_anxiety')
  const gender = state.attributes?.gender || 'male'
  const genderText = gender === 'female' ? '她' : '他'

  // 初始场景
  if (!choiceId && dialogueRound === 0) {
    return {
      scene: `"要不见一面？"介绍人问。\n\n你看着手机输入框，删删改改了好几次。\n\n"对方条件还不错，人也挺靠谱的。"介绍人补充道。\n\n你心里有点纠结：见还是不见？`,
      thoughts: isSocial ? '关系可以慢慢聊出来，不急这一拍。' : '社交这事急不来，先别把自己逼死。',
      choices: [
        { id: 'go', name: '去见面', changes: { spirit: -18, reputation: 10, balance: -120 } },
        { id: 'refuse', name: '不去', changes: { reputation: -12 } },
        ...(isSocial ? [{ id: 'go_confident', name: '主动推进（社牛模式）', changes: { spirit: 8, reputation: 12, balance: -180 } }] : []),
        ...(isAnxious ? [{ id: 'online_first', name: '先线上聊聊', changes: { spirit: -4, reputation: 4 } }] : []),
        ...(reputation >= 70 && state.attributes?.familyRelation?.value >= 70 ? [{ id: 'family_assist', name: '让父母先探口风', changes: { spirit: 0, reputation: 8 } }] : [])
      ]
    }
  }

  if (choiceId === 'go_confident') {
    return {
      scene: `你提前十分钟到场，先把话题准备在心里过了一遍。\n\n${genderText}坐下后你先开口："路上堵吗？我刚好也卡了一会。"\n\n${genderText}笑了笑："是啊，过年期间哪都堵。"\n\n气氛很快热起来，从工作聊到旅行，再聊到过年的糗事。\n\n"你平时喜欢做什么？"你主动问。\n\n${genderText}说："我喜欢看电影，偶尔也看看书。"\n\n你们聊得很投机，时间过得很快。\n\n散场时${genderText}笑着说："改天再约？"`,
      thoughts: '社交这块今天手感不错，至少没冷场。'
    }
  }

  if (choiceId === 'online_first') {
    return {
      scene: '你先提议线上聊几句。\n\n"先认识下，免得见面太尬。"你发过去。\n\n对方回了个表情包："可以，我也怕尬聊。"\n\n你们开始线上聊天，从工作聊到兴趣爱好，再到对未来的规划。\n\n"你平时周末都做什么？"对方问。\n\n"我比较宅，喜欢在家看看剧。"你回复。\n\n"我也是，最近在追一部剧。"\n\n聊了半小时后，你心里稍微稳了一点。\n\n"要不我们见一面？"对方主动提议。',
      thoughts: isAnxious ? '先线上缓冲一下，比硬着头皮见面好多了。' : '先试探节奏，再决定线下更稳妥。',
      choices: [
        { id: 'go_after_online', name: '好的，见面聊聊', changes: { spirit: -10, reputation: 8, balance: -120 } },
        { id: 'delay_meet', name: '再聊几天看看', changes: { spirit: -2, reputation: 2 } }
      ]
    }
  }

  if (choiceId === 'family_assist') {
    return {
      scene: '你让爸妈先打了个前站。\n\n"人挺实在的，先吃个饭见见。"妈妈回来后说。\n\n"对方家里条件也不错，人看着也靠谱。"爸爸补充。\n\n你点点头："那我过两天约个时间。"\n\n"行，你们年轻人自己聊。"妈妈说。\n\n这次不是被推着走，而是有点掌控感。\n\n你给对方发了消息："听介绍人说你人不错，要不我们见一面？"',
      thoughts: reputation >= 70 ? '家里愿意帮你搭桥，省了很多尴尬。' : '让父母先探口风，至少不会一上来就翻车。',
      choices: [
        { id: 'go_after_family', name: '约个时间见面', changes: { spirit: -8, reputation: 10, balance: -120 } }
      ]
    }
  }

  if (choiceId === 'go' || choiceId === 'go_after_online' || choiceId === 'go_after_family') {
    return {
      scene: `你坐在咖啡馆里，手心有点出汗。\n\n"你好，我是XX介绍来的。"${genderText}坐下。\n\n"你好，我也刚到。"你回应。\n\n前十分钟你们都在礼貌微笑，气氛有点尴尬。\n\n"你平时做什么工作？"${genderText}先开口。\n\n你简单介绍了一下自己的工作。\n\n"听起来挺有意思的。"${genderText}说。\n\n后面慢慢聊开了，从工作聊到生活，再到对未来的想法。\n\n"你觉得两个人在一起最重要的是什么？"${genderText}问。\n\n你思考了一下："我觉得是互相理解和尊重吧。"\n\n${genderText}点点头："我也这么觉得。"\n\n离开时你们互相点头："回头再联系。"`,
      thoughts: '没想象中那么可怕，但也确实挺耗精神。'
    }
  }

  if (choiceId === 'refuse') {
    return {
      scene: '"这次先不见了，最近状态不太对。"你给介绍人发消息。\n\n对面很快回复："行，我跟那边说一声。"\n\n"不过你也要考虑一下，毕竟年龄也不小了。"介绍人又补充了一句。\n\n你把手机扣在桌上，长长吐了口气。\n\n心里有点愧疚，但又觉得这样是对的。',
      thoughts: '拒绝有代价，但硬上头的代价有时更大。'
    }
  }

  if (choiceId === 'delay_meet') {
    return {
      scene: '"再聊几天看看，我们多了解一下。"你回复。\n\n"好的，我也觉得这样更稳妥。"对方说。\n\n你们继续线上聊天，每天都会聊几句。\n\n几天后，对方又提起了见面的事："要不我们见一面？"',
      thoughts: '线上聊得还不错，但见面还是有点紧张。',
      choices: [
        { id: 'go_after_online', name: '好的，见面聊聊', changes: { spirit: -10, reputation: 8, balance: -120 } },
        { id: 'delay_meet_again', name: '再等等', changes: { spirit: -4, reputation: -2 } }
      ]
    }
  }

  return {
    scene: '"要不见一面？"介绍人问。\n\n你看着手机输入框，删删改改了好几次。\n\n这事没法一步到位，只能按自己的节奏来。',
    thoughts: isSocial ? '关系可以慢慢聊出来，不急这一拍。' : '社交这事急不来，先别把自己逼死。'
  }
}

function generateRelativePressureScene(choiceId, state) {
  const hasChildren = !!state.attributes?.hasChildren

  if (choiceId === 'endure') {
    return {
      scene: '"年终奖多少？房子买哪了？"亲戚一连三问。\n\n你端着杯子点头微笑："都在推进。"\n\n"那对象/孩子呢？"\n\n你继续微笑，像客服机器人进入了自动回复模式。',
      thoughts: '成年人最强技能之一：把崩溃翻译成礼貌。'
    }
  }

  if (choiceId === 'retort') {
    return {
      scene: '"你怎么还没……"亲戚话说到一半。\n\n你笑了下："叔，您那套基金今年回本了吗？"\n\n饭桌突然安静两秒，有人开始低头夹菜。\n\n你知道，今天这顿饭的温度要降了。',
      thoughts: '回怼很爽，后果也很快。'
    }
  }

  if (choiceId === 'escape') {
    return {
      scene: '你看准空档站起来："我去厨房帮个忙。"\n\n有人在背后喊："诶还没聊完呢！"\n\n你假装没听见，先把自己从火力中心撤出来。',
      thoughts: '战略撤退，不丢人。'
    }
  }

  if (choiceId === 'shift_to_child' && hasChildren) {
    return {
      scene: '"最近工作咋样？存款多少了？"亲戚又开问。\n\n你直接掏出手机："来来来，看下我家娃最近这段视频。"\n\n桌上瞬间被"哎呀真可爱"接管，话题成功转向。',
      thoughts: '有娃之后，很多尴尬都能被"看孩子"一键转移。'
    }
  }

  return {
    scene: '亲戚们的问题像连发弹幕，你一时不知道先回哪句。\n\n你笑着打哈哈，把最尖锐的话题慢慢带过去。',
    thoughts: '饭桌社交本质上是高压环境下的即兴发挥。'
  }
}

// 生成日记想法
export function generateDiaryThoughts(event, choice = null, changes = {}) {
  const randomChoice = (array) => array[Math.floor(Math.random() * array.length)]
  
  // 金钱变化：弱智吧风
  if (changes.balance && changes.balance < 0) {
    const amount = Math.abs(changes.balance)
    if (amount >= 1000) {
      return randomChoice([
        '钱包今天做了核酸，结果是阳性：阳了个光。',
        '钱不是花没的，是被春节这个黑洞礼貌吸走的。',
        '我的余额像烟花，响一下就没了。'
      ])
    } else if (amount >= 500) {
      return randomChoice([
        '钱离开我的速度，像我小时候放走的风筝。',
        '不是我花钱快，是人民币看见过年会自己跑。',
        '中等出血，暂无生命危险。'
      ])
    } else {
      return randomChoice([
        '小额掉血，属于钱包的日常磨损。',
        '花得不多，但足够让我看余额时深呼吸。',
        '这钱不叫花出去，叫战略性转移。'
      ])
    }
  }
  
  if (changes.balance && changes.balance > 0) {
    return randomChoice([
      '收到的钱像冬天的太阳，不大，但确实暖。',
      '今天钱包回春了一点，属于医学奇迹。',
      '这波是反向收割亲戚局。'
    ])
  }
  
  if (changes.health && changes.health < 0) {
    return randomChoice([
      '今天身体告诉我：人类不是永动机。',
      '健康值在掉，嘴上却还在说“问题不大”。',
      '我的膝盖和腰一致认为：该休息了。'
    ])
  }
  
  if (changes.spirit && changes.spirit < 0) {
    return randomChoice([
      '精神状态像抢票页面：一直转圈。',
      '心情有点堵，像春运高速的应急车道。',
      '我没emo，我只是和快乐错峰出行。'
    ])
  }
  
  if (changes.spirit && changes.spirit > 0) {
    return randomChoice([
      '心情回暖，像电热毯终于通电。',
      '精神值上来了，连空气都顺眼了。',
      '今天这波，灵魂没有掉线。'
    ])
  }
  
  if (changes.reputation && changes.reputation > 0) {
    return randomChoice([
      '亲戚局风评回升，评论区暂时友善。',
      '今天的人情世故算是对线成功。',
      '口碑上涨，说明我还没被家族群拉黑。'
    ])
  }

  if (changes.reputation && changes.reputation < 0) {
    return randomChoice([
      '风评有点裂开，我先潜水观察风向。',
      '这波操作在亲戚群里不太加分。',
      '口碑下滑，建议明天少说多笑。'
    ])
  }
  
  // 默认想法
  return randomChoice([
    '今天先这样，明天再跟命运掰扯。',
    '我以为我在过年，年以为它在过我。',
    '先记一笔，等以后回看再笑自己。'
  ])
}
