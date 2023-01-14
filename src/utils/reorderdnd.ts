import { TaskList, Task, Taskboard } from "@prisma/client";
import type { DropResult } from "react-beautiful-dnd";

// interface ITask {
//   id: string;
//   title: string;
// }

// interface ITaskList {
//   id: string;
//   title: string;
//   tasks: ITask[];
// }

interface ITasklist extends TaskList {
  tasks: Task[];
}

interface ITaskboard extends Taskboard {
  TaskLists: ITasklist[];
}

interface ITaskboardProps {
  taskboard: ITaskboard;
}

export const reorder2DLists = (
  result: DropResult,
  lists: ITasklist[],
  setLists: (lists: ITasklist[]) => void
) => {
  const { source, destination } = result;

  if (
    (source.droppableId === destination?.droppableId &&
      source.index === destination.index) ||
    !destination
  ) {
    return;
  }

  if (destination.droppableId === "board") {
    const clonedLists = [...lists];
    console.log("reorder list");
    const sourceItem = clonedLists.splice(source.index, 1);
    clonedLists.splice(destination.index, 0, sourceItem[0]);
    setLists(clonedLists);
  } else {
    const sourceList = lists.filter(
      (list) => list.id === source.droppableId
    )[0];
    const destList = lists.filter(
      (list) => list.id === destination.droppableId
    )[0];

    const sourceItem = sourceList.tasks.splice(source.index, 1);
    destList.tasks.splice(destination.index, 0, sourceItem[0]);

    const newList = lists.map((list) => {
      if (list.id === source.droppableId) {
        return sourceList;
      } else if (list.id === destination.droppableId) {
        return destList;
      }
      return list;
    });
    setLists(newList);
  }
};
