export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  labels: string[];
  dueDate?: Date;
  recurring?: 'daily' | 'weekly' | 'monthly' | 'none';
  progress: number;
  lastCompleted?: Date;
}

export const categories = ['personal', 'work', 'shopping', 'health'];
export const availableLabels = ['urgent', 'important', 'can-wait', 'in-progress']; 