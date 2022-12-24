interface ITask {
  id: string;
  title: string;
}

interface ITaskList {
  id: string;
  title: string;
  tasks: ITask[];
}

export const tasks1 = [
  { id: "1", title: "task #1" },
  { id: "2", title: "task #2" },
  { id: "3", title: "task #3" },
  { id: "4", title: "task #4" },
];
const tasks2 = [
  { id: "21", title: "task #1" },
  { id: "22", title: "task #2" },
  { id: "23", title: "task #3" },
  { id: "24", title: "task #4" },
];
const tasks3 = [
  { id: "31", title: "task #1" },
  { id: "32", title: "task #2" },
  { id: "33", title: "task #3" },
  { id: "34", title: "task #4" },
];

export const taskLists: ITaskList[] = [
  { id: "1", title: "list #1", tasks: tasks1 },
  { id: "2", title: "list #2", tasks: tasks2 },
  { id: "3", title: "list #3", tasks: tasks3 },
];
