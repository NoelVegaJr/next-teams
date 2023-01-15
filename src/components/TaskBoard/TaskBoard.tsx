import type { DropResult } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableTaskList from "./DraggableTaskList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import type { Task, Taskboard, TaskList } from "@prisma/client";
import { trpc } from "@/utils/trpc";

interface ITask {
  id: string;
  name: string;
}

interface ITaskList {
  id: string;
  name: string;
  tasks: ITask[];
}

interface ITaskboard {
  id: string;
  name: string;
  TaskLists: ITaskList[];
}

interface ITaskboardProps {
  taskboard: ITaskboard;
}

const TaskBoard: React.FunctionComponent<ITaskboardProps> = ({ taskboard }) => {
  const utils = trpc.useContext();
  const [lists, setLists] = useState(taskboard.TaskLists);
  const [editNewTaskList, setEditNewTaskList] = useState(false);
  const [newTaskList, setNewTaskList] = useState("");
  const newTaskListMutation = trpc.company.newTaskList.useMutation({
    onMutate: async (newList) => {
      setLists((prev) => [
        ...prev,
        {
          createAt: new Date(),
          id: "",
          index: 9999,
          name: newList.name,
          taskBoardId: taskboard.id,
          tasks: [],
        },
      ]);
    },
    onSuccess: () => {
      utils.company.getProjectById.invalidate();
    },
  });

  useEffect(() => {
    setLists(taskboard.TaskLists);
  }, [taskboard.TaskLists]);

  const reorderTaskListsMutation = trpc.company.reorderTaskLists.useMutation({
    onMutate: async () => {
      await utils.company.getProjectById.cancel();
    },
    onSuccess: () => {
      utils.company.getProjectById.invalidate();
    },
  });

  const reorderTasksSameListMutation =
    trpc.company.reorderTasksSameList.useMutation({
      onMutate: async () => {
        await utils.company.getProjectById.cancel();
      },
      onSuccess: () => {
        utils.company.getProjectById.invalidate();
      },
    });

  const reorderTasksDiffListMutation =
    trpc.company.reorderTasksDiffList.useMutation({
      onMutate: async () => {
        await utils.company.getProjectById.cancel();
      },
      onSuccess: () => {
        utils.company.getProjectById.invalidate();
      },
    });

  const submitNewTaskListHandler = () => {
    if (!newTaskList) return;
    newTaskListMutation.mutate({
      name: newTaskList,
      taskBoardId: taskboard.id,
    });
    setEditNewTaskList(false);
    setNewTaskList("");
  };

  const dragEndHandler = (result: DropResult) => {
    console.log(result);
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
      const listIds = clonedLists.map((l) => l.id);
      reorderTaskListsMutation.mutateAsync({ listIds });
      console.log(clonedLists);
    } else {
      const sourceList = lists.filter(
        (list) => list.id === source.droppableId
      )[0];

      const destList = lists.filter(
        (list) => list.id === destination.droppableId
      )[0];

      const sourceItem = sourceList.tasks.splice(source.index, 1)[0];
      destList.tasks.splice(destination.index, 0, sourceItem);

      if (source.droppableId === destination.droppableId) {
        reorderTasksSameListMutation.mutateAsync({
          taskIds: destList.tasks.map((t) => t.id),
        });
      } else {
        reorderTasksDiffListMutation.mutateAsync({
          destListId: destList.id,
          taskId: sourceItem.id,
          taskIds: destList.tasks.map((t) => t.id),
        });
      }

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
  return (
    <div className="h-full w-full overflow-x-scroll ">
      <DragDropContext onDragEnd={dragEndHandler}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => {
            return (
              <ul
                className="flex  h-full flex-shrink-0 flex-nowrap  gap-4 p-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {lists.map((taskList, index) => {
                  return (
                    <DraggableTaskList
                      key={taskList.id}
                      taskList={taskList}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
                <li className="w-52 ">
                  <div className="w-full rounded bg-slate-900 p-1">
                    {!editNewTaskList ? (
                      <button
                        onClick={() => setEditNewTaskList(true)}
                        className="flex w-full items-center gap-2  rounded  px-4  text-lg font-semibold text-white"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                        <p>New List</p>
                      </button>
                    ) : (
                      <div className="p-2">
                        <input
                          value={newTaskList}
                          onChange={(e) => setNewTaskList(e.target.value)}
                          type="text"
                          className="mb-2 w-full rounded px-1 outline-none"
                        />
                        <div className="flex gap-2  text-xs text-white">
                          <button
                            onClick={submitNewTaskListHandler}
                            className="w-1/2 rounded bg-green-600 "
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                          <button
                            onClick={() => setEditNewTaskList(false)}
                            className="w-1/2 rounded bg-red-600 p-1"
                          >
                            <FontAwesomeIcon icon={faX} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
