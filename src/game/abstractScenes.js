// 弱智吧风格场景：跳脱、反逻辑、带一点诗意和黑色幽默

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const ABSTRACT_THOUGHTS = {
  logic: [
    '等红灯本质是在等绿灯，人生很多等待也是。',
    '我刚刚明白，事情能解决说明它本来就能解决。',
    '我以为我在做选择，后来发现选择也在做我。',
    '如果结果已经注定，那过程至少要有梗。'
  ],
  poetic: [
    '闹钟敲碎了梦，梦里那个人可能也在上班。',
    '伞像一条倒着划天的船，我是船上那个漏水的人。',
    '回忆像刻舟求剑，船一直走，剑一直沉。',
    '灯一亮，影子就开工了。'
  ],
  dark: [
    '成年人的崩溃从“算了”开始，我今天差点“算了”。',
    '前途像玻璃瓶里的苍蝇，看见光，不一定看见路。',
    '真相不一定体面，但很会打脸。',
    '人生像电话，总有人先挂。'
  ],
  absurd: [
    '我本来想稳一手，结果稳到了别人的节奏里。',
    '运气这个东西，跟闹钟一样，专挑你不想见的时候来。',
    '今天我没赢，但我赢得了“下次一定”。',
    '世界很合理，只是合理得有点离谱。'
  ]
}

function pickThought(category) {
  return randomChoice(ABSTRACT_THOUGHTS[category] || ABSTRACT_THOUGHTS.absurd)
}

export function getAbstractScene(eventId, choiceId = null) {
  const key = choiceId ? `${eventId}_${choiceId}` : eventId

  const map = {
    clean: {
      scene: '你拿着扫把站在客厅中央，突然觉得灰尘像KPI，扫完一层还有一层。\n\n妈妈说“左边角落别漏了”，你点头如捣蒜，像在听年终复盘。\n\n地板终于发光了，你也差点原地关机。',
      thoughts: pickThought('logic')
    },
    rest: {
      scene: '你往沙发上一躺，姿势标准得像一张“请勿打扰”的系统弹窗。\n\n手机刷了三十分钟，休息了五分钟，罪恶感在线加班。\n\n你悟了：躺平不是不努力，是给灵魂充电但充电器没插好。',
      thoughts: pickThought('absurd')
    },
    chat_work: {
      scene: '你跟父母聊工作，聊着聊着像在开跨部门会议。\n\n“最近忙不忙？”这句话像万能接口，能接住一切情绪。\n\n你说“还行”，其实这个词里打包了加班、焦虑和咖啡因。',
      thoughts: pickThought('dark')
    },
    chat_love: {
      scene: '话题从天气丝滑漂移到感情，速度比高铁进站还自然。\n\n你端着水杯假装镇定，内心弹幕已经刷到下一季。\n\n爱这件事很像抢票，点得慢了没座，点得快了也不一定有票。',
      thoughts: pickThought('logic')
    },
    classmate_drink_go: {
      scene: '酒杯一碰，青春就自动续费。\n\n你们从“最近怎么样”聊到“当年那谁”，每句话都像在挖时间胶囊。\n\n散场时你走在风里，感觉自己年轻了三杯。',
      thoughts: pickThought('poetic')
    },
    classmate_drink_refuse: {
      scene: '你拒绝了饭局，手机安静得像一片雪地。\n\n朋友回了个“行，下次”，你盯着这三个字看了两秒。\n\n成年人的“下次”有两种：真的下次，和礼貌下次。',
      thoughts: pickThought('dark')
    },
    overtime_work: {
      scene: '电脑一开，你家立刻出现了一个临时工位。\n\n客厅是春晚，房间是工位，门一关就是平行宇宙。\n\n你敲键盘的声音像小年夜里的鞭炮，只是没人觉得喜庆。',
      thoughts: pickThought('dark')
    },
    basketball_game: {
      scene: '球场上你来回折返，呼吸声像老旧风箱。\n\n进球那一刻你是主角，打铁那一刻你是背景板。\n\n体育的公平在于：不会因为你昨天难过，今天就放你一马。',
      thoughts: pickThought('logic')
    },
    table_tennis: {
      scene: '小球在桌面来回弹跳，像你这几年反复横跳的计划。\n\n亲戚说“好球”，你谦虚地点头，手心全是汗。\n\n你突然明白：有些关系就是靠来回接球维持的。',
      thoughts: pickThought('poetic')
    },
    mahjong: {
      scene: '麻将一摆，亲情进入实时结算模式。\n\n你摸牌时像在抽命运盲盒，胡牌靠天，输钱靠手。\n\n散场后你学会了：运气会守恒，但不一定守在你这桌。',
      thoughts: pickThought('absurd')
    },
    poker: {
      scene: '牌桌上最响的不是笑声，是“再来一把”。\n\n你一边算概率一边信玄学，理性和迷信在脑子里打架。\n\n最后你发现，真正稳定的只有“有输有赢”这件事。',
      thoughts: pickThought('logic')
    },
    competition: {
      scene: '你站上赛场，观众比你还紧张，只有评委看起来像天气预报。\n\n赢了是实至名归，输了是重在参与，文案永远有台阶。\n\n你鞠了一躬，突然觉得体面有时候比名次更贵。',
      thoughts: pickThought('poetic')
    }
  }

  return map[key] || map[eventId] || null
}

