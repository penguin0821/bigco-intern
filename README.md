# 🎮 大厂实习生存指南

> 一款像素复古风互动叙事游戏，带你重温互联网大厂实习的酸甜苦辣。

![Pixel Art Style](https://img.shields.io/badge/style-pixel--retro-ff6b9d)
![Endings](https://img.shields.io/badge/endings-12-blue)
![Platform](https://img.shields.io/badge/platform-web%20%7C%20mobile-green)

## 📖 故事简介

你是一名即将步入大四的计算机科学专业学生。室友刚刚拿到了大厂暑期实习 offer，在群里发了一句：*"兄弟们，我先冲了，秋招见。"*

秋招的号角已经吹响，而你……

**你的每一个选择，都将决定这段实习故事的结局。**

## 🌟 游戏特色

- **12 个不同结局** — 好结局、普通结局、坏结局、隐藏结局，等待你的探索
- **属性系统** — 能力、心态、人脉、精力四维属性，影响你的命运走向
- **时间回溯** — 后悔了？回到过去重新选择
- **结局收集册** — 解锁所有结局，看看平行宇宙中的你
- **像素复古画风** — CRT 扫描线 + Glitch 效果，满满的情怀感
- **32 张原创插画** — 每个场景都有专属配图

## 🕹️ 如何游玩

1. 打开游戏网页（PC / 手机均可）
2. 阅读剧情文本，等待打字动画播放完毕（也可点击/空格跳过）
3. 在选项出现后，点击你心仪的选项
4. 不同选择会导致不同的属性变化和剧情走向
5. 最终解锁属于你的结局

**小提示：** 多周目游玩可以解锁更多结局哦！

## 🚀 在线游玩

👉 [点击这里开始游戏](https://penguin0821.github.io/bigco-intern/)

## 🛠️ 本地运行

```bash
# 克隆仓库
git clone https://github.com/penguin0821/bigco-intern.git
cd bigco-intern

# 启动本地服务器（任选一种）
python3 -m http.server 8080

# 然后访问 http://localhost:8080
```

## 🏗️ 技术栈

- 纯前端实现：HTML + CSS + JavaScript
- 像素复古风 UI（CRT 扫描线、Glitch 动画）
- localStorage 本地存档
- 无框架依赖，零配置运行

## 📂 项目结构

```
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── app.js          # 游戏引擎（状态管理、存档、回溯）
│   ├── story.js        # 剧情数据（70个节点、12个结局）
│   ├── ui.js           # UI 渲染（打字机效果、场景切换）
│   └── endings.js      # 结局收集系统
└── assets/
    └── pixel-art/      # 32张像素插画
```

## 📄 License

MIT License — 随意使用和修改。
