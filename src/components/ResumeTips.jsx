import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, CheckCircle, AlertCircle } from 'lucide-react';

const tips = [
  {
    title: '个人信息',
    content: '包含姓名、职位、邮箱、电话等基本信息，确保联系方式准确无误',
    icon: <CheckCircle className="h-5 w-5 text-green-500" />
  },
  {
    title: '工作经历',
    content: '按时间倒序排列，突出成就和贡献，使用量化数据展示成果',
    icon: <CheckCircle className="h-5 w-5 text-green-500" />
  },
  {
    title: '技能特长',
    content: '分类展示技能，突出与目标职位相关的核心技能',
    icon: <CheckCircle className="h-5 w-5 text-green-500" />
  },
  {
    title: '项目经验',
    content: '选择3-5个最具代表性的项目，突出技术难点和解决方案',
    icon: <CheckCircle className="h-5 w-5 text-green-500" />
  }
];

const warnings = [
  {
    title: '避免冗长',
    content: '简历控制在1-2页，突出重点，避免无关信息',
    icon: <AlertCircle className="h-5 w-5 text-orange-500" />
  },
  {
    title: '格式统一',
    content: '保持字体、字号、间距的一致性，提升专业感',
    icon: <AlertCircle className="h-5 w-5 text-orange-500" />
  }
];

export function ResumeTips() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            制作技巧
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex gap-3 p-3 bg-green-50 rounded-lg">
              {tip.icon}
              <div>
                <h4 className="font-medium text-green-800">{tip.title}</h4>
                <p className="text-sm text-green-600">{tip.content}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            注意事项
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {warnings.map((warning, index) => (
            <div key={index} className="flex gap-3 p-3 bg-orange-50 rounded-lg">
              {warning.icon}
              <div>
                <h4 className="font-medium text-orange-800">{warning.title}</h4>
                <p className="text-sm text-orange-600">{warning.content}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
