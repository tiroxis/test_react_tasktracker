enum TaskPriority {
    Normal = "Normal",
    Important = "Important",
    Urgent = "Urgent",
}

interface ITask {
    id: number;
    title: string;
    description: string;
    priority: TaskPriority;
    created_date: Date;
    resolved_date: Date | null;
    due_date: Date | null;
}

/*interface ITaskList{
    list: ITask[];
}*/


export {ITask, TaskPriority};
export default ITask;