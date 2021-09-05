import React, { useRef, useEffect, useState } from 'react';
import { select, axisBottom, scaleLinear, axisRight, scaleBand } from 'd3';

function ColoredBarChart() {
  const [data, setData] = useState([26, 75, 45, 60, 37, 30, 17]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, 300])
      .padding(0.5);
    const xAxis = axisBottom(xScale).ticks(data.length);

    svg.select('.x-axis').style('transform', 'translateY(150px)').call(xAxis);

    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(['green', 'orange', 'red'])
      .clamp(true);

    const yAxis = axisRight(yScale);
    svg.select('.y-axis').style('transform', 'translateX(300px)').call(yAxis);

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('transform', 'scale(1, -1)')
      .attr('x', (d, i, n) => xScale(i))
      .attr('y', -150)
      .attr('width', xScale.bandwidth())
      .transition()
      .duration(1800)
      .attr('fill', colorScale)
      .attr('height', (d) => 150 - yScale(d));
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

export default ColoredBarChart;
