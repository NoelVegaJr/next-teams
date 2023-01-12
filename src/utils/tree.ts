enum DIRECTORY_TYPE {
  DEFAULT = "DEFAULT",
}

export class Directory {
  private _id: string;
  private _depth: number;
  private _name = "";
  private _type: DIRECTORY_TYPE;
  private _children = new Map<string, Directory>();
  private _parent: Directory | null = null;
  private _isOpen = false;

  constructor(
    id: string,
    name = "",
    depth: number,
    type = DIRECTORY_TYPE.DEFAULT
  ) {
    this._depth = depth;
    this._id = id;
    this._name = name || "new directory";
    this._type = type;
  }

  get depth() {
    return this._depth;
  }

  get name() {
    return this._name;
  }

  set name(newName: string) {
    this._name = newName;
  }

  get isOpen() {
    return this._isOpen;
  }

  toggle() {
    this._isOpen = !this._isOpen;
  }

  open() {
    this._isOpen = true;
  }

  close() {
    this._isOpen = false;
  }

  path() {
    let parts = [this as Directory];

    let prevParent = this._parent;
    while (prevParent) {
      parts = [prevParent, ...parts];
      prevParent = prevParent.parent;
    }
    return parts;
  }

  get type() {
    return "dir";
  }

  get children() {
    return Array.from(this._children.values());
  }

  get parent() {
    return this._parent;
  }

  set parent(item: Directory | null) {
    this._parent = item;
  }

  get id() {
    return this._id;
  }

  get(directory: Directory) {
    return this._children.get(directory.id);
  }

  append(item: Directory) {
    if (this.get(item)) {
      throw new Error("This item already exists");
    }

    if (item === this) throw new Error("Directory cannot contain itself");

    const prevParent = item.parent;

    while (prevParent !== null) {
      if (prevParent === this) {
        throw new Error("Circular insert not allowed");
      }
    }

    this._children.set(item.id, item);
    item.parent = this;
  }
}

export class FileSystem {
  private _root = new Directory("1", "root", 1);
  private _parent = null;
  private _currentDirectory = this._root;

  // implement stack
  private _currentDirectoryPath = [this._currentDirectory];

  get root() {
    return this._root;
  }

  get parent() {
    return null;
  }

  get currentDirectory() {
    return this._currentDirectory;
  }

  set currentDirectory(directory: Directory) {
    this._currentDirectory = directory;
  }

  get currentDirectoryPath() {
    return this._currentDirectoryPath.map((dir) => `${dir.name}`);
  }

  get name() {
    return this.root.name;
  }

  get content() {
    return this.currentDirectory.children;
  }

  createDirectory(name: string, type = DIRECTORY_TYPE.DEFAULT, depth: number) {
    const newDir = new Directory(Math.random().toString(), name, depth, type);
    this.currentDirectory.append(newDir);
    console.log("NEW DIR: ", name);
  }

  openDirectory(directory: Directory) {
    this._currentDirectory.get(directory);
    console.log(directory);
  }
}
