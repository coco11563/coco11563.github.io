# 🔐 GitHub Secrets 配置指南

## 手动配置SerpAPI密钥

由于你没有安装GitHub CLI，请按以下步骤手动配置：

### 步骤1: 访问GitHub仓库设置

1. 打开你的GitHub仓库：https://github.com/coco11563/coco11563.github.io
2. 点击 **Settings** 标签页
3. 在左侧菜单中点击 **Secrets and variables** > **Actions**

### 步骤2: 添加新密钥

1. 点击 **New repository secret** 按钮
2. 填写以下信息：
   - **Name**: `SERPAPI_KEY`
   - **Value**: `426465cd7cc1af7ad50cdcb73736b2fe4c069184e52957d80602bf302c363b66`
3. 点击 **Add secret** 保存

### 步骤3: 验证配置

配置完成后：

1. GitHub Actions会在下次运行时自动使用API密钥
2. 每日自动更新会获取真实的Google Scholar数据
3. 你可以手动触发更新来测试：
   - 进入 **Actions** 标签页
   - 选择 **📊 Update Scholar Data** 工作流
   - 点击 **Run workflow**

### 🎉 配置完成！

配置完成后，你的学术主页将会：

- ✅ **自动获取55篇论文**（而不是手动的6篇）
- ✅ **实时更新引用数据**（总引用655，H指数16，i10指数20）
- ✅ **每日自动同步**最新的学术成果
- ✅ **准确的按年引用统计**

### 🔍 当前数据状态

**API测试结果：**
- 总引用数: 655 ✅
- H指数: 16 ✅  
- i10指数: 20 ✅
- 论文数量: 55篇 🚀（大幅增加！）

**下次更新时间：** 每天北京时间上午8点（UTC 0点）