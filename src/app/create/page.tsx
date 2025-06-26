'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast"
import { handleGenerateTags } from '@/app/actions';
import { Loader2, Wand2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SparkleIcon } from '@/components/icons';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
  content: z.string().min(50, { message: 'Content must be at least 50 characters.' }),
});

export default function CreatePostPage() {
    const { toast } = useToast();
    const [tags, setTags] = useState<string[]>([]);
    const [isGeneratingTags, setIsGeneratingTags] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            content: '',
        },
    });

    const onGenerateTags = async () => {
        const content = form.getValues('content');
        if (content.length < 50) {
            form.setError('content', { type: 'manual', message: 'Content must be at least 50 characters to generate tags.' });
            return;
        }
        
        setIsGeneratingTags(true);
        setTags([]);
        try {
            const generatedTags = await handleGenerateTags(content);
            setTags(generatedTags);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to generate tags. Please try again.",
                variant: 'destructive'
            })
        } finally {
            setIsGeneratingTags(false);
        }
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        const postData = { ...values, tags };
        console.log("New Post Data:", postData);
        toast({
          title: "Post Created! ✨",
          description: "Your new blog post has been created (check the console!).",
        })
        form.reset();
        setTags([]);
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Card className="rounded-xl shadow-lg border-2 border-primary/20">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit mb-4">
                       <SparkleIcon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl">Create a New Post</CardTitle>
                    <CardDescription>Share your story with the world. Let your creativity bloom!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Post Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="A catchy title for your post..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Write your heart out..." {...field} rows={12} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <div className="space-y-4 rounded-lg border bg-card p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold">AI-Powered Tags</h3>
                                        <p className="text-sm text-muted-foreground">Generate tags based on your content.</p>
                                    </div>
                                    <Button type="button" variant="outline" onClick={onGenerateTags} disabled={isGeneratingTags}>
                                        {isGeneratingTags ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                                        Generate
                                    </Button>
                                </div>
                                { (tags.length > 0 || isGeneratingTags) && (
                                    <div className="min-h-[40px] flex flex-wrap gap-2 items-center rounded-md bg-muted/50 p-3">
                                        {isGeneratingTags && <p className="text-sm text-muted-foreground">Generating...</p>}
                                        {tags.map((tag, index) => (
                                            <Badge key={index} variant="secondary">{tag}</Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Button type="submit" size="lg" className="w-full">Publish Post</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
