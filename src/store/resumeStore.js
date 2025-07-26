import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useResumeStore = create(
  persist(
    (set) => ({
      exportStyles: {
        fontSize: '14px',
        lineHeight: 1.6,
      },
      markdown: `# 张思宇
**中级 Java 后端开发工程师 | 云原生 & 高并发**

📧 zhangsiyu@example.com | 📱 +86 155-0817-1234 | 📍 成都  
🔗 github.com/siyu-dev | 📝 blog.csdn.net/siyu-dev

---

## 个人简介
5 年 Java 后端开发，主导或核心参与 3 个千万级用户项目。深入掌握 SpringCloud、MySQL 调优、Redis 高阶特性、Kafka 亿级消息处理。K8s & ServiceMesh 落地经验丰富。

## 核心技能
- **语言**: Java（11/17）、Kotlin、Go（可读写）
- **框架**: Spring Boot 3.x、Spring Cloud 2023、Dubbo 3、gRPC
- **数据存储**: MySQL 8（分库分表 + 索引调优）、TiDB、Redis 7、Kafka
- **云原生**: Docker、Kubernetes、Helm、Istio、Argo CD
- **稳定性**: Sentinel、Hystrix、Resilience4j、ChaosBlade

## 工作经历

### 成都极客网络有限公司 | 高级 Java 后端工程师
*2022.03 – 至今*

**千万级 IM 系统重构**
- 负责消息网关 + 存储层改造：从单体到微服务，峰值 QPS 从 20k → 100k
- 引入 Kafka 分区 + 异步刷盘，消息延迟 P99 < 50 ms
- 设计 Redis 热 key 拆分 + 本地 Caffeine 二级缓存，热点流量降低 75%

**云原生迁移**
- 主导 20+ 服务容器化，编写 Helm Chart 60+
- 落地 Istio 流量治理，金丝雀发布 + A/B 测试

### 杭州某头部电商 | Java 后端工程师 → 高级工程师
*2019.07 – 2022.02*

**秒杀与库存中心**
- 使用 MySQL + Redis + Lua 脚本实现库存扣减，单机 QPS 提升 8 倍
- 基于 Canal 同步缓存，缓存一致性 99.99%
- 压测 5w 并发无超卖，支撑双 11 峰值 20w QPS

## 教育背景
**西华师范大学** 软件工程 本科（2015 – 2019）
- ACM 校队、国家励志奖学金

## 证书 & 社区
- 阿里云 ACP、腾讯云 TKE 认证
- 掘金《亿级流量 Java 秒杀实战》小册作者
`,
      selectedTemplate: 'creative',
      templates: {
        modern: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>简历</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #2c3e50;
      background: #f8f9fa;
      padding: 2rem;
      position: relative;
    }    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 3rem;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    h2 {
      color: #3498db;
      margin: 2rem 0 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #ecf0f1;
    }
    h3 {
      color: #2c3e50;
      margin: 1.5rem 0 0.5rem;
    }
    ul {
      margin-left: 1.5rem;
      margin-bottom: 1rem;
    }
    li {
      margin-bottom: 0.5rem;
    }
    strong {
      color: #2c3e50;
    }
    .page-break {
      display: none;
    }
    @media print {
      body { background: white; padding: 0; }
      .container { box-shadow: none; padding: 1rem; }
      .page-break { display: none; }
      @page { size: A4; margin: 2cm; }
      .container { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="container">
    <%- body %>
  </div>
</body>
</html>`,

        creative: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>简历</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Georgia', serif;
      line-height: 1.7;
      color: #2c3e50;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
      min-height: 100vh;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      padding: 3rem;
    }
    h1 {
      font-size: 3rem;
      color: #667eea;
      margin-bottom: 0.5rem;
      font-weight: 300;
    }
    h2 {
      color: #667eea;
      font-size: 1.8rem;
      margin: 2rem 0 1rem;
      position: relative;
      padding-left: 1rem;
    }
    h2::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 100%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 2px;
    }
    h3 {
      color: #2c3e50;
      margin: 1.5rem 0 0.5rem;
      font-weight: 600;
    }
    ul {
      margin-left: 1.5rem;
      margin-bottom: 1rem;
    }
    li {
      margin-bottom: 0.5rem;
      position: relative;
      padding-left: 1rem;
    }
    li::before {
      content: '▸';
      position: absolute;
      left: 0;
      color: #667eea;
    }
    strong {
      color: #2c3e50;
    }
    p {
      margin-bottom: 0.5rem;
    }
    @media print {
      body { background: white; color: black; }
      .container { box-shadow: none; border-radius: 0; }
      h1 { color: #333; }
      h2 { color: #0066cc; }
      h3 { color: #333; }
      li::before { color: #666; }
      strong { color: #333; }
    }
  </style>
</head>
<body>
  <div class="container">
    <%- body %>
  </div>
</body>
</html>`,

        minimal: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>简历</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #fafafa;
      padding: 3rem;
    }
    .container {
      max-width: 700px;
      margin: 0 auto;
      background: white;
      padding: 2.5rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    h1 {
      font-size: 2rem;
      font-weight: 300;
      letter-spacing: 1px;
      margin-bottom: 0.5rem;
    }
    h2 {
      font-size: 1.2rem;
      font-weight: 500;
      margin: 2.5rem 0 1rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #333;
    }
    h3 {
      font-size: 1rem;
      font-weight: 500;
      margin: 1.5rem 0 0.5rem;
      color: #333;
    }
    ul {
      margin-left: 1rem;
      margin-bottom: 1rem;
    }
    li {
      margin-bottom: 0.3rem;
      color: #555;
    }
    strong {
      font-weight: 500;
    }
    @media print {
      body { background: white; padding: 1rem; }
      .container { box-shadow: none; padding: 0; }
    }
  </style>
</head>
<body>
  <div class="container">
    <%- body %>
  </div>
</body>
</html>`,

        professional: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>简历</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Times New Roman', serif;
      line-height: 1.5;
      color: #000;
      background: white;
      padding: 2rem;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 2rem;
      border: 1px solid #ddd;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    h1 {
      font-size: 1.8rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-align: center;
    }
    h2 {
      font-size: 1.2rem;
      font-weight: bold;
      margin: 1.5rem 0 0.8rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-bottom: 1px solid #000;
      padding-bottom: 0.2rem;
    }
    h3 {
      font-size: 1.1rem;
      font-weight: bold;
      margin: 1rem 0 0.3rem;
    }
    ul {
      margin-left: 1.5rem;
      margin-bottom: 0.8rem;
    }
    li {
      margin-bottom: 0.3rem;
    }
    @media print {
      body { padding: 0; }
      .container { border: none; box-shadow: none; padding: 0.5in; }
    }
  </style>
</head>
<body>
  <div class="container">
    <%- body %>
  </div>
</body>
</html>`,

        tech: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>简历</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Fira Code', 'Consolas', monospace;
      line-height: 1.6;
      color: #e6e6e6;
      background: #0d1117;
      padding: 2rem;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 8px;
      overflow: hidden;
      padding: 2rem;
    }
    h1 {
      font-size: 2.5rem;
      color: #58a6ff;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }
    h2 {
      color: #f85149;
      font-size: 1.5rem;
      margin: 2rem 0 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #30363d;
    }
    h3 {
      color: #7ee787;
      margin: 1.5rem 0 0.5rem;
    }
    ul {
      margin-left: 1.5rem;
      margin-bottom: 1rem;
    }
    li {
      margin-bottom: 0.5rem;
      color: #e6e6e6;
      position: relative;
      padding-left: 1rem;
    }
    li::before {
      content: '>';
      position: absolute;
      left: 0;
      color: #7ee787;
    }
    strong {
      color: #f85149;
    }
    @media print {
      body { background: white; color: black; }
      .container { background: white; border: 1px solid #ccc; }
      h1 { color: #0066cc; }
      h2 { color: #cc0000; }
      h3 { color: #009900; }
      li::before { color: #009900; }
      strong { color: #cc0000; }
    }
  </style>
</head>
<body>
  <div class="container">
    <%- body %>
  </div>
</body>
</html>`
      },
      setMarkdown: (markdown) => set({ markdown }),
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
      setExportStyles: (styles) => set({ exportStyles: styles }),
    }),
    {
      name: 'resume-storage',
    }
  )
);