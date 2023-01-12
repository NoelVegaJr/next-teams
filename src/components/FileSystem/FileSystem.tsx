import {
  PlusIcon,
  ArrowUpTrayIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  FolderIcon,
  ArrowPathIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { useFS } from "hooks/fs-hook";
import * as React from "react";
import NewFolderModal from "../Modals/NewFolderModal";
import ExpandButton from "../Navigation/Buttons/ExpandButton";

interface IDirectoryProps {
  item: any;
  open: (item: any) => void;
  className?: string;
  currentDirectory: string;
}

const Button = ({
  name,
  isOpen,
  hasChildren,
}: {
  name: string;
  isOpen: boolean;
  hasChildren: boolean;
}) => {
  return (
    <>
      <div className={`flex gap-2 text-sm `}>
        <FolderIcon className="h-4 w-4 text-yellow-400" />
        <p className="">{name}</p>
      </div>

      {hasChildren && (
        <ChevronRightIcon className={`h-4 w-4 ${isOpen && "rotate-90"}`} />
      )}
    </>
  );
};

const Directory: React.FunctionComponent<IDirectoryProps> = ({
  item,
  open,
  className,
  currentDirectory,
}) => {
  return (
    <ExpandButton
      title={item.name}
      button={
        <Button
          name={item.name}
          isOpen={item.isOpen}
          hasChildren={item.children.length > 0}
        />
      }
      className={`flex items-center justify-between ${
        currentDirectory === item.id
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "hover:bg-gray-100"
      } p-1  ${className}`}
      onClick={() => open(item)}
      style={{ paddingLeft: `${item.depth * 6}px` }}
    >
      <ul>
        {item.type === "dir" &&
          item.children.map((i: any) => {
            if (i.type === "dir") {
              return (
                <Directory
                  open={(i) => open(i)}
                  key={i.id}
                  item={i}
                  currentDirectory={currentDirectory}
                />
              );
            } else {
              return <li key={i.id}></li>;
            }
          })}
      </ul>
    </ExpandButton>
  );
};

const FileSystem: React.FunctionComponent = (props) => {
  const {
    currentDirectory,
    directories,
    selectDirectory,
    newDirectory,
    back,
    forward,
  } = useFS();
  const [newDirModal, setNewDirModal] = React.useState(false);
  return (
    <>
      <NewFolderModal
        action={(name) => {
          newDirectory(name, currentDirectory.depth + 1);
          setNewDirModal(false);
        }}
        close={() => setNewDirModal(false)}
        isOpen={newDirModal}
      />
      <div className="flex h-screen flex-col">
        <div className="flex items-center gap-4 border-b bg-gray-100 p-2">
          <button
            onClick={() => {
              setNewDirModal(true);
            }}
            className="group  flex  items-center gap-2 rounded py-1 px-2 text-white transition-all duration-200 hover:bg-gray-400"
          >
            <PlusIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-200" />
            <p className="text-sm text-gray-500 group-hover:text-white">
              New folder
            </p>
          </button>
          <button className="group  flex  items-center gap-2 rounded py-1 px-2 text-white transition-all duration-200 hover:bg-gray-400">
            <ArrowUpTrayIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-200" />
            <p className="text-sm text-gray-500 group-hover:text-white">
              Upload
            </p>
          </button>
        </div>

        <div className="flex w-full justify-between border p-2">
          <div className="flex w-full items-center gap-2">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const prevDirectory = back();
                  if (prevDirectory) {
                    selectDirectory(prevDirectory);
                  }
                }}
                className="cursor-pointer rounded p-1 transition-all duration-300 hover:bg-neutral-200"
              >
                <ArrowLeftIcon className="h-4 w-4" />
              </button>
              <button className="cursor-pointer rounded p-1 transition-all duration-300 hover:bg-neutral-200">
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="flex w-full items-center gap-2 rounded border pl-2">
              <FolderIcon className="h-4 w-4 text-yellow-400" />
              <p className="w-full  text-sm">
                {currentDirectory.path().map((part, index) => {
                  return (
                    <span
                      className="cursor-pointer hover:text-blue-500"
                      onClick={() => selectDirectory(part)}
                      key={part.name}
                    >
                      {index !== 0 && " / "}
                      {part.name}
                    </span>
                  );
                })}
              </p>
              <button className="group  flex  items-center gap-2 py-1 px-2 text-white transition-all duration-300 hover:bg-gray-200">
                <ArrowPathIcon className="h-5 w-5 text-gray-500 " />
              </button>
            </div>
          </div>
        </div>

        <div className="flex h-full">
          <div className="h-full w-60  border-r">
            <ul className="cursor-pointer">
              {Array.from(directories.values())
                .filter((d) => d.depth === 1)
                .map((d) => {
                  return (
                    <Directory
                      key={d.id}
                      item={d}
                      currentDirectory={currentDirectory.id}
                      open={(i) => {
                        console.log("open", i.id);
                        selectDirectory(i);
                      }}
                    />
                  );
                })}
            </ul>
          </div>
          <div className="flex-1">
            <ul className="cursor-pointer">
              {Array.from(currentDirectory.children.values()).map((d) => {
                return (
                  <Directory
                    key={d.id}
                    item={d}
                    currentDirectory={currentDirectory.id}
                    open={(i) => {
                      console.log("open", i.id);
                      selectDirectory(i);
                    }}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileSystem;
