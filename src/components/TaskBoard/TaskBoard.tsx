import type { DropResult } from "react-beautiful-dnd";
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { reorder2DLists } from "../../utils/reorderdnd";
import { taskLists } from "./tasks";
import DraggableTaskList from "./DraggableTaskList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
interface ITask {
  id: string;
  title: string;
}

interface ITaskList {
  id: string;
  title: string;
  tasks: ITask[];
}

const TaskBoard: React.FunctionComponent = () => {
  const [lists, setLists] = useState(taskLists);
  const [editNewTaskList, setEditNewTaskList] = useState(false);
  const [newTaskList, setNewTaskList] = useState("");

  const submitNewTaskListHandler = () => {
    if (!newTaskList) return;
    setLists((prev) => [
      ...prev,
      { id: Math.random().toString(), title: newTaskList, tasks: [] },
    ]);
    setEditNewTaskList(false);
    setNewTaskList("");
  };

  const updateList = (list: ITaskList) => {
    const updatedLists = lists.map((l) => {
      if (l.id === list.id) {
        return list;
      }
      return l;
    });

    setLists(() => updatedLists);
  };

  const updateListsHandler = (lists: ITaskList[]) => {
    console.log(lists);
    setLists(() => lists);
  };

  const dragEndHandler = (result: DropResult) => {
    console.log(result);
    reorder2DLists(result, lists, updateListsHandler);
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
                      set={updateList}
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
