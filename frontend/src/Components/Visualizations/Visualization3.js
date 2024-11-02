import React, { useEffect } from "react";
import * as d3 from "d3";
import styles from './Visualizations.module.css';

const Visualization3 = () => {
  useEffect(() => {
    // Load the data from housing.csv
    d3.csv(require("../Data/housing.csv")).then((data) => {
      data.forEach((d) => {
        d.property_per_100_000 = +d.property_per_100_000;
        d.violence_per_100_000 = +d.violence_per_100_000;
        d.total_crimes_per_100_000 = d.property_per_100_000 + d.violence_per_100_000;
      });

      const stateCrimeMap = d3.rollups(
        data,
        (v) => d3.mean(v, (d) => d.total_crimes_per_100_000),
        (d) => d.state
      );

      const stateCrimeData = Array.from(stateCrimeMap, ([state, totalCrimes]) => ({
        state,
        totalCrimes,
      }));

      const margin = { top: 30, right: 30, bottom: 80, left: 90 };
      const width = 800 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      d3.select("#total-crimes-chart").selectAll("*").remove();

      const svg = d3
        .select("#total-crimes-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3
        .scaleBand()
        .domain(stateCrimeData.map((d) => d.state))
        .range([0, width])
        .padding(0.2);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(stateCrimeData, (d) => d.totalCrimes)])
        .nice()
        .range([height, 0]);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .attr("class", styles.axis)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "-0.5em")
        .attr("transform", "rotate(-90)");

      svg.append("g").attr("class", styles.axis).call(d3.axisLeft(y));

      const tooltip = d3
        .select("body")
        .append("div")
        .attr("class", styles.tooltip)
        .style("opacity", 0);

      svg
        .selectAll(`.${styles.bar}`)
        .data(stateCrimeData)
        .enter()
        .append("rect")
        .attr("class", styles.bar)
        .attr("x", (d) => x(d.state))
        .attr("y", (d) => y(d.totalCrimes))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.totalCrimes))
        .on("mouseover", function (event, d) {
          d3.select(this).attr("fill", "orange");
          tooltip.transition().duration(200).style("opacity", 1);
          tooltip
            .html(
              `State: ${d.state}<br>Total Crimes per 100,000: ${d.totalCrimes
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
            )
            .style("left", event.pageX + 15 + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mousemove", function (event) {
          tooltip
            .style("left", event.pageX + 15 + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", "steelblue");
          tooltip.transition().duration(500).style("opacity", 0);
        });

      svg
        .append("text")
        .attr("class", styles.axisLabel)
        .attr("x", width / 2)
        .attr("y", height + margin.bottom)
        .style("text-anchor", "middle")
        .text("State");

      svg
        .append("text")
        .attr("class", styles.axisLabel)
        .attr("x", -height / 2)
        .attr("y", -margin.left + 20)
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "middle")
        .text("Total Crimes per 100,000 Population");
    });
  }, []);

  return <div id="total-crimes-chart"></div>;
};

export default Visualization3;
