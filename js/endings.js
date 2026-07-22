/* ============================================
   大厂实习生存指南 - 结局收集系统
   ============================================ */

const EndingSystem = {
  STORAGE_KEY: 'bigco_endings',

  // 获取所有已解锁结局
  getUnlocked() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  },

  // 解锁结局
  unlock(endingId) {
    const unlocked = this.getUnlocked();
    if (!unlocked[endingId]) {
      unlocked[endingId] = { time: Date.now() };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(unlocked));
      return true; // 新解锁
    }
    return false; // 已解锁过
  },

  // 检查是否已解锁
  isUnlocked(endingId) {
    return !!this.getUnlocked()[endingId];
  },

  // 获取解锁数量
  getCount() {
    return Object.keys(this.getUnlocked()).length;
  },

  // 获取总数
  getTotal() {
    return Object.keys(ENDINGS).length;
  },

  // 重置所有结局
  reset() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
};
