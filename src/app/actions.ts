'use server';

import { generateTags, type GenerateTagsInput } from '@/ai/flows/generate-tags';

export async function handleGenerateTags(
  blogPostContent: string
): Promise<string[]> {
  if (!blogPostContent) {
    return [];
  }

  try {
    const input: GenerateTagsInput = { blogPostContent };
    const result = await generateTags(input);
    return result.tags;
  } catch (error) {
    console.error('Error generating tags:', error);
    // In a real app, you'd want more robust error handling
    return ['Error generating tags'];
  }
}
