import { useState, useEffect } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { parseFrontMatter } from '@/utils/parseFrontMatter';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PersonalInfoEditor() {
  const { markdown, setMarkdown } = useResumeStore();
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    blog: ''
  });

  // 从markdown中提取个人信息
  useEffect(() => {
    const { data } = parseFrontMatter(markdown);
    setPersonalInfo({
      name: data.name || '',
      title: data.title || '',
      email: data.email || '',
      phone: data.phone || '',
      location: data.location || '',
      github: data.github || '',
      blog: data.blog || ''
    });
  }, [markdown]);

  const handleInputChange = (field, value) => {
    const newInfo = { ...personalInfo, [field]: value };
    setPersonalInfo(newInfo);
    
    // 更新markdown中的front matter
    const { content } = parseFrontMatter(markdown);
    const newFrontMatter = `---
name: "${newInfo.name}"
title: "${newInfo.title}"
email: "${newInfo.email}"
phone: "${newInfo.phone}"
location: "${newInfo.location}"
github: "${newInfo.github}"
blog: "${newInfo.blog}"
---`;
    
    setMarkdown(`${newFrontMatter}\n${content}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>个人信息</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">姓名</Label>
          <Input
            id="name"
            value={personalInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="请输入姓名"
          />
        </div>
        
        <div>
          <Label htmlFor="title">职位</Label>
          <Input
            id="title"
            value={personalInfo.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="请输入职位"
          />
        </div>
        
        <div>
          <Label htmlFor="email">邮箱</Label>
          <Input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="请输入邮箱"
          />
        </div>
        
        <div>
          <Label htmlFor="phone">电话</Label>
          <Input
            id="phone"
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="请输入电话"
          />
        </div>

        <div>
          <Label htmlFor="location">地点</Label>
          <Input
            id="location"
            value={personalInfo.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="请输入地点"
          />
        </div>

        <div>
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            value={personalInfo.github}
            onChange={(e) => handleInputChange('github', e.target.value)}
            placeholder="github.com/username"
          />
        </div>

        <div>
          <Label htmlFor="blog">博客</Label>
          <Input
            id="blog"
            value={personalInfo.blog}
            onChange={(e) => handleInputChange('blog', e.target.value)}
            placeholder="blog.example.com"
          />
        </div>
      </CardContent>
    </Card>
  );
}
