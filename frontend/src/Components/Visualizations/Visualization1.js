import React, { useEffect } from "react";
import * as d3 from "d3";
import styles from './Visualizations.module.css';

const AffordabilityChart = () => {
  useEffect(() => {
    d3.csv(require("../Data/housing.csv")).then((data) => {
      const parsedData = data.map((d) => ({
        state: d.state,
        affordability: d.affordability === "True",
      }));

      const stateAffordabilityMap = d3.rollups(
        parsedData,
        (v) => ({
          affordable: v.filter((d) => d.affordability).length,
          nonAffordable: v.filter((d) => !d.affordability).length,
        }),
        (d) => d.state
      );

      const stateAffordabilityData = Array.from(
        stateAffordabilityMap,
        ([state, counts]) => ({
          state,
          affordable: counts.affordable,
          nonAffordable: counts.nonAffordable,
        })
      );

      const margin = { top: 30, right: 30, bottom: 80, left: 90 };
      const width = 800 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      d3.select("#affordability-chart").selectAll("*").remove();

      const svg = d3
        .select("#affordability-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x0 = d3
        .scaleBand()
        .domain(stateAffordabilityData.map((d) => d.state))
        .range([0, width])
        .padding(0.2);

      const x1 = d3
        .scaleBand()
        .domain(["affordable", "nonAffordable"])
        .range([0, x0.bandwidth()])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(stateAffordabilityData, (d) => Math.max(d.affordable, d.nonAffordable))])
        .nice()
        .range([height, 0]);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .attr("class", styles.axis)
        .call(d3.axisBottom(x0))
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
        .selectAll(`.${styles.stateGroup}`)
        .data(stateAffordabilityData)
        .enter()
        .append("g")
        .attr("class", styles.stateGroup)
        .attr("transform", (d) => `translate(${x0(d.state)},0)`)
        .selectAll("rect")
        .data((d) => [
          { key: "affordable", value: d.affordable },
          { key: "nonAffordable", value: d.nonAffordable },
        ])
        .enter()
        .append("rect")
        .attr("class", (d) =>
          d.key === "affordable" ? styles.barAffordable : styles.barNonAffordable
        )
        .attr("x", (d) => x1(d.key))
        .attr("y", (d) => y(d.value))
        .attr("width", x1.bandwidth())
        .attr("height", (d) => height - y(d.value))
        .on("mouseover", function (event, d) {
          d3.select(this).attr("fill", d.key === "affordable" ? "lightblue" : "salmon");
          tooltip.transition().duration(200).style("opacity", 1);
          tooltip
            .html(
              `${d.key === "affordable" ? "Affordable" : "Non-affordable"} Properties: ${d.value}`
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
          d3.select(this).attr("fill", (d) => d.key === "affordable" ? "steelblue" : "tomato");
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
        .text("Number of Properties");
    });
  }, []);

  return <div id="affordability-chart"></div>;
};

export default AffordabilityChart;
