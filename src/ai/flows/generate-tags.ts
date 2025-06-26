'use server';
/**
 * @fileOverview AI-powered tag generator for blog posts.
 *
 * - generateTags - A function that generates tags for a given blog post content.
 * - GenerateTagsInput - The input type for the generateTags function.
 * - GenerateTagsOutput - The return type for the generateTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTagsInputSchema = z.object({
  blogPostContent: z
    .string()
    .describe('The content of the blog post for which tags need to be generated.'),
});
export type GenerateTagsInput = z.infer<typeof GenerateTagsInputSchema>;

const GenerateTagsOutputSchema = z.object({
  tags: z
    .array(z.string())
    .describe('An array of relevant tags generated for the blog post.'),
});
export type GenerateTagsOutput = z.infer<typeof GenerateTagsOutputSchema>;

export async function generateTags(input: GenerateTagsInput): Promise<GenerateTagsOutput> {
  return generateTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTagsPrompt',
  input: {schema: GenerateTagsInputSchema},
  output: {schema: GenerateTagsOutputSchema},
  prompt: `You are an AI assistant specializing in generating tags for blog posts.
  Given the content of a blog post, generate a list of relevant tags that can help readers find related content and improve the blog's searchability.
  The tags should be concise and accurately reflect the main topics covered in the blog post.

  Blog Post Content:
  {{blogPostContent}}
  `,
});

const generateTagsFlow = ai.defineFlow(
  {
    name: 'generateTagsFlow',
    inputSchema: GenerateTagsInputSchema,
    outputSchema: GenerateTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
