import React, { useRef, useEffect, useState } from 'react';
import {
  select,
  line,
  curveStep,
  axisBottom,
  scaleLinear,
  axisRight,
} from 'd3';

function CurvedLineChart() {
  const [data, setData] = useState([26, 75, 45, 60, 37, 30, 17]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    const xAxis = axisBottom(xScale).ticks(data.length);
    svg.select('.x-axis').style('transform', 'translateY(150px)').call(xAxis);

    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    const yAxis = axisRight(yScale);
    svg.select('.y-axis').style('transform', 'translateX(300px)').call(yAxis);

    //generates d attribute of path element
    const myLineFunction = line()
      .x((d, i, n) => xScale(i))
      .y(yScale)
      .curve(curveStep);

    //renders path elemend and attaches d attribute from line generator above
    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .attr('d', myLineFunction)
      .attr('fill', 'none')
      .attr('stroke', 'red');
  }, [data]);

  return (
    <>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br />
      <br />

      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter((value) => value < 45))}>
        Filter data
      </button>
    </>
  );
}

export default CurvedLineChart;
