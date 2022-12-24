import * as React from "react";
import { useRef, useState } from "react";
import { useOnDraw } from "../../hooks/draw-hook";

const Canvas = ({ width, height }: { width: number; height: number }) => {
  const setCanvasRef = useOnDraw(onDraw);

  function onDraw(ctx: CanvasRenderingContext2D, point: any, prevPoint: any) {
    drawLine(prevPoint, point, ctx, "#000000", 5);
  }

  function drawLine(start: any, end: any, ctx: any, color: any, width: any) {
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();

    // ctx.fillText("Hello world", start.x, start.y);
  }

  return (
    <canvas
      width={width}
      height={height}
      className={"border-4 border-black"}
      ref={setCanvasRef}
    />
  );
};

const Whiteboard: React.FunctionComponent = () => {
  return (
    <div className="h-screen w-full">
      <Canvas width={700} height={500} />
    </div>
  );
};

export default Whiteboard;
