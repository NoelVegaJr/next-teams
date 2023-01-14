import useProfileStore from "@/store/home/profile-store";
import {
  Bars3BottomLeftIcon,
  ClockIcon,
  ListBulletIcon,
  PaperClipIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Task } from "@prisma/client";
import * as React from "react";
import { useState } from "react";
import Modal from "../Modals/Modal";
import Avatar from "../UI/Avatar";

interface ITaskProps {
  task: Task;
}

const Task: React.FunctionComponent<ITaskProps> = ({ task }) => {
  const [openModal, setOpenModal] = useState(false);
  const { profile } = useProfileStore();

  return (
    <>
      <Modal
        isOpen={openModal}
        close={() => setOpenModal(false)}
        title={task.name}
        size="max-w-5xl"
      >
        <div className="flex h-full gap-6">
          <div className="flex w-full flex-col gap-10">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Bars3BottomLeftIcon className="h-6 w-6" />
                <p>Description</p>
              </div>
              <div className="pl-12">
                <textarea
                  autoFocus={false}
                  className="w-full rounded border-none bg-gray-200 outline-none"
                  placeholder="Add a more detailed description..."
                />
                <div className="flex items-center gap-2">
                  <button className="rounded bg-sky-600 py-1 px-2 text-white transition-all duration-200 hover:bg-sky-700">
                    Save
                  </button>
                  <button className="rounded  py-1 px-2 text-gray-600 transition-all duration-200 hover:bg-gray-200">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar
                image={profile.avatar}
                name={profile.name}
                size="xs"
                status={profile.status}
              />
              <input
                type="text"
                className="w-full grow-0 rounded border border-gray-200 outline-none"
                placeholder="Write a comment..."
              />
            </div>
          </div>
          <div className="flex h-full w-60 flex-col gap-2">
            <p className="text-sm">Add to card</p>
            <button className="transition-color flex w-full items-center gap-2 rounded bg-gray-100 p-1 duration-200 hover:bg-gray-200">
              <UserIcon className="h-4 w-4" />
              <p className="text-xs">Members</p>
            </button>
            <button className="transition-color flex w-full items-center gap-2 rounded bg-gray-100 p-1 duration-200 hover:bg-gray-200">
              <TagIcon className="h-4 w-4" />
              <p className="text-xs">Labels</p>
            </button>
            <button className="transition-color flex w-full items-center gap-2 rounded bg-gray-100 p-1 duration-200 hover:bg-gray-200">
              <ListBulletIcon className="h-4 w-4" />
              <p className="text-xs">Checklist</p>
            </button>
            <button className="transition-color flex w-full items-center gap-2 rounded bg-gray-100 p-1 duration-200 hover:bg-gray-200">
              <ClockIcon className="h-4 w-4" />
              <p className="text-xs">Dates</p>
            </button>
            <button className="transition-color flex w-full items-center gap-2 rounded bg-gray-100 p-1 duration-200 hover:bg-gray-200">
              <PaperClipIcon className="h-4 w-4" />
              <p className="text-xs">Attachment</p>
            </button>
          </div>
        </div>
      </Modal>
      <div
        className="rounded border border-slate-900  bg-white px-2 py-2"
        onClick={() => setOpenModal(true)}
      >
        {task.name}
      </div>
    </>
  );
};

export default Task;
