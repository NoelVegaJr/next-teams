import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import useMeasure from "react-use-measure";

import type { Selection } from "d3";
import { axisBottom as d3_axisBottom, axisLeft as d3_axisLeft } from "d3";

export const LineChart = ({
  className,
  data,
  gridColor = "text-blue-200",
  lineColor = "stroke-blue-500",
  areaColor = "fill-blue-200",
}: {
  className: string;
  data: any;
  lineColor?: string;
  gridColor?: string;
  areaColor?: string;
}) => {
  const [ref, bounds] = useMeasure();
  console.log(bounds);
  return (
    <div
      ref={ref}
      className={`relative ${className} h-full w-full  text-blue-400`}
    >
      {bounds.width > 0 && (
        <>
          <ChartInner
            gridColor={gridColor}
            lineColor={lineColor}
            areaColor={areaColor}
            data={data}
            width={bounds.width}
            height={bounds.height}
          />
        </>
      )}
    </div>
  );
};

function ChartInner({
  data,
  width,
  height,
  gridColor = "text-blue-200",
  lineColor = "stroke-blue-500",
  areaColor = "fill-blue-200",
}: {
  data: {
    data: number;
    time: number;
  }[];
  width: any;
  height: any;
  lineColor?: string;
  gridColor?: string;
  areaColor?: string;
}) {
  const margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  const svgRef = useRef<null | SVGSVGElement>(null);
  const [selection, setSelection] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  const xDomain = d3.extent(data.map((d) => d.time)) as [number, number];
  const xRange = [0, width];
  const xScale = d3.scaleLinear().domain(xDomain).range(xRange);
  const x = d3.scaleLinear().domain([0, 20]).range(xRange);

  //   const yDomain = d3.extent(dummyData.map((d) => d.cpu)) as [number, number];
  const yRange = [height - margin.bottom, margin.top];
  const yScale = d3.scaleLinear().domain([0, 100]).range(yRange);

  useEffect(() => {
    if (!selection) {
      setSelection(d3.select(svgRef.current));
    } else {
      const INNER_HEIGHT = height;
      const INNER_Width = width;
      selection.attr("width", width).attr("height", height);
      // .append("g")
      // .attr("transform", `translate(${margin.left},${margin.top})`);

      // const xAxis = d3_axisBottom(x).ticks(10);
      // const yAxis = d3_axisLeft(yScale).ticks(10);

      selection.select("#y").remove();
      selection.select("#x").remove();

      const xAxisGrid = d3_axisBottom(x)
        .tickSize(-INNER_HEIGHT)
        .tickFormat(null)
        .ticks(10);

      const yAxisGrid = d3_axisLeft(yScale)
        .tickSize(-INNER_Width)
        .tickFormat(null)
        .ticks(10);
      // Creating Grid Lines

      selection.select("#grid").append("g").attr("id", "y").call(yAxisGrid);

      selection
        .select("#grid")
        .append("g")
        .attr("id", "x")
        .attr("transform", "translate(0," + INNER_HEIGHT + ")")
        .call(xAxisGrid);
      // End Grid Lines

      // Create Axes
      // selection
      //   .append("g")
      //   .attr("transform", "translate(0," + INNER_HEIGHT + ")")
      //   .call(xAxis);

      // selection.append("g").call(yAxis);
      // End Create Axes
    }
  }, [selection, width, height]);

  useEffect(() => {
    if (!selection) {
      setSelection(d3.select(svgRef.current));
    } else {
      selection.attr("width", width).attr("height", height);

      const line = d3
        .line<{
          data: number;
          time: number;
        }>()
        .y((d) => yScale(d.data))
        .x((d) => xScale(d.time));

      selection.select("#line").attr("d", line(data)).attr("fill", "none");

      const area = d3
        .area<{
          data: number;
          time: number;
        }>()
        .x((d) => xScale(d.time))
        .y0(yScale(0))
        .y1((d) => yScale(d.data));

      selection.select("#area").attr("d", area(data)).attr("opacity", "0.3");
    }
  }, [selection, data, height, width]);

  return (
    <svg ref={svgRef} className="border " stroke="none">
      <g id="grid" className={`${gridColor}`}></g>

      <path id="line" className={`${lineColor}`} strokeWidth={3} />
      <path id="area" className={`${areaColor}`} />
    </svg>
  );
}

export default LineChart;
