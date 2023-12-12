export type Id = string | number;

export interface ActiveColumn {
  column: string;
  column_id: Id;
  tasks: ActiveTask[];
}

export interface ActiveTask {
  title: string;
  description: string;
  status: string;
  due_date: string;
  task_id: Id;
  column_id: Id;
}
