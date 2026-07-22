/* ============================================
   大厂实习生存指南 - UI 模块
   ============================================ */

const UI = {
  typewriterTimer: null,
  typewriterResolve: null,
  isTyping: false,
  currentText: '',
  currentCharIndex: 0,
  storyTextEl: null,
  skipHintEl: null,

  init() {
    this.storyTextEl = document.getElementById('story-text');
    this.skipHintEl = document.getElementById('skip-hint');

    // 键盘监听: 空格跳过打字
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && this.isTyping) {
        e.preventDefault();
        this.skipTypewriter();
      }
    });

    // 点击游戏画面任意位置跳过打字
    const gameScreen = document.getElementById('game-screen');
    gameScreen.addEventListener('click', (e) => {
      // 如果点击的是选项按钮，不触发跳过
      if (e.target.closest('.choice-btn') || e.target.closest('.pixel-btn-small')) return;
      if (this.isTyping) {
        e.stopPropagation();
        this.skipTypewriter();
      }
    });
  },

  // --- 场景切换 ---
  switchScreen(fromId, toId) {
    return new Promise(resolve => {
      const from = document.getElementById(fromId);
      const to = document.getElementById(toId);
      const overlay = document.getElementById('transition-overlay');

      overlay.classList.add('active');
      setTimeout(() => {
        if (from) from.classList.remove('active');
        if (to) to.classList.add('active');
        setTimeout(() => {
          overlay.classList.remove('active');
          resolve();
        }, 300);
      }, 300);
    });
  },

  // --- 打字机效果 ---
  typewriter(text, element) {
    return new Promise(resolve => {
      this.typewriterResolve = resolve;
      this.isTyping = true;
      this.currentText = text;
      this.currentCharIndex = 0;
      this.storyTextEl = element || this.storyTextEl;

      element.classList.remove('done');
      element.innerHTML = '';
      this.skipHintEl.classList.remove('hidden');

      this.typewriterTimer = setInterval(() => {
        if (this.currentCharIndex < this.currentText.length) {
          this.appendChar(element);
          this.currentCharIndex++;
        } else {
          this.finishTypewriter(element);
        }
      }, 35);
    });
  },

  appendChar(element) {
    const char = this.currentText[this.currentCharIndex];
    if (char === '\n') {
      element.innerHTML += '<br>';
    } else if (char === '<') {
      // 处理 HTML 标签
      const closeIndex = this.currentText.indexOf('>', this.currentCharIndex);
      if (closeIndex !== -1) {
        const tag = this.currentText.substring(this.currentCharIndex, closeIndex + 1);
        element.innerHTML += tag;
        this.currentCharIndex = closeIndex;
      }
    } else {
      // 在最后一个文本节点后追加
      element.innerHTML += char;
    }
  },

  skipTypewriter() {
    if (!this.isTyping) return;
    clearInterval(this.typewriterTimer);
    // 直接显示完整文本
    this.storyTextEl.innerHTML = this.formatText(this.currentText);
    this.finishTypewriter(this.storyTextEl);
  },

  finishTypewriter(element) {
    clearInterval(this.typewriterTimer);
    this.isTyping = false;
    element.classList.add('done');
    this.skipHintEl.classList.add('hidden');
    if (this.typewriterResolve) {
      this.typewriterResolve();
      this.typewriterResolve = null;
    }
  },

  formatText(text) {
    return text.replace(/\n/g, '<br>');
  },

  // --- 渲染选项 ---
  renderChoices(choices, stats, onChoose) {
    const area = document.getElementById('choices-area');
    area.innerHTML = '';

    choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';

      // 检查条件
      let locked = false;
      if (choice.condition) {
        const statVal = stats[choice.condition.stat] || 0;
        if (statVal < choice.condition.min) {
          locked = true;
          btn.classList.add('locked');
        }
      }

      let html = choice.text;
      if (choice.hint) {
        html += `<span class="choice-hint">${choice.hint}</span>`;
      }
      if (locked && choice.condition) {
        const statNames = { ability: '能力', connection: '人脉', mental: '心态', energy: '体力' };
        html += `<span class="choice-hint">需要${statNames[choice.condition.stat]}≥${choice.condition.min}</span>`;
      }
      btn.innerHTML = html;

      if (!locked) {
        btn.addEventListener('click', () => {
          area.innerHTML = '';
          onChoose(index);
        });
      }

      area.appendChild(btn);

      // 逐个出现的动画
      btn.style.opacity = '0';
      btn.style.transform = 'translateX(-20px)';
      setTimeout(() => {
        btn.style.transition = 'all 0.3s ease';
        btn.style.opacity = '1';
        btn.style.transform = 'translateX(0)';
      }, 150 * index);
    });
  },

  // --- 更新属性面板 ---
  updateStats(stats) {
    const bars = {
      ability: { el: document.getElementById('stat-ability'), valEl: document.getElementById('val-ability') },
      connection: { el: document.getElementById('stat-connection'), valEl: document.getElementById('val-connection') },
      mental: { el: document.getElementById('stat-mental'), valEl: document.getElementById('val-mental') },
      energy: { el: document.getElementById('stat-energy'), valEl: document.getElementById('val-energy') }
    };

    Object.entries(bars).forEach(([key, bar]) => {
      const val = Math.max(0, Math.min(100, stats[key] || 50));
      bar.el.style.width = val + '%';
      bar.valEl.textContent = val;

      // 颜色变化
      if (val > 60) bar.el.style.background = 'var(--accent-green)';
      else if (val > 30) bar.el.style.background = 'var(--accent-orange)';
      else bar.el.style.background = 'var(--accent-red)';
    });
  },

  // --- 属性变化动画 ---
  showStatChange(stat, change) {
    if (!change || change === 0) return;
    const valEl = document.getElementById('val-' + stat);
    if (!valEl) return;

    const floater = document.createElement('span');
    floater.className = 'stat-change ' + (change > 0 ? 'positive' : 'negative');
    floater.textContent = (change > 0 ? '+' : '') + change;
    floater.style.position = 'absolute';

    const rect = valEl.getBoundingClientRect();
    floater.style.left = rect.left + 'px';
    floater.style.top = (rect.top - 5) + 'px';
    document.body.appendChild(floater);

    setTimeout(() => floater.remove(), 1500);
  },

  // --- 渲染场景图片 ---
  renderScene(nodeId) {
    const el = document.getElementById('scene-image');
    el.innerHTML = '';

    // 通过 NODE_IMAGES 映射获取图片
    const imageKey = (typeof NODE_IMAGES !== 'undefined') ? NODE_IMAGES[nodeId] : null;
    if (!imageKey) {
      el.style.display = 'none';
      return;
    }

    el.style.display = 'flex';
    const img = document.createElement('img');
    img.src = `assets/pixel-art/${imageKey}.png`;
    img.alt = '';
    img.className = 'scene-img';
    img.loading = 'eager';

    // 图片加载动画
    img.style.opacity = '0';
    img.onload = () => {
      setTimeout(() => { img.style.opacity = '1'; }, 50);
    };

    el.appendChild(img);
  },

  // --- 渲染结局卡片 ---
  renderEnding(endingData) {
    const typeMap = { good: '好结局', normal: '普通结局', bad: '坏结局', hidden: '??? 结局' };
    const typeClass = endingData.type === 'hidden' ? 'hidden-ending' : endingData.type;

    document.getElementById('ending-type').className = 'ending-type ' + typeClass;
    document.getElementById('ending-type').textContent = typeMap[endingData.type] || '结局';

    // ASCII 插画
    const illustEl = document.getElementById('ending-illust');
    const illustrations = {
      good: `
  ╔═══════════════╗
  ║   ★  ✦  ★    ║
  ║  ╔═══════╗    ║
  ║  ║ \\(^o^)/ ║    ║
  ║  ╚═══════╝    ║
  ║    🌟🌟🌟     ║
  ╚═══════════════╝`,
      normal: `
  ╔═══════════════╗
  ║   ·  ·  ·    ║
  ║  ╔═══════╗    ║
  ║  ║ (-_-) ║    ║
  ║  ╚═══════╝    ║
  ║    ······      ║
  ╚═══════════════╝`,
      bad: `
  ╔═══════════════╗
  ║   ×  ·  ×    ║
  ║  ╔═══════╗    ║
  ║  ║ (T_T) ║    ║
  ║  ╚═══════╝    ║
  ║    💧💧💧      ║
  ╚═══════════════╝`,
      hidden: `
  ╔═══════════════╗
  ║  ?  ✦  ?     ║
  ║  ╔═══════╗    ║
  ║  ║ (◕‿◕) ║    ║
  ║  ╚═══════╝    ║
  ║    💡💡💡      ║
  ╚═══════════════╝`
    };
    illustEl.innerHTML = illustrations[endingData.type] || '';

    document.getElementById('ending-title').textContent = endingData.name;
    document.getElementById('ending-text').innerHTML = endingData.desc.replace(/\n/g, '<br>');
    document.getElementById('ending-achievement').textContent = `*达成成就: ${endingData.name}`;
  },

  // --- 渲染结局收集册 ---
  renderGallery(unlockedEndings) {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = '';

    const total = Object.keys(ENDINGS).length;
    const unlocked = Object.keys(unlockedEndings).length;
    document.getElementById('gallery-count').textContent = `已解锁: ${unlocked} / ${total}`;

    Object.entries(ENDINGS).forEach(([id, ending]) => {
      const isUnlocked = unlockedEndings[id];
      const item = document.createElement('div');
      item.className = 'gallery-item' + (isUnlocked ? '' : ' locked');

      item.innerHTML = `
        <div class="gallery-icon">${isUnlocked ? ending.icon : '❓'}</div>
        <div class="gallery-name">${isUnlocked ? ending.name : '???'}</div>
        <div class="gallery-type">${isUnlocked ? ({ good: '好结局', normal: '普通结局', bad: '坏结局', hidden: '隐藏结局' }[ending.type]) : '未解锁'}</div>
      `;

      // 已解锁的结局可以点击查看详情
      if (isUnlocked) {
        item.addEventListener('click', () => {
          if (typeof Game !== 'undefined' && Game.showEndingDetail) {
            Game.showEndingDetail(id);
          }
        });
      }

      grid.appendChild(item);
    });
  },

  // --- 菜单控制 ---
  showMenu() {
    document.getElementById('menu-modal').classList.add('active');
  },

  hideMenu() {
    document.getElementById('menu-modal').classList.remove('active');
  }
};
