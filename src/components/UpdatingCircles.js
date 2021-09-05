import React, { useRef, useEffect, useState } from 'react';

import { select } from 'd3';

function UpdatingCircles() {
  const svgRef = useRef();
  const [data, setData] = useState([26, 75, 45, 60, 37]);

  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('r', (d) => d)
      .attr('cx', (d) => d * 2)
      .attr('cy', (d) => d * 1)
      .attr('stroke', 'red');
  }, [data]);

  return (
    <>
      <svg ref={svgRef}></svg>
      <g className="x-axis" />
      <br />
      <button onClick={() => setData(data.map((value) => value + 8))}>
        Update Data
      </button>
      <button onClick={() => setData(data.filter((value) => value < 45))}>
        Filter Data
      </button>
    </>
  );
}

export default UpdatingCircles;
