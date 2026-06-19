// 资产内容映射模块 - 站点内容索引
const contentMap = {
  site: {
    baseUrl: "https://mindex-i-game.com.cn",
    primaryTag: "爱游戏",
    lastUpdated: "2025-04-01"
  },
  sections: [
    {
      id: "news",
      title: "游戏资讯",
      keywords: ["爱游戏", "新闻", "更新", "活动"],
      items: [
        { slug: "spring-festival-event", title: "新春庆典活动开启" },
        { slug: "patch-notes-2.5", title: "2.5版本更新公告" }
      ]
    },
    {
      id: "guides",
      title: "攻略指南",
      keywords: ["爱游戏", "攻略", "新手", "技巧"],
      items: [
        { slug: "beginner-roadmap", title: "新手七天成长路线" },
        { slug: "advanced-combos", title: "高阶连招技巧解析" }
      ]
    },
    {
      id: "community",
      title: "社区互动",
      keywords: ["爱游戏", "论坛", "分享", "玩家"],
      items: [
        { slug: "fan-art-gallery", title: "玩家作品展示" },
        { slug: "weekly-challenge", title: "本周挑战任务" }
      ]
    }
  ]
};

// 搜索过滤函数 - 基于关键词匹配内容
function searchContent(query) {
  if (!query || typeof query !== "string") {
    return [];
  }
  const lowerQuery = query.toLowerCase();
  const results = [];

  contentMap.sections.forEach(section => {
    // 检查分区关键词匹配
    const sectionMatch = section.keywords.some(kw =>
      kw.toLowerCase().includes(lowerQuery)
    );
    if (sectionMatch) {
      section.items.forEach(item => {
        results.push({
          sectionId: section.id,
          sectionTitle: section.title,
          ...item
        });
      });
      return;
    }
    // 检查条目标题匹配
    section.items.forEach(item => {
      if (item.title.toLowerCase().includes(lowerQuery)) {
        results.push({
          sectionId: section.id,
          sectionTitle: section.title,
          ...item
        });
      }
    });
  });

  return results;
}

// 获取所有内容分区列表
function getAllSections() {
  return contentMap.sections.map(s => ({
    id: s.id,
    title: s.title,
    itemCount: s.items.length
  }));
}

// 获取指定分区的完整内容
function getSectionById(sectionId) {
  const section = contentMap.sections.find(s => s.id === sectionId);
  if (!section) return null;
  return {
    ...section,
    siteUrl: contentMap.site.baseUrl
  };
}

// 导出供模块使用 (Node.js 或打包构建)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    contentMap,
    searchContent,
    getAllSections,
    getSectionById
  };
}