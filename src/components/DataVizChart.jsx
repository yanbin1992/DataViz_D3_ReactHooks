import React, { useRef, useEffect, useState, useMemo } from "react";
import * as d3 from "d3";
import debounce from "lodash/debounce";

const DataVizChart = ({ data }) => {
  const chartRef = useRef(null);
  const [width, setWidth] = useState(1066);
  const [height, setHeight] = useState(400);

  const chartData = useMemo(() => {
    return [
      { label: "Data Viz Chart", values: data.map((d, i) => ({ x: i, y: d })) },
    ];
  }, [data]);

  useEffect(() => {
    const chart = d3.select(chartRef.current);
    chart.selectAll("*").remove();

    const xScale = d3
      .scaleLinear()
      .domain([0, chartData[0].values.length])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartData[0].values.map((x) => x.y))])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale).ticks(chartData[0].values.length);
    const yAxis = d3.axisLeft(yScale);

    chart
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);
    chart.append("g").attr("class", "y axis").call(yAxis);

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveBasis);

    chart
      .append("path")
      .attr("class", "line")
      .attr("d", line(chartData[0].values));
  }, [width, height, chartData]);

  useEffect(() => {
    function updateWidth() {
      setWidth(chartRef.current.clientWidth);
    }
    const handleResize = debounce(updateWidth, 500);
    updateWidth();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <svg ref={chartRef} width={width} height={height}></svg>;
};

export default DataVizChart;
