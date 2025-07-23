export function parseFrontMatter(markdown) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdown.match(frontMatterRegex);
  
  if (!match) {
    return { content: markdown, data: {} };
  }
  
  const frontMatter = match[1];
  const content = match[2];
  
  const data = {};
  frontMatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      // 修复：确保 value 存在再调用 replace
      data[key.trim()] = value ? value.replace(/^["']|["']$/g, '') : '';
    }
  });
  
  return { content, data };
}
