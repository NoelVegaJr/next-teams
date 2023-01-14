import { trpc } from "@/utils/trpc";
import { faCheck, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Task, TaskList } from "@prisma/client";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import DraggableTasks from "./DraggableTasks";

interface ITask {
  id: string;
  title: string;
}

interface ITasklist extends TaskList {
  tasks: Task[];
}

const DraggableTaskList = ({
  taskList,
  index,
}: {
  taskList: ITasklist;
  index: number;
}) => {
  const utils = trpc.useContext();
  const [title, setTitle] = useState(taskList.name);
  const [editTitle, setEditTitle] = useState(false);
  const [editNewTask, setEditNewTask] = useState(false);
  const [newTask, setNewTask] = useState("");
  const newTaskMutation = trpc.company.newTask.useMutation({
    onSuccess: () => {
      utils.company.getProjectById.invalidate();
    },
  });
  const submitNewTaskHandler = () => {
    if (!newTask) return;
    newTaskMutation.mutate({ name: newTask, taskListId: taskList.id });
    setNewTask("");
    setEditNewTask(false);
  };

  return (
    <Draggable key={taskList.id} draggableId={taskList.id} index={index}>
      {(provided) => {
        return (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="h-fit w-52 shrink-0  overflow-hidden rounded-t-lg rounded-b-lg bg-slate-400"
          >
            <div className=" bg-slate-900 px-4 py-2 text-lg font-semibold">
              {editTitle ? (
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  className="w-full rounded px-1 outline-none"
                  autoFocus
                />
              ) : (
                <p
                  onClick={() => setEditTitle(true)}
                  onBlur={() => setEditTitle(false)}
                  className=" text-white"
                >
                  {taskList.name}
                </p>
              )}
            </div>

            <Droppable droppableId={taskList.id}>
              {(provided) => {
                return (
                  <ul
                    className=" flex h-fit grow-0 flex-col gap-2    rounded-b-lg p-2"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <DraggableTasks taskList={taskList} />
                    {provided.placeholder}
                    <li className="flex">
                      {!editNewTask ? (
                        <button
                          onClick={() => setEditNewTask(true)}
                          className="flex items-center gap-2 rounded bg-sky-600 py-1 px-3 text-sm text-white"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                          <p>New Task</p>
                        </button>
                      ) : (
                        <div className="">
                          <input
                            autoFocus
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            type="text"
                            className=" mb-1 rounded px-1 outline-none"
                          />
                          <div className="flex gap-2 text-xs text-white">
                            <button
                              onClick={submitNewTaskHandler}
                              className="w-1/2 rounded bg-green-600  p-1"
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </button>
                            <button
                              onClick={() => setEditNewTask(false)}
                              className="w-1/2 rounded bg-red-600 p-1"
                            >
                              <FontAwesomeIcon icon={faX} />
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  </ul>
                );
              }}
            </Droppable>
          </li>
        );
      }}
    </Draggable>
  );
};

export default DraggableTaskList;
