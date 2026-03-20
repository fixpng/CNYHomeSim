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
  },

  // ===== 新增事件场景 =====

  // 贴春联
  paste_couplets: {
    scene: '你和爸爸一起贴春联。\n\n"高一点...再左边一点..."你站在梯子上，爸爸在下面指挥。\n\n"这副春联写得不错。"爸爸满意地点头。\n\n贴完春联，又在大门上贴了个倒着的"福"字。\n\n"福到了！"妈妈在一旁笑着说。',
    thoughts: '和爸爸一起贴春联，年味一下子就有了。'
  },
  call_grandparents: {
    scene: '你拨通了远方亲人的电话。\n\n"喂，爷爷/奶奶，过年好！"\n\n"好好好，你也过年好！今年回来了没？"\n\n"回来了，在家呢。"\n\n"那就好那就好，注意身体啊..."\n\n电话里的声音有点含糊，但满是关心。',
    thoughts: '有些人虽然见不到面，但过年打个电话也是一种陪伴。'
  },
  morning_exercise: {
    scene: '大年初一的清晨，你早早起来做了个早操。\n\n外面空气很好，远处有零星的鞭炮声。\n\n"这么早就起了？"爸爸从屋里出来。\n\n"新年第一天，精神一下。"你笑着说。',
    thoughts: '新年第一天，从运动开始，感觉不错。'
  },
  red_packet_battle: {
    scene: '亲戚群里突然开始发红包。\n\n你的手指像开了倍速，每个红包都抢到了。\n\n"手速可以啊！"表弟发了个竖大拇指。\n\n你得意地笑了笑，虽然金额不大，但抢红包的感觉就是爽。',
    thoughts: '抢红包这事，跟打游戏一样上头。'
  },
  set_off_fireworks: {
    scene: '你和家人一起在门口放鞭炮。\n\n"轰——"鞭炮声响彻夜空。\n\n"好大声！"你捂着耳朵笑。\n\n夜空中烟花绽放，五颜六色的光点照亮了每个人的脸。\n\n"新年快乐！"你们齐声喊道。',
    thoughts: '烟花一放，年味就拉满了。'
  },

  // 多日剧情线场景
  childhood_friend: {
    scene: '你在街上走着，突然有人从背后拍了你一下。\n\n"哎？你不是...小X？"\n\n你转头一看，是从小一起长大的发小，好几年没见了。\n\n"还真是你！变了好多！"你惊讶地说。\n\n"你也是，都认不出来了。"发小笑着说。',
    thoughts: '好久没见的发小，变化真大。'
  },
  childhood_friend_deep: {
    scene: '发小找到你说："有个事想跟你聊聊，方便吗？"\n\n你们找了个安静的地方坐下来。',
    thoughts: '发小好像有心事。'
  },
  stray_pet: {
    scene: '你路过村口/小区门口，看到一只瘦巴巴的猫蜷缩在角落。\n\n它抬头看了你一眼，"喵"了一声，声音很轻。\n\n它的毛有些脏，但眼睛很亮。\n\n你蹲下来看了看，心里有点不忍。',
    thoughts: '这只猫好可怜，要不要管它？'
  },
  stray_pet_care: {
    scene: '你收养的小猫今天精神不错，在屋里跑来跑去。\n\n妈妈看了一眼："这猫挺活泼的，不过你走了它怎么办？"\n\n你也开始认真思考这个问题了。',
    thoughts: '养了就有责任，得给它想个出路。'
  },
  village_gossip: {
    scene: '你刚出门，就看到好几个邻居聚在一起聊得热火朝天。\n\n"你听说了吗？隔壁老李家的儿子..."\n\n见你过来，有人招呼你："你也来听听。"',
    thoughts: '村里的消息传播速度比5G还快。'
  },
  night_walk: {
    scene: '吃完饭后，你决定出去走走。\n\n夜色很静，远处有几户人家的灯光，空气里还残留着鞭炮的味道。',
    thoughts: '夜间散步，感觉整个人都安静下来了。'
  },
  cook_special: {
    scene: '你决定露一手，做一道在外面学的拿手菜。\n\n"今天我来做！"你信心满满地走进厨房。\n\n妈妈站在一旁，又好奇又担心地看着你。',
    thoughts: '难得回来一趟，做道菜给家人尝尝。'
  },
  family_photo: {
    scene: '你提议说："难得一家人聚这么齐，不如拍张全家福？"\n\n"好主意！"妈妈马上开始整理头发。\n\n爸爸虽然嘴上说"拍什么拍"，但还是换了件干净衣服。',
    thoughts: '全家福，记录下这个团聚的时刻。'
  },
  online_shopping_fail: {
    scene: '你打开快递APP，物流信息显示：\n\n"您的包裹正在转运中心等待处理..."\n\n上面还标注了一行小字："受春节影响，预计延迟3-7天。"\n\n你叹了口气。',
    thoughts: '快递不放假是不可能的，快递也是要过年的。'
  },
  dream_project: {
    scene: '你坐在院子里发呆，突然脑子里闪过一个念头。\n\n"要不要试试做个XX？"\n\n这个想法越想越兴奋，你甚至开始在心里算账了。',
    thoughts: '这个想法到底靠不靠谱？'
  },
  dream_project_plan: {
    scene: '那个副业的想法一直在你脑海里盘旋。\n\n你越想越觉得可能可行，但又不确定。',
    thoughts: '想法是有了，但落地才是关键。'
  },
  family_conflict: {
    scene: '吃饭的时候，不知道谁提了一嘴以前的事，气氛突然变了。\n\n"说这些干什么！"爸爸拍了一下桌子。\n\n"本来就是你们..."对面的亲戚也不甘示弱。\n\n大家都停下了筷子，空气凝固了。',
    thoughts: '饭桌炸弹引爆了，这下该怎么办？'
  },
  family_conflict_resolve: {
    scene: '上次的事还没解决，家里气氛一直不太对。\n\n妈妈私下跟你说："你看看能不能帮忙缓和一下。"\n\n你知道这事不好办，但不解决总不是个事。',
    thoughts: '家庭矛盾就像一根刺，不拔掉始终不舒服。'
  },
  childhood_spot: {
    scene: '你经过小时候经常去的那个地方。\n\n也许是学校门口的小卖部，也许是村口的大树，也许是曾经玩耍的小河边。\n\n物是人非，但记忆还在。\n\n你站在那里，恍惚间仿佛回到了十年前。',
    thoughts: '时间过得真快，但这个地方还是那个样子。'
  },
  help_elderly: {
    scene: '你路上遇到了村里的老人，正吃力地搬着东西。\n\n"大爷/大妈，我帮您吧。"你走上前。\n\n"哎呦，谢谢你啊，这孩子真好。"老人感激地说。',
    thoughts: '帮助别人的感觉还挺好的。'
  },
  morning_run: {
    scene: '你一大早就出去跑步了。\n\n家乡的空气比城市里好多了，跑起来特别舒服。\n\n远处传来鸡叫声和零星的鞭炮声，很有年味。',
    thoughts: '在家乡跑步，感觉肺都被洗了一遍。'
  },
  morning_run_success: {
    scene: '你跑了好几公里，越跑越爽。\n\n"今天状态不错！"你给自己加油。\n\n回到家时神清气爽，感觉浑身充满了能量。',
    thoughts: '今天跑得很痛快，精力满满！'
  },
  morning_run_fail: {
    scene: '你刚跑了没多远，就开始喘不上气。\n\n"太久没锻炼了..."你停下来扶着膝盖喘气。\n\n算了，走回去吧。',
    thoughts: '体力下降得也太快了...得锻炼了。'
  },
  phone_call_friend: {
    scene: '手机响了，一看是在外地的好朋友。\n\n"喂？过年好啊！"\n\n"过年好！你回家了吗？"',
    thoughts: '好朋友的电话，总能让人心情好一点。'
  },
  family_karaoke: {
    scene: '不知道谁翻出了一个蓝牙音响，接上了话筒。\n\n"来来来，唱一个！"表哥/表姐兴致勃勃。\n\n客厅瞬间变成了KTV包房。',
    thoughts: '家庭KTV，质量不重要，气氛到位就行。'
  },
  unexpected_money: {
    scene: '你翻去年的衣服口袋时，摸到了一张折叠的纸。\n\n打开一看——竟然是一张钞票，或者是之前忘记领的微信红包到账了。\n\n"哎？这是什么时候的？"你惊喜地说。',
    thoughts: '意外之财，像在口袋里发现的彩蛋。'
  },
  argument_with_parents: {
    scene: '因为一些事情，你和父母起了争执。\n\n"你怎么就是不听呢？"妈妈提高了声音。\n\n"我已经长大了，有自己的想法。"你也有些激动。\n\n客厅里的气氛一下子变得很紧张。',
    thoughts: '和父母吵架，比和任何人吵都难受。'
  },

  // Day 8 新增场景
  clean_room: {
    scene: '你把自己住的房间收拾了一遍。\n\n被子叠好，桌子擦干净，地上扫过。\n\n"走之前把房间收拾好，妈妈看到会高兴的。"你想着。',
    thoughts: '走之前留下一个整洁的房间，也是一种告别方式。'
  },
  morning_walk_last: {
    scene: '你起了个大早，在家附近走了走。\n\n路过老房子、田间小路、村口的大树...\n\n每个角落都是回忆。\n\n"下次回来可能又是一年后了。"你心里想着。',
    thoughts: '最后再看看家乡，把这些画面记在心里。'
  },
  give_parents_money: {
    scene: '你趁妈妈不注意，把钱悄悄放在了枕头底下。\n\n"等他们发现的时候，我已经在路上了。"你想着。\n\n这些钱虽然不多，但是你的一片心意。',
    thoughts: '有些心意，不需要当面说出来。'
  },
  teach_parents_phone: {
    scene: '"妈，这个按这里就能视频通话了。"\n\n"哪个？这个？"\n\n"对对对，就这个绿色的按钮。"\n\n你耐心地教了好几遍，妈妈终于学会了。\n\n"以后想我了就按这个，随时能看到我。"你说。\n\n妈妈笑着点头，眼圈有点红。',
    thoughts: '教会父母用手机，就是教会他们跨越距离的方式。'
  },
  write_letter: {
    scene: '你坐在书桌前，想了很久，开始写。\n\n"爸、妈，有些话我不太会当面说..."\n\n写着写着，你发现自己有好多想说的话。\n\n感谢、愧疚、期许...一笔一画都是真心话。\n\n你把信折好，放在了客厅的桌子上。',
    thoughts: '写不出口的话，至少可以写下来。'
  },
  last_night_walk: {
    scene: '夜色下的家乡很安静。\n\n你一个人走在路上，抬头看见满天的星星。\n\n城市里看不到这样的星空。\n\n你站了很久，把这个画面刻进记忆里。',
    thoughts: '最后一个夜晚，把家乡的星空收进口袋里。'
  },

  // ===== 第二轮新增事件场景 =====

  // 宅家新选项
  nap: {
    scene: '你饭后往沙发上一躺，眼皮就开始打架。\n\n"睡吧睡吧，别着凉。"妈妈给你盖了条毯子。\n\n你迷迷糊糊睡了半个多小时，醒来感觉充满了电。',
    thoughts: '家里的午觉质量，是任何酒店都比不了的。'
  },
  tidy_old_stuff: {
    scene: '你在房间翻箱倒柜，翻出了不少老东西。\n\n小学的成绩单、初中的日记本、高中的准考证...\n\n每一样东西都是一段回忆。\n\n"这些东西你还留着呢？"妈妈探头进来看了一眼。\n\n"当然了，这些可是宝贝。"你笑着说。',
    thoughts: '翻旧物就像考古，每一件都能挖出一段故事。'
  },
  video_games: {
    scene: '你拿出手机，打算打两把游戏。\n\n"又玩手机？"妈妈瞟了你一眼。\n\n"就打一局..."你嘴上说着，手已经停不下来了。\n\n两个小时后，你终于放下手机，感觉时间过得好快。',
    thoughts: '打游戏一时爽，被妈妈念两天。'
  },
  help_parents_chores: {
    scene: '你主动拿起了拖把。\n\n"今天不用你..."妈妈话没说完，你已经开始拖了。\n\n"行吧，碗也帮忙洗了。"妈妈笑着说。\n\n虽然累了点，但看到妈妈高兴的样子，值了。',
    thoughts: '主动做家务，妈妈的笑容就是最好的回报。'
  },
  cook_lunch: {
    scene: '"中午我来做！"你走进厨房。\n\n"你行吗？"妈妈有点不放心。\n\n"放心吧，我在外面天天自己做。"\n\n虽然做得没妈妈好吃，但一家人吃得很开心。\n\n"不错不错，有进步！"爸爸给了个面子。',
    thoughts: '做饭给家人吃，成就感满满。'
  },
  old_photo_album: {
    scene: '你翻出了家里的老相册，一页一页地看。\n\n"这是你小时候，胖嘟嘟的。"妈妈指着照片说。\n\n"这张是你爸年轻时候的，帅吧？"妈妈笑着说。\n\n爸爸在旁边假装不在意，但嘴角翘起来了。\n\n你看着照片里的一家人，觉得时间过得真快。',
    thoughts: '老照片里的每个人都在笑，那时候的快乐好简单。'
  },

  // 新随机事件
  local_market: {
    scene: '你跟着爸妈去赶集。\n\n路边摆满了各种年货，红灯笼、对联、干果、糖...到处都是年味。\n\n"这个怎么卖？"妈妈开始跟摊主砍价。\n\n你在一旁看着，觉得这种烟火气在城市里很难找到。',
    thoughts: '赶集的热闹，才是真正的年味。'
  },
  new_year_movie: {
    scene: '你看了看今年的春节档阵容，有几部还不错。\n\n"要不要一起去看电影？"你问家人。',
    thoughts: '过年看电影，也是一种新年俗了。'
  },
  temple_visit: {
    scene: '你跟着家人去了附近的庙里。\n\n门口排着长队，每个人脸上都带着虔诚。\n\n香火缭绕，新年的祝福在空气里飘着。',
    thoughts: '信不信不重要，重要的是那份心意。'
  },
  hometown_change: {
    scene: '你走在路上，突然发现记忆里的那个小卖部不见了。\n\n取而代之的是一个奶茶店。\n\n路也宽了，楼也高了，但总觉得少了点什么。',
    thoughts: '家乡在变，我也在变，只是速度不太一样。'
  },
  secret_snack: {
    scene: '趁爸妈不注意，你悄悄溜到厨房。\n\n从柜子里翻出了一包零食，小心翼翼地拆开。\n\n"吃什么呢？"妈妈突然出现在身后。\n\n"...没吃什么。"你嘴里还嚼着。',
    thoughts: '偷吃被抓的尴尬，和小时候一模一样。'
  },
  social_media_post: {
    scene: '你打开手机相机，想拍点什么发朋友圈。\n\n可是拍了好几张都不满意。\n\n"发不发呢..."你犹豫着。',
    thoughts: '发朋友圈这事，选图比写文案难多了。'
  },
  pet_reunion: {
    scene: '你养的小猫一看到你就"喵喵"叫着跑过来。\n\n它蹭着你的腿，咕噜咕噜地打呼噜。\n\n"这猫就认你。"妈妈在旁边说。\n\n你把它抱起来，它乖乖地窝在你怀里。',
    thoughts: '被一只小猫需要的感觉，比被老板需要好多了。'
  },
  dream_friend_collab: {
    scene: '发小找到你说："你之前说的那个想法，我想了好几天，越想越觉得靠谱。"\n\n你有些惊讶："真的？"\n\n"要不我们一起干？"发小的眼里有光。',
    thoughts: '当理想遇到志同道合的人，就不再只是幻想了。'
  },
  sudden_rain: {
    scene: '本来还是晴天，突然就变了脸。\n\n雨/雪噼里啪啦地打在窗户上。\n\n"这天气，说变就变。"爸爸看着窗外摇头。',
    thoughts: '天气和人生一样，变化总在意料之外。'
  },
  parent_cooking_battle: {
    scene: '"今天我来做！"爸爸突然走进厨房。\n\n"你做什么？搞不好给我出去。"妈妈不让位。\n\n"我做个拿手菜给你们尝尝！"爸爸坚持。\n\n两个人在厨房里"争"了起来，你被推出来当评委。',
    thoughts: '爸妈抢着做菜，这种吵架我喜欢。'
  },
  wifi_down: {
    scene: '"怎么没网了？"\n\n你看了看路由器，灯在闪但连不上。\n\n"又断网了！"你有点焦躁。\n\n"没网就不能活了？"爸爸在旁边说。',
    thoughts: '断网让我深刻理解了什么叫"被迫触碰现实"。'
  },

  // ===== 走亲访友 & 宅家活动 & 其他补充场景 =====

  visit_grandparents: {
    scene: '你推开爷爷奶奶家的门，一股熟悉的味道扑面而来。\n\n"哎呀，回来了！快进来快进来！"奶奶从厨房探出头，手上还沾着面粉。\n\n爷爷坐在藤椅上，戴着老花镜看报纸，听到声音抬起头笑了："又长高了没有？"\n\n你被按着坐下，桌上很快堆满了各种零食和水果。奶奶一边往你碗里夹菜，一边念叨："瘦了瘦了，在外面肯定没好好吃饭。"',
    thoughts: '爷爷奶奶的牵挂永远是最朴实最暖的。'
  },
  visit_uncle: {
    scene: '舅舅家今天很热闹，门口停了好几辆车。\n\n"来了来了！快进来坐！"舅妈热情地招呼你。\n\n舅舅正在客厅泡茶，见你进来笑着说："工作还顺利吧？来，喝杯好茶。"\n\n表弟表妹们在一旁打闹，整个屋子充满了过年的气氛。舅舅从柜子里翻出一瓶好酒："今天难得聚齐，中午喝两杯？"',
    thoughts: '舅舅家永远有种自来熟的热闹劲儿。'
  },
  visit_aunt: {
    scene: '姑姑一开门就笑得合不拢嘴。\n\n"我就说你今天该来了！快进来，刚做了你爱吃的红烧肉。"\n\n姑父在沙发上看电视，朝你挥挥手："随便坐，别客气。"\n\n姑姑拉着你坐下，上上下下打量了一番："气色不错，比去年精神多了。"然后压低声音问："有对象了没？"\n\n你还没来得及回答，姑姑已经开始掏红包了。',
    thoughts: '姑姑的热情就像她做的红烧肉，浓得化不开。'
  },
  visit_cousin: {
    scene: '你到表哥/表姐家，门一开就看到熟悉的脸。\n\n"来了啊！上次见你还是去年过年吧？"表哥递给你一瓶饮料。\n\n你们在沙发上坐下，自然而然地聊起了各自的近况。从工作聊到生活，从小时候的糗事聊到以后的打算。\n\n"要不来一局？"表哥掏出手机，晃了晃。\n\n"来就来，怕你啊。"你笑着说。',
    thoughts: '和表兄弟在一起，永远有聊不完的话题。'
  },
  visit_maternal_grandparents: {
    scene: '外公外婆家的院子里晒着腊肉和干辣椒，年味特别足。\n\n"乖孙来了！"外婆从里屋走出来，脚步比去年慢了些。\n\n外公正在院子里收拾花草，看到你高兴得直拍手："好好好，人齐了才像过年！"\n\n外婆端出一大碗热汤圆，非要看着你吃完才放心。"在外头吃得惯吗？瘦了没？"\n\n你看着外婆头上又多了几根白发，心里有点酸。',
    thoughts: '外公外婆的疼爱里，藏着最让人心疼的牵挂。'
  },
  visit_great_uncle: {
    scene: '大伯家的客厅摆满了年货，茶几上瓜子花生堆成小山。\n\n"来来来，坐坐坐！"大伯嗓门很大，笑声更大。\n\n大伯母从厨房端出一盘饺子："刚包的，趁热吃。"\n\n大伯拍了拍你的肩膀："在外面混得怎么样？有什么困难跟大伯说。"\n\n你笑着点头，觉得大伯说话虽然直，但心是真的热。',
    thoughts: '大伯就是那种嘴上不饶人、心里啥都装着你的长辈。'
  },
  visit_second_aunt: {
    scene: '二姨家布置得很温馨，门口挂着新对联。\n\n"快进来！外面冷不冷？"二姨把你拉进屋，顺手关上门。\n\n二姨夫在泡功夫茶，冲你点了点头："坐，喝茶。"\n\n二姨坐在你旁边，拉着你的手开始嘘寒问暖。从工作问到感情，事无巨细。\n\n"你妈说你最近忙，也不知道吃得好不好。"二姨叹了口气，"年轻人别太拼了。"',
    thoughts: '二姨的关心总是细碎又绵密，像织了一张网把你兜住。'
  },
  visit_old_neighbor: {
    scene: '你敲开了老邻居家的门。\n\n"哎？这不是隔壁家的孩子嘛！都长这么大了！"老邻居一脸惊喜。\n\n"王叔/李婶，过年好！"你递上手里的东西。\n\n"快进来坐坐，别站在外面。"老邻居把你让进屋。\n\n你们坐在小板凳上聊天，聊的都是小时候的事。"你小时候还偷摘过我家的枣子呢，还记得不？"\n\n你不好意思地笑了。',
    thoughts: '老邻居记得你小时候的每一件事，比你自己记得还清楚。'
  },
  watch_tv: {
    scene: '你坐在沙发上，和爸妈一起看电视。\n\n妈妈拿着遥控器换台，爸爸在旁边嗑瓜子。\n\n"这个频道有个综艺，还挺好笑的。"妈妈说。\n\n你靠在沙发上，有一搭没一搭地看着。其实节目不重要，重要的是一家人挤在一起的感觉。\n\n"再给我倒杯水。"爸爸说。\n\n"自己倒！"妈妈白了他一眼。\n\n你笑着站起来："我去倒。"',
    thoughts: '陪父母看电视，看的不是节目，是一种久违的安心感。'
  },
  farm_work: {
    scene: '你跟着爸爸去了地里。\n\n冬天的田地有些荒，但还有些活要干。搬搬柴火、喂喂鸡、整理整理菜地。\n\n"你这个姿势不对，锄头要这样拿。"爸爸看不下去了，接过锄头示范。\n\n你笨手笨脚地干了一会儿，手心磨得有点疼。\n\n"城里待久了，干不动了吧？"爸爸笑话你。\n\n你不服气地继续干，虽然累，但呼吸着泥土的味道，心里踏实。',
    thoughts: '干农活虽然累，但这种踏踏实实的感觉，城里找不到。'
  },
  read_book: {
    scene: '你从书架上翻出一本书，是高中时候买的，一直没看完。\n\n窝在沙发角落里，盖着毯子慢慢翻。\n\n屋外偶尔传来鞭炮声和邻居聊天的声音，但你沉浸在书里，觉得世界安静了下来。\n\n"看什么呢？"妈妈路过时瞟了一眼。\n\n"一本小说，挺有意思的。"\n\n"看书好，比玩手机强。"妈妈难得夸了你一句。',
    thoughts: '过年在家看书，是一种奢侈的安静。'
  },
  market_shopping: {
    scene: '你跟着爸妈走进了镇上的集市。\n\n人挤人，到处都是吆喝声。卖春联的、卖干果的、卖鱼卖肉的，热闹得不行。\n\n"这个多少钱？""便宜点嘛！"妈妈的砍价技能全开。\n\n你提着大包小包跟在后面，像个人形购物车。\n\n"再去那边看看，听说今年有人卖糖画。"爸爸指了指前面。\n\n你闻着空气里炸油条和烤红薯的味道，觉得这才是过年该有的样子。',
    thoughts: '赶集的热闹和烟火气，是城市里的商场永远给不了的。'
  },
  wifi_broken: {
    scene: '你正刷着手机，突然页面转圈转了半天。\n\n"怎么回事？"你看了一眼WiFi信号——没了。\n\n路由器上的灯一闪一闪，像在对你眨眼：别看我，我也不知道。\n\n"爸，WiFi又坏了！"\n\n"我哪会弄那个，你自己看看。"爸爸头也不抬。\n\n你蹲在路由器前面拔线、插线、重启...折腾了十分钟，终于恢复了。\n\n"好了！"你如释重负。\n\n"没网的时候你不也活了十分钟嘛。"妈妈在旁边说。',
    thoughts: '修WiFi这件事让我成了全家最有技术含量的人。'
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
    const visitIds = ['grandparents', 'uncle', 'aunt', 'cousin', 'maternal_grandparents', 'great_uncle', 'second_aunt', 'old_neighbor']
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
                          choiceId === 'aunt' ? '姑姑' :
                          choiceId === 'cousin' ? '表兄弟' :
                          choiceId === 'maternal_grandparents' ? '外公外婆' :
                          choiceId === 'great_uncle' ? '大伯' :
                          choiceId === 'second_aunt' ? '二姨' : '老邻居'
      
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

  // 按概率混入”弱智吧风格”场景，避免全程同一种语气
  if (Math.random() < 0.45) {
    const abstractScene = getAbstractScene(eventId, choiceId)
    if (abstractScene) {
      return abstractScene
    }
  }

  // 特殊处理：多日剧情线的详细场景
  if (eventId === 'childhood_friend' && choiceId && state) {
    return generateChildhoodFriendScene(choiceId, state)
  }
  if (eventId === 'childhood_friend_deep' && choiceId && state) {
    return generateChildhoodFriendDeepScene(choiceId, state)
  }
  if (eventId === 'stray_pet' && choiceId) {
    return generateStrayPetScene(choiceId)
  }
  if (eventId === 'stray_pet_care' && choiceId) {
    return generateStrayPetCareScene(choiceId)
  }
  if (eventId === 'night_walk' && choiceId) {
    return generateNightWalkScene(choiceId)
  }
  if (eventId === 'village_gossip' && choiceId) {
    return generateVillageGossipScene(choiceId)
  }
  if (eventId === 'family_conflict' && choiceId && state) {
    return generateFamilyConflictScene(choiceId, state)
  }
  if (eventId === 'family_conflict_resolve' && choiceId) {
    return generateFamilyConflictResolveScene(choiceId)
  }
  if (eventId === 'dream_project' && choiceId) {
    return generateDreamProjectScene(choiceId)
  }
  if (eventId === 'dream_project_plan' && choiceId) {
    return generateDreamProjectPlanScene(choiceId)
  }
  if (eventId === 'argument_with_parents' && choiceId) {
    return generateArgumentScene(choiceId)
  }
  if (eventId === 'family_karaoke' && choiceId) {
    return generateKaraokeScene(choiceId)
  }
  if (eventId === 'unexpected_money' && choiceId) {
    return generateUnexpectedMoneyScene(choiceId)
  }
  if (eventId === 'local_market' && choiceId) {
    return generateLocalMarketScene(choiceId)
  }
  if (eventId === 'new_year_movie' && choiceId === 'watch_together') {
    return {
      scene: '你买了一家人的票，浩浩荡荡地去了电影院。\n\n爸妈坐在你旁边，看得津津有味。\n\n"这个特效不错！"爸爸小声说。\n\n"嘘——"你和妈妈同时比了个安静的手势。\n\n散场后，你们边走边讨论剧情，感觉和家人一起看电影比自己看有意思多了。',
      thoughts: '带家人看电影，花钱但值得。'
    }
  }
  if (eventId === 'temple_visit' && choiceId) {
    return generateTempleVisitScene(choiceId)
  }
  if (eventId === 'hometown_change' && choiceId) {
    return generateHometownChangeScene(choiceId)
  }
  if (eventId === 'social_media_post' && choiceId === 'post_family') {
    return {
      scene: '你选了一张全家人在一起的照片。\n\n配文想了半天："回家过年，一切都好。"\n\n发出去之后，很快就收到了好多赞和评论。\n\n"你们家看着真幸福！"\n\n"羡慕，我还在加班..."\n\n你看着评论笑了笑，觉得这一刻确实很幸福。',
      thoughts: '朋友圈里的幸福可能有滤镜，但此刻的是真的。'
    }
  }
  if (eventId === 'pet_reunion' && choiceId) {
    return generatePetReunionScene(choiceId)
  }
  if (eventId === 'dream_friend_collab' && choiceId === 'plan_together') {
    return {
      scene: '你和发小找了家咖啡店，摊开笔记本认真聊了起来。\n\n"我负责技术，你负责资源。"你们越聊越兴奋。\n\n两个小时过去了，一张餐巾纸上写满了计划。\n\n"年后我们就开始？"\n\n"开始！"你们碰了一下拳。\n\n也许这就是"从想法到行动"的第一步。',
      thoughts: '一个人的梦想是幻想，两个人的梦想是计划。'
    }
  }
  if (eventId === 'sudden_rain' && choiceId) {
    return generateSuddenRainScene(choiceId)
  }
  if (eventId === 'parent_cooking_battle' && choiceId) {
    return generateCookingBattleScene(choiceId)
  }
  if (eventId === 'family_photo' && choiceId === 'photo_pro') {
    return {
      scene: '你让所有人站好，调整了三遍位置。\n\n”笑一个！”\n\n”咔嚓”——拍了好几张，选了最好看的那张。\n\n爷爷奶奶/爸爸妈妈坐在中间，你们站在两边，每个人脸上都带着笑。\n\n”这张要洗出来挂客厅！”妈妈高兴地说。',
      thoughts: '一张认真的全家福，值得挂一辈子。'
    }
  }
  if (eventId === 'cook_special' && choiceId === 'cook_success') {
    return {
      scene: '你系上围裙，认认真真地开始做菜。\n\n切菜、调味、翻炒...每一步都很用心。\n\n”哇，闻起来好香！”妈妈从客厅探进头来。\n\n菜端上桌，大家尝了一口：\n\n”不错啊！在外面学了不少嘛！”爸爸竖起了大拇指。\n\n你看着家人吃得开心的样子，心里暖暖的。',
      thoughts: '能做一道好菜给家人吃，比什么都值。'
    }
  }
  if (eventId === 'childhood_spot' && choiceId === 'visit') {
    return {
      scene: '你走进了那个熟悉的地方。\n\n墙上的痕迹、角落里的台阶、门口那棵树...一切都没怎么变。\n\n但你变了。\n\n你站在那里，脑海里全是小时候的画面：放学后的疯跑，暑假里的蝉鸣，伙伴们的笑声。\n\n不知不觉，眼眶有点湿。\n\n”我回来看看。”你在心里默默说。',
      thoughts: '有些地方，你回不去了，但它永远住在你的记忆里。'
    }
  }
  if (eventId === 'help_elderly' && choiceId === 'help_full') {
    return {
      scene: '你帮老人把东西搬到了家里，又顺手帮修了一下漏水的水龙头。\n\n”你这孩子太好了，是谁家的？”老人问。\n\n”我是XX家的。”\n\n”哦哦，你爸妈养了个好孩子！”老人拉着你的手说。\n\n你笑了笑，心里暖暖的。',
      thoughts: '在小地方，一次帮忙就能让人记你很久。'
    }
  }
  if (eventId === 'phone_call_friend' && choiceId === 'long_chat') {
    return {
      scene: '你和好朋友聊了快一个小时。\n\n从过年聊到工作，从感情聊到未来。\n\n”你那边怎么样？”\n\n”还行吧，就那样。你呢？”\n\n”也差不多，在家被催婚/催生/催赚钱...”\n\n你们笑了起来，虽然各自都不容易，但有人能说说话，就好多了。\n\n”明年有机会一起吃个饭。”\n\n”好，一定。”',
      thoughts: '好朋友就是这样，多久没见都能接上话。'
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

// ===== 新增多日剧情线场景生成函数 =====

function generateChildhoodFriendScene(choiceId, state) {
  const gender = state.attributes?.gender || 'male'

  if (choiceId === 'catch_up') {
    return {
      scene: '你们找了个小店坐下来，点了两杯奶茶。\n\n"你现在在哪？做什么？"发小问。\n\n你简单说了说近况。\n\n"我呢，去年辞了工作，现在自己在搞点事情。"发小说。\n\n你们聊了很久，从小时候的糗事聊到现在的烦恼。\n\n"有时候觉得时间过得太快了。"发小感慨。\n\n"是啊，感觉昨天还在一起上学。"你点头。\n\n分开时，你们互加了微信：\n\n"以后常联系！"\n\n"一定！"',
      thoughts: '发小是那种不联系也不会生疏的朋友，真好。'
    }
  }
  if (choiceId === 'quick_hi') {
    return {
      scene: '"嘿！好久不见！"你打了个招呼。\n\n"是啊，好久不见！"发小笑了笑。\n\n"最近怎么样？"\n\n"还行，你呢？"\n\n"也还行。"\n\n你们简单寒暄了几句就各自走了。\n\n有些话想说，但又不知道从何说起。',
      thoughts: '想好好聊聊，但又觉得不太好意思。'
    }
  }
  if (choiceId === 'avoid') {
    return {
      scene: '你低下头，加快脚步走了过去。\n\n不知道对方有没有看到你。\n\n你心里有点内疚，但就是不太想面对。\n\n也许是怕被问到近况，也许是觉得没什么好说的。',
      thoughts: '有时候不是不想见，是不知道怎么面对。'
    }
  }
  return EVENT_SCENES.childhood_friend || { scene: '你遇到了发小。', thoughts: '好久没见了。' }
}

function generateChildhoodFriendDeepScene(choiceId, state) {
  if (choiceId === 'listen') {
    return {
      scene: '发小说："其实我最近过得不太好。"\n\n你安静地听着。\n\n"工作丢了，女朋友也分了，回来也不知道跟家里怎么说。"\n\n你拍了拍发小的肩膀："没事，慢慢来，总会好的。"\n\n发小苦笑了一下："谢谢你听我说这些，在家没人能说。"\n\n"兄弟嘛，有什么说什么。"你说。\n\n回家的路上，你想了很多。也许每个人都在负重前行，只是有些人不说出来。',
      thoughts: '倾听有时候比任何建议都管用。'
    }
  }
  if (choiceId === 'advise') {
    return {
      scene: '听完发小的烦恼后，你想了想。\n\n"你有没有想过...换个方向试试？"\n\n你根据自己的经验给了一些建议。\n\n"你说的有道理，我回去想想。"发小认真地点头。\n\n"不管怎样，别一个人扛着。有事随时找我。"你说。\n\n发小感激地看了你一眼："有你这个朋友真好。"\n\n你笑了笑，心里也觉得暖暖的。',
      thoughts: '能帮到朋友，自己也会变得更有力量。'
    }
  }
  if (choiceId === 'decline') {
    return {
      scene: '"不好意思，今天家里有事..."你找了个借口。\n\n发小有点失望："那改天吧。"\n\n"好，改天。"你说。\n\n但你知道，可能不会有"改天"了。\n\n走开之后，你有一点后悔。',
      thoughts: '有时候拒绝别人，比说出口更难受。'
    }
  }
  return { scene: '发小跟你聊了聊。', thoughts: '朋友之间的话，有时候不需要太多。' }
}

function generateStrayPetScene(choiceId) {
  if (choiceId === 'adopt') {
    return {
      scene: '你蹲下来，小心地把猫抱了起来。\n\n它挣扎了一下，然后安静下来，蜷在你怀里。\n\n"走吧，先回家暖和暖和。"\n\n回到家，妈妈一看："你怎么捡了只猫回来？"\n\n"它太可怜了，先养几天。"你说。\n\n你给它找了个纸箱子，铺了旧毯子，又热了点牛奶。\n\n小猫舔了几口，看了你一眼，"喵"了一声。\n\n你觉得它在说"谢谢"。',
      thoughts: '养了就要负责，先让它暖和起来。'
    }
  }
  if (choiceId === 'feed') {
    return {
      scene: '你从家里拿了点吃的，放在它面前。\n\n小猫犹豫了一下，然后小心翼翼地开始吃。\n\n你蹲在旁边看了一会，摸了摸它的头。\n\n它吃完了，抬头看着你，"喵"了一声。\n\n"我不能带你回去，你自己注意安全啊。"你心里说。\n\n走了几步，回头看了一眼，它还站在原地看着你。',
      thoughts: '帮不了太多，但至少让它吃饱了这一顿。'
    }
  }
  return { scene: '你看到了一只流浪猫。', thoughts: '小猫好可怜。' }
}

function generateStrayPetCareScene(choiceId) {
  if (choiceId === 'vet') {
    return {
      scene: '你带着小猫去了镇上的兽医那里。\n\n"营养不良，有点皮肤病，其他还好。"兽医检查后说。\n\n你付了药费和检查费，心疼但不后悔。\n\n"按时吃药，过几天就会好了。"\n\n小猫乖乖让你抱着回了家，好像知道你在帮它。',
      thoughts: '花了些钱，但看到它好起来就值了。'
    }
  }
  if (choiceId === 'play') {
    return {
      scene: '你用一根绳子逗小猫玩。\n\n它跳来跳去，眼睛亮亮的，特别有精神。\n\n"这只猫还挺聪明的。"妈妈在一旁看着说。\n\n你笑了笑，摸了摸小猫的头。\n\n它"咕噜咕噜"地打起了呼噜，蜷在你腿上不走了。',
      thoughts: '和小动物待在一起，心情都变好了。'
    }
  }
  if (choiceId === 'find_owner') {
    return {
      scene: '你发了个朋友圈和村/社区群，帮小猫找主人。\n\n没想到很快就有人回复了："我家孩子一直想养猫！"\n\n你带着小猫去了对方家里，看起来是个很温暖的家庭。\n\n小猫在新主人怀里蹭了蹭，好像很满意。\n\n"谢谢你救了它！"对方感激地说。\n\n你看着小猫最后看了你一眼，心里有点不舍但也放心了。',
      thoughts: '帮它找到了一个好归宿，比自己养还踏实。'
    }
  }
  return { scene: '你在照顾小猫。', thoughts: '小猫越来越精神了。' }
}

function generateNightWalkScene(choiceId) {
  if (choiceId === 'walk_alone') {
    return {
      scene: '你一个人沿着村路/小区走着。\n\n月光很好，远处的山丘/楼房轮廓清晰。\n\n偶尔有一两声狗叫，或者远处鞭炮的余响。\n\n你走得很慢，脑子里的东西慢慢放空了。\n\n这种安静在城市里几乎不可能有。\n\n你深深吸了口气，觉得身心都被清洗了一遍。',
      thoughts: '一个人走走，其实是跟自己聊天。'
    }
  }
  if (choiceId === 'walk_parents') {
    return {
      scene: '"出去走走？"你问爸妈。\n\n"走吧。"妈妈换了鞋。\n\n你们三个人慢慢走着，聊着有的没的。\n\n"你小时候经常在这里摔跤。"妈妈指着路边说。\n\n"是吗？我不记得了。"你笑着说。\n\n"我记得。"妈妈看着你，眼里满是温柔。\n\n你们走了半个多小时，虽然没说什么重要的话，但感觉很好。',
      thoughts: '和父母一起散步，这种时光以后越来越少了。'
    }
  }
  return { scene: '你出去散步了。', thoughts: '夜晚的空气很好。' }
}

function generateVillageGossipScene(choiceId) {
  if (choiceId === 'listen_gossip') {
    return {
      scene: '你凑过去听了半天。\n\n原来是隔壁家的儿子辞了国企去创业，赔了不少钱。\n\n"唉，好好的工作不干..."\n\n"年轻人就是不听劝..."\n\n大家七嘴八舌地议论着。\n\n你听着，心里感觉有点不舒服——也许别人也在背后这样议论你。\n\n你笑了笑，找了个借口走开了。',
      thoughts: '听八卦一时爽，想到自己也被八卦就不爽了。'
    }
  }
  if (choiceId === 'help_neighbor') {
    return {
      scene: '你了解了情况后，决定去帮帮忙。\n\n"需要帮什么忙？"你问。\n\n邻居有些意外："你愿意帮忙？"\n\n你帮着搬了些东西，又帮忙联系了一些事情。\n\n"真是太谢谢你了！"邻居感激地说。\n\n回家路上，你觉得做了件好事，心情不错。\n\n"听说你去帮忙了？不错嘛。"妈妈在家门口等你。',
      thoughts: '帮了邻居一把，在家的口碑也上去了。'
    }
  }
  return { scene: '村里有些新鲜事。', thoughts: '八卦年年有，今年特别多。' }
}

function generateFamilyConflictScene(choiceId, state) {
  if (choiceId === 'mediate') {
    return {
      scene: '你站了起来："大家先别急，过年呢，有话好好说。"\n\n两边的人都看着你。\n\n你花了半个多小时，一个一个地说，把双方的想法都捋了一遍。\n\n"其实大家都是一家人，没有解不开的结。"你说。\n\n最后双方都各退了一步，虽然没有完全和解，但至少吃完了这顿饭。\n\n"你这孩子倒是比我们会说话。"妈妈事后悄悄说。',
      thoughts: '做和事佬太累了，但至少没让事情恶化。'
    }
  }
  if (choiceId === 'side_parents') {
    return {
      scene: '你选择站在父母这边。\n\n"这事本来就不怪我爸妈。"你直接说。\n\n对面的亲戚脸色变了，但没再说什么。\n\n饭后气氛有点冷，但父母看你的眼神里多了几分欣慰。\n\n"你不该掺和的。"爸爸嘴上说着，但你知道他心里是感激的。',
      thoughts: '选了边就意味着另一边不高兴，但家人始终是家人。'
    }
  }
  return { scene: '家庭矛盾爆发了。', thoughts: '过年就不能消停点吗...' }
}

function generateFamilyConflictResolveScene(choiceId) {
  if (choiceId === 'apologize') {
    return {
      scene: '你鼓起勇气去了对方家。\n\n"上次的事...我们家这边也有不对的地方。"你说。\n\n对方先是一愣，然后叹了口气："算了，都是一家人。"\n\n你们聊了一会，虽然不像以前那么亲近，但至少不再尴尬了。\n\n回去的路上，你觉得心里轻松了不少。',
      thoughts: '主动低头不丢人，家和万事兴。'
    }
  }
  if (choiceId === 'gift') {
    return {
      scene: '你买了些东西去对方家。\n\n"这是我从外面带回来的，给你们尝尝。"你笑着递过去。\n\n对方接过东西，表情缓和了很多。\n\n"坐下喝杯茶吧。"\n\n你们坐下来聊了一会，虽然没有明说上次的事，但彼此心里都明白。\n\n有些矛盾，不需要说破，一个台阶就够了。',
      thoughts: '花点钱买个台阶，值。'
    }
  }
  return { scene: '你尝试解决之前的矛盾。', thoughts: '希望能好起来。' }
}

function generateDreamProjectScene(choiceId) {
  if (choiceId === 'think_deep') {
    return {
      scene: '你拿出手机，认真地在备忘录里写起来。\n\n市场分析、成本估算、可行性...\n\n越写越兴奋，感觉这个想法确实有搞头。\n\n"要是成了，说不定能改变现在的生活。"你想着。\n\n当然，你也知道，想法和现实之间还隔着一道实操的鸿沟。\n\n但至少，这个念头让你觉得生活还有可能性。',
      thoughts: '有梦想的人，眼里是有光的。'
    }
  }
  if (choiceId === 'tell_family') {
    return {
      scene: '"爸、妈，我有个想法..."你把自己的计划说了出来。\n\n"瞎搞什么？好好上班不行吗？"爸爸第一反应是反对。\n\n"就是啊，稳定最重要。"妈妈也附和。\n\n你心里有点失落，但也理解他们的担心。\n\n"我再想想吧。"你说。\n\n虽然没得到支持，但至少说出来了，心里轻松了一点。',
      thoughts: '父母的担心和自己的想法，总是不在一个频道上。'
    }
  }
  return { scene: '你有了一个新想法。', thoughts: '想法不断，但需要冷静。' }
}

function generateDreamProjectPlanScene(choiceId) {
  if (choiceId === 'research') {
    return {
      scene: '你开始在网上搜集资料。\n\n看了好几个小时的帖子、视频和分析报告。\n\n越看越觉得有些路可以走，但也发现了不少坑。\n\n"做这个需要的启动资金比我想的多..."你叹了口气。\n\n不过至少现在比之前了解得更多了，也更清楚该怎么走下一步。',
      thoughts: '调研就是用信息消灭幻想，留下靠谱的部分。'
    }
  }
  if (choiceId === 'find_partner') {
    return {
      scene: '你跟发小聊了聊这个想法。\n\n没想到发小很感兴趣："我正好也想搞点事情！"\n\n你们越聊越投机，在餐巾纸上画起了计划。\n\n"等开完年，我们认真做个方案。"发小说。\n\n"好！"你们碰了一下杯。\n\n也许这就是那种"对的人在对的时间出现"的感觉。',
      thoughts: '一个人想是梦，两个人做就可能是事业了。'
    }
  }
  return { scene: '你继续想那个计划。', thoughts: '路还长，一步一步来。' }
}

function generateArgumentScene(choiceId) {
  if (choiceId === 'calm_down') {
    return {
      scene: '你深呼吸了几次，把到嘴边的话咽了回去。\n\n"好吧，我听你们的。"你尽量平静地说。\n\n虽然心里委屈，但你知道在这种时候吵赢了也没有赢家。\n\n妈妈看你态度好了，语气也缓和了下来：\n\n"我们也是为你好..."',
      thoughts: '忍住了，虽然心里很堵，但不吵是对的。'
    }
  }
  if (choiceId === 'argue_back') {
    return {
      scene: '"我已经不是小孩了！"你提高了声音。\n\n"你翅膀硬了是吧？"爸爸也急了。\n\n你们吵了好一会，谁也说服不了谁。\n\n最后你一甩门回了房间，屋里突然安静了。\n\n你躺在床上，心里又气又难过。\n\n你知道他们是关心你，但这种关心有时候让人喘不过气。',
      thoughts: '吵完了才发现，赢不赢根本不重要，就是都受伤了。'
    }
  }
  if (choiceId === 'walk_away') {
    return {
      scene: '"我出去走走。"你说完就拿起外套出了门。\n\n冷风吹在脸上，心情慢慢平复下来。\n\n你在外面走了半个小时，想了很多。\n\n等你回来的时候，妈妈在门口等你。\n\n"回来了？吃饭吧。"她没有再提刚才的事。\n\n你点了点头，坐下来默默吃饭。',
      thoughts: '有些事，走一走就想通了，不用非得争个输赢。'
    }
  }
  return { scene: '你和父母有了分歧。', thoughts: '都是家人，慢慢磨合吧。' }
}

function generateKaraokeScene(choiceId) {
  if (choiceId === 'sing') {
    return {
      scene: '你拿过话筒，选了一首自己最拿手的歌。\n\n一开口，全场都安静了——\n\n不是因为唱得好，是因为音量太大了。\n\n"哈哈哈哈！"大家笑成一团。\n\n你也不在意，越唱越嗨。\n\n"好！再来一首！"表哥/表姐带头鼓掌。\n\n这一晚上，大家轮流唱，笑声就没停过。',
      thoughts: '唱歌不在于好不好听，在于够不够嗨。'
    }
  }
  return { scene: '家里开始唱歌了。', thoughts: '过年的氛围全靠这种热闹撑起来。' }
}

function generateUnexpectedMoneyScene(choiceId) {
  if (choiceId === 'keep') {
    return {
      scene: '你把这笔意外之财收好。\n\n"人品守恒定律终于轮到我了。"你心里美滋滋的。\n\n虽然不多，但白来的钱特别让人开心。',
      thoughts: '意外之财，就像在游戏里捡到了一个宝箱。'
    }
  }
  if (choiceId === 'share') {
    return {
      scene: '你把一部分钱给了家里。\n\n"这钱哪来的？"妈妈问。\n\n"之前忘了的，正好给家里添点东西。"\n\n妈妈推了推又收下了："这孩子..."\n\n你看到她转头偷偷笑了，心里也跟着暖了。',
      thoughts: '分享的快乐，是双倍的快乐。'
    }
  }
  if (choiceId === 'donate') {
    return {
      scene: '你想了想，打开手机把这笔钱捐了出去。\n\n"就当是新年的善意吧。"你想着。\n\n虽然钱不多，但做了好事心里特别舒服。',
      thoughts: '有时候给出去的，比留下的更有价值。'
    }
  }
  return { scene: '你有了一笔意外收入。', thoughts: '运气还不错。' }
}

function generateLocalMarketScene(choiceId) {
  if (choiceId === 'buy_stuff') {
    return {
      scene: '你在集市上转了一圈，买了些小东西。\n\n一个手工编的小挂件、几袋当地特产、一包糖炒栗子...\n\n"老板，便宜点！"你学着妈妈的样子砍价。\n\n"你这砍价功力不行啊。"妈妈在旁边笑。\n\n回去的路上，你拎着大包小包，觉得赶集真有意思。',
      thoughts: '赶集的快乐在于，你永远不知道自己会买什么。'
    }
  }
  if (choiceId === 'treat_parents') {
    return {
      scene: '"爸妈，想吃什么？我请！"你指着路边的小吃摊。\n\n"不用不用..."妈妈嘴上说着，眼睛已经看向了煎饼摊。\n\n你买了煎饼、烤红薯、糖葫芦，一家三口站在路边吃。\n\n"真好吃！"妈妈终于承认了。\n\n你看着他们吃得开心的样子，觉得这是花得最值的钱。',
      thoughts: '请爸妈吃小吃，花几十块买到的是无价的笑容。'
    }
  }
  return { scene: '你在集市上逛了逛。', thoughts: '集市的热闹很有年味。' }
}

function generateTempleVisitScene(choiceId) {
  if (choiceId === 'pray_serious') {
    return {
      scene: '你在佛像前双手合十，闭上了眼。\n\n"保佑家人身体健康，万事如意。"\n\n你把心愿默默念了三遍，又磕了三个头。\n\n起来的时候，心里突然觉得安静了很多。\n\n也许不是菩萨在听，是你终于听到了自己想要什么。',
      thoughts: '拜佛这件事，拜的不是佛，是自己的心。'
    }
  }
  if (choiceId === 'buy_charm') {
    return {
      scene: '你在庙里的小摊上买了个护身符。\n\n"这个保平安的，很灵的。"摊主说。\n\n你把它挂在钥匙上，虽然不一定信，但心里多了一点安心。\n\n"帮我也买一个！"妈妈在旁边说。\n\n你笑了笑，又买了两个。',
      thoughts: '护身符灵不灵不重要，重要的是买的时候想着谁。'
    }
  }
  return { scene: '你在庙里走了走。', thoughts: '难得清静一下。' }
}

function generateHometownChangeScene(choiceId) {
  if (choiceId === 'feel_good') {
    return {
      scene: '你拿出手机，拍了几张照片。\n\n新修的马路、新开的店铺、新建的公园...\n\n"变化挺大的，比以前好多了。"你心里想。\n\n你把照片发给在外地的朋友："看，我家乡现在长这样了。"\n\n朋友回了个"哇"的表情。',
      thoughts: '家乡在变好，这让人高兴。'
    }
  }
  if (choiceId === 'feel_sad') {
    return {
      scene: '你站在那里，看着陌生的新建筑。\n\n小时候放学必经的那条路，现在变成了商业街。\n\n那棵大树不见了，那个小卖部也没了。\n\n"变化是好事。"你安慰自己。\n\n但心里还是有一块地方，觉得空空的。',
      thoughts: '有些地方只能活在记忆里了，回不去了。'
    }
  }
  if (choiceId === 'ask_parents') {
    return {
      scene: '"那个小卖部什么时候拆的？"你问爸妈。\n\n"去年吧，要修路。"爸爸说。\n\n"那个张大爷搬哪去了？"\n\n"搬城里去了，儿子在那边买了房。"\n\n你们边走边聊，把这几年的变化都过了一遍。\n\n原来自己不在的这些日子，家乡也在静悄悄地翻新。',
      thoughts: '每次回来都在变，这才是时间的证据。'
    }
  }
  return { scene: '你发现家乡变了不少。', thoughts: '变化总是让人百感交集。' }
}

function generatePetReunionScene(choiceId) {
  if (choiceId === 'cuddle') {
    return {
      scene: '你把小猫抱在怀里，它蹭了蹭你的下巴。\n\n"你这几天胖了不少啊。"你摸着它的肚子笑了。\n\n它眯着眼睛，咕噜咕噜地像一台小马达。\n\n妈妈在旁边说："这猫比你在家还乖。"\n\n你笑了笑，心里暖暖的。',
      thoughts: '被一只小猫信任的感觉，是很纯粹的幸福。'
    }
  }
  if (choiceId === 'worry_leave') {
    return {
      scene: '你看着小猫在你脚边打转，心里有点酸。\n\n再过两天就要走了，它怎么办？\n\n"妈，我走了以后你能帮我照顾它吗？"\n\n妈妈看了看猫，叹了口气："行吧，反正它也赖上咱家了。"\n\n你松了口气，但还是有点舍不得。',
      thoughts: '有了牵挂就有了不舍，这就是养小动物的代价。'
    }
  }
  return { scene: '小猫和你越来越亲了。', thoughts: '这只小猫已经成了家里的一员。' }
}

function generateSuddenRainScene(choiceId) {
  if (choiceId === 'go_anyway') {
    return {
      scene: '你拿了把伞就出了门。\n\n雨/雪下得不大不小，路上几乎没人。\n\n你走了一会，鞋子湿了，但空气特别新鲜。\n\n远处的山被雾气笼罩着，像一幅水墨画。\n\n"下雨天出门是有点傻，但看到这景色也值了。"你想。',
      thoughts: '冒雨出门的人，要么是浪漫，要么是闲的。'
    }
  }
  if (choiceId === 'watch_rain') {
    return {
      scene: '你搬了个小凳子坐在门口，看着雨/雪落下来。\n\n屋檐上的水珠一颗一颗地滴着，节奏很慢。\n\n远处的鞭炮声被雨声盖住了，世界突然变得很安静。\n\n爸爸也搬了个凳子坐在旁边，你们谁也没说话。\n\n但这种沉默，一点也不尴尬。',
      thoughts: '和爸爸一起看雨，一句话不说也很好。'
    }
  }
  return { scene: '天气突变了。', thoughts: '计划赶不上变化。' }
}

function generateCookingBattleScene(choiceId) {
  if (choiceId === 'dad_wins') {
    return {
      scene: '你尝了一口爸爸做的菜："嗯，爸做的好吃！"\n\n爸爸得意地笑了。\n\n妈妈白了你一眼："哼，我看你是不想吃我做的饭了。"\n\n"妈做的也好吃！"你赶紧补救。\n\n"算你聪明。"妈妈嘴上不饶人，但也笑了。',
      thoughts: '选爸爸赢，代价是要哄妈妈半天。'
    }
  }
  if (choiceId === 'mom_wins') {
    return {
      scene: '你尝了一口妈妈做的菜："还是妈做的好吃！"\n\n妈妈骄傲地看了爸爸一眼。\n\n爸爸有点不服气："我这个火候刚刚好！"\n\n"行行行，爸做的也不错。"你赶紧和稀泥。\n\n爸爸哼了一声，但脸上还是有笑意。',
      thoughts: '家里的评委不好当，每次都要两头讨好。'
    }
  }
  if (choiceId === 'both_good') {
    return {
      scene: '"都好吃！各有各的特色！"你两碗都端起来吃。\n\n爸妈互相看了一眼，都笑了。\n\n"这孩子，嘴还挺甜。"妈妈说。\n\n"学会了，两边都不得罪。"爸爸也笑了。\n\n你吃得肚子撑撑的，但很满足。',
      thoughts: '和稀泥高手，从家庭评委开始练起。'
    }
  }
  return { scene: '爸妈做菜比赛。', thoughts: '不管谁做的，我都吃得下。' }
}
