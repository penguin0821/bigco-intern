/* ============================================
   大厂实习生存指南 - 剧情数据
   ============================================
   节点结构:
   {
     id: string,
     text: string (支持 \n 换行, <highlight>高亮</highlight>, <dim>灰色</dim>),
     scene: string (可选, ASCII art 场景名),
     choices: [
       {
         text: string,
         next: string (下一节点id),
         effects: { ability, connection, mental, energy } (可选),
         condition: { stat: string, min: number } (可选, 需要满足的条件)
         hint: string (可选, 显示在选项下方的提示)
       }
     ],
     ending: string (可选, 结局id)
   }
   ============================================ */

const STORY_DATA = {
  // ===== 第一幕: 起点 =====
  start: {
    id: 'start',
    text: '六月的阳光穿过宿舍破旧的窗帘，照在你堆满简历模板的书桌上。\n\n你是一名即将步入大四的学生，专业是计算机科学。室友老张刚拿到了某大厂的暑期实习offer，在群里发了一条消息：\n\n<highlight>"兄弟们，我先冲了，秋招见。"</highlight>\n\n你盯着屏幕看了很久，心跳加速。秋招的号角已经吹响，而你...\n\n你深吸一口气，决定——',
    scene: 'dorm',
    choices: [
      { text: '海投简历 — 广撒网，多捞鱼', next: 'mass_apply', effects: { ability: 5, mental: -5, energy: -10 } },
      { text: '找学长内推 — 关系也是实力的一部分', next: 'referral', effects: { connection: 10, mental: 5 } },
      { text: '佛系等待 — 是金子总会发光', next: 'chill_start', effects: { mental: 10, energy: 5 } }
    ]
  },

  mass_apply: {
    id: 'mass_apply',
    text: '接下来的两周，你化身"简历机器"。\n\n每天早上8点起床刷招聘网站，中午吃外卖的时候还在改简历，晚上投到凌晨2点。牛客网上的面经被你翻了三遍，LeetCode刷了200道。\n\n终于，你收到了三家公司的面试邀请：\n\n<highlight>· 星链科技 — 国内Top3大厂，出了名的卷\n· 云帆数据 — 中型互联网公司，口碑不错\n· 闪点创新 — 刚拿到A轮的创业公司</highlight>',
    scene: 'desk',
    choices: [
      { text: '全力准备星链科技的面试', next: 'interview_big', effects: { ability: 5, energy: -10 } },
      { text: '三家都试试，给自己留后路', next: 'interview_multi', effects: { ability: 3, energy: -15, mental: -5 } },
      { text: '先去云帆数据面试，感觉更稳', next: 'interview_mid', effects: { mental: 5, energy: -5 } }
    ]
  },

  referral: {
    id: 'referral',
    text: '你翻出了大三参加编程比赛时认识的学长微信。\n\n他在星链科技工作了两年，看到你的消息后很快回复：\n\n<dim>"可以啊，我帮你推。不过今年实习生竞争很激烈，你算法得过关。"</dim>\n\nHR很快把你的简历捞了起来。面试安排在三天后。\n\n你还需要同时考虑其他机会吗？',
    choices: [
      { text: '专注准备星链科技，背水一战', next: 'interview_big', effects: { ability: 5, connection: 5, energy: -10 } },
      { text: '同时也投投其他公司，分散风险', next: 'interview_multi', effects: { mental: 5, energy: -15 } },
      { text: '问问学长还有没有其他组的内推', next: 'interview_referral2', effects: { connection: 10 } }
    ]
  },

  chill_start: {
    id: 'chill_start',
    text: '你决定不急。\n\n"急什么，大四还早呢。"你安慰自己，继续打着游戏，偶尔投一两份简历。\n\n两周过去了，室友老张已经在实习了，隔壁班的小李也拿到了offer。而你...邮箱里只有几封"感谢您的投递"。\n\n一天晚上，你刷到一条消息：云帆数据的HR在朋友圈发了一条实习招聘，说还有一个名额。\n\n<highlight>你意识到，也许不能再佛下去了。</highlight>',
    choices: [
      { text: '赶紧投云帆数据，抓住这个机会', next: 'interview_mid_late', effects: { mental: -10, energy: -5 } },
      { text: '算了吧，考研/考公也是一条路', next: 'ending_chill', effects: { mental: 5 } },
      { text: '让爸妈帮忙找找关系', next: 'parent_help', effects: { connection: 5, mental: -10 } }
    ]
  },

  interview_big: {
    id: 'interview_big',
    text: '星链科技的面试一共四轮。\n\n一面是算法题，你紧张得手心冒汗，但还是做对了两道中的一道半。\n\n二面是项目面，面试官追问得极深，你感觉自己被扒了个底朝天。\n\n三面是leader面，一个看起来很严肃的中年人问你：\n\n<highlight>"你觉得你为什么适合这里？"</highlight>\n\n你深吸一口气——',
    choices: [
      { text: '展示你的项目经历和技术热情', next: 'pass_big', effects: { ability: 10, mental: 5 } },
      { text: '坦诚说自己是来学习的', next: 'pass_big_lucky', effects: { mental: -5 } },
      { text: '讲一个精心准备的"逆袭故事"', next: 'pass_big', effects: { connection: 5, ability: 5 } }
    ]
  },

  interview_multi: {
    id: 'interview_multi',
    text: '你三家都面了。\n\n星链科技的面试让你头皮发麻，云帆数据的面试意外地舒服，面试官像个知心大哥。闪点创新的老板直接面你，说：\n\n<highlight>"来我们这里，你能接触到最核心的业务。"</highlight>\n\n一周后，你竟然三家都拿到了offer。幸福的烦恼来了——',
    choices: [
      { text: '选星链科技 — 大厂光环，简历加分', next: 'choose_big', effects: { ability: 5, mental: -5 } },
      { text: '选云帆数据 — 氛围好，能学到东西', next: 'choose_mid', effects: { mental: 10, ability: 5 } },
      { text: '选闪点创新 — 高风险高回报', next: 'choose_startup', effects: { ability: 10, mental: -5, energy: -5 } }
    ]
  },

  interview_mid: {
    id: 'interview_mid',
    text: '云帆数据的面试比想象中顺利。\n\n面试官是个年轻的leader，聊技术的时候像在和朋友讨论。最后他问你：\n\n<dim>"你更想做什么方向？我们这边后端、前端、数据都有坑位。"</dim>',
    choices: [
      { text: '后端开发 — 扎实的技术路线', next: 'choose_mid', effects: { ability: 10 } },
      { text: '前端开发 — 你一直对UI感兴趣', next: 'choose_mid', effects: { ability: 5, mental: 5 } },
      { text: '数据分析 — 听起来很高大上', next: 'choose_mid', effects: { ability: 5, connection: 5 } }
    ]
  },

  interview_mid_late: {
    id: 'interview_mid_late',
    text: '你急急忙忙投了云帆数据，没想到第二天就收到了面试邀请。\n\n面试的时候你发挥得一般，有两道题没答上来。但面试官看你态度诚恳，还是给了你一个机会：\n\n<highlight>"你基础还可以，但说实话，比其他候选人差了一些。我们这边有个边缘项目缺人，你愿意来吗？"</highlight>',
    choices: [
      { text: '去！有实习经历总比没有好', next: 'edge_project', effects: { mental: -5, energy: 5 } },
      { text: '再等等，说不定有更好的机会', next: 'wait_better', effects: { mental: -10 } }
    ]
  },

  interview_referral2: {
    id: 'interview_referral2',
    text: '学长想了想，说：\n\n<dim>"我有个朋友在云帆数据带团队，他们也在招实习生。你要是想去，我可以帮你问问。"</dim>\n\n你同时收到了两个面试机会：星链科技和云帆数据。\n\n先准备哪个？',
    choices: [
      { text: '两个都准备，累一点没关系', next: 'interview_multi', effects: { energy: -15, ability: 5 } },
      { text: '专心准备星链科技', next: 'interview_big', effects: { ability: 5, energy: -10 } },
      { text: '选云帆数据，学长朋友那更好说话', next: 'interview_mid', effects: { connection: 10 } }
    ]
  },

  parent_help: {
    id: 'parent_help',
    text: '你打电话给爸妈，委婉地表达了一下"需要帮忙"的意思。\n\n没想到你爸沉默了一会儿说：\n\n<dim>"我有个老同学在国企当部门主任，可以帮你问问实习的事。不过...是传统行业，你想好了吗？"</dim>\n\n你犹豫了——',
    choices: [
      { text: '去国企实习，稳定最重要', next: 'ending_chill', effects: { mental: 10, connection: 5 } },
      { text: '算了，还是靠自己吧', next: 'mass_apply', effects: { mental: -5, ability: 5 } }
    ]
  },

  pass_big: {
    id: 'pass_big',
    text: '三面结束后，HR告诉你：\n\n<highlight>"恭喜你通过了全部面试，欢迎加入星链科技！"</highlight>\n\n你激动得差点从椅子上跳起来。冷静下来后，你开始想入职的事情。\n\n星链科技给了你两个组的选择：\n\n· <highlight>搜索推荐组</highlight> — 核心业务，压力大，转正率高\n· <highlight>创新实验室</highlight> — 新成立的组，方向不明，但自由度高',
    choices: [
      { text: '搜索推荐组 — 核心业务才是硬道理', next: 'day1_core', effects: { ability: 10, mental: -5, energy: -5 } },
      { text: '创新实验室 — 自由探索更有意思', next: 'day1_innovate', effects: { mental: 5, ability: 5 } }
    ]
  },

  pass_big_lucky: {
    id: 'pass_big_lucky',
    text: '面试官听完你的回答，意味深长地笑了一下：\n\n<dim>"嗯...坦白说，你的回答很真诚。虽然技术还差点意思，但态度不错。我们给你个机会吧。"</dim>\n\n你幸运地拿到了offer，被分到了一个<highlight>基础架构组</highlight>。',
    choices: [
      { text: '接受安排，好好干', next: 'day1_core', effects: { ability: 5, mental: 5 } }
    ]
  },

  choose_big: {
    id: 'choose_big',
    text: '你选择了星链科技。\n\n入职前一天，你在朋友圈发了一条：\n\n<highlight>"新的征程，加油。"</highlight>\n\n配图是星链科技的大楼。收到了87个赞。\n\n但你知道，真正的挑战才刚刚开始——',
    choices: [
      { text: '继续', next: 'day1_core', effects: { mental: 5 } }
    ]
  },

  choose_mid: {
    id: 'choose_mid',
    text: '你选择了云帆数据。\n\n入职那天，leader亲自带你参观了办公室。虽然只有两层楼，但每个人都在专注地做着自己的事。\n\n<dim>"我们这里不搞996，把事情做好就行。"</dim> leader笑着说。\n\n你感到一丝安心。',
    choices: [
      { text: '继续', next: 'day1_wlb', effects: { mental: 10, energy: 5 } }
    ]
  },

  choose_startup: {
    id: 'choose_startup',
    text: '你选择了闪点创新。\n\n办公室在一栋老旧写字楼的6层，十几个人挤在一起。老板是个90后，穿着拖鞋在写代码。\n\n<highlight>"来了就干活，没那么多规矩。"</highlight>\n\n你第一天就被拉进了核心项目的代码仓库。',
    choices: [
      { text: '继续', next: 'day1_startup', effects: { ability: 15, energy: -10, mental: -5 } }
    ]
  },

  edge_project: {
    id: 'edge_project',
    text: '你来到了云帆数据的边缘项目组。\n\n说是"边缘"，其实就是做一个内部管理工具。组里只有三个人，包括你的mentor——一个沉默寡言但技术很强的后端大佬。\n\n<dim>"这个项目没什么人关注，做好了没人看到，做坏了也没人管。"</dim> mentor淡淡地说。\n\n你决定——',
    choices: [
      { text: '既来之则安之，把手头的事做好', next: 'work_diligent', effects: { ability: 10, mental: 5 } },
      { text: '主动提出优化方案，让项目更有价值', next: 'work_ambitious', effects: { ability: 15, energy: -10, mental: -5 } },
      { text: '摸鱼为主，抽空刷题准备秋招', next: 'work_slack', effects: { mental: 5, energy: 10, ability: -5 } }
    ]
  },

  wait_better: {
    id: 'wait_better',
    text: '你拒绝了云帆数据的offer，继续等待。\n\n然而，秋招的黄金期一天天过去。你投出去的简历石沉大海，面试机会越来越少。\n\n<highlight>室友老张发消息："我们组今年有转正名额，你要不要来试试？"</highlight>\n\n这是你最后的机会了——',
    choices: [
      { text: '接受老张的帮助，去他公司面试', next: 'day1_core', effects: { connection: 5, mental: -15 } },
      { text: '放弃实习，全力准备考研', next: 'ending_chill', effects: { mental: -10 } }
    ]
  },

  // ===== 第二幕: 入职初期 =====
  day1_core: {
    id: 'day1_core',
    text: '入职第一天。\n\n你走进星链科技的大楼，工牌上印着"实习生"三个字。工位在一个巨大的开放式办公区里，周围都是噼里啪啦的键盘声。\n\n你的mentor叫陈哥，一个工作5年的资深工程师。中午他主动邀请你一起吃饭：\n\n<highlight>"走，带你认识认识组里的人。"</highlight>',
    scene: 'office',
    choices: [
      { text: '主动社交，记住每个人的名字和负责的业务', next: 'social_active', effects: { connection: 15, energy: -5 } },
      { text: '安静吃饭，听他们聊天就好', next: 'social_quiet', effects: { mental: 5, connection: 5 } }
    ]
  },

  day1_wlb: {
    id: 'day1_wlb',
    text: '入职云帆数据的第一天。\n\n办公室不大，但布置得很温馨。有人在茶水间放了零食，墙上贴满了便签和团建照片。\n\n你的mentor叫小林，一个工作3年的工程师，说话很温柔：\n\n<highlight>"不用紧张，有什么不懂的随时问我。我们这边不卷，把事情做好就行。"</highlight>',
    choices: [
      { text: '认真学习，每天做笔记', next: 'work_diligent', effects: { ability: 10, mental: 5 } },
      { text: '享受这种节奏，工作之余发展副业', next: 'work_balance', effects: { mental: 15, ability: 5 } }
    ]
  },

  day1_innovate: {
    id: 'day1_innovate',
    text: '你来到了创新实验室。\n\n这个组只有8个人，但每个人看起来都很"极客"。白板上写满了各种idea，有人在讨论AI、区块链、元宇宙...\n\n你的mentor是一个刚从硅谷回来的博士：\n\n<highlight>"我们这里没有固定的任务，你自己找方向。每周做一次demo就行。"</highlight>\n\n自由...但也意味着迷茫。',
    choices: [
      { text: '选择一个你感兴趣的方向深入研究', next: 'work_ambitious', effects: { ability: 15, mental: 5 } },
      { text: '先观察两周，看看大家都在做什么', next: 'social_quiet', effects: { connection: 10, mental: 5 } }
    ]
  },

  day1_startup: {
    id: 'day1_startup',
    text: '闪点创新的第一天，你就被拉去开了一个产品会。\n\n老板指着白板说：\n\n<highlight>"下个月我们要上线一个新功能，实习生你也来负责一个模块。"</highlight>\n\n你有点慌——你连公司的代码规范都还没看。',
    choices: [
      { text: '硬着头皮上，边做边学', next: 'work_ambitious', effects: { ability: 15, energy: -15, mental: -10 } },
      { text: '坦白说你需要时间熟悉代码', next: 'work_diligent', effects: { ability: 5, mental: 5 } }
    ]
  },

  social_active: {
    id: 'social_active',
    text: '你主动和每个人打招呼，午饭的时候你记住了：\n\n· 陈哥 — 你的mentor，后端大佬\n· 王姐 — 产品经理，组里的"大姐大"\n· 小李 — 另一个实习生，比你早来两周，很拼\n· 张工 — 前端，平时话不多但很热心\n\n王姐笑着说：<dim>"这实习生挺活泼的，不错。"</dim>\n\n下午，陈哥开始给你分配任务——',
    choices: [
      { text: '接受核心模块的开发任务', next: 'work_core_task', effects: { ability: 10, energy: -10 } },
      { text: '主动要求参与一个新功能的提案', next: 'work_ambitious', effects: { ability: 15, connection: 5, energy: -10 } }
    ]
  },

  social_quiet: {
    id: 'social_quiet',
    text: '你安静地吃完了午饭，记住了mentor陈哥和另一个实习生小李。\n\n回到工位后，陈哥发了一份文档给你：\n\n<dim>"先看看项目文档，有什么不懂的问我。不用着急，第一周以熟悉为主。"</dim>\n\n你花了整个下午看完了文档，对这个项目有了基本的了解。\n\n<highlight>你感觉自己准备好了。</highlight>',
    choices: [
      { text: '开始做分配给你的第一个小任务', next: 'work_diligent', effects: { ability: 10, mental: 5 } },
      { text: '主动找陈哥要更多的任务', next: 'work_core_task', effects: { ability: 10, energy: -10 } }
    ]
  },

  // ===== 第三幕: 中期考验 =====
  work_diligent: {
    id: 'work_diligent',
    text: '接下来的一个月，你勤勤恳恳地工作。\n\n每天早来晚走，认真完成每一个任务。mentor对你的评价是"靠谱"。\n\n但某天下午，你发现同组的另一个实习生小李，每天加班到11点，周末也来公司。他负责的任务比你多了一倍。\n\n<highlight>你开始感到压力——这就是传说中的"工贼"吗？</highlight>\n\n组里的转正名额只有两个。',
    choices: [
      { text: '加大投入，和小李竞争', next: 'compete_hard', effects: { ability: 10, energy: -20, mental: -15 } },
      { text: '保持自己的节奏，做好份内的事', next: 'keep_pace', effects: { mental: 10, ability: 5 } },
      { text: '找mentor聊聊，了解转正标准', next: 'talk_mentor', effects: { connection: 10, mental: 5 } }
    ]
  },

  work_core_task: {
    id: 'work_core_task',
    text: '你被分配了一个核心模块的开发任务。\n\n这是组里最重要的业务之一，代码复杂度很高。你花了三天时间看代码，感觉脑袋要爆炸了。\n\nmentor问你进展的时候，你——',
    choices: [
      { text: '坦诚说遇到困难，请求指导', next: 'ask_help', effects: { connection: 5, ability: 10, mental: 5 } },
      { text: '硬着头皮说"差不多了"，私下拼命搞', next: 'push_hard', effects: { ability: 15, energy: -20, mental: -10 } },
      { text: '偷偷在技术社区找外援', next: 'find_help_outside', effects: { ability: 10, connection: -5 } }
    ]
  },

  work_ambitious: {
    id: 'work_ambitious',
    text: '你提出了一个大胆的想法——用新的技术方案重构现有的模块。\n\nmentor听完有些犹豫：<dim>"这个改动太大了，万一出问题..."</dim>\n\n但你做了一份详细的PPT和可行性分析，最终说服了他让你试试。\n\n<highlight>三周后，你的方案跑通了。组里的人都对你刮目相看。</highlight>\n\n但代价是——你连续加了两周班，身体开始发出警告。',
    choices: [
      { text: '趁热打铁，继续优化', next: 'burnout_risk', effects: { ability: 15, energy: -25, mental: -10 } },
      { text: '停下来休息两天', next: 'take_rest', effects: { mental: 15, energy: 15 } },
      { text: '把成果整理好，为转正答辩做准备', next: 'prepare_defense', effects: { ability: 5, mental: 10 } }
    ]
  },

  work_balance: {
    id: 'work_balance',
    text: '你享受着云帆数据的工作节奏。\n\n每天准时上下班，工作之余你开始写技术博客，还在GitHub上维护了一个开源项目。\n\n三个月后，你的技术博客已经有了一些读者，开源项目也收获了200个star。\n\n<highlight>mentor小林说："你这种状态挺好的，不用非得卷。"</highlight>\n\n但你听说星链科技的实习生们已经开始准备转正答辩了...',
    choices: [
      { text: '继续现在的节奏，转正的事顺其自然', next: 'ending_balance', effects: { mental: 15, ability: 5 } },
      { text: '突然有点焦虑，要不要更努力一点？', next: 'late_anxiety', effects: { mental: -10, energy: -5 } }
    ]
  },

  work_slack: {
    id: 'work_slack',
    text: '你选择了摸鱼。\n\n每天到公司就刷手机、看视频，偶尔写几行代码应付一下。mentor似乎也不太管你。\n\n两个月过去了，你感觉自己什么也没学到。\n\n<highlight>一天，leader突然在组会上宣布："下个月有一次实习生评估，表现不好的可能不会给转正机会。"</highlight>\n\n你慌了。',
    choices: [
      { text: '赶紧补救，疯狂赶进度', next: 'last_minute_rush', effects: { ability: 5, energy: -20, mental: -15 } },
      { text: '算了，开始投其他公司的秋招', next: 'autumn_recruit', effects: { mental: -10, ability: 5 } },
      { text: '无所谓，反正也不想来', next: 'ending_quit', effects: { mental: 5 } }
    ]
  },

  compete_hard: {
    id: 'compete_hard',
    text: '你开始了和小李的"暗中较劲"。\n\n他加班到11点，你就待到12点。他周末来，你也来。你们像两台不停运转的机器。\n\n两周后的一天晚上，你在工位上突然感觉头晕，眼前一黑...\n\n<highlight>你被送到了医院。医生说是过度劳累导致的。</highlight>\n\nmentor陈哥来看你，叹了口气：\n\n<dim>"身体是革命的本钱啊，你别太拼了。"</dim>',
    choices: [
      { text: '休息一周后回来继续干', next: 'comeback_after_rest', effects: { energy: 10, mental: -10 } },
      { text: '认真反思，调整工作节奏', next: 'adjust_pace', effects: { mental: 15, energy: 10, ability: -5 } },
      { text: '心灰意冷，考虑辞职', next: 'consider_quit', effects: { mental: -15, energy: 5 } }
    ]
  },

  keep_pace: {
    id: 'keep_pace',
    text: '你选择保持自己的节奏。\n\n虽然小李比你更拼，但你把自己的工作做得很扎实。每周五你都会做一个小总结发给mentor。\n\n两个月后，你发现小李因为过度疲劳犯了一个严重的线上bug，被leader批评了。\n\n<highlight>而你的代码一次bug都没出过。</highlight>\n\nmentor私下跟你说：<dim>"稳定输出比偶尔闪光更重要。"</dim>',
    choices: [
      { text: '继续稳步前进', next: 'prepare_defense', effects: { mental: 10, ability: 5, connection: 5 } },
      { text: '趁小李状态不好，争取更多任务', next: 'take_chance', effects: { ability: 10, connection: -10, mental: -5 } }
    ]
  },

  talk_mentor: {
    id: 'talk_mentor',
    text: '你约陈哥在咖啡间聊了聊。\n\n他坦诚地告诉你：\n\n<dim>"转正主要看三个方面：技术能力、团队协作、还有产出。小李确实很拼，但说实话...他的代码质量一般。你不用跟他比时长，把自己的事做好就行。"</dim>\n\n他又补了一句：\n\n<highlight>"而且，今年我们组可能会多一个hc。leader最近在争取。"</highlight>\n\n你心里的石头放下了一半。',
    choices: [
      { text: '更有信心了，继续好好干', next: 'prepare_defense', effects: { mental: 15, connection: 10 } },
      { text: '但还是不敢放松，两手准备', next: 'autumn_recruit', effects: { mental: 5, ability: 5, energy: -10 } }
    ]
  },

  ask_help: {
    id: 'ask_help',
    text: '你向mentor坦诚了遇到的困难。\n\n陈哥并没有不耐烦，反而拉了个椅子坐到你旁边：\n\n<dim>"来，我给你讲讲这块的逻辑。其实这里有个历史包袱..."</dim>\n\n在他的指导下，你很快理清了思路，顺利完成了任务。\n\n<highlight>陈哥在周会上表扬了你："遇到问题能主动沟通，这是很好的习惯。"</highlight>',
    choices: [
      { text: '继续这种高效的工作方式', next: 'keep_pace', effects: { ability: 10, connection: 10, mental: 5 } }
    ]
  },

  push_hard: {
    id: 'push_hard',
    text: '你硬撑着说"差不多了"，然后开始疯狂加班。\n\n连续三天晚上你都在debug到凌晨2点。终于，在第四天你提交了代码——但被review打回来了，说有严重的性能问题。\n\n<highlight>你感到前所未有的挫败。</highlight>\n\nmentor看了你的代码，沉默了一会儿：\n\n<dim>"你这个方案思路是对的，但实现上有些问题。来，我帮你改改。"</dim>',
    choices: [
      { text: '虚心学习，认真修改', next: 'keep_pace', effects: { ability: 10, mental: -5, energy: -10 } },
      { text: '开始怀疑自己是不是不适合这里', next: 'self_doubt', effects: { mental: -20, energy: -5 } }
    ]
  },

  find_help_outside: {
    id: 'find_help_outside',
    text: '你在技术社区发了个帖子求助，很快有人给了你一个思路。\n\n你按照这个思路修改了代码，效果不错。但你心里有点不踏实——这算不算"作弊"？\n\n提交代码后，mentor review时说：\n\n<dim>"这个写法...不像是你的风格啊。"</dim>',
    choices: [
      { text: '坦白说是参考了社区的方案', next: 'confess_outside', effects: { mental: 5, connection: -5 } },
      { text: '含糊带过，说是在网上查到的', next: 'hide_outside', effects: { mental: -10, connection: -5 } }
    ]
  },

  confess_outside: {
    id: 'confess_outside',
    text: '你坦白了。\n\nmentor想了想说：<dim>"其实遇到问题找资源解决是很正常的能力。但下次最好先跟我沟通一下，我可以直接给你更好的方向。"</dim>\n\n<highlight>你学到了重要的一课。</highlight>',
    choices: [
      { text: '从此和mentor保持更开放的沟通', next: 'keep_pace', effects: { connection: 10, mental: 10 } }
    ]
  },

  hide_outside: {
    id: 'hide_outside',
    text: '你含糊带过了。\n\nmentor没有追问，但之后他看你的代码时明显更仔细了。你感觉他似乎知道了什么。\n\n一周后，你在组会上被问到一个技术细节的问题，答不上来。\n\n<highlight>气氛有些尴尬。</highlight>',
    choices: [
      { text: '承认自己的不足，加倍努力补课', next: 'keep_pace', effects: { ability: 5, mental: -15, connection: -5 } },
      { text: '开始感到越来越大的压力', next: 'self_doubt', effects: { mental: -20, connection: -10 } }
    ]
  },

  burnout_risk: {
    id: 'burnout_risk',
    text: '你继续拼命工作。\n\n又一个深夜，你从公司走出来的时候，发现自己在发抖。不是因为冷，是因为焦虑。\n\n你开始失眠，早上醒来的第一个想法是"我是不是应该辞职"。\n\n<highlight>你的手边放着一盒安眠药，这是你第一次需要靠它才能入睡。</highlight>',
    choices: [
      { text: '请假休息一周', next: 'take_rest', effects: { mental: 10, energy: 15 } },
      { text: '再坚持一下，答辩就在下个月了', next: 'push_through', effects: { energy: -20, mental: -25 } },
      { text: '认真考虑辞职', next: 'consider_quit', effects: { mental: -10 } }
    ]
  },

  take_rest: {
    id: 'take_rest',
    text: '你请了三天假。\n\n第一天你在家睡了一整天。第二天你去了公园散步，阳光很好。第三天你打开电脑，发现自己居然有点想念写代码的感觉。\n\n<highlight>回到公司后，你的效率明显提高了。mentor也说："你看起来精神多了。"</highlight>',
    choices: [
      { text: '以更好的状态准备转正答辩', next: 'prepare_defense', effects: { mental: 15, energy: 10, ability: 5 } },
      { text: '开始思考自己真正想要什么样的生活', next: 'reflect_life', effects: { mental: 20 } }
    ]
  },

  reflect_life: {
    id: 'reflect_life',
    text: '休息的日子里，你想了很多。\n\n你问自己：我为什么要来大厂？是为了钱？为了履历？还是真的热爱技术？\n\n你想起高中的时候，第一次写出一个能跑的Python脚本时的兴奋。那时候没有KPI，没有转正压力，只有纯粹的快乐。\n\n<highlight>你打开了一个新的代码编辑器，开始写一个自己一直想做的小项目。</highlight>',
    choices: [
      { text: '找回初心，继续实习但也 pursue 自己的项目', next: 'ending_awakening', effects: { mental: 25, ability: 10 } },
      { text: '回到正轨，专注转正答辩', next: 'prepare_defense', effects: { mental: 10, ability: 5 } }
    ]
  },

  self_doubt: {
    id: 'self_doubt',
    text: '你开始陷入自我怀疑。\n\n每天晚上躺在床上，你都在想："我是不是不够聪明？""别人都能做到，为什么我不行？"\n\n你开始刷知乎上的"大厂劝退"帖子，越看越焦虑。\n\n<highlight>一天晚上，你妈打来电话，问你实习怎么样。你强忍着说"挺好的"，挂了电话后哭了出来。</highlight>',
    choices: [
      { text: '找朋友倾诉，释放压力', next: 'talk_friend', effects: { mental: 10, connection: 5 } },
      { text: '一个人扛着，不能让别人担心', next: 'suffer_alone', effects: { mental: -20, energy: -15 } },
      { text: '去找mentor或leader寻求帮助', next: 'seek_help_leader', effects: { connection: 10, mental: 5 } }
    ]
  },

  talk_friend: {
    id: 'talk_friend',
    text: '你约了大学最好的朋友出来吃烧烤。\n\n他已经决定读博了，你们坐在路边摊，几瓶啤酒下肚，聊起了这段时间的生活。\n\n<dim>"其实每个人都有自己的节奏，"</dim> 他说，<dim>"你不用跟任何人比。"</dim>\n\n你们并不完全理解对方的辛酸，但桌子上的空瓶越来越多，心情却慢慢好了起来。\n\n<highlight>也许，这就是青春吧。</highlight>',
    choices: [
      { text: '带着这份力量回去继续战斗', next: 'prepare_defense', effects: { mental: 20, connection: 10 } },
      { text: '突然觉得人生不只这一条路', next: 'reflect_life', effects: { mental: 15 } }
    ]
  },

  seek_help_leader: {
    id: 'seek_help_leader',
    text: '你鼓起勇气找leader聊了聊。\n\n出乎意料的是，leader很理解你：\n\n<dim>"每个实习生都会经历这个阶段。你不是第一个，也不会是最后一个。重要的是你愿意说出来，这说明你在正视问题。"</dim>\n\n他给你调整了工作量，还安排了一个正式的工程师做你的buddy。\n\n<highlight>你第一次感觉，这个团队是真心关心人的。</highlight>',
    choices: [
      { text: '重新振作起来', next: 'prepare_defense', effects: { mental: 20, connection: 15, ability: 5 } }
    ]
  },

  push_through: {
    id: 'push_through',
    text: '你选择硬扛。\n\n每天靠咖啡续命，晚上吃安眠药入睡。你感觉自己像一台快要报废的机器。\n\n终于，在某天下午的组会上，你突然脑子一片空白，说不出一句完整的话。\n\n<highlight>你崩溃了。当着所有人的面。</highlight>\n\n会议室里一片沉默。mentor走过来拍了拍你的肩膀：\n\n<dim>"走吧，今天先回去休息。"</dim>',
    choices: [
      { text: '接受帮助，停下来好好休息', next: 'forced_rest', effects: { mental: -10, energy: -10 } },
      { text: '觉得自己太丢人了，想辞职', next: 'consider_quit', effects: { mental: -25, connection: -10 } }
    ]
  },

  forced_rest: {
    id: 'forced_rest',
    text: '你在家躺了一周。\n\n前两天你什么也不想做，就盯着天花板发呆。第三天你开始看一些轻松的视频。第五天，你打开了电脑。\n\n不是工作——你开始画一些像素画，这是你小时候的爱好。\n\n<highlight>画着画着，你突然感觉眼眶湿润。你有多久没做过让自己开心的事了？</highlight>',
    choices: [
      { text: '回归实习，但这次用自己的方式', next: 'comeback_after_rest', effects: { mental: 20, energy: 15 } },
      { text: '也许该认真想想自己到底想要什么', next: 'ending_awakening', effects: { mental: 25 } }
    ]
  },

  consider_quit: {
    id: 'consider_quit',
    text: '你打开了辞职信的模板。\n\n光标在屏幕上闪烁，你的手指悬在键盘上方。\n\n你想起入职第一天的兴奋，想起mentor教你写代码的耐心，想起加班时同事给你点的奶茶...\n\n<highlight>但你也想起了失眠的夜晚，想起了那种窒息的感觉。</highlight>\n\n你真的要走吗？',
    choices: [
      { text: '不，你不能就这么放弃', next: 'comeback_after_rest', effects: { mental: 10, energy: 5 } },
      { text: '提交辞职信', next: 'ending_quit', effects: { mental: 5, energy: 10 } },
      { text: '先请长假，给自己一个缓冲期', next: 'take_rest', effects: { mental: 10, energy: 10 } }
    ]
  },

  comeback_after_rest: {
    id: 'comeback_after_rest',
    text: '休息过后，你回到了工位。\n\n同事们看到你回来，有的点头微笑，有的说"欢迎回来"。mentor把这段时间积累的issue整理好了等你。\n\n你深吸一口气，打开IDE——\n\n<highlight>"这次，我不跟任何人比。我就做好我自己。"</highlight>',
    choices: [
      { text: '稳步准备转正答辩', next: 'prepare_defense', effects: { mental: 15, ability: 10, connection: 5 } }
    ]
  },

  adjust_pace: {
    id: 'adjust_pace',
    text: '你调整了工作节奏。\n\n不再和小李比加班时长，而是专注于提高代码质量。你开始写单元测试，做code review，给组里的技术分享做准备。\n\n一个月后，你发现自己反而比之前更有效率了。\n\n<highlight>小李偷偷问你："你怎么做到的？感觉你变强了。"</highlight>',
    choices: [
      { text: '分享你的方法论', next: 'prepare_defense', effects: { connection: 15, ability: 10, mental: 10 } },
      { text: '笑笑不说话，继续走自己的路', next: 'prepare_defense', effects: { mental: 10, ability: 5 } }
    ]
  },

  take_chance: {
    id: 'take_chance',
    text: '你趁小李状态不好，主动向leader争取了他的一些任务。\n\n小李知道了以后，看你的眼神变了。组里的气氛变得微妙起来。\n\n<highlight>你在茶水间听到有人小声说："那个实习生挺会钻营的..."</highlight>\n\n你意识到，职场不只是技术——还有人心。',
    choices: [
      { text: '找小李谈谈，修复关系', next: 'repair_relation', effects: { connection: 10, mental: 5 } },
      { text: '不管了，结果说话', next: 'politics_conflict', effects: { ability: 10, connection: -15, mental: -10 } }
    ]
  },

  politics_conflict: {
    id: 'politics_conflict',
    text: '你选择不理会别人的看法，继续埋头干活。\n\n但事情比你想象的复杂。小李开始在其他同事面前说你的坏话，甚至向leader暗示你"能力不行但很会表现"。\n\n更糟糕的是，你发现mentor和leader之间也出现了裂痕——而小李恰好是leader看好的那个。\n\n<highlight>你被卷入了一场你并不想参与的办公室政治。</highlight>\n\n某天下午，leader找你谈话，暗示你的表现"还需要观察"...', 'choices': [
      { text: '据理力争，拿出你的工作成果', next: 'ending_politics', effects: { ability: 5, mental: -15, connection: -10 } },
      { text: '算了，这地方不值得留恋', next: 'ending_quit', effects: { mental: -10, energy: 5 } }
    ]
  },

  repair_relation: {
    id: 'repair_relation',
    text: '你找了个机会请小李喝咖啡。\n\n你坦白了自己的想法：<dim>"我可能做得不太好，我只是...太想留下了。"</dim>\n\n小李沉默了一会儿，说：<dim>"其实我也是。我们都是被逼的。"</dim>\n\n你们第一次像朋友一样聊了聊。原来他家里条件不好，急需这份工作的薪水。\n\n<highlight>你们决定公平竞争，不再互相算计。</highlight>',
    choices: [
      { text: '一起努力，准备答辩', next: 'prepare_defense', effects: { connection: 15, mental: 15 } }
    ]
  },

  autumn_recruit: {
    id: 'autumn_recruit',
    text: '你开始了"两头跑"的生活——白天实习，晚上准备秋招面试。\n\n每天下班后你就在宿舍刷题、投简历、参加线上笔试。你感觉自己像一台永不停歇的机器。\n\n秋招进展不太顺利——大厂的笔试题比你想象中难很多。但你拿到了一家二线公司的offer。\n\n<highlight>与此同时，实习公司的转正答辩马上就要开始了。</highlight>\n\n你面临一个抉择——',
    choices: [
      { text: '两手都抓，尽力而为', next: 'prepare_defense', effects: { energy: -20, ability: 5, mental: -10 } },
      { text: '放弃秋招，全力准备转正答辩', next: 'prepare_defense', effects: { mental: 10, energy: -5 } },
      { text: '接受二线公司offer，放弃这边', next: 'ending_other_company', effects: { mental: 5, connection: -10 } }
    ]
  },

  last_minute_rush: {
    id: 'last_minute_rush',
    text: '你开始了疯狂的补救。\n\n连续两周你都在加班，努力把之前落下的工作补上。mentor看在眼里，没有说什么，但会在你卡住的时候指点一下。\n\n然而，时间太紧了。你的产出还是不够理想。\n\n<highlight>评估结果出来了：你的评分在实习生中垫底。</highlight>\n\nmentor叹了口气：<dim>"说实话...转正可能有点悬。"</dim>',
    choices: [
      { text: '再争取一下，找leader谈', next: 'last_chance', effects: { connection: 5, mental: -10 } },
      { text: '接受现实，开始投秋招', next: 'ending_regret', effects: { mental: -15, ability: 5 } }
    ]
  },

  last_chance: {
    id: 'last_chance',
    text: '你找到了leader，坦诚了自己的情况。\n\nleader听完说：<dim>"你的情况我了解。坦白说，按正常流程你很难留下。但...我手里有一个特殊项目的名额，需要一个人从零开始搭。你愿意试试吗？"</dim>\n\n<highlight>这是一个赌博——成了就留下，不成就走人。</highlight>',
    choices: [
      { text: '赌一把！', next: 'ending_underdog', effects: { ability: 10, mental: -10, energy: -15 } },
      { text: '算了，别为难人家了', next: 'ending_regret', effects: { mental: -5, connection: 5 } }
    ]
  },

  late_anxiety: {
    id: 'late_anxiety',
    text: '焦虑来了。\n\n你开始刷脉脉，看那些"实习生薪资倒挂""大厂offer收割机"的帖子，越看越焦虑。\n\n你问小林：<dim>"你觉得我应该更拼一点吗？"</dim>\n\n小林想了想：<dim>"这取决于你想要什么。高薪和高强度是绑定的，你得问自己值不值。"</dim>',
    choices: [
      { text: '加速！开始更努力地工作', next: 'compete_hard', effects: { energy: -15, ability: 10, mental: -15 } },
      { text: '想清楚了，你更喜欢现在的状态', next: 'ending_balance', effects: { mental: 15 } },
      { text: '开始投其他大厂，看看自己的市场价', next: 'autumn_recruit', effects: { mental: -5, ability: 5 } }
    ]
  },

  // ===== 第四幕: 终局 =====
  prepare_defense: {
    id: 'prepare_defense',
    text: '转正答辩的时间定了：下周五。\n\n你开始准备PPT。你的mentor给了你一些建议：\n\n<dim>"重点讲清楚你做了什么、解决了什么问题、给团队带来了什么价值。数据说话。"</dim>\n\n你翻看了这几个月的工作记录——那些深夜debug的时刻，那些被review打回的代码，那些和小李争论技术方案的下午...\n\n<highlight>这一切，都值得吗？</highlight>\n\n答辩前夜，你——',
    choices: [
      { text: '精心准备PPT，反复排练到凌晨', next: 'defense_perfect', effects: { ability: 10, energy: -15 } },
      { text: '只展示实际工作成果，不夸大', next: 'defense_honest', effects: { mental: 10 } },
      { text: '先找mentor探探口风', next: 'defense_insider', effects: { connection: 10, mental: 5 } }
    ]
  },

  defense_perfect: {
    id: 'defense_perfect',
    text: '你准备了一份精美的PPT，排练了五遍。\n\n答辩当天，你穿着最正式的衬衫走进了会议室。评委是leader、mentor和另一个组的技术总监。\n\n你从项目背景讲到技术方案，从数据指标讲到未来规划。你的声音稳定，逻辑清晰。\n\n技术总监问了一个刁钻的问题，你——',
    choices: [
      { text: '用你准备的内容完美回答', next: 'ending_ssp', effects: { ability: 10 } , condition: { stat: 'ability', min: 65 } },
      { text: '坦诚说这个方向你还需要学习', next: 'ending_normal_offer', effects: { mental: 5 } },
      { text: '用实习中的真实案例来佐证', next: 'ending_good', effects: { ability: 5, connection: 5 } }
    ]
  },

  defense_honest: {
    id: 'defense_honest',
    text: '你做了一个简洁但真实的PPT。\n\n没有夸大，没有修饰。你只是把这几个月做的事情，一件一件地展示出来。\n\n答辩的时候，leader问：<dim>"你觉得你最大的成长是什么？"</dim>\n\n你想了想，说：\n\n<highlight>"我学会了承认自己的不足，然后一步一步去改进。"</highlight>\n\n会议室里安静了几秒。然后leader点了点头。',
    choices: [
      { text: '等待结果', next: 'ending_normal_offer', effects: { mental: 10 } }
    ]
  },

  defense_insider: {
    id: 'defense_insider',
    text: '你约了mentor吃午饭，旁敲侧击地问了问答辩的事。\n\n陈哥想了想说：<dim>"你的产出是没问题的。但我建议你重点讲讲那个你独立解决的难题，那个很加分。"</dim>\n\n他又压低声音说：<highlight>"今年我们组应该有2个hc，你和小李都有机会。"</highlight>\n\n你安心了一些。',
    choices: [
      { text: '按照建议准备答辩', next: 'defense_perfect', effects: { ability: 5, connection: 5 } }
    ]
  },

  // ===== 结局节点 =====
 suffer_alone: {
    id: 'suffer_alone',
    text: '你决定一个人扛着。\n\n你开始对所有人微笑，对所有人说"挺好的"。但只有你自己知道，每天走进公司的那一刻，你的胸口像压了一块石头。\n\n你变得越来越沉默，越来越不想说话。组会上轮到你汇报时，你只能机械地念PPT。\n\n<highlight>你感觉自己正在慢慢消失。</highlight>\n\n终于有一天，mentor发现了你的不对劲——',
    choices: [
      { text: '向他倾诉你的真实感受', next: 'seek_help_leader', effects: { mental: 15, connection: 10 } },
      { text: '继续伪装，直到崩溃', next: 'push_through', effects: { mental: -20, energy: -15 } }
    ]
  },

  ending_ssp: {
    id: 'ending_ssp',
    text: '答辩结束后的第三天，你收到了HR的邮件。\n\n<highlight>恭喜你，你获得了SSP offer——最高等级的录用。</highlight>\n\n薪资超出了你的预期。mentor发来消息：\n\n<dim>"实至名归。欢迎正式加入我们。"</dim>\n\n你站在公司楼下，看着头顶的大屏幕。上面写着公司的slogan。\n\n你深吸一口气，笑了。\n\n这一切的努力，终于有了回报。',
    ending: 'E1'
  },

  ending_good: {
    id: 'ending_good',
    text: '答辩很顺利。\n\n一周后你收到了正式offer，薪资虽然不是最高档，但已经很体面了。\n\nmentor在庆祝饭局上举杯说：<dim>"这个实习生，我带得最省心。"</dim>\n\n你有点不好意思地笑了。\n\n<highlight>从学生到职场人的转变，就这样悄悄地完成了。</highlight>\n\n未来的路也许还有很多挑战，但你知道，你已经准备好了。',
    ending: 'E6'
  },

  ending_normal_offer: {
    id: 'ending_normal_offer',
    text: '你拿到了转正offer。\n\nHR的电话里语气很坚定：<dim>"薪资就是这个数，你看能不能接受？"</dim>\n\n数字比你预期的低了不少。你犹豫了一会儿，还是答应了。\n\n放下电话，你看着窗外——\n\n<highlight>拿到了offer，但你不确定这是不是你真正想要的。</highlight>\n\n也许这就是职场的现实吧。',
    ending: 'E4'
  },

  ending_balance: {
    id: 'ending_balance',
    text: '你在云帆数据的实习很平静。\n\n没有疯狂的加班，没有勾心斗角的竞争。你每天做着自己喜欢的工作，下班后写写博客，逛逛公园。\n\n转正的时候，薪资只有大厂的一半。但你每天都能看到夕阳。\n\n几年后的某天，你在一场技术大会上偶遇了曾经的大学同学。他看起来憔悴了很多，说在大厂996已经第三年了。\n\n<highlight>你微笑着看了看窗外的天空。你知道自己做了正确的选择。</highlight>',
    ending: 'E5'
  },

  ending_quit: {
    id: 'ending_quit',
    text: '你提交了辞职信。\n\nmentor看到后沉默了一会儿，说：<dim>"也好。年轻人嘛，多看看世界。"</dim>\n\n你收拾了工位上的东西——一个杯子，一本笔记本，一张和同事们的合照。\n\n走出公司大楼的那天，阳光很刺眼。你站在路边，突然不知道该去哪里。\n\n<highlight>你买了一张去云南的机票。</highlight>\n\n至于工作...以后再说吧。',
    ending: 'E11'
  },

  ending_regret: {
    id: 'ending_regret',
    text: '你没能留下来。\n\n消息传来的时候，你正坐在工位上。mentor走过来，拍了拍你的肩膀：\n\n<dim>"别太难过。这不是你的问题，今年hc确实太少了。"</dim>\n\n你知道他在安慰你。但你也知道，如果当初更努力一点，结果也许会不一样。\n\n秋招的黄金期已经过去了。你打开招聘网站，发现好岗位已经不多了。\n\n<highlight>你为了留用拼尽全力，却错过了最宝贵的时间窗口。</highlight>\n\n至于工作...春招再碰碰运气吧。',
    ending: 'E8'
  },

  ending_chill: {
    id: 'ending_chill',
    text: '你最终没有去大厂实习。\n\n也许是考研，也许是考公，也许是一个说走就走的间隔年。\n\n你的朋友圈里，室友们都在晒大厂的工牌和团建照。你偶尔会感到一丝焦虑，但很快就被手头的事情冲淡了。\n\n<highlight>每个人都有自己的时区。你没有落后，也没有领先。</highlight>\n\n在命运为你安排的属于自己的时区里，一切都非常准时。',
    ending: 'E2'
  },

  ending_other_company: {
    id: 'ending_other_company',
    text: '你接受了那家二线公司的offer，提交了实习辞职。\n\nmentor说：<dim>"也好，多经历经历不是坏事。"</dim>\n\n新公司的第一天，你发现这里节奏更慢，但做的事情意外地有趣。你的leader是个从大厂出来的人，经常跟你分享行业见闻。\n\n半年后，你在一次技术沙龙上遇到了曾经实习公司的同事。他告诉你，那个组后来被裁撤了。\n\n<highlight>你不知道该庆幸还是唏嘘。</highlight>',
    ending: 'E5'
  },

  ending_underdog: {
    id: 'ending_underdog',
    text: '你接受了leader给的挑战——从零搭建一个新项目。\n\n接下来的三周你像打了鸡血一样。你查阅了大量的技术文档，画了无数张架构图，写了删，删了写。\n\n最终汇报的那天，你展示了一个虽然粗糙但完整可用的原型。\n\nleader看完说：<highlight>"就你了。"</highlight>\n\n你愣住了。然后你笑了。\n\n也许这就是人生——有时候你需要的不是完美的履历，而是一个敢于赌一把的勇气。',
    ending: 'E3'
  },

  ending_awakening: {
    id: 'ending_awakening',
    text: '那天晚上，你盯着自己画了一下午的像素画，突然有了一个想法。\n\n为什么不把这段实习经历做成一个游戏呢？\n\n你打开代码编辑器，开始写一个互动叙事的网页游戏。每一个选择都基于你的真实经历，每一个结局都是你可能走向的人生。\n\n三个月后，你把游戏发到了GitHub上。没想到，它在社交媒体上火了。\n\n<highlight>有人说："这就是我的人生啊。"</highlight>\n\n你笑了。也许，真正的觉醒不是找到答案，而是开始问正确的问题。',
    ending: 'E12'
  },

  ending_politics: {
    id: 'ending_politics',
    text: '你卷入了一场办公室政治。\n\nmentor和leader之间的矛盾最终爆发了。mentor选择了离职，而你作为"他的人"，被新来的leader边缘化。\n\n你被分配到了最不起眼的工作，开会的时候没有人问你意见。你像一颗被遗忘的棋子。\n\n<highlight>你终于明白，在大厂，技术只是一半。另一半，是你永远不想学会的东西。</highlight>\n\n实习结束后，你在简历上只写了一行字：\n<dim>"学会了如何在复杂环境中保持自我。"</dim>',
    ending: 'E10'
  }
};

