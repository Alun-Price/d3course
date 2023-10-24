import { select, range } from "d3";

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// const data = range(15);

function makeData(n, t) {
  const data = range(n).map((d) => ({
    x: d * 60 + 50,
    y: 250 + Math.sin(d * 0.5 + t) * 220,
    r: 20 + Math.sin(d * 0.5 + t * 2) * 10,
  }));
  return data;
}

// const circles = svg.selectAll("circle").data(data);
// const circlesEnter = circles.enter().append("circle").attr("r", 20);
// circles
//   .merge(circlesEnter)
//   .attr("cx", (d) => d.x)
//   .attr("cy", (d) => d.y);

// accomplishes same as above using .join (new API)

function vizData(data) {
  const circles = svg
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", (d) => d.r)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y);
}

let t = 0;
setInterval(() => {
  const n = 10 + Math.sin(t) * 5;
  const data = makeData(n, t);
  vizData(data);

  t = t + 0.01;
}, 1000 / 60);
