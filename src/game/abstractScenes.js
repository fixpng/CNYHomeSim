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
    },

    // 新增抽象场景
    childhood_friend: {
      scene: '你和发小站在路边，像两张旧照片突然被翻了出来。\n\n你们对视的那一秒，时间倒带了十五年，又瞬间快进回来。\n\n"好久不见"这四个字的信息量，比整个春节加起来还大。',
      thoughts: pickThought('poetic')
    },
    stray_pet: {
      scene: '一只猫看着你，你看着一只猫。\n\n你们在大年初几的路边完成了一次跨物种的眼神交流。\n\n它不说话，你也不说话，但你们都知道：彼此今天都有点难。',
      thoughts: pickThought('poetic')
    },
    night_walk: {
      scene: '你走在夜路上，影子比你走得还稳。\n\n远处的灯光像碎掉的星星掉在了地上。\n\n你突然觉得，人一安静下来，思考的带宽就够用了。',
      thoughts: pickThought('logic')
    },
    family_conflict: {
      scene: '饭桌上的气压从海平面降到了地下停车场。\n\n每个人都在用筷子表演"我很淡定"，但眼神在打群架。\n\n你夹了一口菜，发现菜都变味了——不是味道变了，是氛围。',
      thoughts: pickThought('dark')
    },
    dream_project: {
      scene: '你的脑子突然像开了一个新标签页。\n\n这个想法就像凌晨三点的灵感，听起来天才，醒来可能是段子。\n\n但你还是打开了备忘录，因为有些念头，不写下来就会自动关机。',
      thoughts: pickThought('logic')
    },
    argument_with_parents: {
      scene: '你和父母之间的空气变成了一堵透明的墙。\n\n你们说的每句话都在对的方向上，只是音量不对。\n\n吵架的本质不是谁对谁错，是谁先把爱包装成了愤怒。',
      thoughts: pickThought('dark')
    },
    family_karaoke: {
      scene: '音响一开，客厅变成了综艺录制现场。\n\n每个人都觉得自己是隐藏歌手，观众只有一个共识：耳朵在加班。\n\n但你发现，跑调的歌也能让人笑出眼泪来。',
      thoughts: pickThought('absurd')
    },
    childhood_spot: {
      scene: '你站在一个老地方，时间在这里停摆了。\n\n墙上的痕迹像一条时间线，标注着"这里曾经有个小孩叫你"。\n\n你想伸手摸一下，但怕碰碎了什么。',
      thoughts: pickThought('poetic')
    },
    write_letter: {
      scene: '你拿着笔，发现最难写的不是论文，是给爸妈的信。\n\n每个字都像在解压一个打包了很多年的文件夹。\n\n写到最后你才发现，所谓长大，就是终于能把"谢谢"和"对不起"写在同一页纸上。',
      thoughts: pickThought('poetic')
    },
    give_parents_money: {
      scene: '你把钱偷偷塞在枕头底下，动作像在执行一个秘密任务。\n\n这笔钱的金额不重要，重要的是你希望他们发现时会笑。\n\n有些爱就是这样：不说出口，但留在伸手就能摸到的地方。',
      thoughts: pickThought('poetic')
    },
    local_market: {
      scene: '集市上的吆喝声像一首没有版权的交响乐。\n\n每个摊主都是独立厂牌，每个价格都可以二次创作。\n\n你跟着人群走，发现赶集的本质是一场大型线下盲盒。',
      thoughts: pickThought('absurd')
    },
    new_year_movie: {
      scene: '电影院里黑灯瞎火，你和家人坐在一排。\n\n银幕上的故事是别人的，你们的故事正在发生。\n\n散场时灯一亮，每个人的表情就是今天的影评。',
      thoughts: pickThought('poetic')
    },
    temple_visit: {
      scene: '你在庙里闻到了一种叫"安心"的味道。\n\n不知道是香火的味道，还是心静下来的味道。\n\n你许了个愿，然后想了想，把愿望改小了一号——怕菩萨觉得你贪心。',
      thoughts: pickThought('absurd')
    },
    hometown_change: {
      scene: '家乡像一个你很久没登录的账号，头像变了，签名变了。\n\n你走在路上，发现记忆里的坐标都偏移了。\n\n但脚下的土地还认识你的鞋底。',
      thoughts: pickThought('poetic')
    },
    video_games: {
      scene: '你打开游戏的那一刻，时间加速了300%。\n\n妈妈的催促声像背景音乐，你选择了静音。\n\n"最后一局"是一种量子状态：说出来之前它可能是真的。',
      thoughts: pickThought('absurd')
    },
    old_photo_album: {
      scene: '老照片里的你在笑，现在的你也在笑。\n\n中间隔了十几年，笑容的含义变了好几次。\n\n时间不会说话，但它把答案都夹在了相册里。',
      thoughts: pickThought('poetic')
    },
    wifi_down: {
      scene: '断网的那一刻，你和现代文明脱节了。\n\n你盯着路由器看，像盯着一个背叛你的朋友。\n\n但五分钟后你发现，没网的日子也不是不能活。',
      thoughts: pickThought('logic')
    },
    parent_cooking_battle: {
      scene: '爸妈在厨房里PK，你在外面等结果。\n\n锅铲碰撞声像一场微型武林大会。\n\n你是评委，但评委的命运取决于选哪边赢。',
      thoughts: pickThought('absurd')
    },
    sudden_rain: {
      scene: '雨说下就下了，像天空突然想起了什么。\n\n你站在屋檐下看雨，雨在屋檐下看你。\n\n世界突然安静了，只剩下水滴在数秒。',
      thoughts: pickThought('poetic')
    }
  }

  return map[key] || map[eventId] || null
}

