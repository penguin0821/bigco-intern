/* ============================================
   大厂实习生存指南 - 游戏引擎
   ============================================ */

const Game = {
  SAVE_KEY: 'bigco_save',
  currentNode: null,
  stats: { ability: 50, connection: 50, mental: 50, energy: 50 },
  history: [],
  flags: {},
  stateHistory: [], // 每个节点的完整状态快照，用于回溯

  // --- 初始化 ---
  init() {
    UI.init();
    // 检查是否有存档
    if (this.hasSave()) {
      document.getElementById('btn-continue').style.display = 'block';
    }
  },

  // --- 新游戏 ---
  async startNew() {
    UI.hideMenu();
    this.closeRewind();
    this.stats = { ability: 50, connection: 50, mental: 50, energy: 50 };
    this.history = [];
    this.flags = {};
    this.stateHistory = [];

    await UI.switchScreen(this.getCurrentScreen(), 'game-screen');
    UI.updateStats(this.stats);
    this.goToNode('start');
  },

  // --- 前往节点 ---
  async goToNode(nodeId) {
    const node = STORY_DATA[nodeId];
    if (!node) {
      console.error('Node not found:', nodeId);
      return;
    }

    this.currentNode = node;
    this.history.push(nodeId);

    // 保存当前状态快照（用于回溯）
    this.stateHistory.push({
      nodeId: nodeId,
      stats: { ...this.stats },
      flags: { ...this.flags },
      historyLength: this.history.length
    });

    // 渲染场景图
    UI.renderScene(nodeId);

    // 清空选项
    document.getElementById('choices-area').innerHTML = '';

    // 打字机渲染文本
    const storyEl = document.getElementById('story-text');
    await UI.typewriter(node.text, storyEl);

    // 检查是否是结局节点
    if (node.ending) {
      // 不自动跳转，显示“继续”按钮让用户主动点击
      UI.renderChoices(
        [{ text: '继续...', next: '__ending__' }],
        this.stats,
        () => this.triggerEnding(node.ending)
      );
      return;
    }

    // 渲染选项
    if (node.choices && node.choices.length > 0) {
      UI.renderChoices(node.choices, this.stats, (index) => {
        this.makeChoice(index);
      });
    }

    // 自动存档
    this.autoSave();
  },

  // --- 做出选择 ---
  makeChoice(index) {
    const choice = this.currentNode.choices[index];
    if (!choice) return;

    // 应用属性变化
    if (choice.effects) {
      Object.entries(choice.effects).forEach(([stat, change]) => {
        if (this.stats[stat] !== undefined) {
          const oldVal = this.stats[stat];
          this.stats[stat] = Math.max(0, Math.min(100, oldVal + change));
          UI.showStatChange(stat, change);
        }
      });
      UI.updateStats(this.stats);
    }

    // 检查是否触发特殊结局（基于属性）
    if (this.stats.mental <= 10 && !this.flags.mental_warning) {
      this.flags.mental_warning = true;
      // 心态过低可能触发坏结局
    }

    // 跳转到下一节点
    this.goToNode(choice.next);
  },

  // --- 触发结局 ---
  async triggerEnding(endingId) {
    const ending = ENDINGS[endingId];
    if (!ending) return;

    // 解锁结局
    const isNew = EndingSystem.unlock(endingId);

    // 检查是否有条件触发的特殊结局
    if (this.stats.mental <= 15 && endingId === 'E11') {
      // 心态低时触发精神内耗结局
      const burnoutEnding = ENDINGS['E9'];
      if (burnoutEnding) {
        EndingSystem.unlock('E9');
        await UI.switchScreen('game-screen', 'ending-screen');
        UI.renderEnding(burnoutEnding);
        return;
      }
    }

    // E4（职场白菜）能力值过低时变为 E7（平平淡淡）
    if (endingId === 'E4' && this.stats.ability < 55) {
      const mediocreEnding = ENDINGS['E7'];
      if (mediocreEnding) {
        EndingSystem.unlock('E7');
        await UI.switchScreen('game-screen', 'ending-screen');
        UI.renderEnding(mediocreEnding);
        return;
      }
    }

    // 切换到结局画面
    await UI.switchScreen('game-screen', 'ending-screen');
    UI.renderEnding(ending);

    // 清除自动存档
    localStorage.removeItem(this.SAVE_KEY);
  },

  // --- 显示结局收集 ---
  async showEndings() {
    UI.hideMenu();
    const fromScreen = this.getCurrentScreen();
    UI.renderGallery(EndingSystem.getUnlocked());
    await UI.switchScreen(fromScreen, 'endings-gallery');
  },

  // --- 返回标题 ---
  async backToTitle() {
    UI.hideMenu();
    const fromScreen = this.getCurrentScreen();
    if (this.hasSave()) {
      document.getElementById('btn-continue').style.display = 'block';
    }
    await UI.switchScreen(fromScreen, 'title-screen');
  },

  // --- 恢复游戏 ---
  async resumeGame() {
    UI.hideMenu();
  },

  // --- 保存游戏 ---
  saveGame() {
    if (!this.currentNode) return;
    const saveData = {
      nodeId: this.currentNode.id,
      stats: { ...this.stats },
      history: [...this.history],
      flags: { ...this.flags },
      timestamp: Date.now()
    };
    localStorage.setItem(this.SAVE_KEY, JSON.stringify(saveData));
    UI.hideMenu();
    alert('💾 存档成功！');
  },

  // --- 读取存档 ---
  async loadGame() {
    UI.hideMenu();
    const saveData = this.getSave();
    if (!saveData) {
      alert('没有找到存档。');
      return;
    }

    this.stats = saveData.stats;
    this.history = saveData.history || [];
    this.flags = saveData.flags || {};
    this.stateHistory = saveData.stateHistory || [];

    await UI.switchScreen(this.getCurrentScreen(), 'game-screen');
    UI.updateStats(this.stats);
    this.goToNode(saveData.nodeId);
  },

  // --- 自动存档 ---
  autoSave() {
    if (!this.currentNode) return;
    const saveData = {
      nodeId: this.currentNode.id,
      stats: { ...this.stats },
      history: [...this.history],
      flags: { ...this.flags },
      stateHistory: this.stateHistory.map(s => ({ ...s, stats: { ...s.stats }, flags: { ...s.flags } })),
      timestamp: Date.now()
    };
    localStorage.setItem(this.SAVE_KEY, JSON.stringify(saveData));
  },

  // --- 获取存档 ---
  getSave() {
    try {
      return JSON.parse(localStorage.getItem(this.SAVE_KEY));
    } catch {
      return null;
    }
  },

  // --- 是否有存档 ---
  hasSave() {
    return !!this.getSave();
  },

  // --- 菜单控制 ---
  showMenu() {
    UI.showMenu();
  },

  // === 回溯系统 ===

  // 显示回溯面板
  showRewind() {
    const panel = document.getElementById('rewind-panel');
    const backdrop = document.getElementById('rewind-backdrop');
    const list = document.getElementById('rewind-list');

    list.innerHTML = '';

    // 从后往前渲染历史记录（最新的在上面）
    this.stateHistory.forEach((snapshot, index) => {
      const node = STORY_DATA[snapshot.nodeId];
      if (!node) return;

      const isCurrent = (index === this.stateHistory.length - 1);

      // 创建历史项
      const item = document.createElement('div');
      item.className = 'rewind-item' + (isCurrent ? ' current' : '');

      // 提取简短文字预览（去掉 HTML 标签，截取前 30 个字符）
      const plainText = node.text.replace(/<[^>]+>/g, '').replace(/\n/g, ' ').trim();
      const preview = plainText.length > 35 ? plainText.substring(0, 35) + '...' : plainText;

      item.innerHTML = `
        <div class="rewind-item-step">第 ${index + 1} 步</div>
        <div class="rewind-item-text">${preview}</div>
        <div class="rewind-item-stats">
          <span>⚡${snapshot.stats.ability}</span>
          <span>🤝${snapshot.stats.connection}</span>
          <span>💚${snapshot.stats.mental}</span>
          <span>❤️${snapshot.stats.energy}</span>
        </div>
      `;

      if (!isCurrent) {
        item.addEventListener('click', () => this.rewindTo(index));
      }

      list.appendChild(item);

      // 添加连接线（除了最后一个）
      if (index < this.stateHistory.length - 1) {
        const connector = document.createElement('div');
        connector.className = 'rewind-connector';
        list.appendChild(connector);
      }
    });

    // 滚动到顶部（最新的在上面）
    list.scrollTop = 0;

    panel.classList.add('open');
    backdrop.classList.add('active');
  },

  // 关闭回溯面板
  closeRewind() {
    document.getElementById('rewind-panel').classList.remove('open');
    document.getElementById('rewind-backdrop').classList.remove('active');
  },

  // 从结局画面回溯
  async rewindFromEnding() {
    // 切回游戏画面
    await UI.switchScreen('ending-screen', 'game-screen');
    UI.updateStats(this.stats);
    // 显示回溯面板
    this.showRewind();
  },

  // 回溯到指定节点
  async rewindTo(historyIndex) {
    const snapshot = this.stateHistory[historyIndex];
    if (!snapshot) return;

    // 关闭面板
    this.closeRewind();

    // 恢复状态
    this.stats = { ...snapshot.stats };
    this.flags = { ...snapshot.flags };

    // 截断历史到回溯点
    this.history = this.history.slice(0, historyIndex);
    this.stateHistory = this.stateHistory.slice(0, historyIndex);

    // 更新 UI
    UI.updateStats(this.stats);

    // 跳过打字机动画，直接显示
    if (UI.isTyping) {
      UI.skipTypewriter();
    }

    // 重新进入该节点
    await this.goToNode(snapshot.nodeId);
  },

  // --- 获取当前画面 ---
  getCurrentScreen() {
    const screens = document.querySelectorAll('.screen');
    for (const screen of screens) {
      if (screen.classList.contains('active')) {
        return screen.id;
      }
    }
    return 'title-screen';
  },

  // === 结局详情弹窗 ===

  showEndingDetail(endingId) {
    const ending = ENDINGS[endingId];
    if (!ending) return;

    const modal = document.getElementById('ending-detail-modal');
    const typeMap = { good: '好结局', normal: '普通结局', bad: '坏结局', hidden: '??? 结局' };
    const typeClass = ending.type === 'hidden' ? 'hidden-ending' : ending.type;

    // 设置类型
    const typeEl = document.getElementById('ending-detail-type');
    typeEl.className = 'ending-detail-type ' + typeClass;
    typeEl.textContent = typeMap[ending.type] || '结局';

    // 设置图片
    const imageEl = document.getElementById('ending-detail-image');
    // 查找该结局对应的图片
    const imageKey = (typeof NODE_IMAGES !== 'undefined') ?
      Object.entries(NODE_IMAGES).find(([nodeId, img]) => {
        const node = STORY_DATA[nodeId];
        return node && node.ending === endingId;
      })?.[1] : null;

    if (imageKey) {
      imageEl.innerHTML = `<img src="assets/pixel-art/${imageKey}.png" alt="${ending.name}">`;
    } else {
      imageEl.innerHTML = '';
    }

    // 设置标题、文字、成就
    document.getElementById('ending-detail-title').textContent = ending.name;
    document.getElementById('ending-detail-text').innerHTML = ending.desc.replace(/\n/g, '<br>');
    document.getElementById('ending-detail-achievement').textContent = `*达成成就: ${ending.name}`;

    // 显示弹窗
    modal.classList.add('active');
  },

  closeEndingDetail() {
    document.getElementById('ending-detail-modal').classList.remove('active');
  },

  // === 游戏手册 ===

  showGuideWarning() {
    document.getElementById('spoiler-modal').classList.add('active');
  },

  closeSpoiler() {
    document.getElementById('spoiler-modal').classList.remove('active');
  },

  confirmGuide() {
    document.getElementById('spoiler-modal').classList.remove('active');
    document.getElementById('title-screen').classList.remove('active');
    document.getElementById('guide-screen').classList.add('active');
    this.renderGuide();
  },

  renderGuide() {
    const guides = [
      {
        id: 'E1', icon: '🌟', name: '天道酬勤', type: '好结局',
        path: [
          '① 选择「海投简历」或「找学长内推」',
          '② 选择「全力准备星链科技的面试」',
          '③ 选择「展示你的项目经历和技术热情」',
          '④ 选择「搜索推荐组 — 核心业务才是硬道理」',
          '⑤ 选择「主动社交，记住每个人的名字和负责的业务」',
          '⑥ 选择「接受核心模块的开发任务」',
          '⑦ 选择「坦诚说遇到困难，请求指导」',
          '⑧ 选择「找mentor聊聊，了解转正标准」',
          '⑨ 选择「加大投入，和小李竞争」或「保持自己的节奏」',
          '⑩ 选择「精心准备PPT，反复排练到凌晨」',
          '⑪ 选择「用你准备的内容完美回答」',
        ],
        tip: '关键：最后一步需要能力值≥65，前面的选择要多选加能力的选项'
      },
      {
        id: 'E2', icon: '🧭', name: '人间清醒', type: '好结局',
        path: [
          '① 选择「佛系等待 — 是金子总会发光」',
          '② 选择「算了吧，考研/考公也是一条路」',
        ],
        tip: '最短路线，只需2步。也可以①佛系等待→②让爸妈帮忙找找关系→③去国企实习'
      },
      {
        id: 'E3', icon: '🦋', name: '破茧成蝶', type: '好结局',
        path: [
          '① 选择「海投简历」',
          '② 选择「先去云帆数据面试，感觉更稳」',
          '③ 任意选择一个方向',
          '④ 选择「摸鱼为主，抽空刷题准备秋招」',
          '⑤ 选择「赶紧补救，疯狂赶进度」',
          '⑥ 选择「再争取一下，找leader谈」',
          '⑦ 选择「赌一把！」',
        ],
        tip: '需要先走“不顺利”的路线（摸鱼+补救失败），然后抓住最后的机会'
      },
      {
        id: 'E4', icon: '🥬', name: '职场白菜', type: '普通结局',
        path: [
          '① 任意路径进入星链科技实习',
          '② 保持中等表现，进入转正答辩',
          '③ 选择「只展示实际工作成果，不夸大」',
          '④ 选择「等待结果」',
        ],
        tip: '注意：能力值必须≥55才能拿到E4，否则会变为E7。也可以从“精心准备PPT→坦诚说还需要学习”达成'
      },
      {
        id: 'E5', icon: '🌅', name: '塞翁失马', type: '普通结局',
        path: [
          '路线A（最简单）：',
          '① 选择「海投简历」',
          '② 选择「先去云帆数据面试」',
          '③ 任意选择方向进入公司',
          '④ 选择「继续现在的节奏，转正的事顺其自然」',
          '——',
          '路线B：',
          '① 进入星链科技实习',
          '② 选择「但还是不敢放松，两手准备」',
          '③ 选择「接受二线公司offer，放弃这边」',
        ],
        tip: '路线A最快只需4步；核心是不追求大厂光环'
      },
      {
        id: 'E6', icon: '🌙', name: '我怀念的', type: '普通结局',
        path: [
          '① 任意路径进入星链科技实习',
          '② 保持良好表现进入转正答辩',
          '③ 选择「精心准备PPT，反复排练到凌晨」',
          '④ 选择「用实习中的真实案例来佐证」',
        ],
        tip: '和E1的区别：最后一步选“真实案例”而不是“完美回答”'
      },
      {
        id: 'E7', icon: '☁️', name: '平平淡淡', type: '普通结局',
        path: [
          '① 任意路径进入实习',
          '② 尽量少做加能力值的选择（保持低能力值）',
          '③ 答辩时选择「只展示实际工作成果，不夸大」',
          '④ 能力值<55 → 自动触发E7',
        ],
        tip: '本质是E4的“失败版”：同样走诚实答辩，但能力不够就会变成平淡结局'
      },
      {
        id: 'E8', icon: '💔', name: '真心错付', type: '坏结局',
        path: [
          '路线A：',
          '① 任意路径进入实习',
          '② 选择「摸鱼为主，抽空刷题准备秋招」',
          '③ 选择「赶紧补救，疯狂赶进度」',
          '④ 选择「接受现实，开始投秋招」',
          '——',
          '路线B：',
          '① 进入实习并拼命工作',
          '② 选择「但还是不敢放松，两手准备」',
          '③ 选择「放弃秋招，全力准备转正答辩」',
          '④ 答辩不理想后选「再争取一下，找leader谈」',
          '⑤ 选择「算了，别为难人家了」',
        ],
        tip: '核心是“为留用错过秋招”，最终竹篮打水一场空'
      },
      {
        id: 'E9', icon: '🌀', name: '精神内耗', type: '坏结局',
        path: [
          '① 进入星链科技实习',
          '② 选择「加大投入，和小李竞争」(-心态15)',
          '③ 选择「心灰意冷，考虑辞职」(-心态15)',
          '④ 选择「提交辞职信」(→触发E11)',
          '⑤ 此时心态值≤15，自动变为E9',
        ],
        tip: 'E9不能直接触发，必须先把心态值降到≤15，然后触发E11（提桶跑路）时会被替换为E9'
      },
      {
        id: 'E10', icon: '🎭', name: '办公室政治', type: '坏结局',
        path: [
          '① 进入星链科技，选搜索推荐组',
          '② 选择「主动社交」或「安静吃饭」均可',
          '③ 选择「保持自己的节奏，做好份内的事」',
          '④ 选择「趁小李状态不好，争取更多任务」',
          '⑤ 选择「不管了，结果说话」',
          '⑥ 选择「据理力争，拿出你的工作成果」',
        ],
        tip: '必须走“抢任务→不修复关系→强硬对抗”路线，选和解则不会触发'
      },
      {
        id: 'E11', icon: '🏃', name: '提桶跑路', type: '坏结局',
        path: [
          '路线A（最快）：',
          '① 任意路径进入实习',
          '② 选择「摸鱼为主，抽空刷题准备秋招」',
          '③ 选择「无所谓，反正也不想来」',
          '——',
          '路线B：',
          '① 进入实习，和小李竞争到崩溃',
          '② 选择「心灰意冷，考虑辞职」',
          '③ 选择「提交辞职信」',
        ],
        tip: '注意：心态值必须>15，否则会变为E9。路线A最快只需3步'
      },
      {
        id: 'E12', icon: '💡', name: '赛博觉醒', type: '隐藏结局',
        path: [
          '① 进入星链科技实习',
          '② 选择「主动社交」→「主动要求参与一个新功能的提案」',
          '③ 选择「趁热打铁，继续优化」',
          '④ 选择「觉得自己太丢人了，想辞职」',
          '⑤ 选择「也许该认真想想自己到底想要什么」',
        ],
        tip: '必须先卷到崩溃（burnout），然后在反思中选择“找回初心”而不是“继续战斗”'
      },
    ];

    const listEl = document.getElementById('guide-list');
    listEl.innerHTML = '';

    guides.forEach(g => {
      const card = document.createElement('div');
      card.className = 'guide-card';

      const typeColor = g.type === '好结局' ? '#4ade80' : g.type === '坏结局' ? '#f87171' : g.type === '隐藏结局' ? '#b794f4' : '#94a3b8';

      card.innerHTML = `
        <div class="guide-card-header">
          <span class="guide-card-icon">${g.icon}</span>
          <span class="guide-card-name">${g.name}</span>
          <span class="guide-card-type" style="color:${typeColor}">${g.type}</span>
        </div>
        <div class="guide-card-path">
          ${g.path.map(step => `<div class="guide-step">${step}</div>`).join('')}
        </div>
        <div class="guide-card-tip">💡 ${g.tip}</div>
      `;
      listEl.appendChild(card);
    });
  },

  // === 彩蛋 ===

  titleClickCount: 0,
  titleClickTimer: null,

  titleClick() {
    this.titleClickCount++;
    // 重置计时器，1.5秒内需要连续点击
    clearTimeout(this.titleClickTimer);
    this.titleClickTimer = setTimeout(() => { this.titleClickCount = 0; }, 1500);

    if (this.titleClickCount >= 5) {
      this.titleClickCount = 0;
      this.showEasteregg();
    }
  },

  async showEasteregg() {
    await UI.switchScreen('title-screen', 'easteregg-screen');

    const bodyEl = document.getElementById('easteregg-body');
    const footerEl = document.getElementById('easteregg-footer');
    bodyEl.innerHTML = '';
    footerEl.style.display = 'none';

    const paragraphs = [
      '2026年暑假，我和舍友陈旭都在大厂实习。',
      '每天下班回到宿舍，我们会聊很久。聊不适应，聊迷茫，聊那些说不清楚的焦虑。',
      '有时候也会怀念学校。怀念不用打卡的日子，怀念食堂，怀念什么都不用想的时光。',
      '有一天陈旭说：要是能把这些感受做成一个游戏就好了。',
      '我说，行。',
      '于是就有了你现在看到的这些故事。它们不全是真的，但每一种情绪都是真的。',
      '如果你也正在经历类似的夏天——',
      '没关系的，慢慢来。'
    ];

    // 逐段打字显示
    for (let i = 0; i < paragraphs.length; i++) {
      const p = document.createElement('p');
      p.className = 'easteregg-paragraph';
      bodyEl.appendChild(p);
      await this.typeParagraph(paragraphs[i], p);
      // 每段之间停顿一下
      await new Promise(r => setTimeout(r, 600));
      // 自动滚动到底部
      bodyEl.scrollTop = bodyEl.scrollHeight;
    }

    // 显示底部
    footerEl.style.display = 'block';
    footerEl.classList.add('fade-in');
  },

  async typeParagraph(text, el) {
    const chars = text.split('');
    for (let i = 0; i < chars.length; i++) {
      if (chars[i] === '\n') {
        el.innerHTML += '<br>';
      } else {
        el.innerHTML += chars[i];
      }
      await new Promise(r => setTimeout(r, 45));
    }
  },

  async closeEasteregg() {
    await UI.switchScreen('easteregg-screen', 'title-screen');
  }
};

// --- 初始化 ---
document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
