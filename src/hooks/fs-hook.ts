import { Directory } from "@/utils/tree";
import { dir } from "console";
import { useEffect, useState } from "react";

export const useFS = () => {
  const [depth, setDepth] = useState(1);
  const [directories, setDirectories] = useState(
    new Map<string, Directory>([
      ["1", new Directory("1", "root", depth)],
      ["2", new Directory("2", "test", depth)],
    ])
  );

  const [currentDirectory, setCurrentDirectory] = useState<Directory>(
    directories.get("1")!
  );
  const [history, setHistory] = useState([currentDirectory]);
  const [position, setPosition] = useState(0);

  const listDirectories = () => {
    return Array.from(directories.values());
  };

  const newDirectory = (name: string, depth: number) => {
    const newDirectory = new Directory(Math.random().toString(), name, depth);
    currentDirectory.append(newDirectory);
    setCurrentDirectory(newDirectory);

    directories.set(newDirectory.id, newDirectory);
    setDirectories(new Map(directories));
  };

  const selectDirectory = (directory: Directory) => {
    directory.toggle();
    if (currentDirectory.id !== directory.id) {
      setHistory((prev) => [...prev, directory]);
      setPosition((prev) => prev + 1);
    }
    setCurrentDirectory(directory);
    directories.set(directory.id, directory);
    setDirectories(new Map(directories));
  };

  const back = () => {
    console.log(position);
    if (position === 0) return;
    setPosition((prev) => prev - 1);
    return history[position - 1];
  };

  const forward = () => {
    if (history.length - 1 === position) return;
    setPosition((prev) => prev + 1);
    return history[position];
  };

  useEffect(() => {
    console.log("Directories", directories);
    console.log("HISTORY", history);
  }, [directories]);

  return {
    directories,
    currentDirectory,
    selectDirectory,
    newDirectory,
    back,
    forward,
  };
};
