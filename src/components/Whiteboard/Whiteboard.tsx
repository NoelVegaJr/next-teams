import * as React from "react";
// @ts-expect-error aaa
import rough from "roughjs/bundled/rough.cjs";
import getStroke from "perfect-freehand";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { RoughCanvas } from "roughjs/bin/canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faRedo,
  faSquare,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { faHand } from "@fortawesome/free-regular-svg-icons";

interface IElement {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tool: string;
  position: string;
  points: any[];
}

const generator = rough.generator();

const getSvgPathFromStroke = (stroke: any) => {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc: any, [x0, y0]: any, i: any, arr: any) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
};

function adjustElementCoordinates(element: IElement) {
  const { tool, x1, y1, x2, y2 } = element;

  if (tool === "rectangle") {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return { x1: minX, y1: minY, x2: maxX, y2: maxY };
  } else {
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      return { x1, y1, x2, y2 };
    } else {
      return { x1: x2, y1: y2, x2: x1, y2: y1 };
    }
  }
}

const adjustmentRequired = (type: string) =>
  ["line", "rectangle"].includes(type);

const useHistory = (initialState: any) => {
  const [index, setIndex] = useState(0);

  const [history, setHistory] = useState<any>([initialState]);

  const setState = (action: any, overwrite = false) => {
    const newState =
      typeof action === "function" ? action(history[index]) : action;

    if (overwrite) {
      const historyCopy = [...history];
      historyCopy[index] = newState;
      setHistory(historyCopy);
    } else {
      const updatedState = [...history].slice(0, index + 1);
      setHistory([...updatedState, newState]);
      setIndex((prev) => prev + 1);
    }
  };

  const undo = () => {
    index > 0 && setIndex((prev) => prev - 1);
  };
  const redo = () => {
    index < history.length - 1 && setIndex((prev) => prev + 1);
  };

  return [history[index], setState, undo, redo];
};

