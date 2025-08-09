'use server';

import { neurosurgeryQuery, type NeurosurgeryQueryOutput } from '@/ai/flows/neurosurgery-query';

export async function askQuestion(query: string): Promise<NeurosurgeryQueryOutput> {
  if (!query) {
    throw new Error('Query cannot be empty');
  }
  try {
    const response = await neurosurgeryQuery({ query });
    return response;
  } catch (error) {
    console.error('Error calling neurosurgeryQuery:', error);
    // In a real app, you might want to log this error to a monitoring service
    return { answer: 'Sorry, I encountered an error while processing your request. Please try again later.' };
  }
}