// 结局定义
const ENDINGS = {
  E1: { id: 'E1', type: 'good', name: '天道酬勤', icon: '🌟',
    desc: '你站在公司楼下，手里攥着那封offer邮件的截图。\n\n屏幕上的数字比你大四开学时写在便签纸上的目标还多了一点。你把截图发给了妈妈，她回了一条语音，声音有点哑：“妈不太懂这些，但妈知道你很辛苦。”\n\n你抬头看着大楼顶层亮着的灯——那是你三个月前第一次来面试时仰望过的同一盏灯。\n\n那时候你觉得它好远。\n\n现在你站在这里，才发现——\n\n其实你一直都在往那个方向走。' },
  E2: { id: 'E2', type: 'good', name: '人间清醒', icon: '🧭',
    desc: '你没有去大厂。\n\n朋友圈里室友们晒工牌、晒团建、晒深夜加班的泡面，你偶尔刷到，拇指会停顿一秒。\n\n但很快你就把手机放下了，继续做手头的事。\n\n也许是图书馆的考研座位，也许是清晨六点的操场，也许是一张去往陌生城市的车票。\n\n后来有人在评论区问你：“你后悔没去大厂吗？”\n\n你想了很久，回了一个字：\n\n不。\n\n不是每个人都有必要走同一条路。\n\n而你在所有人都向前跑的时候，听清了自己的心跳。' },
  E3: { id: 'E3', type: 'good', name: '破茧成蝶', icon: '🦋',
    desc: '汇报结束的那一刻，会议室安静了三秒。\n\n你听到自己的心跳，听到投影仪风扇嗡嗡的声音，听到窗外不知道谁在打电话。\n\n然后leader说了三个字：“就你了。”\n\n你愣在原地。手心全是汗，腿有点软。\n\n三个月前那个在工位上偷偷红了眼眶的自己，大概不会相信有这一天吧。\n\n但你真的走过来了。\n\n不是一路顺风地走过来，是摔倒了、趴了很久、然后咬着牙站起来——\n\n一步一步，走过来的。' },
  E4: { id: 'E4', type: 'normal', name: '职场白菜', icon: '🥬',
    desc: '你挂了电话，盯着天花板看了很久。\n\noffer拿到了，但数字比你在牛客上看到的所有面经都低。你妈打来电话问“怎么样”，你说“挺好的”。\n\n挂了电话之后你才想起来，你还没告诉她薪资是多少。\n\n但你不想说了。\n\n你把手机放在桌上，翻出计算器算了一下：交完房租、水电、交通、吃饭——每个月大概还能存下几百块。\n\n你把计算器关了。\n\n打开招聘网站，想看看还有没有别的——然后你意识到，你已经没有精力再面一轮了。\n\n你点了接受。\n\n这不是最好的结果。但至少，这是一个结果。' },
  E5: { id: 'E5', type: 'normal', name: '塞翁失马', icon: '🌅',
    desc: '新公司楼下有一家兰州拉面，老板是个东北人，每次去都多加一勺牛肉。\n\n你每天准时六点下班，骑着共享单车回出租屋，路过一棵很大的梧桐树。秋天的时候叶子落满路，你踩着它们走，会发出嘎吱嘎吱的声音。\n\n工资是大厂的一半。但你养了一盆绿萝，看了十二本书，学会了做三道菜。\n\n两年后的某天，你在技术群里看到前同事发了条消息：\n\n“兄弟们，组被裁了，N+1都谈不拢。”\n\n你放下手机，看了看窗外——\n\n梧桐树的叶子又黄了。\n\n你突然很想吃那家兰州拉面。' },
  E6: { id: 'E6', type: 'normal', name: '我怀念的', icon: '🌙',
    desc: '顺利转正后回到学校，你发现一切都变了。\n\n曾经是社长的你已不认识几个社员，宿舍的床位积满了灰。\n\n你和决定读博的最好朋友约了顿烧烤，几杯啤酒下肚，你们聊起这段时间的生活。\n\n你们并不完全理解对方的辛酸，只是桌子上的空瓶越来越多...' },
  E7: { id: 'E7', type: 'normal', name: '平平淡淡', icon: '☁️',
    desc: '三个月后你离职的那天，工位上什么都没留下。\n\n一个马克杯是公司的，笔记本还给了IT，工牌在HR手里。你穿着来的时候那件衬衫，拎着一个什么都没装的背包走出了大门。\n\n保安看了你一眼，大概已经不记得你是哪天进来的了。\n\n转正offer拿到了。不好也不坏。\n\n简历上多了三行字，GitHub上多了几个commit，朋友圈里多了一张工牌的照片——你犹豫了半天才发的，最后设成了“仅三天可见”。\n\n后来你偶尔会梦到那个工位。梦到mentor中午叫你吃饭，梦到周五下午的茶歇，梦到那个总是比你晚走的同事——他好像永远都在加班。\n\n醒来之后你会想：那段日子，到底算是什么呢？\n\n大概就是青春里最普通的一页。\n\n翻过去了，但还记得。' },
  E8: { id: 'E8', type: 'bad', name: '真心错付', icon: '💔',
    desc: '你在招聘网站的搜索栏里敲下“后端开发”，然后看着结果列表一点一点往下划。\n\n“已截止”“已截止”“已截止”……\n\n你划了很久，终于看到一个还行的。点进去一看——薪资范围的上限，是你在大厂实习时的月薪。\n\n你关掉网页，躺在床上盯着天花板。\n\n这三个月你为了留用，拒绝了所有其他公司的面试邀请。你把所有赌注押在一个承诺上，而那个承诺最终变成了一句“今年hc确实太少了”。\n\n你打开手机相册，翻到实习第一天的自拍——那天你笑得像个傻子，工牌举得比脸还高。\n\n你把那张照片删了。\n\n然后又从“最近删除”里把它恢复了。\n\n你买了一张去云南的机票。不是旅行，是逃。\n\n但你也不在乎了。' },
  E9: { id: 'E9', type: 'bad', name: '精神内耗', icon: '🌀',
    desc: '你发现自己已经很久没有完整地看完一部电影了。\n\n打开B站，划了十分钟，关掉。打开微信，翻了翻聊天记录，没有人找你。打开招聘网站，看了看岗位要求，关掉。\n\n凌晨三点，你躺在床上，手机屏幕的光照在天花板上。你数羊数到第三百只的时候，突然想起今天组会上mentor说的那句话——你不确定他是在夸你还是在说你不行。\n\n你把那句话在脑子里翻来覆去地嚼，嚼到失去味道，嚼到开始变苦。\n\n你什么时候变成这样的？\n\n大一时那个翘课去爬山、考试前一晚才开始复习、但还是笑得很开心的你，去哪儿了？\n\n你翻了个身。手机显示凌晨3:47。\n\n闹钟定在7:30。\n\n你闭上眼睛，但脑子还在转。' },
  E10: { id: 'E10', type: 'bad', name: '办公室政治', icon: '🎭',
    desc: '离职的那天下午，你一个人收拾工位。\n\n东西其实不多——一个杯子，一副耳机，一本写了一半的笔记。你把笔记翻了翻，里面记着mentor教你的东西，记着项目会议的要点，记着你第一天写下的“要加油”。\n\n你把笔记本扔进了垃圾桶。\n\n走到电梯口的时候，你回头看了一眼办公区。灯还亮着，人们还在敲键盘。没有人抬头看你。\n\n三个月前你走进这扇门的时候，觉得这里是全世界。\n\n现在你走出去了，才发现——\n\n它只是一栋楼而已。\n\n你在地铁上发了条朋友圈：“江湖路远，各自珍重。”\n\n然后设成了“仅自己可见”。' },
  E11: { id: 'E11', type: 'bad', name: '提桶跑路', icon: '🏃',
    desc: '辞职信发出去的那一刻，你感觉手指有点抖。\n\n不是害怕，是一种奇怪的解脱。像背了很久很久的书包，终于放下来了——虽然你还不确定放下之后手该往哪放。\n\n你收拾了工位上的东西。一个杯子，一本笔记本，一张合照。合照上大家都比着耶，你笑得很用力。\n\n走出公司大门的时候，你回头看了一眼。\n\n保安大叔正在换班，前台小姐姐在低头看手机。一切照常运转。\n\n没有人在意一个实习生的离开。\n\n你站在路边，阳光很刺眼。打开地图看了看——\n\n大理。洱海。苍山。\n\n你买了一张机票。\n\n至于回来之后怎么办……\n\n你笑了笑。\n\n“以后再说吧。”' },
  E12: { id: 'E12', type: 'hidden', name: '赛博觉醒', icon: '💡',
    desc: '那天深夜，你在GitHub的仓库里写下了最后一行代码。\n\nREADME的最后一行是：“献给每一个在凌晨还在看招聘网站的应届生。你的每一个选择，都值得被认真对待。”\n\n你把链接发到了朋友圈。然后关掉电脑，睡觉。\n\n第二天醒来，消息栏99+。\n\n有人说：“这不就是我的故事吗。”有人说：“我玩了三遍，每次结局都不一样。”有人说：“选读博那条线，你是不是偷偷加了一个彩蛋？”\n\n你看着评论区，突然觉得这三个月——\n\n那些加班的深夜，那些被review打回的代码，那些在工位上偷偷红了眼眶的瞬间——\n\n都没有白费。\n\n它们变成了别人的故事，变成了深夜屏幕前某个陌生人会心一笑的瞬间。\n\n你打开代码编辑器，新建了一个文件。\n\n文件名：next_game.md' },
};

