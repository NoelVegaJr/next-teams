import * as React from "react";
import { Draggable } from "react-beautiful-dnd";

interface ITask {
  id: string;
  title: string;
}

interface ITaskList {
  id: string;
  title: string;
  tasks: ITask[];
}

const DraggableTasks = ({ taskList }: { taskList: ITaskList }) => {
  return (
    <>
      {taskList.tasks.map((task, index) => {
        return (
          <Draggable
            key={task.id}
            draggableId={taskList.id + task.id}
            index={index}
          >
            {(provided, snapshot) => {
              return (
                <>
                  <li
                    ref={provided.innerRef}
                    className={`rounded border border-slate-900  bg-white px-2 py-2 ${
                      snapshot.isDragging && " box-shadow-2xl shadow-2xl"
                    }`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {task.title}
                  </li>
                </>
              );
            }}
          </Draggable>
        );
      })}
    </>
  );
};

export default DraggableTasks;
