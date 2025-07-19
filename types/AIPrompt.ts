export interface AIPrompt {
  id: number;
  title: string;
  content: string;
  tool: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  dateAdded: string;
  isDaily: boolean;
  usageCount: number;
}