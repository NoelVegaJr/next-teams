import type { TaskList, Task as ITask } from "@prisma/client";
import * as React from "react";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Modal from "../Modals/Modal";
import Task from "./Task";

interface ITasklist extends TaskList {
  tasks: ITask[];
}

const DraggableTasks = ({ taskList }: { taskList: ITasklist }) => {
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
                    className={`  ${
                      snapshot.isDragging && " box-shadow-2xl shadow-2xl"
                    }`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task task={task} />
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
