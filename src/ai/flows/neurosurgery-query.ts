'use server';

/**
 * @fileOverview An AI agent to answer neurosurgery related queries.
 *
 * - neurosurgeryQuery - A function that handles the neurosurgery related question answering process.
 * - NeurosurgeryQueryInput - The input type for the neurosurgeryQuery function.
 * - NeurosurgeryQueryOutput - The return type for the neurosurgeryQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NeurosurgeryQueryInputSchema = z.object({
  query: z.string().describe('The neurosurgery related question.'),
});
export type NeurosurgeryQueryInput = z.infer<typeof NeurosurgeryQueryInputSchema>;

const NeurosurgeryQueryOutputSchema = z.object({
  answer: z.string().describe('The informative and relevant answer to the neurosurgery related question.'),
  source: z.string().optional().describe('The source of the information used to answer the question.'),
});
export type NeurosurgeryQueryOutput = z.infer<typeof NeurosurgeryQueryOutputSchema>;

export async function neurosurgeryQuery(input: NeurosurgeryQueryInput): Promise<NeurosurgeryQueryOutput> {
  return neurosurgeryQueryFlow(input);
}

const knowledgeTool = ai.defineTool({
  name: 'neurosurgeryKnowledge',
  description: 'Retrieves information related to neurosurgery to answer user questions.',
  inputSchema: z.object({
    query: z.string().describe('The query to use when searching for neurosurgery information.'),
  }),
  outputSchema: z.string(),
  async fn(input) {
    // Placeholder implementation for knowledge retrieval
    // In a real application, this would integrate with a knowledge base or external API
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network latency
    return `This is placeholder knowledge about neurosurgery related to the query: ${input.query}.  This response comes from a TOOL.`;
  },
});

const prompt = ai.definePrompt({
  name: 'neurosurgeryQueryPrompt',
  input: {schema: NeurosurgeryQueryInputSchema},
  output: {schema: NeurosurgeryQueryOutputSchema},
  tools: [knowledgeTool],
  prompt: `You are a helpful AI assistant specialized in neurosurgery.

  Use the provided tools to answer the user's question about neurosurgery.
  Always cite your sources if possible.

  Question: {{{query}}}

  Answer: `,
});

const neurosurgeryQueryFlow = ai.defineFlow(
  {
    name: 'neurosurgeryQueryFlow',
    inputSchema: NeurosurgeryQueryInputSchema,
    outputSchema: NeurosurgeryQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