const Whiteboard2: React.FunctionComponent = () => {
  const [boundry, setBoundry] = useState<any>();
  const [elements, setElements, undo, redo] = useHistory([]);
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState("text");
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      const roughCanvas: RoughCanvas = rough.canvas(canvas);

      elements.forEach((element: any) => {
        return drawElement(roughCanvas, ctx, element);
      });
    }
  }),
    [elements, action, selectedElement];

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      setBoundry(canvas.getBoundingClientRect());
    }
  }, []);
  useEffect(() => {
    const undoRedoFunction = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey) {
        if (event.key === "z") {
          undo();
        } else if (event.key === "y") {
          redo();
        }
      }

      // switch (event.key) {
      //   case "z":
      //     undo();
      //   case "y":
      //     redo();
      //   default:
      //     return;
      // }
    };
    document.addEventListener("keydown", undoRedoFunction);

    return () => {
      document.removeEventListener("keydown", undoRedoFunction);
    };
  }, [undo, redo]);

  useLayoutEffect(() => {
    const textArea = textAreaRef.current;
    if (action === "writing" && textArea) {
      console.log(textArea);
      textArea.focus();
      textArea.value = selectedElement.text;
      console.log(textArea);

      textArea.value = selectedElement.text;
    }

    console.log(textAreaRef.current);
    console.log(action);
    console.log(selectedElement);
  }, [action, selectedElement]);

  const updateElement = (
    id: number,
    x1: number,
    y1: number,

    clientX: number | null,
    clientY: number | null,
    tool: string,
    options: any = {}
  ) => {
    const elementsCopy = [...elements] as any;

    switch (tool) {
      case "line":
      case "rectangle":
        if (clientX && clientY) {
          elementsCopy[id] = createElement(id, x1, y1, clientX, clientY, tool);
          setElements(elementsCopy, true);
        }
        break;
      case "pencil":
        if (clientX && clientY) {
          elementsCopy[id].points = [
            ...elementsCopy[id].points,
            { x: clientX - boundry.left, y: clientY - boundry.top },
          ];
          setElements(elementsCopy, true);
        }
        break;
      case "text":
        elementsCopy[id].text = options.text;
        setElements(elementsCopy, true);
        return;
      default:
        throw new Error("Type not recognised");
    }
  };

  function createElement(
    id: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    tool: string
  ) {
    let roughElement;

    switch (tool) {
      case "line":
        roughElement = generator.line(
          x1 - boundry.left,
          y1 - boundry.top,
          x2 - boundry.left,
          y2 - boundry.top
        );
        break;
      case "rectangle":
        roughElement = generator.rectangle(
          x1 - boundry.left,
          y1 - boundry.top,
          x2 - x1,
          y2 - y1
        );
        break;
      case "pencil":
        return {
          id,
          tool,
          points: [{ x: x1 - boundry.left, y: y1 - boundry.top }],
        };
      case "text":
        return { id, tool, x1, y1, text: "" };
      default:
        throw new Error("Tool not recognised");
    }
    return { id, x1, y1, x2, y2, tool, roughElement };
  }

  function drawElement(roughCanvas: RoughCanvas, context: any, element: any) {
    switch (element.tool) {
      case "line":
        roughCanvas.draw(element.roughElement);
        break;
      case "rectangle":
        roughCanvas.draw(element.roughElement);
        break;

      case "pencil":
        const stroke = getSvgPathFromStroke(
          getStroke(element.points, { size: 3 })
        );
        context.fill(new Path2D(stroke));
        break;
      case "text":
        context.font = "24px sans-serif";
        context.fillText(
          element.text,
          element.x1 - boundry.left,
          element.y1 - boundry.top
        );
        break;
      default:
        throw new Error("Tool not recognised");
    }
  }

  function nearPoint(
    x: number,
    y: number,
    x1: number,
    y1: number,
    name: string
  ) {
    return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
  }

  function onLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x: number,
    y: number,
    distanceOffset: number
  ) {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };
    const offset = distance(a, b) - (distance(a, c) + distance(b, c));
    return Math.abs(offset) < distanceOffset ? "inside" : null;
  }

  function positionWithinElement(x: any, y: any, element: any) {
    const { tool, x1, x2, y1, y2 } = element;
    if (tool === "rectangle") {
      const topLeft = nearPoint(x, y, x1, y1, "tl");
      const topRight = nearPoint(x, y, x2, y1, "tr");
      const bottomLeft = nearPoint(x, y, x1, y2, "bl");
      const bottomRight = nearPoint(x, y, x2, y2, "br");
      const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
      return topLeft || topRight || bottomLeft || bottomRight || inside;
    } else if (tool === "line") {
      const inside = onLine(x1, y1, x2, y2, x, y, 1);
      const start = nearPoint(x, y, x1, y1, "start");
      const end = nearPoint(x, y, x2, y2, "end");
      return start || end || inside;
    } else if (tool === "pencil") {
      const betweenAnyPoint = element.points.some(
        (point: any, index: number) => {
          const nextPoint = element.points[index + 1];
          if (!nextPoint) return false;
          return (
            onLine(
              point.x,
              point.y,
              nextPoint.x,
              nextPoint.y,
              x - boundry.left,
              y - boundry.top,
              10
            ) != null
          );
        }
      );
      return betweenAnyPoint ? "inside" : null;
    }
  }

  function getElementAtPosition(x: any, y: any, elements: IElement[]) {
    // console.log("getting element");
    return elements
      ?.map((element) => ({
        ...element,
        position: positionWithinElement(x, y, element),
      }))
      .find((element) => element.position !== null);
  }

  const distance = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

  function handleMouseDown(event: any) {
    const { clientX, clientY } = event;

    if (action === "writing") return;

    if (tool === "selection") {
      // If we are select
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        if (element.tool === "pencil") {
          const xOffsets = element.points.map(
            (point: any) => clientX - point.x - boundry.left
          );
          const yOffsets = element.points.map(
            (point: any) => clientY - point.y - boundry.top
          );
          setSelectedElement({ ...element, xOffsets, yOffsets });
        } else {
          const offsetX = clientX - element.x1;
          const offsetY = clientY - element.y1;
          setSelectedElement({ ...element, offsetX, offsetY });
        }
        setElements((prev: any) => prev);

        if (element.position === "inside") {
          setAction(() => "moving");
        } else {
          setAction(() => "resize");
        }

        // console.log("moving");
      }
    } else {
      const id = elements.length;
      const element = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        tool
      );
      // setElements((prev: any) => [...prev, element]);
      setElements((prev: any) => [...prev, element]);
      setSelectedElement(element);
      setAction(tool === "text" ? "writing" : "drawing");
    }
  }

  function handleMouseMove(event: any) {
    const { clientX, clientY } = event;

    if (tool === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);
      event.target.style.cursor = element
        ? cursorForPosition(element.position!)
        : "default";
    }

    if (action === "drawing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      updateElement(index, x1, y1, clientX, clientY, tool);
    } else if (action === "moving") {
      if (selectedElement.tool === "pencil") {
        const newPoints = selectedElement.points.map(
          (point: any, index: number) => {
            return {
              x: clientX - selectedElement.xOffsets[index] - boundry.left,
              y: clientY - selectedElement.yOffsets[index] - boundry.top,
            };
          }
        );
        const elementsCopy = [...elements] as any;
        elementsCopy[selectedElement.id] = {
          ...elementsCopy[selectedElement.id],
          points: newPoints,
        };
        setElements(elementsCopy, true);
      } else {
        const { id, x1, x2, y1, y2, tool, offsetX, offsetY } = selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = clientX - offsetX;
        const newY1 = clientY - offsetY;
        updateElement(id, newX1, newY1, newX1 + width, newY1 + height, tool);
      }
    } else if (action === "resize") {
      const { id, tool, position, ...coordinates } = selectedElement;
      const { x1, y1, x2, y2 } = resizedCoordinates(
        clientX,
        clientY,
        position,
        coordinates
      );
      updateElement(id, x1, y1, x2, y2, tool);
    }
  }

  function handleMouseUp(event: any) {
    const { clientX, clientY } = event;
    if (selectedElement) {
      if (
        selectedElement.tool === "text" &&
        clientX - selectedElement.offsetX === selectedElement.x1 &&
        clientY - selectedElement.offsetY === selectedElement.y1
      ) {
        setAction("writing");
        return;
      }
      if (
        (action === "drawing" || action === "resize") &&
        adjustmentRequired(tool)
      ) {
        const index = selectedElement.id;
        const { id, tool } = selectedElement;
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
        updateElement(id, x1, y1, x2, y2, tool);
      }
    }

    if (action === "writing") {
      console.log("mouse up writing");
      return;
    }

    setAction("none");
    setSelectedElement(null);
  }

  const handleBlur = (event: any) => {
    const { id, x1, y1, tool } = selectedElement;
    setAction("none");
    setSelectedElement(null);
    updateElement(id, x1, y1, null, null, tool, { text: event.target.value });
    console.log("commit text");
  };

  return (
    <div className=" flex h-full flex-col border  ">
      <div className=" flex h-32 items-center justify-center gap-8 border-b py-6">
        <button
          onClick={() => setTool("text")}
          className={`relative  rounded-lg p-2 font-semibold  ${
            tool === "text"
              ? "bg-indigo-200 text-indigo-600"
              : "hover:bg-slate-200"
          }`}
        >
          <p>Text</p>
          <p className="absolute -bottom-1 -right-3 text-xs">1</p>
        </button>
        <button
          onClick={() => setTool("rectangle")}
          className={`group relative flex h-12 w-12 items-center justify-center rounded-lg p-2 font-semibold   ${
            tool === "rectangle"
              ? "bg-indigo-200 text-indigo-600"
              : "hover:bg-slate-200 hover:text-slate-200"
          }`}
        >
          <FontAwesomeIcon
            icon={faSquare}
            className={`rounded border-2 border-slate-700  ${
              tool === "rectangle"
                ? "text-indigo-200"
                : "text-white group-hover:text-slate-200"
            } `}
          />
          <p className="absolute -bottom-1 -right-3 text-xs">2</p>
        </button>
        <button
          onClick={() => setTool("line")}
          className={`groupfont-semibold relative flex h-12 w-12 items-center justify-center rounded-lg p-2  ${
            tool === "line"
              ? " bg-indigo-200 text-indigo-600"
              : " bg-white hover:bg-slate-200 "
          }`}
        >
          <div
            className={`group h-0.5 w-full bg-black  ${
              tool === "line" && "bg-indigo-600"
            }`}
          />
          <p className="absolute -bottom-2 -right-3 text-xs">3</p>
        </button>
        <button
          onClick={() => setTool("pencil")}
          className={`relative flex h-12 w-12 items-center justify-center rounded-lg  p-2 font-semibold  ${
            tool === "pencil"
              ? "bg-indigo-200 text-indigo-600"
              : "hover:bg-slate-200"
          }`}
        >
          <FontAwesomeIcon icon={faPencil} className=" border-slate-700 " />
          <p className="absolute -bottom-1 -right-3 text-xs">4</p>
        </button>
        <button
          onClick={() => setTool("selection")}
          className={`relative flex h-12 w-12 items-center justify-center rounded-lg p-2 font-semibold  ${
            tool === "selection"
              ? "bg-indigo-200 text-indigo-600"
              : "hover:bg-slate-200"
          }`}
        >
          <FontAwesomeIcon icon={faHand} className=" border-slate-700 " />
          <p className="absolute -bottom-1 -right-3 text-xs">5</p>
        </button>
        <button onClick={undo} className="">
          <FontAwesomeIcon icon={faUndo} />
        </button>
        <button onClick={redo}>
          <FontAwesomeIcon icon={faRedo} />
        </button>
      </div>
      <div className="h-full    border">
        {action === "writing" && (
          <textarea
            ref={textAreaRef}
            className="fixed border"
            // onBlur={handleBlur}
            style={{
              top: (selectedElement?.y1 ?? 0 - boundry?.left ?? 0) - 10,
              left: (selectedElement?.x1 ?? 0 - boundry?.top ?? 0) - 10,
            }}
          />
        )}

        <canvas
          id="canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          Canvas
        </canvas>
      </div>
    </div>
  );
};

export default Whiteboard2;

function resizedCoordinates(
  clientX: number,
  clientY: number,
  position: string,
  coordinates: { x1: number; y1: number; x2: number; y2: number }
): any {
  const { x1, y1, x2, y2 } = coordinates;
  switch (position) {
    case "tl":
    case "start":
      return { x1: clientX, y1: clientY, x2, y2 };
    case "tr":
      return { x1, y1: clientY, x2: clientX, y2 };
    case "bl":
      return { x1: clientX, y1, x2, y2: clientY };
    case "br":
    case "end":
      return { x1, y1, x2: clientX, y2: clientY };
    default:
      return null;
  }
}

function cursorForPosition(position: string | null): string {
  switch (position) {
    case "tl":
    case "br":
    case "start":
    case "end":
      return "nwse-resize";
    case "tr":
    case "bl":
      return "nesw-resize";
    default:
      return "move";
  }
}
