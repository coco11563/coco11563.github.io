#!/bin/bash

# GitHub Secrets 配置脚本
# 需要先安装 GitHub CLI: https://cli.github.com/

API_KEY="426465cd7cc1af7ad50cdcb73736b2fe4c069184e52957d80602bf302c363b66"

echo "🔧 配置 GitHub Secrets..."

# 检查是否安装了 GitHub CLI
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI 未安装。请先安装: https://cli.github.com/"
    echo "或者手动在 GitHub 仓库设置中添加 Secret："
    echo "   名称: SERPAPI_KEY"
    echo "   值: $API_KEY"
    exit 1
fi

# 检查是否已登录
if ! gh auth status &> /dev/null; then
    echo "❌ 请先登录 GitHub CLI: gh auth login"
    exit 1
fi

# 添加 Secret
echo "✅ 添加 SERPAPI_KEY 到 GitHub Secrets..."
echo "$API_KEY" | gh secret set SERPAPI_KEY

echo "🎉 GitHub Secret 配置完成！"
echo "✅ SERPAPI_KEY 已添加到仓库 secrets"
echo "🚀 GitHub Actions 现在可以自动获取 Google Scholar 数据了"