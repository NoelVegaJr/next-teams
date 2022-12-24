import { useEffect, useRef } from "react";

export const useOnDraw = (onDraw: any) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    if (!canvasRef.current) return;

    canvasRef.current.style.width = "100%";
    canvasRef.current.style.height = "100%";

    canvasRef.current.width = canvasRef.current.offsetWidth;
    canvasRef.current.height = canvasRef.current.offsetHeight;
  });
  const isDrawingRef = useRef(false);

  const mouseMoveListenerRef = useRef(null);
  const mouseDownListenerRef = useRef<any>(null);
  const mouseUpListenerRef = useRef<any>(null);

  const prevPointRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (mouseMoveListenerRef.current) {
        window.removeEventListener("mousemove", mouseMoveListenerRef.current);
      }
      if (mouseMoveListenerRef.current) {
        window.removeEventListener("mouseup", mouseUpListenerRef.current);
      }
    };
  }, []);

  const initMouseMoveListener = () => {
    const mouseMoveListener = (e: any) => {
      if (isDrawingRef.current) {
        const point = computePointInCanvas(e.clientX, e.clientY);
        const ctx = canvasRef.current?.getContext("2d");
        if (onDraw) onDraw(ctx, point, prevPointRef.current);
        prevPointRef.current = point;
        console.log(point);
      }
    };
    mouseMoveListener.current = mouseMoveListener;
    window.addEventListener("mousemove", mouseMoveListener);
  };

  const initMouseDownListener = () => {
    if (!canvasRef.current) return;

    const listener = () => {
      isDrawingRef.current = true;
    };
    mouseDownListenerRef.current = listener;

    canvasRef.current?.addEventListener("mousedown", listener);
  };

  const initMouseUpListener = () => {
    if (!canvasRef.current) return;

    const listener = () => {
      isDrawingRef.current = false;
      prevPointRef.current = null;
    };
    mouseUpListenerRef.current = listener;
    canvasRef.current?.addEventListener("mouseup", listener);
  };

  const computePointInCanvas = (clientX: number, clientY: number) => {
    if (canvasRef.current) {
      const boundingRect = canvasRef.current?.getBoundingClientRect();

      return {
        x: clientX - boundingRect.left,
        y: clientY - boundingRect.top,
      };
    } else {
      return null;
    }
  };

  const setCanvasRef = (ref: any) => {
    if (!ref) return;
    if (canvasRef.current) {
      canvasRef.current.removeEventListener(
        "mousedown",
        mouseDownListenerRef.current
      );
    }
    canvasRef.current = ref;
    initMouseMoveListener();
    initMouseDownListener();
    initMouseUpListener();
  };

  return setCanvasRef;
};
