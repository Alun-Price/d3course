import { select, range, symbol, symbols } from "d3";

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const n = 100;

svg
  .append("g")
  .selectAll("rect")
  .data(range(n))
  .join("rect")
  .attr("y", (d) => d * 20)
  .attr("width", width)
  .attr("height", 10)
  .attr("mask", "url(#mask-1");

svg
  .append("g") // new group node
  .selectAll("rect") // selects non-existent rect
  .data(range(n)) // sets data for joining
  .join("rect") //.enter().append() = .join()
  .attr("x", (d) => d * 20)
  .attr("width", 10)
  .attr("height", height)
  .attr("mask", "url(#mask-2");

const renderMask = (selection, id, inverted) => {
  const mask = svg.append("mask").attr("id", id);

  mask
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", inverted ? "black" : "white");

  mask
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`)
    .append("path")
    .attr("d", symbol(symbols[1], 100000)())
    .attr("fill", inverted ? "white" : "black");
};

// renderMask(svg, "mask-1", false);
// renderMask(svg, "mask-2", true);

svg.call(renderMask, "mask-1", false).call(renderMask, "mask-2", true);