// 节点图片映射 — 每个节点对应的插画
const NODE_IMAGES = {
  // 第一幕: 起点
  start: 'scene_dorm', mass_apply: 'scene_dorm',
  chill_start: 'scene_dorm_alone',
  referral: 'scene_phone_call', parent_help: 'scene_phone_call',
  // 面试
  interview_big: 'scene_interview', interview_multi: 'scene_interview',
  interview_mid: 'scene_interview',
  interview_mid_late: 'scene_panic',
  interview_referral2: 'scene_interview',
  // 拿到offer
  pass_big: 'scene_celebration',
  pass_big_lucky: 'scene_lucky_pass',
  choose_big: 'scene_big_company', choose_mid: 'scene_wlb',
  choose_startup: 'scene_startup',
  // 入职
  day1_core: 'scene_big_company', day1_wlb: 'scene_wlb',
  day1_innovate: 'scene_office_work', day1_startup: 'scene_startup',
  edge_project: 'scene_office_work', wait_better: 'scene_stress',
  // 社交
  social_active: 'scene_lunch',
  social_quiet: 'scene_eat_alone',
  talk_mentor: 'scene_coffee', ask_help: 'scene_coffee',
  seek_help_leader: 'scene_lunch', repair_relation: 'scene_lunch',
  defense_insider: 'scene_coffee',
  // 工作
  work_diligent: 'scene_office_work', work_core_task: 'scene_office_work',
  work_balance: 'scene_wlb',
  work_slack: 'scene_slack',
  keep_pace: 'scene_office_work', find_help_outside: 'scene_office_work',
  confess_outside: 'scene_office_work', hide_outside: 'scene_office_work',
  comeback_after_rest: 'scene_office_work',
  // 加班/卷
  work_ambitious: 'scene_late_night', compete_hard: 'scene_late_night',
  push_hard: 'scene_late_night', consider_quit: 'scene_late_night',
  autumn_recruit: 'scene_late_night',
  // 压力
  burnout_risk: 'scene_burnout', self_doubt: 'scene_burnout',
  push_through: 'scene_stress', suffer_alone: 'scene_stress',
  last_minute_rush: 'scene_stress', late_anxiety: 'scene_burnout',
  forced_rest: 'scene_hospital',
  // 休息/反思
  take_rest: 'scene_park', reflect_life: 'scene_sunset_walk', adjust_pace: 'scene_wlb',
  // 冲突
  take_chance: 'scene_conflict', politics_conflict: 'scene_conflict',
  // 朋友
  talk_friend: 'scene_bbq',
  // 答辩
  prepare_defense: 'scene_defense', defense_perfect: 'scene_defense',
  defense_honest: 'scene_honest_defense', last_chance: 'scene_meeting',
  // 结局
  ending_ssp: 'scene_celebration', ending_good: 'scene_celebration',
  ending_underdog: 'scene_politics_win',
  ending_normal_offer: 'scene_sunset',
  ending_chill: 'scene_beach',
  ending_other_company: 'scene_sunset',
  ending_balance: 'scene_sunset_walk',
  ending_quit: 'scene_resign',
  ending_regret: 'scene_beach',
  ending_awakening: 'scene_game_dev',
  ending_politics: 'scene_politics_win'
};
