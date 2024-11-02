import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import styles from './Visualizations.module.css';

const Visualization4 = () => {
  const hasRendered = useRef(false);

  useEffect(() => {
    if (hasRendered.current) return;
    hasRendered.current = true;

    d3.select("#property-price-chart").selectAll("*").remove();
    d3.select(`.${styles.tooltip}`).remove();

    // Create tooltip div only if it doesn't already exist
    if (d3.select(`.${styles.tooltip}`).empty()) {
      d3.select("body")
        .append("div")
        .attr("class", styles.tooltip)
        .style("opacity", 0);
    }

    d3.csv(require("../Data/housing.csv")).then((data) => {
      data.forEach((d) => {
        d.price = +d.price;
      });

      const margin = { top: 30, right: 30, bottom: 80, left: 90 };
      const width = 800 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const svg = d3
        .select("#property-price-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Set up scales and bins
      const x = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.price))
        .range([0, width]);

      const bins = d3
        .bin()
        .domain(x.domain())
        .thresholds(x.ticks(20))(data.map((d) => d.price));

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(bins, (d) => d.length)])
        .nice()
        .range([height, 0]);

      // Draw the x and y axes
      svg
        .append("g")
        .attr("class", styles.axis)
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(10))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "0.15em")
        .attr("transform", "rotate(-90)");

      svg.append("g").attr("class", styles.axis).call(d3.axisLeft(y));

      const tooltip = d3.select(`.${styles.tooltip}`);

      // Generate line data from bins
      const lineData = bins.map((d) => ({
        x: (d.x0 + d.x1) / 2, // midpoint of price range for x-coordinate
        y: d.length, // count for y-coordinate
      }));

      // Define the area generator
      const area = d3
        .area()
        .x((d) => x(d.x))
        .y0(height)  // Base of the area at the bottom of the chart
        .y1((d) => y(d.y)) // Top of the area follows the line
        .curve(d3.curveMonotoneX);

      // Append the shaded area below the line
      svg
        .append("path")
        .datum(lineData)
        .attr("class", styles.area)
        .attr("fill", "lightsteelblue")
        .attr("d", area);

      // Define the line generator
      const line = d3
        .line()
        .x((d) => x(d.x))
        .y((d) => y(d.y))
        .curve(d3.curveMonotoneX);

      // Append the line path
      svg
        .append("path")
        .datum(lineData)
        .attr("class", styles.line)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);

      // Add points as circles
      svg
        .selectAll(`.${styles.point}`)
        .data(lineData)
        .enter()
        .append("circle")
        .attr("class", styles.point)
        .attr("cx", (d) => x(d.x))
        .attr("cy", (d) => y(d.y))
        .attr("r", 4)
        .attr("fill", "steelblue")
        .on("mouseover", function (event, d) {
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .html(
              `Price Range Midpoint: $${d.x.toLocaleString()}<br/>Count: ${d.y}`
            )
            .style("left", event.pageX + 5 + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", function () {
          tooltip.transition().duration(500).style("opacity", 0);
        });

      // Add labels for axes
      svg
        .append("text")
        .attr("class", styles.label)
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .text("Property Prices ($)");

      svg
        .append("text")
        .attr("class", styles.label)
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 20)
        .attr("x", 0 - height / 2)
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .text("Number of Properties");
    });
  }, []);

  return <div id="property-price-chart"></div>;
};

export default Visualization4;
