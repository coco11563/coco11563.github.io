# 🔍 SerpAPI 配置指南

## 自动获取Google Scholar数据

为了自动从Google Scholar获取最新的学术指标，你需要配置SerpAPI：

### 1. 获取API密钥

1. 访问 [SerpAPI官网](https://serpapi.com/)
2. 注册账户并获取API密钥
3. 免费账户每月有100次请求额度

### 2. 配置环境变量

**本地开发：**
```bash
export SERPAPI_KEY="your_api_key_here"
```

**GitHub Actions：**
在仓库设置中添加秘密变量：
- 名称：`SERPAPI_KEY`
- 值：你的API密钥

### 3. 验证配置

运行以下命令测试API是否工作：
```bash
npm run fetch-data
```

### 4. API响应结构

SerpAPI返回的Google Scholar数据结构：
```json
{
  "author": {
    "name": "Meng Xiao",
    "affiliations": [...],
    "interests": [...]
  },
  "cited_by": {
    "table": [
      {
        "citations": {
          "all": 853,
          "since_2019": 790
        }
      },
      {
        "h_index": {
          "all": 16,
          "since_2019": 15
        }
      },
      {
        "i10_index": {
          "all": 20,
          "since_2019": 19
        }
      }
    ]
  },
  "articles": [...]
}
```

### 5. 当前数据源

在没有API密钥的情况下，系统使用以下备用数据：
- **总引用数**: 853
- **H指数**: 16 ✅ 
- **i10指数**: 20 ✅
- **最近5年引用数**: 790

### 6. 故障排除

如果API调用失败，系统会自动回退到备用数据源，确保网站正常运行。

日志会显示：
- `✅ 成功获取学者数据` - API工作正常
- `⚠️ 未配置 SERPAPI_KEY，使用备用数据源` - 使用备用数据
- `❌ SerpAPI 获取失败` - API调用失败，使用备用数据