import { Draggable } from "react-beautiful-dnd";
import Task from "./Task";

interface ITask {
  id: string;
  name: string;
}

interface ITaskList {
  id: string;
  name: string;
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
