export interface Board {
  board: string;
  id: string;
  organization_id: string;
  isActive: boolean;
  imageUrl?: string;
  columns: {
    column: string;
    column_id: string;
    tasks: {
      title: string;
      description: string;
      status: string;
      due_date: string;
      task_id: string;
    }[];
  }[];
}

export interface Column {
  column: string;
  column_id: string;
  tasks: {
    title: string;
    description: string;
    status: string;
    due_date: string;
    task_id: string;
  }[];
}
