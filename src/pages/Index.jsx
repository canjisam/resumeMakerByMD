import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { ResumePreview } from '@/components/ResumePreview';
import { ThemeSelector } from '@/components/ThemeSelector';
import { ExportButtons } from '@/components/ExportButtons';
import { ResumeTips } from '../components/ResumeTips';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  return (
    <div className="h-screen flex flex-col">
      <header className="border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">简历制作器</h1>
            <p className="text-sm text-muted-foreground">用Markdown快速制作专业简历</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSelector />
            <ExportButtons />
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className="h-full overflow-auto p-4 space-y-4">
              <Tabs defaultValue="editor" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="editor">Markdown编辑器</TabsTrigger>
                  <TabsTrigger value="tips">制作技巧</TabsTrigger>
                </TabsList>
                
                <TabsContent value="editor" className="mt-0">
                  <Card className="h-[calc(100vh-12rem)]">
                    <CardHeader>
                      <CardTitle>Markdown编辑器</CardTitle>
                    </CardHeader>
                    <div className="h-[calc(100%-4rem)] px-4 pb-4">
                      <MarkdownEditor />
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="tips" className="mt-0">
                  <ResumeTips />
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={60} minSize={40}>
            <Card className="h-full rounded-none border-0">
              <CardHeader>
                <CardTitle>实时预览</CardTitle>
              </CardHeader>
              <div className="h-[calc(100%-4rem)] px-4 pb-4">
                <ResumePreview />
              </div>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
};

export default Index;
